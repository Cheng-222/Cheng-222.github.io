<template>
  <div class="tags-container">
    <div class="tags-header">
      <h1 class="tags-title">标签: #{{ currentTag }}</h1>
      <p class="tags-description">查看所有包含此标签的文章</p>
    </div>

    <div class="main-content">
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
                :class="{ 'active': tag === currentTag }"
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

        <!-- 无文章提示 -->
        <div v-if="articles.length === 0" class="no-articles">
          <p>没有找到包含标签 "{{ currentTag }}" 的文章</p>
          <router-link to="/" class="back-home">返回首页</router-link>
        </div>

        <!-- 分页组件 -->
        <div class="pagination" v-if="articles.length > 0">
          <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">上一页</button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getCategories } from '../utils/storage'
export default {
  name: 'Tags',
  data() {
    return {
      articles: [],
      categories: [
        { id: 1, name: '技术分享' },
        { id: 2, name: '生活随笔' },
        { id: 3, name: '资源记录' },
        { id: 4, name: '项目经验' }
      ],
      currentPage: 1,
      totalPages: 1
    }
  },
  computed: {
    currentTag() {
      return this.$route.params.tag
    }
  },
  created() {
    this.fetchTaggedArticles()
  },
  watch: {
    '$route.params.tag': function() {
      this.currentPage = 1
      this.fetchTaggedArticles()
    }
  },
  methods: {
    async fetchTaggedArticles() {
      const tag = this.currentTag
      try {
        const all = getArticles();
        const filtered = all.filter(article => {
          const tags = Array.isArray(article.tags) ? article.tags : (typeof article.tags === 'string' ? article.tags.split(',') : []);
          const tagsLower = tags.map(t => String(t).toLowerCase());
          return tagsLower.includes(String(tag).toLowerCase());
        }).map(article => ({
          ...article,
          publishTime: new Date(article.publishTime)
        }));
        this.categories = getCategories();
        this.totalPages = Math.ceil(filtered.length / 3) || 1;
        const start = (this.currentPage - 1) * 3;
        this.articles = filtered.slice(start, start + 3);
      } catch (error) {
        console.error('加载标签文章失败:', error);
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
        this.fetchTaggedArticles()
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchTaggedArticles()
      }
    }
  }
}
</script>

<style scoped>
.tags-container {
  min-height: 100vh;
}

.tags-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.tags-title {
  font-size: 2.2rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.tags-description {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.main-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.article-card { background: var(--color-surface); border-radius: 12px; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm); cursor: pointer; transition: all 0.25s ease; border-left: 4px solid transparent; }
.article-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-left-color: var(--color-primary); }

.article-title { font-size: 1.8rem; margin: 0 0 1rem 0; color: var(--color-text); line-height: 1.4; }
.article-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.9rem; color: var(--color-muted); }

.tag { padding: 0.3rem 0.8rem; background-color: #f5f5f5; border-radius: 20px; font-size: 0.8rem; color: var(--color-muted); cursor: pointer; transition: all 0.25s ease; }
.tag:hover { background-color: var(--color-primary); color: white; }
.tag.active { background-color: var(--color-primary); color: white; }

.page-btn { padding: 0.5rem 1rem; background-color: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer; transition: all 0.25s ease; }
.page-btn:hover:not(:disabled) { background-color: var(--color-primary-600); }
.page-info { color: var(--color-muted); font-size: 0.9rem; }
.tag:hover {
  background-color: #667eea;
  color: white;
}

.tag.active {
  background-color: #667eea;
  color: white;
}

.article-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.icon {
  width: 16px;
  height: 16px;
}

.no-articles {
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-articles p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.back-home {
  display: inline-block;
  padding: 0.6rem 2rem;
  background-color: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.back-home:hover {
  background-color: #764ba2;
  transform: translateY(-2px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: #764ba2;
}

.page-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .tags-header {
    padding: 2rem 0;
  }
  
  .tags-title {
    font-size: 1.8rem;
  }
  
  .article-card {
    padding: 1.5rem;
  }
  
  .article-title {
    font-size: 1.5rem;
  }
  
  .article-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>