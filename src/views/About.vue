<template>
  <div class="about-page">
    <!-- 顶部个人信息：渐变背景 + 头像环 -->
    <section class="hero">
      <div class="hero-left">
        <div class="avatar-ring">
          <img v-if="profile.avatar" :src="profile.avatar" alt="头像" class="avatar" />
          <div v-else class="avatar default">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 5 6zm0 2c-3.866 0-7 3.582-7 8h14c0-4.418-3.134-8-7-8z"/>
            </svg>
          </div>
        </div>
        <label class="edit-avatar" v-if="editing">
          <input type="file" accept="image/*" @change="onAvatarSelected" />
          更换头像
        </label>
      </div>
      
      <div class="hero-right">
        <h1 class="hero-name">{{ profile.name || '技术博主' }}</h1>
        <p class="hero-title">{{ profile.title || '前端工程师 & 技术爱好者' }}</p>
        <p class="hero-intro">{{ profile.intro || '热爱技术，喜欢分享，致力于探索前端技术的无限可能。' }}</p>

        <div class="hero-actions">
          <button class="btn" @click="toggleEdit">{{ editing ? '取消' : '编辑资料' }}</button>
          <button v-if="editing" class="btn primary" @click="saveProfile">保存</button>
        </div>
      </div>
    </section>

    <!-- 编辑面板 -->
    <section v-if="editing" class="edit-panel">
      <div class="form-grid">
        <label>
          昵称
          <input v-model="profile.name" placeholder="请输入昵称" />
        </label>
        <label>
          头衔
          <input v-model="profile.title" placeholder="请输入头衔" />
        </label>
        <label class="full-row">
          简介
          <textarea v-model="profile.intro" rows="3" placeholder="简单介绍一下自己"></textarea>
        </label>
        <label>
          邮箱
          <input v-model="profile.email" placeholder="邮箱" />
        </label>
        <label>
          微信
          <input v-model="profile.wechat" placeholder="微信号" />
        </label>
      </div>
    </section>

    <!-- 信息卡片栅格：关于 / 技术栈 / 联系我 / 统计 -->
    <section class="card-grid">
      <div class="card">
        <h3>关于博客</h3>
        <p>
          这是我的个人博客，记录技术学习、项目实践与生活随笔。欢迎交流与指正，共同进步。
        </p>
      </div>

      <div class="card">
        <h3>技术栈</h3>
        <div class="chips">
          <span class="chip">Vue 3</span>
          <span class="chip">Vite</span>
          <span class="chip">JavaScript</span>
          <span class="chip">TypeScript</span>
          <span class="chip">Node.js</span>
          <span class="chip">Express</span>
          <span class="chip">MySQL</span>
        </div>
      </div>

      <div class="card">
        <h3>联系我</h3>
        <div class="contact">
          <span v-if="profile.email">📧 {{ profile.email }}</span>
          <span v-if="profile.wechat">💬 {{ profile.wechat }}</span>
          <span v-if="!profile.email && !profile.wechat" class="muted">完善资料以显示联系方式</span>
        </div>
      </div>

      <div class="card stats">
        <h3>博客统计</h3>
        <div class="stats-row">
          <div class="stat">
            <div class="num">128</div>
            <div class="label">文章</div>
          </div>
          <div class="stat">
            <div class="num">15.2K</div>
            <div class="label">访问</div>
          </div>
          <div class="stat">
            <div class="num">365</div>
            <div class="label">关注</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getProfile, setProfile } from '../utils/storage'
import { ElMessage } from 'element-plus'
export default {
  name: 'About',
  data() {
    return {
      editing: false,
      profile: {
        name: '',
        title: '',
        intro: '',
        email: '',
        wechat: '',
        avatar: ''
      }
    };
  },
  mounted() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      try {
        const stored = getProfile();
        this.profile = stored;
      } catch (error) {
        console.error('加载本地资料失败:', error);
      }
    },
    async saveProfile() {
      try {
        setProfile(this.profile);
        this.editing = false;
        ElMessage.success('资料已保存到浏览器本地');
      } catch (error) {
        console.error('保存资料失败:', error);
        ElMessage.error('保存失败，请重试');
      }
    },
    toggleEdit() {
      this.editing = !this.editing;
    },
    onAvatarSelected(e) {
      if (!this.editing) { ElMessage.warning('请先点击编辑资料'); return; }
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { this.profile.avatar = reader.result; };
      reader.readAsDataURL(file);
    }
  }
}
</script>

