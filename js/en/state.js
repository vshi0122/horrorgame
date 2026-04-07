const baseNotes = [
  "Late at night, you wake up in your car beneath the apartment building.",
  "Your wife reminded you not to forget the ketchup before coming home."
];

const initialState = () => ({
  currentScene: "carInterior",
  inventory: [],
  notes: [...baseNotes],
  documents: [],
  selectedDocumentId: null,
  flags: {
    wokeUp: false,
    trunkOpened: false,
    mailboxOpened: false,
    codeDiscovered: false,
    buildingEntered: false,
    thirdFloorVisited: false,
    stairwellBlocked: false,
    residentialUnlocked: false,
    creatureAlerted: false,
    powerOutage: false,
    normalAfterOutage: false,
    dinnerKetchupGiven: false,
    leavePromptShown: false
  }
});

let state = initialState();

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
  state.selectedDocumentId = document.id;
}

function selectDocument(documentId) {
  state.selectedDocumentId = documentId;
  renderDocuments();
}
