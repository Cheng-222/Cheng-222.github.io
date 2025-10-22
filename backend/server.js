const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pool, testConnection } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
const mockArticles = [
  {
    id: 1,
    title: 'Vue 3 Composition API 最佳实践',
    content: '<h2>什么是 Composition API？</h2><p>Composition API 是 Vue 3 中引入的新特性...</p>',
    excerpt: 'Vue 3 的 Composition API 为我们提供了更灵活的组件逻辑组织方式...',
    publishTime: '2024-01-15T00:00:00Z',
    categoryId: 1,
    tags: ['Vue3', 'Composition API', '前端开发'],
    views: 1234,
    comments: 56,
    readTime: 8
  },
  {
    id: 2,
    title: '如何高效学习新技术栈',
    content: '<h2>学习方法很重要</h2><p>在技术快速迭代的今天...</p>',
    excerpt: '在技术快速迭代的今天，如何高效地学习新技术栈成为每个开发者都需要面对的挑战...',
    publishTime: '2024-01-10T00:00:00Z',
    categoryId: 3,
    tags: ['学习方法', '职业发展'],
    views: 890,
    comments: 34,
    readTime: 6
  },
  {
    id: 3,
    title: 'Node.js 性能优化技巧',
    content: '<h2>性能优化的重要性</h2><p>Node.js 作为服务端 JavaScript 运行环境...</p>',
    excerpt: 'Node.js 作为服务端 JavaScript 运行环境，其性能优化一直是开发者关注的焦点...',
    publishTime: '2024-01-05T00:00:00Z',
    categoryId: 1,
    tags: ['Node.js', '性能优化', '后端开发'],
    views: 1567,
    comments: 78,
    readTime: 10
  }
];

const mockCategories = [
  { id: 1, name: '技术分享', description: '分享前端、后端、算法等技术文章' },
  { id: 2, name: '生活随笔', description: '记录生活中的点点滴滴' },
  { id: 3, name: '资源记录', description: '记录平日积累的资源' },
  { id: 4, name: '项目经验', description: '项目开发中的经验和教训' }
];

const mockComments = [
  { id: 1, articleId: 1, author: '张三', content: '这篇文章写得真好！', time: '2024-01-16T00:00:00Z', likes: 12 },
  { id: 2, articleId: 1, author: '李四', content: '学到了很多，感谢分享！', time: '2024-01-17T00:00:00Z', likes: 8 }
];

// API 路由

// 获取文章列表
app.get('/api/articles', async (req, res) => {
  try {
    // 尝试从数据库获取数据
    const [rows] = await pool.query('SELECT * FROM articles ORDER BY publishTime DESC');
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    // 使用模拟数据
    res.json(mockArticles);
  }
});

// 获取文章详情
app.get('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: '文章未找到' });
    }
  } catch (error) {
    console.log('使用模拟数据');
    // 使用模拟数据
    const article = mockArticles.find(a => a.id === parseInt(id));
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: '文章未找到' });
    }
  }
});

// 获取分类列表
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    res.json(mockCategories);
  }
});

// 获取特定分类的文章
app.get('/api/categories/:id/articles', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM articles WHERE categoryId = ? ORDER BY publishTime DESC', 
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    const articles = mockArticles.filter(a => a.categoryId === parseInt(id));
    res.json(articles);
  }
});

// 获取标签相关的文章
app.get('/api/tags/:tag/articles', async (req, res) => {
  const { tag } = req.params;
  try {
    // 这里需要根据实际数据库设计来查询
    const [rows] = await pool.query(
      'SELECT * FROM articles WHERE tags LIKE ? ORDER BY publishTime DESC', 
      [`%${tag}%`]
    );
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    const articles = mockArticles.filter(a => a.tags.includes(tag));
    res.json(articles);
  }
});

// 获取文章评论
app.get('/api/articles/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE articleId = ? ORDER BY time DESC', 
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    const comments = mockComments.filter(c => c.articleId === parseInt(id));
    res.json(comments);
  }
});

// 添加评论
app.post('/api/articles/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  
  if (!author || !content) {
    return res.status(400).json({ error: '缺少必要的评论信息' });
  }
  
  const newComment = {
    id: Date.now(), // 临时ID，实际应使用数据库自增ID
    articleId: parseInt(id),
    author,
    content,
    time: new Date().toISOString(),
    likes: 0
  };
  
  try {
    await pool.query(
      'INSERT INTO comments (articleId, author, content, time, likes) VALUES (?, ?, ?, ?, ?)',
      [newComment.articleId, newComment.author, newComment.content, newComment.time, newComment.likes]
    );
    res.status(201).json(newComment);
  } catch (error) {
    console.log('使用模拟数据');
    // 在模拟环境中，我们直接返回新评论
    res.status(201).json(newComment);
  }
});

// 点赞评论
app.post('/api/comments/:id/like', async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('UPDATE comments SET likes = likes + 1 WHERE id = ?', [id]);
    const [rows] = await pool.query('SELECT likes FROM comments WHERE id = ?', [id]);
    res.json({ likes: rows[0].likes });
  } catch (error) {
    console.log('使用模拟数据');
    // 在模拟环境中，我们模拟点赞操作
    res.json({ likes: Math.floor(Math.random() * 100) + 1 });
  }
});

