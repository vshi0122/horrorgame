const MENU_ENDING_CATALOG = [
  { id: "badEnding", order: 1, name: "Taken", teaser: "You failed to escape the third-floor residences." },
  { id: "failedEscapeEnding", order: 2, name: "What Waits Outside", teaser: "You reached the exit, but you did not truly leave." },
  { id: "normalEnding", order: 3, name: "Leave the Apartment", teaser: "You made it out alive, but something is still missing." },
  { id: "goodEndingQuestion", order: 4, name: "Awake?", teaser: "You seem to have reached a deeper answer." },
  { id: "fleeEnding", order: 5, name: "Flight", teaser: "You chose not to enter the building at all." },
  { id: "chapter2UneasyReunionEnding", order: 6, name: "Uneasy Reunion", teaser: "She returns, but the calm feels rehearsed." },
  { id: "chapter2WaitWifeEnding", order: 7, name: "Waiting Room", teaser: "You sit in the ruined home and wait for her anyway." },
  { id: "chapter2BloodCradleEnding", order: 8, name: "Blood Cradle", teaser: "No medicine, a Devil draw, and the blood comes flooding back." },
  { id: "chapter2MonsterReturnEnding", order: 9, name: "Old Shadow", teaser: "With medicine and the Devil card, the creature returns." },
  { id: "chapter2GunEnding", order: 10, name: "Swallow the Gun", teaser: "You find the hidden handgun and choose your own ending." }
];

const TOTAL_ENDINGS = 10;
const TOTAL_DOCUMENTS = 25;
const CHAPTER2_UNLOCK_ENDING_ID = "goodEndingQuestion";
const CHAPTER3_UNLOCK_ENDING_IDS = [
  "chapter2UneasyReunionEnding",
  "chapter2WaitWifeEnding",
  "chapter2BloodCradleEnding",
  "chapter2MonsterReturnEnding"
];

function hasChapter2Access() {
  return hasUnlockedEnding(CHAPTER2_UNLOCK_ENDING_ID);
}

function hasChapter3Access() {
  return CHAPTER3_UNLOCK_ENDING_IDS.some((endingId) => hasUnlockedEnding(endingId));
}

