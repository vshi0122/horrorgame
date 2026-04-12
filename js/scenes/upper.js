// Upper-floor scenes: upperStairwell, thirdFloorHall, thirdFloorResidential
window.scenes = window.scenes || {};

function buildFlashlightOverlay() {
  return `
    <div class="scene-flashlight-overlay">
      <div class="scene-flashlight-darkness"></div>
      <div class="scene-flashlight-glow"></div>
    </div>
  `;
}

window.scenes.upperStairwell = {
  title() {
    return state.flags.stairwellBlocked ? "被封死的二楼楼梯间" : "二楼楼梯间";
  },
  hint() {
    return state.flags.stairwellBlocked ? "退路消失了。" : "这里连通二楼和三楼，四周布满了红色痕迹。";
  },
  objective() {
    return state.flags.stairwellBlocked ? "只能前往三楼居民区。" : "继续前往三楼。";
  },
  message() {
    return state.flags.stairwellBlocked
      ? "原本回二楼的方向被一面墙堵死，上面用血反复写满了她在等你。"
      : "楼梯间里到处都是红色痕迹，像某种看不懂的符号。";
  },
  hotspots() {
    if (state.flags.stairwellBlocked) {
      return [
        {
          id: "wall",
          label: "血字墙面",
          x: 18, y: 18, w: 64, h: 46,
          action() {
            showMessage('鲜血在墙上叠成同一句话：<span class="blood-text">她在等你</span>。');
          }
        },
        {
          id: "photo",
          label: "角落里的合影",
          x: 8, y: 72, w: 18, h: 14,
          action() {
            collectDocument({
              id: "jm-photo",
              title: "J & M 合影",
              source: "被封死的二楼楼梯间角落",
              body: [
                '照片背后写着 <span class="signal-text">J &amp; M</span>。',
                "你的脸还在，妻子的面部却被故意涂黑。"
              ].join("\n")
            });
            showMessage("角落里放着一张你和妻子的合影。她的脸被人刻意涂黑了。");
          }
        },
        {
          id: "to-3f",
          label: "回三楼",
          x: 64, y: 16, w: 20, h: 20,
          action() {
            setScene("thirdFloorHall");
          }
        }
      ];
    }

    return [
      {
        id: "symbols",
        label: "红色符号",
        x: 18, y: 24, w: 18, h: 24,
        action() {
          showMessage("那些痕迹像被人反复描摹，完全看不懂含义。");
        }
      },
      {
        id: "landing",
        label: "楼梯平台",
        x: 40, y: 18, w: 20, h: 18,
        action() {
          showMessage("平台中央留着拖拽过什么东西的深色痕迹。");
        }
      },
      {
        id: "to-3f",
        label: "通往三楼",
        x: 62, y: 18, w: 22, h: 28,
        action() {
          setScene("thirdFloorHall");
        }
      },
      {
        id: "back",
        label: "回二楼大厅",
        x: 18, y: 72, w: 22, h: 14,
        action() {
          setScene("secondFloorHall");
        }
      }
    ];
  }
};

window.scenes.blockedStairwellPhoto = {
  title: "Photo",
  hint: "Your face is still visible. Her face has been blacked out.",
  objective() {
    return "Return to the blocked stairwell.";
  },
  message() {
    if (state.flags.stairwellPhotoReactionPending) {
      state.flags.stairwellPhotoReactionPending = false;
      return '刚才那是什么……？照片里为什么会突然闪出那张脸？<span class="signal-text">J &amp; M</span> 几个字母像在提醒你什么。';
    }
    return 'The back of the photo only says <span class="signal-text">J &amp; M</span>.';
  },
  hotspots() {
    return [
      {
        id: "back",
        label: "Back",
        x: 34, y: 78, w: 32, h: 12,
        action() {
          setScene("upperStairwellBlackout");
        }
      }
    ];
  }
};

