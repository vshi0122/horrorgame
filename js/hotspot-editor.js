(function () {
  const STORAGE_KEY = "horrorgame-hotspot-overrides-v1";
  const RECENT_DRAG_MS = 320;

  const editorState = {
    enabled: false,
    loaded: false,
    selectedKey: "",
    selectedRect: null,
    panelEl: null,
    statusEl: null,
    detailEl: null,
    dragRecords: new Map(),
    overrides: {}
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
      <div class="hotspot-edit-actions">
        <button type="button" class="hotspot-edit-btn" data-action="clear-scene">清空当前场景</button>
        <button type="button" class="hotspot-edit-btn" data-action="clear-all">清空全部</button>
      </div>
    `;

    panel.addEventListener("click", (event) => {
      const button = event.target.closest(".hotspot-edit-btn");
      if (!button) return;

      const action = button.dataset.action;
      if (action === "clear-scene") {
        const sceneId = window.state?.currentScene;
        if (!sceneId) return;
        readOverrides();
        Object.keys(editorState.overrides).forEach((key) => {
          if (key.startsWith(`${sceneId}::`)) {
            delete editorState.overrides[key];
          }
        });
        saveOverrides();
        window.render?.();
      }

      if (action === "clear-all") {
        editorState.overrides = {};
        saveOverrides();
        window.render?.();
      }
    });

    document.body.appendChild(panel);
    editorState.panelEl = panel;
    editorState.statusEl = panel.querySelector(".hotspot-edit-status");
    editorState.detailEl = panel.querySelector(".hotspot-edit-detail");
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