const sceneArt = {
  mainMenu: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:radial-gradient(circle at 50% 20%, rgba(185,214,255,0.18), transparent 22%), linear-gradient(180deg,#090d13 0%,#030405 100%);"></div>
      <div class="art-layer" style="left:12%;top:16%;width:20%;height:54%;background:linear-gradient(180deg,rgba(27,34,44,0.94),rgba(8,10,12,0.92));border-radius:14px;"></div>
      <div class="art-layer" style="right:10%;top:10%;width:24%;height:60%;background:linear-gradient(180deg,rgba(24,19,18,0.94),rgba(7,6,6,0.92));border-radius:18px;"></div>
      <div class="art-layer" style="left:38%;top:22%;width:24%;height:50%;background:linear-gradient(180deg,rgba(37,28,24,0.9),rgba(11,8,7,0.94));border-radius:14px;"></div>
      <div class="art-layer" style="left:45%;top:8%;width:10%;height:12%;background:radial-gradient(circle,rgba(216,195,154,0.72),rgba(216,195,154,0.04));border-radius:999px;"></div>
    </div>
  `,
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
  fleeEnding: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:linear-gradient(180deg,#070b11 0%,#020406 100%);"></div>
      <div class="art-layer" style="left:32%;top:14%;width:36%;height:60%;background:linear-gradient(180deg,#15202d,#080d13);border-radius:6px;"></div>
      <div class="art-layer" style="left:37%;top:22%;width:9%;height:11%;background:radial-gradient(circle,rgba(255,222,148,0.52),rgba(255,222,148,0.04));border-radius:4px;"></div>
      <div class="art-layer" style="right:36%;top:28%;width:9%;height:11%;background:radial-gradient(circle,rgba(255,222,148,0.38),rgba(255,222,148,0.04));border-radius:4px;"></div>
      <div class="art-layer" style="left:21%;top:0;width:2%;height:56%;background:linear-gradient(180deg,transparent,rgba(185,214,255,0.2),transparent);transform:rotate(-8deg);"></div>
      <div class="art-layer" style="left:52%;top:0;width:1%;height:44%;background:linear-gradient(180deg,transparent,rgba(185,214,255,0.15),transparent);transform:rotate(-5deg);"></div>
      <div class="art-layer" style="left:72%;top:8%;width:2%;height:52%;background:linear-gradient(180deg,transparent,rgba(185,214,255,0.18),transparent);transform:rotate(-7deg);"></div>
      <div class="art-layer" style="left:0;right:0;bottom:0;height:30%;background:linear-gradient(180deg,#0b1018,#060a10);"></div>
      <div class="art-layer" style="left:24%;bottom:6%;width:22%;height:16%;background:radial-gradient(ellipse,rgba(255,240,200,0.3),rgba(255,240,200,0));"></div>
      <div class="art-layer" style="right:24%;bottom:6%;width:22%;height:16%;background:radial-gradient(ellipse,rgba(255,240,200,0.3),rgba(255,240,200,0));"></div>
    </div>
  `,
  badEnding: `<div class="room-art"><div class="art-layer" style="inset:0;background:radial-gradient(circle at center,rgba(100,0,0,0.2),transparent 34%),linear-gradient(180deg,#080809 0%,#010101 100%);"></div></div>`,
  failedEscapeEnding: `<div class="room-art"><div class="art-layer" style="inset:0;background:radial-gradient(circle at center,rgba(156,18,18,0.25),transparent 30%),linear-gradient(180deg,#0a0909 0%,#010101 100%);"></div></div>`,
  normalEnding: `<div class="room-art"><div class="art-layer" style="inset:0;background:linear-gradient(180deg,#111722 0%,#05070a 100%);"></div></div>`,
  goodEndingQuestion: `<div class="room-art"><div class="art-layer" style="inset:0;background:radial-gradient(circle at center,rgba(255,255,255,0.18),transparent 28%),linear-gradient(180deg,#f0ece2 0%,#77716b 100%);"></div></div>`
};

function buildEndingOverlay(config) {
  const collectedDocuments = state.documents.length;
  const documentRate = `${collectedDocuments}/${TOTAL_DOCUMENTS}`;
  const unlockedEndingRate = `${getUnlockedEndingCount()}/${TOTAL_ENDINGS}`;

  return `
    <section class="scene-overlay ending-overlay" aria-label="Ending summary">
      <article class="ending-card ending-card-${config.variant}">
        <p class="ending-kicker">Result</p>
        <h3 class="ending-name">${config.name}</h3>
        <p class="ending-summary">${config.summary}</p>
        <div class="ending-stats">
          <div class="ending-stat">
            <span class="ending-stat-label">Current Ending</span>
            <strong class="ending-stat-value">${config.order}/${TOTAL_ENDINGS}</strong>
          </div>
          <div class="ending-stat">
            <span class="ending-stat-label">Unlocked Endings</span>
            <strong class="ending-stat-value">${unlockedEndingRate}</strong>
          </div>
          <div class="ending-stat">
            <span class="ending-stat-label">Texts Collected</span>
            <strong class="ending-stat-value">${documentRate}</strong>
          </div>
        </div>
      </article>
    </section>
  `;
}

function buildMainMenuHome() {
  const chapter2Unlocked = hasChapter2Access();
  const chapter3Unlocked = hasChapter3Access();
  const chapter2Action = chapter2Unlocked
    ? '<button class="menu-action" type="button" data-action="start-chapter2">Chapter 2: Echo Tenant</button>'
    : '<button class="menu-action" type="button" disabled title="Unlock the ending Awake? first">Chapter 2: Echo Tenant (Locked)</button>';
  const chapter3Action = chapter3Unlocked
    ? '<button class="menu-action" type="button" data-action="start-chapter3">Chapter 3: Finale</button>'
    : '<button class="menu-action" type="button" disabled title="Unlock any Chapter 2 ending except Swallow the Gun">Chapter 3: Finale (Locked)</button>';

  return `
    <section class="scene-overlay menu-overlay" aria-label="Main menu">
      <div class="menu-home">
        <p class="menu-kicker">A Point &amp; Click Horror Game</p>
        <h2 class="menu-title">${chapter3Unlocked ? "Day of Arrival: Finale" : (chapter2Unlocked ? "Day of Arrival: Echo" : "Day of Arrival")}</h2>
        <p class="menu-tagline">${chapter3Unlocked
          ? "You crossed the Chapter 2 branches. The final chapter is now open."
          : (chapter2Unlocked
            ? "You have reached the deeper layer. Enter Chapter 2 and face what you rewrote."
            : "Wake in the dead of night. The apartment building waits ahead.<br>Step into that night again, or review what you have already brought back out.")}
        </p>
        <div class="menu-divider"></div>
        <nav class="menu-actions">
          <button class="menu-action menu-primary" type="button" data-action="start-game">Wake Again</button>
          ${chapter2Action}
          ${chapter3Action}
          <button class="menu-action" type="button" data-action="open-endings">Ending Archive</button>
          <button class="menu-action" type="button" data-action="open-documents">Text Archive</button>
        </nav>
        <footer class="menu-footer">
          <div class="menu-stat">
            <span class="menu-stat-value">${getUnlockedEndingCount()}&thinsp;/&thinsp;${MENU_ENDING_CATALOG.length}</span>
            <span class="menu-stat-label">Endings Unlocked</span>
          </div>
          <div class="menu-stat-sep"></div>
          <div class="menu-stat">
            <span class="menu-stat-value">${getUnlockedDocumentCount()}&thinsp;/&thinsp;${TOTAL_DOCUMENTS}</span>
            <span class="menu-stat-label">Texts Archived</span>
          </div>
        </footer>
      </div>
      <div class="menu-lang-switch">
        <a class="menu-lang-link" href="index.html">中文</a>
        <span class="menu-lang-sep">·</span>
        <a class="menu-lang-link active" href="index-en.html">EN</a>
      </div>
    </section>
  `;
}

function buildEndingArchive() {
  const unlockedEndings = readUnlockedEndings();
  const entries = MENU_ENDING_CATALOG.map((ending) => {
    const unlocked = unlockedEndings.includes(ending.id);
    return `
      <article class="archive-card ${unlocked ? "archive-card-unlocked" : "archive-card-locked"}">
        <p class="archive-index">Ending ${ending.order}</p>
        <h4 class="archive-title">${unlocked ? ending.name : "???"}</h4>
        <p class="archive-copy">${unlocked ? ending.teaser : "You have not reached this ending yet."}</p>
      </article>
    `;
  }).join("");

  return `
    <section class="scene-overlay menu-overlay menu-overlay-archive" aria-label="Ending archive">
      <div class="archive-page">
        <header class="archive-topnav">
          <nav class="archive-breadcrumb">
            <span class="archive-breadcrumb-home">Day of Arrival</span>
            <span class="archive-breadcrumb-sep">›</span>
            <span class="archive-breadcrumb-current">Ending Archive</span>
          </nav>
          <div class="archive-topnav-right">
            <span class="archive-count">Unlocked ${getUnlockedEndingCount()}&thinsp;/&thinsp;${MENU_ENDING_CATALOG.length}</span>
            <button class="menu-action archive-back" type="button" data-action="go-home">Back to Main Menu</button>
          </div>
        </header>
        <div class="archive-content">
          <h2 class="archive-section-title">Ending Archive</h2>
          <p class="archive-section-subtitle">Explore different routes to unlock every ending. Hidden entries stay sealed until you reach them yourself.</p>
          <div class="archive-grid">${entries}</div>
        </div>
      </div>
    </section>
  `;
}

function buildDocumentArchive() {
  const unlockedDocuments = getUnlockedDocuments();
  const selectedDocument = unlockedDocuments.find((entry) => entry.id === state.selectedArchiveDocumentId) || unlockedDocuments[0] || null;

  const entries = unlockedDocuments.length
    ? unlockedDocuments.map((document) => `
        <button class="archive-document-entry${document.id === selectedDocument?.id ? " active" : ""}" type="button" data-id="${document.id}">
          <span class="archive-document-title">${document.title}</span>
          <span class="archive-document-source">${document.source}</span>
        </button>
      `).join("")
    : '<p class="documents-empty">You have not carried any texts out yet. Once examined in-game, they will be archived here.</p>';

  const detail = selectedDocument
    ? `
        <article class="archive-document-viewer">
          <h4>${selectedDocument.title}</h4>
          <p class="archive-document-meta">${selectedDocument.source}</p>
          <div class="archive-document-body">${selectedDocument.body}</div>
        </article>
      `
    : `
        <article class="archive-document-viewer archive-document-viewer-empty">
          <h4>Text Archive</h4>
          <p class="archive-document-meta">Nothing archived yet</p>
          <div class="archive-document-body">Keep exploring. Notes, notices, and scraps that you inspect in-game will remain archived here.</div>
        </article>
      `;

  return `
    <section class="scene-overlay menu-overlay menu-overlay-archive" aria-label="Text archive">
      <div class="archive-page">
        <header class="archive-topnav">
          <nav class="archive-breadcrumb">
            <span class="archive-breadcrumb-home">Day of Arrival</span>
            <span class="archive-breadcrumb-sep">›</span>
            <span class="archive-breadcrumb-current">Text Archive</span>
          </nav>
          <div class="archive-topnav-right">
            <span class="archive-count">Archived ${getUnlockedDocumentCount()}&thinsp;/&thinsp;${TOTAL_DOCUMENTS}</span>
            <button class="menu-action archive-back" type="button" data-action="go-home">Back to Main Menu</button>
          </div>
        </header>
        <div class="archive-content">
          <h2 class="archive-section-title">Text Archive</h2>
          <p class="archive-section-subtitle">Documents you inspect during play are permanently archived here across sessions.</p>
          <div class="archive-documents-layout">
            <div class="archive-document-list">${entries}</div>
            ${detail}
          </div>
        </div>
      </div>
    </section>
  `;
}

function promptCode(message) {
  const input = window.prompt(message);
  if (input === null) return null;
  return input.trim();
}

function normalizeResidentialPassword(value) {
  return value.replace(/[\s&]+/g, "").toUpperCase();
}

const scenes = {
  mainMenu: {
    title: "Main Menu",
    hint() {
      if (hasChapter3Access()) return "Chapter 3 is now available.";
      if (hasChapter2Access()) return "Chapter 2 is now available.";
      return "The darkness has not completely faded. Wake again, or review what you have already brought out.";
    },
    objective() {
      if (state.menuTab === "endings") return `Browse unlocked endings ${getUnlockedEndingCount()}/${MENU_ENDING_CATALOG.length}.`;
      if (state.menuTab === "documents") return `Browse archived texts ${getUnlockedDocumentCount()}/${TOTAL_DOCUMENTS}.`;
      if (hasChapter3Access()) return "Enter Chapter 3, or review your archives.";
      if (hasChapter2Access()) return "Enter Chapter 2, or review your archives.";
      return "Choose to wake again, or open an archive.";
    },
    message() {
      if (state.menuTab === "endings") return "Some doors have already opened for you. Others have not.";
      if (state.menuTab === "documents") return "The pages do not speak on their own, but you can arrange them back into clues.";
      if (hasChapter3Access()) return "All branches are converging. One final door remains.";
      if (hasChapter2Access()) return "You have crossed one layer already. The echo is waiting.";
      return "Every awakening is only another entrance.";
    },
    hotspots() {
      return [];
    },
    overlay() {
      if (state.menuTab === "endings") return buildEndingArchive();
      if (state.menuTab === "documents") return buildDocumentArchive();
      return buildMainMenuHome();
    }
  },
  carInterior: {
    title: "Inside the Car",
    hint: "The rain has just stopped. Water still clings to the windshield.",
    objective() { return hasItem("Ketchup") ? "Get out of the car and head to the apartment entrance." : "Find the keyring in the driver's seat, then use the car key to open the trunk and take the ketchup."; },
    message() { return state.flags.wokeUp ? "The car is damp and close. You still have to bring the ketchup upstairs." : "You jolt awake in the driver's seat. The apartment building stands silently ahead."; },
    hotspots() { return [
      { id: "seat", label: hasItem("Keyring") ? "Driver's Seat" : "Keyring", x: 22, y: 48, w: 26, h: 20, action() { state.flags.wokeUp = true; if (!hasItem("Keyring")) { acquireItem("Keyring"); acquireItem("Car Key"); acquireItem("Mailbox Key"); addNote("You found a keyring in the driver's seat. It holds the car key and the mailbox key."); showMessage("You pull a keyring from the gap beside the driver's seat. The metal is unnaturally cold."); return; } showMessage("The dashboard has been dead for a long time. The only sound left is your own breathing."); } },
      { id: "trunk", label: state.flags.trunkOpened ? "Trunk" : "Open Trunk", x: 6, y: 56, w: 22, h: 18, action() { if (!hasItem("Car Key")) { showMessage("The trunk is locked. You need the car key first."); return; } if (!state.flags.trunkOpened) { state.flags.trunkOpened = true; acquireItem("Ketchup"); addNote("You took the ketchup your wife asked for from the trunk."); showMessage("You open the trunk and find the bottle of ketchup inside a bag of groceries."); return; } showMessage("Only an empty shopping bag and a damp cardboard box remain in the trunk."); } },
      { id: "exit-car", label: "Get Out", x: 78, y: 28, w: 14, h: 34, action() { setScene("entrance"); } },
      { id: "flee-engine", label: "Start the Car and Leave", x: 28, y: 74, w: 44, h: 12, visible: state.flags.wokeUp && !state.flags.fleePromptShown, action() { state.flags.fleePromptShown = true; showMessage("The dashboard flickers once. Do you really want to drive away now? Your wife is still inside that building."); render(); } },
      { id: "flee-confirm", label: "Yes. Leave Now", x: 14, y: 74, w: 33, h: 12, visible: state.flags.fleePromptShown, action() { setScene("fleeEnding"); } },
      { id: "flee-cancel", label: "No. I Have to Go In", x: 53, y: 74, w: 33, h: 12, visible: state.flags.fleePromptShown, action() { state.flags.fleePromptShown = false; showMessage("You switch the engine back off. Whatever waits in that building, you still have to go inside."); render(); } }
    ]; }
  },
  entrance: {
    title: "Apartment Entrance",
    hint: "A keypad lock bars the apartment door. Its screen glows cold in the night.",
    objective() { return state.flags.codeDiscovered ? "Enter the correct code and get inside the building." : "Check the mailbox for the new door code."; },
    message() { return state.flags.mailboxOpened ? "You already know the building's new code." : "The entry code has clearly been changed. There may be a notice in the mailbox."; },
    hotspots() { return [
      { id: "mailbox", label: "Mailbox", x: 10, y: 38, w: 18, h: 26, action() { if (!hasItem("Mailbox Key")) { showMessage("The mailbox is locked. You need the key first."); return; } if (!state.flags.mailboxOpened) { state.flags.mailboxOpened = true; state.flags.codeDiscovered = true; addNote("The property notice says the building code was changed to 0327."); addNote("During a blackout, the entry lock will reset to 0000."); collectDocument({ id: "notice-door-code", title: "Property Entry Notice", source: "Mailbox, Building 1", body: ["Residents,", "", "The entry code for Building 1 has been changed to <span class=\"signal-text\">0327</span>.", "In the event of a blackout, the entry lock will temporarily reset to <span class=\"signal-text\">0000</span> for evacuation.", "", "Property Management"].join("\n") }); collectDocument({ id: "newspaper-clipping", title: "Old Newspaper Clipping", source: "Mailbox, Building 1", body: ["Riverbank Evening Post - Local News", "", "A string of resident disappearances has recently struck the old district. Witnesses claim that unusual knocking could often be heard in apartment hallways beforehand.", "At the bottom of the article, one odd advertisement is circled:", "", "<span class=\"void-text\">When you see the black-and-white symbol, remember to wake up.</span>"].join("\n") }); showMessage("You open the mailbox and pull out a property notice and an old folded newspaper page from under a stack of flyers."); return; } selectDocument("notice-door-code"); showMessage("You read the notice again. The number is still 0327."); } },
      { id: "door", label: state.flags.codeDiscovered ? "Enter Code" : "Locked Front Door", x: 42, y: 18, w: 22, h: 56, locked: !state.flags.codeDiscovered, action() { if (!state.flags.codeDiscovered) { showMessage("You still don't know the new code."); return; } const input = promptCode("Enter the building entry code"); if (input === null) { showMessage("Your hand lingers over the keypad, but you do not type anything."); return; } if (input.replace(/\s+/g, "") === "0327") { state.flags.buildingEntered = true; setScene("hallway"); return; } showMessage("Wrong code. The keypad flashes once, then falls silent again."); } },
      { id: "back-car", label: "Back to Car", x: 76, y: 40, w: 16, h: 22, action() { setScene("carInterior"); } }
    ]; }
  },
  hallway: {
    title: "First Floor Hallway",
    hint: "The fire exit is on the left, the staircase is in the middle, and a notice is posted on the right wall.",
    objective() { return state.flags.powerOutage ? "You can try to leave the building, or go back upstairs." : "Head upstairs and keep investigating."; },
    message() { return state.flags.powerOutage ? "Only the emergency lights remain after the blackout. You remember the notice said the entry lock would reset to 0000." : "Inside the fire exit, only the green emergency sign is glowing. The property notice on the wall seems to be waiting for you."; },
    hotspots() { return [
      { id: "fire-exit", label: "Fire Exit", x: 8, y: 22, w: 18, h: 48, action() { showMessage("The fire exit is usually kept locked. Only the green sign glows through the crack in the door."); } },
      { id: "stairs", label: "Upstairs", x: 42, y: 24, w: 18, h: 48, action() { if (state.flags.powerOutage) { state.flags.normalAfterOutage = true; setScene("stairwellNormal"); return; } setScene("stairwell"); } },
      { id: "notice", label: "Property Notice", x: 74, y: 18, w: 18, h: 42, action() { collectDocument({ id: "arrival-notice-1f", title: "Day of Arrival Notice", source: "Right Wall, First Floor Hallway", body: ["Property Reminder:", "", "Residents are advised to prepare lights, food, and water for the <span class=\"blood-text\">Day of Arrival</span>.", "If you hear an unfamiliar voice calling your name, do not answer."].join("\n") }); if (!state.flags.powerOutage) { showMessage("The notice reads less like a warning and more like a ritual checklist."); return; } showMessage("Looking at the notice again after the blackout, you immediately remember the note about the lock resetting to 0000."); } },
      { id: "back-outside", label: state.flags.powerOutage ? "Leave Building" : "Back to Car", x: 38, y: 82, w: 24, h: 10, action() { if (state.flags.powerOutage) { const shouldLeave = window.confirm("Do you want to leave the apartment building?"); if (!shouldLeave) { showMessage("You stop before touching the door."); return; } const input = promptCode("Enter the blackout entry code"); if (input === null) { showMessage("You hesitate and leave the keypad untouched."); return; } if (input.replace(/\s+/g, "") === "0000") { setScene("normalEnding"); return; } setScene("failedEscapeEnding"); return; } setScene("entrance"); } }
    ]; }
  },
  stairwell: {
    title: "Stairwell",
    hint: "This stairwell connects the first and second floors.",
    objective() { return "Keep going up to the second floor."; },
    message() { return "You stand on the landing between the first and second floors. The upper level feels darker."; },
    hotspots() { return [
      { id: "to-1f", label: "Back to First Floor", x: 16, y: 54, w: 22, h: 18, action() { setScene("hallway"); } },
      { id: "landing", label: "Landing", x: 40, y: 22, w: 20, h: 18, action() { showMessage("The landing is empty. The light overhead trembles once in a while."); } },
      { id: "to-2f", label: "To Second Floor", x: 62, y: 18, w: 22, h: 28, action() { setScene("secondFloorHall"); } }
    ]; }
  },
  secondFloorHall: {
    title: "Second Floor Hall",
    hint: "The layout matches the first floor, but it is darker here, and far more tense.",
    objective() { return "Continue up to the third floor."; },
    message() { return "The same Day of Arrival notice is posted on the left wall, but its lower half has been smeared with a dark red stain."; },
    hotspots() { return [
      { id: "notice", label: "Smeared Notice", x: 8, y: 18, w: 18, h: 48, action() { collectDocument({ id: "arrival-notice-2f", title: "Smeared Notice", source: "Left Wall, Second Floor Hall", body: ["The lower half of the notice has been covered in dark red smears.", "", "<span class=\"blood-text\">You cannot tell whether it is blood or something else.</span>"].join("\n") }); showMessage("The red stain looks like it was spread by someone's palm."); } },
      { id: "stairs", label: "Stairwell", x: 42, y: 24, w: 18, h: 48, action() { setScene("upperStairwell"); } },
      { id: "residential", label: "Residential Entrance", x: 74, y: 18, w: 18, h: 48, action() { showMessage("The entrance to the second-floor residences is on the right, but not a sound comes from beyond it."); } },
      { id: "back", label: "Back to Stairwell", x: 40, y: 78, w: 20, h: 12, action() { setScene("stairwell"); } }
    ]; }
  },
  upperStairwell: {
    title() { return state.flags.stairwellBlocked ? "Blocked Stairwell" : "Upper Stairwell"; },
    hint() { return state.flags.stairwellBlocked ? "Your way back has disappeared." : "This stairwell connects the second and third floors. Red marks cover everything."; },
    objective() { return state.flags.stairwellBlocked ? "You have no choice but to go to the third-floor residences." : "Keep climbing to the third floor."; },
    message() { return state.flags.stairwellBlocked ? "The path back down has been sealed by a wall. Written across it in blood, over and over, are the words: she is waiting for you." : "Red marks cover the walls, railings, and landing like symbols you cannot understand."; },
    hotspots() { if (state.flags.stairwellBlocked) { return [
      { id: "wall", label: "Blood-Stained Wall", x: 18, y: 18, w: 64, h: 46, action() { showMessage('The same sentence is layered over itself in blood: <span class="blood-text">She is waiting for you.</span>'); } },
      { id: "photo", label: "Photo in the Corner", x: 8, y: 72, w: 18, h: 14, action() { collectDocument({ id: "jm-photo", title: "J & M Photo", source: "Corner of the blocked stairwell", body: ["On the back of the photo are two letters: <span class=\"signal-text\">J &amp; M</span>.", "Your face is still visible. Your wife's face has been deliberately blacked out."].join("\n") }); showMessage("In the corner lies a photograph of you and your wife. Her face has been deliberately blacked out."); } },
      { id: "to-3f", label: "Back to Third Floor", x: 64, y: 16, w: 20, h: 20, action() { setScene("thirdFloorHall"); } }
    ]; } return [
      { id: "symbols", label: "Red Symbols", x: 18, y: 24, w: 18, h: 24, action() { showMessage("The marks look like symbols drawn over and over again, but you cannot make sense of them."); } },
      { id: "landing", label: "Landing", x: 40, y: 18, w: 20, h: 18, action() { showMessage("A dark streak on the landing looks as if something was dragged across it."); } },
      { id: "to-3f", label: "To Third Floor", x: 62, y: 18, w: 22, h: 28, action() { setScene("thirdFloorHall"); } },
      { id: "back", label: "Back to Second Floor", x: 18, y: 72, w: 22, h: 14, action() { setScene("secondFloorHall"); } }
    ]; }
  },
  thirdFloorHall: {
    title: "Third Floor",
    hint: "There are no lights here at all. Only the harsh red exit light remains.",
    objective() { return state.flags.residentialUnlocked ? "Enter the residential corridor." : "Search the floor and find the password to the residential entrance."; },
    message() { state.flags.thirdFloorVisited = true; return "The entire floor is covered in bloody handprints and symbols too blurred to read. A torn notice lies on the left. On the right, the residential door stands still, but something seems to move beyond it."; },
    hotspots() { return [
      { id: "back-stairwell", label: "Back to Stairwell", x: 42, y: 24, w: 18, h: 48, action() { state.flags.stairwellBlocked = true; setScene("upperStairwell"); } },
      { id: "notice", label: "Torn Notice", x: 8, y: 62, w: 20, h: 14, action() { collectDocument({ id: "she-waits", title: "Torn Notice", source: "Floor, Third Floor", body: '<span class="blood-text">She is waiting for you</span>' }); showMessage('Only one sentence remains on the torn notice: <span class="blood-text">She is waiting for you.</span>'); } },
      { id: "residential", label: state.flags.residentialUnlocked ? "Enter Residential Corridor" : "Residential Keypad", x: 74, y: 18, w: 18, h: 48, pulse: !state.flags.residentialUnlocked, action() { if (state.flags.residentialUnlocked) { setScene("thirdFloorResidential"); return; } const input = promptCode("Enter the residential access code"); if (input === null) { showMessage("The faint movement beyond the door continues."); return; } if (normalizeResidentialPassword(input) === "JM") { state.flags.residentialUnlocked = true; addNote("The residential password on the third floor is tied to the letters J & M on the photo."); showMessage("The lock clicks open softly."); return; } showMessage("Wrong password. Something metallic scrapes on the other side of the lock."); } }
    ]; }
  },
  thirdFloorResidential: {
    title: "Third Floor Residences",
    hint: "A narrow corridor stretches ahead. Your apartment door is slightly ajar.",
    objective() {
      if (state.flags.creatureAlerted) return "Run to the fire exit immediately.";
      const examined = [state.flags.corpseExamined, state.flags.creatureExamined, state.flags.homeDoorExamined].filter(Boolean).length;
      return `Investigate the corridor. Examined ${examined}/3.`;
    },
    message() { return state.flags.creatureAlerted ? 'The creature has noticed you. <span class="blood-text">Run to the fire exit.</span>' : "A corpse lies near your door. A strange figure, its back turned to you, is crouched over it and feeding."; },
    hotspots() { const allExamined = () => state.flags.corpseExamined && state.flags.creatureExamined && state.flags.homeDoorExamined; const examine = (flag, text) => { if (state.flags.creatureAlerted) { setScene("badEnding"); return; } if (!state.flags[flag]) { state.flags[flag] = true; if (allExamined()) { state.flags.creatureAlerted = true; showMessage(`${text}<br><span class="blood-text">The figure stops. It has noticed you. Run to the fire exit on the left.</span>`); } else { showMessage(text); } render(); return; } showMessage("You have already looked here."); }; return [
      { id: "escape", label: "Fire Exit", x: 8, y: 20, w: 18, h: 54, pulse: state.flags.creatureAlerted, action() { setScene("escapeStairwell"); } },
      { id: "corpse", label: "Corpse", x: 38, y: 58, w: 24, h: 14, action() { examine("corpseExamined", "The body has been ripped open. Blood has soaked through the clothing and spread across the floor."); } },
      { id: "creature", label: "Feeding Figure", x: 58, y: 34, w: 14, h: 28, action() { examine("creatureExamined", "Its shoulders bend at the wrong angle. Wet tearing sounds fill the corridor as it feeds."); } },
      { id: "home-door", label: "Your Door", x: 74, y: 20, w: 16, h: 46, action() { examine("homeDoorExamined", "Beyond the narrow opening of your door there is only darkness."); } },
      { id: "back", label: "Back to Third Floor", x: 38, y: 78, w: 20, h: 12, action() { if (state.flags.creatureAlerted) { setScene("badEnding"); return; } setScene("thirdFloorHall"); } }
    ]; }
  },
  escapeStairwell: {
    title: "Fire Stairwell",
    hint: "The power is out. Everything is pitch black.",
    objective() { return "Do not look back. Run downward."; },
    message() { return "Behind you, snarls and howls echo through the darkness. Running is the only thought left in your mind."; },
    hotspots() { return [{ id: "run", label: "Run Downward", x: 34, y: 54, w: 30, h: 18, pulse: true, action() { state.flags.powerOutage = true; setScene("hallway"); } }]; }
  },
  hallwayNormal: {
    title: "First Floor Hallway",
    hint: "Everything has suddenly returned to the appearance of an ordinary apartment building.",
    objective() { return "You can leave the building, or go back upstairs and head home."; },
    message() { return "The lights are on again. The blackout and the chase feel as if they never happened."; },
    hotspots() { return [
      { id: "stairs", label: "Upstairs", x: 42, y: 24, w: 18, h: 48, action() { setScene("stairwellNormal"); } },
      { id: "wall", label: "Notice Board", x: 74, y: 18, w: 18, h: 42, action() { showMessage("The right wall is covered with ordinary property notices and delivery reminders."); } },
      { id: "leave", label: "Leave Building", x: 38, y: 82, w: 24, h: 10, action() { setScene("normalEnding"); } }
    ]; }
  },
  stairwellNormal: {
    title: "Stairwell",
    hint: "This stairwell connects the first and second floors. Everything looks normal.",
    objective() { return "Go up to the second floor."; },
    message() { return "All the red traces are gone. The walls are clean, as if nothing had ever stained them."; },
    hotspots() { return [
      { id: "to-1f", label: "Back to First Floor", x: 16, y: 54, w: 22, h: 18, action() { setScene("hallwayNormal"); } },
      { id: "to-2f", label: "To Second Floor", x: 62, y: 18, w: 22, h: 28, action() { setScene("secondFloorHallNormal"); } }
    ]; }
  },
  secondFloorHallNormal: {
    title: "Second Floor Hall",
    hint: "There is nothing unusual about this floor anymore.",
    objective() { return "Continue to the third floor."; },
    message() { return "No red marks. No strange sounds. You can even smell someone's cooking lingering in the air."; },
    hotspots() { return [
      { id: "stairs", label: "Stairwell", x: 42, y: 24, w: 18, h: 48, action() { setScene("upperStairwellNormal"); } },
      { id: "wall", label: "Plain Wall", x: 8, y: 18, w: 18, h: 48, action() { showMessage("There is nothing on the wall but old paint."); } },
      { id: "residential", label: "Residential Entrance", x: 74, y: 18, w: 18, h: 48, action() { showMessage("Just a normal residential door. Nothing unusual."); } },
      { id: "back", label: "Back to Stairwell", x: 40, y: 78, w: 20, h: 12, action() { setScene("stairwellNormal"); } }
    ]; }
  },
  upperStairwellNormal: {
    title: "Upper Stairwell",
    hint: "This stairwell connects the second and third floors.",
    objective() { return "Go up to the third floor and head home."; },
    message() { return "The stairwell has become so normal that it feels wrong in a different way."; },
    hotspots() { return [
      { id: "to-3f", label: "To Third Floor", x: 62, y: 18, w: 22, h: 28, action() { setScene("thirdFloorHallNormal"); } },
      { id: "back", label: "Back to Second Floor", x: 18, y: 72, w: 22, h: 14, action() { setScene("secondFloorHallNormal"); } }
    ]; }
  },
  thirdFloorHallNormal: {
    title: "Third Floor",
    hint: "The entire floor is calm, as if nothing ever happened here.",
    objective() { return "Enter the residential corridor and go home."; },
    message() { return "The red light, the bloody handprints, and the torn notices are all gone. It is just an ordinary residential floor now."; },
    hotspots() { return [
      { id: "stairs", label: "Back to Stairwell", x: 42, y: 24, w: 18, h: 48, action() { setScene("upperStairwellNormal"); } },
      { id: "residential", label: "Residential Entrance", x: 74, y: 18, w: 18, h: 48, action() { setScene("thirdFloorResidentialNormal"); } },
      { id: "wall", label: "Plain Wall", x: 8, y: 18, w: 18, h: 48, action() { showMessage("Only ordinary paint marks remain on the wall."); } }
    ]; }
  },
  thirdFloorResidentialNormal: {
    title: "Third Floor Residences",
    hint: "In the familiar narrow corridor, warm light spills from the crack beneath your front door.",
    objective() { return "Go inside."; },
    message() { return "There is no corpse here. No monster either. The corridor is quiet, as if everything has finally settled back into place."; },
    hotspots() { return [
      { id: "home-door", label: "Your Apartment", x: 42, y: 18, w: 18, h: 48, action() { setScene("dinnerTableScene"); } },
      { id: "back", label: "Back to Third Floor", x: 38, y: 78, w: 20, h: 12, action() { setScene("thirdFloorHallNormal"); } }
    ]; }
  },
  dinnerTableScene: {
    title: "Dinner Table",
    hint: "Warm yellow light fills the room. Dinner is already waiting on the table.",
    objective() { return state.flags.dinnerKetchupGiven ? "Take a closer look at the black-and-white symbol on the wall." : "Hand the ketchup to your wife."; },
    message() { return state.flags.dinnerKetchupGiven ? "Your wife keeps inviting you to eat, but now a black-and-white symbol has appeared on the wall behind her." : "Your wife has already prepared dinner and is waiting for the ketchup."; },
    hotspots() { return [
      { id: "wife", label: "Wife", x: 72, y: 20, w: 18, h: 36, action() { if (!state.flags.dinnerKetchupGiven && hasItem("Ketchup")) { removeItem("Ketchup"); state.flags.dinnerKetchupGiven = true; addNote("You handed the ketchup to your wife."); showMessage('Your wife takes the ketchup and smiles, asking you to sit down. At that moment, a <span class="void-text">black-and-white symbol</span> appears on the wall.'); render(); return; } if (!state.flags.dinnerKetchupGiven) { showMessage("She looks at you and gently asks: Where's the ketchup?"); return; } showMessage("She smiles so naturally that it seems she does not notice the strange symbol at all."); } },
      { id: "dinner", label: "Dinner", x: 26, y: 58, w: 34, h: 16, action() { showMessage("Steam rises slowly from the food. The smell is real enough to make you doubt everything else."); } },
      { id: "symbol", label: "Black-and-White Symbol", x: 12, y: 18, w: 14, h: 18, visible: state.flags.dinnerKetchupGiven, pulse: true, action() { setScene("goodEndingQuestion"); } },
      { id: "back", label: "Back to Corridor", x: 42, y: 78, w: 18, h: 12, action() { setScene("thirdFloorResidentialNormal"); } }
    ]; }
  },
  fleeEnding: {
    endingId: "fleeEnding",
    title: "Flight Ending",
    hint: "You chose to leave.",
    objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; },
    message() { return "The apartment building vanishes behind the rain-streaked glass. The passenger seat is empty. You drive away anyway."; },
    overlay() { return buildEndingOverlay({ order: 5, variant: "bad", name: "Flight", summary: "You never entered the building. Your wife and the truth remained inside, and you chose not to look back." }); },
    hotspots() { return [{ id: "restart", label: "Wake Up Again", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }]; }
  },
  badEnding: {
    endingId: "badEnding",
    title: "Bad Ending",
    hint: "You failed to escape.",
    objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; },
    message() { return "When you turn back, the thing is already on you. Darkness and the wet stink of blood swallow your vision in an instant."; },
    overlay() { return buildEndingOverlay({ order: 1, variant: "bad", name: "Taken", summary: "You lingered too long in the residences and failed to leave that floor alive." }); },
    hotspots() { return [{ id: "restart", label: "Wake Up Again", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }]; }
  },
  failedEscapeEnding: {
    endingId: "failedEscapeEnding",
    title: "Bad Ending",
    hint: "The door did not open for you.",
    objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; },
    message() { return "The moment you enter the wrong code, you feel something behind you. It looks like a flayed human body, but its face is your own. Blood spills from the corners of its mouth before it lunges at you."; },
    overlay() { return buildEndingOverlay({ order: 2, variant: "failed", name: "What Waits Outside", summary: "You reached the ground floor, but failed to leave by the right means. Outside was not freedom. It was the next layer of the nightmare." }); },
    hotspots() { return [{ id: "restart", label: "Wake Up Again", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }]; }
  },
  normalEnding: {
    endingId: "normalEnding",
    title: "Normal Ending",
    hint: "You made it out of the building.",
    objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; },
    message() { return "At last you push the front door open. The night air outside is cold and real. You leave the apartment building, but where is your wife?"; },
    overlay() { return buildEndingOverlay({ order: 3, variant: "normal", name: "Leave the Apartment", summary: "You made it out alive, but the truth did not come out with you." }); },
    hotspots() { return [{ id: "restart", label: "Wake Up Again", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }]; }
  },
  goodEndingQuestion: {
    endingId: "goodEndingQuestion",
    title: "Good Ending?",
    hint: "Maybe you really woke up. Maybe you didn't.",
    objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; },
    message() { return 'You jerk awake from the dream, but a voice is already whispering close to your ear: <span class="glitch-text">You finally woke up.</span>'; },
    overlay() { return buildEndingOverlay({ order: 4, variant: "good", name: "Awake?", summary: "You reached the deepest layer. Whether this is waking, another loop, or a better-disguised dream still has no answer. To be continued." }); },
    hotspots() { return [{ id: "restart", label: "Wake Up Again", x: 38, y: 68, w: 24, h: 14, action() { resetGame(); } }]; }
  }
};

