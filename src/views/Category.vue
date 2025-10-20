<template>
  <div class="category-container">
    <div class="category-header">
      <h1 class="category-title">{{ currentCategory ? currentCategory.name : '未分类' }}</h1>
      <p class="category-description">{{ currentCategory ? currentCategory.description : '查看所有文章分类' }}</p>
      <div class="header-actions">
        <button v-if="currentCategory && currentCategory.id === 1" class="btn success" @click="toggleAddArticle">{{ showAddPanel ? '取消' : '添加文章' }}</button>
        <button v-if="showAddPanel" class="btn primary" @click="saveNewArticle">保存</button>
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
        <label class="full-row">
          摘要
          <textarea v-model="newExcerpt" rows="2" placeholder="一句话摘要"></textarea>
        </label>
        <label class="full-row">
          正文（Markdown）
          <MdEditor v-model="editorMarkdown" />
        </label>
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
        <label class="full-row">
          正文（Markdown）
          <MdEditor v-model="editorMarkdown" />
        </label>
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
import { ElMessage } from 'element-plus'
import { MdEditor } from 'md-editor-v3'
export default {
  name: 'Category',
  components: { MdEditor },
  data() {
    return {
      articles: [],
      categories: [
        { id: 1, name: '技术分享', description: '分享前端、后端、算法等技术文章' },
        { id: 2, name: '生活随笔', description: '记录生活中的点点滴滴' },
        { id: 3, name: '读书笔记', description: '阅读心得和知识总结' },
        { id: 4, name: '项目经验', description: '项目开发中的经验和教训' },
      ],
      currentPage: 1,
     totalPages: 1,
     showAddPanel: false,
    showEditPanel: false,
    editingArticleId: null,
     newTitle: '',
     newExcerpt: '',
     newTags: '',
     newContent: '',
      newCover: '',
      coverMaxBytes: 500 * 1024,
      coverError: '',
     editorHtml: '',
     editorError: '',
     editorImageMaxBytes: 500 * 1024
    }
  },
  computed: {
    currentCategory() {
      const categoryId = parseInt(this.$route.params.id)
      return this.categories.find(cat => cat.id === categoryId)
    },
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
        const categoryId = parseInt(this.$route.params.id) || 1;
        const all = getArticles();
        const filtered = all.filter(a => a.categoryId === categoryId).map(article => ({
          ...article,
          publishTime: new Date(article.publishTime),
          tags: Array.isArray(article.tags) ? article.tags : (typeof article.tags === 'string' ? article.tags.split(',') : [])
        }));
        this.categories = getCategories();
        this.totalPages = Math.ceil(filtered.length / 10) || 1;
        const start = (this.currentPage - 1) * 10;
        this.articles = filtered.slice(start, start + 10);
      } catch (error) {
        console.error('加载分类文章失败:', error);
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
        this.fetchCategoryArticles()
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchCategoryArticles()
      }
    },
    toggleAddArticle() {
      this.showAddPanel = !this.showAddPanel
    },
    saveNewArticle() {
      const categoryId = parseInt(this.$route.params.id) || 1
      if (!this.newTitle.trim()) {
        ElMessage.warning('请填写标题')
        return
      }
      const all = getArticles()
      const newId = all.length ? Math.max(...all.map(a => a.id)) + 1 : 1
      const tags = (this.newTags || '').split(',').map(t => t.trim()).filter(Boolean)
      const newArticle = {
        id: newId,
        title: this.newTitle.trim(),
        publishTime: new Date().toISOString(),
        categoryId,
        excerpt: this.newExcerpt.trim(),
        tags,
        views: 0,
        comments: 0,
        content: this.editorMarkdown,
        cover: this.newCover || ''
      }
      setArticles([newArticle, ...all])
      this.showAddPanel = false
      this.newTitle = ''
      this.newExcerpt = ''
      this.newTags = ''
      this.newContent = ''
      this.editorMarkdown = ''
      this.newCover = ''
      ElMessage.success('文章已添加')
      this.fetchCategoryArticles()
    },
    onCoverChange(e) {
      const file = e.target.files && e.target.files[0]
      if (!file) return

     // size limit
     const MAX = this.coverMaxBytes
     if (file.size > MAX) {
       const sizeKB = Math.round(file.size / 1024)
       const maxKB = Math.round(MAX / 1024)
       this.coverError = `图片过大：${sizeKB}KB，最大${maxKB}KB`
       this.newCover = ''
       if (this.$refs.coverInput) this.$refs.coverInput.value = ''
       return
     }
     this.coverError = ''
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
    onEditorInput() {
      const el = this.$refs.rtEditor
      this.editorHtml = el ? el.innerHTML : ''
    },
    applyFormat(cmd) {
      this.focusEditor()
      document.execCommand(cmd, false, null)
    },
    applyHeading(tag) {
      this.focusEditor()
      document.execCommand('formatBlock', false, tag)
    },
    insertInlineCode() {
      this.focusEditor()
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return
      const range = selection.getRangeAt(0)
      const code = document.createElement('code')
      code.textContent = range.toString() || 'code'
      range.deleteContents()
      range.insertNode(code)
    },
    insertCodeBlock() {
      this.focusEditor()
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.textContent = '/* 在此编写代码 */\n'
      pre.appendChild(code)
      const sel = window.getSelection()
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0)
        range.collapse(false)
        range.insertNode(pre)
      } else if (this.$refs.rtEditor) {
        this.$refs.rtEditor.appendChild(pre)
      }
    },
    triggerInsertImage() {
      this.editorError = ''
      if (this.$refs.rtImageInput) this.$refs.rtImageInput.click()
    },
    onEditorImageChange(e) {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      const MAX = this.editorImageMaxBytes
      if (file.size > MAX) {
        const sizeKB = Math.round(file.size / 1024)
        const maxKB = Math.round(MAX / 1024)
        this.editorError = `图片过大：${sizeKB}KB，最大${maxKB}KB`
        if (this.$refs.rtImageInput) this.$refs.rtImageInput.value = ''
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        const img = document.createElement('img')
        img.src = reader.result
        img.alt = '插入图片'
        img.style.maxWidth = '100%'
        img.style.display = 'block'
        img.style.borderRadius = '6px'
        img.style.width = '100%'
        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0)
          range.collapse(false)
          range.insertNode(img)
          this.focusEditor()
        } else if (this.$refs.rtEditor) {
          this.$refs.rtEditor.appendChild(img)
          this.focusEditor()
        }
        this.onEditorInput()
      }
      reader.readAsDataURL(file)
    },
    focusEditor() {
      const el = this.$refs.rtEditor
      if (!el) return
      el.focus()
    },
    startEditArticle(article) {
      this.showAddPanel = false
      this.showEditPanel = true
      this.editingArticleId = article.id
      this.newTitle = article.title || ''
      this.newExcerpt = article.excerpt || ''
      this.newTags = Array.isArray(article.tags) ? article.tags.join(', ') : (article.tags || '')
      this.newCover = article.cover || ''
      this.editorMarkdown = article.content || ''
    },
    cancelEdit() {
      this.showEditPanel = false
      this.editingArticleId = null
      this.newTitle = ''
      this.newExcerpt = ''
      this.newTags = ''
      this.newCover = ''
      this.editorMarkdown = ''
    },
    saveEditedArticle() {
      if (!this.editingArticleId) return
      if (!this.newTitle.trim()) {
        ElMessage.warning('请填写标题')
        return
      }
      const all = getArticles()
      const idx = all.findIndex(a => a.id === this.editingArticleId)
      if (idx === -1) {
        ElMessage.error('文章不存在或已被删除')
        return
      }
      const tags = (this.newTags || '').split(',').map(t => t.trim()).filter(Boolean)
      const prev = all[idx]
      all[idx] = {
        ...prev,
        title: this.newTitle.trim(),
        excerpt: this.newExcerpt.trim(),
        tags,
        content: this.editorMarkdown,
        cover: this.newCover || ''
      }
      setArticles(all)
      this.showEditPanel = false
      this.editingArticleId = null
      ElMessage.success('文章已更新')
      this.fetchCategoryArticles()
    },
    deleteArticle(id) {
      const all = getArticles()
      const next = all.filter(a => a.id !== id)
      if (next.length === all.length) return
      const map = getCommentsMap()
      if (map && map[id]) {
        delete map[id]
        setCommentsMap(map)
      }
      setArticles(next)
      if (this.editingArticleId === id) this.cancelEdit()
      this.fetchCategoryArticles()
      ElMessage.success('文章已删除')
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
  
  .article-preview {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
    width: 220px;
    aspect-ratio: 16 / 9;
  }
  
  .cover-preview img {
    width: 20px;
    height: 40px;
    display: block;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    border: 1px solid #eee;
  }
}.btn { display: inline-flex; align-items: center; gap: .4rem; padding: .5rem .9rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; color: #111827; cursor: pointer; transition: all .2s; }
.btn:hover { box-shadow: 0 4px 10px rgba(0,0,0,.06); transform: translateY(-1px); }
.btn.primary { background: #2563eb; color: #fff; border-color: #2563eb; }
.btn.success { background: #10b981; color: #fff; border-color: #10b981; }
.header-actions { margin-top: 1rem; display: flex; justify-content: center; gap: .6rem; }
.add-article-panel { background: #fff; border-radius: 12px; padding: 1rem; margin-top: 1rem; box-shadow: 0 6px 18px rgba(0,0,0,.08); max-width: 720px; display: grid; grid-template-columns: 1fr 1fr; gap: .8rem 1rem; justify-content: center; margin-left: auto; margin-right: auto; }
.add-article-panel label { display: flex; flex-direction: column; font-size: .9rem; color: #374151; }
.add-article-panel input, .add-article-panel textarea { margin-top: .4rem; padding: .6rem .7rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: .95rem; }
.add-article-panel .full-row { grid-column: 1 / -1; }
.rt-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin: .5rem 0;
}

.hidden-input {
  display: none;
}

.rt-editor {
  min-height: 180px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: .6rem .7rem;
  font-size: .95rem;
}

.rt-editor:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
}
</style>