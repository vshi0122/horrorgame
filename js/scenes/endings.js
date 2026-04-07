// Endings
window.scenes = window.scenes || {};

const TOTAL_ENDINGS = 5;
const TOTAL_DOCUMENTS = 6;

function buildEndingOverlay(config) {
  const collectedDocuments = state.documents.length;
  const documentRate = `${collectedDocuments}/${TOTAL_DOCUMENTS}`;
  const unlockedEndingRate = `${getUnlockedEndingCount()}/${TOTAL_ENDINGS}`;

  return `
    <section class="scene-overlay ending-overlay" aria-label="结算界面">
      <article class="ending-card ending-card-${config.variant}">
        <p class="ending-kicker">结算</p>
        <h3 class="ending-name">${config.name}</h3>
        <p class="ending-summary">${config.summary}</p>
        <div class="ending-stats">
          <div class="ending-stat">
            <span class="ending-stat-label">当前结局</span>
            <strong class="ending-stat-value">${config.order}/${TOTAL_ENDINGS}</strong>
          </div>
          <div class="ending-stat">
            <span class="ending-stat-label">已解锁结局</span>
            <strong class="ending-stat-value">${unlockedEndingRate}</strong>
          </div>
          <div class="ending-stat">
            <span class="ending-stat-label">字条收集</span>
            <strong class="ending-stat-value">${documentRate}</strong>
          </div>
        </div>
      </article>
    </section>
  `;
}

window.scenes.fleeEnding = {
  endingId: "fleeEnding",
  title: "逃离结局",
  hint: "你选择离开。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "响足声在雨中消失。你厕了驾驶席，副驾座上没有任何人，也没有东西。你开车就走了。";
  },
  overlay() {
    return buildEndingOverlay({
      order: 5,
      variant: "bad",
      name: "奔逃",
      summary: "你没有走进那栋楼。你的妻子和真相都留在里面，你却选择不弹公采。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};

window.scenes.badEnding = {
  endingId: "badEnding",
  title: "坏结局",
  hint: "你没能逃掉。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "你再回头时，那东西已经扑到了你面前。视野被黑暗和湿热的血腥味瞬间淹没。";
  },
  overlay() {
    return buildEndingOverlay({
      order: 1,
      variant: "bad",
      name: "失陷",
      summary: "你在居民区停得太久，最终没能从那层楼里活着离开。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};

window.scenes.failedEscapeEnding = {
  endingId: "failedEscapeEnding",
  title: "坏结局",
  hint: "门没有为你打开。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "密码输错的瞬间，你感觉到有什么来到身后。那像是一个被剥皮的人类，却长着你的脸，鲜血从它嘴角涌出，然后朝你扑了过来。";
  },
  overlay() {
    return buildEndingOverlay({
      order: 2,
      variant: "failed",
      name: "门外之物",
      summary: "你到达了一楼，却没能用正确方式离开。门外不是出口，而是下一层噩梦。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};

window.scenes.normalEnding = {
  endingId: "normalEnding",
  title: "一般结局",
  hint: "你离开了公寓。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "你终于推开大门，外面的夜风冰冷得真实。你离开了公寓，但妻子又在何方?";
  },
  overlay() {
    return buildEndingOverlay({
      order: 3,
      variant: "normal",
      name: "离开公寓",
      summary: "你活着离开了这里，但真相并没有跟着你一起出来。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};

window.scenes.goodEndingQuestion = {
  endingId: "goodEndingQuestion",
  title: "好结局？",
  hint: "也许你终于醒来了，也许并没有。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return '你从梦中惊醒，耳边却有个声音贴得很近：<span class="glitch-text">你终于醒了。</span>';
  },
  overlay() {
    return buildEndingOverlay({
      order: 4,
      variant: "good",
      name: "醒来？",
      summary: "你抵达了最深的一层。至于这是清醒、循环，还是另一场伪装得更好的梦，还没有答案。未完待续。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};
