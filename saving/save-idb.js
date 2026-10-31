(() => {
  'use strict';
  const C = window.BugmoogSaveCommon;
  const nativeOpen = indexedDB.open.bind(indexedDB);
  const nativeDelete = indexedDB.deleteDatabase.bind(indexedDB);
  async function restore(prefix, databases) {
    for (const data of databases) {
      await new Promise((resolve, reject) => {
        const r = nativeOpen(prefix + data.name, data.version);
        r.onupgradeneeded = () => {
          try {
            for (const s of data.stores) {
              const store = r.result.createObjectStore(s.name, { keyPath: s.keyPath, autoIncrement: s.autoIncrement });
              for (const index of s.indexes) store.createIndex(index.name, index.keyPath, { unique: index.unique, multiEntry: index.multiEntry });
            }
          } catch (err) { r.transaction.abort(); reject(err); }
        };
        r.onerror = () => reject(r.error);
        r.onsuccess = async () => {
          const db = r.result;
          try {
            if (data.stores.length) {
              const tx = db.transaction(data.stores.map(s => s.name), 'readwrite'), complete = C.done(tx);
              for (const s of data.stores) {
                const store = tx.objectStore(s.name);
                // Preserve auto-increment counters even if the highest records were deleted.
                if (s.autoIncrement && s.nextKey > 1) {
                  const key = s.nextKey - 1, dummy = {};
                  if (s.keyPath !== null) {
                    const path = s.keyPath.split('.'); let target = dummy;
                    for (const segment of path.slice(0, -1)) { Object.defineProperty(target, segment, { value: {}, enumerable: true, writable: true, configurable: true }); target = target[segment]; }
                    Object.defineProperty(target, path.at(-1), { value: key, enumerable: true });
                    store.put(dummy);
                  } else store.put(dummy, key);
                  store.delete(key);
                }
                for (const [key, value] of s.entries) s.keyPath === null ? store.put(value, key) : store.put(value);
              }
              await complete;
            }
            resolve();
          } catch (err) { reject(err); } finally { db.close(); }
        };
      });
    }
  }
  async function snapshot(prefix, name) {
    const r = nativeOpen(prefix + name);
    let missing = false;
    r.onupgradeneeded = () => { missing = true; r.transaction.abort(); };
    let db;
    try { db = await C.req(r); } catch (err) { if (missing) return null; throw err; }
    try {
      const data = { name, version: db.version, stores: [] };
      const names = [...db.objectStoreNames];
      if (!names.length) return data;
      const tx = db.transaction(names, 'readonly'), complete = C.done(tx);
      const cursors = names.map(name => {
        const store = tx.objectStore(name);
        const s = { name, keyPath: store.keyPath, autoIncrement: store.autoIncrement, indexes: [...store.indexNames].map(n => {
          const i = store.index(n); return { name: n, keyPath: i.keyPath, unique: i.unique, multiEntry: i.multiEntry };
        }), entries: [] };
        data.stores.push(s);
        return new Promise((resolve, reject) => {
          const cursor = store.openCursor();
          cursor.onerror = () => reject(cursor.error);
          cursor.onsuccess = () => {
            if (!cursor.result) return resolve();
            s.entries.push([cursor.result.key, cursor.result.value]); cursor.result.continue();
          };
        });
      });
      await Promise.all([...cursors, complete]);
      for (const s of data.stores.filter(s => s.autoIncrement)) {
        s.nextKey = await new Promise((resolve, reject) => {
          const probe = db.transaction(s.name, 'readwrite');
          let next;
          try {
            const r = probe.objectStore(s.name).add({});
            r.onsuccess = () => { next = r.result; probe.abort(); };
            r.onerror = () => { /* Counter at maximum or a schema constraint; retain records. */ };
          } catch (err) { probe.abort(); reject(err); }
          probe.onabort = () => resolve(next);
          probe.oncomplete = () => reject(new Error('Database counter probe unexpectedly committed.'));
        });
      }
      return data;
    } finally { db.close(); }
  }
  // Self-contained so the exact same interception runs in classic and module workers.
  function scope(target, prefix, notify) {
    const factory = target.indexedDB;
    if (!factory) throw new Error('Database storage is unavailable.');
    const open = factory.open.bind(factory), remove = factory.deleteDatabase.bind(factory);
    const list = factory.databases?.bind(factory);
    const transaction = target.IDBDatabase.prototype.transaction;
    const nameGetter = Object.getOwnPropertyDescriptor(target.IDBDatabase.prototype, 'name').get;
    const realName = db => nameGetter.call(db);
    const mutated = new WeakSet();
    for (const method of ['put', 'add', 'delete', 'clear']) {
      const original = target.IDBObjectStore.prototype[method];
      target.IDBObjectStore.prototype[method] = function(...args) {
        const request = original.apply(this, args);
        if (realName(this.transaction.db).startsWith(prefix)) mutated.add(this.transaction);
        return request;
      };
    }
    Object.defineProperty(factory, 'open', { configurable: true, value(name, version) {
      name = String(name);
      const r = version === undefined ? open(prefix + name) : open(prefix + name, version);
      notify('seen', name);
      r.addEventListener('upgradeneeded', () => r.transaction.addEventListener('complete', () => notify('dirty', name)));
      r.addEventListener('error', () => notify('error', 'Database ' + name + ': ' + (r.error?.message || 'could not open')));
      r.addEventListener('success', () => {
        r.result.addEventListener('versionchange', () => r.result.close());
      });
      return r;
    } });
    Object.defineProperty(factory, 'deleteDatabase', { configurable: true, value(name) {
      name = String(name); const r = remove(prefix + name);
      r.addEventListener('success', () => notify('deleted', name)); return r;
    } });
    if (list) Object.defineProperty(factory, 'databases', { configurable: true, value: async () => (await list()).filter(d => d.name.startsWith(prefix)).map(d => ({ name: d.name.slice(prefix.length), version: d.version })) });
    Object.defineProperty(target.IDBDatabase.prototype, 'name', { configurable: true, get() { const name = realName(this); return name.startsWith(prefix) ? name.slice(prefix.length) : name; } });
    target.IDBDatabase.prototype.transaction = function(...args) {
      const tx = transaction.apply(this, args), name = realName(this);
      if (name.startsWith(prefix) && tx.mode === 'readwrite') {
        tx.addEventListener('complete', () => { if (mutated.has(tx)) notify('dirty', name.slice(prefix.length)); });
        tx.addEventListener('abort', () => { if (tx.error) notify('error', 'Database write failed: ' + tx.error.message); });
      }
      return tx;
    };
  }
  window.BugmoogSaveDB = { restore, snapshot, scope, remove: name => new Promise((resolve, reject) => {
    const r = nativeDelete(name);
    r.onsuccess = resolve; r.onerror = () => reject(r.error);
    r.onblocked = () => reject(new Error('An older game database is still open. Close other game tabs and retry.'));
  }) };
})();
