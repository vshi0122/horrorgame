# 降临之日

一个基于原生 HTML、CSS、JavaScript 制作的中文指向点击恐怖游戏原型。

玩家会从车里醒来，进入公寓，逐层向上调查，在恐怖分支与“恢复正常”的分支之间推进剧情，并触发不同结局。

## 本地运行

直接打开 [index.html](D:/工作相关/game2/index.html) 即可游玩。

如果你想用本地服务器运行，也可以在项目目录执行：

```powershell
python -m http.server 8000
```

然后访问：

`http://localhost:8000`

## 项目结构

- `index.html`：页面入口
- `style.css`：整体视觉样式
- `js/state.js`：游戏状态与物品/文本管理
- `js/scenes.js`：场景、美术层、热点与剧情逻辑
- `js/ui.js`：界面渲染
- `js/main.js`：事件绑定与场景切换
- `vercel.json`：Vercel 静态部署配置

## 部署到 Vercel

这个项目是纯静态前端，部署到 Vercel 时不需要构建命令。

1. 打开 [Vercel](https://vercel.com/)
2. 用 GitHub 登录
3. 选择 `Add New...` -> `Project`
4. 导入仓库 `vshi0122/horrorgame`
5. `Framework Preset` 选择 `Other`
6. `Build Command` 留空
7. `Output Directory` 留空
8. 点击 `Deploy`

部署完成后，Vercel 会给你一个公开链接，其他人可以直接打开游玩。

## 部署到 GitHub Pages

如果你更想用 GitHub Pages：

1. 打开仓库设置
2. 进入 `Pages`
3. 选择 `Deploy from a branch`
4. 分支选 `master`
5. 文件夹选 `/ (root)`

## 当前内容

- 车里 -> 公寓门口 -> 一楼/二楼/三楼探索
- 信箱文本、物业通知、旧报纸等可回看文本
- 三楼居民区追逐与逃生分支
- 停电后返回一楼的离开分支
- 正常版楼层、回家、餐桌、黑白标志结局
- 多个坏结局、一般结局、好结局？
