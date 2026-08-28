// Bugmoog JS
if (window.location.href === "https://pugmoog.github.io/Bugmoog/menu.html") {
  window.location.href = "https://rugmoog.github.io";
}

const weburl = "https://pugmoog.github.io/Bugmoog/";
const BUGMOOG_ORIGIN = "https://pugmoog.github.io";
let statsFrame = null;
let statsReady = false;
let statsQueue = [];
let gamePopularity = {};

function setupStats() {
  statsFrame = document.createElement("iframe");
  statsFrame.src = weburl + "analytics.html?v=1";
  statsFrame.hidden = true;
  statsFrame.setAttribute("aria-hidden", "true");
  statsFrame.tabIndex = -1;
  document.body.appendChild(statsFrame);
}

function sendStatsMessage(message) {
  if (!statsReady) {
    statsQueue.push(message);
    return;
  }
  statsFrame.contentWindow.postMessage(message, BUGMOOG_ORIGIN);
}

function trackBugmoogEvent(event, subject) {
  sendStatsMessage({ type: "bugmoog-stats-event", event, subject });
}

window.addEventListener("message", event => {
  if (event.origin !== BUGMOOG_ORIGIN || event.source !== statsFrame?.contentWindow) return;
  if (event.data?.type === "bugmoog-stats-ready") {
    statsReady = true;
    for (const message of statsQueue) statsFrame.contentWindow.postMessage(message, BUGMOOG_ORIGIN);
    statsQueue = [];
    statsFrame.contentWindow.postMessage({ type: "bugmoog-stats-popularity-request" }, BUGMOOG_ORIGIN);
  }
  if (event.data?.type === "bugmoog-stats-popularity") {
    gamePopularity = event.data.games || {};
    if (["popular", "unpopular"].includes(document.querySelector("#sort-games")?.value)) sortGames();
  }
});

// Setup
(() => {
  window.gamePageFrame = document.getElementById("gamePageFrame");
  window.gamesGrid = document.querySelector('.grid');
  window.focusInterval;
  window.searchBox = document.getElementById("search");
  window.searchBox.addEventListener('input', search);


  const navProto = Object.getPrototypeOf(navigator);
  Object.defineProperty(navProto, 'getGamepads', {
    value: function () {
      console.log('gamepad blocked, returning empty');
      return [];
    },
    configurable: true,
    writable: true,
  });
})();

// Game loading
async function loadPage(url) {
  trackBugmoogEvent("game_open", url);
  loadPageGeneral("https://pugmoog.github.io/Bugmoog/games/" + url);
}

async function loadPageGeneral(url) {
  if (gamePageFrame.style.display === "block") {
    return;
  }

  gamePageFrame.src = weburl + "game-page.html?game=" + encodeURIComponent(url);
  gamePageFrame.style.display = "block";

  focusInterval = setInterval(focus, 20);
}

function password(url) {
  let tryy = prompt("enter password");
  if (tryy === "12927") {
    loadPage(url);
  }
}

window.addEventListener("message", (e) => {
  if (e.data === "close") {
    closePage();
  }
});

window.addEventListener("message", (e) => {
  if (e.data === "fs") {
    console.log("fsing");
    fs();
  }
});

function fs() {
  console.log("fs() called");
  console.log("gamePageFrame.style.display:", gamePageFrame.style.display);

  if (gamePageFrame.style.display !== "block") {
    console.log("RETURNING: display is not block");
    return;
  }

  console.log("Attempting fullscreen...");
  if (gamePageFrame.requestFullscreen) {
    gamePageFrame.requestFullscreen().catch(err => console.error("Fullscreen error:", err));
  }
}

document.addEventListener('fullscreenchange', (e) => {
  const fse = document.fullscreenElement;
  if (fse === gamePageFrame) {
    gamePageFrame.contentWindow.postMessage({ type: 'fullscreen', state: 'entered' }, '*');
  } else {
    console.log("exiting?");
    gamePageFrame.contentWindow.postMessage({ type: 'fullscreen', state: 'exited' }, '*');
  }
});

