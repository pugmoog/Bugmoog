import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 3050);
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const PUBLIC_DIR = process.env.PUBLIC_DIR || path.join(process.cwd(), "public");
const ALLOWED_ORIGINS = new Set((process.env.ALLOWED_ORIGINS || "https://pugmoog.github.io").split(","));
const DAY = 86_400_000;
const HOUR = 3_600_000;
const RAW_DAYS = 31;
const MAX_BODY = 4096;
const ALLOWED_EVENTS = new Set(["bugmoog_open", "game_open", "chat_open", "proxy_open"]);
const EVENT_CODES = new Map([["bugmoog_open", 1], ["game_open", 2], ["chat_open", 3], ["proxy_open", 4]]);
const EVENT_NAMES = new Map([...EVENT_CODES].map(([name, code]) => [code, name]));

fs.mkdirSync(DATA_DIR, { recursive: true });
const secretPath = path.join(DATA_DIR, "visitor-secret");
if (!fs.existsSync(secretPath)) fs.writeFileSync(secretPath, crypto.randomBytes(32), { mode: 0o600, flag: "wx" });
const visitorSecret = fs.readFileSync(secretPath);
const db = new DatabaseSync(path.join(DATA_DIR, "stats.sqlite"));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY,
    event_code INTEGER NOT NULL,
    name TEXT NOT NULL,
    UNIQUE(event_code, name)
  );
  CREATE TABLE IF NOT EXISTS hourly_visitors (
    hour_start INTEGER NOT NULL,
    subject_id INTEGER NOT NULL REFERENCES subjects(id),
    visitor_hash BLOB NOT NULL,
    opens INTEGER NOT NULL,
    PRIMARY KEY(hour_start, subject_id, visitor_hash)
  ) WITHOUT ROWID;
  CREATE INDEX IF NOT EXISTS hourly_by_subject ON hourly_visitors(subject_id, hour_start);
  CREATE TABLE IF NOT EXISTS daily_totals (
    day_start INTEGER NOT NULL,
    subject_id INTEGER NOT NULL REFERENCES subjects(id),
    opens INTEGER NOT NULL,
    unique_devices INTEGER NOT NULL,
    PRIMARY KEY(day_start, subject_id)
  ) WITHOUT ROWID;
  CREATE TABLE IF NOT EXISTS daily_visitors (
    day_start INTEGER NOT NULL,
    subject_id INTEGER NOT NULL REFERENCES subjects(id),
    visitor_hash BLOB NOT NULL,
    PRIMARY KEY(day_start, subject_id, visitor_hash)
  ) WITHOUT ROWID;
  CREATE TABLE IF NOT EXISTS daily_identity_coverage (
    day_start INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    PRIMARY KEY(day_start, subject_id)
  ) WITHOUT ROWID;
