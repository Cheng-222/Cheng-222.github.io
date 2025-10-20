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
        <label>封面图（URL）<input v-model="articleForm.cover" placeholder="https://..." /></label>
        <label>
          或选择本地封面
          <input type="file" accept="image/*" ref="adminCoverInput" @change="onAdminCoverChange" />
          <span class="muted" v-if="coverError">{{ coverError }}</span>
          <div class="cover-preview" v-if="articleForm.cover">
            <img :src="articleForm.cover" alt="封面预览" />
          </div>
        </label>
        <div>
          正文（Markdown）
          <MdEditor
            v-model="articleForm.content"
            :toolbars="['title','quote','unorderedList','orderedList','code']"
            :autoFocus="false"
            :placeholder="'在此输入正文，点击插入代码可添加代码块'"
          />
        </div>
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
      articleForm: { id: null, title: '', categoryId: 1, excerpt: '', content: '', tagsInput: '', cover: '' },
      categoryForm: { id: null, name: '', description: '' },
      dumpText: '',
      coverMaxBytes: 500 * 1024,
      coverError: ''
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
      this.articleForm = { id: a.id, title: a.title, categoryId: a.categoryId, excerpt: a.excerpt, content: a.content || '', tagsInput: tags.join(','), cover: a.cover || '' }
    },
    resetArticleForm() {
      this.articleForm = { id: null, title: '', categoryId: 1, excerpt: '', content: '', tagsInput: '', cover: '' }
      this.coverError = ''
      if (this.$refs.adminCoverInput) this.$refs.adminCoverInput.value = ''
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
            cover: this.articleForm.cover || '',
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
          cover: this.articleForm.cover || '',
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
      return arr.join(',')
    },
    // Backup
    refreshDump() {
      const dump = {
        profile: this.profile,
        articles: this.articles,
        categories: this.categories,
        commentsMap: getCommentsMap()
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
      ElMessage.success('已下载备份文件')
    },
    async importDump() {
      try {
        const parsed = JSON.parse(this.dumpText)
        if (!parsed || typeof parsed !== 'object') throw new Error('JSON格式不正确')
        setProfile(parsed.profile || {})
        setArticles(parsed.articles || [])
        setCategories(parsed.categories || [])
        setCommentsMap(parsed.commentsMap || {})
        this.loadAll()
        ElMessage.success('数据已导入')
      } catch (e) {
        ElMessageBox.alert(`导入失败：${e.message}`, '错误', { type: 'error' })
      }
    },
    // Cover upload
    onAdminCoverChange(e) {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      const MAX = this.coverMaxBytes
      if (file.size > MAX) {
        const sizeKB = Math.round(file.size / 1024)
        const maxKB = Math.round(MAX / 1024)
        this.coverError = `图片过大：${sizeKB}KB，最大${maxKB}KB`
        this.articleForm.cover = ''
        if (this.$refs.adminCoverInput) this.$refs.adminCoverInput.value = ''
        return
      }
      this.coverError = ''
      const reader = new FileReader()
      reader.onload = () => {
        this.articleForm.cover = reader.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.admin-container { padding: 1.2rem; }
.tabs { display: flex; gap: .5rem; margin-bottom: .8rem; }
.tabs button { padding: .4rem .8rem; border: 1px solid #ddd; background: #fff; cursor: pointer; }
.tabs .active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.card { background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 1rem; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .8rem; }
.grid .full-row { grid-column: 1 / -1; }
.list { border: 1px solid #eee; border-radius: 6px; }
.list-item { display: flex; justify-content: space-between; padding: .6rem .8rem; border-bottom: 1px solid #f1f1f1; }
.list-item:last-child { border-bottom: none; }
.item-actions { display: flex; gap: .4rem; }
.actions { margin-top: .8rem; display: flex; gap: .6rem; }
.primary { background: #10b981; color: #fff; border: 1px solid #10b981; padding: .5rem .8rem; border-radius: 6px; }
.danger { background: #ef4444; color: #fff; border: 1px solid #ef4444; padding: .5rem .8rem; border-radius: 6px; }
.muted { color: #888; font-size: .85rem; }
.cover-preview { grid-column: 1 / -1; margin-top: .4rem; }
.cover-preview img { width: 100%; max-height: 200px; object-fit: cover; border-radius: 6px; border: 1px solid #eee; }
/* 恢复更丰富的管理页样式，保持原有布局 */
.page {
  padding: 1rem;
}

.tabs {
  display: flex;
  gap: .6rem;
  margin-bottom: 1rem;
}

.tab {
  padding: .5rem .9rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #111827;
  cursor: pointer;
}

.tab.active {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
}

.list, .form {
  margin-top: 1rem;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: .2rem;
  margin-bottom: .8rem;
}

.form input, .form textarea, .form select {
  padding: .6rem .7rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: .6rem;
}

.btn { display: inline-flex; align-items: center; gap: .4rem; padding: .5rem .9rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; color: #111827; cursor: pointer; transition: all .2s; }
.btn:hover { box-shadow: 0 4px 10px rgba(0,0,0,.06); transform: translateY(-1px); }
.btn.primary { background: #2563eb; color: #fff; border-color: #2563eb; }
.btn.success { background: #10b981; color: #fff; border-color: #10b981; }

/* 列表样式 */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #e5e7eb;
  padding: .5rem;
}
.table th {
  background: #f8fafc;
}

</style>