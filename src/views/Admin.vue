<template>
  <div class="admin-container">
    <h1>数据管理</h1>
    <div class="tabs">
      <button :class="{active: tab==='profile'}" @click="tab='profile'">资料</button>
      <button :class="{active: tab==='articles'}" @click="tab='articles'">文章</button>
      <button :class="{active: tab==='categories'}" @click="tab='categories'">分类</button>
      <button :class="{active: tab==='backup'}" @click="tab='backup'">备份/导入</button>
    </div>

    <section v-if="tab==='profile'" class="card">
      <h2>个人资料</h2>
      <div class="grid">
        <label>昵称<input v-model="profile.name" /></label>
        <label>头衔<input v-model="profile.title" /></label>
        <label>邮箱<input v-model="profile.email" /></label>
        <label>微信<input v-model="profile.wechat" /></label>
        <label>简介<textarea v-model="profile.intro" rows="4" /></label>
      </div>
      <div class="actions">
        <button class="primary" @click="saveProfile">保存资料</button>
      </div>
    </section>

    <section v-if="tab==='articles'" class="card">
      <h2>文章管理</h2>
      <div class="list">
        <div v-for="a in articles" :key="a.id" class="list-item">
          <div>
            <strong>#{{ a.id }}</strong> {{ a.title }}
            <small>分类: {{ a.categoryId }} | 标签: {{ displayTags(a.tags) }}</small>
          </div>
          <div class="item-actions">
            <button @click="editArticle(a)">编辑</button>
            <button class="danger" @click="deleteArticle(a.id)">删除</button>
          </div>
        </div>
        <div v-if="!articles.length" class="muted">暂无文章</div>
      </div>

      <h3 style="margin-top: 1rem">{{ articleForm.id ? '编辑文章' : '新建文章' }}</h3>
      <div class="grid">
        <label>标题<input v-model="articleForm.title" /></label>
        <label>分类ID<input type="number" v-model.number="articleForm.categoryId" /></label>
        <label>标签（逗号分隔）<input v-model="articleForm.tagsInput" placeholder="如：Vue3,前端开发" /></label>
        <label>摘要<textarea v-model="articleForm.excerpt" rows="3" /></label>
        <label class="full-row">正文（Markdown）<MdEditor v-model="articleForm.content" /></label>
      </div>
      <div class="actions">
        <button class="primary" @click="saveArticle">保存文章</button>
        <button @click="resetArticleForm">重置</button>
      </div>
    </section>

    <section v-if="tab==='categories'" class="card">
      <h2>分类管理</h2>
      <div class="list">
        <div v-for="c in categories" :key="c.id" class="list-item">
          <div>
            <strong>#{{ c.id }}</strong> {{ c.name }}
            <small>{{ c.description }}</small>
          </div>
          <div class="item-actions">
            <button @click="editCategory(c)">编辑</button>
            <button class="danger" @click="deleteCategory(c.id)">删除</button>
          </div>
        </div>
        <div v-if="!categories.length" class="muted">暂无分类</div>
      </div>

      <h3 style="margin-top: 1rem">{{ categoryForm.id ? '编辑分类' : '新建分类' }}</h3>
      <div class="grid">
        <label>分类ID<input type="number" v-model.number="categoryForm.id" placeholder="如：1" /></label>
        <label>名称<input v-model="categoryForm.name" /></label>
        <label>描述<textarea v-model="categoryForm.description" rows="3" /></label>
      </div>
      <div class="actions">
        <button class="primary" @click="saveCategory">保存分类</button>
        <button @click="resetCategoryForm">重置</button>
      </div>
    </section>

    <section v-if="tab==='backup'" class="card">
      <h2>备份/导入</h2>
      <div class="actions" style="margin-bottom: .5rem">
        <button @click="refreshDump">刷新当前数据</button>
        <button class="primary" @click="downloadDump">下载备份JSON</button>
      </div>
      <textarea v-model="dumpText" rows="10" placeholder="当前数据JSON或粘贴要导入的JSON"></textarea>
      <div class="actions">
        <button class="primary" @click="importDump">导入覆盖</button>
      </div>
      <p class="muted">导入时将覆盖本地存储：资料、文章、分类、评论。</p>
    </section>
  </div>
</template>

