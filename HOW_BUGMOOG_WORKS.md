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

The wrapper also stores a small per-game cookie substitute in its own `localStorage`. That is why some same-origin games can retain progress, although browser origin rules mean it is not a universal replacement for real cookies.

## Why direct Proxy and Chatroom pages now say “Not available”

Their first script checks the hostname of the top-level browsing context. A direct visit has `pugmoog.github.io` as the top window, so the page is replaced with the Not available screen before the application starts.

When Bugmoog opens one of those tools, the top window is the page on which the bookmarklet was run, while the tool itself is still a Pugmoog iframe. The check therefore permits the tool to load. For cross-origin iframe chains, the code uses `location.ancestorOrigins` because browsers do not allow an iframe to read `top.location` directly.

This is a user-interface gate, not strong access control. It is JavaScript delivered to the browser, so a determined person can read or alter it. It is suitable for keeping the direct Pugmoog links out of the normal path, but secrets and real authorization must never depend on it.

## Hosting and updates

Everything described here is static frontend code published by GitHub Pages. Updating the Rugmoog repository changes the installer page. Updating the Bugmoog repository changes what the bookmarklet fetches the next time it runs. Updating the separate proxy or chatroom repository changes the corresponding tool the next time Bugmoog opens it.
