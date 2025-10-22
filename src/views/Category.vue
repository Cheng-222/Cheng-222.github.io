<template>
  <div class="category-container" :style="theme.cssVars">
    <div class="category-header">
      <div class="category-emoji">{{ theme.emoji }}</div>
      <h1 class="category-title">{{ currentCategory ? currentCategory.name : '未分类' }}</h1>
      <p class="category-description">{{ currentCategory ? currentCategory.description : '查看所有文章分类' }}</p>
      <div class="header-actions">
        <button v-if="currentCategory && [1,2,3,4].includes(currentCategory.id)" class="btn success" @click="toggleAddArticle">
          {{ showAddPanel ? '取消' : '添加文章' }}
        </button>
      </div>
      <!-- 添加文章面板 -->
      <div v-if="showAddPanel" class="add-article-panel">
        <label>
          标题
          <input v-model="newTitle" type="text" placeholder="输入文章标题" />
        </label>
        <label>
          标签（逗号分隔）
          <input v-model="newTags" type="text" placeholder="如：Vue3,前端开发" />
        </label>
        <label>
          封面图（URL）
          <input v-model="newCover" type="text" placeholder="https://..." />
        </label>
        <label>
          或选择本地封面
          <input type="file" accept="image/*" ref="coverInput" @change="onCoverChange" />
          <span class="muted">图片将以DataURL存储，建议不超过2MB</span>
          <div class="cover-preview" v-if="newCover">
            <img :src="newCover" alt="封面预览" />
            <button class="btn" @click="clearCover">清除封面</button>
          </div>
        </label>
        <label class="full-row">
          摘要
          <textarea v-model="newExcerpt" rows="2" placeholder="一句话摘要"></textarea>
        </label>
        <div class="full-row">
          <div>正文（Markdown）</div>
          <MdEditor
            v-model="editorMarkdown"
            :toolbars="['title','quote','unorderedList','orderedList','code']"
            :autoFocus="false"
            :placeholder="'在此输入正文，点击插入代码可添加代码块'"
          />
        </div>
      </div>
      <!-- 编辑文章面板 -->
      <div v-if="showEditPanel" class="add-article-panel">
        <label>
          标题
          <input v-model="newTitle" type="text" placeholder="输入文章标题" />
        </label>
        <label>
          标签（逗号分隔）
          <input v-model="newTags" type="text" placeholder="如：Vue3,前端开发" />
        </label>
        <label>
          封面图（URL）
          <input v-model="newCover" type="text" placeholder="https://..." />
        </label>
        <label>
          或选择本地封面
          <input type="file" accept="image/*" ref="coverInput" @change="onCoverChange" />
          <span class="muted">图片将以DataURL存储，建议不超过2MB</span>
          <div class="cover-preview" v-if="newCover">
            <img :src="newCover" alt="封面预览" />
            <button class="btn" @click="clearCover">清除封面</button>
          </div>
        </label>
        <div class="full-row">
          <div>正文（Markdown）</div>
          <MdEditor
            v-model="editorMarkdown"
            :toolbars="['title','quote','unorderedList','orderedList','code']"
            :autoFocus="false"
            :placeholder="'在此输入正文，点击插入代码可添加代码块'"
          />
        </div>
        <div class="full-row" style="display:flex; gap:.6rem; justify-content:flex-end;">
          <button class="btn" @click="cancelEdit">取消</button>
          <button class="btn success" @click="saveEditedArticle">保存修改</button>
        </div>
      </div>
    </div>
    
    <div class="main-content">
      <div class="content-wrapper">
        <!-- 文章分类 -->
        <article 
          v-for="article in articles.slice((currentPage-1)*pageSize, (currentPage-1)*pageSize + pageSize)" 
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
            <div class="card-actions">
              <button class="btn" @click.stop="startEditArticle(article)">编辑</button>
              <button class="btn" style="color:#fff; background:#ef4444; border-color:#ef4444;" @click.stop="deleteArticle(article.id)">删除</button>
            </div>
          </div>
          <img v-if="article.cover" :src="article.cover" alt="封面" class="article-cover" />
          <div class="article-excerpt">{{ article.excerpt }}</div>
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
          </div>
        </article>

        <!-- 分页 -->
        <div class="pagination">
          <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
          <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, setArticles, getCategories, getCommentsMap, setCommentsMap } from '../utils/storage'
