// Bugmoog JS
if (window.location.href === "https://pugmoog.github.io/Bugmoog/menu.html") {
  window.location.href = "https://rugmoog.github.io";
}

const weburl = "https://pugmoog.github.io/Bugmoog/";

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
  if (e.data === "ready") {
    const btn = gamePageFrame.contentDocument.getElementById("bk-button");
    btn.onclick = closePage;
  }
});

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
  { name: "Baldi's Basics", id: "baldis-basics", image: "baldis-basics.png", category: "Story" },
  { name: "Ballistic", id: "Ballistic", image: "ballistic.png", category: "Action" },
  { name: "Basket Random", id: "basket-random", image: "basket-random.png", category: "Casual" },
  { name: "Bit Planes", id: "bit-planes", image: "bit-planes.png", category: "Action" },
  { name: "Bitlife", id: "bitlife", image: "bitlife.png", category: "Strategy" },
  { name: "Block Blast", id: "block-blast", image: "block-blast.png", category: "Puzzle" },
  { name: "Bloxorz", id: "bloxorz", image: "bloxorz.png", category: "Puzzle" },
  { name: "Bouncy Man", id: "bouncy-man", image: "bouncy-man.jpg", category: "Action" },
  { name: "Candy Crush", id: "candy-crush", image: "candy.png", category: "Casual" },
  { name: "Chrome Dino Game", id: "chrome-dino", image: "dino-game.png", category: "Action" },
  { name: "Clock Simulator", id: "clock-sim", image: "clock-sim.png", category: "Action" },
  { name: "Cookie Clicker", id: "cookieclicker", image: "cookie-clicker.png", category: "Strategy" },
  { name: "Crossy Road", id: "crossy-road", image: "crossy.png", category: "Action" },
  { name: "Desmos Game 1", id: "desmos-1", image: "desmos-1.png", category: "Action" },
  { name: "Desmos Game 2", id: "desmos-2", image: "desmos-2.png", category: "Action" },
  { name: "Drift Boss", id: "drift-boss", image: "drift-boss.png", category: "Action" },
  { name: "Drive Mad", id: "drive-mad", image: "drive-mad.png", category: "Action" },
  { name: "Escape Road", id: "escaperoad", image: "escape-road.png", category: "Action" },
  { name: "Factory Balls", id: "factory-balls-forever", image: "factory-balls.png", category: "Puzzle" },
  { name: "Five Nights At Freddy's", menu: "fnafMenu", image: "fanf.png", category: "Story" },
  { name: "Fruit Ninja", id: "fruit-ninja", image: "materwelon.png", category: "Casual" },
  { name: "Geometry Dash", id: "gdash", image: "dryout.png", category: "Action" },
  { name: "Geometry Dash World Toxic Factory", id: "gd-world-tf", image: "gd-world-tf.png", category: "Action" },
  { name: "Golf Orbit", id: "golf-orbit", image: "golf-orbit.png", category: "Casual" },
  { name: "Granny", id: "granny-1", image: "granny1.png", category: "Story" },
  { name: "Granny 2", id: "granny-2", image: "granny2.png", category: "Story" },
  { name: "Hole.io", id: "hole-io", image: "hole-io.png", category: "Casual" },
  { name: "Idle Breakout", id: "idle-breakout", image: "idle-breakout.png", category: "Strategy" },
  { name: "Lemonoids", id: "lemonoids-5", image: "lemon.gif", category: "Action" },
  { name: "Little Alchemy", id: "little-alchemy", image: "la1.png", category: "Puzzle" },
  { name: "Little Alchemy 2", id: "little-alchemy-two", image: "la2.png", category: "Puzzle" },
  { name: "Minecraft", id: "eaglercraft", image: "minecraft.png", category: "Action" },
  { name: "Minesweeper", id: "minesweeper", image: "minesweeper.png", category: "Puzzle" },
  { name: "Monkey Mart", id: "monkey-mart", image: "monkey-mart.png", category: "Strategy" },
  { name: "OvO", id: "ovo", image: "ovo.png", category: "Action" },
  { name: "Paper.io", id: "paper-io", image: "paper-io.png", category: "Casual" },
  { name: "Password Protected Game", special: "password('fnae')", image: "lock.png", category: "Story" },
  { name: "Poor Bunny", id: "poor-bunny", image: "poor-bunny.png", category: "Action" },
  { name: "Poly Track", id: "polytrack", image: "polytrack.png", category: "Action" },
  { name: "Puppet Hockey", id: "puppet-hockey", image: "puppet-hockey.png", category: "Casual" },
  { name: "Ragdoll Archers", id: "ragdoll-archers", image: "ragdoll.png", category: "Casual" },
  { name: "Ragdoll Hit", id: "ragdoll-hit", image: "ragdoll-hit.png", category: "Casual" },
  { name: "Retro Bowl", id: "retro-bowl", image: "retro-bowl.png", category: "Casual" },
  { name: "Retro Bowl College", id: "retro-bowl-college", image: "retro-bowl.png", category: "Casual" },
  { name: "Riddle School", menu: "riddleMenu", image: "riddleschool.png", category: "Story" },
  { name: "Rocketpult", id: "rocket-pult", image: "rocketpult.png", category: "Action" },
  { name: "Scorched Earth", id: "scorch", image: "scorch.png", category: "Strategy" },
  { name: "Snow Rider 3d", id: "snow-rider-4d", image: "snow-rider.png", category: "Action" },
  { name: "Slope", id: "slope-4", image: "slope.png", category: "Action" },
  { name: "Soccer Random", id: "soccer-random", image: "soccer-random.png", category: "Casual" },
  { name: "Super Liquid Soccer", id: "super-liquid-soccer", image: "super-liquid-soccer.png", category: "Casual" },
  { name: "Survival Race", id: "survival-race-4", image: "survival-race.png", category: "Action" },
  { name: "Subway Surfers", id: "subway-surfers-2", image: "subway.png", category: "Action" },
  { name: "Terretorial.io", id: "terretorial-io", image: "terretorial-io.png", category: "Strategy" },
  { name: "The Binding of Isaac", id: "isaac", image: "isaac.png", category: "Strategy" },
  { name: "This Game is Pretty Hard 2", id: "pretty-hard", image: "pretty-hard.png", category: "Action" },
  { name: "Tiny Fishing", id: "tiny-fishing", image: "tiny-fishing.png", category: "Casual" },
  { name: "Traffic Jam 3d", id: "traffic-jam-3d", image: "traffic-jam-3d.png", category: "Puzzle" },
  { name: "Tunnel Rush", id: "tunnelrush", image: "tunnel-rush.png", category: "Action" },
  { name: "War the Knights", id: "war-the-knights", image: "war-the-knights.png", category: "Strategy" },
  { name: "Water Works", id: "water-works", image: "water-works.png", category: "Puzzle" },
  { name: "Stacktris", id: "stacktris", image: "stacktris.png", category: "Action" },
  { name: "Soccer Skills World Cup", id: "soccer-skills-world-cup", image: "soccer-skills-world-cup.png", category: "Casual" },
  { name: "The World's Hardest Game", id: "worlds-hardest-game", image: "whg.png", category: "Action" },
  { name: "We Become What We Behold", id: "we-become-what-we-behold", image: "wbwwb.png", category: "Story" },
  { name: "Bubble Shooter", id: "bubbleshooter", image: "bubbleshooter.png", category: "Casual" },
  { name: "Slice It All", id: "slice-it-all", image: "slice-it-all.png", category: "Casual" },
  { name: "A Dance of Fire and Ice", id: "adofai", image: "adofai.png", category: "Action" },
  { name: "Clover Pit", id: "cloverpit", image: "cloverpit.png", category: "Action" },
  { name: "Volley Random", id: "volley-random", image: "volley-random.png", category: "Casual" },
  { name: "Super Mario World", id: "super-mario-world", image: "super-mario-world.png", category: "Action" },
  { name: "Basketball Stars", id: "basketball-stars", image: "basketball-stars.png", category: "Casual" },
  { name: "Terraria", id: "terraria", image: "terreria.png", category: "Action" },
  { name: "Icy Purple Head", id: "icy-purple-head", image: "icy-purple-head.png", category: "Action" },
  { name: "Cluster Rush", id: "cluster-rush", image: "cluster-rush.png", category: "Action" },
  { name: "Big Tower Tiny Square", id: "big-tower-tiny-square", image: "big-tower-tiny-square.png", category: "Action" },
  { name: "Bloons Tower Defense 4", id: "btd4", image: "btd4.png", category: "Strategy" },
  { name: "Super Mario 64", id: "sm64", image: "sm64.png", category: "Action" },
  { name: "Trimps", id: "trimps", image: "trimps.png", category: "Strategy" },
  { name: "Mario", id: "mario", image: "mario.png", category: "Action" },
  { name: "Tetris", id: "tetris", image: "tetris.png", category: "Puzzle" },
  { name: "Curve Ball 3D", id: "curve-ball-3d", image: "curve-ball-3d.png", category: "Casual" },
  { name: "Google Snake", id: "google-snake", image: "snake.png", category: "Casual" },
];


games.sort((a, b) => a.name.localeCompare(b.name));

games.forEach(game => {
  const element = document.createElement("button");
  element.className = "game";
  element.innerHTML = `
    <img src='https://pugmoog.github.io/Bugmoog/images/${game.image}'>
    <h3>${game.name}</h3>
  `;

  if (game.id) {
    element.onclick = () => loadPage(game.id);
    element.dataset.category = game.category;
  } else if (game.menu) {
    element.onclick = () => document.getElementById(game.menu).showModal();
  } else if (game.special) {
    element.onclick = new Function(game.special);
  }

  gamesGrid.appendChild(element);
});

const elements = document.querySelectorAll('.category-button');
elements.forEach(element => {
  element.onclick = category;
    if (element.textContent==="All") {
        element.style.backgroundColor = "#cccccc";
    }
});


function category(e) {
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
