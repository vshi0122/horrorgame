const TUTORIAL_STORAGE_KEY = "horrorgame-tutorial-seen-en";
const SCENE_TRANSITION_OUT_MS = 420;
const SCENE_TRANSITION_IN_MS = 420;
const bgmAudio = new Audio("js/sounds/bgm.wav");
const carAudioSrc = "js/sounds/car.mp3";
const correctPasswordAudioSrc = "js/sounds/correct password.m4a";
const wrongPasswordAudioSrc = "js/sounds/wrong.m4a";
const keyAudioSrc = "js/sounds/key.mp3";
const docAudioSrc = "js/sounds/doc.m4a";
const openSomethingAudioSrc = "js/sounds/open something.mp3";
const sceneTransitionAudioSrc = "js/sounds/footstep.wav";
let sceneTransitionChain = Promise.resolve();
let bgmStarted = false;

bgmAudio.preload = "auto";
bgmAudio.loop = true;
bgmAudio.volume = 0.4;

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function ensureBgmPlaying() {
  if (bgmStarted) return;
  bgmStarted = true;

  try {
    const playback = bgmAudio.play();
    if (playback?.catch) {
      playback.catch(() => {
        bgmStarted = false;
      });
    }
  } catch {
    bgmStarted = false;
  }
}

function playSingleTransitionSound(audioSrc, volume = 0.45, waitForCompletion = false, waitMs = 6000) {
  return new Promise((resolve) => {
    try {
      const audio = new Audio(audioSrc);
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      audio.preload = "auto";
      audio.volume = volume;

      if (waitForCompletion) {
        audio.addEventListener("ended", finish, { once: true });
        audio.addEventListener("error", finish, { once: true });
        window.setTimeout(finish, waitMs);
      }

      const playback = audio.play();
      if (playback?.catch) {
        playback.catch(finish);
      }

      if (!waitForCompletion) {
        finish();
      }
    } catch {
      // Ignore autoplay or decode failures so scene changes still work.
      resolve();
    }
  });
}

function playSceneTransitionSound(audioSrc = sceneTransitionAudioSrc, waitMsOverride = null) {
  if (audioSrc !== sceneTransitionAudioSrc) {
    const transitionVolume = audioSrc === carAudioSrc ? 0.62 : 0.42;
    const waitMs = waitMsOverride ?? (audioSrc === correctPasswordAudioSrc ? 4000 : 6000);
    if (waitMs <= 0) {
      playSingleTransitionSound(audioSrc, transitionVolume);
      return Promise.resolve();
    }
    return playSingleTransitionSound(audioSrc, transitionVolume, true, waitMs);
  }

  const stepOffsets = [0, 260, 520];

  stepOffsets.forEach((offset) => {
    window.setTimeout(() => {
      playSingleTransitionSound(sceneTransitionAudioSrc, 0.38);
    }, offset);
  });

  return Promise.resolve();
}

function swallowTransitionError(error) {
  if (error) {
    console.error(error);
  }
}

document.addEventListener("pointerdown", ensureBgmPlaying, { passive: true });
document.addEventListener("keydown", ensureBgmPlaying);