// Other functions
function search() {
  let elements = document.querySelectorAll('.category-button');
  elements.forEach(element => {
    element.style.backgroundColor = "#eeeeee";
  });
  const query = searchBox.value.toLowerCase().replace(/[^\w\s]/g, '');
  elements = document.querySelectorAll('button.game');
  elements.forEach(element => {
    const h3Text = element.querySelector("h3").textContent;
    const h3TextStripped = h3Text.toLowerCase().replace(/[^\w\s]/g, '');
    if (h3TextStripped.includes(query) || query === "") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}

function focus() {
  if (gamePageFrame.style.display !== "block") {
    return;
  }
  console.log("focusing");
  try {
    gamePageFrame.focus();
  } catch(err) {
    alert(err.message || err);
  }
}

function closePage() {
  gamePageFrame.style.display = "none";
  gamePageFrame.src = "about:blank";
  clearInterval(focusInterval);
}

// Load game buttons
const games = [
  { name: "Baldi's Basics", id: "baldis-basics", image: "baldis-basics.png", category: "Story", added: "2026-05-16" },
  { name: "Ballistic", id: "Ballistic", image: "ballistic.png", category: "Action", added: "2026-05-16" },
  { name: "Basket Random", id: "basket-random", image: "basket-random.png", category: "Casual", added: "2026-05-16" },
  { name: "Bit Planes", id: "bit-planes", image: "bit-planes.png", category: "Action", added: "2026-05-16" },
  { name: "Bitlife", id: "bitlife", image: "bitlife.png", category: "Strategy", added: "2026-05-16" },
  { name: "Block Blast", id: "block-blast", image: "block-blast.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Bloxorz", id: "bloxorz", image: "bloxorz.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Bouncy Man", id: "bouncy-man", image: "bouncy-man.jpg", category: "Action", added: "2026-05-16" },
  { name: "Candy Crush", id: "candy-crush", image: "candy.png", category: "Casual", added: "2026-05-16" },
  { name: "Chrome Dino Game", id: "chrome-dino", image: "dino-game.png", category: "Action", added: "2026-05-16" },
  { name: "Clock Simulator", id: "clock-sim", image: "clock-sim.png", category: "Action", added: "2026-05-16" },
  { name: "Cookie Clicker", id: "cookieclicker", image: "cookie-clicker.png", category: "Strategy", added: "2026-05-16" },
  { name: "Crossy Road", id: "crossy-road", image: "crossy.png", category: "Action", added: "2026-05-16" },
  { name: "Desmos Game 1", id: "desmos-1", image: "desmos-1.png", category: "Action", added: "2026-05-16" },
  { name: "Desmos Game 2", id: "desmos-2", image: "desmos-2.png", category: "Action", added: "2026-05-16" },
  { name: "Drift Boss", id: "drift-boss", image: "drift-boss.png", category: "Action", added: "2026-05-16" },
  { name: "Drive Mad", id: "drive-mad", image: "drive-mad.png", category: "Action", added: "2026-05-16" },
  { name: "Escape Road", id: "escaperoad", image: "escape-road.png", category: "Action", added: "2026-05-16" },
  { name: "Factory Balls", id: "factory-balls-forever", image: "factory-balls.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Five Nights At Freddy's", menu: "fnafMenu", image: "fanf.png", category: "Story", added: "2026-05-16" },
  { name: "Fruit Ninja", id: "fruit-ninja", image: "materwelon.png", category: "Casual", added: "2026-05-16" },
  { name: "Geometry Dash", id: "gdash", image: "dryout.png", category: "Action", added: "2026-05-16" },
  { name: "Geometry Dash World Toxic Factory", id: "gd-world-tf", image: "gd-world-tf.png", category: "Action", added: "2026-05-16" },
  { name: "Golf Orbit", id: "golf-orbit", image: "golf-orbit.png", category: "Casual", added: "2026-05-16" },
  { name: "GunSpin", id: "gunspin", image: "gunspin.png", category: "Action", added: "2026-08-27" },
  { name: "Granny", id: "granny-1", image: "granny1.png", category: "Story", added: "2026-05-16" },
  { name: "Granny 2", id: "granny-2", image: "granny2.png", category: "Story", added: "2026-05-16" },
  { name: "Hole.io", id: "hole-io", image: "hole-io.png", category: "Casual", added: "2026-05-16" },
  { name: "Idle Breakout", id: "idle-breakout", image: "idle-breakout.png", category: "Strategy", added: "2026-05-16" },
  { name: "Lemonoids", id: "lemonoids-5", image: "lemon.gif", category: "Action", added: "2026-05-16" },
  { name: "Little Alchemy", id: "little-alchemy", image: "la1.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Little Alchemy 2", id: "little-alchemy-two", image: "la2.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Minecraft", id: "eaglercraft", image: "minecraft.png", category: "Action", added: "2026-05-16" },
  { name: "Minesweeper", id: "minesweeper", image: "minesweeper.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Monkey Mart", id: "monkey-mart", image: "monkey-mart.png", category: "Strategy", added: "2026-05-16" },
  { name: "OvO", id: "ovo", image: "ovo.png", category: "Action", added: "2026-05-16" },
  { name: "Paper.io", id: "paper-io", image: "paper-io.png", category: "Casual", added: "2026-05-16" },
  { name: "Password Protected Game", special: "password('fnae')", image: "lock.png", category: "Story", added: "2026-05-16" },
  { name: "Poor Bunny", id: "poor-bunny", image: "poor-bunny.png", category: "Action", added: "2026-05-16" },
  { name: "Poly Track", id: "polytrack", image: "polytrack.png", category: "Action", added: "2026-05-16" },
  { name: "Puppet Hockey", id: "puppet-hockey", image: "puppet-hockey.png", category: "Casual", added: "2026-05-16" },
  { name: "Ragdoll Archers", id: "ragdoll-archers", image: "ragdoll.png", category: "Casual", added: "2026-05-16" },
  { name: "Ragdoll Hit", id: "ragdoll-hit", image: "ragdoll-hit.png", category: "Casual", added: "2026-05-16" },
  { name: "Retro Bowl", id: "retro-bowl", image: "retro-bowl.png", category: "Casual", added: "2026-05-16" },
  { name: "Retro Bowl College", id: "retro-bowl-college", image: "retro-bowl.png", category: "Casual", added: "2026-05-16" },
  { name: "Riddle School", menu: "riddleMenu", image: "riddleschool.png", category: "Story", added: "2026-05-16" },
  { name: "Rocketpult", id: "rocket-pult", image: "rocketpult.png", category: "Action", added: "2026-05-16" },
  { name: "Scorched Earth", id: "scorch", image: "scorch.png", category: "Strategy", added: "2026-05-16" },
  { name: "Snow Rider 3d", id: "snow-rider-4d", image: "snow-rider.png", category: "Action", added: "2026-05-16" },
  { name: "sobosuba", id: "sobosuba", image: "sobosuba.png", category: "Puzzle", added: "2026-08-27" },
  { name: "Slope", id: "slope-4", image: "slope.png", category: "Action", added: "2026-05-16" },
  { name: "Soccer Random", id: "soccer-random", image: "soccer-random.png", category: "Casual", added: "2026-05-16" },
  { name: "Super Liquid Soccer", id: "super-liquid-soccer", image: "super-liquid-soccer.png", category: "Casual", added: "2026-05-16" },
  { name: "Survival Race", id: "survival-race-4", image: "survival-race.png", category: "Action", added: "2026-05-16" },
  { name: "Subway Surfers", id: "subway-surfers-2", image: "subway.png", category: "Action", added: "2026-05-16" },
  { name: "Terretorial.io", id: "terretorial-io", image: "terretorial-io.png", category: "Strategy", added: "2026-05-16" },
  { name: "The Binding of Isaac", id: "isaac", image: "isaac.png", category: "Strategy", added: "2026-05-16" },
  { name: "This Game is Pretty Hard 2", id: "pretty-hard", image: "pretty-hard.png", category: "Action", added: "2026-05-16" },
  { name: "Tiny Fishing", id: "tiny-fishing", image: "tiny-fishing.png", category: "Casual", added: "2026-05-16" },
  { name: "Traffic Jam 3d", id: "traffic-jam-3d", image: "traffic-jam-3d.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Tunnel Rush", id: "tunnelrush", image: "tunnel-rush.png", category: "Action", added: "2026-05-16" },
  { name: "War the Knights", id: "war-the-knights", image: "war-the-knights.png", category: "Strategy", added: "2026-05-16" },
  { name: "Warfare 1944", id: "warfare-1944", image: "warfare-1944.png", category: "Strategy", added: "2026-08-27" },
  { name: "Walkable Cities", id: "walkable-cities", image: "walkable-cities.png", category: "Puzzle", added: "2026-08-27" },
  { name: "Water Works", id: "water-works", image: "water-works.png", category: "Puzzle", added: "2026-05-16" },
  { name: "Stacktris", id: "stacktris", image: "stacktris.png", category: "Action", added: "2026-05-16" },
  { name: "Soccer Skills World Cup", id: "soccer-skills-world-cup", image: "soccer-skills-world-cup.png", category: "Casual", added: "2026-05-16" },
  { name: "The World's Hardest Game", id: "worlds-hardest-game", image: "whg.png", category: "Action", added: "2026-05-16" },
  { name: "We Become What We Behold", id: "we-become-what-we-behold", image: "wbwwb.png", category: "Story", added: "2026-05-27" },
  { name: "Bubble Shooter", id: "bubbleshooter", image: "bubbleshooter.png", category: "Casual", added: "2026-05-27" },
  { name: "Slice It All", id: "slice-it-all", image: "slice-it-all.png", category: "Casual", added: "2026-05-27" },
  { name: "A Dance of Fire and Ice", id: "adofai", image: "adofai.png", category: "Action", added: "2026-06-13" },
  { name: "Clover Pit", id: "cloverpit", image: "cloverpit.png", category: "Action", added: "2026-06-13" },
  { name: "Volley Random", id: "volley-random", image: "volley-random.png", category: "Casual", added: "2026-06-13" },
  { name: "Super Mario World", id: "super-mario-world", image: "super-mario-world.png", category: "Action", added: "2026-06-13" },
  { name: "Basketball Stars", id: "basketball-stars", image: "basketball-stars.png", category: "Casual", added: "2026-06-13" },
  { name: "Terraria", id: "terreria", image: "terreria.png", category: "Action", added: "2026-06-13" },
  { name: "Icy Purple Head", id: "icy-purple-head", image: "icy-purple-head.png", category: "Action", added: "2026-06-13" },
  { name: "Cluster Rush", id: "cluster-rush", image: "cluster-rush.png", category: "Action", added: "2026-06-13" },
  { name: "Big Tower Tiny Square", id: "big-tower-tiny-square", image: "big-tower-tiny-square.png", category: "Action", added: "2026-06-13" },
  { name: "Bloons Tower Defense 4", id: "btd4", image: "btd4.png", category: "Strategy", added: "2026-06-13" },
  { name: "Super Mario 64", id: "sm64", image: "sm64.png", category: "Action", added: "2026-06-13" },
  { name: "Trimps", id: "trimps", image: "trimps.png", category: "Strategy", added: "2026-06-13" },
  { name: "Mario", id: "mario", image: "mario.png", category: "Action", added: "2026-06-13" },
  { name: "Tetris", id: "tetris", image: "tetris.png", category: "Puzzle", added: "2026-06-13" },
  { name: "Curve Ball 3D", id: "curve-ball-3d", image: "curve-ball-3d.png", category: "Casual", added: "2026-06-13" },
  { name: "Google Snake", id: "google-snake", image: "snake.png", category: "Casual", added: "2026-06-13" },
  { name: "Cell Machine Mystic Mod Plus+", id: "CMMM-plus", image: "CMMM-plus.png", category: "Strategy", added: "2026-06-16" },
  { name: "Pickles", id: "pickles", image: "pickles.jpg", category: "Action", added: "2026-08-28" },
];


games.sort((a, b) => a.name.localeCompare(b.name));

games.forEach(game => {
  const element = document.createElement("button");
  element.className = "game";
  element._gameData = game;
  element.dataset.category = game.category;
  element.innerHTML = `
    <img src='https://pugmoog.github.io/Bugmoog/images/${game.image}'>
    <h3>${game.name}</h3>
  `;

  if (game.id) {
    element.onclick = () => loadPage(game.id);
  } else if (game.menu) {
    element.onclick = () => document.getElementById(game.menu).showModal();
  } else if (game.special) {
    element.onclick = new Function(game.special);
  }

  gamesGrid.appendChild(element);
});

function popularityFor(game) {
  if (game.id) return gamePopularity[game.id] || 0;
  if (game.menu === "fnafMenu") return ["fnaf1", "fnaf2", "fnaf3", "fnaf4"].reduce((sum, id) => sum + (gamePopularity[id] || 0), 0);
  if (game.menu === "riddleMenu") return ["riddleschool1", "riddleschool2", "riddleschool3", "riddleschool4", "riddleschool5", "riddletransfer1", "riddletransfer2"].reduce((sum, id) => sum + (gamePopularity[id] || 0), 0);
  return gamePopularity.fnae || 0;
}

function sortGames() {
  const mode = document.querySelector("#sort-games")?.value || "az";
  const elements = [...gamesGrid.querySelectorAll(".game")];
  const byName = (a, b) => a._gameData.name.localeCompare(b._gameData.name);
  if (mode === "random") {
    for (let index = elements.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1));
      [elements[index], elements[swap]] = [elements[swap], elements[index]];
    }
  } else {
    elements.sort((a, b) => {
      if (mode === "za") return -byName(a, b);
      if (mode === "newest") return b._gameData.added.localeCompare(a._gameData.added) || byName(a, b);
      if (mode === "popular") return popularityFor(b._gameData) - popularityFor(a._gameData) || byName(a, b);
      if (mode === "unpopular") return popularityFor(a._gameData) - popularityFor(b._gameData) || byName(a, b);
      return byName(a, b);
    });
  }
  gamesGrid.append(...elements);
}

document.querySelector("#sort-games")?.addEventListener("change", sortGames);
sortGames();

const elements = document.querySelectorAll('.category-button');
elements.forEach(element => {
  element.onclick = category;
    if (element.textContent==="All") {
        element.style.backgroundColor = "#cccccc";
    }
});


function category(e) {
    document.getElementById('search').value = '';search();
    const sender = e.target;
    const catName = sender.textContent;
    let elements = document.querySelectorAll('.category-button');
    elements.forEach(element => {
      element.style.backgroundColor = "#eeeeee";
    });
    sender.style.backgroundColor = "#cccccc";
    elements = document.querySelectorAll('button.game');
    elements.forEach(element => {
      if (element.dataset.category===catName || catName==="All") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
}

setupStats();
trackBugmoogEvent("bugmoog_open", "bugmoog");