sceneArt.chapter2Entry = sceneArt.dinnerTableScene;
sceneArt.chapter2ParkingLot = sceneArt.chapter2ParkingLot || sceneArt.carInterior;
sceneArt.chapter2DriveHome = sceneArt.chapter2DriveHome || sceneArt.carInterior;
sceneArt.chapter2CarAtApartment = sceneArt.carInterior;
sceneArt.chapter2Entrance = sceneArt.entrance;
sceneArt.chapter2Hallway = sceneArt.hallway;
sceneArt.chapter2FireExitStairwell = sceneArt.escapeStairwell;
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
sceneArt.chapter3Entry = sceneArt.mainMenu;

scenes.chapter2Entry = {
  title: "Chapter 2 - Ward",
  hint: "You wake in the psychiatrist's ward.",
  objective() {
    if (!state.flags.chapter2WokeInWard) return "Get your bearings.";
    if (!state.flags.chapter2DoctorTalked) return "Speak with the doctor.";
    if (!state.flags.chapter2GotMedicine) return "Take the medicine bottle.";
    if (!state.flags.chapter2InquiryFinished) return "Finish the conversation.";
    return "Leave for the parking lot.";
  },
  message() {
    if (!state.flags.chapter2WokeInWard) return "A familiar figure is reading your case file at bedside.";
    if (!state.flags.chapter2DoctorTalked) return "The doctor gestures for you to breathe slowly.";
    if (!state.flags.chapter2GotMedicine) return "A white medicine bottle is placed within reach.";
    if (!state.flags.chapter2InquiryFinished) return "You can still ask one more thing.";
    return "The bottle is in your hand. The corridor outside is cold white light.";
  },
  hotspots() {
    return [
      { id: "wake", label: "Wake Up", x: 18, y: 34, w: 20, h: 28, visible: !state.flags.chapter2WokeInWard, pulse: true, action() { state.flags.chapter2WokeInWard = true; showMessage("You sit up hard. The doctor says: This time, you didn't wake in the car."); render(); } },
      { id: "doctor", label: "Doctor", x: 44, y: 24, w: 20, h: 40, visible: state.flags.chapter2WokeInWard, action() { state.flags.chapter2DoctorTalked = true; addNote("The doctor says you must face the memory instead of rewriting it."); showMessage("Face that day. If you keep rewriting it, you won't leave the loop."); render(); } },
      { id: "medicine", label: "Medicine Bottle", x: 24, y: 60, w: 16, h: 14, visible: state.flags.chapter2DoctorTalked && !state.flags.chapter2GotMedicine, pulse: true, action() { state.flags.chapter2GotMedicine = true; state.flags.chapter2InquiryFinished = true; acquireItem("Medicine Bottle"); collectDocument({ id: "chapter2-ptsd-casefile-en", title: "Case File Extract", source: "Psychiatry Ward", body: ["Diagnosis: PTSD", "", "Symptoms: looped dreams, reality avoidance, temporal displacement.", "Trigger Event: █████████", "", "Instruction: Take medicine daily. Do not stop on your own."].join("\n") }); showMessage("You pick up the bottle. The trigger event line is fully blacked out."); render(); } },
      { id: "leave", label: "Leave Ward", x: 38, y: 72, w: 24, h: 14, visible: state.flags.chapter2InquiryFinished, action() { setScene("chapter2ParkingLot"); } }
    ];
  }
};

