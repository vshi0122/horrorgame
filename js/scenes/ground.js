// Ground-level scenes: carInterior, entrance
window.scenes = window.scenes || {};

function getCarInteriorSceneId() {
  return state.flags.trunkOpened ? "carInteriorNoBag" : "carInterior";
}

function createCarInteriorScene() {
  return {
    title: "车里",
    hint: "雨刚停，挡风玻璃上还残着水痕。",
    objective() {
      return hasItem("番茄酱") ? "下车，去公寓门口。" : "检查车前方拿钥匙，或者直接翻副驾驶的包，把番茄酱拿到手。";
    },
    message() {
      return state.flags.wokeUp ? "潮湿的车厢里只剩你急促的呼吸声。你得把妻子要的番茄酱带上楼。" : "你在驾驶座上猛地惊醒，公寓楼正静静立在挡风玻璃前。";
    },
    hotspots() {
      return [
        {
          id: "front-view",
          label: "查看车前方",
          x: 0, y: 24, w: 60, h: 46,
          action() {
            state.flags.wokeUp = true;
            setScene(hasItem("钥匙串") ? "carInteriorCloseupEmpty" : "carInteriorCloseupKeys");
          }
        },
        {
          id: "bag",
          label: state.flags.trunkOpened ? "副驾驶座" : "副驾驶的包",
          x: 42, y: 66, w: 26, h: 24,
          action() {
            if (!state.flags.trunkOpened) {
              state.flags.trunkOpened = true;
              acquireItem("番茄酱");
              addNote("你从副驾驶的包里拿到了妻子要的番茄酱。");
              setScene("carInteriorNoBag");
              showMessage("你把副驾驶的包拽过来，拉开拉链，从里面翻出那瓶番茄酱。再抬眼时，副驾驶已经空了。");
              return;
            }
            showMessage("副驾驶已经空了，包也不在那儿了。");
          }
        },
        { id: "exit-car", label: "下车", x: 67, y: 34, w: 25, h: 36, action() { setScene("entrance"); } },
        {
          id: "flee-engine",
          label: "发动引擎逃离",
          x: 22, y: 72, w: 34, h: 14,
          visible: state.flags.wokeUp && !state.flags.fleePromptShown,
          action() {
            state.flags.fleePromptShown = true;
            showMessage("自动挑灯闪了一下。你真的要现在就开车走吗？你的妻子还在那栋楼里。");
            render();
          }
        },
        {
          id: "flee-confirm",
          label: "确认，立刻开走",
          x: 14, y: 74, w: 33, h: 12,
          visible: state.flags.fleePromptShown,
          action() { setScene("fleeEnding"); }
        },
        {
          id: "flee-cancel",
          label: "不，我得进去",
          x: 53, y: 74, w: 33, h: 12,
          visible: state.flags.fleePromptShown,
          action() {
            state.flags.fleePromptShown = false;
            showMessage("你重新关掉引擎。不管那栋楼里有什么，你还是得上去。");
            render();
          }
        }
      ];
    }
  };
}

window.scenes.carInterior = createCarInteriorScene();
window.scenes.carInteriorNoBag = createCarInteriorScene();

window.scenes.carInteriorCloseupKeys = {
  title: "车里",
  hint: "你把视线压低，盯住方向盘旁边的点火口。",
  objective() {
    return "点击钥匙，把钥匙串取下来。";
  },
  message() {
    return "钥匙就插在点火口上，黑暗里只反出一点冷光。";
  },
  hotspots() {
    return [
      {
        id: "take-keys",
        label: "取下钥匙",
        x: 38,
        y: 22,
        w: 34,
        h: 52,
        pulse: true,
        action() {
          state.flags.wokeUp = true;
          if (!hasItem("钥匙串")) {
            acquireItem("钥匙串");
            acquireItem("车钥匙");
            acquireItem("信箱钥匙");
            addNote("你在车前方的点火口上取下钥匙串，里面挂着车钥匙和信箱钥匙。");
          }
          setScene("carInteriorCloseupEmpty");
          showMessage("你把钥匙串从点火口上拔了下来，金属冷得有些不正常。");
        }
      },
      {
        id: "back-to-car",
        label: "抬头",
        x: 6,
        y: 78,
        w: 16,
        h: 10,
        action() {
          setScene(getCarInteriorSceneId());
        }
      }
    ];
  }
};

