// 简易本地存储工具，替代后端API，支持资料、文章、分类、评论

const KEYS = {
  profile: 'blog_profile',
  articles: 'blog_articles',
  categories: 'blog_categories',
  comments: 'blog_comments_map' // 形如 { [articleId]: Comment[] }
};

const defaultProfile = {
  name: '测试保存',
  title: '后端改为纯前端模式',
  intro: '这里是我的个人简介。现在使用纯前端存储，数据保存在浏览器的 localStorage 中。',
  email: '',
  wechat: '',
  avatar: ''
};

const defaultCategories = [
  { id: 1, name: '技术分享', description: '分享前端、后端、算法等技术文章' },
  { id: 2, name: '生活随笔', description: '记录生活中的点点滴滴' },
  { id: 3, name: '资源记录', description: '记录平日积累的资源' },
  { id: 4, name: '项目经验', description: '项目开发中的经验和教训' }
];

const defaultArticles = [
  {
    id: 1,
    title: 'Vue 3 Composition API 最佳实践',
    publishTime: '2024-01-15T00:00:00.000Z',
    categoryId: 1,
    excerpt: 'Vue 3 的 Composition API 为我们提供了更灵活的组件逻辑组织方式，本文将分享在实际项目中的最佳实践...',
    tags: ['Vue3', 'Composition API', '前端开发'],
    views: 1234,
    comments: 2,
    content: `
      <div class="rich-content">
        <p>在 Vue 3 中，Composition API 为我们提供了更灵活的组件逻辑组织方式。本文将介绍常用模式与实践建议。</p>
        <h2>为什么使用 Composition API？</h2>
        <ul>
          <li>更好的逻辑复用</li>
          <li>更清晰的依赖与数据流</li>
          <li>更友好的类型推断</li>
        </ul>
        <p>结合 <code>ref</code>、<code>computed</code> 与 <code>watch</code>，可以构建高内聚、低耦合模块。</p>
      </div>
    `
  },
  {
    id: 2,
    title: '如何高效学习新技术栈',
    publishTime: '2024-01-10T00:00:00.000Z',
    categoryId: 3,
    excerpt: '在技术快速迭代的今天，如何高效地学习新技术栈成为每个开发者都需要面对的挑战。本文分享一些学习方法和经验...',
    tags: ['学习方法', '职业发展'],
    views: 890,
    comments: 1,
    content: `
      <div class="rich-content">
        <p>学习新技术需要目标驱动与项目实践。制定小目标并持续输出，总结经验。</p>
        <h2>实践建议</h2>
        <ul>
          <li>搭建最小可行项目（MVP）</li>
          <li>记录踩坑与解决方案</li>
          <li>刻意练习核心概念</li>
        </ul>
      </div>
    `
  },
  {
    id: 3,
    title: 'Node.js 性能优化技巧',
    publishTime: '2024-01-05T00:00:00.000Z',
    categoryId: 2,
    excerpt: 'Node.js 作为服务端 JavaScript 运行环境，其性能优化一直是开发者关注的焦点。本文将介绍一些实用的性能优化技巧...',
    tags: ['Node.js', '性能优化', '后端开发'],
    views: 1567,
    comments: 3,
    content: `
      <div class="rich-content">
        <p>优化 Node.js 性能可以从 I/O、并发与监控入手。合理使用缓存与异步队列。</p>
        <h2>常见方向</h2>
        <ul>
          <li>使用集群与负载均衡</li>
          <li>Profile 与监控瓶颈</li>
          <li>适当引入缓存（Redis 等）</li>
        </ul>
      </div>
    `
  }
];

