(function () {
  const EDITOR_AVAILABLE = false;
  const STORAGE_KEY = "horrorgame-hotspot-overrides-v1";
  const RECENT_DRAG_MS = 320;
  const CHINESE_SCENE_FILE_MAP = {
    carInterior: "js/scenes/ground.js",
    parkingLot: "js/scenes/ground.js",
    entrance: "js/scenes/ground.js",
    entranceMailbox: "js/scenes/ground.js",
    entranceKeypad: "js/scenes/ground.js",
    hallway: "js/scenes/lobby.js",
    stairwell: "js/scenes/lobby.js",
    secondFloorHall: "js/scenes/lobby.js",
    upperStairwell: "js/scenes/upper.js",
    thirdFloorHall: "js/scenes/upper.js",
    thirdFloorResidential: "js/scenes/upper.js",
    escapeStairwell: "js/scenes/escape_normal.js",
    hallwayNormal: "js/scenes/escape_normal.js",
    stairwellNormal: "js/scenes/escape_normal.js",
    secondFloorHallNormal: "js/scenes/escape_normal.js",
    upperStairwellNormal: "js/scenes/escape_normal.js",
    thirdFloorHallNormal: "js/scenes/escape_normal.js",
    thirdFloorResidentialNormal: "js/scenes/escape_normal.js",
    dinnerTableScene: "js/scenes/escape_normal.js",
    mainMenu: "js/scenes/menu.js",
    chapter3Entry: "js/scenes/menu.js",
    fleeEnding: "js/scenes/endings.js",
    badEnding: "js/scenes/endings.js",
    failedEscapeEnding: "js/scenes/endings.js",
    normalEnding: "js/scenes/endings.js",
    goodEndingQuestion: "js/scenes/endings.js",
    chapter2UneasyReunionEnding: "js/scenes/endings.js",
    chapter2WaitWifeEnding: "js/scenes/endings.js",
    chapter2BloodCradleEnding: "js/scenes/endings.js",
    chapter2MonsterReturnEnding: "js/scenes/endings.js",
    chapter2GunEnding: "js/scenes/endings.js",
    chapter2Entry: "js/scenes/chapter2/entry.js",
    chapter2WardHallway: "js/scenes/chapter2/entry.js",
    chapter2ParkingLot: "js/scenes/chapter2/entry.js",
    chapter2DriveHome: "js/scenes/chapter2/entry.js",
    chapter2CarAtApartment: "js/scenes/chapter2/apartment.js",
    chapter2Entrance: "js/scenes/chapter2/apartment.js",
    chapter2Hallway: "js/scenes/chapter2/apartment.js",
    chapter2FireExitStairwell: "js/scenes/chapter2/apartment.js",
    chapter2StairwellNormal: "js/scenes/chapter2/apartment.js",
    chapter2SecondFloorHall: "js/scenes/chapter2/apartment.js",
    chapter2UpperStairwell: "js/scenes/chapter2/apartment.js",
    chapter2ThirdFloorHall: "js/scenes/chapter2/apartment.js",
    chapter2SecondFloorResidential: "js/scenes/chapter2/apartment.js",
    chapter2PropertyDutyRoom: "js/scenes/chapter2/apartment.js",
    chapter2ThirdFloorResidential: "js/scenes/chapter2/apartment.js",
    chapter2HomeDusty: "js/scenes/chapter2/apartment.js",
    chapter2Bedroom: "js/scenes/chapter2/apartment.js",
    chapter2EchoJudgment: "js/scenes/chapter2/apartment.js"
  };

  const editorState = {
    enabled: false,
    loaded: false,
    selectedKey: "",
    selectedRect: null,
    panelEl: null,
    statusEl: null,
    detailEl: null,
    feedbackEl: null,
    dragRecords: new Map(),
    overrides: {},
    projectDirHandle: null
  };

  function readOverrides() {
    if (editorState.loaded) return;
    editorState.loaded = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      editorState.overrides = raw ? JSON.parse(raw) : {};
    } catch {
      editorState.overrides = {};
    }
  }

  function saveOverrides() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(editorState.overrides));
    } catch {
      // Keep runtime behavior even if storage is blocked.
    }
  }

  function toNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function round2(value) {
    return Math.round(value * 100) / 100;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function makeKey(sceneId, hotspotId) {
    return `${sceneId}::${hotspotId}`;
  }

  function normalizeRect(rect) {
    const nextW = clamp(round2(toNumber(rect.w, 0)), 1, 100);
    const nextH = clamp(round2(toNumber(rect.h, 0)), 1, 100);
    const nextX = clamp(round2(toNumber(rect.x, 0)), 0, 100 - nextW);
    const nextY = clamp(round2(toNumber(rect.y, 0)), 0, 100 - nextH);
    return { x: nextX, y: nextY, w: nextW, h: nextH };
  }

  function parseRectFromElement(spotEl) {
    const x = toNumber(spotEl.style.left.replace("%", ""), 0);
    const y = toNumber(spotEl.style.top.replace("%", ""), 0);
    const w = toNumber(spotEl.style.width.replace("%", ""), 10);
    const h = toNumber(spotEl.style.height.replace("%", ""), 10);
    return normalizeRect({ x, y, w, h });
  }

  function applyRectToElement(spotEl, rect) {
    spotEl.style.left = `${rect.x}%`;
    spotEl.style.top = `${rect.y}%`;
    spotEl.style.width = `${rect.w}%`;
    spotEl.style.height = `${rect.h}%`;
  }

  function getOverride(sceneId, hotspotId) {
    readOverrides();
    return editorState.overrides[makeKey(sceneId, hotspotId)] || null;
  }

  function setOverride(sceneId, hotspotId, rect) {
    readOverrides();
    const key = makeKey(sceneId, hotspotId);
    editorState.overrides[key] = normalizeRect(rect);
    saveOverrides();
  }

  function clearOverridesForScene(sceneId) {
    readOverrides();
    Object.keys(editorState.overrides).forEach((key) => {
      if (key.startsWith(`${sceneId}::`)) {
        delete editorState.overrides[key];
      }
    });
    saveOverrides();
  }

  function getCurrentSceneId() {
    return window.state?.currentScene || "";
  }

  function getSceneOverrides(sceneId) {
    readOverrides();
    const overrides = {};
    Object.entries(editorState.overrides).forEach(([key, rect]) => {
      if (!key.startsWith(`${sceneId}::`)) return;
      const hotspotId = key.slice(sceneId.length + 2);
      overrides[hotspotId] = rect;
    });
    return overrides;
  }

  function getLocale() {
    return document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "zh";
  }

  function getSceneSourcePath(sceneId) {
    if (getLocale() === "en") return "js/en/scenes.js";
    return CHINESE_SCENE_FILE_MAP[sceneId] || "";
  }

  function setFeedback(message, isError = false) {
    if (!editorState.feedbackEl) return;
    editorState.feedbackEl.textContent = message;
    editorState.feedbackEl.classList.toggle("is-error", isError);
  }

  function formatRectNumber(value) {
    const rounded = round2(value);
    return Number.isInteger(rounded) ? String(rounded) : String(rounded);
  }

  async function ensureProjectDirectoryHandle() {
    if (editorState.projectDirHandle) return editorState.projectDirHandle;
    if (typeof window.showDirectoryPicker !== "function") {
      throw new Error("当前浏览器不支持目录写入，请使用 Chromium 浏览器并通过 localhost 打开。");
    }

    editorState.projectDirHandle = await window.showDirectoryPicker({
      mode: "readwrite",
      startIn: "documents"
    });
    setFeedback("已连接项目目录，可以保存当前场景到源码。");
    return editorState.projectDirHandle;
  }

  async function getFileHandleByRelativePath(rootHandle, relativePath) {
    const segments = relativePath.split("/");
    let currentHandle = rootHandle;

    for (let i = 0; i < segments.length - 1; i += 1) {
      currentHandle = await currentHandle.getDirectoryHandle(segments[i]);
    }

    return currentHandle.getFileHandle(segments[segments.length - 1], { create: false });
  }

  function findMatchingBracket(text, startIndex, openChar, closeChar) {
    let depth = 0;
    let quote = "";
    let escaping = false;
    let lineComment = false;
    let blockComment = false;

    for (let i = startIndex; i < text.length; i += 1) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (lineComment) {
        if (char === "\n") lineComment = false;
        continue;
      }

      if (blockComment) {
        if (char === "*" && nextChar === "/") {
          blockComment = false;
          i += 1;
        }
        continue;
      }

      if (quote) {
        if (escaping) {
          escaping = false;
          continue;
        }
        if (char === "\\") {
          escaping = true;
          continue;
        }
        if (char === quote) {
          quote = "";
        }
        continue;
      }

      if (char === "/" && nextChar === "/") {
        lineComment = true;
        i += 1;
        continue;
      }

      if (char === "/" && nextChar === "*") {
        blockComment = true;
        i += 1;
        continue;
      }

      if (char === "'" || char === "\"" || char === "`") {
        quote = char;
        continue;
      }

      if (char === openChar) depth += 1;
      if (char === closeChar) {
        depth -= 1;
        if (depth === 0) return i;
      }
    }

    return -1;
  }

  function findObjectRangeContaining(text, blockStart, targetIndex) {
    const stack = [];
    let quote = "";
    let escaping = false;
    let lineComment = false;
    let blockComment = false;

    for (let i = blockStart; i <= targetIndex; i += 1) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (lineComment) {
        if (char === "\n") lineComment = false;
        continue;
      }

      if (blockComment) {
        if (char === "*" && nextChar === "/") {
          blockComment = false;
          i += 1;
        }
        continue;
      }

      if (quote) {
        if (escaping) {
          escaping = false;
          continue;
        }
        if (char === "\\") {
          escaping = true;
          continue;
        }
        if (char === quote) {
          quote = "";
        }
        continue;
      }

      if (char === "/" && nextChar === "/") {
        lineComment = true;
        i += 1;
        continue;
      }

      if (char === "/" && nextChar === "*") {
        blockComment = true;
        i += 1;
        continue;
      }

      if (char === "'" || char === "\"" || char === "`") {
        quote = char;
        continue;
      }

      if (char === "{") stack.push(i);
      if (char === "}") stack.pop();
    }

    const objectStart = stack[stack.length - 1];
    if (typeof objectStart !== "number") return null;

    const objectEnd = findMatchingBracket(text, objectStart, "{", "}");
    if (objectEnd === -1) return null;

    return { start: objectStart, end: objectEnd };
  }

  function updateHotspotObjectText(objectText, rect, newline) {
    const lines = objectText.split(newline);
    const filteredLines = lines.filter((line) => !/^\s*[xywh]\s*:/.test(line));
    const anchorIndex = filteredLines.findIndex((line) => /\blabel\s*:/.test(line));
    const fallbackIndex = filteredLines.findIndex((line) => /\bid\s*:/.test(line));
    const insertAt = Math.max(anchorIndex === -1 ? fallbackIndex + 1 : anchorIndex + 1, 1);
    const indentMatch = filteredLines[Math.max(insertAt - 1, 0)]?.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : "        ";
    const coordLine = `${indent}x: ${formatRectNumber(rect.x)}, y: ${formatRectNumber(rect.y)}, w: ${formatRectNumber(rect.w)}, h: ${formatRectNumber(rect.h)},`;
    filteredLines.splice(insertAt, 0, coordLine);
    return filteredLines.join(newline);
  }

  function writeOverridesIntoSceneSource(sourceText, sceneId, overrides) {
    const sceneMarker = `window.scenes.${sceneId} = {`;
    const sceneStart = sourceText.indexOf(sceneMarker);
    if (sceneStart === -1) {
      throw new Error(`没有在源码里找到场景 ${sceneId}。`);
    }

    const sceneObjectStart = sourceText.indexOf("{", sceneStart);
    const sceneObjectEnd = findMatchingBracket(sourceText, sceneObjectStart, "{", "}");
    if (sceneObjectEnd === -1) {
      throw new Error(`场景 ${sceneId} 的源码结构无法解析。`);
    }

    const sceneText = sourceText.slice(sceneStart, sceneObjectEnd + 1);
    const hotspotsIndex = sceneText.indexOf("hotspots()");
    if (hotspotsIndex === -1) {
      throw new Error(`场景 ${sceneId} 没有 hotspots()。`);
    }

    const arrayStart = sceneText.indexOf("[", hotspotsIndex);
    if (arrayStart === -1) {
      throw new Error(`场景 ${sceneId} 的热点数组无法解析。`);
    }

    const arrayEnd = findMatchingBracket(sceneText, arrayStart, "[", "]");
    if (arrayEnd === -1) {
      throw new Error(`场景 ${sceneId} 的热点数组没有正常闭合。`);
    }

    const newline = sourceText.includes("\r\n") ? "\r\n" : "\n";
    let hotspotsText = sceneText.slice(arrayStart, arrayEnd + 1);

    Object.entries(overrides).forEach(([hotspotId, rect]) => {
      const idNeedle = `id: "${hotspotId}"`;
      const idIndex = hotspotsText.indexOf(idNeedle);
      if (idIndex === -1) {
        throw new Error(`场景 ${sceneId} 里没有找到热点 ${hotspotId}。`);
      }

      const objectRange = findObjectRangeContaining(hotspotsText, 0, idIndex);
      if (!objectRange) {
        throw new Error(`热点 ${hotspotId} 的对象边界无法解析。`);
      }

      const objectText = hotspotsText.slice(objectRange.start, objectRange.end + 1);
      const nextObjectText = updateHotspotObjectText(objectText, rect, newline);
      hotspotsText =
        hotspotsText.slice(0, objectRange.start) +
        nextObjectText +
        hotspotsText.slice(objectRange.end + 1);
    });

    const nextSceneText =
      sceneText.slice(0, arrayStart) +
      hotspotsText +
      sceneText.slice(arrayEnd + 1);

    return sourceText.slice(0, sceneStart) + nextSceneText + sourceText.slice(sceneObjectEnd + 1);
  }

  async function saveCurrentSceneToSource() {
    const sceneId = getCurrentSceneId();
    if (!sceneId) {
      setFeedback("当前没有可保存的场景。", true);
      return;
    }

    const overrides = getSceneOverrides(sceneId);
    const overrideCount = Object.keys(overrides).length;
    if (!overrideCount) {
      setFeedback("当前场景没有待保存的热点改动。", true);
      return;
    }

    const relativePath = getSceneSourcePath(sceneId);
    if (!relativePath) {
      setFeedback(`还没有给场景 ${sceneId} 配置源码文件映射。`, true);
      return;
    }

    try {
      const rootHandle = await ensureProjectDirectoryHandle();
      const fileHandle = await getFileHandleByRelativePath(rootHandle, relativePath);
      const file = await fileHandle.getFile();
      const sourceText = await file.text();
      const nextSourceText = writeOverridesIntoSceneSource(sourceText, sceneId, overrides);
      const writable = await fileHandle.createWritable();
      await writable.write(nextSourceText);
      await writable.close();
      clearOverridesForScene(sceneId);
      window.render?.();
      setFeedback(`已把 ${sceneId} 的 ${overrideCount} 个热点写回 ${relativePath}。`);
    } catch (error) {
      setFeedback(error?.message || "保存到源码失败。", true);
    }
  }

  function updatePanelDetails() {
    if (!editorState.panelEl || !editorState.statusEl || !editorState.detailEl) return;

    editorState.panelEl.classList.toggle("is-active", editorState.enabled);
    editorState.statusEl.textContent = editorState.enabled ? "编辑模式: 开启" : "编辑模式: 关闭";

    if (!editorState.selectedRect || !editorState.selectedKey) {
      editorState.detailEl.textContent = "未选择热点";
      return;
    }

    const r = editorState.selectedRect;
    editorState.detailEl.textContent = `${editorState.selectedKey}\n x:${r.x}% y:${r.y}% w:${r.w}% h:${r.h}%`;
  }

  function selectSpot(spotEl) {
    if (!spotEl) return;
    const sceneId = spotEl.dataset.sceneId;
    const hotspotId = spotEl.dataset.id;
    if (!sceneId || !hotspotId) return;

    editorState.selectedKey = `${sceneId}/${hotspotId}`;
    editorState.selectedRect = parseRectFromElement(spotEl);
    updatePanelDetails();
  }

  function markRecentlyDragged(spotEl) {
    const sceneId = spotEl.dataset.sceneId;
    const hotspotId = spotEl.dataset.id;
    if (!sceneId || !hotspotId) return;
    editorState.dragRecords.set(makeKey(sceneId, hotspotId), Date.now());
  }

  function mountPanel() {
    if (editorState.panelEl) return;

    const panel = document.createElement("aside");
    panel.className = "hotspot-edit-panel";
    panel.innerHTML = `
      <p class="hotspot-edit-title">Hotspot Editor</p>
      <p class="hotspot-edit-status">编辑模式: 关闭</p>
      <p class="hotspot-edit-hint">快捷键 Ctrl + Shift + H 切换。编辑模式可拖动和拉伸热点框。</p>
      <pre class="hotspot-edit-detail">未选择热点</pre>
      <p class="hotspot-edit-feedback">尚未连接项目目录。</p>
      <div class="hotspot-edit-actions">
        <button type="button" class="hotspot-edit-btn" data-action="choose-project">选择项目目录</button>
        <button type="button" class="hotspot-edit-btn" data-action="save-scene">保存当前场景到源码</button>
        <button type="button" class="hotspot-edit-btn" data-action="clear-scene">清空当前场景</button>
        <button type="button" class="hotspot-edit-btn" data-action="clear-all">清空全部</button>
      </div>
    `;

    panel.addEventListener("click", (event) => {
      const button = event.target.closest(".hotspot-edit-btn");
      if (!button) return;

      const action = button.dataset.action;
      if (action === "choose-project") {
        ensureProjectDirectoryHandle().catch((error) => {
          setFeedback(error?.message || "选择项目目录失败。", true);
        });
        return;
      }

      if (action === "save-scene") {
        saveCurrentSceneToSource();
        return;
      }

      if (action === "clear-scene") {
        const sceneId = getCurrentSceneId();
        if (!sceneId) return;
        clearOverridesForScene(sceneId);
        setFeedback(`已清空 ${sceneId} 的本地热点覆盖。`);
        window.render?.();
        return;
      }

      if (action === "clear-all") {
        editorState.overrides = {};
        saveOverrides();
        setFeedback("已清空全部本地热点覆盖。");
        window.render?.();
      }
    });

    document.body.appendChild(panel);
    editorState.panelEl = panel;
    editorState.statusEl = panel.querySelector(".hotspot-edit-status");
    editorState.detailEl = panel.querySelector(".hotspot-edit-detail");
    editorState.feedbackEl = panel.querySelector(".hotspot-edit-feedback");
    updatePanelDetails();
  }

  function updateSceneVisualState(sceneEl) {
    if (!sceneEl) return;
    sceneEl.classList.toggle("hotspot-edit-mode", editorState.enabled);
  }

  function installInteractBindings() {
    if (typeof window.interact !== "function") return;

    window.interact(".hotspot").draggable({
      listeners: {
        move(event) {
          if (!editorState.enabled) return;
          const spotEl = event.target;
          const sceneEl = spotEl.closest(".scene");
          if (!sceneEl) return;

          const sceneRect = sceneEl.getBoundingClientRect();
          if (!sceneRect.width || !sceneRect.height) return;

          const current = parseRectFromElement(spotEl);
          const dxPercent = (event.dx / sceneRect.width) * 100;
          const dyPercent = (event.dy / sceneRect.height) * 100;
          const next = normalizeRect({
            x: current.x + dxPercent,
            y: current.y + dyPercent,
            w: current.w,
            h: current.h
          });

          applyRectToElement(spotEl, next);
          editorState.selectedRect = next;
          selectSpot(spotEl);
        },
        end(event) {
          if (!editorState.enabled) return;
          const spotEl = event.target;
          const sceneId = spotEl.dataset.sceneId;
          const hotspotId = spotEl.dataset.id;
          if (!sceneId || !hotspotId) return;
          const rect = parseRectFromElement(spotEl);
          setOverride(sceneId, hotspotId, rect);
          markRecentlyDragged(spotEl);
          selectSpot(spotEl);
          setFeedback(`已记录 ${sceneId}/${hotspotId} 的新位置，记得保存到源码。`);
        }
      }
    }).resizable({
      edges: { left: true, right: true, top: true, bottom: true },
      listeners: {
        move(event) {
          if (!editorState.enabled) return;
          const spotEl = event.target;
          const sceneEl = spotEl.closest(".scene");
          if (!sceneEl) return;

          const sceneRect = sceneEl.getBoundingClientRect();
          if (!sceneRect.width || !sceneRect.height) return;

          const current = parseRectFromElement(spotEl);
          const deltaX = (event.deltaRect.left / sceneRect.width) * 100;
          const deltaY = (event.deltaRect.top / sceneRect.height) * 100;
          const next = normalizeRect({
            x: current.x + deltaX,
            y: current.y + deltaY,
            w: (event.rect.width / sceneRect.width) * 100,
            h: (event.rect.height / sceneRect.height) * 100
          });

          applyRectToElement(spotEl, next);
          editorState.selectedRect = next;
          selectSpot(spotEl);
        },
        end(event) {
          if (!editorState.enabled) return;
          const spotEl = event.target;
          const sceneId = spotEl.dataset.sceneId;
          const hotspotId = spotEl.dataset.id;
          if (!sceneId || !hotspotId) return;
          const rect = parseRectFromElement(spotEl);
          setOverride(sceneId, hotspotId, rect);
          markRecentlyDragged(spotEl);
          selectSpot(spotEl);
          setFeedback(`已记录 ${sceneId}/${hotspotId} 的新尺寸，记得保存到源码。`);
        }
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (!editorState.enabled) return;
      const spotEl = event.target.closest(".hotspot");
      if (!spotEl) return;
      selectSpot(spotEl);
    });
  }

  function toggleEditor() {
    editorState.enabled = !editorState.enabled;
    updatePanelDetails();

    const sceneEl = document.querySelector("#scene");
    updateSceneVisualState(sceneEl);

    if (!editorState.enabled) {
      editorState.selectedRect = null;
      editorState.selectedKey = "";
      updatePanelDetails();
    }

    window.render?.();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "h" && event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      toggleEditor();
    }
  });

  if (!EDITOR_AVAILABLE) {
    window.HotspotEditor = {
      isEnabled() {
        return false;
      },
      getSpotRect(sceneId, spot) {
        void sceneId;
        return spot;
      },
      afterRender(sceneId, sceneEl) {
        void sceneId;
        void sceneEl;
      },
      shouldSuppressClick(event) {
        void event;
        return false;
      }
    };
    return;
  }

  mountPanel();
  installInteractBindings();

  window.HotspotEditor = {
    isEnabled() {
      return editorState.enabled;
    },
    getSpotRect(sceneId, spot) {
      const override = getOverride(sceneId, spot.id);
      if (!override) return spot;
      return { ...spot, ...override };
    },
    afterRender(sceneId, sceneEl) {
      void sceneId;
      updateSceneVisualState(sceneEl);
      if (!editorState.enabled) return;

      const allHotspots = sceneEl?.querySelectorAll(".hotspot") || [];
      allHotspots.forEach((spotEl) => {
        const sceneForSpot = spotEl.dataset.sceneId;
        const hotspotId = spotEl.dataset.id;
        if (!sceneForSpot || !hotspotId) return;
        const override = getOverride(sceneForSpot, hotspotId);
        if (!override) return;
        applyRectToElement(spotEl, override);
      });
    },
    shouldSuppressClick(event) {
      if (editorState.enabled) return true;
      const spotEl = event.target.closest(".hotspot");
      if (!spotEl) return false;
      const sceneId = spotEl.dataset.sceneId;
      const hotspotId = spotEl.dataset.id;
      const key = makeKey(sceneId, hotspotId);
      const lastTime = editorState.dragRecords.get(key) || 0;
      return Date.now() - lastTime < RECENT_DRAG_MS;
    }
  };
})();
