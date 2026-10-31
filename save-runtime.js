/* Parser-blocking: restore the game's storage before any game script runs. */
(() => {
  let ancestor = window.parent;
  while (ancestor !== window) {
    try {
      if (ancestor.BugmoogGameSave) { ancestor.BugmoogGameSave.attach(window); return; }
      if (ancestor === ancestor.parent) return;
      ancestor = ancestor.parent;
    } catch { return; }
  }
})();
