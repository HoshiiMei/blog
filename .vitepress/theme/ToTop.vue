/*返回顶部按钮*/

<template>
  <Transition name="fade">
    <button
      v-show="isVisible"
      class="back-to-top"
      @click="scrollToTop"
      title="回到顶部"
      aria-label="回到顶部"
    >
      <i class="fa fa-arrow-up"></i>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 控制按钮是否显示的变量
const isVisible = ref(false)

// 监听页面滚动
const handleScroll = () => {
  // 当页面向下滚动超过 300px 时，显示按钮
  isVisible.value = window.scrollY > 300
}

// 核心逻辑：平滑滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // passive: true 是一个性能优化小技巧，告诉浏览器我们不会阻止默认滚动，让页面更流畅
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // 页面一加载就检查一下当前滚动位置
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
.back-to-top {
  position: fixed;
  bottom: 40px;      /* 距离底部 40px */
  right: 40px;       /* 距离右侧 40px */
  width: 48px;
  height: 48px;
  border-radius: 50%; /* 正圆形 */
  background-color: #ffffff;
  color: #333333;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 加一点现代感的立体阴影 */

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 99;       /* 确保不会被其他元素挡住 */

  transition: all 0.3s ease; /* 鼠标悬浮时的动画时间 */

  /* 鼠标放上去时的交互反馈 */
  &:hover {
    background-color: #007bff; /* 变成主题蓝 */
    color: #ffffff;            /* 箭头变白 */
    transform: translateY(-5px); /* 微微向上浮起，暗示“向上”的动作 */
    box-shadow: 0 6px 16px rgba(0, 123, 255, 0.3); /* 阴影跟着变成蓝色且变大 */
  }
}

/* --- Vue 专属：淡入淡出动画控制 --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px); /* 出现的时候不仅是变亮，还会从下方稍微往上滑一点点 */
}
</style>
