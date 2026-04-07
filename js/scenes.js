const sceneArt = {
  carInterior: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:54%;background:linear-gradient(180deg,#161f29 0%,#0e141b 100%);"></div>
      <div class="art-layer" style="left:0;right:0;bottom:0;height:46%;background:linear-gradient(180deg,#0d0f13 0%,#07080b 100%);"></div>
      <div class="art-layer" style="left:10%;bottom:14%;width:56%;height:26%;background:linear-gradient(180deg,#2d333a,#15181d);border-radius:30px;"></div>
      <div class="art-layer" style="right:9%;top:16%;width:18%;height:52%;background:linear-gradient(180deg,#2d2926,#12100f);border-radius:10px;"></div>
      <div class="art-layer" style="right:11%;top:20%;width:14%;height:14%;background:radial-gradient(circle,rgba(255,223,168,0.6),rgba(255,223,168,0.05));border-radius:999px;"></div>
    </div>
  `,
  entrance: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:52%;background:linear-gradient(180deg,#171c24 0%,#0f1319 100%);"></div>
      <div class="art-layer" style="left:0;right:0;bottom:0;height:48%;background:linear-gradient(180deg,#121212 0%,#08090b 100%);"></div>
      <div class="art-layer" style="left:8%;top:28%;width:18%;height:28%;background:linear-gradient(180deg,#30363e,#171a1f);"></div>
      <div class="art-layer" style="left:36%;top:16%;width:28%;height:56%;background:linear-gradient(180deg,#2b2522,#100d0c);border-radius:12px;"></div>
      <div class="art-layer" style="left:67%;top:18%;width:18%;height:48%;background:linear-gradient(180deg,#2f353d,#12161b);border-radius:12px;"></div>
    </div>
  `,
  hallway: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#161920 0%,#090b0f 100%);"></div>
      <div class="art-layer" style="left:8%;top:18%;width:18%;height:48%;background:linear-gradient(180deg,#2d333a,#111418);border-radius:10px;"></div>
      <div class="art-layer" style="left:12%;top:28%;width:10%;height:9%;background:radial-gradient(circle,rgba(101,255,160,0.5),rgba(101,255,160,0.08));border-radius:10px;"></div>
      <div class="art-layer" style="left:43%;top:28%;width:14%;height:42%;background:linear-gradient(180deg,#222830,#0d1014);clip-path:polygon(0 100%,100% 100%,74% 0,26% 0);"></div>
      <div class="art-layer" style="right:8%;top:14%;width:22%;height:56%;background:linear-gradient(180deg,#25292f,#101216);border-radius:10px;"></div>
    </div>
  `,
  stairwell: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#171b22 0%,#090b0f 100%);"></div>
      <div class="art-layer" style="left:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#232930,#0f1216);clip-path:polygon(0 100%,100% 100%,100% 18%,76% 18%,76% 0,52% 0,52% 18%,28% 18%,28% 36%,0 36%);"></div>
      <div class="art-layer" style="right:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#232930,#0f1216);clip-path:polygon(0 100%,100% 100%,100% 36%,72% 36%,72% 18%,48% 18%,48% 0,24% 0,24% 18%,0 18%);"></div>
    </div>
  `,
  secondFloorHall: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#12151b 0%,#050608 100%);"></div>
      <div class="art-layer" style="left:8%;top:18%;width:18%;height:48%;background:linear-gradient(180deg,#1f252b,#0b0e12);border-radius:10px;"></div>
      <div class="art-layer" style="left:43%;top:28%;width:14%;height:42%;background:linear-gradient(180deg,#1c2229,#090c10);clip-path:polygon(0 100%,100% 100%,74% 0,26% 0);"></div>
      <div class="art-layer" style="right:8%;top:14%;width:22%;height:56%;background:linear-gradient(180deg,#1a1d22,#08090b);border-radius:10px;"></div>
    </div>
  `,
  upperStairwell: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#120f12 0%,#050507 100%);"></div>
      <div class="art-layer" style="left:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#2a1e22,#0d0b0d);clip-path:polygon(0 100%,100% 100%,100% 18%,76% 18%,76% 0,52% 0,52% 18%,28% 18%,28% 36%,0 36%);"></div>
      <div class="art-layer" style="right:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#2a1e22,#0d0b0d);clip-path:polygon(0 100%,100% 100%,100% 36%,72% 36%,72% 18%,48% 18%,48% 0,24% 0,24% 18%,0 18%);"></div>
      <div class="art-layer" style="left:22%;top:24%;width:6%;height:26%;background:linear-gradient(180deg,rgba(124,18,18,0.8),rgba(124,18,18,0.1));transform:rotate(-16deg);border-radius:999px;"></div>
      <div class="art-layer" style="right:24%;top:20%;width:10%;height:20%;border:3px solid rgba(124,18,18,0.55);transform:rotate(18deg);border-radius:50%;"></div>
    </div>
  `,
  upperStairwellBlocked: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#100d10 0%,#040405 100%);"></div>
      <div class="art-layer" style="left:16%;top:16%;width:68%;height:62%;background:linear-gradient(180deg,#241a1c,#0b0809);border-radius:12px;"></div>
      <div class="art-layer" style="left:24%;top:26%;width:52%;height:7%;background:rgba(132,20,20,0.58);transform:rotate(-8deg);border-radius:999px;"></div>
      <div class="art-layer" style="left:22%;top:38%;width:56%;height:6%;background:rgba(132,20,20,0.52);transform:rotate(6deg);border-radius:999px;"></div>
      <div class="art-layer" style="left:28%;top:52%;width:44%;height:6%;background:rgba(132,20,20,0.44);transform:rotate(-5deg);border-radius:999px;"></div>
      <div class="art-layer" style="left:8%;bottom:8%;width:18%;height:16%;background:linear-gradient(180deg,#d8d0c4,#74685f);transform:rotate(-8deg);border-radius:8px;"></div>
    </div>
  `,
  thirdFloorHall: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#0b0b0d 0%,#020203 100%);"></div>
      <div class="art-layer" style="left:8%;top:18%;width:18%;height:48%;background:linear-gradient(180deg,#161518,#060607);border-radius:10px;"></div>
      <div class="art-layer" style="left:11%;top:63%;width:14%;height:8%;background:linear-gradient(180deg,rgba(226,218,191,0.18),rgba(90,78,64,0.1));transform:rotate(-12deg);border-radius:6px;"></div>
      <div class="art-layer" style="left:43%;top:28%;width:14%;height:42%;background:linear-gradient(180deg,#18181c,#060608);clip-path:polygon(0 100%,100% 100%,74% 0,26% 0);"></div>
      <div class="art-layer" style="right:8%;top:14%;width:22%;height:56%;background:linear-gradient(180deg,#0f1013,#030304);border-radius:10px;"></div>
      <div class="art-layer" style="left:46%;top:10%;width:10%;height:10%;background:radial-gradient(circle,rgba(191,25,25,0.85),rgba(191,25,25,0.08));border-radius:999px;"></div>
    </div>
  `,
  thirdFloorResidential: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#0c0c0e 0%,#020203 100%);"></div>
      <div class="art-layer" style="left:10%;top:14%;width:18%;height:64%;background:linear-gradient(180deg,#17181b,#060607);border-radius:8px;"></div>
      <div class="art-layer" style="right:10%;top:14%;width:18%;height:64%;background:linear-gradient(180deg,#17181b,#060607);border-radius:8px;"></div>
      <div class="art-layer" style="left:43%;top:18%;width:14%;height:46%;background:linear-gradient(180deg,#221b1b,#080707);border-radius:8px;"></div>
      <div class="art-layer" style="left:39%;top:58%;width:22%;height:10%;background:linear-gradient(180deg,rgba(83,14,14,0.78),rgba(83,14,14,0.18));border-radius:40% 55% 45% 50%;transform:rotate(-8deg);"></div>
      <div class="art-layer" style="left:58%;top:42%;width:10%;height:22%;background:linear-gradient(180deg,rgba(28,28,31,0.96),rgba(6,6,8,0.98));border-radius:44% 44% 30% 30%;transform:rotate(10deg);"></div>
    </div>
  `,
  escapeStairwell: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#060709 0%,#010102 100%);"></div>
      <div class="art-layer" style="left:14%;bottom:0;width:30%;height:74%;background:linear-gradient(180deg,#161c22,#050608);clip-path:polygon(0 100%,100% 100%,100% 18%,76% 18%,76% 0,52% 0,52% 18%,28% 18%,28% 36%,0 36%);"></div>
      <div class="art-layer" style="left:70%;top:10%;width:8%;height:14%;background:radial-gradient(circle,rgba(193,28,28,0.55),rgba(193,28,28,0.02));border-radius:999px;"></div>
    </div>
  `,
  hallwayNormal: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#2d2f34 0%,#16171a 100%);"></div>
      <div class="art-layer" style="left:8%;top:18%;width:18%;height:48%;background:linear-gradient(180deg,#4a4e55,#1f2329);border-radius:10px;"></div>
      <div class="art-layer" style="left:43%;top:28%;width:14%;height:42%;background:linear-gradient(180deg,#434850,#232830);clip-path:polygon(0 100%,100% 100%,74% 0,26% 0);"></div>
      <div class="art-layer" style="right:8%;top:14%;width:22%;height:56%;background:linear-gradient(180deg,#555960,#262b31);border-radius:10px;"></div>
    </div>
  `,
  stairwellNormal: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#373a40 0%,#17191d 100%);"></div>
      <div class="art-layer" style="left:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#5a6068,#242930);clip-path:polygon(0 100%,100% 100%,100% 18%,76% 18%,76% 0,52% 0,52% 18%,28% 18%,28% 36%,0 36%);"></div>
      <div class="art-layer" style="right:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#5a6068,#242930);clip-path:polygon(0 100%,100% 100%,100% 36%,72% 36%,72% 18%,48% 18%,48% 0,24% 0,24% 18%,0 18%);"></div>
    </div>
  `,
  secondFloorHallNormal: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#3d4148 0%,#1b1d21 100%);"></div>
      <div class="art-layer" style="left:8%;top:18%;width:18%;height:48%;background:linear-gradient(180deg,#5a5f67,#252930);border-radius:10px;"></div>
      <div class="art-layer" style="left:43%;top:28%;width:14%;height:42%;background:linear-gradient(180deg,#4a4f57,#232730);clip-path:polygon(0 100%,100% 100%,74% 0,26% 0);"></div>
      <div class="art-layer" style="right:8%;top:14%;width:22%;height:56%;background:linear-gradient(180deg,#60656d,#292c33);border-radius:10px;"></div>
    </div>
  `,
  upperStairwellNormal: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#404348 0%,#1b1d21 100%);"></div>
      <div class="art-layer" style="left:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#676c74,#2b3037);clip-path:polygon(0 100%,100% 100%,100% 18%,76% 18%,76% 0,52% 0,52% 18%,28% 18%,28% 36%,0 36%);"></div>
      <div class="art-layer" style="right:18%;bottom:0;width:26%;height:72%;background:linear-gradient(180deg,#676c74,#2b3037);clip-path:polygon(0 100%,100% 100%,100% 36%,72% 36%,72% 18%,48% 18%,48% 0,24% 0,24% 18%,0 18%);"></div>
    </div>
  `,
  thirdFloorHallNormal: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#4a443f 0%,#211d19 100%);"></div>
      <div class="art-layer" style="left:8%;top:18%;width:18%;height:48%;background:linear-gradient(180deg,#615952,#2d2723);border-radius:10px;"></div>
      <div class="art-layer" style="left:43%;top:28%;width:14%;height:42%;background:linear-gradient(180deg,#5c534c,#2a2521);clip-path:polygon(0 100%,100% 100%,74% 0,26% 0);"></div>
      <div class="art-layer" style="right:8%;top:14%;width:22%;height:56%;background:linear-gradient(180deg,#70665e,#302a25);border-radius:10px;"></div>
    </div>
  `,
  thirdFloorResidentialNormal: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#2e2925 0%,#120f0d 100%);"></div>
      <div class="art-layer" style="left:10%;top:14%;width:18%;height:64%;background:linear-gradient(180deg,#37312d,#15110f);border-radius:8px;"></div>
      <div class="art-layer" style="right:10%;top:14%;width:18%;height:64%;background:linear-gradient(180deg,#37312d,#15110f);border-radius:8px;"></div>
      <div class="art-layer" style="left:43%;top:18%;width:14%;height:46%;background:linear-gradient(180deg,#6a5647,#2a211b);border-radius:8px;"></div>
      <div class="art-layer" style="left:47%;top:10%;width:6%;height:8%;background:radial-gradient(circle,rgba(255,212,148,0.58),rgba(255,212,148,0.06));border-radius:999px;"></div>
    </div>
  `,
  dinnerTableScene: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:58%;background:linear-gradient(180deg,#5e493b 0%,#2a201a 100%);"></div>
      <div class="art-layer" style="left:0;right:0;bottom:0;height:42%;background:linear-gradient(180deg,#7f5d49 0%,#33261d 100%);"></div>
      <div class="art-layer" style="left:16%;bottom:16%;width:56%;height:18%;background:linear-gradient(180deg,#8f6f58,#4a372b);border-radius:14px;"></div>
      <div class="art-layer" style="right:12%;bottom:20%;width:20%;height:34%;background:linear-gradient(180deg,#3b302b,#17110f);border-radius:44% 44% 18% 18%;"></div>
      <div class="art-layer" style="left:12%;top:18%;width:12%;height:18%;background:linear-gradient(180deg,rgba(255,255,255,0.86),rgba(115,115,115,0.9));clip-path:polygon(50% 0,100% 35%,82% 100%,18% 100%,0 35%);"></div>
    </div>
  `,
  badEnding: `
    <div class="room-art"><div class="art-layer" style="inset:0;background:radial-gradient(circle at center,rgba(100,0,0,0.2),transparent 34%),linear-gradient(180deg,#080809 0%,#010101 100%);"></div></div>
  `,
  failedEscapeEnding: `
    <div class="room-art"><div class="art-layer" style="inset:0;background:radial-gradient(circle at center,rgba(156,18,18,0.25),transparent 30%),linear-gradient(180deg,#0a0909 0%,#010101 100%);"></div></div>
  `,
  normalEnding: `
    <div class="room-art"><div class="art-layer" style="inset:0;background:linear-gradient(180deg,#111722 0%,#05070a 100%);"></div></div>
  `,
  goodEndingQuestion: `
    <div class="room-art"><div class="art-layer" style="inset:0;background:radial-gradient(circle at center,rgba(255,255,255,0.18),transparent 28%),linear-gradient(180deg,#f0ece2 0%,#77716b 100%);"></div></div>
  `
};

function promptCode(message) {
  const input = window.prompt(message);
  if (input === null) return null;
  return input.trim();
}

function normalizeResidentialPassword(value) {
  return value.replace(/[\s&]+/g, "").toUpperCase();
}

const scenes = {
  carInterior: {
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
        { id: "exit-car", label: "下车", x: 78, y: 28, w: 14, h: 34, action() { setScene("entrance"); } }
      ];
    }
  },
  entrance: {
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
  },
  hallway: {
    title: "一楼楼道",
    hint: "左边是消防通道入口，右边是贴着告示的墙，中间是上楼楼梯。",
    objective() {
      return state.flags.powerOutage ? "可以尝试离开公寓，或者重新上楼。" : "去楼上看看。";
    },
    message() {
      return state.flags.powerOutage ? "停电后的一楼只剩应急绿灯。你想起物业通知说，此时门禁会重置为 0000。" : "消防通道里只有绿色安全出口在闪，墙上的物业告示像在等你靠近。";
    },
    hotspots() {
      return [
        { id: "fire-exit", label: "消防通道入口", x: 8, y: 22, w: 18, h: 48, action() { showMessage("消防通道平常锁闭着，门缝里只有绿色安全出口在黑里闪。"); } },
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
          label: state.flags.powerOutage ? "尝试出门" : "物业告示",
          x: 74, y: 18, w: 18, h: 42,
          action() {
            if (!state.flags.powerOutage) {
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
              showMessage("告示写得像整栋楼都在准备某个仪式。");
              return;
            }
            const shouldLeave = window.confirm("要离开公寓吗？");
            if (!shouldLeave) {
              showMessage("你没有立刻去碰那扇门。");
              return;
            }
            const input = promptCode("请输入停电状态下的门禁密码");
            if (input === null) {
              showMessage("你迟疑了一下，没有输入。");
              return;
            }
            if (input.replace(/\s+/g, "") === "0000") {
              setScene("normalEnding");
              return;
            }
            setScene("failedEscapeEnding");
          }
        },
        {
          id: "back-outside",
          label: "返回车里",
          x: 38,
          y: 82,
          w: 24,
          h: 10,
          action() {
            setScene("entrance");
          }
        }
      ];
    }
  },
  stairwell: {
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
  },
  secondFloorHall: {
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
                "告示下半部分被大片暗红色痕迹覆盖。",
                "",
                "<span class=\"blood-text\">你无法判断那到底是血还是别的什么。</span>"
              ].join("\n")
            });
            showMessage("那片红色像被人用手掌反复抹开。");
          }
        },
        { id: "stairs", label: "楼梯口", x: 42, y: 24, w: 18, h: 48, action() { setScene("upperStairwell"); } },
        { id: "residential", label: "居民区入口", x: 74, y: 18, w: 18, h: 48, action() { showMessage("右侧是二楼居民区入口，但此刻没有任何声音。"); } },
        { id: "back", label: "回楼梯间", x: 40, y: 78, w: 20, h: 12, action() { setScene("stairwell"); } }
      ];
    }
  },
  upperStairwell: {
    title() {
      return state.flags.stairwellBlocked ? "被封死的楼梯间" : "上行楼梯间";
    },
    hint() {
      return state.flags.stairwellBlocked ? "退路消失了。" : "这里连通二楼和三楼，四周布满红色痕迹。";
    },
    objective() {
      return state.flags.stairwellBlocked ? "只能前往三楼居民区。" : "继续前往三楼。";
    },
    message() {
      return state.flags.stairwellBlocked ? "原本回二楼的方向被一面墙堵死，上面用血反复写满了她在等你。" : "楼梯间里到处都是红色痕迹，像某种看不懂的符号。";
    },
    hotspots() {
      if (state.flags.stairwellBlocked) {
        return [
          { id: "wall", label: "血字墙面", x: 18, y: 18, w: 64, h: 46, action() { showMessage('鲜血在墙上叠成同一句话：<span class="blood-text">她在等你</span>。'); } },
          {
            id: "photo",
            label: "角落里的合影",
            x: 8, y: 72, w: 18, h: 14,
            action() {
              collectDocument({
                id: "jm-photo",
                title: "J & M 合影",
                source: "被封死的楼梯间角落",
                body: [
                  "照片背后写着 <span class=\"signal-text\">J &amp; M</span>。",
                  "你的脸还在，妻子的面部却被故意涂黑。"
                ].join("\n")
              });
              showMessage("角落里放着一张你和妻子的合影。她的脸被人刻意涂黑了。");
            }
          },
          { id: "to-3f", label: "回三楼", x: 64, y: 16, w: 20, h: 20, action() { setScene("thirdFloorHall"); } }
        ];
      }
      return [
        { id: "symbols", label: "红色符号", x: 18, y: 24, w: 18, h: 24, action() { showMessage("那些痕迹像被人反复描摹，完全看不懂含义。"); } },
        { id: "landing", label: "楼梯平台", x: 40, y: 18, w: 20, h: 18, action() { showMessage("平台中央留着拖拽过什么东西的深色痕迹。"); } },
        { id: "to-3f", label: "通往三楼", x: 62, y: 18, w: 22, h: 28, action() { setScene("thirdFloorHall"); } },
        { id: "back", label: "回二楼大厅", x: 18, y: 72, w: 22, h: 14, action() { setScene("secondFloorHall"); } }
      ];
    }
  },
  thirdFloorHall: {
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
          x: 74, y: 18, w: 18, h: 48, pulse: !state.flags.residentialUnlocked,
          action() {
            if (state.flags.residentialUnlocked) {
              setScene("thirdFloorResidential");
              return;
            }
            const input = promptCode("请输入居民区入口密码");
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
  },
  thirdFloorResidential: {
    title: "三楼居民区",
    hint: "狭窄的走廊里，你家的门虚掩着。",
    objective() {
      return state.flags.creatureAlerted ? "快逃进安全通道入口。" : "先观察眼前的东西。";
    },
    message() {
      return state.flags.creatureAlerted ? '那个身影已经发现了你。<span class="blood-text">快逃进左侧的安全通道。</span>' : "门口躺着一具尸体，一个奇怪的身影正背对着你啃食它。";
    },
    hotspots() {
      const triggerAlert = (text) => {
        if (!state.flags.creatureAlerted) {
          state.flags.creatureAlerted = true;
          showMessage(`${text}<br><span class="blood-text">那身影停住了。它发现了你，快逃进左侧的安全通道。</span>`);
          return;
        }
        setScene("badEnding");
      };
      return [
        { id: "escape", label: "安全通道入口", x: 8, y: 20, w: 18, h: 54, pulse: state.flags.creatureAlerted, action() { setScene("escapeStairwell"); } },
        { id: "corpse", label: "门口的尸体", x: 38, y: 58, w: 24, h: 14, action() { triggerAlert("尸体像被撕开过，衣服和地面都被血浸透了。"); } },
        { id: "creature", label: "啃食的身影", x: 58, y: 34, w: 14, h: 28, action() { triggerAlert("它的肩背像被强行掰弯，啃咬时发出湿冷的撕裂声。"); } },
        { id: "home-door", label: "虚掩的家门", x: 74, y: 20, w: 16, h: 46, action() { triggerAlert("你家的门缝里只有黑暗，没有任何灯光。"); } },
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
  },
  escapeStairwell: {
    title: "安全通道",
    hint: "停电了，一片漆黑。",
    objective() {
      return "别回头，立刻向下跑。";
    },
    message() {
      return "你听见背后传来嘶吼和咆哮，黑暗中唯一剩下的念头就是逃。";
    },
    hotspots() {
      return [
        { id: "run", label: "向下跑", x: 34, y: 54, w: 30, h: 18, pulse: true, action() { state.flags.powerOutage = true; setScene("hallway"); } }
      ];
    }
  },
  hallwayNormal: {
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
  },
  stairwellNormal: {
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
  },
  secondFloorHallNormal: {
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
  },
  upperStairwellNormal: {
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
  },
  thirdFloorHallNormal: {
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
  },
  thirdFloorResidentialNormal: {
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
  },
  dinnerTableScene: {
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
  },
  badEnding: {
    title: "坏结局",
    hint: "你没能逃掉。",
    objective() {
      return "重新开始。";
    },
    message() {
      return "你再回头时，那东西已经扑到了你面前。视野被黑暗和湿热的血腥味瞬间淹没。";
    },
    hotspots() {
      return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
    }
  },
  failedEscapeEnding: {
    title: "坏结局",
    hint: "门没有为你打开。",
    objective() {
      return "重新开始。";
    },
    message() {
      return "密码输错的瞬间，你感觉到有什么来到身后。那像是一个被剥皮的人类，却长着你的脸，鲜血从它嘴角涌出，然后朝你扑了过来。";
    },
    hotspots() {
      return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
    }
  },
  normalEnding: {
    title: "一般结局",
    hint: "你离开了公寓。",
    objective() {
      return "重新开始。";
    },
    message() {
      return "你终于推开大门，外面的夜风冰冷得真实。你离开了公寓，但妻子又在何方?";
    },
    hotspots() {
      return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
    }
  },
  goodEndingQuestion: {
    title: "好结局？",
    hint: "也许你终于醒来了，也许并没有。",
    objective() {
      return "重新开始。";
    },
    message() {
      return '你从梦中惊醒，耳边却有个声音贴得很近：<span class="glitch-text">你终于醒了。</span>';
    },
    hotspots() {
      return [{ id: "restart", label: "再次醒来", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }];
    }
  }
};
