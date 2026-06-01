<template>
  <div class="abanner" :style="cover" v-if="isPost" />
  <div class="article">
    <div class="article-header">
      <h1 class="article-title">{{ data.page.value.title }}</h1>
      <div class="article-meta">
        @{{ data.page.value.frontmatter.author || data.theme.value.name }} · 发布于 {{ date }}
      </div>
      <div class="article-tags" v-if="data.page.value.frontmatter.tags?.length">
        <a v-for="t in data.page.value.frontmatter.tags" :href="`${base}tags/?q=${t}`">
          <i class="fa fa-tag"></i> {{ t }}
        </a>
      </div>
    </div>
    <Content class="content" />
    <div class="content nav">
      <span>
        <a :href="prevPost?.href" v-if="prevPost">
          <i class="fa fa-angle-left"></i>
          {{ prevPost.text }}
        </a>
      </span>
      <span>
        <a :href="nextPost?.href" v-if="nextPost">
          {{ nextPost.text }}
          <i class="fa fa-angle-right"></i>
        </a>
      </span>
    </div>
    <Waline v-if="isPost" ref="waline" />
    <TOC :data="data.page.value.headers" :active="active" />
  </div>
</template>

<script lang="ts">
declare const renderMathInElement: any;
declare const katex: any;
</script>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from 'vue'
import { data as posts } from '../posts.data'
import { throttleAndDebounce } from './utils'
import Waline from './Waline.vue'
import TOC from './TOC.vue'

const data = useData()
const base = data.site.value.base
const route = useRoute()
const active = ref(0)
const imageMap = import.meta.glob('/posts/**/images/*.{png,jpg,webp}', { eager: true, query: '?url', import: 'default' })
const waline = ref<InstanceType<typeof Waline>>()

const isPost = computed(() => posts.findIndex(p => p.href == route.path.replace(base, '')) !== -1)
const postIndex = computed(() => posts.findIndex(p => p.href == route.path.replace(base, '')))

const date = computed(() => {
  const ts = data.page.value.frontmatter.date || data.page.value.lastUpdated
  return ts ? new Date(ts).toLocaleDateString('sv-SE') : ''
})

const cover = computed(() => {
  if (!isPost.value) return ''
  const fc = data.page.value.frontmatter.cover
  if (fc) {
    const idx = postIndex.value
    if (idx >= 0) {
      const resolved = imageMap[`/posts/${posts[idx].dir}/${fc}`] as string
      return `background-image: url(${resolved || data.theme.value.cover})`
    }
  }
  return `background-image: url(${data.theme.value.cover})`
})

const prevPost = computed(() => {
  const idx = postIndex.value
  if (idx > 0) return { href: base + posts[idx - 1].href, text: posts[idx - 1].title }
  return null
})
const nextPost = computed(() => {
  const idx = postIndex.value
  if (idx >= 0 && idx + 1 < posts.length) return { href: base + posts[idx + 1].href, text: posts[idx + 1].title }
  return null
})

const updateKatex = () => {
  if (typeof renderMathInElement === 'undefined') return
  const el = document.querySelector('.article .content')
  if (!el) return
  renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
    ],
  })
}

watch(() => data.page.value, () => {
  waline.value?.update()
  if (typeof window !== 'undefined') {
    nextTick(() => updateKatex())
  }
})

const setActiveLink = () => {
  const headers = data.page.value.headers
  if (headers.length == 0) return
  for (let i = 0; i < headers.length; i++) {
    const el = document.getElementById(headers[i].slug)
    const rect = el?.getBoundingClientRect()!
    if (rect.top > 200) {
      let hash = ' '
      if (i > 0) {
        active.value = i - 1
        hash = '#' + headers[i - 1].slug
      }
      history.replaceState(null, document.title, hash)
      return
    }
  }
  active.value = headers.length - 1
  history.replaceState(null, document.title, '#' + headers[headers.length - 1].slug)
}
const onScroll = throttleAndDebounce(setActiveLink, 300)