scenes.chapter2ParkingLot = {
  title: "Chapter 2 - Parking Lot",
  hint: "Your car waits below the clinic.",
  objective() { return "Drive home, or stay and steady yourself."; },
  message() { return "Headlights carve pale lines in wet concrete."; },
  hotspots() {
    return [
      { id: "drive", label: "Drive Home", x: 24, y: 58, w: 38, h: 18, pulse: true, action() { setScene("chapter2DriveHome"); } },
      { id: "stay", label: "Stay Here", x: 66, y: 58, w: 22, h: 18, action() {
        collectDocument({ id: "chapter2-roadside-flyers-a-en", title: "Roadside Flyers (Services)", source: "Clinic Billboard", body: ["Moving / Cleaning / Repairs", "", "All-night moving service.", "Deep cleaning and emergency home repair."].join("\n") });
        collectDocument({ id: "chapter2-roadside-flyers-b-en", title: "Roadside Flyers (Classes)", source: "Clinic Billboard", body: ["Night Classes / Resume Review / Agency Services", "", "Stacks of paper overlap each other.", "A narrow strip ad is pinned in the corner."].join("\n") });
        collectDocument({ id: "chapter2-roadside-divination-strip-en", title: "Divination Strip Ad", source: "Clinic Billboard Corner", body: ["Small handwritten strip:", "", "Night readings. No names asked.", "Phone: 800-4411-0726", "", "Back side:", "The most important date will choose for you."].join("\n") });
        addNote("Among random flyers, you notice a tiny divination strip with number 800-4411-0726.");
        showMessage("You scan the crowded billboard: moving, cleaning, classes, agencies. A narrow strip in the corner reads: 800-4411-0726.");
      } }
    ];
  }
};

