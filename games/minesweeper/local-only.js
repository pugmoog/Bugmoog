/* Local-only networking for this standalone game. */
(function () {
  "use strict";
  const base = new URL(".", document.currentScript.src);
  const paths = new Set(["game3.js", "game6.js", "game2.js", "game5.js", "game1.js", "game4.js", "fonts/roboto.css", "fonts/roboto-500-0.ttf", "ui/v1/menu/checkmark2.png", "kpui/social/fb_32x32.png", "kpui/social/twitter_32x32.png", "images/branding/googleg/1x/googleg_standard_color_128dp.png", "images/icons/material/system/2x/close_white_24dp.png", "images/icons/material/system/2x/refresh_white_24dp.png", "images/icons/material/system/2x/volume_up_white_24dp.png", "images/icons/material/system/2x/volume_off_white_24dp.png", "images/icons/material/system/1x/done_black_16dp.png", "images/icons/material/system/1x/email_grey600_24dp.png", "logos/fnbx/minesweeper/win_screen.png", "logos/fnbx/minesweeper/game_audio.bin", "logos/fnbx/minesweeper/tutorial_desktop_flag.png", "logos/fnbx/minesweeper/flag_plant.png", "logos/fnbx/minesweeper/tutorial_desktop_dig.png", "logos/fnbx/minesweeper/shovel_icon.png", "logos/fnbx/minesweeper/music_audio.bin", "logos/fnbx/minesweeper/flag_icon.png", "logos/fnbx/minesweeper/trophy_icon.png", "logos/fnbx/minesweeper/clock_icon.png", "logos/fnbx/minesweeper/lose_screen.png", "logos/fnbx/minesweeper/incorrect_flag.png"].map(path => new URL(path, base).href));
  function allowed(input) {
    try {
      const value = typeof input === "string" || input instanceof URL ? input : input.url;
      const url = new URL(value, document.baseURI);
      return !url.search && paths.has(url.href);
    } catch (_) { return false; }
  }
  // Beacons are analytics only; gameplay and audio do not use them.
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: function () { return true; } });
  if (window.fetch) {
    const fetch = window.fetch.bind(window);
    window.fetch = function (input, options) {
      if (!allowed(input)) return Promise.resolve(new Response(null, {status: 204}));
      return fetch(input, options);
    };
  }
  const open = XMLHttpRequest.prototype.open;
  const send = XMLHttpRequest.prototype.send;
  const permitted = new WeakMap();
  XMLHttpRequest.prototype.open = function (method, url) {
    permitted.set(this, allowed(url) && /^(GET|HEAD)$/i.test(method));
    return open.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    if (!permitted.get(this)) { this.abort(); return; }
    return send.apply(this, arguments);
  };
  // Google logging sometimes uses an Image rather than fetch/XHR.
  const src = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  Object.defineProperty(HTMLImageElement.prototype, "src", {
    configurable: src.configurable, enumerable: src.enumerable, get: src.get,
    set: function (value) {
      if (allowed(value) || String(value).startsWith("data:")) src.set.call(this, value);
    }
  });
})();
