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

  <!-- 图片灯箱：点击文章配图全屏预览 -->
  <Lightbox />
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Banner from './Banner.vue'
import Article from './Article.vue'
import BlogList from './BlogList.vue'
import Tag from './Tag.vue'
import Lab from './Lab.vue'
import ToTop from './ToTop.vue'
import Lightbox from './Lightbox.vue'

// 本地化 Merriweather 字体（替代 Google Fonts CDN）
import '@fontsource/merriweather/latin-400.css'
import '@fontsource/merriweather/latin-700.css'
import '@fontsource/merriweather/latin-400-italic.css'

// 引入 Vue 的 watch 和 VitePress 的 API
import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useData } from 'vitepress'
import { data as posts } from '../posts.data'

// 获取路由和当前页面的数据（包括 frontmatter）
const route = useRoute()
const { frontmatter, isDark } = useData()
// frontmatter 可以直接读取对应 md 文件头部 --- 之间的数据

// 昼夜切换平滑过渡：切换瞬间给 <html> 挂上 .theme-switching，
// 让所有元素的颜色统一参与 0.3s 过渡，400ms 后自动移除
let themeTimer: ReturnType<typeof setTimeout> | undefined
watch(isDark, () => {
  const root = document.documentElement
  root.classList.add('theme-switching')
  clearTimeout(themeTimer)
  themeTimer = setTimeout(() => root.classList.remove('theme-switching'), 400)
})

// 代码块复制按钮：全局事件委托（默认主题移除后由我们自行接线）
async function onCopyClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const btn = target.closest('button.copy')
  if (!btn) return
  const block = btn.closest('div[class*="language-"]')
  const code = block?.querySelector('pre code')
  if (!code) return
  const text = code.textContent ?? ''
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // 剪贴板 API 不可用时的兜底方案
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  btn.classList.add('copied')
  setTimeout(() => btn.classList.remove('copied'), 2000)
}

onMounted(() => {
  document.addEventListener('click', onCopyClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onCopyClick)
})
</script>

<style lang="scss">
/* 鸿蒙字体已改为 cn-font-split 分片版：
   样式表在 config.mts 的 head 里以 <link> 引入，
   按 unicode-range 按需加载，页面只会拉取用到的几十 KB 分片 */

/* Merriweather 字体通过 @fontsource 本地导入（见 script setup） */


/* 保持你原有的全局样式不变 */
html {
  scroll-behavior: smooth;
  color-scheme: light;
  --global-font: "HarmonyOS Sans", "Noto Serif SC", "MicroSoft Yahei";

  /* 浅色主题（默认） */
  --color-accent: #5b9bd5;
  --color-accent-soft: rgba(91, 155, 213, 0.12);
  --color-gray: #666;
  --color-gray-2: #aaa;
  --color-text: #02111d;
  --color-text-strong: #1a1a1a;
  --color-background: #eee;
  --color-border: #d0d7de;
  --color-card: #fdfbf7;
  --color-card-muted: #faf8f5;
  --color-surface: #ffffff;
  --color-hover: #f5f5f5;
  --color-header-bg: rgba(255, 255, 255, 0.8);
  --color-icon: #333;
  --color-code-bg: rgba(27, 31, 35, 0.05);

  --code-line-height: 24px;
  --code-font-family: monospace;
  --code-font-size: 15px;
}

/* 夜间模式 */
html.dark {
  color-scheme: dark;
  --color-accent: #7db4e6;
  --color-accent-soft: rgba(125, 180, 230, 0.14);
  --color-gray: #9aa0a8;
  --color-gray-2: #6f7680;
  --color-text: #e5e7eb;
  --color-text-strong: #f5f6f8;
  --color-background: #15171a;
  --color-border: #3a3f47;
  --color-card: #1f2328;
  --color-card-muted: #191d21;
  --color-surface: #24282e;
  --color-hover: #2c3138;
  --color-header-bg: rgba(30, 33, 38, 0.8);
  --color-icon: #d3d7dd;
  --color-code-bg: rgba(255, 255, 255, 0.08);
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--global-font);
  font-size: 16px;
  overflow-x: hidden;
  color: var(--color-text);
  background-color: var(--color-background);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 强制接管 VitePress 的底色变量（核心在 :root 上定义了 #fff/#1b1b1f，
   其 body 规则会盖过我们的 body 规则；html:root 权重更高，昼夜通吃） */
html:root {
  --vp-c-bg: var(--color-background);
}

/* 昼夜切换的全局平滑过渡：
   切换瞬间由 Layout 里的 watcher 给 <html> 挂 .theme-switching，
   统一接管所有元素的颜色过渡，400ms 后自动移除 */
html.theme-switching,
html.theme-switching *,
html.theme-switching *::before,
html.theme-switching *::after {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    fill 0.3s ease,
    stroke 0.3s ease,
    stop-color 0.3s ease !important;
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