window.scenes.thirdFloorHallBlackout = {
  title: "三楼？",
  hint() {
    return "手电光照到的地方像三楼走廊，但两边的墙让你觉得这里根本不对。";
  },
  objective() {
    return "在黑暗里确认这到底是不是三楼。";
  },
  message() {
    return "手机冷白的光圈在黑暗里轻轻发抖。你很确定这里像三楼，但又绝不是你刚才看到的那个三楼。";
  },
  overlay() {
    return buildFlashlightOverlay();
  },
  hotspots() {
    return [
      {
        id: "left-wall-text",
        label: "都是你的错",
        x: 8, y: 22, w: 20, h: 40,
        action() {
          showMessage('左侧墙面上的字像刚从墙体里渗出来：<span class="blood-text">都是你的错</span>。');
        }
      },
      {
        id: "right-wall-text",
        label: "她死了",
        x: 72, y: 22, w: 20, h: 40,
        action() {
          showMessage('右侧墙上的字更短，也更重，像被指甲反复刻进去：<span class="blood-text">她死了</span>。');
        }
      },
      {
        id: "return-stairwell",
        label: "返回楼梯间",
        x: 35, y: 77, w: 26, h: 12,
        action() {
          setScene("upperStairwellBlackout");
        }
      },
      {
        id: "upstairs-question",
        label: "四楼？",
        x: 42, y: 16, w: 18, h: 46,
        pulse: true,
        action() {
          setScene("fourthFloorQuestion");
        }
      }
    ];
  }
};

window.scenes.upperStairwellBlackout = {
  title: "楼梯间？",
  hint() {
    return state.flags.thirdFloorFlashlightEnabled
      ? "你回到了刚才捡照片的楼梯间，但这里只有手电筒照到的部分还像现实。"
      : "你什么也看不见。";
  },
  objective() {
    return state.flags.thirdFloorFlashlightEnabled
      ? "确认楼梯间和三楼之间到底哪里变了。"
      : "先在黑暗里稳住呼吸。";
  },
  onEnter() {
    if (state.flags.thirdFloorBlackoutIntroPlayed) {
      state.flags.thirdFloorFlashlightEnabled = true;
      return false;
    }

    state.flags.thirdFloorBlackoutIntroPlayed = true;
    state.flags.thirdFloorFlashlightEnabled = false;
    document.body.classList.add("scene-input-locked");
    messageTextEl.innerHTML = "";
    render();

    if (typeof window.playFeedbackSound === "function" && window.cryAudioSrc) {
      window.playFeedbackSound(window.cryAudioSrc, 0.92);
    }

    window.setTimeout(() => {
      showMessage("大楼停电了。你听见黑暗中婴儿的哭声，打开了手机手电筒。");
    }, 900);

    window.setTimeout(() => {
      state.flags.thirdFloorFlashlightEnabled = true;
      document.body.classList.remove("scene-input-locked");
      render();
    }, 1800);

    return true;
  },
  message() {
    return state.flags.thirdFloorFlashlightEnabled
      ? "血字、墙面、角落的位置都在，可光圈之外的黑暗像把整个楼梯间吞掉了一半。"
      : "";
  },
  overlay() {
    if (!state.flags.thirdFloorFlashlightEnabled) {
      return '<div class="scene-blackout-cover"></div>';
    }
    return buildFlashlightOverlay();
  },
  hotspots() {
    return [
      {
        id: "blood-wall",
        label: "血字墙面",
        x: 18, y: 18, w: 64, h: 46,
        action() {
          showMessage("那些血字在手电光边缘一闪一灭，像始终在躲着你的正眼去看。");
        }
      },
      {
        id: "photo-corner",
        label: "照片掉落处",
        x: 8, y: 72, w: 18, h: 14,
        action() {
          showMessage("角落里只剩下一道潮湿的相框印子。那张合影已经不见了。");
        }
      },
      {
        id: "back-to-fake-third",
        label: "回到三楼",
        x: 64, y: 16, w: 20, h: 20,
        action() {
          if (!state.flags.firstFakeThirdFloorSeen) {
            state.flags.firstFakeThirdFloorSeen = true;
            setScene("thirdFloorHallBlackout");
            return;
          }
          setScene("thirdFloorHallFlashlight");
        }
      }
    ];
  }
};

