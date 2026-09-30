<template>
  <Teleport to="body">
    <Transition name="lb-fade">
      <div v-if="visible" class="lb-overlay" @click="close">
        <img class="lb-img" :src="src" :alt="alt" @click.stop />
        <p v-if="alt" class="lb-caption">{{ alt }}</p>
        <button class="lb-close" type="button" aria-label="关闭预览" @click="close">×</button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const src = ref('')
const alt = ref('')

function onDocClick(e: MouseEvent) {
  if (visible.value) return
  const t = e.target as HTMLElement
  // 只接管文章正文里的图片；链接图片、封面等不抢点击
  if (!(t instanceof HTMLImageElement)) return
  if (!t.closest('.article .content') || t.closest('a')) return
  e.preventDefault()
  src.value = t.currentSrc || t.src
  alt.value = t.alt || ''
  visible.value = true
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && visible.value) close()
}

function close() {
  visible.value = false
}

// 打开时锁定背景滚动
watch(visible, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style lang="scss">
.lb-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000; /* 高于搜索弹窗(999) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 32px;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(8px);
  cursor: zoom-out;
}

.lb-img {
  max-width: min(92vw, 1200px);
  max-height: 82vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.5);
  cursor: default;
}

.lb-caption {
  margin: 0;
  max-width: 80vw;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  text-align: center;
}

.lb-close {
  position: absolute;
  top: 18px;
  right: 22px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: scale(1.06);
  }
}

.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.22s ease;
}

.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}
</style>