scenes.chapter2DriveHome = {
  title: "Chapter 2 - Drive",
  hint: "Streetlights slide past in rain.",
  objective() { return "Continue to the apartment."; },
  message() { return "For a blink, the passenger seat looks recently occupied."; },
  hotspots() { return [{ id: "continue", label: "Continue", x: 34, y: 72, w: 32, h: 14, action() { setScene("chapter2CarAtApartment"); } }]; }
};

scenes.chapter2CarAtApartment = {
  title: "Chapter 2 - Outside the Building",
  hint: "You park exactly where you parked that night.",
  objective() { return "Get out and check the entrance mailbox."; },
  message() { return "Home is only a few steps away, and still hard to approach."; },
  hotspots() { return [{ id: "exit", label: "Get Out", x: 78, y: 28, w: 14, h: 34, pulse: true, action() { setScene("chapter2Entrance"); } }]; }
};

scenes.chapter2Entrance = {
  title: "Chapter 2 - Entrance",
  hint: "Two newly delivered papers are inside the mailbox.",
  objective() { return state.flags.chapter2MailboxOpened ? "Enter the building." : "Read the mailbox documents first."; },
  message() { return state.flags.chapter2MailboxOpened ? "Layoff subsidy. Medical accident. The words keep repeating in your head." : "A white paper edge sticks out from the mailbox slot."; },
  hotspots() {
    return [
      { id: "mailbox", label: "Mailbox", x: 10, y: 38, w: 18, h: 26, pulse: !state.flags.chapter2MailboxOpened, action() { if (!state.flags.chapter2MailboxOpened) { state.flags.chapter2MailboxOpened = true; collectDocument({ id: "chapter2-layoff-subsidy-en", title: "Layoff Subsidy Notice", source: "Entrance Mailbox", body: ["Your subsidy request has been approved.", "Recipient: John", "Issue date: 03/25"].join("\n") }); collectDocument({ id: "chapter2-medical-accident-news-en", title: "News Clipping: Medical Accident", source: "Entrance Mailbox", body: ["A disputed obstetrics operation has triggered a family complaint.", "Hospital says internal review is ongoing."].join("\n") }); showMessage("You pull out two papers. Layoff subsidy. Medical accident."); render(); return; } showMessage("The same two papers. Same words. Same tremor in your hand."); } },
      { id: "door", label: "Building Door", x: 42, y: 18, w: 22, h: 56, locked: !state.flags.chapter2MailboxOpened, action() { if (!state.flags.chapter2MailboxOpened) { showMessage("Read the mailbox papers first."); return; } setScene("chapter2Hallway"); } }
    ];
  }
};

