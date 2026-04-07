// Chapter 2 apartment revisit flow (reuses chapter 1 visual layout)
window.scenes = window.scenes || {};

// Reuse chapter 1 room art to keep layout continuity.
sceneArt.chapter2CarAtApartment = sceneArt.carInterior;
sceneArt.chapter2Entrance = sceneArt.entrance;
sceneArt.chapter2Hallway = sceneArt.hallway;
sceneArt.chapter2StairwellNormal = sceneArt.stairwellNormal;
sceneArt.chapter2SecondFloorHall = sceneArt.secondFloorHallNormal;
sceneArt.chapter2SecondFloorResidential = sceneArt.thirdFloorResidentialNormal;
sceneArt.chapter2UpperStairwell = sceneArt.upperStairwellNormal;
sceneArt.chapter2ThirdFloorHall = sceneArt.thirdFloorHallNormal;
sceneArt.chapter2ThirdFloorResidential = sceneArt.thirdFloorResidentialNormal;
sceneArt.chapter2HomeDusty = sceneArt.dinnerTableScene;
sceneArt.chapter2Bedroom = sceneArt.thirdFloorResidentialNormal;
sceneArt.chapter2EchoJudgment = sceneArt.dinnerTableScene;
sceneArt.chapter2PropertyDutyRoom = sceneArt.dinnerTableScene;
sceneArt.chapter2FireExitStairwell = sceneArt.escapeStairwell;

window.scenes.chapter2CarAtApartment = {
  title: "第二章 · 公寓楼下",
  hint: "你把车停回了熟悉的位置，楼一如昨日像从未改变。",
  objective() {
    return "下车去门口信箱，确认刚才那份记忆是否真实。";
  },
  message() {
    return "你盯着公寓门口看了几秒。回家的路就在前面，却比之前更难迈步。";
  },
  hotspots() {
    return [
      {
        id: "seat",
        label: "驾驶座",
        x: 22,
        y: 48,
        w: 26,
        h: 20,
        action() {
          showMessage("你摸到方向盘时，指尖还残着病房里消毒水的气味。");
        }
      },
      {
        id: "exit-car",
        label: "下车",
        x: 78,
        y: 28,
        w: 14,
        h: 34,
        pulse: true,
        action() {
          setScene("chapter2Entrance");
        }
      }
    ];
  }
};

window.scenes.chapter2Entrance = {
  title: "第二章 · 公寓门口",
  hint: "门口信箱里塞着两份刚投递的文件。",
  objective() {
    return state.flags.chapter2MailboxOpened
      ? "你已读完信箱内容，继续进入公寓线后续场景。"
      : "先打开信箱查看新文件。";
  },
  message() {
    return state.flags.chapter2MailboxOpened
      ? "那两份纸还在你脑中反复闪回：裁员补贴，医疗事故。"
      : "信箱缝里露出的白纸边角像是在等你确认某件事。";
  },
  hotspots() {
    return [
      {
        id: "mailbox",
        label: "信箱",
        x: 10,
        y: 38,
        w: 18,
        h: 26,
        pulse: !state.flags.chapter2MailboxOpened,
        action() {
          if (!state.flags.chapter2MailboxOpened) {
            state.flags.chapter2MailboxOpened = true;
            collectDocument({
              id: "chapter2-layoff-subsidy",
              title: "裁员补贴发放通知",
              source: "公寓门口信箱",
              body: [
                "人力资源服务中心通知",
                "",
                "您申请的阶段性裁员补贴已进入发放流程。",
                "发放对象：John",
                "发放日期：03/25",
                "",
                "备注：请本人携带身份证原件办理最终确认。"
              ].join("\n")
            });

            collectDocument({
              id: "chapter2-medical-accident-news",
              title: "晚报剪页：医疗事故争议",
              source: "公寓门口信箱",
              body: [
                "本地晚报 · 社会版",
                "",
                "某医院产科手术事故引发家属争议。",
                "涉事家属表示，将继续申请公开手术流程记录。",
                "院方回应称：目前仍在内部复核。",
                "",
                "边栏手写字迹：\"你得做出正确的选择。\""
              ].join("\n")
            });

            addNote("你在信箱里看到“裁员补贴发放通知”和一篇“医疗事故”报纸剪页。");
            showMessage("你抽出两份文件，呼吸一下子变得很浅。上面分别写着“裁员补贴发放”和“医疗事故”。");
            render();
            return;
          }

          showMessage("你又看了一遍那两份文件，字句没有变，只有你的手在发抖。");
        }
      },
      {
        id: "door",
        label: "公寓门",
        x: 42,
        y: 18,
        w: 22,
        h: 56,
        locked: !state.flags.chapter2MailboxOpened,
        action() {
          if (!state.flags.chapter2MailboxOpened) {
            showMessage("你还没看信箱里的文件。先确认那两份内容。");
            return;
          }
          setScene("chapter2Hallway");
        }
      },
      {
        id: "back-car",
        label: "回车里",
        x: 76,
        y: 40,
        w: 16,
        h: 22,
        action() {
          setScene("chapter2CarAtApartment");
        }
      }
    ];
  }
};

