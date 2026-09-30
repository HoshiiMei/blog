<template>
  <header class="integrated-header">
    <nav class="pill-bar">
      <ul class="menu-list">
        <li v-for="m in menu" :key="m.name" class="menu-item">
          <a :href="withBase(m.url)" class="menu-link">{{ m.name }}</a>
        </li>
      </ul>

      <div class="divider"></div>

      <div class="icons-group">
        <button class="icon-btn theme" :title="isDark ? '切换到日间模式' : '切换到夜间模式'" @click="toggleTheme">
          <i :class="isDark ? 'fa fa-sun' : 'fa fa-moon'"></i>
        </button>
        <button class="icon-btn search" title="搜索" @click="openSearch">
          <i class="fa fa-search"></i>
        </button>
        <button class="icon-btn dice" title="随机" @click="goRandom">
          <i class="fa fa-dice"></i>
        </button>
      </div>
    </nav>

    <div class="profile-avatar">
      <img src="/images/avatar.webp" alt="用户头像" />
    </div>

    <!-- 搜索弹窗 -->
    <Teleport to="body">
      <Transition name="search-fade">
        <div v-if="searchVisible" class="search-overlay" @click.self="closeSearch">
          <div class="search-modal">
            <div class="search-bar">
              <i class="fa fa-search"></i>
              <input
                ref="searchInput"
                v-model="query"
                type="text"
                placeholder="搜索文章..."
                @keydown.escape="closeSearch"
                @keydown.enter="goFirst"
              />
              <button v-if="query" class="clear-btn" @click="query = ''">
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div class="search-results" v-if="query">
              <a
                v-for="p in results"
                :key="p.href"
                :href="base + p.href"
                class="result-item"
                @click="closeSearch"
              >
                <span class="result-title">{{ p.title }}</span>
                <span class="result-date">{{ new Date(p.create).toLocaleDateString('sv-SE') }}</span>
              </a>
              <div v-if="results.length === 0" class="no-results">无匹配结果</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { withBase, useData, useRouter } from 'vitepress'
import { ref, computed, nextTick } from 'vue'
import { data as posts } from '../posts.data'

interface MenuItem { name: string, url: string }

const menu: MenuItem[] = [
  { name: '首页', url: '/' },
  { name: '标签', url: '/tags/' },
  { name: '实验室', url: '/lab/' },
]

const data = useData()
const base = data.site.value.base
const router = useRouter()
const { isDark } = data

function toggleTheme() {
  isDark.value = !isDark.value
}

// 搜索
const searchVisible = ref(false)
const query = ref('')
const searchInput = ref<HTMLInputElement>()

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return posts
    .filter(p => p.title.toLowerCase().includes(q))
    .slice(0, 8)
})

function openSearch() {
  searchVisible.value = true
  query.value = ''
  nextTick(() => searchInput.value?.focus())
}

function closeSearch() {
  searchVisible.value = false
}

function goFirst() {
  if (results.value.length > 0) {
    // 使用 VitePress 路由跳转，避免整页刷新，让页面切换动画生效
    router.go(base + results.value[0].href)
  }
  closeSearch()
}

// 随机
function goRandom() {
  if (posts.length === 0) return
  const i = Math.floor(Math.random() * posts.length)
  // 使用 VitePress 路由跳转，避免整页刷新
  router.go(base + posts[i].href)
}
</script>

<style lang="scss">
header.integrated-header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  background: transparent;
  z-index: 100;

  .pill-bar {
    display: flex;
    align-items: center;
    background: var(--color-header-bg);
    border-radius: 24px;
    height: 48px;
    padding: 0 15px;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-right: 12px;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    .menu-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
      flex-grow: 1;
      gap: 10px;
    }

    .menu-item {
      margin: 0;
      white-space: nowrap;
    }

    .menu-link {
      font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun", "Times New Roman", serif;
      font-size: 16px;
      color: var(--color-icon);
      display: inline-block;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 20px;
      transition: all 0.3s ease-out;

      &:hover {
        background-color: var(--color-accent);
        color: #ffffff;
      }
    }

    .divider {
      margin: 0 10px;
      height: 18px;
      width: 1px;
      background-color: var(--color-border);
    }

    .icons-group {
      display: flex;
      align-items: center;
    }

    .icon-btn {
      background: transparent;
      border: none;
      padding: 0;
      outline: none;
      margin-left: 10px;
      cursor: pointer;
      color: var(--color-icon);
      font-size: 1.2rem;
      transition: transform 0.2s, color 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .profile-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-surface);
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--color-border);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

/* ===== 搜索弹窗 ===== */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  padding-top: 15vh;
}

.search-modal {
  width: 520px;
  max-width: 90vw;
  align-self: flex-start;
}

.search-bar {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border-radius: 12px;
  padding: 0 16px;
  height: 48px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  transition: background-color 0.3s ease;

  .fa-search {
    color: var(--color-gray);
    margin-right: 10px;
    font-size: 16px;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: var(--global-font);
    color: var(--color-text);
    &::placeholder { color: var(--color-gray-2); }
  }

  .clear-btn {
    background: none;
    border: none;
    color: var(--color-gray);
    cursor: pointer;
    padding: 4px;
    font-size: 14px;
    &:hover { color: var(--color-icon); }
  }
}

.search-results {
  margin-top: 8px;
  background: var(--color-surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  transition: background-color 0.3s ease;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  transition: background 0.15s;
  text-decoration: none;

  &:hover {
    background: var(--color-hover);
  }

  .result-title {
    color: var(--color-text);
    font-size: 15px;
  }

  .result-date {
    color: var(--color-gray);
    font-size: 13px;
    flex-shrink: 0;
    margin-left: 12px;
  }
}

.no-results {
  padding: 24px;
  text-align: center;
  color: var(--color-gray);
  font-size: 14px;
}

/* ===== 移动端适配 ===== */
@media (max-width: 720px) {
  header.integrated-header {
    top: 6px;

    .pill-bar {
      height: 40px;
      padding: 0 10px;
      border-radius: 20px;
      margin-right: 8px;

      .menu-link {
        font-size: 14px;
        padding: 4px 10px;
      }

      .divider {
        margin: 0 6px;
        height: 14px;
      }

      .icon-btn {
        font-size: 1rem;
        margin-left: 6px;
      }
    }

    .profile-avatar {
      width: 40px;
      height: 40px;
    }
  }
}

/* 搜索弹窗动画 */
.search-fade-enter-active { transition: opacity 0.2s ease; }
.search-fade-leave-active { transition: opacity 0.15s ease; }
.search-fade-enter-from,
.search-fade-leave-to { opacity: 0; }
</style>
