const TUTORIAL_STORAGE_KEY = "horrorgame-tutorial-seen";
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
    <div class="tutorial-card" role="dialog" aria-modal="true" aria-label="新手引导">
      <p class="tutorial-kicker">快速上手</p>
      <h3 class="tutorial-title">先看这里，再开始探索</h3>
      <ul class="tutorial-list">
        <li><strong>目标</strong>：当前要做什么，卡住时先看它。</li>
        <li><strong>物品</strong>：你身上带着的道具，有些可以直接使用。</li>
        <li><strong>场景</strong>：点击画面里的高亮区域即可调查和推进剧情。</li>
        <li><strong>观察</strong>：底部信息栏会告诉你当前反馈和线索变化。</li>
        <li><strong>线索 / 文本</strong>：右侧会累计你发现的信息，方便回看。</li>
      </ul>
      <p class="tutorial-tip">提示：优先点击场景中的发光区域，通常都有可互动内容。</p>
      <button class="menu-action menu-primary tutorial-close" type="button" data-action="close-tutorial">我知道了，开始吧</button>
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
  if (item !== "药瓶") return;
  showMessage("医生给的药只能在离开医院时决定要不要服用。现在已经没有再吃一次的机会了。");
});

sceneEl.addEventListener("click", (event) => {
  const menuActionButton = event.target.closest(".menu-action");
  if (menuActionButton) {
    const action = menuActionButton.dataset.action;
    incrementDecisionCounter(`menu:${action}`);
    if (typeof window.handleSceneMenuAction === "function") {
      const consumed = window.handleSceneMenuAction(action);
      if (consumed) return;
    }
    if (action === "start-game") startNewGameWithTutorial();
    if (action === "start-chapter2") {
      if (!hasUnlockedEnding("goodEndingQuestion")) {
        showMessage("你还没有抵达“醒来？”结局，第二章暂时无法进入。");
      } else {
        setScene("chapter2Entry");
      }
    }
    if (action === "start-chapter3") {
      if (typeof hasChapter3Access === "function" && !hasChapter3Access()) {
        showMessage("第三章尚未解锁。请先触发任一第二章结局（吞枪除外）。");
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
        title: "J & M 合影",
        source: "被封死的楼梯间角落",
        body: [
          '照片背后写着 <span class="signal-text">J &amp; M</span>。',
          "你的脸还在，妻子的面部却被故意涂黑。"
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
