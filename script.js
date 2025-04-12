const leftSide = document.getElementById("leftSide");
const rightSide = document.getElementById("rightSide");
const boat = document.getElementById("boat");
const message = document.getElementById("message");

let state = {
  left: { m: 3, c: 3 },
  right: { m: 0, c: 0 },
  boat: [],
  boatSide: 'left'
};

function render() {
  leftSide.innerHTML = "<h2>Left Bank</h2>";
  rightSide.innerHTML = "<h2>Right Bank</h2>";
  boat.innerHTML = "<h3>Boat</h3>";

  // Move the boat visually
  boat.style.left = state.boatSide === 'left' ? "10%" : "70%";

  // Add characters to banks
  for (let i = 0; i < state.left.m; i++) createCharacter(leftSide, 'm');
  for (let i = 0; i < state.left.c; i++) createCharacter(leftSide, 'c');
  for (let i = 0; i < state.right.m; i++) createCharacter(rightSide, 'm');
  for (let i = 0; i < state.right.c; i++) createCharacter(rightSide, 'c');

  // Boat passengers
  state.boat.forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char === 'm' ? "👨" : "😈";
    span.className = character ${char === 'm' ? "missionary" : "cannibal"};
    span.onclick = () => unloadFromBoat(index);
    boat.appendChild(span);
  });

  checkState();
}

function createCharacter(container, type) {
  const span = document.createElement("span");
  span.textContent = type === 'm' ? "👨" : "😈";
  span.className = character ${type === 'm' ? "missionary" : "cannibal"};
  span.onclick = () => loadToBoat(type);
  container.appendChild(span);
}

function loadToBoat(type) {
  if (state.boat.length >= 2) return;

  if (state.boatSide === 'left' && state.left[type] > 0) {
    state.left[type]--;
    state.boat.push(type);
  } else if (state.boatSide === 'right' && state.right[type] > 0) {
    state.right[type]--;
    state.boat.push(type);
  }

  render();
}

function unloadFromBoat(index) {
  const type = state.boat[index];
  state.boat.splice(index, 1);

  if (state.boatSide === 'left') {
    state.left[type]++;
  } else {
    state.right[type]++;
  }

  render();
}

function moveBoat() {
  if (state.boat.length === 0) {
    message.textContent = "🚫 Boat must carry at least one person!";
    return;
  }

  // Move to opposite side
  state.boatSide = state.boatSide === 'left' ? 'right' : 'left';

  // Drop off passengers
  state.boat.forEach(char => {
    if (state.boatSide === 'left') {
      state.left[char]++;
    } else {
      state.right[char]++;
    }
  });

  state.boat = [];
  render();
}

function checkState() {
  message.textContent = "";

  const l = state.left;
  const r = state.right;

  if ((l.m > 0 && l.c > l.m) || (r.m > 0 && r.c > r.m)) {
    message.textContent = "💀 Game Over: Cannibals outnumber missionaries!";
  } else if (r.m === 3 && r.c === 3) {
    message.textContent = "🎉 You Win! Everyone crossed safely!";
  }
}

function restartGame() {
  state = {
    left: { m: 3, c: 3 },
    right: { m: 0, c: 0 },
    boat: [],
    boatSide: 'left'
  };
  render();
}

render();