window.scenes.chapter2Hallway = {
  title: "第二章 · 一楼楼道",
  hint: "布局没有变，但右侧海报恢复成了正常的物业通知。",
  objective() {
    return state.flags.chapter2FirstFloorFireExitUnlocked
      ? "消防通道已远程解锁。你可以上楼继续调查，或从消防通道离开。"
      : "先检查右侧物业通知，再决定是否继续上楼。";
  },
  message() {
    return "楼道安静得异常。昨夜那种仪式感告示不见了，取而代之的是一张普通通知。";
  },
  hotspots() {
    return [
      {
        id: "fire-exit",
        label: "消防通道入口",
        x: 8,
        y: 22,
        w: 18,
        h: 48,
        action() {
          if (!state.flags.chapter2FirstFloorFireExitUnlocked) {
            showMessage("消防门依旧锁着。");
            return;
          }
          setScene("chapter2FireExitStairwell");
        }
      },
      {
        id: "stairs",
        label: "上楼楼梯",
        x: 42,
        y: 24,
        w: 18,
        h: 48,
        action() {
          setScene("chapter2StairwellNormal");
        }
      },
      {
        id: "notice",
        label: "物业通知",
        x: 74,
        y: 18,
        w: 18,
        h: 42,
        pulse: true,
        action() {
          collectDocument({
            id: "chapter2-normal-property-notice",
            title: "物业缴费通知",
            source: "一楼楼道右侧墙面",
            body: [
              "物业缴费通知",
              "",
              "本周三 10:00-12:00 进行电梯例行检修。",
              "请住户提前安排出行时间。",
              "如有紧急需求，请联系值班电话。",
              "",
              "落款：城南公寓物业服务中心"
            ].join("\n")
          });
          showMessage("这次只是普通的物业缴费通知。你却因此更不安。");
        }
      },
      {
        id: "back-entrance",
        label: "回门口",
        x: 38,
        y: 82,
        w: 24,
        h: 10,
        action() {
          setScene("chapter2Entrance");
        }
      }
    ];
  }
};

window.scenes.chapter2FireExitStairwell = {
  title: "第二章 · 消防通道",
  hint: "应急灯一路向上，楼梯狭窄且潮湿。",
  objective() {
    return state.flags.chapter2ThirdFloorFireExitUnlocked
      ? "三楼出口已通过验证，你可以直接进入三楼居民区。"
      : "沿消防通道上行，尝试从三楼出口进入。";
  },
  message() {
    return "你推门进入消防通道，门在身后缓缓合上，回声在混凝土墙面来回反弹。";
  },
  hotspots() {
    return [
      {
        id: "corner-photo",
        label: "角落里的合照",
        x: 8,
        y: 74,
        w: 18,
        h: 14,
        pulse: true,
        action() {
          collectDocument({
            id: "chapter2-marriage-photo",
            title: "被抹去的结婚合照",
            source: "一楼消防通道角落",
            body: [
              "照片正面是你和妻子的结婚合照。",
              "你的脸清晰可见，妻子的头像却被反复涂抹到无法辨认。",
              "",
              "背面没有留言、没有署名，只写着四位数字：1106。"
            ].join("\n")
          });
          showMessage("你捡起角落里的合照。妻子的脸再次被抹掉，背面只剩四位结婚日期：1106。");
        }
      },
      {
        id: "fire-checklist",
        label: "墙上的检查表",
        x: 8,
        y: 28,
        w: 20,
        h: 26,
        pulse: true,
        action() {
          collectDocument({
            id: "chapter2-fire-exit-inspection-sheet",
            title: "消防通道检查表",
            source: "一楼消防通道墙面",
            body: [
              "城南公寓消防通道检查表",
              "物业编号：WY-3A-017",
              "检查人：David",
              "",
              "检查日志：",
              "03/25 19:30  照明正常，门锁正常。",
              "03/26 20:10  三楼出口控制器偶发重启，已记录待排查。",
              "03/27 21:42  收到异常报告，执行临时分级管控。",
              "03/27 22:06  三楼出口改为用户名+密码二次验证。",
              ""
            ].join("\n")
          });
          showMessage("检查表上写着检查人“David”和物业编号“WY-3A-017”，最后两条日志正是昨晚。 ");
        }
      },
      {
        id: "to-1f",
        label: "回一楼楼道",
        x: 14,
        y: 70,
        w: 24,
        h: 14,
        action() {
          setScene("chapter2Hallway");
        }
      },
      {
        id: "to-3f-exit",
        label: "前往三楼出口",
        x: 62,
        y: 18,
        w: 24,
        h: 30,
        pulse: true,
        action() {
          setScene("chapter2ThirdFloorHall");
        }
      }
    ];
  }
};

