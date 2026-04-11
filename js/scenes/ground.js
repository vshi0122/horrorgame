// Ground-level scenes: carInterior, entrance
window.scenes = window.scenes || {};

window.scenes.carInterior = {
  title: "车里",
  hint: "雨刚停，挡风玻璃上还残着水痕。",
  objective() {
    return hasItem("番茄酱") ? "下车，穿过停车场去公寓门口。" : "先在驾驶座拿钥匙串，然后下车去停车场打开后备箱取出番茄酱。";
  },
  message() {
    return state.flags.wokeUp ? "潮湿的车厢里只剩你急促的呼吸声。你得把妻子要的番茄酱带上楼。" : "你在驾驶座上猛地惊醒，公寓楼正静静立在挡风玻璃前。";
  },
  hotspots() {
    return [
      {
        id: "seat",
        label: hasItem("钥匙串") ? "驾驶座" : "钥匙串",
        x: 2.44, y: 64.8, w: 41.89, h: 34.82,
        action() {
          state.flags.wokeUp = true;
          if (!hasItem("钥匙串")) {
            acquireItem("钥匙串");
            acquireItem("车钥匙");
            acquireItem("信箱钥匙");
            addNote("你在驾驶座找到钥匙串，里面挂着车钥匙和信箱钥匙。");
            showMessage("你从驾驶座缝隙里摸出钥匙串，金属冷得有些不正常。");
            return;
          }
          showMessage("仪表盘早就熄火了，车里安静得只剩你自己的呼吸。");
        }
      },
      { id: "exit-car", label: "下车", x: 56.68, y: 6.87, w: 41.41, h: 89.53, action() { setScene("parkingLot", { transitionAudioSrc: window.carAudioSrc, transitionAudioWaitMs: 0 }); } },
      {
        id: "flee-engine",
        label: "发动引擎逃离",
        x: 28, y: 74, w: 44, h: 12,
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

window.scenes.parkingLot = {
  title: "停车场",
  hint: "雨后的地面泛着冷光，车就停在你身后，公寓入口在前方。",
  objective() {
    return hasItem("番茄酱") ? "去公寓门口。" : "用车钥匙打开后备箱，取出番茄酱。";
  },
  message() {
    return state.flags.trunkOpened ? "后备箱还敞着，冷雨气和杂物的味道混在一起。" : "你站在湿冷的停车场里，后备箱和公寓入口都在视线范围内。";
  },
  hotspots() {
    return [
      {
        id: "trunk",
        label: state.flags.trunkOpened ? "查看后备箱" : "打开后备箱",
        x: 0, y: 53.03, w: 32.63, h: 22.5,
        action() {
          if (!hasItem("车钥匙")) {
            showMessage("后备箱锁着。你得先找到车钥匙。");
            return;
          }
          if (!state.flags.trunkOpened) {
            state.flags.trunkOpened = true;
            acquireItem("番茄酱");
            addNote("你从后备箱拿到了妻子要的番茄酱。");
            showMessage("你打开后备箱，从杂物袋里翻出那瓶番茄酱。");
            return;
          }
          showMessage("后备箱里只剩空购物袋和潮湿的纸箱。");
        }
      },
      { id: "to-entrance", label: "前往公寓门口", x: 57.65, y: 8.15, w: 31.51, h: 38.21, action() { setScene("entrance"); } },
      { id: "back-car", label: "回车里", x: 37.48, y: 47.97, w: 23.33, h: 43.56, action() { setScene("carInterior", { transitionAudioSrc: window.carAudioSrc, transitionAudioWaitMs: 0 }); } }
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
      { id: "mailbox", label: "查看信箱", x: 1.46, y: 30.44, w: 18, h: 26, action() { setScene("entranceMailbox"); } },
      { id: "door", label: state.flags.codeDiscovered ? "查看密码锁" : "查看大门密码锁", x: 47.09, y: 12.42, w: 22, h: 56, action() { setScene("entranceKeypad"); } },
      { id: "back-parking", label: "回停车场", x: 23.02, y: 78.36, w: 60.85, h: 21.1, action() { setScene("parkingLot"); } }
    ];
  }
};

window.scenes.entranceMailbox = {
  title: "信箱前",
  hint: "一排老旧信箱挂在潮湿的墙边。",
  objective() {
    return state.flags.mailboxOpened ? "你已经拿到通知，可以返回入口或继续查看。" : "打开信箱，找到新的门禁密码。";
  },
  message() {
    return state.flags.mailboxOpened ? "信箱门半开着，里面只剩几张被雨气泡软的宣传单。" : "其中一个信箱的锁孔已经锈得发暗。";
  },
  hotspots() {
    return [
      {
        id: "open-mailbox",
        label: state.flags.mailboxOpened ? "查看已取出的通知" : "打开并取件",
        x: 27.74, y: 26.75, w: 47.82, h: 23.04,
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
      { id: "back-entrance", label: "返回入口", x: 38.56, y: 85.98, w: 21.94, h: 13.57, action() { setScene("entrance"); } }
    ];
  }
};

window.scenes.entranceKeypad = {
  title: "密码锁前",
  hint: "金属按键磨损得很严重，冷光照在门框边。",
  objective() {
    return state.flags.codeDiscovered ? "输入正确密码进入大楼。" : "你得先弄清楚门禁密码。";
  },
  message() {
    return state.flags.codeDiscovered ? "你已经知道密码，面板正安静地等你输入。" : "数字面板亮着，但你还不知道该输入什么。";
  },
  hotspots() {
    return [
      {
        id: "use-keypad",
        label: state.flags.codeDiscovered ? "输入密码" : "尝试输入密码",
        x: 49.9, y: 15.18, w: 17.1, h: 46.61,
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
            setScene("hallway", {
              transitionAudioSrc: window.correctPasswordAudioSrc,
              lockInputDuringTransition: true
            });
            return;
          }
          if (typeof window.playFeedbackSound === "function") {
            window.playFeedbackSound(window.wrongPasswordAudioSrc, 0.42);
          }
          showMessage("密码错误。面板上的冷光闪了一下，又恢复沉默。");
        }
      },
      { id: "back-entrance", label: "返回入口", x: 81.16, y: 44.38, w: 18.7, h: 54.64, action() { setScene("entrance"); } }
    ];
  }
};
