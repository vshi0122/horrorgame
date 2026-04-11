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

function isChapter2MedicineRoute() {
  return state.flags.chapter2MedicineUsed;
}

function handleChapter2DivinationCall(source) {
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
    const isHallPhone = source === "二楼居民区墙上电话";

    if (!hasDevil && !hasLovers) {
      collectDocument({
        id: "chapter2-divination-call-record-justice",
        title: "拨号记录：正义",
        source,
        body: [
          "你拨通了 800-4411-0726。",
          "",
          "机械音说：\"你还没抽到真正的问题。\"",
          isHallPhone ? "机械音又补了一句：\"别只想着把她带回家。还有一个从没能被抱回家的。\"" : "",
          "几秒后，听筒里传来纸牌被翻开的摩擦声。",
          "它报出牌名：\"正义。\"",
          "",
          "\"你对某个人怀有无法偿还的愧疚。\"",
          "\"你一直在逃避那天的责任。\""
        ].filter(Boolean).join("\n")
      });

      if (!hasItem("塔罗牌·正义")) {
        acquireItem("塔罗牌·正义");
      }
      addNote("占卜热线为你抽到“正义”，并指出你对某个人怀有强烈愧疚。");
      showMessage(
        isHallPhone
          ? "电话里先是一阵电流底噪，随后机械音报出：\"你还没有牌，我替你抽一张。别只想着把她带回家，还有一个从没能被抱回家的。\"\n听筒里传来翻牌声。\"正义。你对某个人很愧疚。\"\n你放下电话时，口袋里多了一张“塔罗牌·正义”。"
          : "电话里先是一阵电流底噪，随后机械音报出：\"你还没有牌，我替你抽一张。\"\n听筒里传来翻牌声。\"正义。你对某个人很愧疚。\"\n你放下电话时，口袋里多了一张“塔罗牌·正义”。"
      );
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
        source,
        body: [
          "机械音说：\"恶魔不是诱惑，是你自愿不松手的锁链。\"",
          "\"你以为自己在找出口，其实一直在喂养它。\""
        ].join("\n")
      });
      addNote("占卜热线解释恶魔牌：杀人恶魔已经偿命。 ");
      showMessage("电话里的机械音没有起伏：\"恶魔牌的意思？杀人恶魔已经偿命。\"");
      return;
    }

    if (normalizedChoice === "2" && hasLovers) {
      collectDocument({
        id: "chapter2-divination-lovers-meaning",
        title: "占卜回话：恋人",
        source,
        body: [
          "机械音说：\"恋人不是甜蜜，是选择。\"",
          "\"你想拥抱的人，和你该承认的真相，未必是同一个。\""
        ].join("\n")
      });
      addNote("占卜热线解释恋人牌：它代表选择，而不是单纯重逢。 ");
      showMessage("机械音停顿了两秒，才继续报出：\"恋人牌代表选择，不代表原谅。你要选的是人，还是你愿意承认的真相？\"");
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
              title: "裁员通知",
              source: "公寓门口信箱",
              body: [
                "人力资源部通知",
                "",
                "因公司组织调整，您所在岗位已被裁撤。",
                "您与公司的劳动合同将于本周内终止。",
                "收件人：John",
                "发放日期：03/21",
                "",
                "备注：请本人于三个工作日内到场办理离职与交接手续。"
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
                "院方回应称：目前仍在内部复核。",
                "家属质疑复核公正性，已向监管部门提交申诉。",
                "",
                "边栏手写字迹：\"你得做出正确的选择。\""
              ].join("\n")
            });

            addNote("你在信箱里看到“裁员通知”和一篇“医疗事故”报纸剪页。");
            showMessage("你抽出两份文件，呼吸一下子变得很浅。上面分别写着“裁员通知”和“医疗事故”。");
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
          setScene("chapter2CarAtApartment", { transitionAudioSrc: window.carAudioSrc, transitionAudioWaitMs: 0 });
        }
      }
    ];
  }
};

