// Chapter 2 entry scenes
window.scenes = window.scenes || {};

window.scenes.chapter2Entry = {
  title: "第二章 · 病房醒来",
  hint: "你在心理医生的病房里醒来，消毒水味和灯光都过于真实。",
  objective() {
    if (!state.flags.chapter2WokeInWard) return "先确认自己身处何地。";
    if (!state.flags.chapter2DoctorTalked) return "和心理医生对话。";
    if (!state.flags.chapter2GotMedicine) return "收下医生递来的药瓶。";
    if (!state.flags.chapter2InquiryFinished) return "通过问询对话，确认你愿意面对的内容。";
    return "离开病房，进入第二章后续。";
  },
  message() {
    if (!state.flags.chapter2WokeInWard) return "你睁开眼时，床边有个熟悉的身影在翻病历。";
    if (!state.flags.chapter2DoctorTalked) return "医生放下病历，示意你先稳定呼吸。";
    if (!state.flags.chapter2GotMedicine) return "医生从口袋里取出一个白色药瓶，放在你够得到的位置。";
    if (!state.flags.chapter2InquiryFinished) return "你还可以向医生提问。问完再离开。";
    return "你把药瓶攥在手心，门外走廊尽头只剩下冷白色的光。";
  },
  hotspots() {
    return [
      {
        id: "wake",
        label: "醒来",
        x: 18,
        y: 34,
        w: 20,
        h: 28,
        visible: !state.flags.chapter2WokeInWard,
        pulse: true,
        action() {
          state.flags.chapter2WokeInWard = true;
          showMessage("你猛地坐起。医生抬头看你，说：\"这次你终于不是在车里醒来了。\"");
          render();
        }
      },
      {
        id: "doctor",
        label: "心理医生",
        x: 44,
        y: 24,
        w: 20,
        h: 40,
        visible: state.flags.chapter2WokeInWard,
        action() {
          state.flags.chapter2DoctorTalked = true;
          addNote("心理医生说：你需要直面恐惧，才能回到现实。");
          showMessage("医生低声说：\"别再把那天改写成别的故事。你要直面它，才能回到现实。\"");
          render();
        }
      },
      {
        id: "medicine",
        label: "药瓶",
        x: 24,
        y: 60,
        w: 16,
        h: 14,
        visible: state.flags.chapter2DoctorTalked && !state.flags.chapter2GotMedicine,
        pulse: true,
        action() {
          state.flags.chapter2GotMedicine = true;
          acquireItem("药瓶");
          addNote("医生叮嘱：之后记得按时吃药，别再跳过。");
          collectDocument({
            id: "chapter2-ptsd-casefile",
            title: "个人病例摘录",
            source: "心理医生病房",
            body: [
              "诊断：PTSD（创伤后应激障碍）",
              "",
              "主要症状：梦境循环、现实回避、时间感错位。",
              "诱因事件：████████████████",
              "",
              "补充建议：短期按医嘱服药，避免自行停药。",
              "每日睡前一次。",
              "出现梦境循环时，禁止自行停药。",
              "",
              "备注：下次复诊时必须复盘 03/27 事件。"
            ].join("\n")
          });
          showMessage("你拿起药瓶，病例第一页只写着 PTSD，病因一栏被整行涂黑。医生补了一句：\"之后记得吃，不要再拖。\"");
          render();
        }
      },
      {
        id: "leave-ward",
        label: "离开病房",
        x: 38,
        y: 72,
        w: 24,
        h: 14,
        visible: state.flags.chapter2InquiryFinished,
        action() {
          setScene("chapter2ParkingLot");
        }
      }
    ];
  },
  overlay() {
    return buildChapter2InquiryOverlay();
  }
};

window.scenes.chapter2WardHallway = {
  title: "第二章 · 住院部走廊",
  hint: "下一段流程将在这里展开。",
  objective() {
    return "继续向外走，回到楼下。";
  },
  message() {
    return "你站在走廊里，手里还攥着药瓶。灯光很亮，但每一步都像踩在旧梦上。";
  },
  hotspots() {
    return [
      {
        id: "to-parking",
        label: "下楼去停车区",
        x: 38,
        y: 72,
        w: 24,
        h: 14,
        action() {
          setScene("chapter2ParkingLot");
        }
      }
    ];
  }
};

window.scenes.chapter2ParkingLot = {
  title: "第二章 · 楼下停车区",
  hint: "你的车就停在住院部楼下，雨痕还没干。",
  objective() {
    return "你可以选择开车回家，或先停在原地整理思绪。";
  },
  message() {
    return "车灯在潮湿地面上反出两道冷光。钥匙就在你掌心。";
  },
  hotspots() {
    return [
      {
        id: "drive-home",
        label: "开车回家",
        x: 24,
        y: 58,
        w: 38,
        h: 18,
        pulse: true,
        action() {
          setScene("chapter2DriveHome");
        }
      },
      {
        id: "stay",
        label: "先留在这里",
        x: 66,
        y: 58,
        w: 22,
        h: 18,
        action() {
          showMessage("你靠在车门边深呼吸，脑子里还回响着医生的话。\"别再绕开那一天。\"");
        }
      }
    ];
  }
};

window.scenes.chapter2DriveHome = {
  title: "第二章 · 回家路上",
  hint: "雨夜路灯一盏接一盏向后退去。",
  objective() {
    return "继续第二章流程（下一场景待接入）。";
  },
  message() {
    return "你发动引擎。仪表盘亮起的一瞬间，你看见副驾位像有人坐过。";
  },
  hotspots() {
    return [
      {
        id: "continue",
        label: "继续前往公寓",
        x: 34,
        y: 72,
        w: 32,
        h: 14,
        action() {
          setScene("chapter2CarAtApartment");
        }
      }
    ];
  }
};