window.scenes.chapter2StairwellNormal = {
  title: "第二章 · 楼梯间",
  hint: "这里连通一楼和二楼，一切都和普通公寓一样。",
  objective() {
    return "继续前往二楼。";
  },
  message() {
    return "墙面干净、灯光稳定，像那些痕迹从未出现过。";
  },
  hotspots() {
    return [
      { id: "to-1f", label: "回一楼", x: 16, y: 54, w: 22, h: 18, action() { setScene("chapter2Hallway"); } },
      { id: "to-2f", label: "前往二楼", x: 62, y: 18, w: 22, h: 28, action() { setScene("chapter2SecondFloorHall"); } }
    ];
  }
};

window.scenes.chapter2SecondFloorHall = {
  title: "第二章 · 二楼大厅",
  hint: "布局一致，静得只能听见自己的脚步声。",
  objective() {
    return "先去三楼确认情况，必要时回二楼居民区找物业值班室。";
  },
  message() {
    return "这里没有异常标记，只有被日常磨旧的墙面与门牌。";
  },
  hotspots() {
    return [
      { id: "stairs", label: "楼梯口", x: 42, y: 24, w: 18, h: 48, action() { setScene("chapter2UpperStairwell"); } },
      { id: "wall", label: "普通墙面", x: 8, y: 18, w: 18, h: 48, action() { showMessage("白墙上只有岁月留下的细小裂纹。"); } },
      { id: "residential", label: "居民区入口", x: 74, y: 18, w: 18, h: 48, action() { setScene("chapter2SecondFloorResidential"); } },
      { id: "back", label: "回楼梯间", x: 40, y: 78, w: 20, h: 12, action() { setScene("chapter2StairwellNormal"); } }
    ];
  }
};

window.scenes.chapter2UpperStairwell = {
  title: "第二章 · 上行楼梯间",
  hint: "这里连通二楼和三楼。",
  objective() {
    return "上三楼。";
  },
  message() {
    return "越往上走越安静，连回声都像被吸走了一部分。";
  },
  hotspots() {
    return [
      { id: "to-3f", label: "通往三楼", x: 62, y: 18, w: 22, h: 28, action() { setScene("chapter2ThirdFloorHall"); } },
      { id: "back", label: "回二楼大厅", x: 18, y: 72, w: 22, h: 14, action() { setScene("chapter2SecondFloorHall"); } }
    ];
  }
};

window.scenes.chapter2ThirdFloorHall = {
  title: "第二章 · 三楼",
  hint: "三楼居民区门口被加锁，门上贴着新封条。",
  objective() {
    return state.flags.chapter2ThirdFloorFireExitUnlocked
      ? "消防通道出口验证已通过，可从侧门进入三楼居民区。"
      : "查看封条内容，然后回二楼值班室用物业信息登录解锁。";
  },
  message() {
    return "三楼很安静。居民区入口被链条锁住，封条像刚贴上去不久。";
  },
  hotspots() {
    return [
      { id: "stairs", label: "回楼梯间", x: 42, y: 24, w: 18, h: 48, action() { setScene("chapter2UpperStairwell"); } },
      {
        id: "residential",
        label: "居民区入口（封锁）",
        x: 74,
        y: 18,
        w: 18,
        h: 48,
        pulse: true,
        action() {
          collectDocument({
            id: "chapter2-sealed-notice-3f",
            title: "三楼居民区封条告示",
            source: "三楼居民区入口",
            body: [
              "物业封锁告示",
              "",
              "三楼居民区临时封锁，禁止入内。",
              "若发现可疑现象，请前往二楼居民区物业值班室登记。",
              "擅自破坏封条或进入者，将依法追责。",
              "",
              "落款：公寓物业服务中心"
            ].join("\n")
          });
          showMessage("铁链把门彻底锁死，封条上写着：禁止进入。如发现可疑现象，请前往二楼居民区物业值班室。");
        }
      },
      {
        id: "fire-exit",
        label: state.flags.chapter2ThirdFloorFireExitUnlocked ? "消防通道出口（已解锁）" : "消防通道出口",
        x: 8,
        y: 18,
        w: 18,
        h: 48,
        pulse: !state.flags.chapter2ThirdFloorFireExitUnlocked,
        action() {
          if (!state.flags.chapter2FirstFloorFireExitUnlocked) {
            showMessage("出口控制器无响应。");
            return;
          }
          if (!state.flags.chapter2ThirdFloorFireExitUnlocked) {
            showMessage("出口屏幕提示：请前往二楼物业值班室登录后再重试。");
            return;
          }
          setScene("chapter2ThirdFloorResidential");
        }
      }
    ];
  }
};

