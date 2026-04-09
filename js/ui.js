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
const sceneAssetPromises = new Map();
let latestSceneRenderToken = 0;

function extractSceneAssetUrls(markup) {
  const matches = [...markup.matchAll(/url\((['"]?)([^'")]+)\1\)/g)];
  return [...new Set(matches.map((match) => match[2]).filter(Boolean))];
}

function preloadSceneAsset(url) {
  if (sceneAssetPromises.has(url)) {
    return sceneAssetPromises.get(url);
  }

  const assetPromise = new Promise((resolve) => {
    const image = new Image();
    const finish = () => resolve();
    image.onload = finish;
    image.onerror = finish;
    image.src = url;
    if (image.complete) {
      finish();
    }
  });

  sceneAssetPromises.set(url, assetPromise);
  return assetPromise;
}

function preloadSceneAssets(markup) {
  const urls = extractSceneAssetUrls(markup);
  if (!urls.length) {
    return Promise.resolve();
  }
  return Promise.all(urls.map(preloadSceneAsset));
}

[
  "js/images/car.jpg",
  "js/images/gate.jpg",
  "js/images/letterbox.jpg",
  "js/images/pin.jpg",
  "js/images/parkinglot.jpg"
].forEach(preloadSceneAsset);

async function render() {
  const sceneId = state.currentScene;
  const renderToken = ++latestSceneRenderToken;
  const scene = scenes[sceneId];
  const isMainMenu = sceneId === "mainMenu";
  const shouldGuideHotspots = !isMainMenu && !guidedScenes.has(sceneId);
  const title = typeof scene.title === "function" ? scene.title() : scene.title;
  const hint = typeof scene.hint === "function" ? scene.hint() : scene.hint;
  const overlay = typeof scene.overlay === "function" ? scene.overlay() : (scene.overlay || "");
  const sceneMarkup = typeof sceneArt[sceneId] === "function"
    ? sceneArt[sceneId]()
    : (sceneArt[sceneId] || "");
  const nextSceneMarkup = sceneMarkup + buildHotspots(scene.hotspots(), shouldGuideHotspots) + overlay;
  document.body.classList.toggle("main-menu-mode", isMainMenu);
  restartButton.textContent = isMainMenu ? "再次醒来" : "重新开始";
  sceneTitleEl.textContent = title;
  sceneHintEl.innerHTML = hint;
  objectiveTextEl.innerHTML = scene.objective();
  sceneEl.setAttribute("aria-busy", "true");
  await preloadSceneAssets(nextSceneMarkup);
  if (renderToken !== latestSceneRenderToken || state.currentScene !== sceneId) {
    return;
  }
  sceneEl.innerHTML = nextSceneMarkup;
  sceneEl.setAttribute("aria-busy", "false");
  if (typeof window.HotspotEditor?.afterRender === "function") {
    window.HotspotEditor.afterRender(sceneId, sceneEl);
  }
  if (shouldGuideHotspots) {
    guidedScenes.add(sceneId);
  }
  dialogueBarEl.classList.remove("dialogue-bar-attention");
  void dialogueBarEl.offsetWidth;
  dialogueBarEl.classList.add("dialogue-bar-attention");
  renderInventory();
  renderNotes();
  renderDocuments();
}

function buildHotspots(hotspots, shouldGuideHotspots = false) {
  const sceneId = state.currentScene;
  return hotspots
    .filter((spot) => spot.visible !== false)
    .map((spot) => {
      const resolvedSpot = typeof window.HotspotEditor?.getSpotRect === "function"
        ? window.HotspotEditor.getSpotRect(sceneId, spot)
        : spot;
      const classes = ["hotspot"];
      if (spot.locked) classes.push("locked");
      if (spot.pulse) classes.push("pulse");
      if (shouldGuideHotspots && !spot.locked) classes.push("hotspot-attention");

      return `
        <button
          class="${classes.join(" ")}"
          data-id="${spot.id}"
          data-scene-id="${sceneId}"
          type="button"
          style="left:${resolvedSpot.x}%;top:${resolvedSpot.y}%;width:${resolvedSpot.w}%;height:${resolvedSpot.h}%"
        >
          <span class="hotspot-label">${spot.label}</span>
        </button>
      `;
    })
    .join("");
}

function renderInventory() {
  if (!state.inventory.length) {
    inventoryEl.innerHTML = '<p class="inventory-empty">你现在两手空空。</p>';
    return;
  }

  inventoryEl.innerHTML = state.inventory
    .map((item) => {
      return `<span class="inventory-item">${item}</span>`;
    })
    .join("");
}

function renderNotes() {
  notesListEl.innerHTML = [...state.notes].reverse().map((note) => `<li>${note}</li>`).join("");
}

function renderDocuments() {
  if (state.currentScene === "mainMenu") {
    documentViewerEl.hidden = false;
    documentsListEl.innerHTML = '<p class="documents-empty">主界面中的文本图鉴会显示在场景中央。</p>';
    documentViewerEl.classList.add("document-empty");
    documentTitleEl.textContent = "文本图鉴";
    documentMetaEl.textContent = "在主界面中查看已解锁文本。";
    documentBodyEl.textContent = "";
    return;
  }

  if (!state.documents.length) {
    documentViewerEl.hidden = false;
    documentsListEl.innerHTML = '<p class="documents-empty">还没有发现可回看的文本。</p>';
    documentViewerEl.classList.add("document-empty");
    documentTitleEl.textContent = "还没有收录文本";
    documentMetaEl.textContent = "发现文本后会显示在这里。";
    documentBodyEl.textContent = "";
    return;
  }

  documentViewerEl.hidden = true;
  documentsListEl.innerHTML = state.documents
    .map((doc) => {
      const activeClass = doc.id === state.selectedDocumentId ? " active" : "";
      const unread = !isDocumentSeen(doc.id);
      const inlineDetail = doc.id === state.selectedDocumentId
        ? `
          <article class="document-viewer document-inline-viewer">
            <h3>${doc.title}</h3>
            <p class="document-meta">${doc.source}</p>
            <div class="document-body">${doc.body}</div>
          </article>
        `
        : "";
      return `
        <div class="document-entry-group">
          <button class="document-entry${activeClass}" data-id="${doc.id}" type="button">
            <span class="document-entry-title-row">
              <span class="document-entry-title">${doc.title}</span>
              ${unread ? '<span class="document-status-badges"><span class="document-badge document-badge-unread">未读</span><span class="document-badge document-badge-new">NEW</span></span>' : ""}
            </span>
            <span class="document-entry-meta">${doc.source}</span>
          </button>
          ${inlineDetail}
        </div>
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

window.render = render;
