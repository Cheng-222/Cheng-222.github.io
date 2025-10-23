const i={profile:"blog_profile",articles:"blog_articles",categories:"blog_categories",comments:"blog_comments_map"},r={name:"测试保存",title:"后端改为纯前端模式",intro:"这里是我的个人简介。现在使用纯前端存储，数据保存在浏览器的 localStorage 中。",email:"",wechat:"",avatar:""},c=[{id:1,name:"技术分享",description:"分享前端、后端、算法等技术文章"},{id:2,name:"生活随笔",description:"记录生活中的点点滴滴"},{id:3,name:"资源记录",description:"记录平日积累的资源"},{id:4,name:"项目经验",description:"项目开发中的经验和教训"}],l=[{id:1,title:"Vue 3 Composition API 最佳实践",publishTime:"2024-01-15T00:00:00.000Z",categoryId:1,excerpt:"Vue 3 的 Composition API 为我们提供了更灵活的组件逻辑组织方式，本文将分享在实际项目中的最佳实践...",tags:["Vue3","Composition API","前端开发"],views:1234,comments:2,content:`
      <div class="rich-content">
        <p>在 Vue 3 中，Composition API 为我们提供了更灵活的组件逻辑组织方式。本文将介绍常用模式与实践建议。</p>
        <h2>为什么使用 Composition API？</h2>
        <ul>
          <li>更好的逻辑复用</li>
          <li>更清晰的依赖与数据流</li>
          <li>更友好的类型推断</li>
        </ul>
        <p>结合 <code>ref</code>、<code>computed</code> 与 <code>watch</code>，可以构建高内聚、低耦合模块。</p>
      </div>
    `},{id:2,title:"如何高效学习新技术栈",publishTime:"2024-01-10T00:00:00.000Z",categoryId:3,excerpt:"在技术快速迭代的今天，如何高效地学习新技术栈成为每个开发者都需要面对的挑战。本文分享一些学习方法和经验...",tags:["学习方法","职业发展"],views:890,comments:1,content:`
      <div class="rich-content">
        <p>学习新技术需要目标驱动与项目实践。制定小目标并持续输出，总结经验。</p>
        <h2>实践建议</h2>
        <ul>
          <li>搭建最小可行项目（MVP）</li>
          <li>记录踩坑与解决方案</li>
          <li>刻意练习核心概念</li>
        </ul>
      </div>
    `},{id:3,title:"Node.js 性能优化技巧",publishTime:"2024-01-05T00:00:00.000Z",categoryId:2,excerpt:"Node.js 作为服务端 JavaScript 运行环境，其性能优化一直是开发者关注的焦点。本文将介绍一些实用的性能优化技巧...",tags:["Node.js","性能优化","后端开发"],views:1567,comments:3,content:`
      <div class="rich-content">
        <p>优化 Node.js 性能可以从 I/O、并发与监控入手。合理使用缓存与异步队列。</p>
        <h2>常见方向</h2>
        <ul>
          <li>使用集群与负载均衡</li>
          <li>Profile 与监控瓶颈</li>
          <li>适当引入缓存（Redis 等）</li>
        </ul>
      </div>
    `}];function h(){try{const t=localStorage.getItem(i.categories);if(!t)return;const o=JSON.parse(t);let e=!1;o.forEach(n=>{n&&n.id===3&&n.name==="读书笔记"&&(n.name="资源记录",n.description="记录平日积累的资源",e=!0)}),e&&localStorage.setItem(i.categories,JSON.stringify(o))}catch{}}const m="blog_home_cfg",g={title:"我的个人博客",subtitle:"记录生活，分享知识"};function I(){if(localStorage.getItem(i.profile)||localStorage.setItem(i.profile,JSON.stringify(r)),localStorage.getItem(i.categories)||localStorage.setItem(i.categories,JSON.stringify(c)),localStorage.getItem(i.articles)||localStorage.setItem(i.articles,JSON.stringify(l)),!localStorage.getItem(i.comments)){const t={1:[{id:1,author:"小明",time:"2024-01-16T08:00:00.000Z",content:"写得很清晰，受教了！",likes:12},{id:2,author:"小红",time:"2024-01-16T09:30:00.000Z",content:"Composition API 的例子很实用。",likes:5}],2:[{id:1,author:"读者A",time:"2024-01-11T10:00:00.000Z",content:"学习方法对我很有帮助！",likes:3}],3:[{id:1,author:"后端爱好者",time:"2024-01-06T12:00:00.000Z",content:"优化建议很到位。",likes:8},{id:2,author:"路人甲",time:"2024-01-06T13:15:00.000Z",content:"准备试试这些技巧。",likes:2},{id:3,author:"性能控",time:"2024-01-06T15:20:00.000Z",content:"不错的总结！",likes:6}]};localStorage.setItem(i.comments,JSON.stringify(t))}localStorage.getItem(m)||localStorage.setItem(m,JSON.stringify(g))}I();h();function N(){try{const t=localStorage.getItem(i.profile);return t?JSON.parse(t):{...r}}catch{return{...r}}}function y(t){localStorage.setItem(i.profile,JSON.stringify(t))}function O(){try{const t=localStorage.getItem(i.categories);return t?JSON.parse(t):[...c]}catch{return[...c]}}function C(t){localStorage.setItem(i.categories,JSON.stringify(t))}function u(){try{const t=localStorage.getItem(i.articles);return t?JSON.parse(t):[...l]}catch{return[...l]}}function J(t){localStorage.setItem(i.articles,JSON.stringify(t))}function w(t){return u().find(e=>e.id===Number(t))||null}function b(t){const o=u().sort((n,s)=>n.id-s.id),e=o.findIndex(n=>n.id===Number(t));return{prev:e>0?{id:o[e-1].id,title:o[e-1].title}:null,next:e>=0&&e<o.length-1?{id:o[e+1].id,title:o[e+1].title}:null}}function d(){try{const t=localStorage.getItem(i.comments);return t?JSON.parse(t):{}}catch{return{}}}function f(t){localStorage.setItem(i.comments,JSON.stringify(t))}function v(t){const o=d();return o[t]?o[t]:[]}function P(t,o,e="当前用户"){const n=d(),s=n[t]||[],a={id:s.length?Math.max(...s.map(S=>S.id))+1:1,author:e,time:new Date().toISOString(),content:o,likes:0},p=[...s,a];return n[t]=p,f(n),a}function T(t,o){const e=d(),n=e[t]||[],s=n.findIndex(a=>a.id===o);s>=0&&(n[s].likes+=1,e[t]=n,f(e))}function x(){try{const t=localStorage.getItem(m);return t?JSON.parse(t):{...g}}catch{return{...g}}}export{O as a,x as b,P as c,w as d,v as e,b as f,u as g,N as h,J as i,d as j,f as k,T as l,C as m,y as s};
