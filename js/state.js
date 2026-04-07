const baseNotes = [
  "深夜，你在公寓楼下的车里醒来。",
  "妻子提醒你回家前别忘了买番茄酱。"
];

const ENDING_STORAGE_KEY = "horrorgame-unlocked-endings";
const DOCUMENT_STORAGE_KEY = "horrorgame-unlocked-documents";

const initialState = () => ({
  currentScene: "mainMenu",
  inventory: [],
  notes: [...baseNotes],
  documents: [],
  selectedDocumentId: null,
  menuTab: "home",
  selectedArchiveDocumentId: null,
  flags: {
    wokeUp: false,
    trunkOpened: false,
    mailboxOpened: false,
    codeDiscovered: false,
    buildingEntered: false,
    thirdFloorVisited: false,
    stairwellBlocked: false,
    residentialUnlocked: false,
    corpseExamined: false,
    creatureExamined: false,
    homeDoorExamined: false,
    creatureAlerted: false,
    fleePromptShown: false,
    chapter2WokeInWard: false,
    chapter2DoctorTalked: false,
    chapter2GotMedicine: false,
    chapter2AskedPstd: false,
    chapter2AskedCause: false,
    chapter2AskedMedicine: false,
    chapter2InquiryFinished: false,
    chapter2MailboxOpened: false,
    chapter2DutyComputerUsed: false,
    chapter2FirstFloorFireExitUnlocked: false,
    chapter2ThirdFloorFireExitUnlocked: false,
    chapter2MedicineUsed: false,
    chapter2TarotChoice: "",
    chapter2PendingEnding: "",
    powerOutage: false,
    normalAfterOutage: false,
    dinnerKetchupGiven: false,
    leavePromptShown: false
  }
});

let state = initialState();

function readUnlockedEndings() {
  try {
    const raw = window.localStorage.getItem(ENDING_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUnlockedEndings(endingIds) {
  try {
    window.localStorage.setItem(ENDING_STORAGE_KEY, JSON.stringify(endingIds));
  } catch {
    // Ignore storage failures so gameplay still works.
  }
}

function unlockEnding(endingId) {
  const unlockedEndings = readUnlockedEndings();
  if (unlockedEndings.includes(endingId)) return unlockedEndings;

  const nextUnlockedEndings = [...unlockedEndings, endingId];
  writeUnlockedEndings(nextUnlockedEndings);
  return nextUnlockedEndings;
}

function getUnlockedEndingCount() {
  return readUnlockedEndings().length;
}

function hasUnlockedEnding(endingId) {
  return readUnlockedEndings().includes(endingId);
}

function readUnlockedDocuments() {
  try {
    const raw = window.localStorage.getItem(DOCUMENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUnlockedDocuments(documents) {
  try {
    window.localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
  } catch {
    // Ignore storage failures so gameplay still works.
  }
}

function unlockDocument(document) {
  const unlockedDocuments = readUnlockedDocuments();
  if (unlockedDocuments.some((entry) => entry.id === document.id)) {
    return unlockedDocuments;
  }

  const nextUnlockedDocuments = [...unlockedDocuments, document];
  writeUnlockedDocuments(nextUnlockedDocuments);
  return nextUnlockedDocuments;
}

function getUnlockedDocuments() {
  return readUnlockedDocuments();
}

function getUnlockedDocumentCount() {
  return readUnlockedDocuments().length;
}

function setMenuTab(tab, selectedDocumentId = null) {
  state.menuTab = tab;
  state.selectedArchiveDocumentId = selectedDocumentId;
}

function openMainMenu(tab = "home", selectedDocumentId = null) {
  state = initialState();
  state.currentScene = "mainMenu";
  state.menuTab = tab;
  state.selectedArchiveDocumentId = selectedDocumentId;
  messageTextEl.innerHTML = scenes.mainMenu.message();
  render();
}

function startNewGame() {
  state = initialState();
  state.currentScene = "carInterior";
  messageTextEl.innerHTML = scenes.carInterior.message();
  render();
}

function addNote(note) {
  if (!state.notes.includes(note)) {
    state.notes.push(note);
  }
}

function acquireItem(item) {
  if (!state.inventory.includes(item)) {
    state.inventory.push(item);
  }
}

function removeItem(item) {
  state.inventory = state.inventory.filter((entry) => entry !== item);
}

function hasItem(item) {
  return state.inventory.includes(item);
}

function collectDocument(document) {
  const existing = state.documents.find((entry) => entry.id === document.id);
  if (!existing) {
    state.documents.push(document);
  }
  unlockDocument(document);
  state.selectedDocumentId = document.id;
}

function selectDocument(documentId) {
  state.selectedDocumentId = documentId;
  renderDocuments();
}
