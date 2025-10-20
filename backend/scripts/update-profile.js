require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'blog_db',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  });

  const data = {
    name: '测试保存',
    title: '后端写入验证',
    intro: '这是一条用于验证数据库写入的更新。',
    email: 'verify@example.com',
    wechat: 'verify_wechat',
    avatar: null,
  };

  await conn.execute(
    'UPDATE profile SET name = ?, title = ?, intro = ?, email = ?, wechat = ?, avatar = ? WHERE id = 1',
    [data.name, data.title, data.intro, data.email, data.wechat, data.avatar]
  );
  const [rows] = await conn.execute('SELECT * FROM profile WHERE id = 1');
  console.log('Updated profile row:');
  console.log(JSON.stringify(rows[0], null, 2));
  await conn.end();
})().catch(err => {
  console.error('Profile update failed:', err.message);
  process.exit(1);
});