`);

const recentEvents = new Map();
const now = () => Date.now();
const dayStart = value => Math.floor(value / DAY) * DAY;
const hashVisitor = value => crypto.createHmac("sha256", visitorSecret).update(value).digest().subarray(0, 16);

function apiError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return false;
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Vary", "Origin");
  return true;
}

function sendJson(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function serveFrontend(req, res, pathname) {
  if (!["GET", "HEAD"].includes(req.method) || !["/chet/bugmoog-stats/", "/chet/bugmoog-stats/index.html"].includes(pathname)) return false;
  const filePath = path.join(PUBLIC_DIR, "index.html");
  if (!fs.existsSync(filePath)) throw apiError(503, "Statistics frontend is not installed.");
  const size = fs.statSync(filePath).size;
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": size,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (req.method === "HEAD") res.end();
  else fs.createReadStream(filePath).pipe(res);
  return true;
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw apiError(413, "Request is too large.");
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); }
  catch { throw apiError(400, "Invalid JSON."); }
}

function validateEvent(body) {
  if (!ALLOWED_EVENTS.has(body.event)) throw apiError(400, "Unknown event.");
  if (typeof body.visitorId !== "string" || !/^[a-f0-9-]{20,80}$/i.test(body.visitorId)) throw apiError(400, "Invalid visitor ID.");
  let subject = body.event === "game_open" ? body.subject : body.event.replace("_open", "");
  if (typeof subject !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(subject)) throw apiError(400, "Invalid event subject.");
  return { event: body.event, eventCode: EVENT_CODES.get(body.event), subject, visitorHash: hashVisitor(body.visitorId) };
}

function subjectId(eventCode, subject) {
  db.prepare("INSERT INTO subjects(event_code,name) VALUES(?,?) ON CONFLICT(event_code,name) DO NOTHING").run(eventCode, subject);
  return db.prepare("SELECT id FROM subjects WHERE event_code=? AND name=?").get(eventCode, subject).id;
}

function compact() {
  const cutoff = dayStart(now() - RAW_DAYS * DAY);
  const rows = db.prepare(`SELECT CAST(hour_start / ? AS INTEGER) * ? AS day_start, subject_id,
    SUM(opens) AS opens, COUNT(DISTINCT visitor_hash) AS unique_devices
    FROM hourly_visitors WHERE hour_start < ? GROUP BY day_start, subject_id`).all(DAY, DAY, cutoff);
  const write = db.prepare(`INSERT INTO daily_totals(day_start,subject_id,opens,unique_devices)
    VALUES(?,?,?,?) ON CONFLICT(day_start,subject_id) DO UPDATE SET
    opens=excluded.opens, unique_devices=excluded.unique_devices`);
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`INSERT OR IGNORE INTO daily_visitors
      SELECT CAST(hour_start / ? AS INTEGER) * ?, subject_id, visitor_hash
      FROM hourly_visitors WHERE hour_start < ?`).run(DAY, DAY, cutoff);
    db.prepare(`INSERT OR IGNORE INTO daily_identity_coverage
      SELECT DISTINCT CAST(hour_start / ? AS INTEGER) * ?, subject_id
      FROM hourly_visitors WHERE hour_start < ?`).run(DAY, DAY, cutoff);
    for (const row of rows) write.run(row.day_start, row.subject_id, row.opens, row.unique_devices);
    db.prepare("DELETE FROM hourly_visitors WHERE hour_start < ?").run(cutoff);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function queryRows(from, to, resolution) {
  const cutoff = dayStart(now() - RAW_DAYS * DAY);
  const rows = [];
  const addRaw = (start, end, size, label) => {
    if (start >= end) return;
    const uniqueExpression = size === HOUR ? "COUNT(*)" : "COUNT(DISTINCT h.visitor_hash)";
    const result = db.prepare(`SELECT CAST(h.hour_start / ? AS INTEGER) * ? AS bucket, s.event_code AS eventCode, s.name AS subject,
      SUM(h.opens) AS opens, ${uniqueExpression} AS uniqueDevices
      FROM hourly_visitors h JOIN subjects s ON s.id=h.subject_id WHERE h.hour_start >= ? AND h.hour_start < ?
      GROUP BY bucket,h.subject_id ORDER BY bucket`).all(size, size, start, end);
    rows.push(...result.map(row => ({ bucket: row.bucket, event: EVENT_NAMES.get(row.eventCode), subject: row.subject,
      opens: row.opens, uniqueDevices: row.uniqueDevices, resolution: label })));
  };
  const addDailyRollups = (start, end) => {
    const result = db.prepare(`SELECT d.day_start AS bucket,s.event_code AS eventCode,s.name AS subject,d.opens,d.unique_devices AS uniqueDevices
      FROM daily_totals d JOIN subjects s ON s.id=d.subject_id WHERE d.day_start >= ? AND d.day_start < ? ORDER BY d.day_start`).all(dayStart(start), end);
    rows.push(...result.map(row => ({ bucket: row.bucket, event: EVENT_NAMES.get(row.eventCode), subject: row.subject,
      opens: row.opens, uniqueDevices: row.uniqueDevices, resolution: "day" })));
  };

  if (resolution === "hour") {
    addRaw(Math.max(from, cutoff), to, HOUR, "hour");
  } else if (resolution === "day") {
    addDailyRollups(from, Math.min(to, cutoff));
    addRaw(Math.max(from, cutoff), to, DAY, "day");
  } else {
    addDailyRollups(from, Math.min(to, cutoff));
    addRaw(Math.max(from, cutoff), to, HOUR, "hour");
  }
  return { rows, cutoff };
}

function totals() {
  const combined = new Map();
  const add = row => {
    const key = `${row.event}\u0000${row.subject}`;
    const current = combined.get(key) || { event: row.event, subject: row.subject, opens: 0, uniqueDeviceBuckets: 0 };
    current.opens += Number(row.opens);
    current.uniqueDeviceBuckets += Number(row.uniqueDevices);
    combined.set(key, current);
  };
  for (const row of db.prepare(`SELECT s.event_code AS eventCode,s.name AS subject,SUM(h.opens) AS opens,
    COUNT(DISTINCT h.visitor_hash) AS uniqueDevices FROM hourly_visitors h JOIN subjects s ON s.id=h.subject_id GROUP BY h.subject_id`).all()) {
    add({ ...row, event: EVENT_NAMES.get(row.eventCode) });
  }
  for (const row of db.prepare(`SELECT s.event_code AS eventCode,s.name AS subject,SUM(d.opens) AS opens,
    SUM(d.unique_devices) AS uniqueDevices FROM daily_totals d JOIN subjects s ON s.id=d.subject_id GROUP BY d.subject_id`).all()) {
    add({ ...row, event: EVENT_NAMES.get(row.eventCode) });
  }
  return [...combined.values()].sort((a, b) => b.opens - a.opens || a.subject.localeCompare(b.subject));
}

// Return exact distinct-device counts without ever returning visitor hashes.
// Keep legacy rollups as opens, but mark their unrecoverable device counts null.
function report(from, to, resolution) {
  const size = resolution === 'hour' ? HOUR : resolution === 'week' ? 7 * DAY : DAY;
  const offset = resolution === 'week' ? 4 * DAY : 0; // Monday, 1970-01-05.
  const cutoff = dayStart(now() - RAW_DAYS * DAY);
  const effectiveFrom = resolution === 'hour' ? Math.max(from, cutoff) : from;
  const common = `WITH records AS (
    SELECT h.hour_start AS time,h.subject_id,h.visitor_hash,h.opens,0 AS missing
    FROM hourly_visitors h WHERE h.hour_start >= $from AND h.hour_start < $to
    UNION ALL
    SELECT d.day_start,d.subject_id,v.visitor_hash,0,0
    FROM daily_visitors v JOIN daily_totals d USING(day_start,subject_id)
    WHERE d.day_start >= $from AND d.day_start < $to AND $daily=1
    UNION ALL
    SELECT d.day_start,d.subject_id,NULL,d.opens,
      CASE WHEN c.day_start IS NULL THEN 1 ELSE 0 END
    FROM daily_totals d LEFT JOIN daily_identity_coverage c USING(day_start,subject_id)
    WHERE d.day_start >= $from AND d.day_start < $to AND $daily=1
  ), expanded AS (
    SELECT r.*,s.event_code,s.name AS subject FROM records r JOIN subjects s ON s.id=r.subject_id
    UNION ALL
    SELECT r.*,s.event_code,NULL AS subject FROM records r JOIN subjects s ON s.id=r.subject_id
  )`;
  const params = {$from:effectiveFrom,$to:to,$daily:resolution==='hour'?0:1};
  const fields = `event_code,subject,SUM(opens) AS opens,
    CASE WHEN MAX(missing)=1 THEN NULL ELSE COUNT(DISTINCT visitor_hash) END AS uniqueDevices`;
  const rows = db.prepare(`${common} SELECT
    CAST((time - ${offset}) / ${size} AS INTEGER) * ${size} + ${offset} AS bucket,
    ${fields} FROM expanded GROUP BY bucket,event_code,subject ORDER BY bucket`).all(params);
  const summary = db.prepare(`${common} SELECT ${fields}
    FROM expanded GROUP BY event_code,subject`).all(params);
  const normalize = row => ({...row,event:EVENT_NAMES.get(row.event_code),event_code:undefined});
  return {from,to,effectiveFrom,resolution,hourlySince:cutoff,
    rows:rows.map(normalize),summary:summary.map(normalize),
    games:db.prepare('SELECT name FROM subjects WHERE event_code=2 ORDER BY name').all().map(r=>r.name)};
}

function pruneRateLimits(time) {
  if (recentEvents.size < 5000) return;
  for (const [key, value] of recentEvents) if (value < time - 60_000) recentEvents.delete(key);
}

compact();
setInterval(() => { try { compact(); } catch (error) { console.error("compaction failed", error); } }, 6 * HOUR).unref();

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (serveFrontend(req, res, url.pathname)) return;
    if (!applyCors(req, res)) return sendJson(res, 403, { error: "Origin is not allowed." });
    if (req.method === "OPTIONS") return sendJson(res, 204, {});

    // Path parameters survive the portal's current query-string stripping.
    const reportPath = url.pathname.match(/^\/chet\/bugmoog-stats\/api\/report\/(\d+)\/(\d+)\/(hour|day|week)$/);
    if (req.method === 'GET' && reportPath) {
      const from=Number(reportPath[1]),to=Number(reportPath[2]);
      if(!Number.isSafeInteger(from)||!Number.isSafeInteger(to)||from>=to||to>now()+DAY)
        throw apiError(400,'Invalid date range.');
      if(reportPath[3]==='hour' && to-from>366*DAY) throw apiError(400,'Hourly range is too large.');
      return sendJson(res,200,report(from,to,reportPath[3]));
    }

    if (req.method === "POST" && url.pathname === "/chet/bugmoog-stats/api/event") {
      const event = validateEvent(await readJson(req));
      const time = now();
      const hashKey = event.visitorHash.toString("hex");
      const key = `${hashKey}:${event.event}:${event.subject}`;
      const minimumGap = event.event === "bugmoog_open" ? 10_000 : 2_000;
      if ((recentEvents.get(key) || 0) > time - minimumGap) return sendJson(res, 202, { counted: false });
      recentEvents.set(key, time);
      pruneRateLimits(time);
      const id = subjectId(event.eventCode, event.subject);
      const bucket = Math.floor(time / HOUR) * HOUR;
      db.prepare(`INSERT INTO hourly_visitors(hour_start,subject_id,visitor_hash,opens) VALUES(?,?,?,1)
        ON CONFLICT(hour_start,subject_id,visitor_hash) DO UPDATE SET opens=opens+1`).run(bucket, id, event.visitorHash);
      return sendJson(res, 201, { counted: true });
    }

    if (req.method === "GET" && url.pathname === "/chet/bugmoog-stats/api/stats") {
      const current = now();
      const earliest = db.prepare(`SELECT MIN(value) AS earliest FROM (
        SELECT MIN(hour_start) AS value FROM hourly_visitors UNION ALL SELECT MIN(day_start) AS value FROM daily_totals)`).get()?.earliest;
      const from = Math.max(0, Number(url.searchParams.get("from")) || earliest || current - 30 * DAY);
      const to = Math.min(current + HOUR, Number(url.searchParams.get("to")) || current + 1);
      const resolution = ["auto", "hour", "day"].includes(url.searchParams.get("resolution")) ? url.searchParams.get("resolution") : "auto";
      if (from >= to) throw apiError(400, "Invalid date range.");
      const result = queryRows(from, to, resolution);
      return sendJson(res, 200, { from, to, resolution, hourlySince: result.cutoff, rows: result.rows, totals: totals() });
    }

    if (req.method === "GET" && url.pathname === "/chet/bugmoog-stats/api/popularity") {
      const games = totals().filter(row => row.event === "game_open").map(row => ({ id: row.subject, opens: row.opens }));
      return sendJson(res, 200, { games, updatedAt: now() });
    }

    if (req.method === "GET" && url.pathname === "/chet/bugmoog-stats/api/health") {
      return sendJson(res, 200, { ok: true, hourlyDeviceBuckets: db.prepare("SELECT COUNT(*) AS count FROM hourly_visitors").get().count });
    }
    throw apiError(404, "Not found.");
  } catch (error) {
    console.error(error);
    sendJson(res, error.status || 500, { error: error.status ? error.message : "Server error." });
  }
});

server.listen(PORT, HOST, () => console.log(`Bugmoog stats listening on http://${HOST}:${PORT}`));
