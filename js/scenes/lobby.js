// Lobby and mid stairs scenes: hallway, stairwell, secondFloorHall
window.scenes = window.scenes || {};

window.scenes.hallway = {
  title: "一楼楼道",
  hint: "左边是消防通道入口，右边是贴着告示的墙，中间是上楼楼梯。",
  objective() {
    return state.flags.powerOutage ? "可以尝试离开公寓，或者重新上楼。" : "去楼上看看。";
  },
  message() {
    return state.flags.powerOutage ? "停电后的一楼只剩应急绿灯。" : "消防通道里只有绿色安全出口在闪，墙上的物业告示像在等你靠近。";
  },
  hotspots() {
    return [
      {
        id: "fire-exit",
        label: "消防通道入口",
        x: 8, y: 22, w: 18, h: 48,
        action() {
          if (typeof window.playUiSound === "function") {
            window.playUiSound("open");
          }
          showMessage("消防通道平常锁闭着，门缝里只有绿色安全出口在黑里闪。");
        }
      },
      {
        id: "stairs",
        label: "上楼楼梯",
        x: 42, y: 24, w: 18, h: 48,
        action() {
          if (state.flags.powerOutage) {
            state.flags.normalAfterOutage = true;
            setScene("stairwellNormal");
            return;
          }
          setScene("stairwell");
        }
      },
      {
        id: "notice",
        label: "物业告示",
        x: 74, y: 18, w: 18, h: 42,
        action() {
          collectDocument({
            id: "arrival-notice-1f",
            title: "降临之日告示",
            source: "一楼楼道右侧墙面",
            body: [
              "物业提醒：",
              "",
              "住户请提前准备迎接 <span class=\"blood-text\">降临之日</span>。",
              "如听见陌生声音呼唤姓名，请勿回应。"
            ].join("\n")
          });

          if (!state.flags.powerOutage) {
            showMessage("告示写得像整栋楼都在准备某个仪式。");
            return;
          }
        }
      },
      {
        id: "back-outside",
        label: state.flags.powerOutage ? "离开公寓" : "返回车里",
        x: 38,
        y: 82,
        w: 24,
        h: 10,
        action() {
          if (state.flags.powerOutage) {
            const shouldLeave = window.confirm("要离开公寓吗？");
            if (!shouldLeave) {
              showMessage("你没有立刻去碰那扇门。");
              return;
            }
            const input = promptCode("请输入门禁密码");
            if (input === null) {
              showMessage("你迟疑了一下，没有输入。");
              return;
            }
            if (input.replace(/\s+/g, "") === "0000") {
              setScene("normalEnding");
              return;
            }
            setScene("failedEscapeEnding");
            return;
          }
          setScene("entrance");
        }
      }
    ];
  }
};

window.scenes.stairwell = {
  title: "楼梯间",
  hint: "这里连通一楼和二楼。",
  objective() {
    return "继续往二楼走。";
  },
  message() {
    return "你刚从一楼楼道上来，停在一楼与二楼之间的平台。";
  },
  hotspots() {
    return [
      { id: "to-1f", label: "回一楼", x: 16, y: 54, w: 22, h: 18, action() { setScene("hallway"); } },
      { id: "landing", label: "楼梯平台", x: 40, y: 22, w: 20, h: 18, action() { showMessage("平台上很安静，只有灯管偶尔轻轻颤一下。"); } },
      { id: "to-2f", label: "前往二楼", x: 62, y: 18, w: 22, h: 28, action() { setScene("secondFloorHall"); } }
    ];
  }
};

window.scenes.secondFloorHall = {
  title: "二楼大厅",
  hint: "布局和一楼一样，只是这里更黑，气氛也更紧。",
  objective() {
    return "继续往三楼走。";
  },
  message() {
    return "左侧墙面依旧贴着降临之日告示，但下半部分被暗红色痕迹涂抹过。";
  },
  hotspots() {
    return [
      {
        id: "notice",
        label: "被涂抹的告示",
        x: 8, y: 18, w: 18, h: 48,
        action() {
          collectDocument({
            id: "arrival-notice-2f",
            title: "被涂抹的告示",
            source: "二楼大厅左侧墙面",
            body: [
              "物业提醒：",
              "",
              "住户请提前准备迎接[红色的手印]",
              "",
              "如听见陌生声音[暗红色污渍]",
              "",
              "告示下半部分被大片暗红色痕迹覆盖。",
              "",
              "<span class=\"blood-text\">你无法判断那到底是血还是别的什么。</span>"
            ].join("\n")
          });
          showMessage("那片红色像被人用手掌反复抹开。");
        }
      },
      { id: "stairs", label: "楼梯口", x: 42, y: 24, w: 18, h: 48, action() { setScene("upperStairwell"); } },
      {
        id: "residential",
        label: "居民区入口",
        x: 74, y: 18, w: 18, h: 48,
        action() {
          if (typeof window.playUiSound === "function") {
            window.playUiSound("open");
          }
          showMessage("右侧是二楼居民区入口，但此刻没有任何声音。");
        }
      },
      { id: "back", label: "回楼梯间", x: 40, y: 78, w: 20, h: 12, action() { setScene("stairwell"); } }
    ];
  }
};