import { MdEditor } from 'md-editor-v3'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'Category',
  components: { MdEditor },
  data() {
    return {
      articles: [],
      currentCategory: null,
      currentPage: 1,
      pageSize: 3,
      showAddPanel: false,
      showEditPanel: false,
      editingId: null,
      newTitle: '',
      newTags: '',
      newCover: '',
      newExcerpt: '',
      editorMarkdown: ''
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.articles.length / this.pageSize) || 1
    },
    theme() {
      const id = this.currentCategory ? this.currentCategory.id : 0
      const map = {
        1: { cssVars: { '--acc': '#0ea5e9', '--acc-600': '#0284c7', '--grad-start': '#06b6d4', '--grad-end': '#3b82f6' }, emoji: '🧠' },
        2: { cssVars: { '--acc': '#a855f7', '--acc-600': '#7c3aed', '--grad-start': '#8b5cf6', '--grad-end': '#ec4899' }, emoji: '🌸' },
        3: { cssVars: { '--acc': '#16a34a', '--acc-600': '#15803d', '--grad-start': '#10b981', '--grad-end': '#22c55e' }, emoji: '🔗' },
        4: { cssVars: { '--acc': '#f59e0b', '--acc-600': '#d97706', '--grad-start': '#f59e0b', '--grad-end': '#f97316' }, emoji: '🚀' }
      }
      return map[id] || { cssVars: { '--acc': '#667eea', '--acc-600': '#5a67d8', '--grad-start': '#667eea', '--grad-end': '#764ba2' }, emoji: '📄' }
    }
  },
  created() {
    this.loadCategoryAndArticles()
  },
  watch: {
    '$route.params.id': function() {
      this.currentPage = 1
      this.loadCategoryAndArticles()
    }
  },
  methods: {
    loadCategoryAndArticles() {
      const catId = parseInt(this.$route.params.id)
      const cats = getCategories()
      this.currentCategory = cats.find(c => c.id === catId) || { id: catId, name: '未分类', description: '查看所有文章分类' }
      const list = getArticles().filter(a => a.categoryId === catId)
      this.articles = list.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
    },
    formatDate(date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    },
    getCategoryName(id) {
      const cats = getCategories()
      const c = cats.find(x => x.id === id)
      return c ? c.name : '未分类'
    },
    prevPage() { if (this.currentPage > 1) this.currentPage -= 1 },
    nextPage() { const max = this.totalPages; if (this.currentPage < max) this.currentPage += 1 },
    toggleAddArticle() { this.showAddPanel = !this.showAddPanel },
    saveNewArticle() {
      if (!this.newTitle.trim()) { ElMessage.warning('请输入标题'); return }
      const tags = this.newTags.split(',').map(s => s.trim()).filter(Boolean)
      const list = getArticles()
      const newId = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1
      list.push({
        id: newId,
        title: this.newTitle,
        publishTime: new Date().toISOString(),
        categoryId: this.currentCategory ? this.currentCategory.id : 1,
        excerpt: this.newExcerpt || '',
        content: this.editorMarkdown || '',
        cover: this.newCover || '',
        tags,
        views: 0,
        comments: 0
      })
      setArticles(list)
      this.articles = list.filter(a => a.categoryId === (this.currentCategory ? this.currentCategory.id : 1))
      this.showAddPanel = false
      this.newTitle = ''; this.newTags = ''; this.newCover = ''; this.newExcerpt = ''; this.editorMarkdown = ''
      if (this.$refs.coverInput) this.$refs.coverInput.value = ''
      ElMessage.success('已添加新文章')
    },
    startEditArticle(article) {
      this.showEditPanel = true
      this.editingId = article.id
      this.newTitle = article.title
      this.newTags = Array.isArray(article.tags) ? article.tags.join(',') : (typeof article.tags === 'string' ? article.tags : '')
      this.newCover = article.cover || ''
      this.editorMarkdown = article.content || ''
    },
    cancelEdit() {
      this.showEditPanel = false
      this.editingId = null
      this.newTitle = ''; this.newTags = ''; this.newCover = ''; this.editorMarkdown = ''
      if (this.$refs.coverInput) this.$refs.coverInput.value = ''
    },
    saveEditedArticle() {
      if (!this.newTitle.trim()) { ElMessage.warning('请输入标题'); return }
      const tags = this.newTags.split(',').map(s => s.trim()).filter(Boolean)
      const list = getArticles()
      const idx = list.findIndex(a => a.id === this.editingId)
      if (idx >= 0) {
        list[idx] = { ...list[idx], title: this.newTitle, tags, cover: this.newCover || '', content: this.editorMarkdown || '' }
        setArticles(list)
        this.articles = list.filter(a => a.categoryId === (this.currentCategory ? this.currentCategory.id : 1))
        this.showEditPanel = false
        this.editingId = null
        this.newTitle = ''; this.newTags = ''; this.newCover = ''; this.editorMarkdown = ''
        if (this.$refs.coverInput) this.$refs.coverInput.value = ''
        ElMessage.success('已保存修改')
      } else {
        ElMessage.warning('未找到要编辑的文章')
      }
    },
    async deleteArticle(id) {
      try {
        await ElMessageBox.confirm('确定删除该文章？', '提示', { type: 'warning' })
      } catch {
        return
      }
      const list = getArticles().filter(a => a.id !== id)
      setArticles(list)
      this.articles = list.filter(a => a.categoryId === (this.currentCategory ? this.currentCategory.id : 1))
      const map = getCommentsMap()
      if (map[id]) {
        delete map[id]
        setCommentsMap(map)
      }
      ElMessage.success('已删除')
    },
    onCoverChange(e) {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      // 取消大小限制，直接读取为 DataURL
      const reader = new FileReader()
      reader.onload = () => {
        this.newCover = reader.result
      }
      reader.readAsDataURL(file)
    },
    clearCover() {
      this.newCover = ''
      if (this.$refs.coverInput) {
        this.$refs.coverInput.value = ''
      }
    },
    goToArticle(id) { this.$router.push(`/article/${id}`) },
    goToTag(tag) { this.$router.push(`/tags/${tag}`) }
  }
}
</script>

