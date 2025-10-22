<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="navbar-container">
        <router-link to="/" class="logo-link">
          <div class="logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span class="logo-text">个人博客</span>
          </div>
        </router-link>
        
        <!-- 桌面导航 -->
        <div class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/category/1" class="nav-link">技术分享</router-link>
          <!-- 新增分类入口 -->
          <router-link to="/category/2" class="nav-link">生活随笔</router-link>
          <router-link to="/category/3" class="nav-link">资源记录</router-link>
          <router-link to="/category/4" class="nav-link">项目经验</router-link>
          <router-link to="/about" class="nav-link">关于我</router-link>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <svg class="menu-icon" viewBox="0 0 24 24" fill="currentColor">
            <path v-if="!mobileMenuOpen" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            <path v-else d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      
      <!-- 移动端导航菜单 -->
      <div class="mobile-menu" v-if="mobileMenuOpen">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">首页</router-link>
        <router-link to="/category/1" class="mobile-nav-link" @click="closeMobileMenu">技术分享</router-link>
        <!-- 新增分类入口 -->
        <router-link to="/category/2" class="mobile-nav-link" @click="closeMobileMenu">生活随笔</router-link>
        <router-link to="/category/3" class="mobile-nav-link" @click="closeMobileMenu">资源记录</router-link>
        <router-link to="/category/4" class="mobile-nav-link" @click="closeMobileMenu">项目经验</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">关于我</router-link>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-info">
            <p>© 2025 个人技术博客. 保留所有权利.</p>
            <p>使用 Vue 3 构建</p>
          </div>
          <div class="footer-links">
            <router-link to="/about" class="footer-link">关于我</router-link>
            <a href="#" class="footer-link">隐私政策</a>
            <a href="#" class="footer-link">联系方式</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style>
/* 主题变量 */
:root {
  --color-primary: #667eea;
  --color-primary-600: #5a67d8;
  --color-text: #1f2937;
  --color-muted: #6b7280;
  --color-bg: #f7f8fc;
  --color-surface: #ffffff;
  --color-border: #e5e7eb;
  --color-footer-bg: #111827;
  --radius: 12px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* 全局样式重置 */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.7;
}

/* 应用容器 */
.app-container { display: flex; flex-direction: column; min-height: 100vh; }

/* 导航栏样式 */
.navbar { background-color: var(--color-surface); box-shadow: var(--shadow-sm); position: sticky; top: 0; z-index: 100; }

.navbar-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; justify-content: space-between; align-items: center; height: 64px; }

.logo-link { text-decoration: none; display: flex; align-items: center; }
.logo { display: flex; align-items: center; gap: 0.5rem; }
.logo-icon { width: 24px; height: 24px; color: var(--color-primary); }
.logo-text { font-size: 1.1rem; font-weight: 700; color: var(--color-text); }

.nav-links { display: flex; gap: 1.5rem; }

.nav-link { text-decoration: none; color: var(--color-muted); font-weight: 500; transition: all 0.2s ease; position: relative; }
.nav-link:hover, .nav-link.router-link-active { color: var(--color-primary); }
.nav-link.router-link-active::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 2px; background-color: var(--color-primary); }

/* 移动端菜单按钮 */
.mobile-menu-btn { background: none; border: none; cursor: pointer; display: none; }
.menu-icon { width: 24px; height: 24px; color: var(--color-text); }

/* 移动端导航菜单 */
.mobile-menu { display: none; background-color: var(--color-surface); box-shadow: var(--shadow-md); border-top: 1px solid var(--color-border); }
.mobile-nav-link { display: block; padding: 1rem; text-decoration: none; color: var(--color-muted); border-bottom: 1px solid #f0f0f0; transition: background-color 0.2s ease, color 0.2s ease; }
.mobile-nav-link:hover, .mobile-nav-link.router-link-active { background-color: #f5f5f5; color: var(--color-primary); }

/* 主内容区 */
.main { flex: 1; }

/* 页脚样式 */
.footer { background-color: var(--color-footer-bg); color: white; padding: 2rem 0; margin-top: 2rem; }
.footer-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.footer-content { display: flex; flex-direction: column; align-items: center; text-align: center; }
.footer-info p { margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-size: 0.92rem; }
.footer-links { display: flex; gap: 1.5rem; margin-top: 1rem; }
.footer-link { color: rgba(255, 255, 255, 0.8); text-decoration: none; transition: color 0.2s ease; font-size: 0.92rem; }
.footer-link:hover { color: white; }

/* 过渡动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-btn { display: block; }
  .mobile-menu { display: block; }
  .navbar-container { padding: 0 .75rem; height: 56px; }
  .logo-text { font-size: 1rem; }
  .footer-links { flex-wrap: wrap; justify-content: center; gap: 1rem; }
}
</style>
