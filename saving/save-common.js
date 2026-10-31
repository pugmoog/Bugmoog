/* Shared archive codec. Values remain data; imports never evaluate code. */
(() => {
  'use strict';
  const LIMIT = 512 * 1024 * 1024;
  const req = request => new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const done = tx => new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onabort = () => reject(tx.error || new Error('Save transaction aborted.'));
    tx.onerror = () => {};
  });
  function b64(bytes) {
    let result = '';
    for (let i = 0; i < bytes.length; i += 32768) result += String.fromCharCode(...bytes.subarray(i, i + 32768));
    return btoa(result);
  }
  function unb64(value) { return Uint8Array.from(atob(value), c => c.charCodeAt(0)); }
  function checksum(text) {
    let hash = 0xffffffff;
    for (const byte of new TextEncoder().encode(text)) {
      hash ^= byte;
      for (let i = 0; i < 8; i++) hash = (hash >>> 1) ^ ((hash & 1) ? 0xedb88320 : 0);
    }
    return ((hash ^ 0xffffffff) >>> 0).toString(16).padStart(8, '0');
  }
  async function encode(value) {
    const nodes = [], seen = new Map();
    async function visit(v) {
      if (v === null || ['string', 'boolean'].includes(typeof v)) return v;
      if (typeof v === 'number' && Number.isFinite(v) && !Object.is(v, -0)) return v;
      if (typeof v === 'undefined') return { scalar: 'undefined' };
      if (typeof v === 'bigint') return { scalar: 'bigint', value: String(v) };
      if (typeof v === 'number') return { scalar: 'number', value: Object.is(v, -0) ? '-0' : String(v) };
      if (typeof v !== 'object') throw new Error('This save contains an unsupported value.');
      if (seen.has(v)) return { ref: seen.get(v) };
      const id = nodes.length; seen.set(v, id); nodes.push(null);
      let node;
      if (v instanceof Date) node = { type: 'Date', value: v.getTime() };
      else if (v instanceof RegExp) node = { type: 'RegExp', source: v.source, flags: v.flags };
      else if (v instanceof Blob) node = { type: 'Blob', mime: v.type, name: v instanceof File ? v.name : null, modified: v.lastModified, value: b64(new Uint8Array(await v.arrayBuffer())) };
      else if (v instanceof ArrayBuffer) node = { type: 'ArrayBuffer', value: b64(new Uint8Array(v)) };
      else if (ArrayBuffer.isView(v)) node = { type: 'View', kind: v.constructor.name, buffer: await visit(v.buffer), offset: v.byteOffset, length: v instanceof DataView ? v.byteLength : v.length };
      else if (v instanceof Map) { node = { type: 'Map', entries: [] }; for (const [k, x] of v) node.entries.push([await visit(k), await visit(x)]); }
      else if (v instanceof Set) { node = { type: 'Set', entries: [] }; for (const x of v) node.entries.push(await visit(x)); }
      else if (Array.isArray(v)) { node = { type: 'Array', entries: [] }; for (const x of v) node.entries.push(await visit(x)); }
      else { node = { type: 'Object', entries: [] }; for (const [k, x] of Object.entries(v)) node.entries.push([k, await visit(x)]); }
      nodes[id] = node;
      return { ref: id };
    }
    return { root: await visit(value), nodes };
  }
  function decode(graph) {
    if (!graph || !Array.isArray(graph.nodes) || graph.nodes.length > 3000000) throw new Error('Invalid save data.');
    const values = new Map(), views = new Set();
    const types = { Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array, DataView };
    function visit(v) {
      if (v === null || ['string', 'boolean', 'number'].includes(typeof v)) return v;
      if (!v || typeof v !== 'object') throw new Error('Invalid save value.');
      if (v.scalar === 'undefined') return undefined;
      if (v.scalar === 'bigint') return BigInt(v.value);
      if (v.scalar === 'number' && ['NaN', 'Infinity', '-Infinity', '-0'].includes(v.value)) return Number(v.value);
      const id = v.ref;
      if (!Number.isInteger(id) || id < 0 || id >= graph.nodes.length) throw new Error('Invalid save reference.');
      if (values.has(id)) return values.get(id);
      const n = graph.nodes[id]; let result;
      switch (n.type) {
        case 'Object': result = {}; break;
        case 'Array': result = []; break;
        case 'Map': result = new Map(); break;
        case 'Set': result = new Set(); break;
        case 'Date': result = new Date(n.value); break;
        case 'RegExp': result = new RegExp(n.source, n.flags); break;
        case 'ArrayBuffer': result = unb64(n.value).buffer; break;
        case 'Blob': result = n.name === null ? new Blob([unb64(n.value)], { type: n.mime }) : new File([unb64(n.value)], n.name, { type: n.mime, lastModified: n.modified }); break;
        case 'View':
          if (!Object.hasOwn(types, n.kind) || views.has(id)) throw new Error('Invalid binary save.');
          views.add(id); result = new types[n.kind](visit(n.buffer), n.offset, n.length); views.delete(id); break;
        default: throw new Error('Unsupported save value.');
      }
      values.set(id, result);
      if (n.type === 'Object') for (const [k, x] of n.entries) Object.defineProperty(result, k, { value: visit(x), enumerable: true, writable: true, configurable: true });
      if (n.type === 'Array') for (const x of n.entries) result.push(visit(x));
      if (n.type === 'Map') for (const [k, x] of n.entries) result.set(visit(k), visit(x));
      if (n.type === 'Set') for (const x of n.entries) result.add(visit(x));
      return result;
    }
    return visit(graph.root);
  }
  function validate(record) {
    if (!record || typeof record.game !== 'string' || record.game.length > 4096 || !/^https?:/.test(record.game)) throw new Error('Invalid game in save.');
    for (const field of ['local', 'cookies']) if (!record[field] || typeof record[field] !== 'object' || Array.isArray(record[field])) throw new Error('Invalid storage in save.');
    if (Object.values(record.local).some(v => typeof v !== 'string')) throw new Error('Invalid local save.');
    for (const cookie of Object.values(record.cookies)) {
      if (!cookie || typeof cookie.name !== 'string' || typeof cookie.value !== 'string' || typeof cookie.path !== 'string' || !cookie.path.startsWith('/') || (cookie.expires !== null && !Number.isFinite(cookie.expires))) throw new Error('Invalid saved cookie.');
    }
    if (!Array.isArray(record.databases) || record.databases.length > 1000) throw new Error('Invalid databases in save.');
    const names = new Set();
    for (const db of record.databases) {
      if (typeof db.name !== 'string' || names.has(db.name) || !Number.isSafeInteger(db.version) || db.version < 1 || !Array.isArray(db.stores)) throw new Error('Invalid database schema.');
      names.add(db.name); const stores = new Set();
      for (const s of db.stores) {
        if (typeof s.name !== 'string' || stores.has(s.name) || !Array.isArray(s.entries) || !Array.isArray(s.indexes)) throw new Error('Invalid database store.');
        stores.add(s.name);
        if (s.keyPath !== null && typeof s.keyPath !== 'string' && !(Array.isArray(s.keyPath) && s.keyPath.every(k => typeof k === 'string'))) throw new Error('Invalid key path.');
        if (typeof s.autoIncrement !== 'boolean' || (s.nextKey !== undefined && (!Number.isSafeInteger(s.nextKey) || s.nextKey < 1))) throw new Error('Invalid database counter.');
        const indexes = new Set();
        for (const index of s.indexes) {
          if (!index || typeof index.name !== 'string' || indexes.has(index.name) || typeof index.unique !== 'boolean' || typeof index.multiEntry !== 'boolean' || !(typeof index.keyPath === 'string' || (Array.isArray(index.keyPath) && index.keyPath.every(k => typeof k === 'string')))) throw new Error('Invalid database index.');
          indexes.add(index.name);
        }
        for (const pair of s.entries) {
          if (!Array.isArray(pair) || pair.length !== 2) throw new Error('Invalid database entry.');
          try { indexedDB.cmp(pair[0], pair[0]); } catch { throw new Error('Invalid database key.'); }
        }
      }
    }
    if (!Array.isArray(record.warnings) || record.warnings.some(x => typeof x !== 'string')) throw new Error('Invalid save status.');
    return record;
  }
  async function pack(archive) {
    const payload = JSON.stringify(await encode(archive));
    return JSON.stringify({ format: 'bugmoog-save', version: 1, checksum: checksum(payload), payload });
  }
  function unpack(text) {
    if (text.length > LIMIT) throw new Error('Save exceeds the 512 MB import limit.');
    if (text.startsWith('BUGMOOG1:')) text = new TextDecoder('utf-8', { fatal: true }).decode(unb64(text.slice(9).replace(/\s/g, '')));
    const envelope = JSON.parse(text);
    if (envelope.format !== 'bugmoog-save' || envelope.version !== 1 || typeof envelope.payload !== 'string') throw new Error('Not a supported Bugmoog save.');
    if (checksum(envelope.payload) !== envelope.checksum) throw new Error('Save is damaged or incomplete.');
    const archive = decode(JSON.parse(envelope.payload));
    if (!archive || archive.version !== 1 || typeof archive.origin !== 'string' || !Array.isArray(archive.games) || archive.games.length > 1000) throw new Error('Invalid save archive.');
    const games = new Set();
    for (const record of archive.games) { validate(record); if (games.has(record.game)) throw new Error('Duplicate game in save.'); games.add(record.game); }
    return archive;
  }
  const uuid = () => typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint8Array(16)), n => n.toString(16).padStart(2, '0')).join('');
  window.BugmoogSaveCommon = { uuid, req, done, encode, decode, pack, unpack, validate, LIMIT, code: text => 'BUGMOOG1:' + b64(new TextEncoder().encode(text)) };
})();
