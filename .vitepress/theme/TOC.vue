<template>
  <div class="toc">
    <div class="toc-body">
      <ol>
        <li
          v-for="(h, i) in data"
          :key="h.slug"
          :class="['h' + h.level, { active: active === i }]"
        >
          <a :href="'#' + h.slug">
            <span class="toc-text">{{ h.title }}</span>
          </a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Header } from 'vitepress'

defineProps<{
  data: Header[]
  active: number
}>()
</script>

<style lang="scss">
.toc {
  position: fixed;
  top: 80px;
  right: 24px;
  width: 220px;
  z-index: 50;
}

/* 灰色悬浮胶囊：囊括包括标题文字在内的整个目录 */
.toc-body {
  background: rgba(102, 102, 102, 0.13);
  border-radius: 22px;
  padding: 14px 16px 14px 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

html.dark .toc-body {
  background: rgba(255, 255, 255, 0.08);
}

/* 悬停目录时，胶囊发光 */
.toc:hover .toc-body {
  box-shadow:
    0 0 12px rgba(91, 155, 213, 0.45),
    0 0 28px rgba(91, 155, 213, 0.25);
}

html.dark .toc:hover .toc-body {
  box-shadow:
    0 0 12px rgba(125, 180, 230, 0.40),
    0 0 28px rgba(125, 180, 230, 0.22);
}

/* 标题列表：衬线体、灰色小字，扁平结构不区分缩进 */
.toc ol {
  list-style: none;
  margin: 0;
  /* 左内边距给标题竖线留位：竖线画在列表自身的内边距区域里，
     否则列表滚动（overflow）会把左边缘外的竖线裁掉 */
  padding: 0 0 0 14px;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun", "Times New Roman", serif;
  font-size: 15px;
  line-height: 1.9;

  /* 滚动放在列表内部：外层容器不再裁切，胶囊的光晕才能完整呈现 */
  max-height: calc(100vh - 128px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-2) transparent;
}

.toc ol::-webkit-scrollbar {
  width: 4px;
}

.toc ol::-webkit-scrollbar-thumb {
  background: var(--color-gray-2);
  border-radius: 999px;
}

.toc ol::-webkit-scrollbar-track {
  background: transparent;
}

.toc li {
  position: relative;
}

/* 每个标题前独立的灰色竖线，彼此之间断开 */
.toc li::before {
  content: "";
  position: absolute;
  left: -13px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 1em;
  border-radius: 999px;
  background: var(--color-gray-2);
  opacity: 0.7;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.toc li a {
  display: block;
  padding: 1px 0;
  color: var(--color-gray);
  text-decoration: none;
  transition: color 0.2s ease;
}

/* 长标题省略号 */
.toc .toc-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc li a:hover {
  color: var(--color-accent);
}

/* 当前章节：竖条变主题色，文字加粗变色 */
.toc li.active::before {
  background: var(--color-accent);
  opacity: 1;
  height: 1.2em;
  box-shadow: 0 0 6px rgba(91, 155, 213, 0.5);
}

html.dark .toc li.active::before {
  box-shadow: 0 0 6px rgba(125, 180, 230, 0.45);
}

.toc li.active a {
  color: var(--color-accent);
  font-weight: 700;
}

/* 重叠保护：中窄屏（1025~1287px）让正文给目录让出右侧空间 */
@media (min-width: 1025px) and (max-width: 1287px) {
  main:has(.toc) {
    padding-right: 280px;
  }
}

@media (max-width: 1024px) {
  .toc {
    display: none;
  }
}
</style>
