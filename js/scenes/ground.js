// Ground-level scenes: carInterior, entrance
window.scenes = window.scenes || {};

window.scenes.carInterior = {
  title: "车里",
  hint: "雨刚停，挡风玻璃上还残着水痕。",
  objective() {
    return hasItem("番茄酱") ? "下车，去公寓门口。" : "先在驾驶座拿钥匙串，再用车钥匙打开后备箱取出番茄酱。";
  },
  message() {
    return state.flags.wokeUp ? "潮湿的车厢里只剩你急促的呼吸声。你得把妻子要的番茄酱带上楼。" : "你在驾驶座上猛地惊醒，公寓楼正静静立在挡风玻璃前。";
  },
  hotspots() {
    return [
      {
        id: "seat",
        label: hasItem("钥匙串") ? "驾驶座" : "钥匙串",
        x: 22, y: 48, w: 26, h: 20,
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
      {
        id: "trunk",
        label: state.flags.trunkOpened ? "后备箱" : "打开后备箱",
        x: 6, y: 56, w: 22, h: 18,
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
      { id: "exit-car", label: "下车", x: 78, y: 28, w: 14, h: 34, action() { setScene("entrance"); } },
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
      { id: "back-car", label: "回车里", x: 76, y: 40, w: 16, h: 22, action() { setScene("carInterior"); } }
    ];
  }
};
