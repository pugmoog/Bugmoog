The Powder Toy 100.1.400 — experimental single-thread web build

Open through a normal static HTTP server, not file://:
  cd into this folder
  python3 -m http.server 8007
Then visit http://localhost:8007/

iframe-test.html embeds the game in an ordinary iframe. No COOP/COEP headers,
service worker, SharedArrayBuffer, or top-window navigation are required.
All executable game files are local: index.html, powder.js, powder.wasm.

Changes from official v100.1.400:
- Removed Emscripten pthread/shared-memory compilation and linking.
- Rendering always runs on the main thread; its threaded option is disabled.
- Newtonian gravity retains FFT calculations, running synchronously.
- Background tasks run synchronously and report completion through normal polling.
- HTTP features are disabled: online save browsing, account login and uploads
  are unavailable. Local simulation and browser filesystem storage remain.
- Native platform clipboard integration is disabled.

Large tasks and complex simulations may briefly stall the UI. This is an
unofficial build, not an upstream release. Browser storage remains subject to
private browsing, iframe storage policies, and clearing site data.

Source: https://github.com/The-Powder-Toy/The-Powder-Toy/tree/v100.1.400
Commit: d768aeb89acad986bd252d7e904bf44bb374545f
The included modified-source.tar.gz contains the modified source and prebuilt
upstream dependency bundle. single-thread.patch records the source changes.
See BUILD.txt for the build recipe and LICENSE for the upstream license.
