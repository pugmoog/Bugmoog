MINESWEEPER — LOCAL ASSET PACKAGE

Start with index.html. Keep all folders in their existing locations.

GITHUB PAGES
Extract this ZIP and upload its CONTENTS to the root of your Pages repository.
The root should contain index.html, game1.js through game6.js, fonts/, images/,
logos/, kpui/, ui/, and .nojekyll. Enable Pages for the branch and root folder
containing these files. No build tools are needed.

LOCAL COMPUTER
Serve this folder with a static web server (for example: python3 -m http.server).
Opening index.html as a file may prevent the audio bundles from loading due to
browser restrictions. GitHub Pages serves them over HTTPS and avoids that issue.

CONTENTS AND CHANGES
HTML and inline CSS, six JavaScript files, image assets, local Roboto font,
and game_audio.bin / music_audio.bin containing sound effects and music.
Replaced external gameplay asset URLs with relative local paths.
Fixed script execution order by using defer instead of async.
Added a viewport tag and a policy that blocks external resource requests.
Original Google search support code remains in the scripts, including unused
external URL strings. External resources are blocked by the page policy.
Telemetry log/error senders and the background bgasy request are disabled.
local-only.js permits fetch/XHR/image requests only for packaged asset files and
disables analytics beacons. Local audio requests remain enabled. Social sharing is not part of the offline functionality.

VERIFICATION
Latest telemetry cleanup was not tested, as requested. The checks below describe
the earlier version before this cleanup.
Tested from a local server under /minesweeper/ (a project-subfolder path).
Confirmed board rendering, cell reveal, running timer, and flag count changes.
Confirmed both audio bundles and flag animation load successfully from local files.
Not tested on physical iPad hardware; audible output was not independently verified.

SOURCE
https://www.minesweepergoogle.com/gameapp.html
Additional missing assets retrieved from Google's public asset URLs.
See asset-sources.json for individual sources.
This is an unofficial downloaded copy; original code/assets retain their ownership.