window.scenes.chapter2Hallway = {
  title: "第二章 · 一楼楼道",
  hint: "布局没有变，但右侧海报恢复成了正常的物业通知。",
  objective() {
    if (isChapter2MedicineRoute()) {
      if (!hasItem("旧钥匙串")) return "先检查楼道里散落的购物袋。";
      if (!hasItem("结婚戒指")) return "用旧钥匙串打开消防通道，绕去二楼找你们家的遗物。";
      if (!hasItem("婴儿挂饰金属杆")) return "继续上楼，在通往三楼的夹层里找还能用的东西。";
      if (!state.flags.chapter2MedicineGateUnlocked) return "回三楼居民区入口，用旧钥匙串打开外层链锁。";
      return "你已经拿齐进门前需要的遗物，回三楼继续。";
    }
    return state.flags.chapter2FirstFloorFireExitUnlocked
      ? "消防通道已远程解锁。你可以上楼继续调查，或从消防通道离开。"
      : "先检查右侧物业通知，再决定是否继续上楼。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "楼道里有股散不掉的腥甜味。墙边摔碎的购物袋、番茄酱和暗色污痕，让这里看起来像有人还没来得及把东西带回家。";
    }
    return "楼道安静得异常。昨夜那种仪式感告示不见了，取而代之的是一张普通通知。";
  },
  hotspots() {
    return [
      {
        id: "shopping-bags",
        label: "散落的购物袋",
        x: 30,
        y: 64,
        w: 18,
        h: 12,
        visible: isChapter2MedicineRoute(),
        pulse: isChapter2MedicineRoute() && !hasItem("旧钥匙串"),
        action() {
          if (!hasItem("旧钥匙串")) {
            acquireItem("旧钥匙串");
            collectDocument({
              id: "chapter2-medicine-shopping-bags",
              title: "楼道散落物",
              source: "一楼楼道地面",
              body: [
                "塑料袋已经被踩破，番茄酱瓶碎在里面。",
                "",
                "收据上的最后一行写着：",
                "番茄酱 x1",
                "",
                "袋底压着一串旧钥匙，上面挂着褪色的门牌挂件和一只磨旧的小布偶。"
              ].join("\n")
            });
            addNote("你在摔碎的购物袋里找到了一串旧钥匙。");
            showMessage("你拨开碎玻璃和黏稠番茄酱，在袋底摸到一串旧钥匙。钥匙扣上的门牌挂件和小布偶，你不可能认错。");
            render();
            return;
          }

          showMessage("购物袋里的碎瓶和收据还在。钥匙串已经被你拿走了。");
        }
      },
      {
        id: "fire-exit",
        label: "消防通道入口",
        x: 8,
        y: 22,
        w: 18,
        h: 48,
        action() {
          if (isChapter2MedicineRoute()) {
            if (!hasItem("旧钥匙串")) {
              showMessage("消防门是老式机械锁。你下意识摸向口袋，却发现自己还没有能试的钥匙。");
              return;
            }
            setScene("chapter2FireExitStairwell");
            return;
          }
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
        pulse: !isChapter2MedicineRoute(),
        action() {
          if (isChapter2MedicineRoute()) {
            collectDocument({
              id: "chapter2-medicine-wall-smear",
              title: "被蹭脏的告示",
              source: "一楼楼道右侧墙面",
              body: [
                "原本的物业通知已经被红色污痕糊开。",
                "",
                "只剩一句还能看清：",
                "“住户遗留物请勿擅自带离。”",
                "",
                "字迹下方还粘着已经干掉的番茄酱。"
              ].join("\n")
            });
            showMessage("通知上的字大多糊掉了，只剩“住户遗留物”几个字还能看清。你忽然觉得，这栋楼像在把什么东西还给你。");
            return;
          }
          collectDocument({
            id: "chapter2-normal-property-notice",
            title: "物业临时封锁通知",
            source: "一楼楼道右侧墙面",
            body: [
              "物业临时封锁通知",
              "",
              "因 03/27 夜间突发事件，三楼居民区暂时封锁。",
              "相关住户遗留物由物业统一登记后处理。",
              "未经允许，请勿擅自前往三楼或带离现场物品。",
              "如需核查封锁原因，请前往二楼物业值班室登记。",
              "",
              "落款：城南公寓物业服务中心"
            ].join("\n")
          });
          showMessage("告示看起来终于和这里真正发生过的事对上了：03/27 之后，三楼一直被物业临时封锁。");
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
    if (isChapter2MedicineRoute()) {
      if (!hasItem("结婚戒指")) return "继续往二楼平台走，找你们家的旧物。";
      return "遗物已经在你身上了，回楼梯间继续往上。";
    }
    return state.flags.chapter2ThirdFloorFireExitUnlocked
      ? "三楼出口已通过验证，你可以直接进入三楼居民区。"
      : "沿消防通道上行，尝试从三楼出口进入。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "门在你身后合上时，你闻到的是灰尘、潮气，还有一点像旧木头家具泡过血水后的腥味。";
    }
    return "你推门进入消防通道，门在身后缓缓合上，回声在混凝土墙面来回反弹。";
  },
  hotspots() {
    if (isChapter2MedicineRoute()) {
      return [
        {
          id: "family-note",
          label: "墙角便签",
          x: 8,
          y: 74,
          w: 18,
          h: 14,
          pulse: true,
          action() {
            collectDocument({
              id: "chapter2-medicine-family-note",
              title: "被踩脏的家庭便签",
              source: "一楼消防通道墙角",
              body: [
                "便签被鞋底踩得发皱。",
                "",
                "只剩半句还能辨认：",
                "“记得把她的东西……带回家。”",
                "",
                "最后两个字被血一样的污渍糊开。"
              ].join("\n")
            });
            showMessage("便签被踩得只剩半句。你盯着“带回家”那三个字，胸口像突然被什么压住。");
          }
        },
        {
          id: "to-2f-service",
          label: "继续往二楼平台",
          x: 62,
          y: 18,
          w: 24,
          h: 30,
          pulse: !hasItem("结婚戒指"),
          action() {
            setScene("chapter2SecondFloorResidential");
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
        }
      ];
    }
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
    if (isChapter2MedicineRoute()) {
      if (!hasItem("结婚戒指")) return "先去二楼看看。那边像是堆了很多从三楼搬出来的东西。";
      if (!hasItem("婴儿挂饰金属杆")) return "继续往上，二楼和三楼之间的夹层里还有东西。";
      return "你已经从下面两层拿到了东西，继续上三楼。";
    }
    return "继续前往二楼。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "楼梯间表面看着还是干净的，但墙角和扶手接缝里都嵌着洗不掉的暗红。";
    }
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
    if (isChapter2MedicineRoute()) {
      if (!hasItem("结婚戒指")) return "先回一楼，用旧钥匙串打开消防通道，从里面绕去二楼的临时堆放区。";
      if (!hasItem("婴儿挂饰金属杆")) return "戒指已经找到了，继续往三楼方向走。";
      return "二楼已经没有能带走的东西了，继续上三楼。";
    }
    return "先去三楼确认情况，必要时回二楼居民区找物业值班室。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "二楼比一楼更安静。右侧走廊堆着几只临时搬出来的纸箱，像有人把三楼的生活硬生生拆散了搬到这里。";
    }
    return "这里没有异常标记，只有被日常磨旧的墙面与门牌。";
  },
  hotspots() {
    return [
      { id: "stairs", label: "楼梯口", x: 42, y: 24, w: 18, h: 48, action() { setScene("chapter2UpperStairwell"); } },
      { id: "wall", label: "普通墙面", x: 8, y: 18, w: 18, h: 48, action() { showMessage("白墙上只有岁月留下的细小裂纹。"); } },
      {
        id: "residential",
        label: "居民区入口",
        x: 74,
        y: 18,
        w: 18,
        h: 48,
        action() {
          if (isChapter2MedicineRoute() && !hasItem("结婚戒指")) {
            showMessage("入口被临时堆放的家具和封板堵死了。想过去，只能从一楼消防通道那边绕。");
            return;
          }
          setScene("chapter2SecondFloorResidential");
        }
      },
      { id: "back", label: "回楼梯间", x: 40, y: 78, w: 20, h: 12, action() { setScene("chapter2StairwellNormal"); } }
    ];
  }
};

window.scenes.chapter2UpperStairwell = {
  title: "第二章 · 上行楼梯间",
  hint: "这里连通二楼和三楼。",
  objective() {
    if (isChapter2MedicineRoute()) {
      if (!hasItem("婴儿挂饰金属杆")) return "检查平台上的残骸，再继续往上。";
      return "继续上三楼。";
    }
    return "上三楼。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "越往上，扶手上的污痕越明显。平台角落躺着一个摔碎的婴儿床挂饰，像根本没来得及挂起来。";
    }
    return "越往上走越安静，连回声都像被吸走了一部分。";
  },
  hotspots() {
    return [
      {
        id: "landing-mobile",
        label: "婴儿床挂饰",
        x: 18,
        y: 54,
        w: 22,
        h: 18,
        visible: isChapter2MedicineRoute(),
        pulse: isChapter2MedicineRoute() && !hasItem("婴儿挂饰金属杆"),
        action() {
          if (!hasItem("婴儿挂饰金属杆")) {
            acquireItem("婴儿挂饰金属杆");
            collectDocument({
              id: "chapter2-medicine-mobile-rod",
              title: "摔裂的婴儿床挂饰",
              source: "二楼与三楼之间的平台",
              body: [
                "挂饰已经摔裂，只剩半截塑料星星和露出来的细金属杆。",
                "",
                "这东西原本应该挂在婴儿床上。",
                "可现在你只能一眼看出，它刚好细到能伸进门缝去拨动链锁。"
              ].join("\n")
            });
            addNote("你从摔裂的婴儿床挂饰里抽出一根金属杆。");
            showMessage("你捡起挂饰残骸，把里面那根细金属杆抽了出来。它原本是给没出生的孩子准备的，现在却只能拿来开门。");
            render();
            return;
          }

          showMessage("挂饰已经只剩空壳，那根金属杆被你收起来了。");
        }
      },
      { id: "to-3f", label: "通往三楼", x: 62, y: 18, w: 22, h: 28, action() { setScene("chapter2ThirdFloorHall"); } },
      { id: "back", label: "回二楼大厅", x: 18, y: 72, w: 22, h: 14, action() { setScene("chapter2SecondFloorHall"); } }
    ];
  }
};