<script>
import {
  getProfile, setProfile,
  getArticles, setArticles,
  getCategories, setCategories,
  getCommentsMap, setCommentsMap
} from '../utils/storage'
import { MdEditor } from 'md-editor-v3'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'Admin',
  components: { MdEditor },
  data() {
    return {
      tab: 'profile',
      profile: { name: '', title: '', email: '', wechat: '', intro: '' },
      articles: [],
      categories: [],
      articleForm: { id: null, title: '', categoryId: 1, excerpt: '', content: '', tagsInput: '' },
      categoryForm: { id: null, name: '', description: '' },
      dumpText: ''
    }
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    loadAll() {
      this.profile = getProfile()
      this.articles = getArticles()
      this.categories = getCategories()
      this.refreshDump()
    },
    // Profile
    saveProfile() {
      setProfile(this.profile)
      ElMessage.success('资料已保存')
    },
    // Articles
    editArticle(a) {
      this.tab = 'articles'
      const tags = Array.isArray(a.tags) ? a.tags : (typeof a.tags === 'string' ? a.tags.split(',') : [])
      this.articleForm = { id: a.id, title: a.title, categoryId: a.categoryId, excerpt: a.excerpt, content: a.content || '', tagsInput: tags.join(',') }
    },
    resetArticleForm() {
      this.articleForm = { id: null, title: '', categoryId: 1, excerpt: '', content: '', tagsInput: '' }
    },
    saveArticle() {
      const tags = this.articleForm.tagsInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
      const list = getArticles()
      if (this.articleForm.id) {
        const idx = list.findIndex(x => x.id === this.articleForm.id)
        if (idx >= 0) {
          list[idx] = {
            ...list[idx],
            title: this.articleForm.title,
            categoryId: this.articleForm.categoryId,
            excerpt: this.articleForm.excerpt,
            content: this.articleForm.content,
            tags
          }
        }
      } else {
        const newId = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1
        list.push({
          id: newId,
          title: this.articleForm.title,
          publishTime: new Date().toISOString(),
          categoryId: this.articleForm.categoryId,
          excerpt: this.articleForm.excerpt,
          content: this.articleForm.content,
          tags,
          views: 0,
          comments: 0
        })
      }
      setArticles(list)
      this.articles = list
      this.resetArticleForm()
      ElMessage.success('文章已保存')
    },
    async deleteArticle(id) {
      try {
        await ElMessageBox.confirm('确定删除该文章？', '提示', { type: 'warning' })
      } catch {
        return
      }
      const list = getArticles().filter(x => x.id !== id)
      setArticles(list)
      this.articles = list
      const map = getCommentsMap()
      if (map[id]) {
        delete map[id]
        setCommentsMap(map)
      }
      ElMessage.success('已删除')
    },
    displayTags(tags) {
      const arr = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : [])
      return arr.join(', ')
    },
    // Categories
    editCategory(c) {
      this.tab = 'categories'
      this.categoryForm = { id: c.id, name: c.name, description: c.description || '' }
    },
    resetCategoryForm() {
      this.categoryForm = { id: null, name: '', description: '' }
    },
    saveCategory() {
      const list = getCategories()
      const idx = list.findIndex(x => x.id === this.categoryForm.id)
      if (idx >= 0) {
        list[idx] = { ...list[idx], name: this.categoryForm.name, description: this.categoryForm.description }
      } else {
        list.push({ id: this.categoryForm.id || (list.length ? Math.max(...list.map(x => x.id)) + 1 : 1), name: this.categoryForm.name, description: this.categoryForm.description })
      }
      setCategories(list)
      this.categories = list
      this.resetCategoryForm()
      ElMessage.success('分类已保存')
    },
    async deleteCategory(id) {
      try {
        await ElMessageBox.confirm('确定删除该分类？', '提示', { type: 'warning' })
      } catch {
        return
      }
      const list = getCategories().filter(x => x.id !== id)
      setCategories(list)
      this.categories = list
      ElMessage.success('已删除')
    },
    // Backup
    refreshDump() {
      const dump = {
        profile: getProfile(),
        articles: getArticles(),
        categories: getCategories(),
        comments: getCommentsMap()
      }
      this.dumpText = JSON.stringify(dump, null, 2)
    },
    downloadDump() {
      const blob = new Blob([this.dumpText], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'blog-data-backup.json'
      a.click()
      URL.revokeObjectURL(url)
    },
    importDump() {
      try {
        const obj = JSON.parse(this.dumpText)
        setProfile(obj.profile)
        setArticles(obj.articles)
        setCategories(obj.categories)
        setCommentsMap(obj.comments)
        ElMessage.success('导入完成')
        this.loadAll()
      } catch (e) {
        ElMessage.error('JSON不合法，请检查后重试')
      }
    }
  }
}
</script>

<style scoped>
.admin-container { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
.tabs { display: flex; gap: .5rem; margin-bottom: 1rem; }
.tabs button { padding: .5rem 1rem; border: 1px solid #e5e7eb; background: #fff; border-radius: 6px; cursor: pointer; }
.tabs button.active { background: #667eea; color: #fff; border-color: #667eea; }
.card { background: #fff; border-radius: 8px; padding: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,.06); }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
.grid label { display: flex; flex-direction: column; font-size: .9rem; color: #555; }
.grid input, .grid textarea { margin-top: .4rem; padding: .6rem; border: 1px solid #e5e7eb; border-radius: 6px; }
.actions { display: flex; gap: .6rem; margin-top: .8rem; }
.primary { background: #667eea; color: #fff; border: none; border-radius: 6px; padding: .6rem 1rem; cursor: pointer; }
.danger { background: #ef4444; color: #fff; border: none; border-radius: 6px; padding: .6rem .8rem; cursor: pointer; }
.list { margin-top: .5rem; }
.list-item { display: flex; justify-content: space-between; align-items: center; padding: .6rem .2rem; border-bottom: 1px dashed #eee; }
.item-actions { display: flex; gap: .4rem; }
.muted { color: #888; font-size: .9rem; }
textarea { width: 100%; }
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}
</style>