window.scenes.chapter2SecondFloorResidential = {
  title: "第二章 · 二楼居民区",
  hint: "走廊尽头亮着一盏白灯，门牌写着“物业值班室”。",
  objective() {
    return "进入物业值班室，调查三楼封锁原因。";
  },
  message() {
    return "二楼走廊里有生活气息，但值班室门缝里没有任何声音。";
  },
  hotspots() {
    return [
      {
        id: "duty-room",
        label: "物业值班室",
        x: 42,
        y: 18,
        w: 18,
        h: 48,
        pulse: true,
        action() {
          setScene("chapter2PropertyDutyRoom");
        }
      },
      { id: "corridor-note", label: "走廊公告栏", x: 8, y: 22, w: 18, h: 44, action() { showMessage("公告栏上全是日常通知，唯独没有三楼封锁的详细说明。"); } },
      { id: "back", label: "回二楼大厅", x: 38, y: 78, w: 20, h: 12, action() { setScene("chapter2SecondFloorHall"); } }
    ];
  }
};

window.scenes.chapter2PropertyDutyRoom = {
  title: "第二章 · 物业值班室",
  hint: "桌上摊着登记簿，墙上的监控屏全是雪花点。",
  objective() {
    return state.flags.chapter2ThirdFloorFireExitUnlocked
      ? "三楼消防通道门已解锁，返回三楼验证入口状态。"
      : state.flags.chapter2DutyComputerUsed
      ? "一楼主控已解锁，继续用物业姓名与编号登录，解锁三楼消防通道门。"
      : "检查值班室记录，并通过电脑处理消防通道主控。";
  },
  message() {
    return "房间里没人，只有风扇轻微转动，像有人刚离开。";
  },
  hotspots() {
    return [
      {
        id: "ledger",
        label: "值班登记簿",
        x: 24,
        y: 56,
        w: 30,
        h: 16,
        pulse: true,
        action() {
          collectDocument({
            id: "chapter2-duty-room-log",
            title: "物业值班登记摘录",
            source: "二楼物业值班室桌面",
            body: [
              "值班登记簿（摘录）",
              "",
              "发生那件事之后三楼的住户都搬空了，物业也封锁了整个三楼居民区。一切无异常。",
              "",
              "备注：消防通道无异常，待进一步核查。"
            ].join("\n")
          });
          showMessage("发生了那件事？三楼住户都搬空了？物业封锁了三楼？登记簿里没有更多信息，只有这些简短的记录。");
        }
      },
      {
        id: "monitor",
        label: "监控屏",
        x: 10,
        y: 18,
        w: 16,
        h: 18,
        action() {
          showMessage("所有画面都被雪花噪点覆盖，看起来很久没用。");
        }
      },
      {
        id: "phone",
        label: "值班电话",
        x: 30,
        y: 18,
        w: 14,
        h: 18,
        action() {
          const input = promptCode("请输入要拨打的电话号码");
          if (input === null) {
            showMessage("你拿起听筒又放下，没有拨号。");
            return;
          }

          const dialed = input.replace(/\D/g, "");
          if (!dialed) {
            showMessage("电话里只有电流底噪，你没有拨出任何有效号码。");
            return;
          }

          if (dialed === "80044110726") {
            const hasDevil = hasItem("塔罗牌·恶魔");
            const hasLovers = hasItem("塔罗牌·恋人");

            if (!hasDevil && !hasLovers) {
              collectDocument({
                id: "chapter2-divination-call-record-justice",
                title: "拨号记录：正义",
                source: "二楼物业值班室电话",
                body: [
                  "你拨通了 800-4411-0726。",
                  "",
                  "女声说：\"你还没抽到真正的问题。\"",
                  "几秒后，听筒里传来纸牌被翻开的摩擦声。",
                  "她念出牌名：\"正义。\"",
                  "",
                  "\"你对某个人怀有无法偿还的愧疚。\"",
                  "\"你一直在逃避那天的责任。\""
                ].join("\n")
              });

              if (!hasItem("塔罗牌·正义")) {
                acquireItem("塔罗牌·正义");
              }
              addNote("占卜热线为你抽到“正义”，并指出你对某个人怀有强烈愧疚。");
              showMessage("电话那头沉默片刻后说：\"你还没有牌，我替你抽一张。\"\n听筒里传来翻牌声。\"正义。你对某个人很愧疚。\"\n你放下电话时，口袋里多了一张“塔罗牌·正义”。");
              render();
              return;
            }

            const options = [];
            if (hasDevil) options.push("1=问恶魔牌的意思");
            if (hasLovers) options.push("2=问恋人牌的意思");
            options.push("0=挂断");
            const choice = promptCode(`你想问什么？（${options.join("，")}）`);

            if (choice === null || choice.replace(/\s+/g, "") === "0") {
              showMessage("你听着听筒里的呼吸声，最后什么也没问，挂断了电话。");
              return;
            }

            const normalizedChoice = choice.replace(/\s+/g, "");
            if (normalizedChoice === "1" && hasDevil) {
              collectDocument({
                id: "chapter2-divination-devil-meaning",
                title: "占卜回话：恶魔",
                source: "二楼物业值班室电话",
                body: [
                  "女声说：\"恶魔不是诱惑，是你自愿不松手的锁链。\"",
                  "\"你以为自己在找出口，其实一直在喂养它。\""
                ].join("\n")
              });
              addNote("占卜热线解释恶魔牌：杀人恶魔已经偿命。 ");
              showMessage("失真女声低低笑了一下：\"恶魔牌的意思？杀人恶魔已经偿命。\"");
              return;
            }

            if (normalizedChoice === "2" && hasLovers) {
              collectDocument({
                id: "chapter2-divination-lovers-meaning",
                title: "占卜回话：恋人",
                source: "二楼物业值班室电话",
                body: [
                  "女声说：\"恋人不是甜蜜，是选择。\"",
                  "\"你想拥抱的人，和你该承认的真相，未必是同一个。\""
                ].join("\n")
              });
              addNote("占卜热线解释恋人牌：它代表选择，而不是单纯重逢。 ");
              showMessage("她停顿几秒后说：\"恋人牌代表选择，不代表原谅。你要选的是人，还是你愿意承认的真相？\"");
              return;
            }

            showMessage("电话那头只回了一句：\"先看清你手里有什么，再提问。\"");
            return;
          }

          if (dialed === "110" || dialed === "119" || dialed === "120") {
            showMessage("线路里传来短促忙音，像被某种转接系统硬生生切断。你没有拨通。 ");
            return;
          }

          showMessage("你拨出了号码，但听筒里只剩持续的忙音，没有人接听。");
        }
      },
      {
        id: "computer",
        label: "值班电脑",
        x: 72,
        y: 22,
        w: 16,
        h: 18,
        pulse: !state.flags.chapter2ThirdFloorFireExitUnlocked,
        action() {
          if (!state.flags.chapter2DutyComputerUsed) {
            state.flags.chapter2DutyComputerUsed = true;
            state.flags.chapter2FirstFloorFireExitUnlocked = true;
            collectDocument({
              id: "chapter2-fire-exit-ops-note",
              title: "消防通道主控操作备忘",
              source: "二楼物业值班室电脑",
              body: [
                "系统提示：消防通道主控分级管理",
                "",
                "1) 一楼消防通道：可由值班电脑直接远程解锁。",
                "2) 三楼消防通道门：需登录物业账号（姓名 + 物业编号）远程授权。",
                "",
                "登录来源：二楼物业值班室终端",
                ""
              ].join("\n")
            });
            addNote("你在值班室电脑上解锁了一楼消防通道主控。三楼通道门还需物业姓名与编号登录授权。");
            showMessage("你在值班电脑上执行了主控指令：一楼消防通道已远程解锁。系统提示三楼通道门需“物业姓名 + 物业编号”登录授权。");
            render();
            return;
          }

          if (!state.flags.chapter2ThirdFloorFireExitUnlocked) {
            const managerName = promptCode("请输入物业姓名");
            if (managerName === null) {
              showMessage("你停在登录界面，没有输入姓名。");
              return;
            }
            const propertyId = promptCode("请输入物业编号");
            if (propertyId === null) {
              showMessage("编号输入被中断，远程授权没有生效。");
              return;
            }

            const normalizedName = managerName.replace(/\s+/g, "").toLowerCase();
            const normalizedId = propertyId.replace(/[^a-z0-9]/gi, "").toLowerCase();
            const matchedName = normalizedName === "david";
            const matchedId = normalizedId === "wy3a017";

            if (matchedName && matchedId) {
              state.flags.chapter2ThirdFloorFireExitUnlocked = true;
              addNote("你用物业姓名与编号完成登录，远程解锁了三楼消防通道门。");
              showMessage("登录通过，系统回执：三楼消防通道门已远程解锁。\n你可以返回三楼，从消防通道出口进入居民区。");
              render();
              return;
            }

            showMessage("登录失败。系统提示：物业姓名或物业编号不匹配。");
            return;
          }

          showMessage("电脑状态显示：一楼消防通道已解锁，三楼消防通道门已授权开放。");
        }
      },
      {
        id: "back",
        label: "回二楼居民区",
        x: 42,
        y: 78,
        w: 18,
        h: 12,
        action() {
          setScene("chapter2SecondFloorResidential");
        }
      }
    ];
  }
};

