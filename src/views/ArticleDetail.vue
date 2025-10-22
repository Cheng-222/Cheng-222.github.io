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
         <div v-if="article.cover" class="detail-cover">
           <img
             :src="article.cover"
             alt="文章封面"
             class="cover-img"
             loading="lazy"
             decoding="async"
             style="max-width:100%; width:100%; height:auto; aspect-ratio:16/9; max-height:420px; object-fit:cover; border-radius:8px;"
           />
         </div>
          <!-- 编辑功能已取消：详情页不提供编辑入口 -->
        </div>

        <!-- 文章正文 -->
        <div class="article-body">
          <div v-if="isLegacyHtml" v-html="sanitizedLegacyHtml"></div>
          <MdPreview v-else :modelValue="sanitizedMarkdown" />
        </div>

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
import { getArticleById, getPrevNext, getComments, addComment, likeComment as likeCommentUtil, getCategories } from '../utils/storage'
import { MdPreview } from 'md-editor-v3'
import { ElMessage } from 'element-plus'
export default {
  name: 'ArticleDetail',
  components: { MdPreview },
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
        { id: 3, name: '资源记录' },
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
        const data = getArticleById(articleId);
        if (!data) {
          throw new Error('文章不存在');
        }
        this.article = {
          ...data,
          tags: Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' ? data.tags.split(',') : []),
          publishTime: new Date(data.publishTime)
        };

        this.comments = getComments(articleId).map(c => ({ ...c, time: new Date(c.time) }));
        const siblings = getPrevNext(articleId);
        this.prevArticle = siblings.prev;
        this.nextArticle = siblings.next;
        this.categories = getCategories();
      } catch (error) {
        console.error('加载文章详情失败:', error);
      }
    },

    submitComment() {
      if (!this.newComment.trim()) {
        ElMessage.warning('请输入评论内容')
        return
      }
      const created = addComment(this.article.id, this.newComment.trim(), '当前用户');
      this.comments.push({ ...created, time: new Date(created.time) });
      this.newComment = ''
      ElMessage.success('评论提交成功')
    },
    likeComment(id) {
      likeCommentUtil(this.article.id, id);
      const idx = this.comments.findIndex(c => c.id === id);
      if (idx >= 0) this.comments[idx].likes += 1;
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
    }
  },
  computed: {
    isLegacyHtml() {
      const c = this.article && this.article.content
      return typeof c === 'string' && /<div\s+class="rich-content">[\s\S]*<\/div>/.test(c)
    },
    legacyInnerHtml() {
      const c = this.article && this.article.content
      if (!c) return ''
      const m = /<div\s+class="rich-content">([\s\S]*?)<\/div>/.exec(c)
      return m ? m[1] : c
    },
    sanitizedLegacyHtml() {
      const html = this.legacyInnerHtml || ''
      const cover = this.article && this.article.cover
      if (!html) return ''
      let out = html
      if (cover) {
        try {
          const esc = cover.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const htmlImg = new RegExp(`<img[^>]*src=[\"']${esc}[\"'][^>]*>`, 'gi')
          out = out.replace(htmlImg, '')
        } catch {}
      }
      // 保守策略：若仍存在首图，移除第一张图片标签
      out = out.replace(/<img[^>]*>/i, '')
      return out
    },
    sanitizedMarkdown() {
      const c = (this.article && this.article.content) || ''
      const cover = this.article && this.article.cover
      if (!c) return ''
      let out = c
      if (cover) {
        try {
          const esc = cover.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const mdImg = new RegExp(`!\\[[^\\]]*\\]\\(\\s*${esc}\\s*(?:\"[^\"]*\")?\\)`, 'g')
          const htmlImg = new RegExp(`<img[^>]*src=[\"']${esc}[\"'][^>]*>`, 'gi')
          out = out.replace(mdImg, '').replace(htmlImg, '')
        } catch {}
      }
      // 保守策略：移除正文里的第一张图片（避免封面重复）
      out = out.replace(/!\[[^\]]*\]\([^)]*\)/, '')
      out = out.replace(/<img[^>]*>/i, '')
      return out
    }
  }
}
</script>

<style scoped>
.article-detail-container { min-height: 100vh; background-color: var(--color-bg); padding: 2rem 0; }

.article-wrapper { max-width: 800px; margin: 0 auto; background-color: var(--color-surface); border-radius: 12px; box-shadow: var(--shadow-sm); padding: 2rem; }

.article-header { margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem; }
.article-title { font-size: clamp(1.6rem, 2.2vw + 1rem, 2.4rem); color: var(--color-text); margin: 0 0 1rem 0; line-height: 1.35; }
.article-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.95rem; color: var(--color-muted); margin-bottom: 1rem; }