<style scoped>
:root { /* 组件内主题色 */ }
:host { /* 兼容性占位 */ }

.about-page { max-width: 1050px; margin: 0 auto; padding: 20px; }

/* 顶部个人信息区域 */
.hero {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, #eef2ff 0%, #f5f7ff 60%, #fff 100%);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.12);
  position: relative;
  overflow: hidden;
}
.hero::after {
  content: "";
  position: absolute;
  right: -80px; top: -80px;
  width: 220px; height: 220px;
  background: radial-gradient(90px 90px at 50% 50%, rgba(99,102,241,.25), transparent 60%);
  filter: blur(8px);
}

.avatar-ring { position: relative; width: 170px; height: 170px; display: grid; place-items: center; }
.avatar-ring::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: 50%;
  padding: 3px; /* 渐变边框厚度 */
  background: conic-gradient(from 0deg, #60a5fa, #a78bfa, #60a5fa);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: spin 6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.avatar { width: 164px; height: 164px; border-radius: 50%; object-fit: cover; }
.avatar.default { width: 164px; height: 164px; border-radius: 50%; display:flex; align-items:center; justify-content:center; background:#f3f4f6; color:#9ca3af; }
.edit-avatar { margin-top: 10px; font-size: 13px; color: #2563eb; cursor: pointer; text-align: center; }
.edit-avatar input { display: none; }

.hero-right { display: flex; flex-direction: column; justify-content: center; }
.hero-name { font-size: 26px; font-weight: 700; margin: 0; color: #111827; }
.hero-title { margin: 6px 0 10px; color: #4b5563; font-weight: 500; }
.hero-intro { color: #374151; line-height: 1.7; }
.hero-actions { margin-top: 14px; display: flex; gap: 10px; }

.btn { padding: 8px 14px; border: 1px solid #d1d5db; background: #fff; border-radius: 8px; cursor: pointer; transition: all .2s ease; }
.btn:hover { box-shadow: 0 4px 10px rgba(0,0,0,.06); transform: translateY(-1px); }
.btn.primary { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.num { font-size: 22px; font-weight: 700; color: var(--color-primary); }
.btn.primary:hover { filter: brightness(1.05); }
.btn.danger { background: #ef4444; color: #fff; border-color: #ef4444; }
.btn.primary:hover { filter: brightness(1.05); }

/* 编辑面板 */
.edit-panel { margin-top: 18px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-grid label { display: flex; flex-direction: column; font-size: 14px; color: #374151; }
.form-grid input, .form-grid textarea { margin-top: 6px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; }
.full-row { grid-column: 1 / 3; }

/* 卡片栅格 */
.card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 24px; }
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 20px; box-shadow: 0 6px 18px rgba(0,0,0,.06); }
.card h3 { margin: 0 0 10px; font-size: 18px; color: #111827; }
.card p { color: #374151; line-height: 1.8; }

/* 技术栈 chips */
.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip { padding: 6px 12px; border-radius: 999px; background: #eef2ff; color: #4338ca; border: 1px solid #e0e7ff; font-size: 13px; }
.chip:hover { background: #e0e7ff; }

/* 联系方式 */
.contact { display: flex; gap: 14px; align-items: center; color: #374151; }
.muted { color: #9ca3af; }

/* 统计 */
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.stat { background: linear-gradient(135deg, #f8fafc, #ffffff); border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; text-align: center; }
.num { font-size: 22px; font-weight: 700; color: #2563eb; }
.label { font-size: 13px; color: #6b7280; }

/* 响应式 */
@media (max-width: 780px) {
  .hero { grid-template-columns: 1fr; text-align: center; }
  .hero-right { align-items: center; }
  .card-grid { grid-template-columns: 1fr; }
}
</style>