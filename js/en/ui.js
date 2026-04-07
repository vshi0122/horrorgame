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
const restartButton = document.querySelector("#restartButton");
const sceneFrame = document.querySelector("#sceneFrame");

function render() {
  const scene = scenes[state.currentScene];
  const title = typeof scene.title === "function" ? scene.title() : scene.title;
  const hint = typeof scene.hint === "function" ? scene.hint() : scene.hint;
  sceneTitleEl.textContent = title;
  sceneHintEl.innerHTML = hint;
  objectiveTextEl.innerHTML = scene.objective();
  sceneEl.innerHTML = buildHotspots(scene.hotspots());
  renderInventory();
  renderNotes();
  renderDocuments();
}

function buildHotspots(hotspots) {
  const entries = hotspots
    .filter((spot) => spot.visible !== false)
    .map((spot) => {
      const classes = ["choice-button"];
      if (spot.locked) classes.push("locked");
      if (spot.pulse) classes.push("pulse");

      return `
        <button class="${classes.join(" ")}" data-id="${spot.id}" type="button">
          <span class="choice-title">${spot.label}</span>
        </button>
      `;
    })
    .join("");

  return `
    <div class="text-scene">
      <p class="text-scene-label">Available Actions</p>
      <div class="choice-list">
        ${entries}
      </div>
    </div>
  `;
}

function renderInventory() {
  if (!state.inventory.length) {
    inventoryEl.innerHTML = '<p class="inventory-empty">You are carrying nothing.</p>';
    return;
  }

  inventoryEl.innerHTML = state.inventory
    .map((item) => `<span class="inventory-item">${item}</span>`)
    .join("");
}

function renderNotes() {
  notesListEl.innerHTML = state.notes.map((note) => `<li>${note}</li>`).join("");
}

function renderDocuments() {
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
