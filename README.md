# DC 博客前端

一个基于 Vue 3 + Vite 的轻量博客前端，包含首页、分类、标签、文章详情、关于等页面。已完成主题变量统一、响应式排版和移动端优化，并解决文章封面重复出现在正文中的问题。

## 亮点功能
- 全局主题变量：`--color-primary`、`--color-text`、`--color-muted` 等，保证全站色彩一致。
- 响应式排版：大量使用 `clamp()` 控制标题与正文在不同设备上的字号。
- 移动端适配：统一断点、触控区域和过渡动画，提升小屏体验。
- Markdown/HTML 安全渲染：在详情页中对与封面相同的图片进行过滤，避免封面重复进入正文；同时约束正文图片不超过内容宽度。
- 性能优化：封面图 `loading="lazy"` 与 `decoding="async"`，尽量减少首屏阻塞。

## 目录结构
- `src/views/`：页面级组件（Home、Category、Tags、ArticleDetail、About）
- `src/utils/storage.js`：模拟数据存取
- `src/style.css`：全局样式与主题变量

## 本地开发
```bash
npm install
npm run dev
# 访问 http://localhost:5174/
```

## 构建
```bash
npm run build
```

## 部署（GitHub Pages 示例）
- 远程仓库：`origin https://github.com/Cheng-222/Cheng-222.github.io.git`
- 直接推送到 `master`（或 `main`），GitHub Pages 会从仓库根或 `docs/` 目录提供静态站点。

## 最近改动摘要
- Category/Tags/ArticleDetail/About：替换硬编码颜色为主题变量，统一按钮与文本色，优化 hover/active
- ArticleDetail：新增 `sanitizedMarkdown`/`sanitizedLegacyHtml`，过滤与封面相同的图片；正文图片加入最大宽度与自适应
- About：统计数字与按钮统一使用主题色

## 许可证
此项目供学习与求职展示使用。
