<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <header class="blog-header">
      <div class="header-content">
        <h1 class="blog-title">{{ home.title }}</h1>
        <p class="blog-subtitle">{{ home.subtitle }}</p>
        
        <!-- 取消编辑：移除编辑首页文案按钮与面板 -->
        
        <!-- 编辑功能已取消：主页仅展示，不提供编辑入口 -->
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- 文章列表 -->
        <article 
          v-for="article in articles" 
          :key="article.id" 
          class="article-card"
          @click="goToArticle(article.id)"
        >
          <div class="article-header">
            <h2 class="article-title">{{ article.title }}</h2>
            <div class="article-meta">
              <span class="publish-time">{{ formatDate(article.publishTime) }}</span>
              <span class="category" :class="`category-${article.categoryId}`">{{ getCategoryName(article.categoryId) }}</span>
            </div>
          </div>
          <div class="article-excerpt">
            {{ article.excerpt }}
          </div>
          <div class="article-footer">
            <div class="article-tags">
              <span 
                v-for="tag in article.tags" 
                :key="tag" 
                class="tag"
                @click.stop="goToTag(tag)"
              >
                #{{ tag }}
              </span>
            </div>
            <div class="article-stats">
              <span class="stat-item">
                <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                {{ article.views }}
              </span>
              <span class="stat-item">
                <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 0 .398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                </svg>
                {{ article.comments }}
              </span>
            </div>
          </div>
        </article>

        <!-- 分页组件 -->
        <div class="pagination">
          <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">上一页</button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getArticles, getCategories, getHomeConfig } from '../utils/storage'
export default {
  name: 'Home',
  data() {
    return {
      articles: [],
      categories: [
        { id: 1, name: '技术分享' },
        { id: 2, name: '生活随笔' },
        { id: 3, name: '读书笔记' },
        { id: 4, name: '项目经验' }
      ],
      currentPage: 1,
      totalPages: 3,
      home: { title: '', subtitle: '' }
    }
  },
  mounted() {
    this.home = getHomeConfig();
    this.fetchArticles()
  },
  methods: {
    async fetchArticles() {
      try {
        const all = getArticles();
        this.totalPages = Math.ceil(all.length / 10) || 1;
        const start = (this.currentPage - 1) * 10;
        this.articles = all.slice(start, start + 10).map(article => ({
          ...article,
          publishTime: new Date(article.publishTime),
          tags: Array.isArray(article.tags) ? article.tags : (typeof article.tags === 'string' ? article.tags.split(',') : [])
        }));
        this.categories = getCategories();
      } catch (error) {
        console.error('加载本地文章失败:', error);
      }
    },
    formatDate(date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    },
    getCategoryName(id) {
      const category = this.categories.find(c => c.id === id)
      return category ? category.name : '未分类'
    },
    goToArticle(id) {
      this.$router.push(`/article/${id}`)
    },
    goToTag(tag) {
      this.$router.push(`/tags/${tag}`)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchArticles() // 实际项目中应该带页码参数重新获取数据
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchArticles()
      }
    },
    toggleHomeEdit() {
      this.editingHome = !this.editingHome
    },
    saveHome() {
      setHomeConfig(this.home)
      this.editingHome = false
      alert('首页文案已保存')
    }
  }
}
</script>

<style scoped>
.home-container { min-height: 100vh; display: flex; flex-direction: column; }

.blog-header { background: linear-gradient(135deg, var(--color-primary) 0%, #764ba2 100%); color: white; padding: 4rem 0; text-align: center; margin-bottom: 2rem; }
.header-content { max-width: 800px; margin: 0 auto; }

.blog-title { font-size: clamp(1.8rem, 2.5vw + 1rem, 2.6rem); margin: 0 0 1rem 0; font-weight: 700; }
.blog-subtitle { font-size: clamp(1rem, 1.2vw + .6rem, 1.25rem); opacity: 0.9; margin: 0; }

.main-content { flex: 1; max-width: 1200px; width: 100%; margin: 0 auto; padding: 0 1rem; }
.content-wrapper { max-width: 800px; margin: 0 auto; }

.article-card { background: var(--color-surface); border-radius: 12px; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm); cursor: pointer; transition: all 0.25s ease; border-left: 4px solid transparent; }
.article-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-left-color: var(--color-primary); }

.article-header { margin-bottom: 1rem; }
.article-title { font-size: clamp(1.4rem, 1.8vw + .8rem, 1.9rem); margin: 0 0 1rem 0; color: var(--color-text); line-height: 1.4; }
.article-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.9rem; color: var(--color-muted); }

.category { padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
.category-1 { background-color: #e3f2fd; color: #1976d2; }
.category-2 { background-color: #f3e5f5; color: #7b1fa2; }
.category-3 { background-color: #e8f5e9; color: #388e3c; }
.category-4 { background-color: #fff8e1; color: #f57c00; }

.article-excerpt { color: var(--color-muted); line-height: 1.7; margin-bottom: 1.5rem; font-size: 1.05rem; }

.article-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.article-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.tag { padding: 0.3rem 0.8rem; background-color: #f5f5f5; border-radius: 20px; font-size: 0.8rem; color: var(--color-muted); cursor: pointer; transition: all 0.25s ease; }
.tag:hover { background-color: var(--color-primary); color: white; }

.article-stats { display: flex; gap: 1rem; font-size: 0.9rem; color: var(--color-muted); }
.stat-item { display: flex; align-items: center; gap: 0.3rem; }
.icon { width: 16px; height: 16px; }

.pagination { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 3rem; margin-bottom: 2rem; }
.page-btn { padding: 0.5rem 1rem; background-color: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer; transition: all 0.25s ease; }
.page-btn:hover:not(:disabled) { background-color: var(--color-primary-600); }
.page-btn:disabled { background-color: #ccc; cursor: not-allowed; }
.page-info { color: var(--color-muted); font-size: 0.9rem; }

@media (max-width: 768px) {
  .blog-header { padding: 3rem 0; }
  .blog-title { font-size: clamp(1.6rem, 4.5vw, 2rem); }
  .article-card { padding: 1.5rem; }
  .article-title { font-size: clamp(1.2rem, 3.8vw, 1.5rem); }
  .article-footer { flex-direction: column; align-items: flex-start; }
}
.header-actions { display: flex; justify-content: center; gap: 10px; margin-top: 12px; }
.home-edit-panel { display:grid; grid-template-columns: 1fr 1fr; gap: 10px; max-width: 600px; margin: 12px auto 0; }
.home-edit-panel label { display:flex; flex-direction:column; font-size: 14px; color:#374151; }
.home-edit-panel input { margin-top:6px; padding: 8px; border: 1px solid #e5e7eb; border-radius: 8px; }
.btn { padding: 8px 14px; border: 1px solid #d1d5db; background: #fff; border-radius: 8px; cursor: pointer; }
.btn:hover { box-shadow: 0 4px 10px rgba(0,0,0,.06); transform: translateY(-1px); }
.btn.primary { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
</style>