onMounted(() => {
  setActiveLink()
  window.addEventListener('scroll', onScroll)
  if (import.meta.env.DEV) {
    let el = document.querySelector<HTMLScriptElement>('script[src*="auto-render"]')
    if (el) el.onload = () => updateKatex()
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss">
.abanner {
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  margin-top: 64px;
}

.article {
  position: relative;
  max-width: 800px;
  margin: auto;

  .article-header {
    text-align: center;
    padding-top: 6.5em;
    margin-bottom: 1.5em;
  }
  .article-title {
    font-size: 2em;
    margin: 0;
    color: var(--color-text);
  }
  .article-meta {
    font-size: 14px;
    color: var(--color-gray);
    margin-top: 1em;
  }
  .article-tags {
    margin-top: 1em;
    a {
      display: inline-block;
      margin: 0 4px;
      padding: 2px 12px;
      font-size: 12px;
      color: var(--color-accent);
      border: 1px solid var(--color-accent);
      border-radius: 20px;
      transition: all 0.2s ease;
      &:hover {
        color: #fff;
        background: var(--color-accent);
      }
    }
  }

  .content {
    margin: 0.5em;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    margin: 2em 0.5em;
    gap: 1em;

    span {
      flex: 1;
      max-width: 50%;
      &:last-child {
        text-align: right;
      }
    }

    a {
      display: block;
      max-width: 100%;
      padding: 0.8em 1em;
      border-radius: 8px;
      color: var(--color-text);
      background: #fdfbf7;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
      font-size: 14px;
      transition: all 0.25s ease;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        color: var(--color-accent);
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        transform: translateY(-2px);
      }
    }
    .fa { margin: 0 6px; }
  }
}

.content {
  color: var(--color-text);
  font-size: 17px;
  line-height: 1.8;

  p {
    margin: 1.2em 0;
  }

  a {
    color: var(--color-accent);
    position: relative;
    transition: color 0.2s ease-out;

    &.header-anchor {
      float: left;
      margin-top: 0.125em;
      margin-left: -0.87em;
      padding-right: 0.23em;
      font-size: 0.85em;
      opacity: 0;
    }

    &:hover {
      color: var(--color-accent);

      &:after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }

    &:after {
      content: "";
      position: absolute;
      transform: scaleX(0);
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--color-accent);
      transition: transform 0.2s ease-out;
      transform-origin: right;
    }
  }

  @for $i from 1 through 6 {
    h#{$i}:hover .header-anchor {
      opacity: 1;
    }
  }

  h1 { font-size: 2em; margin: 1.2em 0 0.6em; }
  h2 {
    font-size: 1.5em;
    margin: 1.5em 0 0.6em;
    padding-bottom: 0.3em;
    border-bottom: 1px dashed var(--color-border);
  }
  h3, h4, h5, h6 {
    position: relative;
    text-align: center;

    &::before {
      position: absolute;
      left: 0;
    }
  }
  h3 {
    font-size: 1.25em; margin: 1.3em 0 0.5em;
    &::before { content: '# '; color: #f06292; text-shadow: 1px 1px 0 #f8bbd0; }
  }
  h4 {
    font-size: 1.1em; margin: 1em 0 0.4em;
    &::before { content: '## '; color: #f06292; text-shadow: 1px 1px 0 #f8bbd0; }
  }
  h5 {
    font-size: 1em; margin: 1em 0 0.4em;
    &::before { content: '### '; color: #f06292; text-shadow: 1px 1px 0 #f8bbd0; }
  }
  h6 {
    font-size: 0.9em; margin: 1em 0 0.4em;
    &::before { content: '#### '; color: #f06292; text-shadow: 1px 1px 0 #f8bbd0; }
  }

  blockquote {
    margin: 1.5em 0;
    padding: 0.8em 1.2em;
    border-left: 4px solid var(--color-accent);
    background: #faf8f5;
    border-radius: 0 8px 8px 0;
    p { margin: 0.5em 0; }
  }

  img {
    max-width: 100%;
    border-radius: 6px;
    display: block;
    margin: 1.5em auto;
  }

  figure {
    margin: 1.5em 0;
    text-align: center;
    img { margin-bottom: 0.4em; }
    figcaption {
      font-size: 14px;
      color: var(--color-gray);
    }
  }

  hr {
    border: none;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-border), transparent);
    margin: 2em 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 15px;
    th, td {
      border: 1px solid var(--color-border);
      padding: 10px 14px;
      text-align: left;
    }
    th {
      background: #f5f5f5;
      font-weight: 600;
    }
    tr:nth-child(even) td {
      background: #fafafa;
    }
  }

  ul, ol {
    padding-left: 1.5em;
    li {
      margin: 0.4em 0;
      line-height: 1.7;
    }
  }

  strong {
    color: #1a1a1a;
  }
}

.katex-display {
  overflow: auto hidden;
}

@media (max-width: 800px) {
  .abanner {
    height: 200px;
  }
}

.custom-block {

  &.tip,
  &.info,
  &.warning,
  &.danger {
    margin: 1rem 0;
    border-left: 0.5rem solid;
    padding: 0.1rem 1.5rem;
    overflow-x: auto;
  }

  &.tip {
    background-color: #f3f5f7;
    border-color: #3eaf7c;
  }

  &.info {
    background-color: #f3f5f7;
    border-color: #476582;
  }

  &.warning {
    border-color: #e7c000;
    color: #6b5900;
    background-color: #fff7d0;

    .custom-block-title {
      color: #b29400;
    }
  }

  &.danger {
    border-color: #c00;
    color: #4d0000;
    background-color: #ffe6e6;

    .custom-block-title {
      color: #900000;
    }
  }
}

.custom-block-title {
  font-weight: bold;
}

code {
  font-size: var(--code-font-size);
  border-radius: 4px;
  padding: 0.2em 0.4em;
  background-color: rgba(27, 31, 35, 0.05);
}

html {
  --vp-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
  --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E");
}

.vp-doc [class*="language-"] > span.lang {
      top: 8px;
      right: 56px;
      left: auto;
      transform: none;
      font-size: 12px;
      color: var(--color-gray);
    }


div[class*="language-"] {
  position: relative;
  line-height: var(--code-line-height);
  font-size: var(--code-font-size);
  font-family: var(--code-font-family);
  display: flex;
  flex-direction: row-reverse;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding-top: 32px;
  overflow: hidden;

  button.copy {
    position: absolute;
    top: 8px;
    right: 8px;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: white;
    background-image: var(--vp-icon-copy);
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 4px;
    opacity: 0;
    border: 1px solid var(--color-border);
  }

  &:hover button.copy {
    opacity: 1;
  }

  .lang {
    position: absolute;
    transform: translate(-50%, -28px);
    left: 50%;
    user-select: none;
  }

  pre {
    margin: 0;
    margin-left: 16px;
    flex-grow: 1;
    overflow: scroll;
  }

  code {
    background-color: transparent;
    padding: 0;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 32px;
    background: #f6f8fa;
    border-bottom: 1px solid var(--color-border);
  }

  &:after {
    content: "";
    position: absolute;
    top: 10px;
    left: 12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fc625d;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  }
}

.line-numbers-wrapper {
  padding-left: 16px;
  color: var(--color-gray);
  user-select: none;
}
</style>