// 模拟数据开关（无数据库时仍可运行）
const USE_MOCK = process.env.USE_MOCK === 'true';

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 现有文章/分类/评论API 保持不变
app.get('/api/articles', async (req, res) => {
  try {
    // 尝试从数据库获取数据
    const [rows] = await pool.query('SELECT * FROM articles ORDER BY publishTime DESC');
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    // 使用模拟数据
    res.json(mockArticles);
  }
});

// 获取文章详情
app.get('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: '文章未找到' });
    }
  } catch (error) {
    console.log('使用模拟数据');
    // 使用模拟数据
    const article = mockArticles.find(a => a.id === parseInt(id));
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: '文章未找到' });
    }
  }
});

// 获取分类列表
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    res.json(mockCategories);
  }
});

// 获取特定分类的文章
app.get('/api/categories/:id/articles', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM articles WHERE categoryId = ? ORDER BY publishTime DESC', 
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    const articles = mockArticles.filter(a => a.categoryId === parseInt(id));
    res.json(articles);
  }
});

// 获取标签相关的文章
app.get('/api/tags/:tag/articles', async (req, res) => {
  const { tag } = req.params;
  try {
    // 这里需要根据实际数据库设计来查询
    const [rows] = await pool.query(
      'SELECT * FROM articles WHERE tags LIKE ? ORDER BY publishTime DESC', 
      [`%${tag}%`]
    );
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    const articles = mockArticles.filter(a => a.tags.includes(tag));
    res.json(articles);
  }
});

// 获取文章评论
app.get('/api/articles/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE articleId = ? ORDER BY time DESC', 
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log('使用模拟数据');
    const comments = mockComments.filter(c => c.articleId === parseInt(id));
    res.json(comments);
  }
});

// 添加评论
app.post('/api/articles/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  
  if (!author || !content) {
    return res.status(400).json({ error: '缺少必要的评论信息' });
  }
  
  const newComment = {
    id: Date.now(), // 临时ID，实际应使用数据库自增ID
    articleId: parseInt(id),
    author,
    content,
    time: new Date().toISOString(),
    likes: 0
  };
  
  try {
    await pool.query(
      'INSERT INTO comments (articleId, author, content, time, likes) VALUES (?, ?, ?, ?, ?)',
      [newComment.articleId, newComment.author, newComment.content, newComment.time, newComment.likes]
    );
    res.status(201).json(newComment);
  } catch (error) {
    console.log('使用模拟数据');
    // 在模拟环境中，我们直接返回新评论
    res.status(201).json(newComment);
  }
});

// 点赞评论
app.post('/api/comments/:id/like', async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('UPDATE comments SET likes = likes + 1 WHERE id = ?', [id]);
    const [rows] = await pool.query('SELECT likes FROM comments WHERE id = ?', [id]);
    res.json({ likes: rows[0].likes });
  } catch (error) {
    console.log('使用模拟数据');
    // 在模拟环境中，我们模拟点赞操作
    res.json({ likes: Math.floor(Math.random() * 100) + 1 });
  }
});

// 新增：个人资料 API（MySQL）
app.get('/api/profile', async (req, res) => {
  if (USE_MOCK) {
    return res.json({
      id: 1,
      name: '技术博主',
      title: '前端工程师 & 技术爱好者',
      intro: '热爱技术，喜欢分享，致力于探索前端技术的无限可能。',
      email: 'example@email.com',
      wechat: 'example_wechat',
      avatar: null
    });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('获取个人资料失败:', error);
    res.status(500).json({ message: 'Failed to get profile' });
  }
});

app.put('/api/profile', async (req, res) => {
  const { name, title, intro, email, wechat, avatar } = req.body || {};

  if (USE_MOCK) {
    return res.json({
      id: 1, name, title, intro, email, wechat, avatar
    });
  }

  try {
    await pool.query(
      'UPDATE profile SET name = ?, title = ?, intro = ?, email = ?, wechat = ?, avatar = ? WHERE id = 1',
      [name || '', title || '', intro || '', email || '', wechat || '', avatar || null]
    );
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    res.json(rows[0]);
  } catch (error) {
    console.error('更新个人资料失败:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 启动服务器
async function startServer() {
  try {
    if (!USE_MOCK) {
      await pool.query('SELECT 1');
      console.log('数据库连接正常');
    } else {
      console.log('使用模拟数据模式运行（USE_MOCK=true）');
    }

    app.listen(PORT, () => {
      console.log(`服务器已启动，端口: ${PORT}`);
      console.log('可用API:');
      console.log('GET  /api/articles');
      console.log('GET  /api/articles/:id');
      console.log('POST /api/articles');
      console.log('GET  /api/categories');
      console.log('GET  /api/comments/:articleId');
      console.log('POST /api/comments/:articleId');
      console.log('POST /api/comments/:id/like');
      console.log('GET  /api/profile');
      console.log('PUT  /api/profile');
      console.log('GET  /api/health');
    });
  } catch (error) {
    console.error('服务器启动失败:', error.message);
    process.exit(1);
  }
}

startServer();