.category { padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
.category-1 { background-color: #e3f2fd; color: #1976d2; }
.category-2 { background-color: #f3e5f5; color: #7b1fa2; }
.category-3 { background-color: #e8f5e9; color: #388e3c; }
.category-4 { background-color: #fff8e1; color: #f57c00; }

.article-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag { padding: 0.3rem 0.8rem; background-color: #f5f5f5; border-radius: 20px; font-size: 0.8rem; color: var(--color-muted); cursor: pointer; transition: all 0.25s ease; }
.tag:hover { background-color: var(--color-primary); color: white; }

.article-body { font-size: 1.1rem; line-height: 1.85; color: var(--color-text); }
.article-body h2 { font-size: 1.8rem; margin: 2rem 0 1rem 0; color: #2c3e50; }
.article-body p { margin: 1rem 0; }
.article-body ul { margin: 1rem 0; padding-left: 2rem; }
.article-body li { margin: 0.5rem 0; }
.article-body pre { background-color: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; margin: 1rem 0; }
.article-body code { font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 0.9rem; background-color: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 3px; }
.article-body pre code { background-color: transparent; padding: 0; }

.article-stats { display: flex; gap: 2rem; margin: 2rem 0; padding: 1rem 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
.stat-item { display: flex; align-items: center; gap: 0.5rem; color: var(--color-muted); font-size: 0.9rem; }
.icon { width: 20px; height: 20px; }

.share-buttons { display: flex; gap: 1rem; margin-bottom: 2rem; }
.share-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; transition: all 0.25s ease; font-size: 0.9rem; }
.share-wechat { background-color: #07c160; color: white; }
.share-weibo { background-color: #e6162d; color: white; }
.share-link { background-color: #666; color: white; }
.share-btn:hover { opacity: 0.95; transform: translateY(-2px); }

.article-nav { display: flex; justify-content: space-between; margin: 2rem 0; padding: 1.5rem 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
.prev-article, .next-article { cursor: pointer; transition: all 0.25s ease; max-width: 45%; }
.prev-article:hover, .next-article:hover { color: var(--color-primary); }
.nav-label { display: block; font-size: 0.8rem; color: var(--color-muted); margin-bottom: 0.5rem; }
.nav-title { font-size: 0.95rem; font-weight: 500; line-height: 1.4; }

.comment-section { margin-top: 3rem; }
.comment-title { font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--color-text); }
.comment-input-area { margin-bottom: 2rem; }
textarea { width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; resize: vertical; min-height: 100px; }
.submit-comment { margin-top: 1rem; padding: 0.6rem 2rem; background-color: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer; transition: all 0.25s ease; }
.submit-comment:hover { background-color: var(--color-primary-600); }

.comment-list { display: flex; flex-direction: column; gap: 1.5rem; }
.comment-item { display: flex; gap: 1rem; }
.comment-avatar { width: 40px; height: 40px; background-color: var(--color-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 500; flex-shrink: 0; }
.comment-content { flex: 1; }
.comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.comment-author { font-weight: 500; color: var(--color-text); }
.comment-time { font-size: 0.8rem; color: var(--color-muted); }
.comment-text { color: var(--color-muted); line-height: 1.7; margin-bottom: 0.5rem; }
.comment-actions { display: flex; gap: 1rem; }
.like-btn { display: flex; align-items: center; gap: 0.3rem; background: none; border: none; color: #999; cursor: pointer; font-size: 0.8rem; transition: all 0.25s ease; }
.like-btn:hover { color: var(--color-primary); }

.loading { text-align: center; padding: 3rem; color: var(--color-muted); font-size: 1.1rem; }

@media (max-width: 768px) {
  .article-wrapper { padding: 1.5rem; }
  .article-title { font-size: clamp(1.4rem, 4.5vw, 1.8rem); }
  .article-meta { flex-wrap: wrap; }
  .article-nav { flex-direction: column; gap: 1.5rem; }
  .prev-article, .next-article { max-width: 100%; }
  .share-buttons { flex-wrap: wrap; }
}
@media (max-width: 480px) {
  .article-detail-container { padding: 1.2rem 0; }
  .article-wrapper { padding: 1rem; }

  .article-header { margin-bottom: 1.2rem; padding-bottom: 1rem; }
  .article-title { font-size: clamp(1.2rem, 4.8vw, 1.5rem); line-height: 1.3; }
  .article-meta { gap: .5rem; flex-wrap: wrap; font-size: .85rem; }

  .detail-cover .cover-img { max-height: 200px; border-radius: 10px; }

  .article-body { font-size: 1rem; line-height: 1.8; }
  .article-body h2 { font-size: 1.4rem; margin: 1.4rem 0 .8rem; }
  .article-body pre { padding: .75rem; }
  .article-body code { font-size: .85rem; }

  .article-stats { gap: 1rem; margin: 1.2rem 0; }
  .stat-item { font-size: .85rem; }
  .icon { width: 16px; height: 16px; }

  .share-buttons { gap: .6rem; }
  .share-btn { padding: .5rem .8rem; font-size: .85rem; }

  .article-nav { margin: 1.6rem 0; gap: 1rem; }
  .nav-title { font-size: .9rem; }

  .comment-title { font-size: 1.3rem; margin-bottom: 1rem; }
  textarea { padding: .8rem; font-size: .95rem; min-height: 90px; }
  .submit-comment { padding: .5rem 1.2rem; font-size: .95rem; }

  .comment-list { gap: 1rem; }
  .comment-item { gap: .8rem; }
  .comment-avatar { width: 32px; height: 32px; }
}
</style>