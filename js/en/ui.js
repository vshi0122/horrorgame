const sceneEl = document.querySelector("#scene");
const sceneTitleEl = document.querySelector("#sceneTitle");
const sceneHintEl = document.querySelector("#sceneHint");
const messageTextEl = document.querySelector("#messageText");
const objectiveTextEl = document.querySelector("#objectiveText");
const inventoryEl = document.querySelector("#inventory");
const notesListEl = document.querySelector("#notesList");
const documentsListEl = document.querySelector("#documentsList");
const documentViewerEl = document.querySelector("#documentViewer");
const documentTitleEl = document.querySelector("#documentTitle");
const documentMetaEl = document.querySelector("#documentMeta");
const documentBodyEl = document.querySelector("#documentBody");
const menuButton = document.querySelector("#menuButton");
const restartButton = document.querySelector("#restartButton");
const sceneFrame = document.querySelector("#sceneFrame");
const dialogueBarEl = document.querySelector(".dialogue-bar");
const guidedScenes = new Set();

function render() {
  const scene = scenes[state.currentScene];
  const isMainMenu = state.currentScene === "mainMenu";
  const shouldGuideHotspots = !isMainMenu && !guidedScenes.has(state.currentScene);
  const title = typeof scene.title === "function" ? scene.title() : scene.title;
  const hint = typeof scene.hint === "function" ? scene.hint() : scene.hint;
  const overlay = typeof scene.overlay === "function" ? scene.overlay() : (scene.overlay || "");
  document.body.classList.toggle("main-menu-mode", isMainMenu);
  restartButton.textContent = isMainMenu ? "Wake Again" : "Restart";
  sceneTitleEl.textContent = title;
  sceneHintEl.innerHTML = hint;
  objectiveTextEl.innerHTML = scene.objective();
  sceneEl.innerHTML = sceneArt[state.currentScene] + buildHotspots(scene.hotspots(), shouldGuideHotspots) + overlay;
  if (shouldGuideHotspots) {
    guidedScenes.add(state.currentScene);
  }
  dialogueBarEl.classList.remove("dialogue-bar-attention");
  void dialogueBarEl.offsetWidth;
  dialogueBarEl.classList.add("dialogue-bar-attention");
  renderInventory();
  renderNotes();
  renderDocuments();
}

function buildHotspots(hotspots, shouldGuideHotspots = false) {
  return hotspots
    .filter((spot) => spot.visible !== false)
    .map((spot) => {
      const classes = ["hotspot"];
      if (spot.locked) classes.push("locked");
      if (spot.pulse) classes.push("pulse");
      if (shouldGuideHotspots && !spot.locked) classes.push("hotspot-attention");

      return `
        <button
          class="${classes.join(" ")}"
          data-id="${spot.id}"
          type="button"
          style="left:${spot.x}%;top:${spot.y}%;width:${spot.w}%;height:${spot.h}%"
        >
          <span class="hotspot-label">${spot.label}</span>
        </button>
      `;
    })
    .join("");
}

function renderInventory() {
  if (!state.inventory.length) {
    inventoryEl.innerHTML = '<p class="inventory-empty">You are carrying nothing.</p>';
    return;
  }

  inventoryEl.innerHTML = state.inventory
    .map((item) => {
      if (item === "Medicine Bottle") {
        return `<button class="inventory-item inventory-item-usable" data-item="${item}" type="button">${item} (Use)</button>`;
      }
      return `<span class="inventory-item">${item}</span>`;
    })
    .join("");
}

function renderNotes() {
  notesListEl.innerHTML = state.notes.map((note) => `<li>${note}</li>`).join("");
}

function renderDocuments() {
  if (state.currentScene === "mainMenu") {
    documentsListEl.innerHTML = '<p class="documents-empty">The codex is displayed in the center of the main menu.</p>';
    documentViewerEl.classList.add("document-empty");
    documentTitleEl.textContent = "Text Archive";
    documentMetaEl.textContent = "Review unlocked documents from the main menu.";
    documentBodyEl.textContent = "";
    return;
  }

  if (!state.documents.length) {
    documentsListEl.innerHTML = '<p class="documents-empty">No discovered text to review yet.</p>';
    documentViewerEl.classList.add("document-empty");
    documentTitleEl.textContent = "No text collected yet";
    documentMetaEl.textContent = "Discovered notes and documents will appear here.";
    documentBodyEl.textContent = "";
    return;
  }

  documentsListEl.innerHTML = state.documents
    .map((doc) => {
      const activeClass = doc.id === state.selectedDocumentId ? " active" : "";
      return `
        <button class="document-entry${activeClass}" data-id="${doc.id}" type="button">
          <span class="document-entry-title">${doc.title}</span>
          <span class="document-entry-meta">${doc.source}</span>
        </button>
      `;
    })
    .join("");

  const currentDocument =
    state.documents.find((doc) => doc.id === state.selectedDocumentId) || state.documents[0];

  documentViewerEl.classList.remove("document-empty");
  documentTitleEl.innerHTML = currentDocument.title;
  documentMetaEl.innerHTML = currentDocument.source;
  documentBodyEl.innerHTML = currentDocument.body;
}

function flashScene() {
  sceneFrame.classList.remove("screen-flash");
  void sceneFrame.offsetWidth;
  sceneFrame.classList.add("screen-flash");
}
