const e={profile:"blog_profile",articles:"blog_articles",categories:"blog_categories",comments:"blog_comments_map"},c={name:"测试保存",title:"后端改为纯前端模式",intro:"这里是我的个人简介。现在使用纯前端存储，数据保存在浏览器的 localStorage 中。",email:"",wechat:"",avatar:""},r=[{id:1,name:"技术分享",description:"分享前端、后端、算法等技术文章"},{id:2,name:"生活随笔",description:"记录生活中的点点滴滴"},{id:3,name:"读书笔记",description:"阅读心得和知识总结"},{id:4,name:"项目经验",description:"项目开发中的经验和教训"}],a=[{id:1,title:"Vue 3 Composition API 最佳实践",publishTime:"2024-01-15T00:00:00.000Z",categoryId:1,excerpt:"Vue 3 的 Composition API 为我们提供了更灵活的组件逻辑组织方式，本文将分享在实际项目中的最佳实践...",tags:["Vue3","Composition API","前端开发"],views:1234,comments:2,content:`
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
    `}],m="blog_home_cfg",g={title:"我的个人博客",subtitle:"记录生活，分享知识"};function I(){if(localStorage.getItem(e.profile)||localStorage.setItem(e.profile,JSON.stringify(c)),localStorage.getItem(e.categories)||localStorage.setItem(e.categories,JSON.stringify(r)),localStorage.getItem(e.articles)||localStorage.setItem(e.articles,JSON.stringify(a)),!localStorage.getItem(e.comments)){const t={1:[{id:1,author:"小明",time:"2024-01-16T08:00:00.000Z",content:"写得很清晰，受教了！",likes:12},{id:2,author:"小红",time:"2024-01-16T09:30:00.000Z",content:"Composition API 的例子很实用。",likes:5}],2:[{id:1,author:"读者A",time:"2024-01-11T10:00:00.000Z",content:"学习方法对我很有帮助！",likes:3}],3:[{id:1,author:"后端爱好者",time:"2024-01-06T12:00:00.000Z",content:"优化建议很到位。",likes:8},{id:2,author:"路人甲",time:"2024-01-06T13:15:00.000Z",content:"准备试试这些技巧。",likes:2},{id:3,author:"性能控",time:"2024-01-06T15:20:00.000Z",content:"不错的总结！",likes:6}]};localStorage.setItem(e.comments,JSON.stringify(t))}localStorage.getItem(m)||localStorage.setItem(m,JSON.stringify(g))}I();function h(){try{const t=localStorage.getItem(e.profile);return t?JSON.parse(t):{...c}}catch{return{...c}}}function N(t){localStorage.setItem(e.profile,JSON.stringify(t))}function y(){try{const t=localStorage.getItem(e.categories);return t?JSON.parse(t):[...r]}catch{return[...r]}}function O(t){localStorage.setItem(e.categories,JSON.stringify(t))}function u(){try{const t=localStorage.getItem(e.articles);return t?JSON.parse(t):[...a]}catch{return[...a]}}function C(t){localStorage.setItem(e.articles,JSON.stringify(t))}function J(t){return u().find(i=>i.id===Number(t))||null}function v(t){const o=u().sort((n,s)=>n.id-s.id),i=o.findIndex(n=>n.id===Number(t));return{prev:i>0?{id:o[i-1].id,title:o[i-1].title}:null,next:i>=0&&i<o.length-1?{id:o[i+1].id,title:o[i+1].title}:null}}function d(){try{const t=localStorage.getItem(e.comments);return t?JSON.parse(t):{}}catch{return{}}}function f(t){localStorage.setItem(e.comments,JSON.stringify(t))}function w(t){const o=d();return o[t]?o[t]:[]}function b(t,o,i="当前用户"){const n=d(),s=n[t]||[],l={id:s.length?Math.max(...s.map(S=>S.id))+1:1,author:i,time:new Date().toISOString(),content:o,likes:0},p=[...s,l];return n[t]=p,f(n),l}function P(t,o){const i=d(),n=i[t]||[],s=n.findIndex(l=>l.id===o);s>=0&&(n[s].likes+=1,i[t]=n,f(i))}function T(){try{const t=localStorage.getItem(m);return t?JSON.parse(t):{...g}}catch{return{...g}}}export{y as a,T as b,b as c,J as d,w as e,v as f,u as g,h,d as i,f as j,C as k,P as l,O as m,N as s};
