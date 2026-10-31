# How Bugmoog works

Bugmoog is a static, browser-side project. It does not install an app, and `rugmoog.github.io` is not the place where the main Bugmoog interface runs. Rugmoog is the installer page for a bookmarklet.

## The repositories and sites

- `rugmoog/rugmoog.github.io` publishes `https://rugmoog.github.io/`. Its page contains draggable `javascript:` bookmarks and instructions.
- `pugmoog/Bugmoog` contains the actual menu, styling, JavaScript, images, game wrapper, and game files. GitHub Pages publishes those files below `https://pugmoog.github.io/Bugmoog/`.
- The proxy and chatroom are separate Pugmoog Pages projects. Bugmoog opens them as tools through the same full-window frame it uses for games.

## What happens when someone uses it

1. The user visits Rugmoog and saves the **Use Bugmoog** link as a bookmark.
2. The user opens MyAccess (or another page) and runs the bookmark.
3. The bookmarklet fetches `Bugmoog/menu.html` from Pugmoog Pages.
4. `document.open()`, `document.write()`, and `document.close()` replace the visible MyAccess document with that downloaded HTML. The address bar still shows the page on which the bookmarklet ran.
5. The new document loads Bugmoog's stylesheet and `script.js` from Pugmoog Pages. `script.js` builds the searchable game grid from its `games` array.
6. Selecting a game or tool opens `Bugmoog/game-page.html` in the full-window `gamePageFrame` iframe. That wrapper adds the Back and Fullscreen buttons and opens the selected item in a second, inner iframe.

The resulting nesting is roughly:

```text
original top-level page, visually replaced by the bookmarklet
└── Bugmoog menu
    └── gamePageFrame (Pugmoog's game-page.html)
        └── gameFrame (the selected game, proxy, or chatroom)
```

The two bookmarklet variants behave slightly differently. The normal one replaces the current document. **Bugmoog Underneath** appends the fetched menu HTML to the existing page and evaluates the fetched script instead.

## Loading and navigation

`script.js` has a `weburl` pointing at the published Bugmoog directory. Local game IDs are expanded into URLs below its `games/` directory. `loadPageGeneral()` accepts a complete URL, which is how the Proxy and Chatroom buttons use the same wrapper without being part of the games list.

The menu listens for `postMessage` events from `game-page.html`:

- `close` hides and clears the wrapper iframe.
- `fs` asks the outer frame to enter fullscreen.
- fullscreen state is sent back to the wrapper so it can hide or restore its controls.

The menu owns the durable save records in the launching website’s `bugmoog-saves-v1` IndexedDB database. The wrapper receives one game’s record over a private message channel, restores its storage, then navigates to the existing game URL. A parser-blocking `save-runtime.js` script in local game HTML installs the storage hooks before the game starts. LocalStorage and cookie changes, plus snapshots of changed IndexedDB databases, are sent back to the menu and acknowledged only after its transaction commits. Game databases on the asset host are temporary per-launch working copies, not shared save profiles.

## Why direct Proxy and Chatroom pages now say “Not available”

Their first script checks the hostname of the top-level browsing context. A direct visit has `pugmoog.github.io` as the top window, so the page is replaced with the Not available screen before the application starts.

When Bugmoog opens one of those tools, the top window is the page on which the bookmarklet was run, while the tool itself is still a Pugmoog iframe. The check therefore permits the tool to load. For cross-origin iframe chains, the code uses `location.ancestorOrigins` because browsers do not allow an iframe to read `top.location` directly.

This is a user-interface gate, not strong access control. It is JavaScript delivered to the browser, so a determined person can read or alter it. It is suitable for keeping the direct Pugmoog links out of the normal path, but secrets and real authorization must never depend on it.

## Hosting and updates

Everything described here is static frontend code published by GitHub Pages. Updating the Rugmoog repository changes the installer page. Updating the Bugmoog repository changes what the bookmarklet fetches the next time it runs. Updating the separate proxy or chatroom repository changes the corresponding tool the next time Bugmoog opens it.

## Local preview

Run `python3 serve-local.py` from this repository, then open `http://localhost:8765/menu.html`. The Python HTTP server binds to localhost and serves the repository, blocking hidden files and the stats backend source directory. Its read-only stats routes fetch public seven-day popularity reports and dashboard reports from the existing stats service. Local gameplay does not send analytics events.

On localhost, the menu loads `./script.js`, and the script uses relative image, analytics-helper, wrapper, and game paths. On other websites, the bookmarklet menu uses absolute URLs under `https://pugmoog.github.io/Bugmoog/`. Keep the deployment base absolute: the menu document runs on the original host website. Game IDs and deployed wrapper query URLs remain stable.

Most Popular and Least Popular use `game_open` counts from the seven days before the report request, rather than the all-time popularity endpoint. Counts retain the stats service’s hourly resolution.

The full changelog is embedded in the menu. The implemented unified save system, archive controls, and remaining game-specific limitations are documented in `docs/progress-saving.html`. The Saves dialog exports files or codes, previews imports with per-game selection, and retains a rollback copy. Existing game URLs are unchanged; websites are separated naturally by their native storage origins.

## Save integration maintenance

New local game HTML files must include a parser-blocking relative script reference to `save-runtime.js` before any game script. Each nested local HTML document needs it too. Do not add `async` or `defer`: startup reads must use restored storage. `save-host.js` runs in the menu’s origin; `save-wrapper.js` runs on the asset origin. The initial connection validates the wrapper window and asset origin, then uses a dedicated MessageChannel. Only the selected game record is sent.

Host records use structured-clone data in IndexedDB. Portable archives use a versioned graph encoding and CRC32 corruption check; the checksum is not encryption or authentication. Imports never evaluate code. The host’s games/leases/backups stores are updated in transactions; leases and revision checks prevent stale tab writes. Legacy shim buckets are copied only with the player’s confirmation, and never removed automatically.