scenes.chapter2Hallway = {
  title: "Chapter 2 - First Floor Hall",
  hint: "The ritual notice is gone. A normal property notice is back.",
  objective() { return state.flags.chapter2FirstFloorFireExitUnlocked ? "Fire exit unlocked. Keep investigating upstairs." : "Check the notice and move deeper."; },
  message() { return "The silence here feels staged."; },
  hotspots() {
    return [
      { id: "fire", label: "Fire Exit", x: 8, y: 22, w: 18, h: 48, action() { if (!state.flags.chapter2FirstFloorFireExitUnlocked) { showMessage("Locked. Duty room authorization required."); return; } setScene("chapter2FireExitStairwell"); } },
      { id: "stairs", label: "Upstairs", x: 42, y: 24, w: 18, h: 48, action() { setScene("chapter2StairwellNormal"); } },
      { id: "notice", label: "Property Notice", x: 74, y: 18, w: 18, h: 42, pulse: true, action() { collectDocument({ id: "chapter2-normal-property-notice-en", title: "Property Maintenance Notice", source: "First Floor Wall", body: ["Elevator inspection Wednesday 10:00-12:00.", "Property Service Center"].join("\n") }); showMessage("A normal notice. That unsettles you more."); } }
    ];
  }
};

scenes.chapter2FireExitStairwell = {
  title: "Chapter 2 - Fire Stairwell",
  hint: "Emergency lights lead upward.",
  objective() { return "Search the stairwell and continue to the third-floor exit."; },
  message() { return "Concrete walls throw your footsteps back at you."; },
  hotspots() {
    return [
      { id: "photo", label: "Photo in Corner", x: 8, y: 74, w: 18, h: 14, pulse: true, action() { collectDocument({ id: "chapter2-marriage-photo-en", title: "Erased Wedding Photo", source: "First Floor Fire Stairwell", body: ["Your wife\'s face is smeared out again.", "Back side shows only one date: 1106."].join("\n") }); showMessage("Her face is erased. The back only reads: 1106."); } },
      { id: "sheet", label: "Inspection Sheet", x: 8, y: 28, w: 20, h: 26, pulse: true, action() { collectDocument({ id: "chapter2-fire-exit-inspection-sheet-en", title: "Fire Exit Inspection Sheet", source: "Fire Stairwell Wall", body: ["Inspector: David", "Property ID: WY-3A-017", "03/27: third-floor outlet switched to controlled mode."].join("\n") }); showMessage("Inspector name: David. Property ID: WY-3A-017."); } },
      { id: "to3", label: "To Third-Floor Outlet", x: 62, y: 18, w: 24, h: 30, pulse: true, action() { setScene("chapter2ThirdFloorHall"); } },
      { id: "back", label: "Back", x: 14, y: 70, w: 24, h: 14, action() { setScene("chapter2Hallway"); } }
    ];
  }
};

scenes.chapter2StairwellNormal = { title: "Chapter 2 - Stairwell", hint: "First and second floors connect here.", objective() { return "Reach the second floor."; }, message() { return "Everything looks ordinary. Too ordinary."; }, hotspots() { return [{ id: "to2", label: "To Second Floor", x: 62, y: 18, w: 22, h: 28, action() { setScene("chapter2SecondFloorHall"); } }, { id: "to1", label: "Back to First Floor", x: 16, y: 54, w: 22, h: 18, action() { setScene("chapter2Hallway"); } }]; } };
scenes.chapter2SecondFloorHall = { title: "Chapter 2 - Second Floor Hall", hint: "Residential entrance is on the right.", objective() { return "Check the duty room and continue upward."; }, message() { return "No marks. No noise. Just stale hallway air."; }, hotspots() { return [{ id: "resi", label: "Residential Entrance", x: 74, y: 18, w: 18, h: 48, action() { setScene("chapter2SecondFloorResidential"); } }, { id: "stairs", label: "Upstairs", x: 42, y: 24, w: 18, h: 48, action() { setScene("chapter2UpperStairwell"); } }, { id: "back", label: "Back", x: 40, y: 78, w: 20, h: 12, action() { setScene("chapter2StairwellNormal"); } }]; } };
scenes.chapter2SecondFloorResidential = { title: "Chapter 2 - Second Floor Residences", hint: "A lit door says Duty Room.", objective() { return "Enter the duty room."; }, message() { return "No voices behind the door."; }, hotspots() { return [{ id: "duty", label: "Property Duty Room", x: 42, y: 18, w: 18, h: 48, pulse: true, action() { setScene("chapter2PropertyDutyRoom"); } }, { id: "back", label: "Back", x: 38, y: 78, w: 20, h: 12, action() { setScene("chapter2SecondFloorHall"); } }]; } };

