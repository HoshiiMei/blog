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

        <template v-else-if="frontmatter.layout === 'lab'">
          <Lab />
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
import Lab from './Lab.vue'
import ToTop from './ToTop.vue'

// 本地化 Merriweather 字体（替代 Google Fonts CDN）
import '@fontsource/merriweather/latin-400.css'
import '@fontsource/merriweather/latin-700.css'
import '@fontsource/merriweather/latin-400-italic.css'

// 引入 Vue 的 computed 和 VitePress 的 API
import { useRoute, useData } from 'vitepress'
import { data as posts } from '../posts.data'

// 获取路由和当前页面的数据（包括 frontmatter）
const route = useRoute()
const { frontmatter } = useData()
// frontmatter 可以直接读取对应 md 文件头部 --- 之间的数据
</script>

<style lang="scss">
/* =========================================
   鸿蒙字体 (HarmonyOS Sans) — 本地托管
   ========================================= */
@font-face {
  font-family: 'HarmonyOS Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/HarmonyOS_Sans_SC_Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'HarmonyOS Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/HarmonyOS_Sans_SC_Bold.woff2') format('woff2');
}

/* Merriweather 字体通过 @fontsource 本地导入（见 script setup） */


/* 保持你原有的全局样式不变 */
html {
  scroll-behavior: smooth;
  --global-font: "HarmonyOS Sans", "Noto Serif SC", "MicroSoft Yahei";
  --color-accent: #5b9bd5;
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

/* Lucide 图标全局对齐：让 SVG 和文字坐在同一条基线上 */
svg.lucide {
  vertical-align: -0.125em;
  flex-shrink: 0;
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
