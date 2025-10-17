import{_ as C,c as l,a as e,d as g,t as n,n as _,F as u,r as p,b as d,e as h,f as b,v as A,o as r}from"./index-CeUlyrV-.js";const f={name:"ArticleDetail",data(){return{article:null,prevArticle:null,nextArticle:null,comments:[],newComment:"",categories:[{id:1,name:"技术分享"},{id:2,name:"生活随笔"},{id:3,name:"读书笔记"},{id:4,name:"项目经验"}]}},created(){this.fetchArticleDetail()},methods:{async fetchArticleDetail(){try{const i=parseInt(this.$route.params.id),a=await(await fetch(`http://localhost:3000/api/articles/${i}`)).json();this.article={...a,tags:typeof a.tags=="string"?a.tags.split(","):a.tags,publishTime:new Date(a.publishTime)};const s=await(await fetch(`http://localhost:3000/api/comments?articleId=${i}`)).json();this.comments=s.map(m=>({...m,time:new Date(m.time)}));const o=await(await fetch(`http://localhost:3000/api/articles/${i}/siblings`)).json();this.prevArticle=o.prev,this.nextArticle=o.next}catch(i){console.error("获取文章详情失败:",i);const t=parseInt(this.$route.params.id),a={id:t,title:t===1?"Vue 3 Composition API 最佳实践":t===2?"如何高效学习新技术栈":"Node.js 性能优化技巧",publishTime:new Date("2024-01-15"),categoryId:1,readTime:8,tags:["Vue3","Composition API","前端开发"],views:1234,comments:56,content:`
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
          `};this.article=a,this.comments=[{id:1,author:"张三",time:new Date("2024-01-16"),content:"这篇文章写得真好，学到了很多！",likes:12},{id:2,author:"李四",time:new Date("2024-01-17"),content:"Composition API 确实比 Options API 更灵活，特别是在逻辑复用时。",likes:8}],t>1&&(this.prevArticle={id:t-1,title:"上一篇文章标题"}),t<3&&(this.nextArticle={id:t+1,title:"下一篇文章标题"})}},formatDate(i){const t=new Date(i);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`},getCategoryName(i){const t=this.categories.find(a=>a.id===i);return t?t.name:"未分类"},goToArticle(i){this.$router.push(`/article/${i}`)},goToTag(i){this.$router.push(`/tags/${i}`)},submitComment(){if(!this.newComment.trim()){alert("请输入评论内容");return}const i={id:this.comments.length+1,author:"当前用户",time:new Date,content:this.newComment.trim(),likes:0};this.comments.push(i),this.newComment="",alert("评论提交成功")},likeComment(i){const t=this.comments.find(a=>a.id===i);t&&t.likes++}}},w={class:"article-detail-container"},k={class:"article-wrapper"},x={key:0,class:"article-content"},I={class:"article-header"},D={class:"article-title"},y={class:"article-meta"},T={class:"publish-time"},M={class:"read-time"},V={class:"article-tags"},P=["onClick"],z=["innerHTML"],B={class:"article-stats"},L={class:"stat-item"},N={class:"stat-item"},S={class:"article-nav"},R={class:"nav-title"},j={class:"nav-title"},F={class:"comment-section"},H={class:"comment-title"},E={class:"comment-input-area"},O={class:"comment-list"},U={class:"comment-avatar"},Y={class:"comment-content"},q={class:"comment-header"},G={class:"comment-author"},J={class:"comment-time"},K={class:"comment-text"},Q={class:"comment-actions"},W=["onClick"],X={key:1,class:"loading"};function Z(i,t,a,v,s,c){return r(),l("div",w,[e("div",k,[s.article?(r(),l("div",x,[e("div",I,[e("h1",D,n(s.article.title),1),e("div",y,[e("span",T,n(c.formatDate(s.article.publishTime)),1),e("span",{class:_(["category",`category-${s.article.categoryId}`])},n(c.getCategoryName(s.article.categoryId)),3),e("span",M,n(s.article.readTime)+" 分钟阅读",1)]),e("div",V,[(r(!0),l(u,null,p(s.article.tags,o=>(r(),l("span",{key:o,class:"tag",onClick:m=>c.goToTag(o)}," #"+n(o),9,P))),128))])]),e("div",{class:"article-body",innerHTML:s.article.content},null,8,z),e("div",B,[e("div",L,[t[4]||(t[4]=e("svg",{class:"icon",viewBox:"0 0 16 16",fill:"currentColor"},[e("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"})],-1)),d(" "+n(s.article.views),1)]),e("div",N,[t[5]||(t[5]=e("svg",{class:"icon",viewBox:"0 0 16 16",fill:"currentColor"},[e("path",{d:"M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 0 .398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"})],-1)),d(" "+n(s.article.comments),1)])]),t[9]||(t[9]=g('<div class="share-buttons" data-v-1aa0ba56><button class="share-btn share-wechat" data-v-1aa0ba56><svg class="icon" viewBox="0 0 16 16" fill="currentColor" data-v-1aa0ba56><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" data-v-1aa0ba56></path></svg> 微信 </button><button class="share-btn share-weibo" data-v-1aa0ba56><svg class="icon" viewBox="0 0 16 16" fill="currentColor" data-v-1aa0ba56><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" data-v-1aa0ba56></path></svg> 微博 </button><button class="share-btn share-link" data-v-1aa0ba56><svg class="icon" viewBox="0 0 16 16" fill="currentColor" data-v-1aa0ba56><path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" data-v-1aa0ba56></path><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" data-v-1aa0ba56></path></svg> 复制链接 </button></div>',1)),e("div",S,[s.prevArticle?(r(),l("div",{key:0,class:"prev-article",onClick:t[0]||(t[0]=o=>c.goToArticle(s.prevArticle.id))},[t[6]||(t[6]=e("span",{class:"nav-label"},"上一篇",-1)),e("span",R,n(s.prevArticle.title),1)])):h("",!0),s.nextArticle?(r(),l("div",{key:1,class:"next-article",onClick:t[1]||(t[1]=o=>c.goToArticle(s.nextArticle.id))},[t[7]||(t[7]=e("span",{class:"nav-label"},"下一篇",-1)),e("span",j,n(s.nextArticle.title),1)])):h("",!0)]),e("div",F,[e("h3",H,"评论 ("+n(s.comments.length)+")",1),e("div",E,[b(e("textarea",{"onUpdate:modelValue":t[2]||(t[2]=o=>s.newComment=o),placeholder:"写下你的评论...",rows:"4"},null,512),[[A,s.newComment]]),e("button",{class:"submit-comment",onClick:t[3]||(t[3]=(...o)=>c.submitComment&&c.submitComment(...o))},"提交评论")]),e("div",O,[(r(!0),l(u,null,p(s.comments,o=>(r(),l("div",{key:o.id,class:"comment-item"},[e("div",U,n(o.author.charAt(0)),1),e("div",Y,[e("div",q,[e("span",G,n(o.author),1),e("span",J,n(c.formatDate(o.time)),1)]),e("div",K,n(o.content),1),e("div",Q,[e("button",{class:"like-btn",onClick:m=>c.likeComment(o.id)},[t[8]||(t[8]=e("svg",{class:"icon",viewBox:"0 0 16 16",fill:"currentColor"},[e("path",{d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"})],-1)),d(" "+n(o.likes),1)],8,W)])])]))),128))])])])):(r(),l("div",X,"加载中..."))])])}const tt=C(f,[["render",Z],["__scopeId","data-v-1aa0ba56"]]);export{tt as default};
