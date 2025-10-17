<template>
  <div class="category-container">
    <div class="category-header">
      <h1 class="category-title">{{ currentCategory ? currentCategory.name : '分类' }}</h1>
      <p class="category-description">{{ currentCategory ? currentCategory.description : '查看所有文章分类' }}</p>
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
          <p>该分类下暂无文章</p>
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
export default {
  name: 'Category',
  data() {
    return {
      articles: [],
      categories: [
        { id: 1, name: '技术分享', description: '分享前端、后端、算法等技术文章' },
        { id: 2, name: '生活随笔', description: '记录生活中的点点滴滴' },
        { id: 3, name: '读书笔记', description: '阅读心得和知识总结' },
        { id: 4, name: '项目经验', description: '项目开发中的经验和教训' }
      ],
      currentPage: 1,
      totalPages: 1
    }
  },
  computed: {
    currentCategory() {
      const categoryId = parseInt(this.$route.params.id)
      return this.categories.find(cat => cat.id === categoryId)
    }
  },
  created() {
    this.fetchCategoryArticles()
  },
  watch: {
    '$route.params.id': function() {
      this.currentPage = 1
      this.fetchCategoryArticles()
    }
  },
  methods: {
    async fetchCategoryArticles() {
      try {
        // 获取当前分类ID
        const categoryId = parseInt(this.$route.params.id) || 1;
        
        // 调用后端API获取分类信息
        const categoryResponse = await fetch(`http://localhost:3000/api/categories/${categoryId}`);
        this.currentCategory = await categoryResponse.json();
        
        // 调用后端API获取分类下的文章列表
        const articlesResponse = await fetch(`http://localhost:3000/api/categories/${categoryId}/articles`);
        const articlesData = await articlesResponse.json();
        
        this.articles = articlesData.map(article => ({
          ...article,
          publishTime: new Date(article.publishTime),
          tags: typeof article.tags === 'string' ? article.tags.split(',') : article.tags
        }));
        
        // 调用后端API获取所有分类列表
        const categoriesResponse = await fetch('http://localhost:3000/api/categories');
        this.categories = await categoriesResponse.json();
        
        // 更新分页信息
        this.totalPages = Math.ceil(this.articles.length / 10); // 假设每页10篇文章
      } catch (error) {
        console.error('获取分类文章失败:', error);
        // 如果API调用失败，使用模拟数据
        const categoryId = parseInt(this.$route.params.id) || 1;
        
        const mockData = {
          categories: [
            { id: 1, name: '前端开发', description: '前端相关技术分享，包括HTML、CSS、JavaScript、Vue等' },
            { id: 2, name: '后端开发', description: '后端相关技术分享，包括Node.js、数据库、API设计等' },
            { id: 3, name: '技术人生', description: '技术成长、学习方法、职业发展等话题' }
          ],
          articles: {
            1: [
              {
                id: 1,
                title: 'Vue 3 Composition API 最佳实践',
                publishTime: new Date('2024-01-15'),
                categoryId: 1,
                excerpt: 'Vue 3 的 Composition API 为我们提供了更灵活的组件逻辑组织方式，本文将分享一些在实际项目中使用 Composition API 的最佳实践...',
                tags: ['Vue3', 'Composition API', '前端开发'],
                views: 1234,
                comments: 56
              },
              {
                id: 4,
                title: 'CSS Grid 布局完全指南',
                publishTime: new Date('2024-01-08'),
                categoryId: 1,
                excerpt: 'CSS Grid 是一个强大的二维布局系统，本文将详细介绍 Grid 布局的各种属性和使用方法...',
                tags: ['CSS', 'Grid', '前端开发'],
                views: 987,
                comments: 43
              }
            ],
            2: [
              {
                id: 3,
                title: 'Node.js 性能优化技巧',
                publishTime: new Date('2024-01-05'),
                categoryId: 2,
                excerpt: 'Node.js 作为服务端 JavaScript 运行环境，其性能优化一直是开发者关注的焦点。本文将介绍一些实用的性能优化技巧...',
                tags: ['Node.js', '性能优化', '后端开发'],
                views: 1567,
                comments: 78
              }
            ],
            3: [
              {
                id: 2,
                title: '如何高效学习新技术栈',
                publishTime: new Date('2024-01-10'),
                categoryId: 3,
                excerpt: '在技术快速迭代的今天，如何高效地学习新技术栈成为每个开发者都需要面对的挑战。本文将分享我的一些学习方法和经验...',
                tags: ['学习方法', '职业发展'],
                views: 890,
                comments: 34
              }
            ]
          }
        };
        
        this.currentCategory = mockData.categories.find(cat => cat.id === categoryId) || mockData.categories[0];
        this.articles = mockData.articles[categoryId] || [];
        this.categories = mockData.categories;
        this.totalPages = Math.ceil(this.articles.length / 10); // 假设每页10篇文章
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
        // 实际项目中应该带页码参数重新获取数据
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        // 实际项目中应该带页码参数重新获取数据
      }
    }
  }
}
</script>

<style scoped>
.category-container {
  min-height: 100vh;
}

.category-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.category-title {
  font-size: 2.2rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.category-description {
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

.article-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-left-color: #667eea;
}

.article-header {
  margin-bottom: 1rem;
}

.article-title {
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  color: #333;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.category {
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.category-1 { background-color: #e3f2fd; color: #1976d2; }
.category-2 { background-color: #f3e5f5; color: #7b1fa2; }
.category-3 { background-color: #e8f5e9; color: #388e3c; }
.category-4 { background-color: #fff8e1; color: #f57c00; }

.article-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag:hover {
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
  .category-header {
    padding: 2rem 0;
  }
  
  .category-title {
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