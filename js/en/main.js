restartButton.addEventListener("click", () => {
  if (state.currentScene === "mainMenu") {
    startNewGame();
    return;
  }
  startNewGame();
});

menuButton.addEventListener("click", () => {
  openMainMenu();
});

documentsListEl.addEventListener("click", (event) => {
  const button = event.target.closest(".document-entry");
  if (!button) return;
  selectDocument(button.dataset.id);
});

inventoryEl.addEventListener("click", (event) => {
  const itemButton = event.target.closest(".inventory-item-usable");
  if (!itemButton) return;

  const item = itemButton.dataset.item;
  if (item !== "Medicine Bottle") return;

  const shouldUse = window.confirm("Take the medicine now?");
  if (!shouldUse) {
    showMessage("You put the bottle back in your pocket for now.");
    return;
  }

  removeItem("Medicine Bottle");
  state.flags.chapter2MedicineUsed = true;
  addNote("You took the medicine from the doctor. Your pulse steadied for a moment.");
  showMessage("You swallow one pill. The bitterness lingers, but your breathing slows.");
});

sceneEl.addEventListener("click", (event) => {
  const menuActionButton = event.target.closest(".menu-action");
  if (menuActionButton) {
    const action = menuActionButton.dataset.action;
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

  const hotspotButton = event.target.closest(".hotspot");
  if (!hotspotButton) return;

  const scene = scenes[state.currentScene];
  const hotspot = scene.hotspots().find((spot) => spot.id === hotspotButton.dataset.id);
  if (hotspot) {
    hotspot.action();
  }
});

function setScene(sceneId) {
  state.currentScene = sceneId;
  const scene = scenes[sceneId];
  if (scene.endingId) {
    unlockEnding(scene.endingId);
  }
  if (typeof scene.onEnter === "function") {
    const handled = scene.onEnter();
    if (handled) return;
  }
  messageTextEl.innerHTML = scene.message();
  render();
}

function showMessage(message) {
  messageTextEl.innerHTML = message;
  render();
}

function resetGame() {
  startNewGame();
}

openMainMenu();
