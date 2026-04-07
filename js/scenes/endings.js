// Endings
window.scenes = window.scenes || {};

const TOTAL_ENDINGS = 10;
const TOTAL_DOCUMENTS = 25;

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
  title: "结局 · 奔逃",
  hint: "你选择离开。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "响足声在雨中消失。你坐上了驾驶席，副驾座上没有任何人，也没有东西。你开车就走了。";
  },
  overlay() {
    return buildEndingOverlay({
      order: 5,
      variant: "bad",
      name: "奔逃",
      summary: "你的妻子和真相都留在里面，你却选择不予理睬。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};

window.scenes.badEnding = {
  endingId: "badEnding",
  title: "结局 · 失陷",
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
  title: "结局 · 门外",
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
      name: "门外",
      summary: "你到达了一楼，却没能用正确方式离开。门不是出口，而是你的下一层噩梦。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};

window.scenes.normalEnding = {
  endingId: "normalEnding",
  title: "结局 · 离开",
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
      name: "离开",
      summary: "你活着离开了这里，但真相并没有跟着你一起。"
    });
  },
  hotspots() {
    return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
  }
};

window.scenes.goodEndingQuestion = {
  endingId: "goodEndingQuestion",
  title: "结局 · 醒来？",
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
      summary: "你抵达了最深的一层。至于这是清醒、循环，还是另一场伪装得更好的梦，还没有答案。"
    });
  },
  hotspots() {
    return [{ id: "to-menu", label: "进入主界面", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }];
  }
};

window.scenes.chapter2UneasyReunionEnding = {
  endingId: "chapter2UneasyReunionEnding",
  title: "结局 · 重逢",
  hint: "她回来了，你们会永远在一起。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "你在客厅坐下后，门厅尽头传来熟悉脚步。妻子走进来，什么都没问，只是抱住你。她的体温真实、呼吸平稳，平静得像被精心排练过。你闭上眼时，耳边只剩一句几乎听不见的低语：<span class=\"glitch-text\">我们终于回家了。</span>";
  },
  overlay() {
    return buildEndingOverlay({
      order: 6,
      variant: "good",
      name: "重逢",
      summary: "回到客厅坐下等她。重逢如愿发生，却平静得不像现实。"
    });
  },
  hotspots() {
    return [{ id: "to-menu", label: "进入主界面", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }];
  }
};

window.scenes.chapter2WaitWifeEnding = {
  endingId: "chapter2WaitWifeEnding",
  title: "结局 · 守候",
  hint: "药效让世界安静下来，也把颜色一起带走。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "药片融开的苦味还停在喉咙里。你在客厅坐下后，才看清墙皮发黑、家具破败，整个家像被时间掏空。你没有离开，只是盯着门口的黑暗，安静地等妻子回家。";
  },
  overlay() {
    return buildEndingOverlay({
      order: 7,
      variant: "normal",
      name: "守候",
      summary: "回到客厅坐下时看见了破败现实，却仍选择继续等待。"
    });
  },
  hotspots() {
    return [{ id: "to-menu", label: "进入主界面", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }];
  }
};

window.scenes.chapter2BloodCradleEnding = {
  endingId: "chapter2BloodCradleEnding",
  title: "结局 · 摇篮",
  hint: "她回来了，可是，值得吗。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "你在客厅刚坐下，卧室方向就传来木头摩擦声。婴儿床的木栏一点点渗出暗红，转眼被血迹铺满。门外传来拖拽般的脚步声。妻子推门进来，衣摆和手臂都沾着新鲜血痕，却像什么都没发生一样抱住你。她贴在你耳边轻声说：<span class=\"blood-text\">这次别再躲了。</span>";
  },
  overlay() {
    return buildEndingOverlay({
      order: 8,
      variant: "bad",
      name: "摇篮",
      summary: "回到客厅坐下后，血迹与重逢一同失控。"
    });
  },
  hotspots() {
    return [{ id: "to-menu", label: "进入主界面", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }];
  }
};

window.scenes.chapter2MonsterReturnEnding = {
  endingId: "chapter2MonsterReturnEnding",
  title: "结局 · 旧影",
  hint: "药让你短暂清醒，也让它重新找到了你。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "你在客厅刚坐下，门外就传来熟悉的刮擦声。门被猛地撞开，那个扭曲的怪物站在门口，脸部轮廓像被撕裂后又草草缝回。它没有停顿，直接朝你扑了上来。";
  },
  overlay() {
    return buildEndingOverlay({
      order: 9,
      variant: "bad",
      name: "旧影",
      summary: "回到客厅坐下的瞬间，那个扭曲的怪物再次破门而入。"
    });
  },
  hotspots() {
    return [{ id: "to-menu", label: "进入主界面", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }];
  }
};

window.scenes.chapter2GunEnding = {
  endingId: "chapter2GunEnding",
  title: "结局 · 吞枪",
  hint: "带着愧疚，你把最后的选择留给了扳机。",
  objective() {
    return `已解锁结局 ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}，已收集字条 ${state.documents.length}/${TOTAL_DOCUMENTS}。`;
  },
  message() {
    return "你在客厅坐下，手里的枪越来越沉。门外有没有脚步声已经不重要了。你把冰冷的枪口抵进嘴里，喉咙被金属顶住。下一秒，只剩一声闷响，整间屋子的回声像被瞬间掐断。";
  },
  overlay() {
    return buildEndingOverlay({
      order: 10,
      variant: "bad",
      name: "吞枪",
      summary: "拿到手枪后，你没有再等待任何人，结局在你扣下扳机的瞬间结束。"
    });
  },
  hotspots() {
    return [{ id: "to-menu", label: "进入主界面", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }];
  }
};
