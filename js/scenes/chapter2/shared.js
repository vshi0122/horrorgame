// Chapter 2 shared access gate
window.CHAPTER2_UNLOCK_ENDING_ID = "goodEndingQuestion";

function hasChapter2Access() {
  return hasUnlockedEnding(window.CHAPTER2_UNLOCK_ENDING_ID);
}
