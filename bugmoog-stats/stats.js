const $ = s => document.querySelector(s);
const HOUR = 3600000, DAY = 24 * HOUR;
const API = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || /^192\.168\./.test(location.hostname)
  ? '/api/stats' : 'https://d3txi12i3pqbxm.cloudfront.net/chet/bugmoog-stats/api/stats';
const format = n => Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });
const chartDate = time => {
  const date = new Date(time);
  const day = date.toLocaleDateString('en-US', { timeZone:'UTC', month:'short', day:'numeric', year:'numeric' }).replace(',', '');
  const clock = date.toLocaleTimeString('en-US', { timeZone:'UTC', hour:'numeric', minute:'2-digit' });
  return `${day}, ${clock}`;
};
const nameOf = id => ({gdash:'Geometry Dash', eaglercraft:'Minecraft', escaperoad:'Escape Road', fnae:'Password Protected Game'}[id] || id.replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()));
let data, chart, requestVersion=0;
const selections = new Set(['bugmoog_open:opens']);
const knownGames = new Set();
const main = [['show-bm','bugmoog_open','BugMoog'],['show-game','game_open','All games'],['show-chat','chat_open','Chatroom']];
function wireRow(row, key, name) {
  row.dataset.key = key; row.dataset.name = name;
  for (const metric of ['opens','devices']) {
    const input = row.querySelector('.' + metric);
    input.checked = selections.has(key + ':' + metric);
    input.setAttribute('aria-label', `${name}: ${metric}`);
    input.addEventListener('change', () => {
      const value = key + ':' + metric;
      input.checked ? selections.add(value) : selections.delete(value);
      render();
    });
  }
}
main.forEach(([id,key,name])=>wireRow($('#'+id),key,name));
document.querySelectorAll('.game-row').forEach(el=>el.remove());
const games = document.createElement('div'); games.id='games';
$('#deselect-all-games').parentElement.after(games);
function populateGames() {
  for(const id of data.games || []) knownGames.add(id);
  for (const row of [...data.rows, ...(data.totals || [])]) if(row.event==='game_open') knownGames.add(row.subject);
  knownGames.delete(null);
  games.replaceChildren();
  for (const id of [...knownGames].sort((a,b)=>nameOf(a).localeCompare(nameOf(b)))) {
    const row=document.createElement('div'); row.className='game-row';
    for(const cls of ['opens','devices']) { const input=document.createElement('input'); input.type='checkbox'; input.className=cls; row.append(input,' '); }
    const span=document.createElement('span'); span.textContent=nameOf(id); row.append(span);
    wireRow(row,'game:'+id,nameOf(id)); games.append(row);
  }
}
for(const [id,metric] of [['select-all-game-opens','opens'],['select-all-game-devices','devices'],['deselect-all-games',null]]) {
  $('#'+id).title=metric ? 'Select all game '+metric : 'Deselect all games';
  $('#'+id).addEventListener('click',()=>{
    games.querySelectorAll('input').forEach(input=>{
      if(metric && !input.classList.contains(metric)) return;
      input.checked=Boolean(metric);
      const key=input.parentElement.dataset.key+':'+input.className;
      metric ? selections.add(key) : selections.delete(key);
    }); render();
  });
}
function inputDate(t) { const d=new Date(t); return new Date(t-d.getTimezoneOffset()*60000).toISOString().slice(0,16); }
function setPreset(value) {
  let end=Date.now(), start=end-7*DAY, precision='Hours';
  if(value==='Today') { const d=new Date(); d.setHours(0,0,0,0); start=+d; }
  if(value==='Last week (daily)') precision='Days';
  if(value==='Last 30 days' || value==='Last 90 days') {start=end-(value==='Last 30 days'?30:90)*DAY;precision='Days';}
  $('#start-time').value=inputDate(start); $('#end-time').value=inputDate(end);
  $('#precision').value=precision;
}
function status(message,error=false) { $('#status').textContent=message; $('#status').classList.toggle('error',error); }
async function load() {
  const version=++requestVersion;
  status('Loading statistics…'); $('#refresh').disabled=true;
  try {
    const from=+new Date($('#start-time').value),to=+new Date($('#end-time').value);
    if(!Number.isFinite(from)||!Number.isFinite(to)||from>=to) throw Error('Choose a start time before the end time.');
    const mode=$('#mode').value;
    const resolution=mode==='Average day'?'hour':mode==='Average week'?'day':({Hours:'hour',Days:'day',Weeks:'week'}[$('#precision').value]);
    const response=await fetch(API.replace(/\/stats$/,`/report/${from}/${to}/${resolution}`),{cache:'no-store'});
    const body=await response.json();
    if(version!==requestVersion) return;
    if(!response.ok) throw Error(body.error || `HTTP ${response.status}`);
    if(!Array.isArray(body.rows)) throw Error('Unexpected statistics response');
    data=body; populateGames(); render();
  } catch(error) { if(version===requestVersion) status('Could not load statistics: '+error.message,true); }
  finally { if(version===requestVersion) $('#refresh').disabled=false; }
}
function chosen() {
  const list=[];
  for(const row of document.querySelectorAll('[data-key]')) for(const metric of ['opens','devices']) {
    if(!selections.has(row.dataset.key+':'+metric)) continue;
    const key=row.dataset.key;
    list.push({key,metric,name:row.dataset.name,label:row.dataset.name+' — '+metric,
      matches:r=>key.startsWith('game:') ? r.event==='game_open' && r.subject===key.slice(5) : r.event===key && r.subject===null});
  }
  return list;
}
function color(key) {let hash=0;for(const c of key) hash=(hash*31+c.charCodeAt(0))>>>0;return `hsl(${hash%360},65%,40%)`;}
function render() {
  if(!data) return;
  const from=+new Date($('#start-time').value), to=+new Date($('#end-time').value);
  if(!Number.isFinite(from)||!Number.isFinite(to)||from>=to) {status('Choose a start time before the end time.',true);return;}
  const mode=$('#mode').value, precision=$('#precision').value;
  // Stored buckets are UTC. Explicitly label UTC instead of shifting day rollups.
  const hourly=mode==='Average day' || (mode==='Normal' && precision==='Hours');
  const effectiveFrom=hourly ? Math.max(from,data.hourlySince||0) : from;
  const step=precision==='Hours'?HOUR:precision==='Weeks'?7*DAY:DAY;
  const offset=precision==='Weeks'?4*DAY:0;
  const start=Math.floor((effectiveFrom-offset)/step)*step+offset;
  const count=mode==='Average day'?24:mode==='Average week'?7:Math.max(0,Math.ceil((to-start)/step));
  if(count>20000) {status('Choose a shorter hourly range or use Days/Weeks.',true);return;}
  const rows=data.rows;
  const labels=Array.from({length:count},(_,i)=>mode==='Average day'?new Date(i*HOUR).toLocaleTimeString('en-US',{timeZone:'UTC',hour:'numeric',minute:'2-digit'}):mode==='Average week'?['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][i]:chartDate(start+i*step));
  const denominators=Array(count).fill(0);
  if(mode!=='Normal') {
    const unit=mode==='Average day'?HOUR:DAY;
    for(let t=Math.floor(effectiveFrom/unit)*unit;t<to;t+=unit) {
      const i=mode==='Average day'?new Date(t).getUTCHours():new Date(t).getUTCDay();
      denominators[i]+=Math.max(0,Math.min(to,t+unit)-Math.max(effectiveFrom,t))/unit;
    }
  }
  const series=chosen().map(s=>{
    const values=Array(count).fill(0);let total=0;
    for(const r of rows) if(s.matches(r)) {
      const raw=r[s.metric==='opens'?'opens':'uniqueDevices'];
      const value=raw===null?null:Number(raw)||0;
      const time=Number(r.bucket), i=mode==='Average day'?new Date(time).getUTCHours():mode==='Average week'?new Date(time).getUTCDay():Math.floor((time-start)/step);
      if(i>=0&&i<count) { if(value===null) values[i]=null;else if(values[i]!==null) values[i]+=value; }
    }
    if(mode!=='Normal') values.forEach((v,i)=>values[i]=v===null?null:denominators[i]?v/denominators[i]:0);
    const summary=data.summary.find(s.matches);
    total=summary ? summary[s.metric==='opens'?'opens':'uniqueDevices'] : 0;
    return {...s,values,total};
  });
  if(typeof Chart==='undefined') {status('Chart.js could not load. Allow cdn.jsdelivr.net and refresh.',true);return;}
  chart?.destroy();
  chart=new Chart($('#chart'), {
    type:'line',
    plugins:[{
      id:'calendarBoundaries',
      beforeDatasetsDraw(chart) {
        if(mode!=='Normal' || count<2) return;
        const {ctx,chartArea,scales:{x}}=chart;
        const end=start+(count-1)*step;
        const pixelsPerDay=(chartArea.right-chartArea.left)*DAY/(end-start);
        ctx.save();
        ctx.beginPath();
        ctx.rect(chartArea.left,chartArea.top,chartArea.right-chartArea.left,chartArea.bottom-chartArea.top);
        ctx.clip();
        for(let time=Math.ceil(start/DAY)*DAY;time<=end;time+=DAY) {
          const date=new Date(time);
          const month=date.getUTCDate()===1;
          const week=date.getUTCDay()===1; // Monday starts a week.
          // Omit finer boundaries when they would merge into visual noise.
          if(!month && (week ? pixelsPerDay*7<10 : pixelsPerDay<10)) continue;
          const pixel=x.getPixelForValue(0)+(time-start)/(end-start)*(x.getPixelForValue(count-1)-x.getPixelForValue(0));
          ctx.strokeStyle=month?'rgba(0,0,0,0.22)':week?'rgba(0,0,0,0.13)':'rgba(0,0,0,0.065)';
          ctx.lineWidth=month?1.5:1;
          ctx.beginPath();ctx.moveTo(pixel,chartArea.top);ctx.lineTo(pixel,chartArea.bottom);ctx.stroke();
        }
        ctx.restore();
      }
    }],
    data:{labels,datasets:series.map(s=>({label:s.label,data:s.values,borderColor:color(s.key),borderDash:s.metric==='devices'?[5,4]:[],borderWidth:2,pointRadius:0,pointHoverRadius:4,tension:0}))},
    options:{
      responsive:true,maintainAspectRatio:false,animation:false,
      onResize:(chart,size)=>{ chart.options.scales.x.ticks.maxTicksLimit=Math.max(1,Math.floor((size.width-60)/210)); },
      interaction:{mode:'nearest',axis:'xy',intersect:false},
      plugins:{tooltip:{filter:(_item,index)=>index===0,callbacks:{label:c=>`${c.dataset.label}: ${format(c.parsed.y)}`}},legend:{display:false}},
      scales:{y:{beginAtZero:true},x:{grid:{drawOnChartArea:mode!=='Normal'},title:{display:true,text:mode==='Normal'?'Time (UTC) · Dividers: day / Monday / month (light → darker)':'Time (UTC)'},ticks:{autoSkip:true,autoSkipPadding:24,maxTicksLimit:Math.max(1,Math.floor(($('.chart-wrap').clientWidth-60)/210)),maxRotation:0,minRotation:0}}}
    }
  });
  $('#totals').replaceChildren();$('#leaderboards').replaceChildren();
  for(const s of series.filter(s=>!s.key.startsWith('game:'))) {
    const p=document.createElement('p');p.textContent=`Total ${s.label}: ${s.total===null?'Unavailable for this historical range':format(s.total)}`;$('#totals').append(p);
  }
  for(const metric of ['opens','devices']) {
    const ranked=series.filter(s=>s.key.startsWith('game:')&&s.metric===metric).sort((a,b)=>(b.total??-1)-(a.total??-1)||a.name.localeCompare(b.name));
    if(!ranked.length) continue;
    const section=document.createElement('section'), heading=document.createElement('h3'),table=document.createElement('table');
    heading.textContent=metric==='opens'?'Game opens leaderboard':'Unique devices leaderboard';section.append(heading,table);
    const tr=document.createElement('tr');for(const text of ['#','Game',metric==='opens'?'Opens':'Unique devices']){const th=document.createElement('th');th.textContent=text;tr.append(th);}table.append(tr);
    ranked.forEach((s,i)=>{const tr=document.createElement('tr');for(const text of [s.total===null?'—':i+1,s.name,s.total===null?'Unavailable':format(s.total)]) {const td=document.createElement('td');td.textContent=text;tr.append(td);}table.append(tr);});
    $('#leaderboards').append(section);
  }
  $('#note').textContent='Date inputs use your local time; graph buckets use UTC.'+(hourly&&from<effectiveFrom?' Hourly data starts '+new Date(effectiveFrom).toISOString().slice(0,10)+'.':'');
  status(!series.length?'Select an Opens or Devices checkbox to draw a line.':!rows.length?'No recorded activity in this range.':'');
}
$('#refresh').addEventListener('click',load);
$('#preset').addEventListener('change',()=>{if($('#preset').selectedIndex){setPreset($('#preset').value);load();}});
for(const id of ['start-time','end-time','precision','mode']) $('#'+id).addEventListener('change',load);
setPreset('Last week (hourly)');$('#preset').value='Last week (hourly)';load();