// 新增：一次性迁移旧分类名称（id=3）到“资源记录”
function maybeMigrateCategories() {
  try {
    const raw = localStorage.getItem(KEYS.categories);
    if (!raw) return;
    const cats = JSON.parse(raw);
    let changed = false;
    cats.forEach(c => {
      if (c && c.id === 3 && c.name === '读书笔记') {
        c.name = '资源记录';
        c.description = '记录平日积累的资源';
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem(KEYS.categories, JSON.stringify(cats));
    }
  } catch {}
}

// 初始化本地数据（仅在首次缺失时）
const HOME_KEY = 'blog_home_cfg'
const defaultHomeConfig = { title: '我的个人博客', subtitle: '记录生活，分享知识' }
function ensureSeeded() {
  if (!localStorage.getItem(KEYS.profile)) {
    localStorage.setItem(KEYS.profile, JSON.stringify(defaultProfile));
  }
  if (!localStorage.getItem(KEYS.categories)) {
    localStorage.setItem(KEYS.categories, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(KEYS.articles)) {
    localStorage.setItem(KEYS.articles, JSON.stringify(defaultArticles));
  }
  if (!localStorage.getItem(KEYS.comments)) {
    const initial = {
      1: [
        { id: 1, author: '小明', time: '2024-01-16T08:00:00.000Z', content: '写得很清晰，受教了！', likes: 12 },
        { id: 2, author: '小红', time: '2024-01-16T09:30:00.000Z', content: 'Composition API 的例子很实用。', likes: 5 }
      ],
      2: [
        { id: 1, author: '读者A', time: '2024-01-11T10:00:00.000Z', content: '学习方法对我很有帮助！', likes: 3 }
      ],
      3: [
        { id: 1, author: '后端爱好者', time: '2024-01-06T12:00:00.000Z', content: '优化建议很到位。', likes: 8 },
        { id: 2, author: '路人甲', time: '2024-01-06T13:15:00.000Z', content: '准备试试这些技巧。', likes: 2 },
        { id: 3, author: '性能控', time: '2024-01-06T15:20:00.000Z', content: '不错的总结！', likes: 6 }
      ]
    };
    localStorage.setItem(KEYS.comments, JSON.stringify(initial));
  }
  if (!localStorage.getItem(HOME_KEY)) {
    localStorage.setItem(HOME_KEY, JSON.stringify(defaultHomeConfig));
  }
}

ensureSeeded();
maybeMigrateCategories();

// Profile
export function getProfile() {
  try {
    const raw = localStorage.getItem(KEYS.profile);
    return raw ? JSON.parse(raw) : { ...defaultProfile };
  } catch {
    return { ...defaultProfile };
  }
}

export function setProfile(profile) {
  localStorage.setItem(KEYS.profile, JSON.stringify(profile));
}

// Categories
export function getCategories() {
  try {
    const raw = localStorage.getItem(KEYS.categories);
    return raw ? JSON.parse(raw) : [...defaultCategories];
  } catch {
    return [...defaultCategories];
  }
}

export function setCategories(categories) {
  localStorage.setItem(KEYS.categories, JSON.stringify(categories));
}

// Articles
export function getArticles() {
  try {
    const raw = localStorage.getItem(KEYS.articles);
    return raw ? JSON.parse(raw) : [...defaultArticles];
  } catch {
    return [...defaultArticles];
  }
}

export function setArticles(articles) {
  localStorage.setItem(KEYS.articles, JSON.stringify(articles));
}

export function getArticleById(id) {
  const list = getArticles();
  return list.find(a => a.id === Number(id)) || null;
}

export function getPrevNext(id) {
  const list = getArticles().sort((a, b) => a.id - b.id);
  const idx = list.findIndex(a => a.id === Number(id));
  return {
    prev: idx > 0 ? { id: list[idx - 1].id, title: list[idx - 1].title } : null,
    next: idx >= 0 && idx < list.length - 1 ? { id: list[idx + 1].id, title: list[idx + 1].title } : null
  };
}

// Comments
export function getCommentsMap() {
  try {
    const raw = localStorage.getItem(KEYS.comments);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setCommentsMap(map) {
  localStorage.setItem(KEYS.comments, JSON.stringify(map));
}

export function getComments(articleId) {
  const map = getCommentsMap();
  return map[articleId] ? map[articleId] : [];
}

export function addComment(articleId, content, author = '当前用户') {
  const map = getCommentsMap();
  const list = map[articleId] || [];
  const newItem = {
    id: list.length ? Math.max(...list.map(c => c.id)) + 1 : 1,
    author,
    time: new Date().toISOString(),
    content,
    likes: 0
  };
  const newList = [...list, newItem];
  map[articleId] = newList;
  setCommentsMap(map);
  return newItem;
}

export function likeComment(articleId, commentId) {
  const map = getCommentsMap();
  const list = map[articleId] || [];
  const idx = list.findIndex(c => c.id === commentId);
  if (idx >= 0) {
    list[idx].likes += 1;
    map[articleId] = list;
    setCommentsMap(map);
  }
}

// 新增：重置全部数据为默认值
export function resetAll() {
  try {
    localStorage.removeItem(KEYS.profile);
    localStorage.removeItem(KEYS.categories);
    localStorage.removeItem(KEYS.articles);
    localStorage.removeItem(KEYS.comments);
    ensureSeeded();
    maybeMigrateCategories();
  } catch (e) {
    console.error('重置本地数据失败:', e);
  }
}

export function getHomeConfig() {
  try {
    const raw = localStorage.getItem(HOME_KEY);
    return raw ? JSON.parse(raw) : { ...defaultHomeConfig };
  } catch {
    return { ...defaultHomeConfig };
  }
}

export function setHomeConfig(cfg) {
  localStorage.setItem(HOME_KEY, JSON.stringify(cfg));
}