window.scenes.chapter2ThirdFloorHall = {
  title: "第二章 · 三楼",
  hint: "三楼居民区门口被加锁，门上贴着新封条。",
  objective() {
    if (isChapter2MedicineRoute()) {
      if (!state.flags.chapter2MedicineGateUnlocked) return "用旧钥匙串打开居民区外层链锁。";
      return "外层锁已经开了，进去回家。";
    }
    return state.flags.chapter2ThirdFloorFireExitUnlocked
      ? "消防通道出口验证已通过，可从侧门进入三楼居民区。"
      : "查看封条内容，然后回二楼值班室用物业信息登录解锁。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return state.flags.chapter2MedicineGateUnlocked
        ? "链条已经松开，门缝里吹出一股冷风，像这个楼层终于同意把你放进去。"
        : "三楼居民区外层门被链条和挂锁封住。封条上沾着已经发黑的手印。";
    }
    return "三楼很安静。居民区入口被链条锁住，封条像刚贴上去不久。";
  },
  hotspots() {
    return [
      { id: "stairs", label: "回楼梯间", x: 42, y: 24, w: 18, h: 48, action() { setScene("chapter2UpperStairwell"); } },
      {
        id: "residential",
        label: isChapter2MedicineRoute()
          ? (state.flags.chapter2MedicineGateUnlocked ? "居民区入口（已打开）" : "居民区入口（链锁）")
          : "居民区入口（封锁）",
        x: 74,
        y: 18,
        w: 18,
        h: 48,
        pulse: true,
        action() {
          if (isChapter2MedicineRoute()) {
            if (!state.flags.chapter2MedicineGateUnlocked) {
              if (!hasItem("旧钥匙串")) {
                showMessage("链锁是老式挂锁。你知道自己少了一串本该一直带在身上的钥匙。");
                return;
              }
              state.flags.chapter2MedicineGateUnlocked = true;
              addNote("你用旧钥匙串打开了三楼居民区外层链锁。");
              showMessage("你试到第三把时，挂锁终于“咔哒”一声弹开。链条滑落的声音，让整层楼都像轻轻震了一下。");
              render();
              return;
            }
            setScene("chapter2ThirdFloorResidential");
            return;
          }
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
          if (isChapter2MedicineRoute()) {
            showMessage("消防通道出口这侧被焊死了。喝药后你只看得清一件事：真正该开的不是这扇门。");
            return;
          }
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
    if (isChapter2MedicineRoute()) {
      return hasItem("结婚戒指")
        ? "你已经拿到了二楼的遗物，回大厅继续上楼。"
        : state.flags.chapter2MedicineSawRing
          ? "那枚婚戒还卡在搬运箱底下。现在你得想办法把它撬出来。"
          : "检查堆在这层的临时搬运箱。";
    }
    return "进入物业值班室，调查三楼封锁原因。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "这层走廊堆着几只临时搬运箱，箱侧都写着“三楼”。有人把那里的一部分生活匆匆搬到了这里。";
    }
    return "二楼走廊里有生活气息，但值班室门缝里没有任何声音。";
  },
  hotspots() {
    return [
      {
        id: "duty-room",
        label: isChapter2MedicineRoute() ? "临时搬运箱" : "物业值班室",
        x: 42,
        y: 18,
        w: 18,
        h: 48,
        pulse: true,
        action() {
          if (isChapter2MedicineRoute()) {
            if (!state.flags.chapter2MedicineSawRing) {
              state.flags.chapter2MedicineSawRing = true;
              collectDocument({
                id: "chapter2-medicine-wedding-ring-trapped",
                title: "搬运箱缝里的婚戒",
                source: "二楼居民区临时搬运箱",
                body: [
                  "纸箱底部压着散掉的相框、床单和碎玻璃。",
                  "",
                  "你在最底下看见了一枚婚戒，",
                  "却发现它刚好卡进翻倒家具和木板缝里，手指根本够不到。",
                  "",
                  "戒指内侧刻着你们的名字缩写。"
                ].join("\n")
              });
              addNote("你在二楼搬运箱底部看见了自己的婚戒，但暂时拿不出来。");
              showMessage("你掀开箱盖，在最底下看见了一枚婚戒。它卡在木板和翻倒家具之间，明明就在眼前，却偏偏够不到。");
              render();
              return;
            }
            if (!hasItem("结婚戒指")) {
              if (!hasItem("婴儿挂饰金属杆")) {
                showMessage("婚戒还卡在缝里。你需要一件细长、够硬，能伸进去把它拨出来的东西。");
                return;
              }
              acquireItem("结婚戒指");
              collectDocument({
                id: "chapter2-medicine-wedding-ring",
                title: "从缝里撬出的婚戒",
                source: "二楼居民区临时搬运箱",
                body: [
                  "你用那根婴儿挂饰里的金属杆伸进缝隙，",
                  "把婚戒一点点拨了出来。",
                  "",
                  "它落进你掌心时很凉，",
                  "像这个家里所有“还来得及”的念头，最后都只剩下这一枚小小的圈。"
                ].join("\n")
              });
              addNote("你回到二楼，用金属杆把卡住的婚戒撬了出来。");
              showMessage("你把金属杆探进缝里，小心拨了几下，婚戒终于滑了出来。它落进掌心时凉得像刚从水里捞出来。");
              render();
              return;
            }
            showMessage("搬运箱底下只剩空出来的缝隙。婚戒已经被你带走了。");
            return;
          }
          setScene("chapter2PropertyDutyRoom");
        }
      },
      {
        id: "corridor-note",
        label: isChapter2MedicineRoute() ? "尽头镜子" : "走廊公告栏",
        x: 8,
        y: 22,
        w: 18,
        h: 44,
        action() {
          if (isChapter2MedicineRoute()) {
            showMessage("镜子里你身后像站着两个人。可等你回头，走廊还是只有你自己。");
            return;
          }
          showMessage("公告栏上全是日常通知，唯独没有三楼封锁的详细说明。");
        }
      },
      {
        id: "hall-phone",
        label: "墙上电话",
        x: 64,
        y: 56,
        w: 14,
        h: 16,
        visible: isChapter2MedicineRoute(),
        action() {
          handleChapter2DivinationCall("二楼居民区墙上电话");
        }
      },
      { id: "back", label: "回二楼大厅", x: 38, y: 78, w: 20, h: 12, action() { setScene("chapter2SecondFloorHall"); } }
    ];
  }
};

window.scenes.chapter2PropertyDutyRoom = {
  title: "第二章 · 物业值班室",
  hint: "桌上摊着登记簿，墙上的监控屏全是雪花点。",
  objective() {
    if (isChapter2MedicineRoute()) {
      return "这里在喝药之后只剩下噪点和死机器，没有你要的东西。";
    }
    return state.flags.chapter2ThirdFloorFireExitUnlocked
      ? "三楼消防通道门已解锁，返回三楼验证入口状态。"
      : state.flags.chapter2DutyComputerUsed
      ? "一楼主控已解锁，继续用物业姓名与编号登录，解锁三楼消防通道门。"
      : "检查值班室记录，并通过电脑处理消防通道主控。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "监控屏和电脑都还亮着，但你一眼就知道这里什么也给不了你。真正要开的锁都不在这间屋里。";
    }
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
          if (isChapter2MedicineRoute()) {
            showMessage("登记簿上的字像被水泡过，全糊成一团。这里现在只像个空壳。");
            return;
          }
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
          if (isChapter2MedicineRoute()) {
            showMessage("屏幕上的雪花点一格格跳动，你却只觉得它们在试图把你从这条路上引开。");
            return;
          }
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
          handleChapter2DivinationCall("二楼物业值班室电话");
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
          if (isChapter2MedicineRoute()) {
            showMessage("电脑亮着，但你没有坐下。你知道这次需要的不是物业权限，而是那些本来就属于你们家的东西。");
            return;
          }
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
    if (isChapter2MedicineRoute()) {
      return state.flags.chapter2MedicineHomeUnlocked
        ? hasItem("结婚戒指")
          ? "家门已经开了，进去。"
          : "门已经开了。先进去看看屋里缺了什么，再决定要不要回头。"
        : "到门口，用能伸进门缝的东西拨开内侧链锁。";
    }
    return "进入自己家，确认屋内状态。";
  },
  message() {
    if (isChapter2MedicineRoute()) {
      return "居民区里没有别的住户声。你家门口拖着一条暗色污痕，像有人曾经想把什么东西带进去，又中途停下。";
    }
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
          if (isChapter2MedicineRoute()) {
            if (!state.flags.chapter2MedicineHomeUnlocked) {
              if (!hasItem("婴儿挂饰金属杆")) {
                showMessage("门推开一道缝就被里面的链锁卡死。你需要一件够细、够硬，能从缝里伸进去的东西。");
                return;
              }
              state.flags.chapter2MedicineHomeUnlocked = true;
              addNote("你用婴儿挂饰里的金属杆拨开了家门内侧的链锁。");
              showMessage("你把金属杆从门缝伸进去，摸索着拨了几次。链锁弹开的瞬间，你差点站不稳。");
              render();
              return;
            }
            setScene("chapter2HomeDusty");
            return;
          }
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
    if (isChapter2MedicineRoute() && !state.flags.chapter2MemoryBoxOpened) {
      if (!hasItem("音乐盒发条钥匙")) {
        if (!state.flags.chapter2MedicineSawRing) return "先在客厅里找找，看看这个家到底少了什么。";
        if (!hasItem("结婚戒指")) return "你已经知道缺的是什么了，回二楼把那枚婚戒带回来。";
        return "在客厅里找到该归位的东西，再回卧室。";
      }
      return "你已经拿到发条钥匙，去卧室打开那个一直没敢碰的盒子。";
    }
    if (state.flags.chapter2PendingEnding) return "回到客厅后，坐下来面对接下来会发生的事。";
    return "检查屋内异常，再决定下一步。";
  },
  message() {
    if (isChapter2MedicineRoute() && !state.flags.chapter2MemoryBoxOpened) {
      if (!state.flags.chapter2MedicineSawRing) {
        return "门内的灰比你想的更厚。餐桌上那顿“等你回家”的晚饭早就干掉了，血和番茄酱混在一起，几乎分不出区别。";
      }
      if (!hasItem("结婚戒指")) {
        return "你已经看见梳妆台上空着的戒指位了。现在整个客厅都像在提醒你：你还少带了一样东西。";
      }
      return "门内的灰比你想的更厚。餐桌上那顿“等你回家”的晚饭早就干掉了，血和番茄酱混在一起，几乎分不出区别。";
    }
    return "门刚推开，一股干燥灰尘味扑面而来。家具表面覆着薄灰，餐桌边缘有被手指划过的痕迹。";
  },
  hotspots() {
    return [
      {
        id: "dust-table",
        label: state.flags.chapter2PendingEnding ? "黑白符号" : "积灰的餐桌",
        x: 22,
        y: 56,
        w: 34,
        h: 16,
        pulse: !!state.flags.chapter2PendingEnding,
        action() {
          if (isChapter2MedicineRoute() && !state.flags.chapter2MemoryBoxOpened) {
            showMessage("饭菜早已发黑发硬。盘边的暗红污渍干成了壳，像有人曾执拗地想把这顿饭留到你回来。");
            return;
          }
          if (hasItem("手枪")) {
            const shouldSitWithGun = window.confirm("要让黑白符号显现吗？");
            if (!shouldSitWithGun) {
              showMessage("你盯着沙发前那片空白墙面，迟迟没有再往前一步。空气静得让人发冷。");
              return;
            }
            setScene("chapter2GunEnding");
            return;
          }

          if (state.flags.chapter2PendingEnding) {
            const shouldSit = window.confirm("要让黑白符号显现吗？");
            if (!shouldSit) {
              showMessage("你站在客厅中央，迟迟没有把视线挪向那面墙。空气静得只剩自己的呼吸声。");
              return;
            }
            setScene("chapter2EchoJudgment");
            return;
          }
          showMessage("你在灰尘上轻轻划了一下，下面露出原木色。这里确实很久没人清理了。");
        }
      },
      {
        id: "surgery-slip",
        label: "手术回执单",
        x: 12,
        y: 24,
        w: 16,
        h: 22,
        pulse: true,
        action() {
          collectDocument({
            id: "chapter2-surgery-appointment-slip",
            title: "手术预约回执单",
            source: "家中客厅地面",
            body: [
              "医院手术预约回执单",
              "",
              "患者姓名：M",
              "预约日期：03/27",
              "科室：产科手术室",
              "到场时间：21:30",
              "",
              "备注：请家属陪同签字确认。"
            ].join("\n")
          });
          addNote("你在家里找到一张 03/27 的手术预约回执单。");
          showMessage("茶几下压着一张被鞋跟踩皱的回执单。你捡起来时，最先看到的就是日期：03/27。");
          render();
        }
      },
      {
        id: "dust-cabinet",
        label: isChapter2MedicineRoute() ? "梳妆台" : "客厅柜子",
        x: 66,
        y: 18,
        w: 14,
        h: 30,
        action() {
          if (isChapter2MedicineRoute()) {
            if (!hasItem("结婚戒指")) {
              showMessage("梳妆台上有一只空着的首饰托盘。你立刻知道少的是哪一枚，却还没把它带回来。");
              return;
            }
            if (!hasItem("音乐盒发条钥匙")) {
              removeItem("结婚戒指");
              acquireItem("音乐盒发条钥匙");
              collectDocument({
                id: "chapter2-medicine-vanity-key",
                title: "梳妆台暗格里的发条钥匙",
                source: "家中客厅梳妆台",
                body: [
                  "你把婚戒放回空着的位置后，首饰托盘轻轻陷下去一格。",
                  "",
                  "暗格里躺着一枚很小的发条钥匙，旁边压着一张便签：",
                  "“1106 J&M”",
                  "",
                  "那是结婚纪念日她送你的礼物，也是在那天，她告诉了你她怀孕的消息。"
                ].join("\n")
              });
              addNote("你把婚戒放回梳妆台后，取出了一枚音乐盒发条钥匙。");
              showMessage("婚戒刚落回托盘，底下的暗格就弹开了。里面只有一枚小小的发条钥匙，和一张提到“她睡不着”的便签。");
              render();
              return;
            }
            showMessage("婚戒已经不在你身上。梳妆台暗格也空了，只剩那枚戒圈曾放过的位置。");
            return;
          }
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
        x: 82,
        y: 16,
        w: 12,
        h: 40,
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
    if (isChapter2MedicineRoute() && !state.flags.chapter2MemoryBoxOpened) {
      return hasItem("音乐盒发条钥匙")
        ? "用发条钥匙打开纪念盒。"
        : "先回客厅，把该归位的戒指放回去。";
    }
    return state.flags.chapter2TarotChoice
      ? "你已经做出选择，带着塔罗牌离开卧室。"
      : "查看婴儿床里的密码箱，输入“最重要的日期”。";
  },
  message() {
    if (isChapter2MedicineRoute() && !state.flags.chapter2MemoryBoxOpened) {
      return "婴儿床边多了一只一直被你忽略的音乐盒纪念盒。它没有密码，只有一个很小的发条锁眼。";
    }
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
        id: "memory-box",
        label: "纪念盒",
        x: 18,
        y: 18,
        w: 18,
        h: 24,
        visible: isChapter2MedicineRoute() && !state.flags.chapter2MemoryBoxOpened,
        pulse: isChapter2MedicineRoute(),
        action() {
          if (!hasItem("音乐盒发条钥匙")) {
            showMessage("盒盖上的锁眼很小。你知道钥匙不在这里，而是在这屋子外面那部分“还想维持正常”的地方。");
            return;
          }
          removeItem("音乐盒发条钥匙");
          state.flags.chapter2MemoryBoxOpened = true;
          collectDocument({
            id: "chapter2-medicine-memory-box",
            title: "纪念盒里的遗物",
            source: "卧室婴儿床边的纪念盒",
            body: [
              "盒子里放着三样东西：",
              "1) 一张没来得及贴进相册的产检超声照片",
              "2) 一张被折得发软的手术告知单复印件",
              "3) 一只空白的婴儿脚环",
              "",
              "告知单边角的医生签字已经糊开，只剩一行打印字还能看清：",
              "“03/27 22:06，术中突发并发症。”",
              "",
              "你不用再找别的解释了。",
              "孩子没能出生，妻子也死在那场医疗事故里。"
            ].join("\n")
          });
          addNote("纪念盒里的东西把那晚的现实彻底钉死了：孩子没出生，妻子死于医疗事故。");
          showMessage("发条钥匙拧开的不是音乐，而是一盒被你一直回避的遗物。超声照片、空白脚环、手术单复印件，一样都没有给你留余地。");
          render();
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
          if (isChapter2MedicineRoute() && !state.flags.chapter2MemoryBoxOpened) {
            showMessage("你盯着密码箱看了很久，却知道自己还差最后一把真正的钥匙。先把纪念盒打开。");
            return;
          }
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
    if (pending === "chapter2UneasyReunionEnding") return "黑白符号浮现在墙上后，门厅尽头站着冲你微笑的妻子。";
    if (pending === "chapter2BloodCradleEnding") return "黑白符号浮现在墙上后，门厅里出现了浑身是血的妻子。";
    if (pending === "chapter2MonsterReturnEnding") return "黑白符号浮现在墙上后，卧室门口出现了扭曲的怪物。";
    return "黑白符号浮现的瞬间，四周黑暗和破败一层层压过来。";
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
      return "黑白符号慢慢浮现在墙面上。门厅尽头出现了妻子的温暖身影。她没有说话，只是朝你伸出手。";
    }
    if (pending === "chapter2BloodCradleEnding") {
      return "黑白符号慢慢浮现在墙面上。卧室方向传来滴落声。她从门厅里走出来，袖口和指缝都沾着血。";
    }
    if (pending === "chapter2MonsterReturnEnding") {
      return "黑白符号慢慢浮现在墙面上。卧室门被撞得发颤。下一秒，第一章里那道扭曲身影推门而入。";
    }
    return "黑白符号浮现在墙面上，空气像结了壳。";
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
