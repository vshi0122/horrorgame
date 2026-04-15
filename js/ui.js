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
let lastFlashlightPosition = { xRatio: 0.5, yRatio: 0.55 };
const BUILTIN_HOTSPOT_RECTS = {
  "hallway::fire-exit": { x: 16.33, y: 26.05, w: 20.4, h: 43.33 },
  "hallway::stairs": { x: 43.19, y: 11.25, w: 18.98, h: 55.94 },
  "hallway::notice": { x: 67.25, y: 22.84, w: 17.24, h: 21.64 },
  "hallway::back-outside": { x: 26.31, y: 76.82, w: 51.31, h: 18.21 },
  "stairwell::to-1f": { x: 22.44, y: 15.42, w: 22, h: 52.7 },
  "stairwell::to-2f": { x: 55.25, y: 15.86, w: 27.29, h: 53.63 },
  "stairwell::landing": { x: 18.32, y: 71.8, w: 66.66, h: 26.68 },
  "secondFloorHall::notice": { x: 0.61, y: 24.77, w: 15.55, h: 29.72 },
  "secondFloorHall::stairs": { x: 54.91, y: 15.3, w: 28.28, h: 54.07 },
  "secondFloorHall::back": { x: 22.03, y: 16.91, w: 22.05, h: 51.17 },
  "secondFloorHall::residential": { x: 89.55, y: 23.63, w: 9.54, h: 55.14 },
  "upperStairwell::symbols": { x: 2.7, y: 21.72, w: 18, h: 24 },
  "upperStairwell::back": { x: 22.38, y: 16.1, w: 22.22, h: 52.43 },
  "upperStairwell::landing": { x: 18.47, y: 72.13, w: 66.58, h: 26.74 },
  "upperStairwell::to-3f": { x: 55.06, y: 15.48, w: 23.42, h: 52.62 },
  "upperStairwellBlocked::photo": { x: 7.88, y: 65.94, w: 18, h: 14 },
  "upperStairwellBlocked::to-3f": { x: 43.86, y: 77, w: 30.09, h: 16.65 },
  "upperStairwellBlocked::wall": { x: 13.97, y: 10.85, w: 72.59, h: 54.6 },
  "thirdFloorHall::notice": { x: 2.85, y: 65.36, w: 15.24, h: 24 },
  "thirdFloorHall::back-stairwell": { x: 24.83, y: 17.43, w: 19.65, h: 50.87 },
  "thirdFloorHall::residential": { x: 73.83, y: 22.68, w: 22.36, h: 51.47 },
  "stairwellNormal::to-1f": { x: 16, y: 45, w: 22, h: 33 },
  "stairwellNormal::to-2f": { x: 54, y: 17, w: 31, h: 60 },
  "secondFloorHallNormal::wall": { x: 8, y: 16, w: 24, h: 52 },
  "secondFloorHallNormal::back": { x: 17, y: 15, w: 27, h: 60 },
  "secondFloorHallNormal::stairs": { x: 54, y: 16, w: 31, h: 60 },
  "secondFloorHallNormal::residential": { x: 88, y: 13, w: 12, h: 72 },
  "upperStairwellNormal::back": { x: 16, y: 45, w: 22, h: 33 },
  "upperStairwellNormal::to-3f": { x: 54, y: 17, w: 31, h: 60 },
  "thirdFloorHallNormal::wall": { x: 42, y: 13, w: 37, h: 67 },
  "thirdFloorHallNormal::stairs": { x: 2, y: 14, w: 35, h: 67 },
  "thirdFloorHallNormal::residential": { x: 79, y: 7, w: 21, h: 79 },
  "thirdFloorResidentialNormal::home-door": { x: 62, y: 22, w: 16, h: 58 },
  "thirdFloorResidentialNormal::back": { x: 0, y: 5, w: 24, h: 72 },
  "dinnerTableScene::wife": { x: 59, y: 22, w: 16, h: 60 },
  "dinnerTableScene::dinner": { x: 24, y: 57, w: 25, h: 18 },
  "dinnerTableScene::symbol": { x: 79, y: 14, w: 14, h: 18 },
  "dinnerTableScene::back": { x: 86, y: 74, w: 12, h: 16 }
};

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

function updateSceneFlashlightPosition(clientX, clientY) {
  const rect = sceneEl.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
  const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
  lastFlashlightPosition = {
    xRatio: x / rect.width,
    yRatio: y / rect.height
  };
  sceneEl.style.setProperty("--flashlight-x", `${x}px`);
  sceneEl.style.setProperty("--flashlight-y", `${y}px`);
}

[
  "js/images/car.jpg",
  "js/images/gate.jpg",
  "js/images/letterbox.jpg",
  "js/images/pin.jpg",
  "js/images/parkinglot.jpg",
  "js/images/js.jpg"
].forEach(preloadSceneAsset);

async function render() {
  const sceneId = state.currentScene;
  const renderToken = ++latestSceneRenderToken;
  const scene = scenes[sceneId];
  const isMainMenu = sceneId === "mainMenu";
  const shouldGuideHotspots = !isMainMenu && !guidedScenes.has(sceneId);
  const artSceneId = sceneId === "upperStairwell" && state.flags.stairwellBlocked
    ? "upperStairwellBlocked"
    : sceneId;
  const title = typeof scene.title === "function" ? scene.title() : scene.title;
  const hint = typeof scene.hint === "function" ? scene.hint() : scene.hint;
  const overlay = typeof scene.overlay === "function" ? scene.overlay() : (scene.overlay || "");
  const sceneMarkup = typeof sceneArt[artSceneId] === "function"
    ? sceneArt[artSceneId]()
    : (sceneArt[artSceneId] || "");
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
  sceneEl.style.setProperty("--flashlight-x", `${sceneEl.clientWidth * lastFlashlightPosition.xRatio}px`);
  sceneEl.style.setProperty("--flashlight-y", `${sceneEl.clientHeight * lastFlashlightPosition.yRatio}px`);
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
  const hotspotSceneId = sceneId === "upperStairwell" && state.flags.stairwellBlocked
    ? "upperStairwellBlocked"
    : sceneId;
  return hotspots
    .filter((spot) => spot.visible !== false)
    .map((spot) => {
      const builtinRect = BUILTIN_HOTSPOT_RECTS[`${hotspotSceneId}::${spot.id}`];
      const resolvedSpot = typeof window.HotspotEditor?.getSpotRect === "function"
        ? window.HotspotEditor.getSpotRect(sceneId, spot)
        : (builtinRect ? { ...spot, ...builtinRect } : spot);
      const finalSpot = builtinRect ? { ...resolvedSpot, ...builtinRect } : resolvedSpot;
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
          style="left:${finalSpot.x}%;top:${finalSpot.y}%;width:${finalSpot.w}%;height:${finalSpot.h}%"
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

sceneEl.addEventListener("pointermove", (event) => {
  updateSceneFlashlightPosition(event.clientX, event.clientY);
});

sceneEl.addEventListener("pointerdown", (event) => {
  updateSceneFlashlightPosition(event.clientX, event.clientY);
});
