// Bugmoog JS
if (window.location.href === "https://pugmoog.github.io/Bugmoog/menu.html") {
  window.location.href = "https://rugmoog.github.io";
}

// Setup
(() => {
  window.gamePageFrame = document.getElementById("gamePageFrame");
  window.gamesGrid = document.querySelector('.grid');
  window.focusInterval;
  window.searchBox = document.getElementById("search");
  window.searchBox.addEventListener('input', search);
  const original = Navigator.prototype.getGamepads;
  Navigator.prototype.getGamepads = function () {
    try {
      return original ? original.call(this) : [];
    } catch (e) {
      console.warn('Gamepad blocked, returning empty');
      return [];
    }
  };
  navigator.getGamepads = function () {
    try {
      return original ? original.call(navigator) : [];
    } catch (e) {
      console.warn('Gamepad blocked, returning empty');
      return [];
    }
  };
  Navigator.getGamepads = function () {
    try {
      return original ? original.call(navigator) : [];
    } catch (e) {
      console.warn('Gamepad blocked, returning empty');
      return [];
    }
  };
})();

// Game loading
async function loadPage(url) {
  loadPageGeneral("https://pugmoog.github.io/Bugmoog/games/" + url)
}
async function loadPageGeneral(url) {
  if (gamePageFrame.style.display==="block") {
    return;
  }

  gamePageFrame.src =
  "https://pugmoog.github.io/Bugmoog/game-page.html?game=" +
  encodeURIComponent(url);
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



// Other functions
function search() {
  const query = searchBox.value.toLowerCase().replace(/[^\w\s]/g, '');
  const elements = document.querySelectorAll('button.game');
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
  if (gamePageFrame.style.display !== "block") return;

  const doc = gamePageFrame.contentDocument;
  if (!doc) return;

  const frame = doc.getElementById('gameFrame');
  if (!frame) return;

  if (frame.contentWindow) {
    frame.contentWindow.focus();
  }
}

function closePage() {
  gamePageFrame.style.display = "none";
  gamePageFrame.srcdoc = "";
  clearInterval(focusInterval);
}

// Load game buttons

const games = [
  { name: "Baldi's Basics", id: "baldis-basics", image: "baldis-basics.png" },
  { name: "Ballistic", id: "Ballistic", image: "ballistic.png" },
  { name: "Basket Random", id: "basket-random", image: "basket-random.png" },
  { name: "Bit Planes", id: "bit-planes", image: "bit-planes.png" },
  { name: "Bitlife", id: "bitlife", image: "bitlife.png" },
  { name: "Block Blast", id: "block-blast", image: "block-blast.png" },
  { name: "Bloxorz", id: "bloxorz", image: "bloxorz.png" },
  { name: "Bouncy Man", id: "bouncy-man", image: "bouncy-man.jpg" },
  { name: "Candy Crush", id: "candy-crush", image: "candy.png" },
  { name: "Chrome Dino Game", id: "chrome-dino", image: "dino-game.png" },
  { name: "Clock Simulator", id: "clock-sim", image: "clock-sim.png" },
  { name: "Cookie Clicker", id: "cookieclicker", image: "cookie-clicker.png" },
  { name: "Crossy Road", id: "crossy-road", image: "crossy.png" },
  { name: "Desmos Game 1", id: "desmos-1", image: "desmos-1.png" },
  { name: "Desmos Game 2", id: "desmos-2", image: "desmos-2.png" },
  { name: "Drift Boss", id: "drift-boss", image: "drift-boss.png" },
  { name: "Drive Mad", id: "drive-mad", image: "drive-mad.png" },
  { name: "Escape Road", id: "escaperoad", image: "escape-road.png" },
  { name: "Factory Balls", id: "factory-balls-forever", image: "factory-balls.png" },
  { name: "Five Nights At Freddy's", menu: "fnafMenu", image: "fanf.png" },
  { name: "Fruit Ninja", id: "fruit-ninja", image: "materwelon.png" },
  { name: "Geometry Dash", id: "gdash", image: "dryout.png" },
  { name: "Geometry Dash World Toxic Factory", id: "gd-world-tf", image: "gd-world-tf.png" },
  { name: "Golf Orbit", id: "golf-orbit", image: "golf-orbit.png" },
  { name: "Granny", id: "granny-1", image: "granny1.png" },
  { name: "Granny 2", id: "granny-2", image: "granny2.png" },
  { name: "Hole.io", id: "hole-io", image: "hole-io.png" },
  { name: "Idle Breakout", id: "idle-breakout", image: "idle-breakout.png" },
  { name: "Lemonoids", id: "lemonoids-5", image: "lemon.gif" },
  { name: "Little Alchemy", id: "little-alchemy", image: "la1.png" },
  { name: "Little Alchemy 2", id: "little-alchemy-two", image: "la2.png" },
  { name: "Minecraft", id: "eaglercraft", image: "minecraft.png" },
  { name: "Minesweeper", id: "minesweeper", image: "minesweeper.png" },
  { name: "Monkey Mart", id: "monkey-mart", image: "monkey-mart.png" },
  { name: "OvO", id: "ovo", image: "ovo.png" },
  { name: "Paper.io", id: "paper-io", image: "paper-io.png" },
  { name: "Password Protected Game", special: "password('fnae')", image: "lock.png" },
  { name: "Poor Bunny", id: "poor-bunny", image: "poor-bunny.png" },
  { name: "Poly Track", id: "polytrack", image: "polytrack.png" },
  { name: "Puppet Hockey", id: "puppet-hockey", image: "puppet-hockey.png" },
  { name: "Ragdoll Archers", id: "ragdoll-archers", image: "ragdoll.png" },
  { name: "Ragdoll Hit", id: "ragdoll-hit", image: "ragdoll-hit.png" },
  { name: "Retro Bowl", id: "retro-bowl", image: "retro-bowl.png" },
  { name: "Retro Bowl College", id: "retro-bowl-college", image: "retro-bowl.png" },
  { name: "Riddle School", menu: "riddleMenu", image: "riddleschool.png" },
  { name: "Rocketpult", id: "rocket-pult", image: "rocketpult.png" },
  { name: "Scorched Earth", id: "scorch", image: "scorch.png" },
  { name: "Snow Rider 3d", id: "snow-rider-4d", image: "snow-rider.png" },
  { name: "Slope", id: "slope-4", image: "slope.png" },
  { name: "Soccer Random", id: "soccer-random", image: "soccer-random.png" },
  { name: "Super Liquid Soccer", id: "super-liquid-soccer", image: "super-liquid-soccer.png" },
  { name: "Survival Race", id: "survival-race-4", image: "survival-race.png" },
  { name: "Subway Surfers", id: "subway-surfers-2", image: "subway.png" },
  { name: "Terretorial.io", id: "terretorial-io", image: "terretorial-io.png" },
  { name: "The Binding of Isaac", id: "isaac", image: "isaac.png" },
  { name: "This Game is Pretty Hard 2", id: "pretty-hard", image: "pretty-hard.png" },
  { name: "Tiny Fishing", id: "tiny-fishing", image: "tiny-fishing.png" },
  { name: "Traffic Jam 3d", id: "traffic-jam-3d", image: "traffic-jam-3d.png" },
  { name: "Tunnel Rush", id: "tunnelrush", image: "tunnel-rush.png" },
  { name: "War the Knights", id: "war-the-knights", image: "war-the-knights.png" },
  { name: "Water Works", id: "water-works", image: "water-works.png" },
  { name: "Stacktris", id: "stacktris", image: "stacktris.png" },
  { name: "Bloons Tower Defense 3 (btd3)", id: "btd3", image: "btd3.png" },
  { name: "Soccer Skills World Cup", id: "soccer-skills-world-cup", image: "soccer-skills-world-cup.png" },
  { name: "The World's Hardest Game", id: "worlds-hardest-game", image: "whg.png" },
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
  } else if (game.menu) {
    element.onclick = () => document.getElementById(game.menu).showModal();
  } else if (game.special) {
    element.onclick = new Function(game.special);
  }
  
  gamesGrid.appendChild(element);
});







