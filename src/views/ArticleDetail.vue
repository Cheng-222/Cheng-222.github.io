<template>
  <div class="article-detail-container">
    <div class="article-wrapper">
      <div v-if="article" class="article-content">
        <!-- 文章头部信息 -->
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="publish-time">{{ formatDate(article.publishTime) }}</span>
            <span class="category" :class="`category-${article.categoryId}`">{{ getCategoryName(article.categoryId) }}</span>
            <span class="read-time">{{ article.readTime }} 分钟阅读</span>
          </div>
          <div class="article-tags">
            <span 
              v-for="tag in article.tags" 
              :key="tag" 
              class="tag"
              @click="goToTag(tag)"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- 文章正文 -->
        <div class="article-body" v-html="article.content"></div>

        <!-- 文章统计信息 -->
        <div class="article-stats">
          <div class="stat-item">
            <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            {{ article.views }}
          </div>
          <div class="stat-item">
            <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 0 .398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg>
            {{ article.comments }}
          </div>
        </div>

        <!-- 分享按钮 -->
        <div class="share-buttons">
          <button class="share-btn share-wechat">
            <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            微信
          </button>
          <button class="share-btn share-weibo">
            <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            微博
          </button>
          <button class="share-btn share-link">
            <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
            </svg>
            复制链接
          </button>
        </div>

        <!-- 上一篇/下一篇 -->
        <div class="article-nav">
          <div v-if="prevArticle" class="prev-article" @click="goToArticle(prevArticle.id)">
            <span class="nav-label">上一篇</span>
            <span class="nav-title">{{ prevArticle.title }}</span>
          </div>
          <div v-if="nextArticle" class="next-article" @click="goToArticle(nextArticle.id)">
            <span class="nav-label">下一篇</span>
            <span class="nav-title">{{ nextArticle.title }}</span>
          </div>
        </div>

        <!-- 评论区 -->
        <div class="comment-section">
          <h3 class="comment-title">评论 ({{ comments.length }})</h3>
          
          <!-- 评论输入框 -->
          <div class="comment-input-area">
            <textarea 
              v-model="newComment" 
              placeholder="写下你的评论..."
              rows="4"
            ></textarea>
            <button class="submit-comment" @click="submitComment">提交评论</button>
          </div>

          <!-- 评论列表 -->
          <div class="comment-list">
            <div 
              v-for="comment in comments" 
              :key="comment.id" 
              class="comment-item"
            >
              <div class="comment-avatar">
                {{ comment.author.charAt(0) }}
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-time">{{ formatDate(comment.time) }}</span>
                </div>
                <div class="comment-text">{{ comment.content }}</div>
                <div class="comment-actions">
                  <button class="like-btn" @click="likeComment(comment.id)">
                    <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    {{ comment.likes }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 加载状态 -->
      <div v-else class="loading">加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetail',
  data() {
    return {
      article: null,
      prevArticle: null,
      nextArticle: null,
      comments: [],
      newComment: '',
      categories: [
        { id: 1, name: '技术分享' },
        { id: 2, name: '生活随笔' },
        { id: 3, name: '读书笔记' },
        { id: 4, name: '项目经验' }
      ]
    }
  },
  created() {
    this.fetchArticleDetail()
  },
  methods: {
    async fetchArticleDetail() {
      try {
        const articleId = parseInt(this.$route.params.id);
        
        // 调用后端API获取文章详情
        const articleResponse = await fetch(`http://localhost:3000/api/articles/${articleId}`);
        const articleData = await articleResponse.json();
        
        this.article = {
          ...articleData,
          tags: typeof articleData.tags === 'string' ? articleData.tags.split(',') : articleData.tags,
          publishTime: new Date(articleData.publishTime)
        };
        
        // 调用后端API获取评论列表
        const commentsResponse = await fetch(`http://localhost:3000/api/comments?articleId=${articleId}`);
        const commentsData = await commentsResponse.json();
        
        this.comments = commentsData.map(comment => ({
          ...comment,
          time: new Date(comment.time)
        }));
        
        // 调用后端API获取上下篇
        const siblingsResponse = await fetch(`http://localhost:3000/api/articles/${articleId}/siblings`);
        const siblingsData = await siblingsResponse.json();
        
        this.prevArticle = siblingsData.prev;
        this.nextArticle = siblingsData.next;
      } catch (error) {
        console.error('获取文章详情失败:', error);
        // 如果API调用失败，使用模拟数据
        const articleId = parseInt(this.$route.params.id);
        
        const mockArticle = {
          id: articleId,
          title: articleId === 1 ? 'Vue 3 Composition API 最佳实践' : 
                 articleId === 2 ? '如何高效学习新技术栈' : 'Node.js 性能优化技巧',
          publishTime: new Date('2024-01-15'),
          categoryId: 1,
          readTime: 8,
          tags: ['Vue3', 'Composition API', '前端开发'],
          views: 1234,
          comments: 56,
          content: `
            <div class="rich-content">
              <p>在 Vue 3 中，Composition API 为我们提供了更灵活的组件逻辑组织方式。本文将详细介绍 Composition API 的最佳实践，帮助你更好地构建 Vue 应用。</p>
              
              <h2>什么是 Composition API？</h2>
              <p>Composition API 是 Vue 3 中引入的新特性，它允许我们以函数式的方式组织组件逻辑，而不是通过选项式 API。这种方式在处理复杂组件时特别有用。</p>
              
              <h2>为什么使用 Composition API？</h2>
              <ul>
                <li>更好的逻辑复用</li>
                <li>更好的类型推断</li>
                <li>更灵活的代码组织</li>
                <li>更好的 Tree-shaking 支持</li>
              </ul>
              
              <h2>基本用法示例</h2>
              <pre><code>import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>
              
              <h2>逻辑复用</h2>
              <p>通过 Composition API，我们可以轻松地提取和复用组件逻辑：</p>
              
              <pre><code>// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
  }
  
  return {
    count,
    doubleCount,
    increment
  }
}</code></pre>
              
              <p>然后在组件中使用：</p>
              
              <pre><code>import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, doubleCount, increment } = useCounter(10)
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>
              
              <h2>总结</h2>
              <p>Composition API 为 Vue 开发者提供了更灵活、更强大的工具来构建复杂应用。通过合理使用，我们可以创建更易于维护和测试的代码。</p>
            </div>
          `
        };
        
        this.article = mockArticle;
        
        this.comments = [
          {
            id: 1,
            author: '张三',
            time: new Date('2024-01-16'),
            content: '这篇文章写得真好，学到了很多！',
            likes: 12
          },
          {
            id: 2,
            author: '李四',
            time: new Date('2024-01-17'),
            content: 'Composition API 确实比 Options API 更灵活，特别是在逻辑复用时。',
            likes: 8
          }
        ];
        
        if (articleId > 1) {
          this.prevArticle = {
            id: articleId - 1,
            title: '上一篇文章标题'
          };
        }
        if (articleId < 3) {
          this.nextArticle = {
            id: articleId + 1,
            title: '下一篇文章标题'
          };
        }
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
    submitComment() {
      if (!this.newComment.trim()) {
        alert('请输入评论内容')
        return
      }
      
      const comment = {
        id: this.comments.length + 1,
        author: '当前用户',
        time: new Date(),
        content: this.newComment.trim(),
        likes: 0
      }
      
      this.comments.push(comment)
      this.newComment = ''
      alert('评论提交成功')
    },
    likeComment(id) {
      const comment = this.comments.find(c => c.id === id)
      if (comment) {
        comment.likes++
      }
    }
  }
}
</script>

<style scoped>
.article-detail-container {
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 2rem 0;
}

.article-wrapper {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.article-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
}

.article-title {
  font-size: 2.2rem;
  color: #333;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
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

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.article-body h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem 0;
  color: #2c3e50;
}

.article-body p {
  margin: 1rem 0;
}

.article-body ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

.article-body li {
  margin: 0.5rem 0;
}

.article-body pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
}

.article-body code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

.article-body pre code {
  background-color: transparent;
  padding: 0;
}

.article-stats {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.icon {
  width: 20px;
  height: 20px;
}

.share-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.share-wechat {
  background-color: #07c160;
  color: white;
}

.share-weibo {
  background-color: #e6162d;
  color: white;
}

.share-link {
  background-color: #666;
  color: white;
}

.share-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.article-nav {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.prev-article,
.next-article {
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 45%;
}

.prev-article:hover,
.next-article:hover {
  color: #667eea;
}

.nav-label {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.nav-title {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
}

.comment-section {
  margin-top: 3rem;
}

.comment-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.comment-input-area {
  margin-bottom: 2rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
}

.submit-comment {
  margin-top: 1rem;
  padding: 0.6rem 2rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-comment:hover {
  background-color: #764ba2;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  background-color: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 500;
  color: #333;
}

.comment-time {
  font-size: 0.8rem;
  color: #999;
}

.comment-text {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.like-btn:hover {
  color: #667eea;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .article-wrapper {
    padding: 1.5rem;
  }
  
  .article-title {
    font-size: 1.8rem;
  }
  
  .article-meta {
    flex-wrap: wrap;
  }
  
  .article-nav {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .prev-article,
  .next-article {
    max-width: 100%;
  }
  
  .share-buttons {
    flex-wrap: wrap;
  }
}
</style>