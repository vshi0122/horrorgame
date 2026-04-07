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
  if (item !== "药瓶") return;

  const shouldUse = window.confirm("要现在服用医生给的药吗？");
  if (!shouldUse) {
    showMessage("你把药瓶又放回口袋，决定再等等。");
    return;
  }

  removeItem("药瓶");
  state.flags.chapter2MedicineUsed = true;
  addNote("你在探索过程中服用了医生开的药。情绪短暂平稳了一些。");
  showMessage("你拧开药瓶吞下一片药。喉咙发苦，但心跳慢慢稳了下来。");
});

sceneEl.addEventListener("click", (event) => {
  const menuActionButton = event.target.closest(".menu-action");
  if (menuActionButton) {
    const action = menuActionButton.dataset.action;
    if (typeof window.handleSceneMenuAction === "function") {
      const consumed = window.handleSceneMenuAction(action);
      if (consumed) return;
    }
    if (action === "start-game") startNewGame();
    if (action === "start-chapter2") {
      if (!hasUnlockedEnding("goodEndingQuestion")) {
        showMessage("你还没有抵达“醒来？”结局，第二章暂时无法进入。");
      } else {
        setScene("chapter2Entry");
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
