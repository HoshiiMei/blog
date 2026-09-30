<template>
  <div class="tag">
    <p class="tag-stats">
      共 {{ tagEntries.length }} 个标签 · {{ posts.length }} 篇文章
      <span v-if="invalidTag" class="tag-miss">标签「{{ invalidTag }}」不存在，已为你显示全部文章</span>
    </p>

    <div class="tag-list">
      <button
        type="button"
        :class="['item', { active: active === null }]"
        @click="clearTag"
      >
        <span class="name">全部</span>
        <span class="count">{{ posts.length }}</span>
      </button>
      <button
        v-for="t in tagEntries"
        :key="t.name"
        type="button"
        :class="['item', { active: active === t.name, hot: t.count >= 3 }]"
        @click="toggleTag(t.name)"
      >
        <span class="name">{{ t.name }}</span>
        <span class="count">{{ t.count }}</span>
      </button>
    </div>

    <BlogList :posts="active ? (tagData[active] ?? []) : posts" :click="setTag" />
  </div>
</template>

<script setup lang="ts">
import BlogList from './BlogList.vue'
import { data as posts, type PostData } from '../posts.data'
import { ref, onMounted } from 'vue'

const active = ref<string | null>(null)
const invalidTag = ref<string | null>(null)
const tagData: Record<string, PostData[]> = {}

for (const post of posts) {
  if (!post.tags) continue
  for (const tag of post.tags) {
    if (!tagData[tag]) tagData[tag] = []
    tagData[tag].push(post)
  }
}

// 标签按文章数从多到少排列，数量相同的按名称排序
const tagEntries = Object.entries(tagData)
  .map(([name, list]) => ({ name, count: list.length }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh'))

const syncUrl = (tag: string | null) => {
  const url = tag ? `?q=${encodeURIComponent(tag)}` : location.pathname
  history.replaceState(null, document.title, url)
}

const setTag = (tag: string) => {
  invalidTag.value = null
  active.value = tag
  syncUrl(tag)
}

const toggleTag = (tag: string) => {
  if (active.value === tag) clearTag()
  else setTag(tag)
}

const clearTag = () => {
  invalidTag.value = null
  active.value = null
  syncUrl(null)
}

onMounted(() => {
  const q = new URLSearchParams(location.search).get('q')
  if (!q) return
  if (tagData[q]) {
    active.value = q
  } else {
    // 无效的 ?q= 参数：给出提示并显示全部，而不是静默空白
    invalidTag.value = q
  }
})
</script>

<style lang="scss">
.tag {
  /* 与文章页/首页卡片流对齐：同一根 800px 内容列，水平居中 */
  max-width: 800px;
  margin: 64px auto 0;

  .tag-stats {
    margin: 0 4px 16px;
    font-size: 14px;
    color: var(--color-gray);
  }

  .tag-miss {
    margin-left: 8px;
    color: #b29400;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 4px 28px;
  }

  .item {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 15px;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    background: var(--color-card);
    color: var(--color-gray);
    font-family: var(--global-font);
    font-size: 14px;
    line-height: 1.5;
    cursor: pointer;
    transition: color 0.2s ease-out, border-color 0.2s ease-out,
      background-color 0.2s ease-out, transform 0.15s ease-out;

    .name {
      font-weight: 500;
    }

    .count {
      min-width: 20px;
      padding: 0 6px;
      border-radius: 999px;
      font-size: 12px;
      text-align: center;
      background: var(--color-accent-soft);
      color: var(--color-accent);
    }

    &:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
      transform: translateY(-1px);
    }

    &.active {
      color: var(--color-accent);
      border-color: var(--color-accent);
      background: var(--color-accent-soft);

      .count {
        background: var(--color-accent);
        color: #ffffff;
      }
    }
  }

  /* 高产标签（≥3 篇）名称加粗，形成视觉权重 */
  .item.hot .name {
    font-weight: 700;
  }
}

html.dark .tag .tag-miss {
  color: #e0c84f;
}

/* 移动端：卡片流保持通栏贴边（与首页一致），胶囊和统计行留出边距 */
@media (max-width: 720px) {
  .tag .tag-stats,
  .tag .tag-list {
    margin-left: 16px;
    margin-right: 16px;
  }
}
</style>
