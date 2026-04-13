# Day of Arrival | 降临之日

[中文](#中文说明) | [English](#english)

---

## 中文说明

### 项目简介

**降临之日** 是一个使用原生 `HTML`、`CSS` 和 `JavaScript` 制作的点选式恐怖解谜网页游戏原型。

玩家会在深夜从车内惊醒，回到一栋气氛异常的公寓楼，逐层探索场景、收集物品、阅读文档、触发异变，并在不同选择下走向不同结局。

### 当前特色

- 原生前端实现，无需框架和构建工具
- 提供中文与英文两个独立入口页面
- 点选热点交互，推进调查、拾取、阅读与分支剧情
- 带目标提示、物品栏、线索列表、文档查看器等 UI
- 包含背景音乐、环境音、音效与 jumpscare 表现
- 带首次进入教程提示，便于新玩家快速上手
- 附带一个独立的 `demo.html` 作为早期交互/场景原型

### 入口文件

- 中文版：`index.html`
- 英文版：`index-en.html`
- 原型演示：`demo.html`

### 本地运行

这是一个纯静态项目，最简单的方式是直接在浏览器中打开入口文件。

也推荐使用本地静态服务器运行，以避免某些浏览器对资源加载或音频行为的限制：

```powershell
python -m http.server 8000
```

然后访问：

- `http://localhost:8000/index.html`
- `http://localhost:8000/index-en.html`

### 操作方式

- 点击场景中的高亮区域进行调查
- 收集关键道具并推进目标
- 在右侧查看已发现文档内容
- 结合线索与场景变化寻找正确路线
- 使用顶部按钮返回主界面或重新开始

### 项目结构

```text
.
├─ index.html                 # 中文版入口
├─ index-en.html              # 英文版入口
├─ demo.html                  # 独立原型页
├─ style.css                  # 全局样式与界面表现
├─ vercel.json                # Vercel 静态部署配置
└─ js/
   ├─ main.js                 # 中文版主逻辑、音效、过场、教程等
   ├─ state.js                # 中文版状态与文本/物品数据
   ├─ ui.js                   # 中文版界面渲染
   ├─ hotspot-editor.js       # 热点编辑辅助脚本
   ├─ en/
   │  ├─ main.js              # 英文版主逻辑
   │  ├─ state.js             # 英文版状态数据
   │  ├─ scenes.js            # 英文版场景逻辑
   │  └─ ui.js                # 英文版界面渲染
   ├─ scenes/
   │  ├─ base.js              # 场景基础能力
   │  ├─ menu.js              # 主菜单场景
   │  ├─ ground.js            # 楼外/地面相关场景
   │  ├─ lobby.js             # 大厅与低层区域
   │  ├─ upper.js             # 高层探索相关场景
   │  ├─ escape_normal.js     # 逃生/正常路线片段
   │  ├─ endings.js           # 结局内容
   │  └─ chapter2/            # 第二章节内容
   ├─ images/                 # 场景图片与素材
   └─ sounds/                 # 背景音乐与音效资源
```

### 技术说明

- 使用原生 `HTML/CSS/JavaScript`
- 无打包流程、无安装依赖
- 通过 CDN 引入 `interact.js`
- 适合部署到任意静态托管平台

### 部署

#### 部署到 Vercel

这个项目不需要构建命令，可直接作为静态站点部署。

1. 登录 [Vercel](https://vercel.com/)
2. 导入本仓库
3. `Framework Preset` 选择 `Other`
4. `Build Command` 留空
5. `Output Directory` 留空
6. 点击 `Deploy`

#### 部署到 GitHub Pages

1. 打开仓库的 `Settings`
2. 进入 `Pages`
3. 在 `Build and deployment` 中选择 `Deploy from a branch`
4. 选择你的分支与根目录 `/ (root)`
5. 保存后等待页面发布

### 适合继续扩展的方向

- 增加更多分支与多结局条件
- 补充存档/读档功能
- 为英文版补齐与中文版一致的最新场景结构
- 增加移动端交互优化与可访问性支持
- 添加作者信息、版本日志和截图展示

---

## English

### Overview

**Day of Arrival** is a point-and-click horror puzzle game prototype built with plain `HTML`, `CSS`, and `JavaScript`.

The player wakes up in a car late at night, returns to a disturbing apartment building, explores floor by floor, collects items, reads notes, uncovers strange events, and reaches different endings depending on the route taken.

### Features

- Built with vanilla frontend technologies only
- Separate Chinese and English entry pages
- Point-and-click hotspot interactions for exploration and story progression
- UI panels for objectives, inventory, clues, and discovered documents
- Background music, ambient effects, SFX, and jumpscare sequences
- First-time tutorial overlay for smoother onboarding
- Includes a standalone `demo.html` prototype page

### Entry Files

- Chinese version: `index.html`
- English version: `index-en.html`
- Prototype demo: `demo.html`

### Run Locally

This is a fully static project, so you can open the entry files directly in your browser.

For more reliable asset loading and audio behavior, running a local static server is recommended:

```powershell
python -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/index-en.html`

### How to Play

- Click highlighted areas in the scene to investigate
- Collect key items and follow the current objective
- Read discovered documents from the side panel
- Use clues and environmental changes to find the correct route
- Use the top buttons to return to the main menu or restart

### Project Structure

```text
.
├─ index.html                 # Chinese entry page
├─ index-en.html              # English entry page
├─ demo.html                  # Standalone prototype page
├─ style.css                  # Global styling and visual effects
├─ vercel.json                # Vercel static deployment config
└─ js/
   ├─ main.js                 # Chinese gameplay logic, audio, transitions, tutorial
   ├─ state.js                # Chinese state, items, and text data
   ├─ ui.js                   # Chinese UI rendering
   ├─ hotspot-editor.js       # Hotspot editing helper
   ├─ en/
   │  ├─ main.js              # English gameplay logic
   │  ├─ state.js             # English state data
   │  ├─ scenes.js            # English scene logic
   │  └─ ui.js                # English UI rendering
   ├─ scenes/
   │  ├─ base.js              # Shared scene utilities
   │  ├─ menu.js              # Main menu scenes
   │  ├─ ground.js            # Outdoor / ground-level scenes
   │  ├─ lobby.js             # Lobby and lower-floor scenes
   │  ├─ upper.js             # Upper-floor exploration scenes
   │  ├─ escape_normal.js     # Escape / normal route content
   │  ├─ endings.js           # Ending sequences
   │  └─ chapter2/            # Chapter 2 content
   ├─ images/                 # Scene images and visual assets
   └─ sounds/                 # Music and sound effects
```

### Tech Notes

- Plain `HTML`, `CSS`, and `JavaScript`
- No build step and no package installation required
- Uses `interact.js` via CDN
- Can be hosted on any static hosting platform

### Deployment

#### Deploy to Vercel

No build command is required for this project.

1. Sign in to [Vercel](https://vercel.com/)
2. Import this repository
3. Choose `Other` as the `Framework Preset`
4. Leave `Build Command` empty
5. Leave `Output Directory` empty
6. Click `Deploy`

#### Deploy to GitHub Pages

1. Open your repository `Settings`
2. Go to `Pages`
3. Under `Build and deployment`, choose `Deploy from a branch`
4. Select your branch and `/ (root)`
5. Save and wait for the site to publish

### Good Next Steps

- Add more branching routes and ending conditions
- Implement save/load support
- Bring the English version fully in sync with the latest Chinese content
- Improve mobile interaction and accessibility
- Add author credits, changelog, and screenshots
