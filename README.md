# AgriPro DIPM — 榴莲综合虫害管理（中文版）

一款可安装、可离线运行的 PWA，专为榴莲园虫害管理而设。
使用 **React 18 + Vite + Tailwind CSS** 构建，通过 `vite-plugin-pwa` 实现真正的离线支持。

> 这是 [`agripro-dipm-en`](https://github.com/stanleywoosweeleong/agripro-dipm-en) 的中文版。

## 功能特点

- **真正的 PWA** — 可安装到 Android、iOS、桌面。首次访问后即可离线使用。
- **生产级 Tailwind** — 已剔除未使用样式并压缩，无 CDN 警告。
- **自动部署到 GitHub Pages** —— 每次 push 到 `main` 分支后通过 GitHub Actions 自动构建发布。
- **内置诊断插图** — 叶片卷曲诊断图为内嵌 SVG 矢量图，无需 AI 服务、无 API 密钥、无网络请求，瞬间渲染，完全离线可用。

---

## 首次安装（约 5 分钟）

需要先安装 [Node.js](https://nodejs.org/) v18 以上版本。

```bash
# 安装依赖（只需一次）
npm install
```

## 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173`。修改 `src/App.jsx` 后自动热加载。

## 生产构建（本地预览）

```bash
npm run build
npm run preview
```

`preview` 命令会运行已构建的 `dist/` 目录 —— 用来测试 Service Worker 与 PWA 安装提示（这些功能仅在生产构建中生效）。

---

## 部署到 GitHub Pages

### 1. 创建仓库

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<你的用户名>/agripro-dipm.git
git push -u origin main
```

### 2. 启用 GitHub Pages

在 GitHub 仓库页面：**Settings → Pages → Build and deployment → Source: GitHub Actions**。

完成后，`.github/workflows/deploy.yml` 中的工作流会在每次 push 到 `main` 时自动构建并发布。站点访问地址为：

```
https://<你的用户名>.github.io/agripro-dipm/
```

### 仓库名不同？

工作流会自动检测仓库名并设置 Vite 的 `base`。若仓库名不同或使用自定义域名，请编辑 `vite.config.js`：

```js
const base = process.env.BASE || '/your-repo-name/';
// 或自定义域名 / 用户页面：
const base = process.env.BASE || '/';
```

---

## 在手机上安装（Android / iOS）

**Android Chrome：** 打开站点 URL → 出现「安装应用」提示，或通过三点菜单 →「添加到主屏幕」。

**iOS Safari：** 打开 URL → 分享按钮 →「添加到主屏幕」。

安装后即可像原生应用一样启动，首次访问后即可离线使用，每次推送新版本时自动更新。

---

## 项目结构

```
agripro-dipm/
├── .github/workflows/deploy.yml   # CI：自动构建并部署
├── public/                        # PWA 图标、favicon、robots.txt
├── src/
│   ├── App.jsx                    # 主应用（包含所有逻辑与数据）
│   ├── main.jsx                   # React 入口 + Service Worker 注册
│   └── index.css                  # Tailwind 指令 + 安全区域处理
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js                 # Vite + PWA manifest 配置
```

## 更新流程

1. 修改 `src/App.jsx`。
2. `git add . && git commit -m "你的说明" && git push`。
3. GitHub Actions 自动构建发布（约 1–2 分钟）。
4. 已安装 PWA 的用户在下次启动时自动获取新版本。

---

## English summary

This is the Chinese (`zh-CN`) edition of the AgriPro DIPM PWA. Structure and tooling are identical to the English edition ([`agripro-dipm-en`](https://github.com/stanleywoosweeleong/agripro-dipm-en)); only the UI strings and pest content language differ. Build, deploy, and PWA install steps work the same way.
