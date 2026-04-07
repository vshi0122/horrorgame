window.scenes = window.scenes || {};

const MENU_ENDING_CATALOG = [
  { id: "badEnding", order: 1, name: "失陷", teaser: "你没能从三楼居民区脱身。" },
  { id: "failedEscapeEnding", order: 2, name: "门外之物", teaser: "你到达出口，却没有真正离开。" },
  { id: "normalEnding", order: 3, name: "离开公寓", teaser: "你活着走出去了，但仍带着缺口。" },
  { id: "goodEndingQuestion", order: 4, name: "醒来？", teaser: "你似乎抗达了更深的答案。" },
  { id: "fleeEnding", order: 5, name: "奔逃", teaser: "你选择不进入那栋楼。" },
  { id: "chapter2UneasyReunionEnding", order: 6, name: "静默重逢", teaser: "你和她重逢了，但这份平静像一层薄薄的假象。" },
  { id: "chapter2WaitWifeEnding", order: 7, name: "客厅守候", teaser: "你看见了破败现实，却仍坐在客厅等她回家。" },
  { id: "chapter2BloodCradleEnding", order: 8, name: "血色摇篮", teaser: "你没吃药就抽到恶魔牌，婴儿床与重逢一起被血染透。" },
  { id: "chapter2MonsterReturnEnding", order: 9, name: "回廊旧影", teaser: "你在吃药后抽到恶魔牌，第一章的怪物再次破门扑来。" }
];

const MENU_DOCUMENT_TOTAL = 6;