window.scenes.fourthFloorQuestion = {
  title: "四楼？",
  hint() {
    return "空气里有一股挥之不去的怪味，哭声却忽然变远了。";
  },
  objective() {
    return "决定是退回去，还是继续往上。";
  },
  message() {
    return "你照见一层陌生的缓台。墙皮发潮起泡，空气里混着腐烂和消毒水一样的味道，闻久了让人想吐。感觉有什么东西在看着我。";
  },
  overlay() {
    return buildFlashlightOverlay();
  },
  hotspots() {
    return [
      {
        id: "back-to-third-question",
        label: "回三楼？",
        x: 18, y: 76, w: 26, h: 12,
        action() {
          setScene("thirdFloorHallBlackout");
        }
      },
      {
        id: "to-real-third-floor",
        label: "向上走",
        x: 56, y: 74, w: 22, h: 14,
        pulse: true,
        action() {
          setScene("monsterStare");
        }
      }
    ];
  }
};

window.scenes.monsterStare = {
  title: "……",
  hint() {
    return "你刚把光抬起来，就照见了不该存在的东西。";
  },
  objective() {
    return "稳住自己。";
  },
  onEnter() {
    document.body.classList.add("scene-input-locked");
    messageTextEl.innerHTML = "一个张着血盆大口的类人生物正死死盯着你。可下一秒，它又猛地缩回了黑暗里。";
    render();

    window.setTimeout(() => {
      setScene("thirdFloorHallFlashlight", {
        lockInputDuringTransition: true
      }).then(() => {
        if (typeof window.playFeedbackSound === "function" && window.screamAudioSrc) {
          window.playFeedbackSound(window.screamAudioSrc, 0.96);
        }
      });
    }, 1200);

    return true;
  },
  message() {
    return "一个张着血盆大口的类人生物正死死盯着你。可下一秒，它又猛地缩回了黑暗里。";
  },
  hotspots() {
    return [];
  }
};

window.scenes.thirdFloorHallFlashlight = {
  title: "三楼",
  hint() {
    return "完全没有灯，你只能靠手机手电筒一点点照清这层楼。";
  },
  objective() {
    return state.flags.residentialUnlocked ? "进入居民区。" : "调查三楼并找到居民区密码。";
  },
  message() {
    state.flags.thirdFloorVisited = true;
    return "整层楼布满血手印和看不清的符号。左侧地上有被撕下来的告示，右侧居民区的门后隐约有动静。";
  },
  overlay() {
    return buildFlashlightOverlay();
  },
  hotspots() {
    return [
      {
        id: "back-stairwell",
        label: "回楼梯间",
        x: 42, y: 24, w: 18, h: 48,
        action() {
          setScene("upperStairwellBlackout");
        }
      },
      {
        id: "notice",
        label: "地上的告示",
        x: 8, y: 62, w: 20, h: 14,
        action() {
          collectDocument({
            id: "she-waits",
            title: "撕下来的告示",
            source: "三楼左侧地面",
            body: '<span class="blood-text">她在等你</span>'
          });
          showMessage('那张被撕下的告示上只剩一句话：<span class="blood-text">她在等你</span>。');
        }
      },
      {
        id: "residential",
        label: state.flags.residentialUnlocked ? "进入居民区" : "居民区密码锁",
        x: 74, y: 18, w: 18, h: 48,
        pulse: !state.flags.residentialUnlocked,
        action() {
          if (state.flags.residentialUnlocked) {
            setScene("thirdFloorResidential");
            return;
          }
          const input = promptCode("请输入居民区入口密码，密码为两个字母。");
          if (input === null) {
            showMessage("门后的细碎动静还在继续。");
            return;
          }
          if (normalizeResidentialPassword(input) === "JM") {
            state.flags.residentialUnlocked = true;
            addNote("三楼居民区密码和合影背面的 J & M 有关。");
            showMessage("密码锁轻轻跳开了。");
            return;
          }
          showMessage("密码错误。门锁里传来轻微的金属摩擦声。");
        }
      }
    ];
  }
};

