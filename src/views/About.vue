<template>
  <div class="about-container">
    <div class="about-wrapper">
      <!-- 博主信息卡片 -->
      <div class="profile-card">
        <div class="avatar-container">
          <div class="avatar">
            <svg class="user-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
        <h1 class="blogger-name">技术博主</h1>
        <p class="blogger-title">前端工程师 & 技术爱好者</p>
        <p class="blogger-intro">
          热爱技术，喜欢分享，致力于探索前端技术的无限可能。
        </p>
        <div class="social-links">
          <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0V16h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548V16z"/>
            </svg>
          </a>
          <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
            </svg>
          </a>
          <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- 关于博客 -->
      <div class="about-section">
        <h2 class="section-title">关于博客</h2>
        <div class="section-content">
          <p>
            欢迎来到我的个人博客！这是一个记录我技术学习、生活感悟和项目经验的地方。
          </p>
          <p>
            我创建这个博客的初衷是希望能够通过写作来整理自己的知识体系，同时也希望能够帮助到其他在技术道路上探索的朋友们。
          </p>
          <p>
            在这个博客中，你可以找到关于前端开发、JavaScript、Vue、React等技术的文章，也会有一些关于学习方法和职业发展的思考。
          </p>
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="skills-section">
        <h2 class="section-title">技术栈</h2>
        <div class="skills-container">
          <div class="skill-category">
            <h3 class="category-title">前端开发</h3>
            <div class="skill-tags">
              <span class="skill-tag">HTML5</span>
              <span class="skill-tag">CSS3</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">Next.js</span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="category-title">后端技术</h3>
            <div class="skill-tags">
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Express</span>
              <span class="skill-tag">MongoDB</span>
              <span class="skill-tag">MySQL</span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="category-title">开发工具</h3>
            <div class="skill-tags">
              <span class="skill-tag">Git</span>
              <span class="skill-tag">VS Code</span>
              <span class="skill-tag">Webpack</span>
              <span class="skill-tag">Vite</span>
              <span class="skill-tag">Docker</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 博客统计 -->
      <div class="stats-section">
        <h2 class="section-title">博客统计</h2>
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number">128</div>
            <div class="stat-label">文章总数</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">15.2K</div>
            <div class="stat-label">总访问量</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">365</div>
            <div class="stat-label">关注人数</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">2</div>
            <div class="stat-label">运行年限</div>
          </div>
        </div>
      </div>

      <!-- 联系我 -->
      <div class="contact-section">
        <h2 class="section-title">联系我</h2>
        <div class="contact-info">
          <div class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>example@email.com</span>
          </div>
          <div class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            <span>微信: example_wechat</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 2rem 0;
}

.about-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 博主信息卡片 */
.profile-card {
  background: white;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.avatar-container {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.user-icon {
  width: 60px;
  height: 60px;
  color: white;
}

.blogger-name {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.blogger-title {
  font-size: 1.1rem;
  color: #666;
  margin: 0 0 1rem 0;
}

.blogger-intro {
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #667eea;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.icon {
  width: 20px;
  height: 20px;
}

/* 通用区块样式 */
.about-section,
.skills-section,
.stats-section,
.contact-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
  display: inline-block;
}

.section-content p {
  color: #666;
  line-height: 1.8;
  margin: 0 0 1rem 0;
}

/* 技术栈 */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-category {
  margin-bottom: 1rem;
}

.category-title {
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 1rem 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background-color: #f0f2ff;
  color: #667eea;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 统计信息 */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

/* 联系信息 */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #666;
}

.contact-item .icon {
  color: #667eea;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .profile-card {
    padding: 2rem 1.5rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .user-icon {
    width: 50px;
    height: 50px;
  }
  
  .blogger-name {
    font-size: 1.8rem;
  }
  
  .about-section,
  .skills-section,
  .stats-section,
  .contact-section {
    padding: 1.5rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .skill-tags {
    gap: 0.5rem;
  }
  
  .skill-tag {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>