scenes.chapter2PropertyDutyRoom = {
  title: "Chapter 2 - Duty Room",
  hint: "Ledger, monitor, desk phone, and duty terminal.",
  objective() { return state.flags.chapter2ThirdFloorFireExitUnlocked ? "Return to the third floor." : "Use the phone and terminal to uncover access routes."; },
  message() { return "No staff in sight. The fan is still spinning."; },
  hotspots() {
    return [
      { id: "ledger", label: "Duty Ledger", x: 24, y: 56, w: 30, h: 16, pulse: true, action() { collectDocument({ id: "chapter2-duty-room-log-en", title: "Duty Log Extract", source: "Duty Room Desk", body: ["After that incident, third floor was sealed.", "Residents moved out. Access restricted."].join("\n") }); showMessage("The line repeats: after that incident, third floor was sealed."); } },
      { id: "monitor", label: "Monitor", x: 10, y: 18, w: 16, h: 18, action() { showMessage("Snow noise only. No usable feed."); } },
      { id: "phone", label: "Desk Phone", x: 30, y: 18, w: 14, h: 18, action() {
        const input = promptCode("Dial a number");
        if (input === null) { showMessage("You lower the receiver without dialing."); return; }
        const dialed = input.replace(/\D/g, "");
        if (!dialed) { showMessage("No valid number entered."); return; }
        if (dialed === "80044110726") {
          const hasDevil = hasItem("Tarot - Devil");
          const hasLovers = hasItem("Tarot - Lovers");
          if (!hasDevil && !hasLovers) {
            if (!hasItem("Tarot - Justice")) acquireItem("Tarot - Justice");
            collectDocument({ id: "chapter2-divination-call-record-justice-en", title: "Call Record: Justice", source: "Duty Room Phone", body: ["Voice: You haven't drawn the real question yet.", "Card drawn: Justice.", "Meaning: you carry unresolved guilt toward someone."].join("\n") });
            addNote("The hotline drew Justice for you and called out your guilt.");
            showMessage("The voice says: Justice. You are guilty toward someone. When you hang up, a new card is in your pocket.");
            render();
            return;
          }
          const opts = [];
          if (hasDevil) opts.push("1=Ask Devil");
          if (hasLovers) opts.push("2=Ask Lovers");
          opts.push("0=Hang up");
          const choice = promptCode(`Ask about a card (${opts.join(", ")})`);
          if (choice === null || choice.replace(/\s+/g, "") === "0") { showMessage("You hang up in silence."); return; }
          const c = choice.replace(/\s+/g, "");
          if (c === "1" && hasDevil) { collectDocument({ id: "chapter2-divination-devil-meaning-en", title: "Hotline Reading: Devil", source: "Duty Room Phone", body: ["Devil is not temptation.", "It is the chain you refuse to release."].join("\n") }); showMessage("Voice: Devil is the chain you keep choosing."); return; }
          if (c === "2" && hasLovers) { collectDocument({ id: "chapter2-divination-lovers-meaning-en", title: "Hotline Reading: Lovers", source: "Duty Room Phone", body: ["Lovers is not comfort.", "It is a choice between a person and a truth."].join("\n") }); showMessage("Voice: Lovers is a choice, not forgiveness."); return; }
          showMessage("Voice: Look at what you're holding before you ask.");
          return;
        }
        if (dialed === "110" || dialed === "119" || dialed === "120") { showMessage("The line cuts out before connection."); return; }
        showMessage("Continuous busy tone. No answer.");
      } },
      { id: "computer", label: "Duty Terminal", x: 72, y: 22, w: 16, h: 18, pulse: !state.flags.chapter2ThirdFloorFireExitUnlocked, action() {
        if (!state.flags.chapter2DutyComputerUsed) {
          state.flags.chapter2DutyComputerUsed = true;
          state.flags.chapter2FirstFloorFireExitUnlocked = true;
          collectDocument({ id: "chapter2-fire-exit-ops-note-en", title: "Fire Exit Operations Note", source: "Duty Terminal", body: ["1F fire exit can be remotely unlocked here.", "3F outlet requires staff login: name + property ID."].join("\n") });
          showMessage("1F fire exit unlocked. 3F outlet requires staff credentials.");
          render();
          return;
        }
        if (!state.flags.chapter2ThirdFloorFireExitUnlocked) {
          const n = promptCode("Staff name");
          if (n === null) { showMessage("No name entered."); return; }
          const p = promptCode("Property ID");
          if (p === null) { showMessage("No ID entered."); return; }
          const okN = n.replace(/\s+/g, "").toLowerCase() === "david";
          const okP = p.replace(/[^a-z0-9]/gi, "").toLowerCase() === "wy3a017";
          if (okN && okP) { state.flags.chapter2ThirdFloorFireExitUnlocked = true; showMessage("Authorization accepted. Third-floor fire outlet unlocked."); render(); return; }
          showMessage("Login mismatch.");
          return;
        }
        showMessage("Status: 1F unlocked. 3F outlet authorized.");
      } },
      { id: "back", label: "Back", x: 42, y: 78, w: 18, h: 12, action() { setScene("chapter2SecondFloorResidential"); } }
    ];
  }
};

scenes.chapter2UpperStairwell = { title: "Chapter 2 - Upper Stairwell", hint: "Second and third floors connect here.", objective() { return "Go to the third floor."; }, message() { return "Silence thickens with each step."; }, hotspots() { return [{ id: "to3", label: "To Third Floor", x: 62, y: 18, w: 22, h: 28, action() { setScene("chapter2ThirdFloorHall"); } }, { id: "back", label: "Back", x: 18, y: 72, w: 22, h: 14, action() { setScene("chapter2SecondFloorHall"); } }]; } };

scenes.chapter2ThirdFloorHall = {
  title: "Chapter 2 - Third Floor",
  hint: "Residential gate is sealed with chain and tape.",
  objective() { return state.flags.chapter2ThirdFloorFireExitUnlocked ? "Use fire outlet side entry." : "Read the seal and unlock outlet from duty room."; },
  message() { return "The floor is quiet. The seal looks fresh."; },
  hotspots() {
    return [
      { id: "sealed", label: "Sealed Residential Gate", x: 74, y: 18, w: 18, h: 48, pulse: true, action() { collectDocument({ id: "chapter2-sealed-notice-3f-en", title: "Third-Floor Seal Notice", source: "Third Floor Residential Gate", body: ["Temporary lockdown. Entry prohibited.", "Report anomalies at second-floor duty room."].join("\n") }); showMessage("Locked and sealed. Report anomalies at second-floor duty room."); } },
      { id: "fire", label: state.flags.chapter2ThirdFloorFireExitUnlocked ? "Fire Outlet (Unlocked)" : "Fire Outlet", x: 8, y: 18, w: 18, h: 48, pulse: !state.flags.chapter2ThirdFloorFireExitUnlocked, action() { if (!state.flags.chapter2FirstFloorFireExitUnlocked) { showMessage("No response. Unlock 1F fire control first."); return; } if (!state.flags.chapter2ThirdFloorFireExitUnlocked) { showMessage("Outlet asks for remote authorization from duty room."); return; } setScene("chapter2ThirdFloorResidential"); } },
      { id: "back", label: "Back to Stairwell", x: 42, y: 24, w: 18, h: 48, action() { setScene("chapter2UpperStairwell"); } }
    ];
  }
};

scenes.chapter2ThirdFloorResidential = { title: "Chapter 2 - Third Floor Residences", hint: "Your door is still there.", objective() { return "Enter your apartment."; }, message() { return "Only your footsteps answer you."; }, hotspots() { return [{ id: "home", label: "Your Door", x: 42, y: 18, w: 18, h: 48, pulse: true, action() { setScene("chapter2HomeDusty"); } }, { id: "back", label: "Back", x: 38, y: 78, w: 20, h: 12, action() { setScene("chapter2ThirdFloorHall"); } }]; } };

scenes.chapter2HomeDusty = {
  title: "Chapter 2 - Home",
  hint: "Dust everywhere. No one has cleaned in a long time.",
  objective() { return state.flags.chapter2PendingEnding ? "Sit in the living room and face what comes next." : "Search the apartment for clues."; },
  message() { return "Dry dust smell fills the room. Your finger leaves marks on every surface."; },
  hotspots() {
    return [
      { id: "sofa", label: state.flags.chapter2PendingEnding ? "Old Sofa" : "Dusty Table", x: 22, y: 56, w: 34, h: 16, action() {
        if (hasItem("Handgun")) {
          const sitGun = window.confirm("Sit down?");
          if (!sitGun) { showMessage("You stay standing with your hand still near your pocket."); return; }
          setScene("chapter2GunEnding");
          return;
        }
        if (state.flags.chapter2PendingEnding) {
          const sit = window.confirm("Sit down?");
          if (!sit) { showMessage("You remain standing. The room keeps listening."); return; }
          setScene("chapter2EchoJudgment");
          return;
        }
        showMessage("You drag one finger through the dust. Raw wood appears beneath.");
      } },
      { id: "cabinet", label: "Cabinet", x: 70, y: 20, w: 18, h: 36, action() { collectDocument({ id: "chapter2-home-cleaning-note-en", title: "Unfinished Cleaning Note", source: "Living Room Cabinet", body: ["A curled sticky note under dust:", "", "Full-apartment cleaning this weekend.", "", "No date. No signature."].join("\n") }); showMessage("A half-written cleaning note sits under dust."); } },
      { id: "bedroom", label: "Bedroom Door", x: 70, y: 18, w: 18, h: 36, pulse: true, action() { setScene("chapter2Bedroom"); } },
      { id: "back", label: "Back to Corridor", x: 42, y: 78, w: 18, h: 12, action() { setScene("chapter2ThirdFloorResidential"); } }
    ];
  }
};