function hasSeenTutorial() {
  try {
    return window.localStorage.getItem(TUTORIAL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markTutorialSeen() {
  try {
    window.localStorage.setItem(TUTORIAL_STORAGE_KEY, "1");
  } catch {
    // Ignore storage failures so gameplay still works.
  }
}

function ensureTutorialOverlay() {
  let overlay = document.querySelector("#tutorialOverlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "tutorialOverlay";
  overlay.className = "tutorial-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="tutorial-card" role="dialog" aria-modal="true" aria-label="Quick tutorial">
      <p class="tutorial-kicker">Quick Tutorial</p>
      <h3 class="tutorial-title">Read this before you explore</h3>
      <ul class="tutorial-list">
        <li><strong>Objective</strong>: your current task. Check this first if you feel stuck.</li>
        <li><strong>Items</strong>: tools in your inventory. Some can be used directly.</li>
        <li><strong>Scene</strong>: click highlighted areas to inspect and advance events.</li>
        <li><strong>Observation</strong>: the bottom message bar gives feedback and clues.</li>
        <li><strong>Clues / Text Archive</strong>: your discovered information is stored on the right.</li>
      </ul>
      <p class="tutorial-tip">Tip: start with glowing hotspots. They usually contain key interactions.</p>
      <button class="menu-action menu-primary tutorial-close" type="button" data-action="close-tutorial">Got it, start game</button>
    </div>
  `;

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      hideTutorialOverlay();
    }
  });

  overlay.addEventListener("click", (event) => {
    const closeButton = event.target.closest(".tutorial-close");
    if (!closeButton) return;
    hideTutorialOverlay();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-visible")) {
      hideTutorialOverlay();
    }
  });

  document.body.appendChild(overlay);
  return overlay;
}

function showTutorialOverlay() {
  const overlay = ensureTutorialOverlay();
  overlay.classList.add("is-visible");
  overlay.setAttribute("aria-hidden", "false");
}

function hideTutorialOverlay() {
  const overlay = document.querySelector("#tutorialOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-visible");
  overlay.setAttribute("aria-hidden", "true");
  markTutorialSeen();
}

function startNewGameWithTutorial() {
  startNewGame();
  if (!hasSeenTutorial()) {
    showTutorialOverlay();
  }
}

restartButton.addEventListener("click", () => {
  if (state.currentScene === "mainMenu") {
    startNewGameWithTutorial();
    return;
  }
  startNewGameWithTutorial();
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
  showMessage("The doctor's medicine can only be taken at the moment you leave the hospital. That choice has already passed.");
});

sceneEl.addEventListener("click", (event) => {
  const menuActionButton = event.target.closest(".menu-action");
  if (menuActionButton) {
    const action = menuActionButton.dataset.action;
    incrementDecisionCounter(`menu:${action}`);
    if (action === "start-game") startNewGameWithTutorial();
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

  if (typeof window.HotspotEditor?.shouldSuppressClick === "function" && window.HotspotEditor.shouldSuppressClick(event)) {
    return;
  }

  const scene = scenes[state.currentScene];
  const hotspot = scene.hotspots().find((spot) => spot.id === hotspotButton.dataset.id);
  if (hotspot) {
    incrementDecisionCounter(`hotspot:${state.currentScene}:${hotspot.id}`);
    if (state.currentScene === "upperStairwell" && state.flags.stairwellBlocked && hotspot.id === "photo") {
      collectDocument({
        id: "jm-photo",
        title: "J & M Photo",
        source: "Corner of the blocked stairwell",
        body: [
          'On the back of the photo are the letters <span class="signal-text">J &amp; M</span>.',
          "Your face is still visible. Your wife's face has been deliberately blacked out."
        ].join("\n")
      });
      setScene("blockedStairwellPhoto");
      return;
    }
    hotspot.action();
  }
});

function applyScene(sceneId) {
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
  messageTextEl.innerHTML = scene.message();
  return render();
}

function setScene(sceneId, options = {}) {
  sceneTransitionChain = sceneTransitionChain.then(async () => {
    if (state.currentScene === sceneId) {
      return;
    }

    if (options.lockInputDuringTransition) {
      document.body.classList.add("scene-input-locked");
    }

    await playSceneTransitionSound(
      options.transitionAudioSrc || sceneTransitionAudioSrc,
      options.transitionAudioWaitMs ?? null
    );
    sceneFrame.classList.remove("scene-transition-in");
    void sceneFrame.offsetWidth;
    sceneFrame.classList.add("scene-transition-out");
    await wait(SCENE_TRANSITION_OUT_MS);
    await applyScene(sceneId);
    sceneFrame.classList.remove("scene-transition-out");
    void sceneFrame.offsetWidth;
    sceneFrame.classList.add("scene-transition-in");
    await wait(SCENE_TRANSITION_IN_MS);
    sceneFrame.classList.remove("scene-transition-in");
    document.body.classList.remove("scene-input-locked");
  }).catch((error) => {
    document.body.classList.remove("scene-input-locked");
    swallowTransitionError(error);
  }).catch(swallowTransitionError);

  return sceneTransitionChain;
}

window.carAudioSrc = carAudioSrc;
window.correctPasswordAudioSrc = correctPasswordAudioSrc;
window.wrongPasswordAudioSrc = wrongPasswordAudioSrc;
window.keyAudioSrc = keyAudioSrc;
window.docAudioSrc = docAudioSrc;
window.openSomethingAudioSrc = openSomethingAudioSrc;
window.playFeedbackSound = (audioSrc, volume = 0.42) => {
  playSingleTransitionSound(audioSrc, volume);
};
window.playUiSound = (kind) => {
  if (kind === "key") {
    playSingleTransitionSound(keyAudioSrc, 0.5);
    return;
  }
  if (kind === "doc") {
    playSingleTransitionSound(docAudioSrc, 0.46);
    return;
  }
  if (kind === "open") {
    playSingleTransitionSound(openSomethingAudioSrc, 0.46);
  }
};

function showMessage(message) {
  messageTextEl.innerHTML = message;
  render();
}

function resetGame() {
  startNewGameWithTutorial();
}

openMainMenu();