<style scoped>
.category-container { max-width: 1000px; margin: 0 auto; padding: 1.2rem; }
.category-header { background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
.category-title { font-size: 1.6rem; margin: 0; }
.category-description { color: #666; margin: .2rem 0 .8rem; }
.header-actions { display: flex; gap: .6rem; }
.add-article-panel { display: grid; grid-template-columns: repeat(2, 1fr); gap: .8rem; margin-top: .8rem; }
.add-article-panel label { display: flex; flex-direction: column; }
.add-article-panel .full-row { grid-column: 1 / -1; }
.muted { color: var(--color-muted); font-size: .9rem; }
.cover-preview { grid-column: 1 / -1; display: flex; align-items: center; gap: .6rem; }
.cover-preview img { width: 160px; height: 90px; object-fit: cover; border-radius: 6px; border: 1px solid #eee; }
.main-content { background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 1rem; }
.content-wrapper { display: grid; grid-template-columns: 1fr; gap: 1rem; }
.article-card { border: 1px solid #eee; border-radius: 8px; padding: .8rem; cursor: pointer; }
.article-header { display: flex; justify-content: space-between; align-items: center; }
.article-title { margin: 0; font-size: 1.2rem; }
.article-meta { color: #888; font-size: .85rem; display: flex; gap: .6rem; }
.card-actions { display: flex; gap: .4rem; }
.article-cover { width: 100%; max-height: 220px; object-fit: cover; border-radius: 6px; border: 1px solid #eee; }
.article-excerpt { color: #555; margin-top: .4rem; }
.article-footer { display: flex; justify-content: space-between; align-items: center; margin-top: .6rem; }
.article-tags { display: flex; gap: .4rem; flex-wrap: wrap; }
.tag { padding: .2rem .6rem; background: #f5f5f5; border-radius: 20px; font-size: .8rem; color: #666; cursor: pointer; }
.article-stats { display: flex; gap: 1rem; color: #666; }
.stat-item { display: flex; align-items: center; gap: .2rem; }
.btn { padding: .4rem .8rem; border: 1px solid #ddd; background: #fff; border-radius: 6px; cursor: pointer; }
.btn.primary { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.btn.success { background: #10b981; color: #fff; border-color: #10b981; }
.page-btn { padding: .4rem .8rem; border: 1px solid #ddd; background: #fff; border-radius: 6px; }
.page-info { margin: 0 .6rem; }
.category-container {
  min-height: 100vh;
}

.category-header {
  background: linear-gradient(135deg, var(--grad-start) 0%, var(--grad-end) 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
  margin-bottom: 2rem;
}
.category-emoji { font-size: 2.2rem; margin-bottom: .5rem; }

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
  border-left-color: var(--acc);
}

.article-header {
  margin-bottom: 1rem;
}

.article-title {
  font-size: clamp(1.4rem, 1.8vw + .8rem, 1.9rem);
  margin: 0 0 1rem 0;
  color: var(--color-text);
  line-height: 1.4;
}

.article-excerpt {
  color: var(--color-muted);
  line-height: 1.7;
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
  background-color: var(--acc);
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

.back-home { display: inline-block; padding: 0.6rem 2rem; background-color: var(--color-primary); color: white; text-decoration: none; border-radius: 6px; transition: all 0.25s ease; }
.back-home:hover { background-color: var(--color-primary-600); transform: translateY(-2px); }

.page-btn { padding: 0.5rem 1rem; background-color: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer; transition: all 0.25s ease; }
.page-btn:hover:not(:disabled) { background-color: var(--color-primary-600); }
.page-info { color: var(--color-muted); font-size: 0.9rem; }

.article-title { margin: 0; font-size: 1.2rem; color: var(--color-text); }
.article-meta { color: var(--color-muted); font-size: .85rem; display: flex; gap: .6rem; }

.tag:hover { background-color: var(--color-primary); color: #fff; }

.no-articles p { color: var(--color-muted); font-size: 1.1rem; margin-bottom: 1.5rem; }

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
  background-color: var(--acc);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: var(--acc-600);
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
  .category-header { padding: 2rem 0; }
  .category-title { font-size: 1.8rem; }
  .article-card { padding: 1.5rem; }
  .article-title { font-size: 1.5rem; }
  .article-footer { flex-direction: column; align-items: flex-start; }
  .article-preview { display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; width: 220px; aspect-ratio: 16 / 9; }
  .cover-preview img { width: 20px; height: 40px; display: block; object-fit: cover; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.08); border: 1px solid #eee; }
}
.btn { display: inline-flex; align-items: center; gap: .4rem; padding: .5rem .9rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; color: #111827; cursor: pointer; transition: all .2s; }
.btn:hover { box-shadow: 0 4px 10px rgba(0,0,0,.06); transform: translateY(-1px); }
.btn.primary { background: #2563eb; color: #fff; border-color: #2563eb; }
.btn.success { background: var(--acc); color: #fff; border-color: var(--acc); }
.header-actions { margin-top: 1rem; display: flex; justify-content: center; gap: .6rem; }
.add-article-panel { background: #fff; border-radius: 12px; padding: 1rem; margin-top: 1rem; box-shadow: 0 6px 18px rgba(0,0,0,.08); max-width: 720px; display: grid; grid-template-columns: 1fr 1fr; gap: .8rem 1rem; justify-content: center; margin-left: auto; margin-right: auto; }
.add-article-panel label { display: flex; flex-direction: column; font-size: .9rem; color: #374151; }
.add-article-panel input, .add-article-panel textarea { margin-top: .4rem; padding: .6rem .7rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: .95rem; }
.add-article-panel .full-row { grid-column: 1 / -1; }
@media (max-width: 480px) {
  .category-header { padding: 1.6rem 0; }
  .category-title { font-size: clamp(1.4rem, 2.5vw + .8rem, 1.8rem); }
  .category-description { font-size: .95rem; max-width: 90%; }

  .content-wrapper { max-width: 100%; padding: 0 .6rem; }
  .article-card { padding: 1rem; margin-bottom: 1rem; }
  .article-header { flex-direction: column; align-items: flex-start; gap: .4rem; }
  .article-title { font-size: clamp(1.1rem, 2vw + .7rem, 1.4rem); margin-bottom: .4rem; }
  .article-meta { font-size: .8rem; gap: .4rem; flex-wrap: wrap; }
  .article-cover { max-height: 160px; border-radius: 10px; }
  .article-excerpt { font-size: .95rem; line-height: 1.7; }
  .article-footer { gap: .6rem; }
  .article-tags .tag { padding: .25rem .6rem; font-size: .8rem; }
  .article-stats .icon { width: 14px; height: 14px; }

  .pagination { margin-top: 2rem; }
  .page-btn { padding: .45rem .8rem; font-size: .9rem; }
  .page-info { font-size: .85rem; }
}
</style>