function buildMainMenuHome() {
  const chapter2Unlocked = hasChapter2Access();

  const chapter2Action = chapter2Unlocked
    ? '<button class="menu-action" type="button" data-action="start-chapter2">第二章：回声住户</button>'
    : '<button class="menu-action" type="button" disabled title="达成“醒来？”结局后解锁">第二章：回声住户（未解锁）</button>';

  return `
    <section class="scene-overlay menu-overlay" aria-label="主界面">
      <div class="menu-home">
        <p class="menu-kicker">A Point &amp; Click Horror Game</p>
        <h2 class="menu-title">${chapter2Unlocked ? "降临之日：回声" : "降临之日"}</h2>
        <p class="menu-tagline">${chapter2Unlocked
          ? "你已经穿过最深的一层。现在，选择是否进入第二章，继续面对被你改写过的记忆。"
          : "深夜醒来。公寓楼静立车前。<br>选择再次走进那个夜晚，或翻阅你已经带出的记忆。"}
        </p>
        <div class="menu-divider"></div>
        <nav class="menu-actions">
          <button class="menu-action menu-primary" type="button" data-action="start-game">再次醒来</button>
          ${chapter2Action}
          <button class="menu-action" type="button" data-action="open-endings">结局图鉴</button>
          <button class="menu-action" type="button" data-action="open-documents">文本图鉴</button>
        </nav>
        <footer class="menu-footer">
          <div class="menu-stat">
            <span class="menu-stat-value">${getUnlockedEndingCount()}&thinsp;/&thinsp;${MENU_ENDING_CATALOG.length}</span>
            <span class="menu-stat-label">已解锁结局</span>
          </div>
          <div class="menu-stat-sep"></div>
          <div class="menu-stat">
            <span class="menu-stat-value">${getUnlockedDocumentCount()}&thinsp;/&thinsp;${MENU_DOCUMENT_TOTAL}</span>
            <span class="menu-stat-label">已收录文本</span>
          </div>
        </footer>
      </div>
      <div class="menu-lang-switch">
        <a class="menu-lang-link active" href="index.html">中文</a>
        <span class="menu-lang-sep">·</span>
        <a class="menu-lang-link" href="index-en.html">EN</a>
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
        <p class="archive-index">结局 ${ending.order}</p>
        <h4 class="archive-title">${unlocked ? ending.name : "？？？"}</h4>
        <p class="archive-copy">${unlocked ? ending.teaser : "尚未抵达这个结局。"}</p>
      </article>
    `;
  }).join("");

  return `
    <section class="scene-overlay menu-overlay menu-overlay-archive" aria-label="结局图鉴">
      <div class="archive-page">
        <header class="archive-topnav">
          <nav class="archive-breadcrumb">
            <span class="archive-breadcrumb-home">降临之日</span>
            <span class="archive-breadcrumb-sep">›</span>
            <span class="archive-breadcrumb-current">结局图鉴</span>
          </nav>
          <div class="archive-topnav-right">
            <span class="archive-count">已解锁 ${getUnlockedEndingCount()}&thinsp;/&thinsp;${MENU_ENDING_CATALOG.length}</span>
            <button class="menu-action archive-back" type="button" data-action="go-home">返回主界面</button>
          </div>
        </header>
        <div class="archive-content">
          <h2 class="archive-section-title">结局图鉴</h2>
          <p class="archive-section-subtitle">探索不同路线，解锁所有结局。封锁的结局需要你亲自抗达才能见到。</p>
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
    : '<p class="documents-empty">你还没有带出任何文本。在游戏中检查文本道具后内容会开始留档。</p>';

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
          <h4>文本图鉴</h4>
          <p class="archive-document-meta">尚未收录</p>
          <div class="archive-document-body">继续探索，找到更多纸页、通知与留言，它们会在这里永久留档。</div>
        </article>
      `;

  return `
    <section class="scene-overlay menu-overlay menu-overlay-archive" aria-label="文本图鉴">
      <div class="archive-page">
        <header class="archive-topnav">
          <nav class="archive-breadcrumb">
            <span class="archive-breadcrumb-home">降临之日</span>
            <span class="archive-breadcrumb-sep">›</span>
            <span class="archive-breadcrumb-current">文本图鉴</span>
          </nav>
          <div class="archive-topnav-right">
            <span class="archive-count">已收录 ${getUnlockedDocumentCount()}&thinsp;/&thinsp;${MENU_DOCUMENT_TOTAL}</span>
            <button class="menu-action archive-back" type="button" data-action="go-home">返回主界面</button>
          </div>
        </header>
        <div class="archive-content">
          <h2 class="archive-section-title">文本图鉴</h2>
          <p class="archive-section-subtitle">在游戏中检查文本道具后，相关内容将在此永久留档。</p>
          <div class="archive-documents-layout">
            <div class="archive-document-list">${entries}</div>
            ${detail}
          </div>
        </div>
      </div>
    </section>
  `;
}

window.scenes.mainMenu = {
  title: "主界面",
  hint: hasChapter2Access()
    ? "你已经抵达“醒来？”结局。主界面发生了变化。"
    : "黑暗尚未完全散去，你可以再次醒来，或先回看那些已被你带出的痕迹。",
  objective() {
    if (state.menuTab === "endings") return `浏览已解锁结局 ${getUnlockedEndingCount()}/${MENU_ENDING_CATALOG.length}。`;
    if (state.menuTab === "documents") return `浏览已收录文本 ${getUnlockedDocumentCount()}/${MENU_DOCUMENT_TOTAL}。`;
    return hasChapter2Access() ? "第二章已解锁。你可以继续深入，或回看图鉴。" : "选择再次醒来，或进入图鉴。";
  },
  message() {
    if (state.menuTab === "endings") return "有些门已经被你推开，有些还没有。";
    if (state.menuTab === "documents") return "字条不会自己说话，但你可以把它们重新排成线索。";
    return hasChapter2Access() ? "你已经醒过一次。接下来，轮到你回头。" : "每一次醒来，都只是从另一个入口重新开始。";
  },
  hotspots() {
    return [];
  },
  overlay() {
    if (state.menuTab === "endings") return buildEndingArchive();
    if (state.menuTab === "documents") return buildDocumentArchive();
    return buildMainMenuHome();
  }
};
