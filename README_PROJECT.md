# 现代化个人博客（纯前端版）

## 概述

本项目是一个基于 Vue 3 + Vite 的轻量个人博客前端，包含首页、分类、标签、文章详情、关于我、数据管理等页面。数据采用浏览器本地存储（localStorage），无需后端与数据库，便于部署到 GitHub Pages 等静态托管平台。

## 技术栈
- Vue 3、Vue Router 4
- Vite 构建与开发服务器
- 原生 CSS（响应式与主题变量）
- Element Plus 与 md-editor-v3（管理页交互与 Markdown 编辑）

## 目录结构
```
src/
├── views/           # 页面（Home、Category、Tags、ArticleDetail、About、Admin）
├── router/          # 路由定义
├── utils/storage.js # 本地存储工具（资料/文章/分类/评论）
├── App.vue          # 应用根组件
└── main.js          # 应用入口
```

## 开发与构建
```
npm install
npm run dev   # 开发预览，默认 http://localhost:5174/
npm run build # 产出 dist 静态文件
```

## 部署（GitHub Pages）
- 直接推送到 `master`（或 `main`）分支；配套的 CI 会构建并将 `./dist` 发布到 `gh-pages` 分支。
- 访问 `https://<your-username>.github.io/` 查看站点。

## 数据存储说明
- 使用 `src/utils/storage.js` 管理 `profile`、`articles`、`categories`、`commentsMap` 等键值。
- 管理页（`/admin`）支持：资料编辑、文章增删改、分类管理、评论备份/导入。
- 支持导出/导入 JSON 进行数据备份。

## 重要说明（已移除后端）
- 原有后端（Node.js/Express/MySQL）与相关脚本已删除，项目现为纯前端架构。
- 如需接入真实后端，可在未来新增 API 层并替换 `storage.js` 的数据源。

## 最近改动
- 分类页主题化与 UI 统一，详情页过滤与封面相同的图片，移动端适配优化。
- 清理未使用的示例组件与资源，移除后端与验证脚本。

## 许可证
此项目仅用于学习与作品展示。