window.scenes.carInteriorCloseupEmpty = {
  title: "车里",
  hint: "点火口已经空了，周围只剩一圈暗淡反光。",
  objective() {
    return hasItem("番茄酱") ? "抬头，准备下车。" : "抬头回到车里，再去翻副驾驶的包。";
  },
  message() {
    return "钥匙已经不在这里了。";
  },
  hotspots() {
    return [
      {
        id: "ignition-empty",
        label: "空着的点火口",
        x: 36,
        y: 22,
        w: 24,
        h: 42,
        action() {
          showMessage("点火口空着，钥匙已经在你手里。");
        }
      },
      {
        id: "back-to-car",
        label: "抬头",
        x: 6,
        y: 78,
        w: 16,
        h: 10,
        action() {
          setScene(getCarInteriorSceneId());
        }
      }
    ];
  }
};

window.scenes.entrance = {
  title: "公寓门口",
  hint: "公寓门上栓了密码锁，面板在夜里泛着冷光。",
  objective() {
    return state.flags.codeDiscovered ? "输入正确密码进入大楼。" : "去信箱里找新的门禁密码。";
  },
  message() {
    return state.flags.mailboxOpened ? "你已经知道大楼的新密码了。" : "门禁密码显然被换过了，信箱里也许留着通知。";
  },
  hotspots() {
    return [
      {
        id: "mailbox",
        label: "信箱",
        x: 10, y: 38, w: 18, h: 26,
        action() {
          if (!hasItem("信箱钥匙")) {
            showMessage("信箱锁着。你得先找到钥匙。");
            return;
          }
          if (!state.flags.mailboxOpened) {
            state.flags.mailboxOpened = true;
            state.flags.codeDiscovered = true;
            addNote("物业通知说大楼密码改成了 0327。");
            addNote("停电时，门禁会被临时重置为 0000。");
            collectDocument({
              id: "notice-door-code",
              title: "物业门禁通知",
              source: "1 号楼一层信箱",
              body: [
                "各位住户：",
                "",
                "1 号楼门禁密码已统一更换为 <span class=\"signal-text\">0327</span>。",
                "如遇全楼停电，门禁将临时重置为 <span class=\"signal-text\">0000</span> 以便住户疏散。",
                "",
                "公寓物业管理处"
              ].join("\n")
            });
            collectDocument({
              id: "newspaper-clipping",
              title: "旧报纸剪页",
              source: "1 号楼一层信箱",
              body: [
                "《河岸晚报》社会版",
                "",
                "老城区近日连续出现住户失踪事件，目击者称失踪前常能在楼道中听见异常敲门声。",
                "报道末尾被圈出一句奇怪广告：",
                "",
                "<span class=\"void-text\">当你看见黑白的标志时，记得醒来。</span>"
              ].join("\n")
            });
            showMessage("你打开信箱，从宣传单下面抽出物业通知和一页折过的旧报纸。");
            return;
          }
          selectDocument("notice-door-code");
          showMessage("你又看了一遍通知，上面的数字仍是 0327。");
        }
      },
      {
        id: "door",
        label: state.flags.codeDiscovered ? "输入密码" : "密码锁大门",
        x: 42, y: 18, w: 22, h: 56,
        locked: !state.flags.codeDiscovered,
        action() {
          if (!state.flags.codeDiscovered) {
            showMessage("你还不知道新的门禁密码。");
            return;
          }
          const input = promptCode("请输入大楼门禁密码");
          if (input === null) {
            showMessage("你把手停在数字面板前，没有按下去。");
            return;
          }
          if (input.replace(/\s+/g, "") === "0327") {
            state.flags.buildingEntered = true;
            setScene("hallway");
            return;
          }
          showMessage("密码错误。面板上的冷光闪了一下，又恢复沉默。");
        }
      },
      { id: "back-car", label: "回车里", x: 76, y: 40, w: 16, h: 22, action() { setScene(getCarInteriorSceneId()); } }
    ];
  }
};
