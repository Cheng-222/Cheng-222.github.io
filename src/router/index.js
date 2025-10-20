import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetail.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: '关于我' }
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/Category.vue'),
    meta: { title: '分类' }
  },
  {
    path: '/tags/:tag',
    name: 'Tags',
    component: () => import('../views/Tags.vue'),
    meta: { title: '标签' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { title: '数据管理' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 个人博客` : '个人博客'
  next()
})

export default router