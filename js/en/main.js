// menuButton, restartButton, inventoryEl, documentsListEl are defined in ui.js

restartButton.addEventListener("click", () => {
  _lastRenderedSceneId = null;
  startNewGame();
});

menuButton.addEventListener("click", () => {
  _lastRenderedSceneId = null;
  openMainMenu();
});

documentsListEl.addEventListener("click", (event) => {
  const button = event.target.closest(".document-entry");
  if (!button) return;
  const docId = button.dataset.id;
  selectDocument(docId);
  const doc = state.documents.find((d) => d.id === docId);
  if (doc) {
    window.printMessage(
      `<strong>${doc.title}</strong>&nbsp;<em>${doc.source}</em><br>${doc.body}`
    );
  }
});

inventoryEl.addEventListener("click", (event) => {
  const itemButton = event.target.closest(".inventory-item-usable");
  if (!itemButton) return;
  const item = itemButton.dataset.item;
  if (item !== "Medicine Bottle") return;
  showMessage("The doctor's medicine can only be taken at the moment you leave the hospital. That choice has already passed.");
});

document.addEventListener("click", (event) => {
  const menuActionButton = event.target.closest(".menu-action");
  if (menuActionButton) {
    const action = menuActionButton.dataset.action;
    incrementDecisionCounter(`menu:${action}`);
    if (typeof window.handleSceneMenuAction === "function") {
      const consumed = window.handleSceneMenuAction(action);
      if (consumed) return;
    }
    if (action === "start-game") startNewGame();
    if (action === "start-chapter2") {
      if (!hasUnlockedEnding("goodEndingQuestion")) {
        showMessage("Chapter 2 is locked. Reach the ending 'Awake?' first.");
      } else {
        setScene("chapter2Entry");
      }
    }
    if (action === "start-chapter3") {
      if (typeof hasChapter3Access === "function" && !hasChapter3Access()) {
        showMessage("Chapter 3 is locked. Reach a Chapter 2 ending first (except Swallow the Gun).");
      } else {
        setScene("chapter3Entry");
      }
    }
    if (action === "open-endings") {
      setMenuTab("endings");
      render();
    }
    if (action === "open-documents") {
      const unlockedDocuments = getUnlockedDocuments();
      setMenuTab("documents", unlockedDocuments[0]?.id || null);
      render();
    }
    if (action === "go-home") {
      setMenuTab("home");
      render();
    }
    return;
  }

  const archiveDocumentButton = event.target.closest(".archive-document-entry");
  if (archiveDocumentButton) {
    setMenuTab("documents", archiveDocumentButton.dataset.id);
    render();
    return;
  }

  const hotspotButton = event.target.closest(".t-hotspot-choice");
  if (!hotspotButton) return;

  const scene = scenes[state.currentScene];
  const hotspot = scene.hotspots().find((spot) => spot.id === hotspotButton.dataset.id);
  if (hotspot) {
    incrementDecisionCounter(`hotspot:${state.currentScene}:${hotspot.id}`);
    hotspot.action();
  }
});

function setScene(sceneId) {
  state.currentScene = sceneId;
  const scene = scenes[sceneId];
  if (scene.endingId) {
    incrementEndingCounter(scene.endingId);
    unlockEnding(scene.endingId);
  }
  if (typeof scene.onEnter === "function") {
    const handled = scene.onEnter();
    if (handled) return;
  }
  // Reset tracker so render() prints this new scene to the terminal
  _lastRenderedSceneId = null;
  render();
}

function showMessage(message) {
  window.printMessage(message);
  render();
}

function resetGame() {
  startNewGame();
}

openMainMenu();
