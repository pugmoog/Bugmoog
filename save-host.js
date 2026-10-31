/* Runs in the launching website, which owns the durable saves. */
(() => {
  'use strict';
  const C = window.BugmoogSaveCommon;
  const session = C.uuid();
  const frame = document.getElementById('gamePageFrame');
  const assetBase = new URL('.', document.currentScript.src);
  const allowedOrigin = assetBase.origin;
  const pending = new Map();
  let dbPromise, active = null, channel = null, lastError = '', operation = false;
  const dialog = document.getElementById('saves-dialog');
  const output = document.getElementById('save-message');
  function error(err, persistent = false) {
    const message = err.message || String(err);
    if (persistent) lastError = message;
    output.textContent = message;
    const indicator = document.getElementById('save-error');
    indicator.textContent = message;
    indicator.hidden = false;
  }
  function openDB() {
    if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
      const r = indexedDB.open('bugmoog-saves-v1', 1);
      r.onupgradeneeded = () => {
        r.result.createObjectStore('games', { keyPath: 'game' });
        r.result.createObjectStore('leases', { keyPath: 'game' });
        r.result.createObjectStore('backups', { keyPath: 'id' });
      };
      r.onsuccess = () => { r.result.onversionchange = () => r.result.close(); resolve(r.result); };
      r.onerror = () => { dbPromise = null; reject(r.error); };
      r.onblocked = () => reject(new Error('Close other Bugmoog tabs to open saves.'));
    });
    return dbPromise;
  }
  const empty = game => ({ game, local: {}, cookies: {}, databases: [], warnings: [], revision: 0, updatedAt: null });
  async function claim(game) {
    const db = await openDB(), tx = db.transaction(['games', 'leases'], 'readwrite'), complete = C.done(tx);
    const leases = tx.objectStore('leases');
    const oldLease = await C.req(leases.get(game));
    if (oldLease && oldLease.session !== session && oldLease.expires > Date.now()) {
      tx.abort(); await complete.catch(() => {}); throw new Error('This game is open in another Bugmoog tab. Close it there first.');
    }
    leases.put({ game, session, expires: Date.now() + 45000 });
    const record = await C.req(tx.objectStore('games').get(game));
    await complete;
    return record || empty(game);
  }
  async function release() {
    if (!active) return;
    const game = active.game; active = null; lastError = ''; document.getElementById('save-error').hidden = true; channel?.close(); channel = null;
    for (const { reject, timer } of pending.values()) { clearTimeout(timer); reject(new Error('Game closed.')); }
    pending.clear();
    const db = await openDB(), tx = db.transaction('leases', 'readwrite'), complete = C.done(tx), store = tx.objectStore('leases');
    const lease = await C.req(store.get(game));
    if (lease?.session === session) store.delete(game);
    await complete;
  }
  async function write(record) {
    C.validate(record);
    if (!active || record.game !== active.game) throw new Error('Wrong save destination.');
    const db = await openDB(), tx = db.transaction(['games', 'leases'], 'readwrite'), complete = C.done(tx);
    const leases = tx.objectStore('leases'), games = tx.objectStore('games');
    const lease = await C.req(leases.get(record.game));
    const old = await C.req(games.get(record.game));
    if (lease?.session !== session || (old?.revision || 0) !== active.revision) {
      tx.abort(); await complete.catch(() => {}); throw new Error('Another tab changed this save. Export this game before reloading.');
    }
    const revision = active.revision + 1;
    games.put({ ...record, revision, updatedAt: new Date().toISOString() });
    leases.put({ game: record.game, session, expires: Date.now() + 45000 });
    await complete; active.revision = revision;
    lastError = ''; document.getElementById('save-error').hidden = true;
  }
  function request(type) {
    if (!channel) return Promise.resolve();
    const id = C.uuid();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { pending.delete(id); reject(new Error('The game did not finish saving. Keep it open and retry.')); }, 30000);
      pending.set(id, { resolve, reject, timer }); channel.postMessage({ type, id });
    });
  }
  async function connect(event) {
    if (event.origin !== allowedOrigin || event.source !== frame.contentWindow || event.data?.type !== 'bugmoog-save-ready') return;
    const game = active?.game;
    if (!game) return;
    const pair = new MessageChannel(); channel?.close(); channel = pair.port1;
    let chain = Promise.resolve();
    channel.onmessage = event => {
      const data = event.data;
      if (data.type === 'reply') {
        const item = pending.get(data.id); if (!item) return;
        clearTimeout(item.timer); pending.delete(data.id);
        data.error ? item.reject(new Error(data.error)) : item.resolve(data.value); return;
      }
      chain = chain.then(async () => {
        if (data.type === 'write') {
          try { await write(data.record); channel?.postMessage({ type: 'ack', id: data.id }); }
          catch (err) { error(err, true); channel?.postMessage({ type: 'ack', id: data.id, error: err.message }); }
        } else if (data.type === 'error') error(new Error(data.message), true);
        else if (data.type === 'legacy') {
          const accept = confirm('An older save was found for this game. Copy it into this website’s saves?');
          channel?.postMessage({ type: 'legacy-choice', accept });
        }
      }).catch(error);
    };
    frame.contentWindow.postMessage({ type: 'bugmoog-save-connect', record: active.record }, allowedOrigin, [pair.port2]);
  }
  window.addEventListener('message', connect);
  setInterval(async () => {
    if (!active) return;
    try {
      const db = await openDB(), tx = db.transaction('leases', 'readwrite'), complete = C.done(tx), store = tx.objectStore('leases');
      const lease = await C.req(store.get(active.game));
      if (lease?.session === session) store.put({ ...lease, expires: Date.now() + 45000 });
      await complete;
    } catch (err) { error(err); }
  }, 10000);
  async function archive() {
    await request('flush');
    const db = await openDB(), tx = db.transaction(['games', 'leases'], 'readonly'), complete = C.done(tx);
    const other = (await C.req(tx.objectStore('leases').getAll())).filter(x => x.session !== session && x.expires > Date.now());
    if (other.length) throw new Error('Close games in your other Bugmoog tabs before exporting.');
    const games = await C.req(tx.objectStore('games').getAll()); await complete;
    if (lastError) throw new Error(lastError);
    for (const record of games) delete record.cachePrefix;
    return { version: 1, origin: location.origin, exportedAt: new Date().toISOString(), games };
  }
  function label(game) {
    const id = new URL(game).pathname.split('/').filter(Boolean).pop();
    return document.querySelector(`.game[data-id="${CSS.escape(id)}"] h3`)?.textContent || decodeURIComponent(id);
  }
  function download(text) {
    const a = document.createElement('a'), url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.href = url; a.download = 'Bugmoog-' + new Date().toISOString().slice(0, 10) + '.bugmoog-save.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  async function show() {
    dialog.showModal(); output.textContent = '';
    const list = document.getElementById('save-list'); list.replaceChildren();
    try {
      const saved = await archive();
      for (const record of saved.games) {
        const row = document.createElement('li');
        row.textContent = label(record.game) + (record.warnings.length ? ': ' + record.warnings.join('; ') : '');
        list.append(row);
      }
      if (!saved.games.length) output.textContent = 'No saved progress on this website yet.';
    } catch (err) { error(err); }
  }
  async function busy(fn) {
    if (operation) return; operation = true;
    for (const b of dialog.querySelectorAll('[data-save-action]')) b.disabled = true;
    try { await fn(); } catch (err) { error(err); }
    finally { operation = false; for (const b of dialog.querySelectorAll('[data-save-action]')) b.disabled = false; }
  }
  let staged = null;
  async function preview(text) {
    staged = null; document.getElementById('save-apply').hidden = true;
    const candidate = C.unpack(text), normalized = new Set();
    const db = await openDB(); const existing = await C.req(db.transaction('games').objectStore('games').getAll());
    const ids = new Set(existing.map(r => r.game));
    const container = document.getElementById('save-import-preview'); container.replaceChildren();
    const info = document.createElement('p'); info.textContent = `${candidate.origin} · ${candidate.exportedAt || 'Unknown date'}`; container.append(info);
    for (const record of candidate.games) {
      // A local preview export can be copied into deployment, and vice versa.
      const parsed = new URL(record.game), assetPath = new URL('games/', assetBase).pathname;
      const marker = parsed.pathname.indexOf('/games/');
      if (marker < 0) throw new Error('Save includes a game outside Bugmoog.');
      record.game = new URL(assetPath + parsed.pathname.slice(marker + 7) + parsed.search, assetBase.origin).href;
      if (normalized.has(record.game)) throw new Error('Duplicate game in import.');
      normalized.add(record.game);
      delete record.cachePrefix;
      const row = document.createElement('label'), check = document.createElement('input');
      check.type = 'checkbox'; check.checked = true; check.value = record.game;
      row.append(check, ' ' + label(record.game) + (ids.has(record.game) ? ' — replace' : ' — add'));
      container.append(row, document.createElement('br'));
    }
    staged = candidate;
    document.getElementById('save-apply').hidden = false;
    output.textContent = '';
  }
  async function apply() {
    if (!staged) return;
    const selected = new Set([...document.querySelectorAll('#save-import-preview input:checked')].map(x => x.value));
    if (!selected.size) throw new Error('Select at least one game.');
    if (!confirm('Import the selected games and replace their current saves? A rollback copy will be kept.')) return;
    if (active) await window.closePage();
    if (active) throw new Error('Close the running game before importing.');
    const db = await openDB(), tx = db.transaction(['games', 'leases', 'backups'], 'readwrite'), complete = C.done(tx);
    const leases = await C.req(tx.objectStore('leases').getAll());
    if (leases.some(x => x.expires > Date.now())) { tx.abort(); await complete.catch(() => {}); throw new Error('Close games in other Bugmoog tabs before importing.'); }
    const store = tx.objectStore('games'), before = await C.req(store.getAll());
    tx.objectStore('backups').put({ id: 'before-import', games: before });
    for (const record of staged.games) if (selected.has(record.game)) store.put({ ...record, revision: (before.find(x => x.game === record.game)?.revision || 0) + 1, updatedAt: new Date().toISOString() });
    await complete;
    staged = null; document.getElementById('save-import-preview').replaceChildren(); document.getElementById('save-apply').hidden = true;
    output.textContent = 'Progress imported.';
  }
  async function rollback() {
    if (!confirm('Restore the saves from before the last import?')) return;
    if (active) await window.closePage();
    if (active) throw new Error('Close the running game first.');
    const db = await openDB(), tx = db.transaction(['games', 'leases', 'backups'], 'readwrite'), complete = C.done(tx);
    const leases = await C.req(tx.objectStore('leases').getAll());
    const backup = await C.req(tx.objectStore('backups').get('before-import'));
    if (!backup || leases.some(x => x.expires > Date.now())) {
      tx.abort(); await complete.catch(() => {}); throw new Error(!backup ? 'No rollback copy exists.' : 'Close games in other tabs first.');
    }
    const store = tx.objectStore('games'), current = await C.req(store.getAll());
    store.clear(); for (const record of backup.games) store.put(record);
    tx.objectStore('backups').put({ id: 'before-import', games: current });
    await complete; output.textContent = 'Previous saves restored.';
  }
  document.getElementById('saves-button').onclick = show;
  document.getElementById('save-download').onclick = () => busy(async () => {
    const data = await archive();
    if (data.games.some(x => x.warnings.length) && !confirm('Some games have save limitations listed below. Download the captured progress anyway?')) return;
    download(await C.pack(data)); output.textContent = 'Save file downloaded.';
  });
  document.getElementById('save-copy').onclick = () => busy(async () => {
    const data = await archive();
    if (data.games.some(x => x.warnings.length) && !confirm('Some games have save limitations. Copy the captured progress anyway?')) return;
    const code = C.code(await C.pack(data));
    const input = document.getElementById('save-code'); input.value = code; input.focus(); input.select();
    try { await navigator.clipboard.writeText(code); output.textContent = 'Save code copied.'; }
    catch { output.textContent = 'Copy the selected save code, or download the file.'; }
  });
  document.getElementById('save-file').onchange = e => busy(async () => {
    const file = e.target.files[0]; if (!file) return;
    if (file.size > C.LIMIT) throw new Error('Save exceeds the 512 MB import limit.');
    await preview(await file.text()); e.target.value = '';
  });
  document.getElementById('save-preview').onclick = () => busy(() => preview(document.getElementById('save-code').value.trim()));
  document.getElementById('save-apply').onclick = () => busy(apply);
  document.getElementById('save-rollback').onclick = () => busy(rollback);
  window.BugmoogSaves = {
    async prepare(url) {
      const game = new URL(url, location.href).href;
      if (!game.startsWith(new URL('games/', assetBase).href)) return;
      const record = await claim(game); active = { game, revision: record.revision || 0, record }; lastError = '';
    },
    flush: () => request('flush'),
    async close() { await request('flush'); await request('dispose'); await release(); },
    error,
    // Available to the integration tests; these operate only on Bugmoog's database.
    archive, preview, apply, rollback
  };
})();