window.scenes.chapter2ThirdFloorResidential = {
  title: "第二章 · 三楼居民区",
  hint: "消防出口旁就是你家门口，这里安静得不太正常。",
  objective() {
    return "进入自己家，确认屋内状态。";
  },
  message() {
    return "走廊没有异样，只有你自己的脚步声在回荡。";
  },
  hotspots() {
    return [
      {
        id: "home-door",
        label: "你家",
        x: 42,
        y: 18,
        w: 18,
        h: 48,
        pulse: true,
        action() {
          setScene("chapter2HomeDusty");
        }
      },
      { id: "back", label: "回三楼", x: 38, y: 78, w: 20, h: 12, action() { setScene("chapter2ThirdFloorHall"); } }
    ];
  }
};

window.scenes.chapter2HomeDusty = {
  title: "第二章 · 家",
  hint: "屋里落了明显的灰，像很久没人认真打扫。",
  objective() {
    if (state.flags.chapter2PendingEnding) return "回到客厅后，坐下来面对接下来会发生的事。";
    return "检查屋内异常，再决定下一步。";
  },
  message() {
    return "门刚推开，一股干燥灰尘味扑面而来。家具表面覆着薄灰，餐桌边缘有被手指划过的痕迹。";
  },
  hotspots() {
    return [
      {
        id: "dust-table",
        label: state.flags.chapter2PendingEnding ? "旧沙发" : "积灰的餐桌",
        x: 22,
        y: 56,
        w: 34,
        h: 16,
        action() {
          if (hasItem("手枪")) {
            const shouldSitWithGun = window.confirm("要在客厅坐下吗？");
            if (!shouldSitWithGun) {
              showMessage("你把手从口袋里移开，仍旧站在原地。房间安静得让人发冷。");
              return;
            }
            setScene("chapter2GunEnding");
            return;
          }

          if (state.flags.chapter2PendingEnding) {
            const shouldSit = window.confirm("要在客厅坐下吗？");
            if (!shouldSit) {
              showMessage("你站在沙发前，迟迟没有坐下。空气静得只剩自己的呼吸声。");
              return;
            }
            setScene("chapter2EchoJudgment");
            return;
          }
          showMessage("你在灰尘上轻轻划了一下，下面露出原木色。这里确实很久没人清理了。");
        }
      },
      {
        id: "dust-cabinet",
        label: "客厅柜子",
        x: 70,
        y: 20,
        w: 18,
        h: 36,
        action() {
          collectDocument({
            id: "chapter2-home-cleaning-note",
            title: "未完成的打扫便签",
            source: "客厅柜子表面",
            body: [
              "便签纸边角已经卷起，落满细灰。",
              "",
              "“周末要把全屋彻底清扫一次。”",
              "",
              "字迹到这里就断了，后面没有日期，也没有署名。"
            ].join("\n")
          });
          showMessage("柜子上压着一张未完成的打扫便签，表面同样积了灰。");
        }
      },
      {
        id: "bedroom-door",
        label: "卧室门",
        x: 70,
        y: 18,
        w: 18,
        h: 36,
        pulse: true,
        action() {
          setScene("chapter2Bedroom");
        }
      },
      {
        id: "back-corridor",
        label: "回走廊",
        x: 42,
        y: 78,
        w: 18,
        h: 12,
        action() {
          setScene("chapter2ThirdFloorResidential");
        }
      }
    ];
  }
};

