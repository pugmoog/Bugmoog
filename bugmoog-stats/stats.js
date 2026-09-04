const API = "https://d3txi12i3pqbxm.cloudfront.net/chet/bugmoog-stats/api";
const HOUR = 3_600_000, DAY = 86_400_000;
const COLORS = ["#3157a4", "#cb4b35", "#2c8a55", "#8a4ca8", "#d18418", "#16878d", "#c23869", "#65702c", "#6e5bca", "#80513a"];
const $ = selector => document.querySelector(selector);
const number = new Intl.NumberFormat();
const state = { data: null, view: "timeline", earliest: null };

function friendlyName(id) {
  const special = { gdash: "Geometry Dash", escaperoad: "Escape Road", eaglercraft: "Minecraft", terretorial_io: "Terretorial.io", "CMMM-plus": "Cell Machine Mystic Mod Plus+", fnae: "Password Protected Game" };
  return special[id] || id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
function utcInput(time) { return new Date(time).toISOString().slice(0, 16); }
function inputTime(id) { const time = Date.parse(`${$(id).value}Z`); return Number.isFinite(time) ? time : NaN; }
function setRange(days) {
  const to = Date.now(), from = days === "all" ? 0 : to - Number(days) * DAY;
  $("#from").value = utcInput(from); $("#to").value = utcInput(to);
  document.querySelectorAll("[data-days]").forEach(b => b.classList.toggle("active", b.dataset.days === String(days)));
}
function range() { return { from: inputTime("#from"), to: inputTime("#to") }; }
function selectedKeys() { return [...document.querySelectorAll('.check-list input:checked')].map(input => input.value); }
function gameIds() { return [...new Set((state.data?.totals || []).filter(r => r.event === "game_open").map(r => r.subject))]; }
function seriesInfo(key, index) {
  if (key === "bugmoog") return { key, name: "Bugmoog opens", color: COLORS[0], match: r => r.event === "bugmoog_open" };
  if (key === "all-games") return { key, name: "All game opens", color: COLORS[1], match: r => r.event === "game_open" };
  if (key === "chat") return { key, name: "Chat opens", color: COLORS[2], match: r => r.event === "chat_open" };
  if (key === "proxy") return { key, name: "Proxy opens", color: COLORS[3], match: r => r.event === "proxy_open" };
  const id = key.slice(5); return { key, name: friendlyName(id), color: gameColor(id), match: r => r.event === "game_open" && r.subject === id };
}
function gameColor(id) { let hash = 0; for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0; return COLORS[4 + hash % (COLORS.length - 4)]; }
function selectedSeries() { return selectedKeys().map(seriesInfo); }
function metricValue(row) { return Number(row[$("#metric").value]) || 0; }

async function loadStats() {
  const { from, to } = range();
  if (!Number.isFinite(from) || !Number.isFinite(to) || from >= to) return setStatus("Choose a valid From time before the To time.", true);
  setStatus("Loading statistics…");
  const query = new URLSearchParams({ from, to, resolution: $("#resolution").value, t: Date.now() });
  try {
    const response = await fetch(`${API}/stats?${query}`, { cache: "no-store" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || `Request failed (${response.status}).`);
    state.data = body; state.earliest = Math.min(state.earliest ?? Infinity, body.from);
    if (from === 0) $("#from").value = utcInput(body.from);
    populateGames(); render();
    setStatus(`Updated ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}. Times on this page use UTC.`);
  } catch (error) { setStatus(`Could not load statistics: ${error.message}`, true); }
}
function setStatus(text, error = false) { $("#status").textContent = text; $("#status").classList.toggle("error", error); }

function populateGames() {
  const selected = new Set(selectedKeys());
  const totals = aggregateGames();
  $("#game-series").innerHTML = gameIds().sort((a, b) => (totals.get(b)?.opens || 0) - (totals.get(a)?.opens || 0) || friendlyName(a).localeCompare(friendlyName(b))).map((id, i) => {
    const key = `game:${id}`, color = gameColor(id);
    return `<label data-name="${friendlyName(id).toLowerCase()}"><input type="checkbox" value="${key}" ${selected.has(key) ? "checked" : ""}><span class="swatch" style="--line:${color}"></span>${friendlyName(id)}</label>`;
  }).join("");
  filterGames();
}
function aggregateGames() {
  const map = new Map();
  for (const row of state.data?.rows || []) if (row.event === "game_open") {
    const item = map.get(row.subject) || { id: row.subject, opens: 0, uniqueDevices: 0 };
    item.opens += Number(row.opens); item.uniqueDevices += Number(row.uniqueDevices); map.set(row.subject, item);
  }
  return map;
}
function filterGames() { const q = $("#game-search").value.trim().toLowerCase(); document.querySelectorAll("#game-series label").forEach(label => label.hidden = !label.dataset.name.includes(q)); }

function bucketSpec() {
  if (state.view === "week") return { count: 7, label: i => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i] };
  if (state.view === "day") return { count: 24, label: i => `${String(i).padStart(2, "0")}:00` };
  const rows = state.data?.rows || [], resolution = $("#resolution").value;
  const step = resolution === "day" ? DAY : resolution === "hour" ? HOUR : (rows.some(r => r.resolution === "day") ? DAY : HOUR);
  const requested = range(), from = step === HOUR ? Math.max(requested.from, state.data?.hourlySince || 0) : requested.from, to = requested.to, start = Math.floor(from / step) * step;
  return { count: Math.max(0, Math.ceil((to - start) / step)), start, step, label: i => formatBucket(start + i * step, step) };
}
function formatBucket(time, step) { return new Date(time).toLocaleString([], step === HOUR ? { timeZone: "UTC", month: "short", day: "numeric", hour: "numeric", hour12: true } : { timeZone: "UTC", month: "short", day: "numeric" }); }
function occurrenceCounts(kind) {
  const counts = Array(kind === "week" ? 7 : 24).fill(0), { from, to } = range();
  if (kind === "week") for (let t = Math.floor(from / DAY) * DAY; t < to; t += DAY) counts[new Date(t).getUTCDay()]++;
  else {
    const effectiveFrom = Math.max(from, state.data?.hourlySince || 0);
    const days = Math.max(1, (to - effectiveFrom) / DAY);
    counts.fill(days);
  }
  return counts;
}
function buildSeries() {
  const spec = bucketSpec(), metric = $("#metric").value;
  return selectedSeries().map(info => {
    const values = Array(spec.count).fill(0);
    for (const row of state.data?.rows || []) if (info.match(row)) {
      const time = Number(row.bucket); let index;
      if (state.view === "week") index = new Date(time).getUTCDay();
      else if (state.view === "day") { if (row.resolution !== "hour") continue; index = new Date(time).getUTCHours(); }
      else index = Math.floor((time - spec.start) / spec.step);
      if (index >= 0 && index < values.length) values[index] += Number(row[metric]) || 0;
    }
    if (state.view !== "timeline") { const counts = occurrenceCounts(state.view); values.forEach((v, i) => values[i] = counts[i] ? v / counts[i] : 0); }
    return { ...info, values };
  });
}

function render() {
  renderSummary(); renderTable(); renderChart();
  const help = state.view === "timeline" ? "See every stored hour or day between the two selected times." : state.view === "week" ? "Each point is the average total for that weekday across the selected date range." : "Each point is the average for that UTC hour across the selected range. This needs retained hourly data.";
  $("#view-help").textContent = help;
}
function renderSummary() {
  const sum = event => (state.data?.rows || []).filter(r => r.event === event).reduce((n, r) => n + Number(r.opens), 0);
  $("#total-bugmoog").textContent = number.format(sum("bugmoog_open")); $("#total-games").textContent = number.format(sum("game_open"));
  $("#total-chat").textContent = number.format(sum("chat_open")); $("#total-proxy").textContent = number.format(sum("proxy_open"));
}
function renderTable() {
  const games = [...aggregateGames().values()].sort((a, b) => b.opens - a.opens || friendlyName(a.id).localeCompare(friendlyName(b.id)));
  const total = games.reduce((n, g) => n + g.opens, 0); $("#game-count").textContent = `${games.length} game${games.length === 1 ? "" : "s"}`;
  $("#game-table").innerHTML = games.map((g, i) => `<tr><td>${i + 1}</td><td>${friendlyName(g.id)}</td><td>${number.format(g.opens)}</td><td>${number.format(g.uniqueDevices)}</td><td>${total ? (g.opens / total * 100).toFixed(1) : 0}%</td></tr>`).join("") || '<tr><td colspan="5">No game opens in this range.</td></tr>';
}
function renderChart() {
  const svg = $("#chart"), tooltip = $("#tooltip"), spec = bucketSpec(), series = buildSeries();
  const W = 960, H = 430, left = 62, right = 22, top = 20, bottom = 48, width = W-left-right, height = H-top-bottom;
  const max = Math.max(1, ...series.flatMap(s => s.values));
  const x = i => left + (spec.count <= 1 ? width / 2 : i / (spec.count - 1) * width), y = v => top + height - v / max * height;
  let html = "";
  for (let i=0;i<=5;i++) { const value=max*(5-i)/5, yy=top+i*height/5; html += `<line class="grid-line" x1="${left}" y1="${yy}" x2="${W-right}" y2="${yy}"/><text class="axis-label" x="${left-9}" y="${yy+4}" text-anchor="end">${formatValue(value)}</text>`; }
  html += `<line class="axis-line" x1="${left}" y1="${top+height}" x2="${W-right}" y2="${top+height}"/>`;
  if (!series.length || !spec.count) html += `<text class="empty" x="${W/2}" y="${H/2}">${series.length ? "No data in this range" : "Choose at least one line"}</text>`;
  for (const item of series) { const path=item.values.map((v,i)=>`${i?"L":"M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" "); html += `<path class="data-line" stroke="${item.color}" d="${path}"/>`; }
  if (spec.count) {
    const count=Math.min(7,spec.count), indexes=[...new Set(Array.from({length:count},(_,i)=>Math.round(i*(spec.count-1)/Math.max(1,count-1))))];
    html += indexes.map(i=>`<text class="axis-label" x="${x(i)}" y="${H-13}" text-anchor="middle">${spec.label(i)}</text>`).join("");
    html += `<g id="hover-marks" visibility="hidden"><line class="hover-line" y1="${top}" y2="${top+height}"/><g id="hover-dots"></g></g><rect id="chart-hit" x="${left}" y="${top}" width="${width}" height="${height}" fill="transparent"/>`;
  }
  svg.innerHTML=html;
  const names=series.map(s=>s.name); $("#chart-title").textContent = names.length ? (names.length === 1 ? names[0] : `${names.length} lines compared`) : "No lines selected";
  $("#chart-kicker").textContent = state.view === "timeline" ? "Timeline" : state.view === "week" ? "Average week" : "Average day";
  const {from,to}=range(); $("#chart-range").textContent=`${formatRange(from)} – ${formatRange(to)}`;
  $("#legend").innerHTML=series.map(s=>`<span><i style="--line:${s.color}"></i>${s.name}</span>`).join("");
  const hourlyCutoff=state.data?.hourlySince || 0, requestedHourly=state.view === "day" || $("#resolution").value === "hour";
  $("#chart-note").textContent = requestedHourly && from < hourlyCutoff ? `Hourly records begin ${formatRange(hourlyCutoff)}. Earlier time is omitted from this hourly report; choose Days for the full range.` : "Move over the graph to see the exact value at any point.";
  const hit=$("#chart-hit"), marks=$("#hover-marks"), dots=$("#hover-dots");
  hit?.addEventListener("pointermove", event => { const box=svg.getBoundingClientRect(), sx=W/box.width, px=(event.clientX-box.left)*sx, index=Math.max(0,Math.min(spec.count-1,Math.round((px-left)/width*(spec.count-1)))); marks.setAttribute("visibility","visible"); marks.querySelector("line").setAttribute("x1",x(index)); marks.querySelector("line").setAttribute("x2",x(index)); dots.innerHTML=series.map(s=>`<circle class="hover-dot" fill="${s.color}" cx="${x(index)}" cy="${y(s.values[index])}" r="4"/>`).join(""); tooltip.innerHTML=`<strong>${spec.label(index)}</strong>`+series.map(s=>`<span><b><i style="--line:${s.color}"></i>${s.name}</b><b>${formatValue(s.values[index])}</b></span>`).join(""); tooltip.style.display="block"; const localX=event.clientX-box.left, localY=event.clientY-box.top; tooltip.style.left=`${Math.max(5,Math.min(box.width-tooltip.offsetWidth-5,localX+12))}px`; tooltip.style.top=`${Math.max(5,localY-tooltip.offsetHeight-12)}px`; });
  hit?.addEventListener("pointerleave",()=>{ tooltip.style.display="none"; marks?.setAttribute("visibility","hidden"); });
}
function formatValue(value) { return $("#metric").value === "opens" && state.view === "timeline" ? number.format(Math.round(value)) : value.toLocaleString(undefined,{maximumFractionDigits:2}); }
function formatRange(time) { return new Date(time).toLocaleString([],{timeZone:"UTC",month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true}); }

document.querySelectorAll("[data-days]").forEach(button => button.addEventListener("click",()=>{ setRange(button.dataset.days); loadStats(); }));
document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click",()=>{
  state.view=button.dataset.view;
  document.querySelectorAll("[data-view]").forEach(b=>b.setAttribute("aria-selected",b===button));
  if(state.view==="day" && $("#resolution").value==="day") { $("#resolution").value="hour"; loadStats(); }
  else render();
}));
document.addEventListener("change", event => { if (event.target.matches('.check-list input, #metric')) render(); if (event.target.matches('#from,#to')) document.querySelectorAll("[data-days]").forEach(b=>b.classList.remove("active")); });
$("#resolution").addEventListener("change",loadStats); $("#refresh").addEventListener("click",loadStats); $("#game-search").addEventListener("input",filterGames);
$("#clear-series").addEventListener("click",()=>{ document.querySelectorAll('.check-list input').forEach(i=>i.checked=false); render(); });
$("#top-games").addEventListener("click",()=>{ document.querySelectorAll('.check-list input').forEach(i=>i.checked=false); [...document.querySelectorAll('#game-series input')].slice(0,5).forEach(i=>i.checked=true); render(); });
$("#graph-only").addEventListener("click",()=>{ document.body.classList.add("graph-only"); renderChart(); }); $("#exit-graph").addEventListener("click",()=>{ document.body.classList.remove("graph-only"); renderChart(); });
window.addEventListener("resize",()=>state.data&&renderChart());
setRange(30); loadStats();
