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
      <div class="art-layer" style="left:0;right:0;top:0;height:54%;background:linear-gradient(180deg,#161f29 0%,#0e141b 100%);"></div>
      <div class="art-layer" style="left:0;right:0;bottom:0;height:46%;background:linear-gradient(180deg,#0d0f13 0%,#07080b 100%);"></div>
      <div class="art-layer" style="left:10%;bottom:14%;width:56%;height:26%;background:linear-gradient(180deg,#2d333a,#15181d);border-radius:30px;"></div>
      <div class="art-layer" style="right:9%;top:16%;width:18%;height:52%;background:linear-gradient(180deg,#2d2926,#12100f);border-radius:10px;"></div>
      <div class="art-layer" style="right:11%;top:20%;width:14%;height:14%;background:radial-gradient(circle,rgba(255,223,168,0.6),rgba(255,223,168,0.05));border-radius:999px;"></div>
    </div>
  `,

  carInterior: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/car.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  entrance: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/gate.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  entranceMailbox: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/letterbox.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  entranceKeypad: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/pin.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  parkingLot: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/parkinglot.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  hallway: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/1st floor.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  stairwell: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/1 passing.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  secondFloorHall: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/2nd floor.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  upperStairwell: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/2nd passing.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  upperStairwellBlocked: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/back.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  blockedStairwellPhoto: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.08), rgba(8,10,12,0.28)), url('js/images/picture.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  thirdFloorHall: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/3rd floor.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  thirdFloorHallFlashlight: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/3rd floor.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  thirdFloorHallBlackout: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.1), rgba(8,10,12,0.22)), url('js/images/fake3rd.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  upperStairwellBlackout: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.12), rgba(8,10,12,0.28)), url('js/images/back.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  fourthFloorQuestion: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.12), rgba(8,10,12,0.28)), url('js/images/smell.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  monsterStare: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.16), rgba(8,10,12,0.34)), url('js/images/monster.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  thirdFloorResidential: () => `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('${state.flags.creatureAlerted ? "js/images/3rd run.jpg" : "js/images/3rd resident.jpg"}');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  escapeStairwell: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/ladder.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  hallwayNormal: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.14), rgba(8,10,12,0.36)), url('js/images/1st floor.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  stairwellNormal: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.1), rgba(8,10,12,0.28)), url('js/images/1 passing.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  secondFloorHallNormal: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.1), rgba(8,10,12,0.24)), url('js/images/2nd floor good.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  upperStairwellNormal: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.1), rgba(8,10,12,0.28)), url('js/images/1 passing.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  thirdFloorHallNormal: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.1), rgba(8,10,12,0.24)), url('js/images/3rd floor good.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  thirdFloorResidentialNormal: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.1), rgba(8,10,12,0.26)), url('js/images/3rd resident good.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  dinnerTableScene: `
    <div class="room-art">
      <div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.08), rgba(8,10,12,0.22)), url('js/images/home.jpg');background-size:cover;background-position:center center;"></div>
    </div>
  `,
  badEnding: `
    <div class="room-art"><div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.12), rgba(8,10,12,0.42)), url('js/images/bad ending.png');background-size:cover;background-position:center center;"></div></div>
  `,
  monsterCaughtIntro: `
    <div class="room-art"><div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.12), rgba(8,10,12,0.42)), url('js/images/bad ending.png');background-size:cover;background-position:center center;"></div></div>
  `,
  failedEscapeIntro: `
    <div class="room-art"><div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.12), rgba(8,10,12,0.42)), url('js/images/badending2.png');background-size:cover;background-position:center center;"></div></div>
  `,
  failedEscapeEnding: `
    <div class="room-art"><div class="art-layer" style="inset:0;background-image:linear-gradient(180deg, rgba(8,10,12,0.12), rgba(8,10,12,0.42)), url('js/images/badending2.png');background-size:cover;background-position:center center;"></div></div>
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
