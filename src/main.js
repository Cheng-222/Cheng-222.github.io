import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'md-editor-v3/lib/style.css'
import { bootstrapRemoteData } from './utils/storage'

// 预取远端数据（Decap CMS 管理的 JSON）
await bootstrapRemoteData()

// 创建Vue应用实例
const app = createApp(App)

// 注册 Element Plus 及其图标
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