window.scenes.chapter2Bedroom = {
  title: "第二章 · 卧室",
  hint: "卧室里同样积灰，婴儿床边放着一个密码箱。",
  objective() {
    return state.flags.chapter2TarotChoice
      ? "你已经做出选择，带着塔罗牌离开卧室。"
      : "查看婴儿床里的密码箱，输入“最重要的日期”。";
  },
  message() {
    return "婴儿床里放着一个小型密码箱，箱盖上刻着一行字：最重要的日期。";
  },
  hotspots() {
    return [
      {
        id: "crib",
        label: "婴儿床",
        x: 20,
        y: 42,
        w: 30,
        h: 26,
        action() {
          showMessage("床沿有一圈薄灰，像很久没人碰过。密码箱正放在床垫中央。\n箱盖刻字：改变一切的日子。");
        }
      },
      {
        id: "lockbox",
        label: "密码箱",
        x: 56,
        y: 38,
        w: 22,
        h: 24,
        pulse: !state.flags.chapter2TarotChoice,
        action() {
          const hasJustice = hasItem("塔罗牌·正义");
          const hasGun = hasItem("手枪");

          if (state.flags.chapter2TarotChoice && !(hasJustice && !hasGun)) {
            const picked = state.flags.chapter2TarotChoice === "devil" ? "塔罗牌·恶魔" : "塔罗牌·恋人";
            showMessage(`密码箱已经打开，里面只剩你拿走卡牌后的空槽。你之前拿到的是：${picked}。`);
            return;
          }

          const input = promptCode("请输入四位日期");
          if (input === null) {
            showMessage("你停在密码盘前，没有按下任何数字。");
            return;
          }

          const code = input.replace(/\D/g, "");
          if (code === "0325") {
            if (hasJustice && !hasGun) {
              acquireItem("手枪");
              collectDocument({
                id: "chapter2-lockbox-handgun",
                title: "密码箱暗格：手枪",
                source: "卧室婴儿床内的密码箱",
                body: [
                  "你输入 0325 后，箱体内部发出一声轻响。",
                  "一层原本看不见的暗格弹开，里面放着一把手枪。",
                  "",
                  "枪身很冷，像早就有人把它放在这里，等你找到。"
                ].join("\n")
              });
              addNote("你持有“正义”后输入 0325，打开密码箱暗格并拿到一把手枪。");
              showMessage("密码盘归零后，箱体侧边弹出暗格。里面静静躺着一把手枪。你把它拿了起来。");
              render();
              return;
            }
            showMessage("你输入 0325，密码箱没有反应。也许还缺少某个前提。 ");
            return;
          }

          if (code === "0327") {
            state.flags.chapter2TarotChoice = "devil";
            acquireItem("塔罗牌·恶魔");
            collectDocument({
              id: "chapter2-tarot-devil",
              title: "塔罗牌·恶魔",
              source: "卧室婴儿床内的密码箱",
              body: [
                "密码箱弹开，一张纸牌滑出，你定神细看，手上的纸牌是塔罗牌“恶魔”。",
                "",
                "牌面上的锁链缠住两道人影，像某种无法挣脱的重复。"
              ].join("\n")
            });
            addNote("你在卧室密码箱输入 0327，得到塔罗牌“恶魔”。");
            if (!state.flags.chapter2MedicineUsed) {
              state.flags.chapter2PendingEnding = "chapter2BloodCradleEnding";
              showMessage("你指尖刚碰到“恶魔”牌，婴儿床木栏就开始渗出暗红。门外传来脚步声，越来越近。\n你猛地退回客厅，感觉必须先坐下来稳住呼吸。");
              render();
              return;
            }
            state.flags.chapter2PendingEnding = "chapter2MonsterReturnEnding";
            showMessage("药效让你的视线忽明忽暗。门外响起第一章里那种熟悉的撞门声。\n你抓着卡牌退到客厅，手心已经全是冷汗。");
            render();
            return;
          }

          if (code === "1106") {
            state.flags.chapter2TarotChoice = "love";
            acquireItem("塔罗牌·恋人");
            collectDocument({
              id: "chapter2-tarot-lovers",
              title: "塔罗牌·恋人",
              source: "卧室婴儿床内的密码箱",
              body: [
                "密码箱弹开，一张纸牌滑出，你定神细看，手上的纸牌是塔罗牌“恋人”。",
                "",
                "牌面上两人相望，背景像一场被时间固定住的誓言。"
              ].join("\n")
            });
            addNote("你在卧室密码箱输入 1106，得到塔罗牌“恋人”。");
            if (!state.flags.chapter2MedicineUsed) {
              state.flags.chapter2PendingEnding = "chapter2UneasyReunionEnding";
              showMessage("密码盘归零的瞬间，卧室门外传来熟悉脚步声。你攥紧“恋人”那张牌，几乎不敢回头。\n你先退回客厅，准备坐下等她走近。");
              render();
              return;
            }
            state.flags.chapter2PendingEnding = "chapter2WaitWifeEnding";
            showMessage("你吞下药后的眩晕还没散去。卧室边缘忽然暗下去，墙面像被潮水泡烂。\n你抱着“恋人”那张牌退回客厅，准备坐下来等她回家。");
            render();
            return;
          }

          showMessage("密码错误。箱体没有打开，只有指示灯短促地闪了两下。");
        }
      },
      {
        id: "back-home",
        label: "回客厅",
        x: 40,
        y: 78,
        w: 20,
        h: 12,
        action() {
          setScene("chapter2HomeDusty");
        }
      }
    ];
  }
};

