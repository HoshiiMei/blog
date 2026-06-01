<template>
  <div id="global-effects-layer" class="global-effects"></div>

  <Header />
  <aside />

  <main>
    <ToTop />

    <Transition name="fade-slide" mode="out-in">
      <div :key="route.path" class="page-container">

        <template v-if="frontmatter.home">
          <Banner />
          <BlogList :posts="posts" />
        </template>

        <template v-else-if="frontmatter.layout === 'tags'">
          <Tag />
        </template>

        <template v-else>
          <Article />
        </template>

      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Banner from './Banner.vue'
import Article from './Article.vue'
import BlogList from './BlogList.vue'
import Tag from './Tag.vue'
import ToTop from './ToTop.vue'

// 引入 Vue 的 computed 和 VitePress 的 API
import { useRoute, useData } from 'vitepress'
import { data as posts } from '../posts.data'

// 获取路由和当前页面的数据（包括 frontmatter）
const route = useRoute()
const { frontmatter } = useData()
// frontmatter 可以直接读取对应 md 文件头部 --- 之间的数据
</script>

<style lang="scss">
/* 保持你原有的全局样式不变 */
html {
  scroll-behavior: smooth;
  --global-font: "Noto Serif SC", "MicroSoft Yahei", serif;
  --color-accent: #2563eb;
  --color-gray: #666;
  --color-text: #02111d;
  --color-background: #eee;
  --color-border: #d0d7de;
  --code-line-height: 24px;
  --code-font-family: monospace;
  --code-font-size: 15px;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--global-font);
  font-size: 16px;
  overflow-x: hidden;
  color: var(--color-text);
  background-color: var(--color-background);
}

/* ... 原有的其他基础样式 (a, img, hr, 滚动条等) ... */

/* =========================================
   新增：基础的页面切换动态效果 (Vue Transition)
   ========================================= */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px); /* 进入时稍微从下方浮现 */
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* 离开时稍微向上隐去 */
}

/* =========================================
   新增：全局特效层样式预留
   ========================================= */
.global-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* 确保特效在所有内容的最底层 */
  pointer-events: none; /* 让鼠标点击能穿透特效层，不影响文章选中 */
}
</style>
