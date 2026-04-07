// Chapter 2 inquiry dialogue overlay + action handler
function buildChapter2InquiryOverlay() {
  if (state.currentScene !== "chapter2Entry") return "";
  if (!state.flags.chapter2GotMedicine || state.flags.chapter2InquiryFinished) return "";

  const askedCount = [state.flags.chapter2AskedPstd, state.flags.chapter2AskedCause, state.flags.chapter2AskedMedicine].filter(Boolean).length;

  return `
    <section class="scene-overlay chapter2-dialogue-overlay" aria-label="问询对话">
      <article class="chapter2-dialogue-card">
        <p class="chapter2-dialogue-kicker">问询对话</p>
        <h3 class="chapter2-dialogue-title">你还想问什么？</h3>
        <p class="chapter2-dialogue-copy">你可以先提问再离开病房。已提问 ${askedCount}/3。</p>
        <div class="chapter2-dialogue-actions">
          <button class="menu-action chapter2-dialogue-action" type="button" data-action="chapter2-ask-ptsd">问：PTSD 是什么意思？</button>
          <button class="menu-action chapter2-dialogue-action" type="button" data-action="chapter2-ask-cause">问：病因为什么被涂黑？</button>
          <button class="menu-action chapter2-dialogue-action" type="button" data-action="chapter2-ask-medicine">问：如果不吃药会怎样？</button>
        </div>
        <button class="menu-action menu-primary chapter2-dialogue-finish" type="button" data-action="chapter2-finish-inquiry">结束问询</button>
      </article>
    </section>
  `;
}

window.handleSceneMenuAction = function handleSceneMenuAction(action) {
  if (state.currentScene !== "chapter2Entry") return false;

  if (action === "chapter2-ask-ptsd") {
    if (!state.flags.chapter2AskedPstd) {
      state.flags.chapter2AskedPstd = true;
      showMessage("医生说：\"创伤后应激障碍。你会反复回到同一天，并把现实改写成你能承受的样子。\"");
    } else {
      showMessage("你已经问过 PTSD 的含义了。");
    }
    return true;
  }

  if (action === "chapter2-ask-cause") {
    if (!state.flags.chapter2AskedCause) {
      state.flags.chapter2AskedCause = true;
      showMessage("医生沉默几秒：\"那一栏现在还不是你能直接看的内容。先把你愿意承认的部分说出来。\"");
    } else {
      showMessage("医生没有再重复这个问题的答案。");
    }
    return true;
  }

  if (action === "chapter2-ask-medicine") {
    if (!state.flags.chapter2AskedMedicine) {
      state.flags.chapter2AskedMedicine = true;
      showMessage("医生说：\"你可以不吃，但你会更快滑回循环里。药不能治好过去，只能让你别再逃。\"");
    } else {
      showMessage("你已经听过用药风险了。");
    }
    return true;
  }

  if (action === "chapter2-finish-inquiry") {
    const askedCount = [state.flags.chapter2AskedPstd, state.flags.chapter2AskedCause, state.flags.chapter2AskedMedicine].filter(Boolean).length;
    if (askedCount === 0) {
      showMessage("你还没有提问。至少问一个问题再走。");
      return true;
    }

    state.flags.chapter2InquiryFinished = true;
    showMessage("你结束了问询。医生点点头：\"去吧，别再绕开那一天。\"");
    render();
    return true;
  }

  return false;
};
