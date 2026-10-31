/* Hosted game runtime. The parent website owns the durable record. */
(() => {
  'use strict';
  const C = window.BugmoogSaveCommon, D = window.BugmoogSaveDB;
  const frame = document.getElementById('gameFrame');
  const params = new URLSearchParams(location.search);
  const suppliedURL = params.get('game');
  const url = new URL(suppliedURL || '.', location.href);
  const isGame = url.origin === location.origin && url.pathname.startsWith(new URL('games/', location.href).pathname);
  if (!isGame) {
    if (params.get('deviceIdentity') === '1') url.hash = 'device-identity';
    frame.src = url.href; return;
  }
  let port, record, hostOrigin, revision = 0, savedRevision = -1, timer, running, ready = false, disposed = false;
  const prefix = '__bugmoog_session_' + C.uuid() + ':';
  const windows = new Set(), databases = new Set(), dirty = new Map(), pending = new Map();
  let sessionData = Object.create(null);
  function report(err) {
    const message = err.message || String(err);
    port?.postMessage({ type: 'error', message });
    const box = document.getElementById('game-save-error'); box.textContent = 'Save failed: ' + message; box.hidden = false;
    if (record && ready) {
      const button = document.createElement('button'); button.textContent = 'Download this game’s save';
      button.onclick = async () => {
        button.disabled = true;
        try {
          await engineFlush();
          for (const name of databases) {
            const data = await D.snapshot(prefix, name);
            record.databases = record.databases.filter(x => x.name !== name);
            if (data) record.databases.push(data);
          }
          const copy = structuredClone(record);
          copy.warnings.push('Recovery file: includes only this game.');
          const text = await C.pack({ version: 1, origin: hostOrigin, exportedAt: new Date().toISOString(), games: [copy] });
          const a = document.createElement('a'), href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
          a.href = href; a.download = 'Bugmoog-recovery.bugmoog-save.json'; a.click(); setTimeout(() => URL.revokeObjectURL(href), 60000);
        } catch (err) { box.append(document.createTextNode(' Recovery failed: ' + err.message)); }
        finally { button.disabled = false; }
      };
      box.append(' ', button);
    }
  }
  function warn(message) {
    if (!record.warnings.includes(message)) { record.warnings.push(message); changed(); }
  }
  function changed() {
    revision++;
    clearTimeout(timer);
    timer = setTimeout(() => flush(false).catch(report), 750);
  }
  function notice(type, name) {
    if (type === 'warning') { warn(name); return; }
    if (type === 'error') { warn(name); report(new Error(name)); return; }
    databases.add(name);
    if (type === 'seen') return;
    dirty.set(name, (dirty.get(name) || 0) + 1); changed();
  }
  function sendRecord() {
    const id = C.uuid();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => { pending.delete(id); reject(new Error('The launching website did not confirm the save.')); }, 20000);
      pending.set(id, { resolve, reject, timeout });
      port.postMessage({ type: 'write', id, record });
    });
  }
  async function engineFlush() {
    for (const win of windows) {
      try {
        const manager = win.EJS_emulator?.started && win.EJS_emulator.gameManager;
        if (manager) {
          await manager.saveSaveFiles();
          if (manager.FS?.syncfs) await new Promise((resolve, reject) => manager.FS.syncfs(false, err => err ? reject(err) : resolve()));
        }
        const filesystems = new Set([win.Module?.FS, win.unityInstance?.Module?.FS, win.gameInstance?.Module?.FS]);
        for (const fs of filesystems) if (fs?.syncfs && fs !== manager?.FS) await new Promise((resolve, reject) => fs.syncfs(false, err => err ? reject(err) : resolve()));
      } catch (err) { throw new Error('Game filesystem save failed: ' + err.message); }
    }
  }
  function scanFrames() {
    for (const win of windows) {
      try {
        for (const nested of win.document.querySelectorAll('iframe')) {
          try {
            if (nested.contentWindow.location.href === 'about:blank') continue;
            if (nested.contentWindow.location.origin !== location.origin) warn('An external game frame has saves that Bugmoog cannot capture.');
            else if (!windows.has(nested.contentWindow)) warn('A nested game frame does not use the save integration.');
          } catch { warn('An external game frame has saves that Bugmoog cannot capture.'); }
        }
      } catch { warn('A game frame navigated outside the save integration.'); }
    }
  }
  async function flush(force = true) {
    if (!ready || disposed) return;
    if (force) { scanFrames(); await engineFlush(); }
    if (running) { await running; if (savedRevision === revision && !dirty.size) return; }
    running = (async () => {
      const start = revision;
      // Also discover writes that were committed by a worker just before this flush.
      const names = force ? [...databases] : [...dirty.keys()];
      for (const name of names) {
        const generation = dirty.get(name);
        const data = await D.snapshot(prefix, name);
        record.databases = record.databases.filter(x => x.name !== name);
        if (data) record.databases.push(data);
        if (dirty.get(name) === generation) dirty.delete(name);
      }
      if (savedRevision !== start || names.length) {
        await sendRecord(); savedRevision = start;
        document.getElementById('game-save-error').hidden = true;
      }
    })();
    try { await running; } finally { running = null; }
    if (force && (savedRevision !== revision || dirty.size)) return flush(false);
  }
  function storage(data, persist, win) {
    const methods = {
      getItem: key => Object.hasOwn(data, String(key)) ? data[String(key)] : null,
      setItem(key, value) { data[String(key)] = String(value); persist(); },
      removeItem(key) { delete data[String(key)]; persist(); },
      clear() { for (const key of Object.keys(data)) delete data[key]; persist(); },
      key: n => Object.keys(data)[Number(n) >>> 0] ?? null
    };
    return new Proxy(Object.create(win.Storage.prototype), {
      get(_, key) {
        if (key === 'length') return Object.keys(data).length;
        if (key === Symbol.toStringTag) return 'Storage';
        if (Object.hasOwn(methods, key)) return methods[key];
        return Object.hasOwn(data, key) ? data[key] : undefined;
      },
      set(_, key, value) { if (typeof key !== 'string') return false; methods.setItem(key, value); return true; },
      deleteProperty(_, key) { methods.removeItem(key); return true; },
      ownKeys: () => Object.keys(data),
      has: (_, key) => key === 'length' || Object.hasOwn(methods, key) || Object.hasOwn(data, key),
      getOwnPropertyDescriptor: (_, key) => Object.hasOwn(data, key) ? { value: data[key], enumerable: true, configurable: true, writable: true } : undefined,
      defineProperty(_, key, descriptor) { if (!Object.hasOwn(descriptor, 'value')) return false; methods.setItem(key, descriptor.value); return true; }
    });
  }
  function installWorkers(target, prefix, notify, scope, base) {
    if (!target.Worker) return;
    const NativeWorker = target.Worker;
    // Keep inline worker source available without importing a second blob URL.
    // WebKit can fail that import before the game receives its first reply.
    const blobs = new Map();
    const createURL = target.URL.createObjectURL.bind(target.URL);
    const revokeURL = target.URL.revokeObjectURL.bind(target.URL);
    target.URL.createObjectURL = blob => {
      const url = createURL(blob);
      if (blob instanceof target.Blob) blobs.set(url, blob);
      return url;
    };
    target.URL.revokeObjectURL = url => { blobs.delete(String(url)); revokeURL(url); };
    function Worker(url, options = {}) {
      const absolute = new target.URL(String(url), base).href;
      const module = options.type === 'module';
      const inline = blobs.get(absolute);
      const source = `(() => {const notify=(type,name)=>postMessage({__bugmoogWorker:true,type,name});
        (${scope.toString()})(self,${JSON.stringify(prefix)},notify);
        const base=${JSON.stringify(absolute)};
        const nativeFetch=self.fetch;self.fetch=(input,options)=>nativeFetch(typeof input==='string'?new URL(input,base).href:input,options);
        const NativeRequest=self.Request;self.Request=class extends NativeRequest{constructor(input,options){super(typeof input==='string'?new URL(input,base).href:input,options)}};
        ${module ? '' : 'const nativeImport=self.importScripts;self.importScripts=(...urls)=>nativeImport(...urls.map(u=>new URL(u,base).href));'}
        (${installWorkers.toString()})(self,${JSON.stringify(prefix)},notify,${scope.toString()},base);
        ${inline ? '' : module ? 'import(base).catch(e=>{notify("warning","A game worker failed to start: "+e.message);throw e;});' : 'importScripts(base);'}
        })();\n`;
      const blob = createURL(new target.Blob(inline ? [source, inline] : [source], { type: 'text/javascript' }));
      const worker = new NativeWorker(blob, options);
      worker.addEventListener('message', e => {
        if (!e.data?.__bugmoogWorker) return;
        e.stopImmediatePropagation(); notify(e.data.type, e.data.name);
      });
      worker.addEventListener('error', () => notify('warning', 'A game worker failed; its progress may be incomplete.'));
      setTimeout(() => revokeURL(blob), 60000);
      return worker;
    }
    Worker.prototype = NativeWorker.prototype;
    Object.setPrototypeOf(Worker, NativeWorker);
    target.Worker = Worker;
  }
  function attach(win) {
    if (!ready || disposed || windows.has(win)) return;
    const gameRoot = url.pathname.replace(/\/index\.html?$/i, '').replace(/\/$/, '') + '/';
    if (win.location.origin !== url.origin || !(win.location.pathname + '/').startsWith(gameRoot)) return;
    windows.add(win);
    try {
      const localView = storage(record.local, changed, win);
      const sessionView = storage(sessionData, () => {}, win);
      Object.defineProperty(win, 'localStorage', { configurable: true, get: () => localView });
      Object.defineProperty(win, 'sessionStorage', { configurable: true, get: () => sessionView });
      Object.defineProperty(win.Document.prototype, 'cookie', {
        configurable: true,
        get() {
          const path = win.location.pathname, now = Date.now();
          return Object.values(record.cookies).filter(c => (!c.expires || c.expires > now) && (path === c.path || path.startsWith(c.path.endsWith('/') ? c.path : c.path + '/'))).map(c => c.name + '=' + c.value).join('; ');
        },
        set(text) {
          const [pair, ...parts] = String(text).split(';'), equals = pair.indexOf('='); if (equals < 1) return;
          const name = pair.slice(0, equals).trim(), value = pair.slice(equals + 1).trim();
          const attributes = Object.fromEntries(parts.map(p => { const i = p.indexOf('='); return [p.slice(0, i < 0 ? p.length : i).trim().toLowerCase(), i < 0 ? '' : p.slice(i + 1).trim()]; }));
          if (attributes.domain && attributes.domain.replace(/^\./, '') !== win.location.hostname) return;
          const path = attributes.path?.startsWith('/') ? attributes.path : win.location.pathname.slice(0, win.location.pathname.lastIndexOf('/') + 1);
          let expires = Date.parse(attributes.expires) || null;
          if (/^-?\d+$/.test(attributes['max-age'])) expires = Date.now() + Number(attributes['max-age']) * 1000;
          const key = JSON.stringify([name, path]);
          if (expires && expires <= Date.now()) delete record.cookies[key]; else record.cookies[key] = { name, value, path, expires };
          changed();
        }
      });
      win.EJS_disableDatabases = true; // HTTP cache handles emulator assets; archives contain progress only.
      D.scope(win, prefix, notice);
      installWorkers(win, prefix, notice, D.scope, win.location.href);
      if (win.SharedWorker) win.SharedWorker = function() { warn('Shared-worker saves are not supported.'); throw new win.DOMException('Shared workers cannot safely save for this website.', 'NotSupportedError'); };
      if (win.navigator.serviceWorker) win.navigator.serviceWorker.register = async () => { warn('This game uses a service worker; offline saves are not included.'); throw new win.DOMException('Service workers are disabled inside Bugmoog games.', 'NotSupportedError'); };
      if (win.navigator.storage?.getDirectory) win.navigator.storage.getDirectory = async () => { warn('This game uses private filesystem storage, which is not supported.'); throw new win.DOMException('Private filesystem saves are not supported.', 'NotSupportedError'); };
      const originalOpen = win.open;
      win.open = function(...args) { warn('Progress in separate game windows is not included.'); return originalOpen.apply(win, args); };
      win.addEventListener('pagehide', () => { flush().catch(report); windows.delete(win); });
      win.document.addEventListener('visibilitychange', () => { if (win.document.hidden) flush().catch(report); });
      win.navigator.getGamepads = () => [];
    } catch (err) { warn('Save integration failed: ' + err.message); report(err); throw err; }
  }
  let local, transient, legacyChoice;
  async function initialize(data) {
    C.validate(data);
    if (data.game !== url.href) throw new Error('Save does not match the requested game.');
    record = structuredClone(data);
    // Only explicitly named legacy game buckets are considered; never sweep site storage.
    if (!record.updatedAt && !Object.keys(record.local).length && !record.databases.length) {
      try {
        const oldLocal = localStorage.getItem('__fakeLocalStorage__:' + suppliedURL);
        const oldCookies = localStorage.getItem('__fakeCookies__:' + suppliedURL);
        if (oldLocal || oldCookies) {
          const localData = JSON.parse(oldLocal || '{}'), cookieData = JSON.parse(oldCookies || '{}');
          if (Object.values(localData).every(x => typeof x === 'string') && (Object.keys(localData).length || Object.keys(cookieData).length)) {
            const accept = new Promise(resolve => { legacyChoice = resolve; });
            port.postMessage({ type: 'legacy' });
            if (await accept) {
              record.local = localData;
              for (const [name, value] of Object.entries(cookieData)) record.cookies[JSON.stringify([name, '/'])] = { name, value: String(value), path: '/', expires: null };
            }
          }
        }
      } catch (err) { record.warnings.push('Old save could not be read: ' + err.message); }
    }
    record.local = Object.assign(Object.create(null), record.local);
    record.cookies = Object.assign(Object.create(null), record.cookies);
    local = storage(record.local, changed, window);
    transient = storage(sessionData, () => {}, window);
    if (/^__bugmoog_session_[a-f0-9-]+:$/.test(record.cachePrefix || '')) {
      for (const db of record.databases) await D.remove(record.cachePrefix + db.name);
    }
    record.cachePrefix = prefix;
    record.databases = record.databases.filter(db => !['EmulatorJS-core', 'EmulatorJS-roms', 'EmulatorJS-bios'].includes(db.name));
    for (const db of record.databases) databases.add(db.name);
    await D.restore(prefix, record.databases);
    if (url.pathname.includes('/lines-of-battle')) warn('Online account progress is controlled by the game server and is not included.');
    ready = true;
    window.BugmoogGameSave = { attach };
    frame.addEventListener('load', () => {
      if (disposed) return;
      if (!windows.has(frame.contentWindow)) { warn('This game did not load its save integration.'); report(new Error('This game did not load its save integration.')); }
    });
    frame.src = url.href;
    changed();
  }
  async function dispose() {
    disposed = true; clearTimeout(timer);
    frame.src = 'about:blank';
    await new Promise(resolve => setTimeout(resolve, 50));
    // Temporary game databases are removed only after the website has acknowledged saving.
    for (const name of databases) {
      // A game that retains connections may block deletion until navigation finishes.
      D.remove(prefix + name).catch(() => {});
    }
  }
  window.addEventListener('message', async event => {
    if (event.source !== parent || event.data?.type !== 'bugmoog-save-connect' || port) return;
    hostOrigin = event.origin;
    port = event.ports[0]; if (!port) return;
    port.onmessage = async event => {
      const data = event.data;
      if (data.type === 'legacy-choice') { legacyChoice?.(!!data.accept); legacyChoice = null; return; }
      if (data.type === 'ack') {
        const p = pending.get(data.id); if (!p) return;
        clearTimeout(p.timeout); pending.delete(data.id); data.error ? p.reject(new Error(data.error)) : p.resolve(); return;
      }
      if (!['flush', 'dispose'].includes(data.type)) return;
      try { if (data.type === 'flush') await flush(); else await dispose(); port.postMessage({ type: 'reply', id: data.id }); }
      catch (err) { report(err); port.postMessage({ type: 'reply', id: data.id, error: err.message }); }
    };
    try { await initialize(event.data.record); } catch (err) { report(err); }
  });
  parent.postMessage({ type: 'bugmoog-save-ready' }, '*');
  setInterval(() => { if (ready && !disposed) Promise.resolve().then(scanFrames).then(engineFlush).then(() => flush(false)).catch(report); }, 15000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) flush().catch(report); });
})();
