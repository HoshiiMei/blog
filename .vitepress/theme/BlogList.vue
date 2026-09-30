<template>
  <div class="bloglist">
    <div class="section">
      <i class="fa-regular fa-bookmark"></i> <span class="section-label">Article</span>
    </div>
    <div class="card" v-for="p in posts">
      <div class="image" @click="goPost(base + p.href)">
        <div class="image-bg" :style="coverStyle(p)"></div>
        <div class="image-overlay">
          <div class="overlay-top">
            <div class="date">
              <i class="fa-regular fa-clock"></i>
              发布于 {{ new Date(p.create).toLocaleDateString('sv-SE') }}
            </div>
            <div class="tags">
              <template v-if="click">
                <a v-for="t in p.tags" href="#" @click="click(t)">
                  <i class="fa-solid fa-tag"></i>
                  {{ t }}
                </a>
              </template>
              <template v-else>
                <a v-for="t in p.tags" :href="`${base}tags/?q=${t}`">
                  <i class="fa fa-tag"></i>
                  {{ t }}
                </a>
              </template>
            </div>
          </div>
          <div class="overlay-bottom">
            <div class="title">{{ p.title }}</div>
          </div>
        </div>
      </div>
      <div class="info">
          <div class="excerpt-label">
            <i class="fa-solid fa-bars-staggered"></i> 摘要
          </div>
        <div class="content" v-html="p.excerpt"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PostData } from '../posts.data'
import { useData, useRouter } from 'vitepress'
const base = useData().site.value.base
const router = useRouter()
const { posts, click = null } = defineProps<{
  posts: PostData[]
  click?: (tag: string) => void
}>()

const imageMap = import.meta.glob('/posts/**/images/*.{png,jpg,webp}', { eager: true, query: '?url', import: 'default' })

function coverStyle(p: PostData) {
  if (!p.cover) return ''
  const dir = p.href.replace(/\.html$/, '')
  const url = imageMap[`/${dir}/${p.cover}`] as string
  if (url) return `background-image: url(${url})`
  return ''
}

function goPost(url: string) {
  // 使用 VitePress 路由跳转，避免整页刷新，让页面切换动画生效
  router.go(url)
}
</script>

<style lang="scss">
.bloglist {
  max-width: 800px;
  margin: auto;

  .section {
    padding-top: 24px;
    color: var(--color-accent);
  }

  .fa-bookmark {
    font-size: 20px;
  }

  .section-label {
    font-family: 'Merriweather', 'Noto Serif SC', serif;
    font-size: 18px;
  }

  // ===== 旧：日期/标签独立样式，已移入 .image-overlay =====
  // .date,
  // .view,
  // .tags {
  //   font-size: 14px;
  // }

  // ===== 旧：全局 .fa 大小（保留，但缩小） =====
  .fa {
    font-size: 16px;
    vertical-align: middle;
  }

  .card {
    color: var(--color-gray);
    margin: 20px 0;
    // ===== 旧 padding: 24px → 改成 0，内边距由 .info 管理 =====
    padding: 0;
    border-radius: 10px;
    background: var(--color-card);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10);
    }
  }

  // ===== 新：图片容器 + 背景层 + 叠层 =====
  .image {
    position: relative;
    height: 360px;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
    overflow: hidden;
  }

  .image-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: top center;
    transition: transform 0.4s ease;
  }

  .card:hover .image-bg {
    transform: scale(1.08);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;

    // 标签链接需要可点击
    .tags a {
      pointer-events: auto;
    }
  }

  .overlay-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 16px 0;
  }

  .overlay-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 30px;
    height: 70px;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    pointer-events: auto;
  }

  .date {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 4px;
    padding: 4px 8px;

    .fa-clock {
      font-size: 14px;
      margin-right: 2px;
      vertical-align: middle;
    }
  }

  .tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;

    a {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.85);
      background: rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border-radius: 4px;
      padding: 4px 8px;
      transition: color 0.2s, background 0.2s;

      &:hover {
        color: #fff;
        background: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .title {
    font-family: 'Merriweather', 'Noto Serif SC', serif;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    font-size: 24px;
    margin: 0;
    line-height: 1.4;
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--color-accent);
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }

  // ===== 摘要区 =====
  .info {
    padding: 0 24px 6px;
  }

  .excerpt-label {
    font-family: 'Merriweather', 'Noto Serif SC', serif;
    font-weight: 700;
    font-size: 12px;
    padding-top: 8px;
    color: var(--color-gray-2);
    margin-bottom: 0px;
  }

  // ===== 旧：摘要无样式，新增 =====
  .content {
    font-size: 16px;
    line-height: 1.7;
    color: var(--color-gray);

    :first-child {
      margin-top: 0;
    }
    :last-child{
      margin-bottom:0;
    }
  }

  // ===== 旧：卡片内标签链接（已移入 .image-overlay .tags） =====
  // .tags a {
  //   margin-right: 8px;
  //   color: var(--color-gray);
  //   transition: color 0.2s ease-out;
  //
  //   &:hover {
  //     color: var(--color-accent);
  //   }
  // }
}

// ===== 移动端适配 =====
@media (max-width: 720px) {
  .bloglist {
    .card {
      margin: 0 0 1px 0;
      border-radius: 0;
      background: var(--color-card);
      box-shadow: none;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }

    .image {
      border-radius: 0;
      height: 180px;
    }

    .info {
      padding: 0 16px 8px;
    }

    .section {
      margin: 0 24px;
    }
  }
}
</style>
