const {chromium}=require('playwright');const assert=require('node:assert/strict');
// Run with Playwright installed and the local preview running on port 8765.
const executablePath=process.env.BUGMOOG_TEST_BROWSER || undefined;
const fixture='<!doctype html><html><head><script src="/saving/save-runtime.js"></script><script>window.startValue=localStorage.getItem("level");window.startCookie=document.cookie;</script></head><body>Save fixture</body></html>';
(async()=>{const browser=await chromium.launch({executablePath,headless:true});try{
 const context=await browser.newContext();await context.grantPermissions(['local-network-access']);const errors=[];
 context.on('page',p=>{p.on('pageerror',e=>{errors.push(e.message);console.log('ERROR',e.message)});p.on('dialog',d=>d.accept());});
 await context.route(/\/games\/save-fixture(?:\/|$)/,async route=>{
  if(route.request().url().endsWith('/save-fixture')) return route.fulfill({status:301,headers:{location:route.request().url()+'/'}});
  if(route.request().url().endsWith('worker.js'))return route.fulfill({contentType:'text/javascript',body:`const r=indexedDB.open('worker-data',1);r.onupgradeneeded=()=>r.result.createObjectStore('items');r.onsuccess=()=>{const tx=r.result.transaction('items','readwrite');tx.objectStore('items').put(new Uint8Array([7,8,9]),'binary');tx.oncomplete=()=>postMessage('saved');};`});
  return route.fulfill({contentType:'text/html',body:fixture});
 });
 await context.route('**/menu.html',async route=>{
  const r=await route.fetch();let text=await r.text();text=text.replace("? './script.js'","? 'http://localhost:8765/script.js'");await route.fulfill({response:r,body:text});
 });
 await context.route('**/script.js',async route=>{
  const r=await route.fetch();let text=await r.text();text=text.replace('const weburl = IS_LOCAL ? "./" : "https://pugmoog.github.io/Bugmoog/";','const weburl = "http://localhost:8765/";');await route.fulfill({response:r,body:text});
 });
 async function menu(host){const p=await context.newPage();await p.goto(`http://${host}:8765/menu.html`);await p.waitForFunction(()=>!!window.BugmoogSaves,{},{timeout:10000}).catch(async e=>{console.log('MENU DEBUG',host,await p.locator('script[src]').evaluateAll(es=>es.map(e=>e.src)));throw e});return p;}
 async function launch(p){const navigated=p.waitForEvent('framenavigated',{predicate:f=>f.url().includes('/games/save-fixture/')});await p.evaluate(()=>loadPage('save-fixture/'));await p.waitForFunction(()=>document.getElementById('gamePageFrame').style.display==='block');const frame=await navigated;const g=frame||p.frames().find(f=>f.url().includes('/games/save-fixture'));await g.waitForFunction(()=>window.startValue!==undefined,{},{timeout:5000}).catch(async e=>{console.log('DEBUG',await g.content(),await p.locator('#save-error').innerText(),p.frames().map(f=>f.url()));throw e;});return g;}
 async function close(p){await p.evaluate(()=>closePage());assert.equal(await p.locator('#gamePageFrame').isVisible(),false);}
 const a=await menu('localhost');await a.evaluate(()=>localStorage.setItem('unrelated-website-secret','do-not-export'));
 let g=await launch(a);assert.equal(await g.evaluate(()=>startValue),null);
 await g.evaluate(async()=>{
  localStorage.setItem('level','42');localStorage.score='9001';document.cookie='stage=7; Path=/';document.cookie='expired=x; Max-Age=0';
  const r=indexedDB.open('progress',3);r.onupgradeneeded=()=>{const s=r.result.createObjectStore('state',{keyPath:'id',autoIncrement:true});s.createIndex('label','label',{unique:true});};
  const db=await new Promise((res,rej)=>{r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});window.testDB=db;
  const tx=db.transaction('state','readwrite'),s=tx.objectStore('state');const cycle={value:'hello'};cycle.self=cycle;
  s.add({label:'first',bytes:new Uint16Array([2,65535]),blob:new Blob(['hello']),date:new Date('2026-10-30T00:00:00Z'),cycle,map:new Map([['key',4n]])});
  s.add({label:'second'});s.add({id:5,label:'deleted'});s.delete(5);
  await new Promise((res,rej)=>{tx.oncomplete=res;tx.onabort=()=>rej(tx.error)});
  await new Promise((res,rej)=>{const w=new Worker('worker.js');w.onmessage=e=>{if(e.data==='saved')res()};w.onerror=rej;});
 });
 await a.evaluate(()=>BugmoogSaves.flush());
 const state=await a.evaluate(async()=>{const a=await BugmoogSaves.archive();return {games:a.games.length,local:a.games[0].local,db:a.games[0].databases.map(x=>x.name),warnings:a.games[0].warnings};});
 assert.equal(state.local.level,'42');assert.deepEqual(state.db.sort(),['progress','worker-data']);assert.deepEqual(state.warnings,[]);console.log('PASS localStorage, cookies, IndexedDB, workers captured on host');
 const packed=await a.evaluate(async()=>BugmoogSaveCommon.pack(await BugmoogSaves.archive()));assert(!packed.includes('unrelated-website-secret'));
 await close(a);await a.reload();g=await launch(a);assert.equal(await g.evaluate(()=>startValue),'42');assert.match(await g.evaluate(()=>startCookie),/stage=7/);assert(!await g.evaluate(()=>document.cookie.includes('expired')));
 const restored=await g.evaluate(async()=>{
  const r=indexedDB.open('progress',3);const db=await new Promise((res,rej)=>{r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
  const tx=db.transaction('state','readwrite'),s=tx.objectStore('state');const result=await new Promise((res,rej)=>{const r=s.get(1);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
  const next=await new Promise((res,rej)=>{const r=s.add({label:'after reload'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
  return {name:db.name,bytes:[...result.bytes],blob:await result.blob.text(),date:result.date.toISOString(),cycle:result.cycle===result.cycle.self,map:String(result.map.get('key')),next};
 });assert.deepEqual(restored,{name:'progress',bytes:[2,65535],blob:'hello',date:'2026-10-30T00:00:00.000Z',cycle:true,map:'4',next:6});console.log('PASS startup restore and binary/schema/auto-increment roundtrip');
 const other=await menu('localhost');const concurrent=await launch(other);assert.equal(await concurrent.evaluate(()=>startValue),'42');
 await concurrent.evaluate(()=>localStorage.setItem('level','other-tab'));await other.evaluate(()=>BugmoogSaves.flush());
 assert.equal(await a.evaluate(async()=>(await BugmoogSaves.archive()).games[0].local.level),'other-tab');
 await other.close();const reopened=await menu('localhost');const resumed=await launch(reopened);assert.equal(await resumed.evaluate(()=>startValue),'other-tab');await close(reopened);await reopened.close();console.log('PASS concurrent tabs and immediate reopening after abrupt close');
 await close(a);
 const b=await menu('127.0.0.1');g=await launch(b);assert.equal(await g.evaluate(()=>startValue),null);await g.evaluate(()=>localStorage.setItem('level','B-original'));await close(b);console.log('PASS separate websites using the same hosted game');
 await b.evaluate(async text=>{await BugmoogSaves.preview(text);await BugmoogSaves.apply();},packed);
 g=await launch(b);assert.equal(await g.evaluate(()=>startValue),'42');await close(b);console.log('PASS import copies progress into current host');
 await b.evaluate(()=>BugmoogSaves.rollback());g=await launch(b);assert.equal(await g.evaluate(()=>startValue),'B-original');await close(b);console.log('PASS rollback preserves previous host saves');
 const corrupt=packed.replace('checksum":"','checksum":"bad');assert.equal(await b.evaluate(text=>{try{BugmoogSaveCommon.unpack(text);return false}catch{return true}},corrupt),true);console.log('PASS damaged import rejected');
 const codeOK=await b.evaluate(async()=>{const a=await BugmoogSaves.archive(),packed=await BugmoogSaveCommon.pack(a);return BugmoogSaveCommon.unpack(BugmoogSaveCommon.code(packed)).games[0].local.level;});assert.equal(codeOK,'B-original');console.log('PASS file/code archive equivalence');
 g=await launch(b);
 await b.evaluate(()=>{window.originalSavePut=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(this.name==='games')throw new DOMException('Simulated full storage','QuotaExceededError');return originalSavePut.apply(this,args);};});
 await g.evaluate(()=>localStorage.setItem('level','unsaved-recovery'));
 assert.match(await b.evaluate(async()=>{try{await BugmoogSaves.flush();return ''}catch(e){return e.message}}),/Simulated full storage/);
 const wrapper=b.frames().find(f=>f.url().includes('/game-page.html'));
 const downloaded=b.waitForEvent('download',{timeout:10000}).catch(async e=>{console.log('RECOVERY DEBUG',await wrapper.locator('#game-save-error').innerText());throw e});const [recovery]=await Promise.all([downloaded,wrapper.getByRole('button',{name:'Download this game’s save'}).click()]);const fs=require('node:fs');const recoveryText=fs.readFileSync(await recovery.path(),'utf8');
 assert.equal(await b.evaluate(text=>BugmoogSaveCommon.unpack(text).games[0].local.level,recoveryText),'unsaved-recovery');
 await b.evaluate(()=>{IDBObjectStore.prototype.put=originalSavePut;});await b.evaluate(()=>BugmoogSaves.flush());await close(b);
 console.log('PASS write failure reported, unsaved progress recoverable, retry succeeds');
 assert.deepEqual(errors,[]);console.log('ALL SAVE INTEGRATION CHECKS PASSED');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