window.scenes.thirdFloorHall = {
  title: "三楼",
  hint: "完全没有灯，只有出口的刺眼红灯一直亮着。",
  objective() {
    return state.flags.residentialUnlocked ? "进入居民区。" : "调查三楼并找到居民区密码。";
  },
  message() {
    state.flags.thirdFloorVisited = true;
    return "整层楼布满血手印和看不清的符号。左侧地上有被撕下来的告示，右侧居民区的门后隐约有动静。";
  },
  hotspots() {
    return [
      {
        id: "back-stairwell",
        label: "回楼梯间",
        x: 42, y: 24, w: 18, h: 48,
        action() {
          state.flags.stairwellBlocked = true;
          setScene("upperStairwell");
        }
      },
      {
        id: "notice",
        label: "地上的告示",
        x: 8, y: 62, w: 20, h: 14,
        action() {
          collectDocument({
            id: "she-waits",
            title: "撕下来的告示",
            source: "三楼左侧地面",
            body: '<span class="blood-text">她在等你</span>'
          });
          showMessage('那张被撕下的告示上只剩一句话：<span class="blood-text">她在等你</span>。');
        }
      },
      {
        id: "residential",
        label: state.flags.residentialUnlocked ? "进入居民区" : "居民区密码锁",
        x: 74, y: 18, w: 18, h: 48,
        pulse: !state.flags.residentialUnlocked,
        action() {
          if (state.flags.residentialUnlocked) {
            setScene("thirdFloorResidential");
            return;
          }
          const input = promptCode("请输入居民区入口密码，密码为两个字母。");
          if (input === null) {
            showMessage("门后的细碎动静还在继续。");
            return;
          }
          if (normalizeResidentialPassword(input) === "JM") {
            state.flags.residentialUnlocked = true;
            addNote("三楼居民区密码和合影背面的 J & M 有关。");
            showMessage("密码锁轻轻跳开了。");
            return;
          }
          showMessage("密码错误。门锁里传来轻微的金属摩擦声。");
        }
      }
    ];
  }
};

window.scenes.thirdFloorResidential = {
  title: "三楼居民区",
  hint: "狭窄的走廊里，你家的门虚掩着。",
  objective() {
    if (state.flags.creatureAlerted) return "快逃进安全通道入口。";
    const examined = [state.flags.corpseExamined, state.flags.creatureExamined, state.flags.homeDoorExamined].filter(Boolean).length;
    return examined === 0 ? "先观察眼前的东西。" : `已调查 ${examined}/3 处，继续观察。`;
  },
  message() {
    return state.flags.creatureAlerted
      ? '那个身影已经发现了你。<span class="blood-text">快逃进左侧的安全通道。</span>'
      : "门口躺着一具尸体，一个奇怪的身影正背对着你啃食它。";
  },
  hotspots() {
    const allExamined = () =>
      state.flags.corpseExamined && state.flags.creatureExamined && state.flags.homeDoorExamined;

    const examine = (flag, firstMsg) => {
      if (state.flags.creatureAlerted) {
        setScene("badEnding");
        return;
      }
      if (!state.flags[flag]) {
        state.flags[flag] = true;
        if (allExamined()) {
          state.flags.creatureAlerted = true;
          showMessage(`${firstMsg}<br><span class="blood-text">那身影猛地回过头，它发现了你。快逃进左侧的安全通道！</span>`);
        } else {
          showMessage(firstMsg);
        }
        render();
        return;
      }
      showMessage("你已经看过这里了。");
    };

    return [
      {
        id: "escape",
        label: "安全通道入口",
        x: 8, y: 20, w: 18, h: 54,
        pulse: state.flags.creatureAlerted,
        action() {
          setScene("escapeStairwell");
        }
      },
      {
        id: "corpse",
        label: "门口的尸体",
        x: 38, y: 58, w: 24, h: 14,
        action() {
          examine("corpseExamined", "尸体像被撕开过，衣服和地面都被血浸透了。");
        }
      },
      {
        id: "creature",
        label: "啃食的身影",
        x: 58, y: 34, w: 14, h: 28,
        action() {
          examine("creatureExamined", "它的肩背像被强行掰弯，啃咬时发出湿冷的撕裂声。");
        }
      },
      {
        id: "home-door",
        label: "虚掩的家门",
        x: 74, y: 20, w: 16, h: 46,
        action() {
          examine("homeDoorExamined", "你家的门缝里只有黑暗，没有任何灯光。");
        }
      },
      {
        id: "back",
        label: "退回三楼",
        x: 38, y: 78, w: 20, h: 12,
        action() {
          if (state.flags.creatureAlerted) {
            setScene("badEnding");
            return;
          }
          setScene("thirdFloorHall");
        }
      }
    ];
  }
};