window.scenes.chapter2EchoJudgment = {
  title: "第二章 · 客厅回声",
  hint() {
    const pending = state.flags.chapter2PendingEnding;
    if (pending === "chapter2UneasyReunionEnding") return "你坐下后，门厅尽头站着冲你微笑的妻子。";
    if (pending === "chapter2BloodCradleEnding") return "你坐下后，门厅里出现了浑身是血的妻子。";
    if (pending === "chapter2MonsterReturnEnding") return "你坐下后，卧室门口出现了扭曲的怪物。";
    return "你刚坐下，四周黑暗和破败一层层压过来。";
  },
  onEnter() {
    if (hasItem("手枪")) {
      state.flags.chapter2PendingEnding = "";
      setScene("chapter2GunEnding");
      return true;
    }

    if (state.flags.chapter2PendingEnding === "chapter2WaitWifeEnding") {
      state.flags.chapter2PendingEnding = "";
      setScene("chapter2WaitWifeEnding");
      return true;
    }
    return false;
  },
  objective() {
    const pending = state.flags.chapter2PendingEnding;
    if (pending === "chapter2UneasyReunionEnding" || pending === "chapter2BloodCradleEnding") return "点选眼前的她。";
    if (pending === "chapter2MonsterReturnEnding") return "点选眼前的怪物。";
    return "保持冷静。";
  },
  message() {
    const pending = state.flags.chapter2PendingEnding;
    if (pending === "chapter2UneasyReunionEnding") {
      return "你坐下后，门厅尽头出现了妻子的温暖身影。她没有说话，只是朝你伸出手。";
    }
    if (pending === "chapter2BloodCradleEnding") {
      return "你坐下后，卧室方向传来滴落声。她从门厅里走出来，袖口和指缝都沾着血。";
    }
    if (pending === "chapter2MonsterReturnEnding") {
      return "你坐下后，卧室门被撞得发颤。下一秒，第一章里那道扭曲身影推门而入。";
    }
    return "你坐在沙发上，空气像结了壳。";
  },
  hotspots() {
    const pending = state.flags.chapter2PendingEnding;
    return [
      {
        id: "wife-normal",
        label: "妻子",
        x: 72,
        y: 20,
        w: 18,
        h: 36,
        pulse: true,
        visible: pending === "chapter2UneasyReunionEnding",
        action() {
          state.flags.chapter2PendingEnding = "";
          setScene("chapter2UneasyReunionEnding");
        }
      },
      {
        id: "wife-blood",
        label: "带血的妻子",
        x: 72,
        y: 20,
        w: 18,
        h: 36,
        pulse: true,
        visible: pending === "chapter2BloodCradleEnding",
        action() {
          state.flags.chapter2PendingEnding = "";
          setScene("chapter2BloodCradleEnding");
        }
      },
      {
        id: "monster",
        label: "扭曲怪物",
        x: 58,
        y: 28,
        w: 18,
        h: 34,
        pulse: true,
        visible: pending === "chapter2MonsterReturnEnding",
        action() {
          state.flags.chapter2PendingEnding = "";
          setScene("chapter2MonsterReturnEnding");
        }
      },
      {
        id: "back",
        label: "站起身",
        x: 40,
        y: 78,
        w: 20,
        h: 12,
        visible: !pending,
        action() {
          setScene("chapter2HomeDusty");
        }
      }
    ];
  }
};
