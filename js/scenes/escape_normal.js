// Escape and normal-path scenes
window.scenes = window.scenes || {};

window.scenes.escapeStairwell = {
  title: "安全通道",
  hint: "停电了，一片漆黑。",
  objective() {
    return "别回头，立刻向下跑。";
  },
  message() {
    return "你听见背后传来嘶吼和咆哮，黑暗中唯一剩下的念头就是逃。";
  },
  overlay() {
    return buildFlashlightOverlay();
  },
  hotspots() {
    return [
      { id: "run", label: "向下跑", x: 34, y: 54, w: 30, h: 18, pulse: true, action() { state.flags.powerOutage = true; setScene("hallway"); } }
    ];
  }
};

window.scenes.hallwayNormal = {
  title: "一楼楼道",
  hint: "一切都突然恢复成了普通公寓楼该有的样子。",
  objective() {
    return "可以离开公寓，或者重新上楼回家。";
  },
  message() {
    return "灯光正常亮着，刚才的停电和追逐像从没发生过。";
  },
  hotspots() {
    return [
      { id: "stairs", label: "上楼楼梯", x: 42, y: 24, w: 18, h: 48, action() { setScene("stairwellNormal"); } },
      { id: "wall", label: "普通告示栏", x: 74, y: 18, w: 18, h: 42, action() { showMessage("右侧墙面贴着正常的物业告示和快递提醒。"); } },
      {
        id: "leave",
        label: "离开公寓",
        x: 38,
        y: 82,
        w: 24,
        h: 10,
        action() {
          setScene("normalEnding");
        }
      }
    ];
  }
};

window.scenes.stairwellNormal = {
  title: "楼梯间",
  hint: "这里连通一楼和二楼，一切都很普通。",
  objective() {
    return "继续前往二楼。";
  },
  message() {
    return "那些红色痕迹消失了，墙面干净得像从未被污染过。";
  },
  hotspots() {
    return [
      { id: "to-1f", label: "回一楼", x: 16, y: 54, w: 22, h: 18, action() { setScene("hallwayNormal"); } },
      { id: "to-2f", label: "前往二楼", x: 62, y: 18, w: 22, h: 28, action() { setScene("secondFloorHallNormal"); } }
    ];
  }
};

window.scenes.secondFloorHallNormal = {
  title: "二楼大厅",
  hint: "这里和普通住宅楼没有区别。",
  objective() {
    return "继续去三楼。";
  },
  message() {
    return "没有红色痕迹，没有怪声，甚至能闻到某户人家残留的油烟味。";
  },
  hotspots() {
    return [
      { id: "stairs", label: "楼梯口", x: 42, y: 24, w: 18, h: 48, action() { setScene("upperStairwellNormal"); } },
      { id: "wall", label: "普通墙面", x: 8, y: 18, w: 18, h: 48, action() { showMessage("白墙上什么都没有。"); } },
      { id: "residential", label: "居民区入口", x: 74, y: 18, w: 18, h: 48, action() { showMessage("这里只是普通住户门，没有什么特别。"); } },
      { id: "back", label: "回楼梯间", x: 40, y: 78, w: 20, h: 12, action() { setScene("stairwellNormal"); } }
    ];
  }
};

window.scenes.upperStairwellNormal = {
  title: "上行楼梯间",
  hint: "这里连通二楼和三楼。",
  objective() {
    return "上三楼回家。";
  },
  message() {
    return "楼梯间恢复得太正常了，反而令人发冷。";
  },
  hotspots() {
    return [
      { id: "to-3f", label: "通往三楼", x: 62, y: 18, w: 22, h: 28, action() { setScene("thirdFloorHallNormal"); } },
      { id: "back", label: "回二楼大厅", x: 18, y: 72, w: 22, h: 14, action() { setScene("secondFloorHallNormal"); } }
    ];
  }
};

window.scenes.thirdFloorHallNormal = {
  title: "三楼",
  hint: "整层楼平静得像什么都没发生过。",
  objective() {
    return "进入居民区，回自己家。";
  },
  message() {
    return "红灯、血手印和告示全都不见了。这里只是一层普通居民楼。";
  },
  hotspots() {
    return [
      { id: "stairs", label: "回楼梯间", x: 42, y: 24, w: 18, h: 48, action() { setScene("upperStairwellNormal"); } },
      { id: "residential", label: "居民区入口", x: 74, y: 18, w: 18, h: 48, action() { setScene("thirdFloorResidentialNormal"); } },
      { id: "wall", label: "普通墙面", x: 8, y: 18, w: 18, h: 48, action() { showMessage("这里只剩普通的刷漆痕迹。"); } }
    ];
  }
};

window.scenes.thirdFloorResidentialNormal = {
  title: "三楼居民区",
  hint: "熟悉的狭窄走廊里，你家的门缝透出暖色灯光。",
  objective() {
    return "进家门。";
  },
  message() {
    return "没有尸体，也没有怪物。走廊安静得像一切都回到了原本的位置。";
  },
  hotspots() {
    return [
      { id: "home-door", label: "你家", x: 42, y: 18, w: 18, h: 48, action() { setScene("dinnerTableScene"); } },
      { id: "back", label: "回三楼", x: 38, y: 78, w: 20, h: 12, action() { setScene("thirdFloorHallNormal"); } }
    ];
  }
};

window.scenes.dinnerTableScene = {
  title: "餐桌",
  hint: "暖黄色的灯光下，晚饭已经摆好了。",
  objective() {
    return state.flags.dinnerKetchupGiven ? "看看墙上的黑白标志。" : "把番茄酱交给妻子。";
  },
  message() {
    return state.flags.dinnerKetchupGiven ? "妻子仍在招呼你吃饭，但那枚黑白标志已经出现在墙上。" : "妻子已经做好了晚饭，正等着你把番茄酱递过去。";
  },
  hotspots() {
    return [
      {
        id: "wife",
        label: "妻子",
        x: 72, y: 20, w: 18, h: 36,
        action() {
          if (!state.flags.dinnerKetchupGiven && hasItem("番茄酱")) {
            removeItem("番茄酱");
            state.flags.dinnerKetchupGiven = true;
            addNote("你把番茄酱交给了妻子。");
            showMessage('妻子接过番茄酱，笑着招呼你坐下。就在这时，墙上浮出一个<span class="void-text">黑白标志</span>。');
            render();
            return;
          }
          if (!state.flags.dinnerKetchupGiven) {
            showMessage("她看着你，轻声问了一句：番茄酱呢？");
            return;
          }
          showMessage("她笑得很自然，像完全没注意到墙上的异样。");
        }
      },
      { id: "dinner", label: "晚饭", x: 26, y: 58, w: 34, h: 16, action() { showMessage("热气从饭菜上缓缓升起，香味真实得不容怀疑。"); } },
      { id: "symbol", label: "黑白标志", x: 12, y: 18, w: 14, h: 18, visible: state.flags.dinnerKetchupGiven, pulse: true, action() { setScene("goodEndingQuestion"); } },
      { id: "back", label: "回走廊", x: 42, y: 78, w: 18, h: 12, action() { setScene("thirdFloorResidentialNormal"); } }
    ];
  }
};
