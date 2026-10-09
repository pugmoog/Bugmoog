import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {DatabaseSync} from 'node:sqlite';
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bugmoog-test-'));
const source = fs.readFileSync(new URL('./server.js', import.meta.url), 'utf8');
const context = vm.createContext({fs, path, crypto, DatabaseSync, process: {env: {DATA_DIR:directory}, cwd:()=>directory}});
try {
  vm.runInContext(source.slice(0, source.indexOf('function pruneRateLimits')).replace(/^import .*;\n/gm, '') + `
    const a = subjectId(2, 'a'), b = subjectId(2, 'b');
    const today = dayStart(now()), old = today - 40 * DAY;
    const add = (time,subject,id) => db.prepare('INSERT INTO hourly_visitors VALUES(?,?,?,1)').run(time,subject,hashVisitor(id));
    add(old,a,'returning'); add(old+HOUR,a,'returning');
    add(today-DAY,a,'returning'); add(today,a,'returning');
    add(today+HOUR,a,'returning'); add(today,b,'returning'); add(today,b,'new');
    compact();
    globalThis.results = ['hour','day','week'].map(mode=>report(old,today+2*HOUR,mode));
    globalThis.legacy = totals(old,today+2*HOUR);
    globalThis.daily = db.prepare('SELECT unique_devices FROM daily_totals').get();
    db.prepare('INSERT INTO daily_totals VALUES(?,?,?,?)').run(old-DAY,a,5,3);
    globalThis.missing = report(old-DAY,today+2*HOUR,'day');
    db.close();
  `, context);
  for (const report of context.results) {
    assert.equal(report.summary.find(r=>r.subject===null).uniqueDevices,2);
    assert.equal(report.summary.find(r=>r.subject===null).opens,7);
    assert.equal(report.summary.find(r=>r.subject==='a').uniqueDevices,1);
    assert.equal(report.deviceCountsComplete,true);
  }
  assert.equal(context.daily.unique_devices,1);
  assert.equal(context.legacy.find(r=>r.subject==='a').uniqueDeviceBuckets,1);
  assert.equal(context.missing.deviceCountsComplete,false);
  assert.equal(context.missing.summary.find(r=>r.subject===null).uniqueDevices,null);
  assert.equal(context.missing.summary.find(r=>r.subject===null).opens,12);
  console.log('PASS: distinct IDs across hours, days, games, compaction, graph resolutions, legacy totals, and missing historical identities');
} finally { fs.rmSync(directory,{recursive:true,force:true}); }
