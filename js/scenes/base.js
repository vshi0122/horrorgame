// Base scene data and helpers (exposes globals `sceneArt` and `scenes`)
window.sceneArt = {
  mainMenu: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:100%;background:radial-gradient(circle at 50% 20%, rgba(185,214,255,0.18), transparent 22%), linear-gradient(180deg,#090d13 0%,#030405 100%);"></div>
      <div class="art-layer" style="left:12%;top:16%;width:20%;height:54%;background:linear-gradient(180deg,rgba(27,34,44,0.94),rgba(8,10,12,0.92));border-radius:14px;"></div>
      <div class="art-layer" style="right:10%;top:10%;width:24%;height:60%;background:linear-gradient(180deg,rgba(24,19,18,0.94),rgba(7,6,6,0.92));border-radius:18px;"></div>
      <div class="art-layer" style="left:38%;top:22%;width:24%;height:50%;background:linear-gradient(180deg,rgba(37,28,24,0.9),rgba(11,8,7,0.94));border-radius:14px;"></div>
      <div class="art-layer" style="left:45%;top:8%;width:10%;height:12%;background:radial-gradient(circle,rgba(216,195,154,0.72),rgba(216,195,154,0.04));border-radius:999px;"></div>
    </div>
  `,
  chapter2Entry: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background:linear-gradient(180deg,#26303b 0%,#0f141b 100%);"></div>
      <div class="art-layer" style="left:8%;right:8%;bottom:8%;height:22%;background:linear-gradient(180deg,#3a4048,#1a1f25);border-radius:14px;"></div>
      <div class="art-layer" style="left:12%;top:18%;width:26%;height:52%;background:linear-gradient(180deg,#dde3e9,#8d99a6);border-radius:12px;"></div>
      <div class="art-layer" style="left:17%;top:30%;width:16%;height:20%;background:linear-gradient(180deg,#f1f5f8,#bfcad3);border-radius:10px;"></div>
      <div class="art-layer" style="left:44%;top:20%;width:18%;height:46%;background:linear-gradient(180deg,#556372,#27303a);border-radius:10px;"></div>
      <div class="art-layer" style="right:14%;top:16%;width:22%;height:50%;background:linear-gradient(180deg,#4a5765,#202831);border-radius:12px;"></div>
      <div class="art-layer" style="right:21%;top:24%;width:7%;height:14%;background:radial-gradient(circle,rgba(255,244,214,0.6),rgba(255,244,214,0.05));border-radius:999px;"></div>
    </div>
  `,
  chapter2WardHallway: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background:linear-gradient(180deg,#1f2934 0%,#0a0f15 100%);"></div>
      <div class="art-layer" style="left:10%;top:16%;width:22%;height:58%;background:linear-gradient(180deg,#5f6d7a,#2c3742);border-radius:10px;"></div>
      <div class="art-layer" style="left:42%;top:14%;width:16%;height:62%;background:linear-gradient(180deg,#6a5f58,#312a25);border-radius:8px;"></div>
      <div class="art-layer" style="right:12%;top:16%;width:22%;height:58%;background:linear-gradient(180deg,#51606e,#26303a);border-radius:10px;"></div>
    </div>
  `,
  chapter2ParkingLot: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background:linear-gradient(180deg,#243141 0%,#0b1118 100%);"></div>
      <div class="art-layer" style="left:0;right:0;bottom:0;height:32%;background:linear-gradient(180deg,#1e2834,#0e141c);"></div>
      <div class="art-layer" style="left:16%;bottom:16%;width:50%;height:22%;background:linear-gradient(180deg,#3b4653,#1b232d);border-radius:22px;"></div>
      <div class="art-layer" style="left:22%;bottom:20%;width:12%;height:10%;background:radial-gradient(circle,rgba(255,238,188,0.42),rgba(255,238,188,0.02));border-radius:999px;"></div>
      <div class="art-layer" style="left:52%;bottom:20%;width:12%;height:10%;background:radial-gradient(circle,rgba(255,238,188,0.42),rgba(255,238,188,0.02));border-radius:999px;"></div>
      <div class="art-layer" style="right:12%;top:16%;width:24%;height:56%;background:linear-gradient(180deg,#455264,#202936);border-radius:12px;"></div>
    </div>
  `,
  chapter2DriveHome: `
    <div class="room-art">
      <div class="art-layer" style="left:0;right:0;top:0;height:54%;background:linear-gradient(180deg,#324458 0%,#151f2b 100%);"></div>
      <div class="art-layer" style="left:0;right:0;bottom:0;height:46%;background:linear-gradient(180deg,#1a212b 0%,#0a0f15 100%);"></div>
      <div class="art-layer" style="left:10%;bottom:14%;width:56%;height:26%;background:linear-gradient(180deg,#33404d,#161d26);border-radius:30px;"></div>
      <div class="art-layer" style="right:9%;top:16%;width:18%;height:52%;background:linear-gradient(180deg,#3a4554,#1a212a);border-radius:10px;"></div>
      <div class="art-layer" style="right:11%;top:20%;width:14%;height:14%;background:radial-gradient(circle,rgba(255,244,210,0.52),rgba(255,244,210,0.05));border-radius:999px;"></div>
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
  carInterior: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background:url('assets/car-interior-night.png') center center / cover no-repeat;"></div>
      <div class="art-layer" style="inset:0;background:linear-gradient(180deg,rgba(6,8,12,0.14),rgba(3,4,6,0.34));"></div>
      <div class="art-layer" style="inset:0;background:radial-gradient(circle at 50% 28%,rgba(255,255,255,0.06),transparent 28%),radial-gradient(circle at 50% 120%,rgba(0,0,0,0.36),transparent 42%);"></div>
    </div>
  `,
  carInteriorNoBag: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background:url('assets/car-interior-no-bag.png') center center / cover no-repeat;"></div>
      <div class="art-layer" style="inset:0;background:linear-gradient(180deg,rgba(6,8,12,0.14),rgba(3,4,6,0.34));"></div>
      <div class="art-layer" style="inset:0;background:radial-gradient(circle at 50% 28%,rgba(255,255,255,0.06),transparent 28%),radial-gradient(circle at 50% 120%,rgba(0,0,0,0.36),transparent 42%);"></div>
    </div>
  `,
  carInteriorCloseupKeys: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background:url('assets/car-ignition-with-keys.png') center center / cover no-repeat;"></div>
      <div class="art-layer" style="inset:0;background:linear-gradient(180deg,rgba(4,5,8,0.1),rgba(2,3,5,0.28));"></div>
    </div>
  `,
  carInteriorCloseupEmpty: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background:url('assets/car-ignition-empty.png') center center / cover no-repeat;"></div>
      <div class="art-layer" style="inset:0;background:linear-gradient(180deg,rgba(4,5,8,0.1),rgba(2,3,5,0.28));"></div>
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

// expose a global `scenes` map that other scripts will populate
window.scenes = window.scenes || {};

function promptCode(message) {
  const input = window.prompt(message);
  if (input === null) return null;
  return input.trim();
}

function normalizeResidentialPassword(value) {
  return value.replace(/[\s&]+/g, "").toUpperCase();
}

// keep variable references available for legacy code that expects them
var sceneArt = window.sceneArt;
var scenes = window.scenes;