scenes.chapter2Bedroom = {
  title: "Chapter 2 - Bedroom",
  hint: "A crib. A lockbox. A carved line: The most important date.",
  objective() { return state.flags.chapter2TarotChoice ? "You already made your card choice." : "Enter a 4-digit date on the lockbox."; },
  message() { return "The lockbox rests in the center of the crib mattress."; },
  hotspots() {
    return [
      { id: "crib", label: "Crib", x: 20, y: 42, w: 30, h: 26, action() { showMessage("Dust circles the crib rails. The lockbox waits in the middle."); } },
      { id: "lockbox", label: "Lockbox", x: 56, y: 38, w: 22, h: 24, pulse: !state.flags.chapter2TarotChoice, action() {
        const hasJustice = hasItem("Tarot - Justice");
        const hasGun = hasItem("Handgun");
        if (state.flags.chapter2TarotChoice && !(hasJustice && !hasGun)) {
          const picked = state.flags.chapter2TarotChoice === "devil" ? "Tarot - Devil" : "Tarot - Lovers";
          showMessage(`The box is already open. The slot is empty. You took: ${picked}.`);
          return;
        }
        const input = promptCode("Enter 4 digits");
        if (input === null) { showMessage("You stop over the keypad without entering anything."); return; }
        const code = input.replace(/\D/g, "");
        if (code === "0325") {
          if (hasJustice && !hasGun) {
            acquireItem("Handgun");
            collectDocument({ id: "chapter2-lockbox-handgun-en", title: "Hidden Compartment: Handgun", source: "Crib Lockbox", body: ["You enter 0325.", "A hidden side panel opens.", "Inside is a handgun, cold as stored metal."].join("\n") });
            addNote("With Justice in hand, 0325 opened a hidden compartment and gave you a handgun.");
            showMessage("A hidden side panel clicks open. A handgun is inside.");
            render();
            return;
          }
          showMessage("0325 does nothing. Something else is missing.");
          return;
        }
        if (code === "0327") {
          state.flags.chapter2TarotChoice = "devil";
          acquireItem("Tarot - Devil");
          collectDocument({ id: "chapter2-tarot-devil-en", title: "Tarot - Devil", source: "Crib Lockbox", body: ["A single card slides out: Devil.", "A chain binds two figures in repeating loops."].join("\n") });
          if (!state.flags.chapter2MedicineUsed) {
            state.flags.chapter2PendingEnding = "chapter2BloodCradleEnding";
            showMessage("As your finger touches the Devil card, wet red starts to seep from the crib rails. You back into the living room.");
            render();
            return;
          }
          state.flags.chapter2PendingEnding = "chapter2MonsterReturnEnding";
          showMessage("Your vision stutters under medicine. A familiar impact sound hits the bedroom door. You retreat to the living room.");
          render();
          return;
        }
        if (code === "1106") {
          state.flags.chapter2TarotChoice = "love";
          acquireItem("Tarot - Lovers");
          collectDocument({ id: "chapter2-tarot-lovers-en", title: "Tarot - Lovers", source: "Crib Lockbox", body: ["A single card slides out: Lovers.", "Two figures face each other in fixed light."].join("\n") });
          if (!state.flags.chapter2MedicineUsed) {
            state.flags.chapter2PendingEnding = "chapter2UneasyReunionEnding";
            showMessage("Footsteps outside the bedroom. You clutch the Lovers card and step back to the living room.");
            render();
            return;
          }
          state.flags.chapter2PendingEnding = "chapter2WaitWifeEnding";
          showMessage("The room darkens in patches under medicine. You carry the Lovers card back to the living room.");
          render();
          return;
        }
        showMessage("Wrong code. The lockbox light blinks twice and goes still.");
      } },
      { id: "back", label: "Back to Living Room", x: 40, y: 78, w: 20, h: 12, action() { setScene("chapter2HomeDusty"); } }
    ];
  }
};

scenes.chapter2EchoJudgment = {
  title: "Chapter 2 - Echo in the Living Room",
  hint() {
    const p = state.flags.chapter2PendingEnding;
    if (p === "chapter2UneasyReunionEnding") return "She stands at the end of the hall, smiling at you.";
    if (p === "chapter2BloodCradleEnding") return "A blood-stained version of her waits in the doorway.";
    if (p === "chapter2MonsterReturnEnding") return "The twisted creature is in the bedroom doorway.";
    return "The room is hollow and listening.";
  },
  onEnter() {
    if (hasItem("Handgun")) { state.flags.chapter2PendingEnding = ""; setScene("chapter2GunEnding"); return true; }
    if (state.flags.chapter2PendingEnding === "chapter2WaitWifeEnding") { state.flags.chapter2PendingEnding = ""; setScene("chapter2WaitWifeEnding"); return true; }
    return false;
  },
  objective() {
    const p = state.flags.chapter2PendingEnding;
    if (p === "chapter2UneasyReunionEnding" || p === "chapter2BloodCradleEnding") return "Click her.";
    if (p === "chapter2MonsterReturnEnding") return "Click the creature.";
    return "Hold steady.";
  },
  message() {
    const p = state.flags.chapter2PendingEnding;
    if (p === "chapter2UneasyReunionEnding") return "She appears at the end of the hall and reaches toward you.";
    if (p === "chapter2BloodCradleEnding") return "A dripping sound from the bedroom. She steps out with blood on her sleeves.";
    if (p === "chapter2MonsterReturnEnding") return "The bedroom door shakes. The same twisted thing from Chapter 1 pushes through.";
    return "You sit and wait.";
  },
  hotspots() {
    const p = state.flags.chapter2PendingEnding;
    return [
      { id: "wife", label: "Wife", x: 72, y: 20, w: 18, h: 36, pulse: true, visible: p === "chapter2UneasyReunionEnding", action() { state.flags.chapter2PendingEnding = ""; setScene("chapter2UneasyReunionEnding"); } },
      { id: "wife-blood", label: "Blood-Stained Wife", x: 72, y: 20, w: 18, h: 36, pulse: true, visible: p === "chapter2BloodCradleEnding", action() { state.flags.chapter2PendingEnding = ""; setScene("chapter2BloodCradleEnding"); } },
      { id: "monster", label: "Twisted Creature", x: 58, y: 28, w: 18, h: 34, pulse: true, visible: p === "chapter2MonsterReturnEnding", action() { state.flags.chapter2PendingEnding = ""; setScene("chapter2MonsterReturnEnding"); } }
    ];
  }
};

scenes.chapter3Entry = {
  title: "Chapter 3 - Final Resonance",
  hint: "Chapter 3 unlocked.",
  objective() { return "The final chapter continues from here."; },
  message() { return "All branch paths have converged. One final threshold remains."; },
  hotspots() { return [{ id: "back", label: "Back to Main Menu", x: 38, y: 72, w: 24, h: 14, action() { openMainMenu(); } }]; }
};

scenes.chapter2UneasyReunionEnding = { endingId: "chapter2UneasyReunionEnding", title: "Ending - Uneasy Reunion", hint: "She returns, but the calm feels wrong.", objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; }, message() { return "After you sit down, she walks in and holds you without a word. Her warmth is real. The calm is too perfect."; }, overlay() { return buildEndingOverlay({ order: 6, variant: "good", name: "Uneasy Reunion", summary: "No medicine. Lovers card. Reunion arrives exactly as desired, and that is what makes it frightening." }); }, hotspots() { return [{ id: "to-menu", label: "Main Menu", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }]; } };
scenes.chapter2WaitWifeEnding = { endingId: "chapter2WaitWifeEnding", title: "Ending - Waiting Room", hint: "Medicine strips color from the world.", objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; }, message() { return "You sit and finally see the house as a ruined shell with peeling walls. Still, you wait for her to come home."; }, overlay() { return buildEndingOverlay({ order: 7, variant: "normal", name: "Waiting Room", summary: "Medicine plus Lovers card reveals decay, but you choose to stay and wait." }); }, hotspots() { return [{ id: "to-menu", label: "Main Menu", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }]; } };
scenes.chapter2BloodCradleEnding = { endingId: "chapter2BloodCradleEnding", title: "Ending - Blood Cradle", hint: "No medicine. No barrier left.", objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; }, message() { return "The crib bleeds through the rails. She returns with blood on her sleeves and embraces you as if this is ordinary."; }, overlay() { return buildEndingOverlay({ order: 8, variant: "bad", name: "Blood Cradle", summary: "No medicine plus Devil card lets blood and memory flood back in together." }); }, hotspots() { return [{ id: "to-menu", label: "Main Menu", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }]; } };
scenes.chapter2MonsterReturnEnding = { endingId: "chapter2MonsterReturnEnding", title: "Ending - Old Shadow", hint: "Medicine steadies you just enough to watch it return.", objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; }, message() { return "The same twisted creature from Chapter 1 crashes in and lunges without slowing."; }, overlay() { return buildEndingOverlay({ order: 9, variant: "bad", name: "Old Shadow", summary: "Medicine plus Devil card reopens the original nightmare entry point." }); }, hotspots() { return [{ id: "to-menu", label: "Main Menu", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }]; } };
scenes.chapter2GunEnding = { endingId: "chapter2GunEnding", title: "Ending - Swallow the Gun", hint: "You leave the last choice to the trigger.", objective() { return `Unlocked endings ${getUnlockedEndingCount()}/${TOTAL_ENDINGS}. Texts collected ${state.documents.length}/${TOTAL_DOCUMENTS}.`; }, message() { return "You sit with the handgun and stop waiting for footsteps. Steel against your teeth. One muffled shot, and the room falls silent."; }, overlay() { return buildEndingOverlay({ order: 10, variant: "bad", name: "Swallow the Gun", summary: "With the hidden handgun in hand, you choose an ending that leaves no witness." }); }, hotspots() { return [{ id: "to-menu", label: "Main Menu", x: 38, y: 68, w: 24, h: 14, action() { openMainMenu(); } }]; } };
