restartButton.addEventListener("click", resetGame);

documentsListEl.addEventListener("click", (event) => {
  const button = event.target.closest(".document-entry");
  if (!button) return;
  selectDocument(button.dataset.id);
});

sceneEl.addEventListener("click", (event) => {
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
  messageTextEl.innerHTML = scenes[sceneId].message();
  render();
}

function showMessage(message) {
  messageTextEl.innerHTML = message;
  render();
}

function resetGame() {
  state = initialState();
  messageTextEl.innerHTML = scenes.carInterior.message();
  render();
}

resetGame();
