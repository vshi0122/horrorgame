const baseNotes = [
  "Late at night, you wake up in your car beneath the apartment building.",
  "Your wife reminded you not to forget the ketchup before coming home."
];

const ENDING_STORAGE_KEY = "horrorgame-unlocked-endings-en";
const DOCUMENT_STORAGE_KEY = "horrorgame-unlocked-documents-en";
const DOCUMENT_SEEN_STORAGE_KEY = "horrorgame-seen-documents-en";
const DECISION_COUNTERS_STORAGE_KEY = "horrorgame-decision-counters-en";
const ENDING_COUNTERS_STORAGE_KEY = "horrorgame-ending-counters-en";

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
    entranceView: "main",
    codeDiscovered: false,
    buildingEntered: false,
    thirdFloorVisited: false,
    stairwellBlocked: false,
    stairwellPhotoJumpscarePlayed: false,
    stairwellPhotoReactionPending: false,
    thirdFloorBlackoutIntroPlayed: false,
    thirdFloorFlashlightEnabled: false,
    firstFakeThirdFloorSeen: false,
    residentialUnlocked: false,
    corpseExamined: false,
    creatureExamined: false,
    homeDoorExamined: false,
    creatureAlerted: false,
    fleePromptShown: false,
    chapter2WokeInWard: false,
    chapter2DoctorTalked: false,
    chapter2GotMedicine: false,
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

Object.defineProperty(window, "state", {
  configurable: true,
  get() {
    return state;
  }
});

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

function readCounterMap(storageKey) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeCounterMap(storageKey, counters) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(counters));
  } catch {
    // Ignore storage failures so gameplay still works.
  }
}

function incrementCounter(storageKey, counterId) {
  if (!counterId) return;
  const counters = readCounterMap(storageKey);
  counters[counterId] = (counters[counterId] || 0) + 1;
  writeCounterMap(storageKey, counters);
}

function incrementDecisionCounter(decisionId) {
  incrementCounter(DECISION_COUNTERS_STORAGE_KEY, decisionId);
}

function incrementEndingCounter(endingId) {
  incrementCounter(ENDING_COUNTERS_STORAGE_KEY, endingId);
}

function getDecisionCounters() {
  return readCounterMap(DECISION_COUNTERS_STORAGE_KEY);
}

function getEndingCounters() {
  return readCounterMap(ENDING_COUNTERS_STORAGE_KEY);
}

function getChoiceCounters() {
  return {
    decisions: getDecisionCounters(),
    endings: getEndingCounters()
  };
}

function resetChoiceCounters() {
  writeCounterMap(DECISION_COUNTERS_STORAGE_KEY, {});
  writeCounterMap(ENDING_COUNTERS_STORAGE_KEY, {});
}

window.getChoiceCounters = getChoiceCounters;
window.resetChoiceCounters = resetChoiceCounters;

function writeUnlockedDocuments(documents) {
  try {
    window.localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
  } catch {
    // Ignore storage failures so gameplay still works.
  }
}

function readSeenDocumentIds() {
  try {
    const raw = window.localStorage.getItem(DOCUMENT_SEEN_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSeenDocumentIds(documentIds) {
  try {
    window.localStorage.setItem(DOCUMENT_SEEN_STORAGE_KEY, JSON.stringify(documentIds));
  } catch {
    // Ignore storage failures so gameplay still works.
  }
}

function markDocumentSeen(documentId) {
  if (!documentId) return;
  const seenDocumentIds = readSeenDocumentIds();
  if (seenDocumentIds.includes(documentId)) return;
  writeSeenDocumentIds([documentId, ...seenDocumentIds]);
}

function isDocumentSeen(documentId) {
  if (!documentId) return false;
  return readSeenDocumentIds().includes(documentId);
}

function unlockDocument(document) {
  const unlockedDocuments = readUnlockedDocuments();
  const existingIndex = unlockedDocuments.findIndex((entry) => entry.id === document.id);
  if (existingIndex === -1) {
    const nextUnlockedDocuments = [document, ...unlockedDocuments];
    writeUnlockedDocuments(nextUnlockedDocuments);
    return nextUnlockedDocuments;
  }

  const existingDocument = unlockedDocuments[existingIndex];
  const unchanged =
    existingDocument.title === document.title &&
    existingDocument.source === document.source &&
    existingDocument.body === document.body;

  if (unchanged) {
    return unlockedDocuments;
  }

  const nextUnlockedDocuments = [
    document,
    ...unlockedDocuments.filter((entry) => entry.id !== document.id)
  ];
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
  if (tab === "documents") {
    state.selectedArchiveDocumentId = selectedDocumentId || getUnlockedDocuments()[0]?.id || null;
  } else {
    state.selectedArchiveDocumentId = selectedDocumentId;
  }
  if (tab === "documents" && selectedDocumentId) {
    markDocumentSeen(selectedDocumentId);
  }
}

function openMainMenu(tab = "home", selectedDocumentId = null) {
  state = initialState();
  state.currentScene = "mainMenu";
  state.menuTab = tab;
  state.selectedArchiveDocumentId = tab === "documents"
    ? (selectedDocumentId || getUnlockedDocuments()[0]?.id || null)
    : selectedDocumentId;
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
  const existingIndex = state.documents.findIndex((entry) => entry.id === document.id);
  const previousSessionDocument = existingIndex === -1 ? null : state.documents[existingIndex];
  const shouldPlayDocSound = !previousSessionDocument || previousSessionDocument.title !== document.title || previousSessionDocument.source !== document.source || previousSessionDocument.body !== document.body;
  if (existingIndex === -1) {
    state.documents.unshift(document);
  } else {
    state.documents.splice(existingIndex, 1);
    state.documents.unshift(document);
  }
  unlockDocument(document);
  state.selectedDocumentId = document.id;
  state.selectedArchiveDocumentId = document.id;
  if (shouldPlayDocSound && typeof window.playUiSound === "function") {
    window.playUiSound("doc");
  }
}

function selectDocument(documentId) {
  state.selectedDocumentId = documentId;
  markDocumentSeen(documentId);
  renderDocuments();
}
