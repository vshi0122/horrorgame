// ── DOM references ────────────────────────────────────────────────────────────
const terminalOutputEl = document.querySelector("#terminalOutput");
const terminalChoicesEl = document.querySelector("#terminalChoices");
const overlayContainerEl = document.querySelector("#overlayContainer");
const sceneTitleEl = document.querySelector("#sceneTitle");
const objectiveTextEl = document.querySelector("#objectiveText");
const inventoryEl = document.querySelector("#inventory");
const notesListEl = document.querySelector("#notesList");
const documentsListEl = document.querySelector("#documentsList");
const menuButton = document.querySelector("#menuButton");
const restartButton = document.querySelector("#restartButton");
// Compatibility shim: state.js (openMainMenu / startNewGame) writes to this element
const messageTextEl = document.querySelector("#messageText");

// Track last-rendered scene to detect scene changes in render()
let _lastRenderedSceneId = null;

// ── Terminal writing ──────────────────────────────────────────────────────────

window.printSceneEntry = function (scene, sceneId) {
  const title = typeof scene.title === "function" ? scene.title() : scene.title;
  const message = typeof scene.message === "function" ? scene.message() : (scene.message || "");

  // Clear log when entering the main menu (fresh start feel)
  if (sceneId === "mainMenu") {
    terminalOutputEl.innerHTML = "";
  }

  const block = document.createElement("div");
  block.className = "t-block";
  block.innerHTML =
    `<p class="t-loc">[ ${title} ]</p>` +
    `<p class="t-msg">${message}</p>` +
    `<hr class="t-sep">`;
  terminalOutputEl.appendChild(block);
  terminalOutputEl.scrollTop = terminalOutputEl.scrollHeight;
};

window.printMessage = function (message) {
  const para = document.createElement("p");
  para.className = "t-resp";
  para.innerHTML = message;
  terminalOutputEl.appendChild(para);
  terminalOutputEl.scrollTop = terminalOutputEl.scrollHeight;
};

window.promptCode = function (hint) {
  return window.prompt(hint);
};

// ── Core render ───────────────────────────────────────────────────────────────

function render() {
  const scene = scenes[state.currentScene];
  const isMainMenu = state.currentScene === "mainMenu";

  // Append to terminal log only on first visit to this scene instance
  if (state.currentScene !== _lastRenderedSceneId) {
    _lastRenderedSceneId = state.currentScene;
    window.printSceneEntry(scene, state.currentScene);
  }

  // Sidebar
  const title = typeof scene.title === "function" ? scene.title() : scene.title;
  sceneTitleEl.textContent = title;
  objectiveTextEl.innerHTML = scene.objective();
  restartButton.textContent = isMainMenu ? "Wake Again" : "Restart";
  renderInventory();
  renderNotes();
  renderDocumentsList();

  // Overlay (archive / ending / chapter2 dialogue injected here)
  const overlay = typeof scene.overlay === "function" ? scene.overlay() : (scene.overlay || "");
  if (overlay && overlay.trim()) {
    overlayContainerEl.innerHTML = overlay;
    overlayContainerEl.removeAttribute("hidden");
  } else {
    overlayContainerEl.setAttribute("hidden", "");
    overlayContainerEl.innerHTML = "";
  }

  // Choices (empty on mainMenu — menu buttons are inside the overlay)
  if (isMainMenu) {
    terminalChoicesEl.innerHTML = "";
  } else {
    buildHotspotChoices(scene.hotspots());
  }
}

// ── Choice builders ───────────────────────────────────────────────────────────

function buildHotspotChoices(hotspots) {
  const visible = hotspots.filter((s) => s.visible !== false);
  if (!visible.length) {
    terminalChoicesEl.innerHTML = "";
    return;
  }
  terminalChoicesEl.innerHTML = visible
    .map((spot, idx) => {
      const locked = spot.locked ? " t-choice-locked" : "";
      const pulse = spot.pulse ? " t-choice-pulse" : "";
      return (
        `<button class="t-choice t-hotspot-choice${locked}${pulse}" data-id="${spot.id}" type="button">` +
        `<span class="t-choice-num">${idx + 1}</span>${spot.label}` +
        (spot.locked ? ' <span class="t-choice-lock">🔒</span>' : "") +
        `</button>`
      );
    })
    .join("");
}

// ── Sidebar renderers ─────────────────────────────────────────────────────────

function renderInventory() {
  if (!state.inventory.length) {
    inventoryEl.innerHTML = '<span class="t-empty">(empty)</span>';
    return;
  }
  inventoryEl.innerHTML = state.inventory
    .map((item) => `<span class="t-item inventory-item-usable" data-item="${item}">${item}</span>`)
    .join(" ");
}

function renderNotes() {
  notesListEl.innerHTML = [...state.notes]
    .reverse()
    .map((note) => `<li class="t-note-item">${note}</li>`)
    .join("");
}

function renderDocumentsList() {
  if (!state.documents.length) {
    documentsListEl.innerHTML = '<span class="t-empty">(none)</span>';
    return;
  }
  documentsListEl.innerHTML = state.documents
    .map((doc) => {
      const unread = !isDocumentSeen(doc.id);
      return (
        `<button class="t-doc-entry document-entry" data-id="${doc.id}" type="button">` +
        `${doc.title}` +
        (unread ? ' <span class="t-badge">NEW</span>' : "") +
        `</button>`
      );
    })
    .join("");
}

// Backward-compat: state.js selectDocument() calls renderDocuments()
function renderDocuments() {
  renderDocumentsList();
}

function flashScene() {
  const appEl = document.querySelector(".t-app");
  if (!appEl) return;
  appEl.classList.remove("t-flash");
  void appEl.offsetWidth;
  appEl.classList.add("t-flash");
  appEl.addEventListener("animationend", () => appEl.classList.remove("t-flash"), { once: true });
}
