const mysql = require('mysql2/promise');
require('dotenv').config();

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'mysql' // 连接到默认的mysql数据库以创建新数据库
};

// 初始化数据库
async function initDatabase() {
  let connection;
  
  try {
    // 连接到MySQL服务器
    connection = await mysql.createConnection(dbConfig);
    console.log('已连接到MySQL服务器');
    
    // 创建数据库
    const dbName = process.env.DB_NAME || 'blog_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`数据库 '${dbName}' 已创建或已存在`);
    
    // 切换到新创建的数据库
    await connection.query(`USE ${dbName}`);
    
    // 创建分类表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('分类表已创建');
    
    // 创建文章表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content LONGTEXT NOT NULL,
        excerpt TEXT,
        publishTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        categoryId INT,
        tags TEXT,
        views INT DEFAULT 0,
        comments INT DEFAULT 0,
        readTime INT DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
      )
    `);
    console.log('文章表已创建');
    
    // 创建评论表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        articleId INT NOT NULL,
        author VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        likes INT DEFAULT 0,
        FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE
      )
    `);
    console.log('评论表已创建');
    
    // 插入默认分类数据
    const [categories] = await connection.query('SELECT * FROM categories');
    if (categories.length === 0) {
      await connection.query(`
        INSERT INTO categories (name, description) VALUES
        ('技术分享', '分享前端、后端、算法等技术文章'),
        ('生活随笔', '记录生活中的点点滴滴'),
        ('读书笔记', '阅读心得和知识总结'),
        ('项目经验', '项目开发中的经验和教训')
      `);
      console.log('默认分类数据已插入');
    }
    
    // 插入示例文章数据
    const [articles] = await connection.query('SELECT * FROM articles');
    if (articles.length === 0) {
      await connection.query(`
        INSERT INTO articles (title, content, excerpt, categoryId, tags, views, comments, readTime) VALUES
        ('Vue 3 Composition API 最佳实践', 
         '<h2>什么是 Composition API？</h2><p>Composition API 是 Vue 3 中引入的新特性，它允许我们以函数式的方式组织组件逻辑，而不是通过选项式 API。</p><h2>为什么使用 Composition API？</h2><ul><li>更好的逻辑复用</li><li>更好的类型推断</li><li>更灵活的代码组织</li><li>更好的 Tree-shaking 支持</li></ul>',
         'Vue 3 的 Composition API 为我们提供了更灵活的组件逻辑组织方式，本文将分享一些在实际项目中使用 Composition API 的最佳实践...',
         1, 'Vue3,Composition API,前端开发', 1234, 56, 8),
        ('如何高效学习新技术栈',
         '<h2>学习方法很重要</h2><p>在技术快速迭代的今天，如何高效地学习新技术栈成为每个开发者都需要面对的挑战。</p><h2>我的学习方法</h2><p>1. 从官方文档开始</p><p>2. 构建小型项目</p><p>3. 阅读源码</p><p>4. 分享和教学</p>',
         '在技术快速迭代的今天，如何高效地学习新技术栈成为每个开发者都需要面对的挑战。本文将分享我的一些学习方法和经验...',
         3, '学习方法,职业发展', 890, 34, 6),
        ('Node.js 性能优化技巧',
         '<h2>性能优化的重要性</h2><p>Node.js 作为服务端 JavaScript 运行环境，其性能优化一直是开发者关注的焦点。</p><h2>实用的优化技巧</h2><ul><li>使用异步操作</li><li>合理使用缓存</li><li>优化数据库查询</li><li>使用集群模式</li></ul>',
         'Node.js 作为服务端 JavaScript 运行环境，其性能优化一直是开发者关注的焦点。本文将介绍一些实用的性能优化技巧...',
         1, 'Node.js,性能优化,后端开发', 1567, 78, 10)
      `);
      console.log('示例文章数据已插入');
    }
    
    // 插入示例评论数据
    const [comments] = await connection.query('SELECT * FROM comments');
    if (comments.length === 0) {
      await connection.query(`
        INSERT INTO comments (articleId, author, content, likes) VALUES
        (1, '张三', '这篇文章写得真好，学到了很多！', 12),
        (1, '李四', 'Composition API 确实比 Options API 更灵活，特别是在逻辑复用时。', 8),
        (2, '王五', '学习方法分享得很实用，感谢！', 5)
      `);
      console.log('示例评论数据已插入');
    }
    
    console.log('数据库初始化完成！');
    
  } catch (error) {
    console.error('数据库初始化失败:', error.message);
    console.log('请确保MySQL服务已启动，并且用户凭据正确。');
    console.log('即使没有数据库，应用也可以使用模拟数据正常运行。');
  } finally {
    if (connection) {
      await connection.end();
      console.log('数据库连接已关闭');
    }
  }
}

// 执行初始化
initDatabase();