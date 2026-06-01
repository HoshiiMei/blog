<template>
  <div class="toc">
    <ol>
      <li v-for="(h, i) in items" :class="['h' + h.level, { 'active': active === i }]">
        <a :href="'#' + h.slug">
          <span class="tree-prefix">{{ h.prefix }}</span>{{ h.title }}
        </a>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Header } from 'vitepress'

const props = defineProps<{
  data: Header[]
  active: number
}>()

interface TreeItem extends Header {
  prefix: string
}

function getTreePrefixes(headers: Header[]): TreeItem[] {
  if (!headers.length) return []

  const levels = headers.map(h => h.level)
  const minLevel = Math.min(...levels)
  const BRANCH = '├── '
  const LAST   = '└── '
  const PIPE   = '│   '
  const SPACE  = '    '

  return headers.map((h, i) => {
    let prefix = ''

    for (let lev = minLevel; lev < h.level; lev++) {
      let pipe = false
      for (let j = i + 1; j < headers.length; j++) {
        if (headers[j].level <= lev) break
        if (headers[j].level > lev) { pipe = true; break }
      }
      prefix += pipe ? PIPE : SPACE
    }

    let isLast = true
    for (let j = i + 1; j < headers.length; j++) {
      if (headers[j].level < h.level) break
      if (headers[j].level === h.level) { isLast = false; break }
    }
    prefix += isLast ? LAST : BRANCH

    return { ...h, prefix }
  })
}

const items = computed(() => getTreePrefixes(props.data))
</script>

<style lang="scss">
.toc {
  position: fixed;
  top: 80px;
  right: 24px;
  width: 240px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  z-index: 50;

  ol {
    list-style: none;
    padding-inline-start: 0;
    font-family: "Courier New", "Noto Sans SC", monospace;
    font-size: 13px;
    line-height: 1.8;
  }

  li {
    a {
      display: block;
      color: var(--color-text);
      text-decoration: none;
      padding: 1px 0;
      transition: color 0.15s;

      &:hover {
        color: var(--color-accent);
      }
    }

    &.active a {
      color: var(--color-accent);
      font-weight: bold;
    }

    .tree-prefix {
      color: var(--color-gray);
      user-select: none;
    }
  }
}

@media (max-width: 1024px) {
  .toc {
    display: none;
  }
}
</style>
