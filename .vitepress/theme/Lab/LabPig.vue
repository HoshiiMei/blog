<template>
  <div
    class="lab-pig"
    :class="{ floating: isFloating }"
    ref="pigContainer"
    @click="onClick"
  >
    <!-- 背景 -->
    <img src="/pig-back.svg" class="pig-background" alt="" />

    <!-- 正常状态：SVG 猪 -->
    <svg
      v-show="!isRolling"
      class="pig-media pig-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      xml:space="preserve"
    >
      <!-- ===== 右耳内侧（浅粉） ===== -->
      <path class="pig-ear-inner" style="fill:#FFA8A7" d="M70.52,93.98c0,1.5,0.44,5.26,0.44,6.76c0,1.5,0.94,4.5,5.02,4.93c6.31,0.65,7.86-2.64,8.59-6.48
        c0.99-5.21,0.41-11.4,0.41-11.4L70.52,93.98z"/>

      <!-- ===== 脸主体（桃粉） ===== -->
      <path class="pig-head" style="fill:#FFD2B1" d="M118.79,20.65c1.78-0.38,4.13,0.19,4.22-1.6
        c0.11-2.16-2.63-3.57-5.91-2.63c-3.27,0.93-4.32,3.75-4.32,3.75s-3.71-1.73-6.95,0.84
        c-3.66,2.91-3.94,9.01-3.94,9.01l5.16,4.97c0,0,0.13-5.76,0.94-7.88
        c1.03-2.72,2.82-2.25,2.82-2.25s-1.97,5.44,0.75,8.73c3.26,3.94,10.51,2.25,9.48-4.41
        c-0.61-3.96-4.41-6.38-4.41-6.38S117.45,20.93,118.79,20.65z M116.07,31.82
        c-2.99,0.34-2.06-4.88-1.5-6.38C117.01,26.47,118.51,31.53,116.07,31.82z"/>
      <path class="pig-face" style="fill:#FFD2B1" d="M45.97,24.86c18.19-7.4,54.05-9.08,66.17,10.28c12.25,19.57,3.8,32.1,2.39,35.62
        c-2.02,5.05-3.8,11.54-4.22,14.92c-0.5,3.97-1.13,14.22-1.55,16.33c-0.42,2.11-4.08,5.21-7.88,4.93c-3.8-0.28-6.9-2.67-7.18-4.93
        c-0.28-2.25,0.84-7.88-1.83-9.85c-2.67-1.97-10.7-0.7-15.49,1.83s-27.4,14.32-52.65,3.24C-1.61,86.1,4.3,62.02,10.5,54.98
        s5.49-8.45,5.49-8.45s-6.19,1.55-3.8-3.38s8.59-13.09,9.71-13.8c1.13-0.7,4.79-1.83,6.76-0.56c1.97,1.27,1.97,3.1,1.97,3.1
        S33.87,29.78,45.97,24.86z"/>
      <path class="pig-body-left" style="fill:#FFD2B1" d="M20.77,93.84c0,0,0.28,9.85,0.42,12.25s0.47,6.29,0.84,8.17c0.42,2.11,2.12,3.32,5.49,3.52
        c4.65,0.28,6.9-1.69,7.32-3.38c0.42-1.69,0.84-16.89,0.84-16.89L20.77,93.84z"/>
      <path class="pig-body-right" style="fill:#FFD2B1" d="M47.1,98.2c0,0-0.04,4.93,0.14,9.85c0.14,3.8,0.14,8.17,0.56,9.29c0.7,1.87,4.08,2.96,7.04,3.1
        c3.24,0.15,5.42-1.48,6.76-2.82c0.7-0.7,0.7-4.22,0.84-9.29c0.08-2.96,0.28-11.68,0.28-11.68L47.1,98.2z"/>

      <!-- ===== 鼻子桥 + 耳内（深粉） ===== -->
      <path class="pig-nose-bridge" style="fill:#E6508F" d="M62.82,43.58c-0.75-1.63-4.58,0-5.54,2.44c-1.22,3.1,0,6.1,1.78,9.48c1.22,2.31,6.76,9.48,13.14,7.98
        c7.42-1.75,5.35-13.33,5.07-14.64c-0.28-1.31-1.17-3.06-2.72-2.82c-1.78,0.28-0.93,3.24-0.84,5.44c0.09,2.44,0.19,6.57-2.72,7.23
        c-3.11,0.7-5.31-1.34-7.04-4.13c-1.69-2.72-3.66-4.79-3.1-7.32C61.2,45.68,63.38,44.8,62.82,43.58z"/>
      <path class="pig-ear-detail" style="fill:#E6508F" d="M24.81,40.48c-1.42-0.55-3.1,1.6-4.69,2.91s-4.5,3-5.63,1.6c-1.17-1.47,2.52-5.32,4.69-9.01
        c1.88-3.19,3.64-6.85,6.1-7.04c3.66-0.28,0.81-1.92-1.88-1.41c-1.97,0.38-4.69,2.16-6.19,5.16S8.57,43.3,10.92,46.77
        c2.7,4,8.63,2.16,11.26,0C24.81,44.61,26.5,41.14,24.81,40.48z"/>

      <!-- ===== 猪鼻子 ===== -->
      <g class="snout-group" :style="{ transformOrigin: '29px 75px', transform: `scale(${snoutScale})` }">
        <path class="pig-snout" style="fill:#FF7D86" d="M29.5,69.2c-5.16-0.94-13.38,0.5-13.98,6.29c-0.47,4.5,2.44,9.95,11.92,12.01
          c9.48,2.06,14.17-1.5,14.64-6.57C42.55,75.87,37.2,70.61,29.5,69.2z"/>
        <path class="pig-nostril pig-nostril-left" style="fill:#2D2D2B" d="M26.22,77.27c0.2,2.27-0.42,3.91-1.78,4.04c-1.36,0.12-3.27-1.48-3.47-3.75
          c-0.2-2.27,0.4-4.13,2.16-4.13C24.49,73.43,26.01,75,26.22,77.27z"/>
        <ellipse class="pig-nostril pig-nostril-right" transform="matrix(0.0941 -0.9956 0.9956 0.0941 -49.2991 103.738)" style="fill:#2D2D2B" cx="32.35" cy="78.96" rx="3.94" ry="2.62"/>
      </g>

      <!-- ===== 左眼 ===== -->
      <g class="eye-track" :style="{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }">
        <g transform="matrix(0.0985 -0.9951 0.9951 0.0985 -39.304 76.996)">
          <g class="eye-blink">
            <ellipse class="pig-eye pig-eye-left" style="fill:#2D2D2B" cx="22.84" cy="60.19" rx="4.78" ry="4.23"/>
          </g>
        </g>
      </g>

      <!-- ===== 右眼 ===== -->
      <g class="eye-track" :style="{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }">
        <g transform="matrix(0.0985 -0.9951 0.9951 0.0985 -18.4459 112.1081)">
          <g class="eye-blink">
            <ellipse class="pig-eye pig-eye-right" style="fill:#2D2D2B" cx="52.65" cy="66.23" rx="4.83" ry="4.1"/>
          </g>
        </g>
      </g>
    </svg>

    <!-- 翻身动画：Lottie -->
    <div
      v-show="isRolling"
      ref="lottieContainer"
      class="pig-media pig-lottie"
    />

    <!-- 哼哼气泡 -->
    <Transition name="henheng">
      <div v-if="showHengheng" class="henheng-bubble">
        &#8220;哼哼&#8221;
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import lottie from 'lottie-web'

const pigContainer = ref<HTMLElement | null>(null)
const lottieContainer = ref<HTMLElement | null>(null)
let lottieInstance: ReturnType<typeof lottie.loadAnimation> | null = null

// ===== 1. 浮动 =====
const isFloating = ref(true)

// ===== 2. 眼睛追鼠标（requestAnimationFrame 限 60fps） =====
const eyeOffset = reactive({ x: 0, y: 0 })
const MAX_RADIUS = 2
let rafId: number | undefined
let lastMouse: { x: number; y: number } | null = null

function onGlobalMouseMove(e: MouseEvent) {
  lastMouse = { x: e.clientX, y: e.clientY }
  if (rafId != null) return
  rafId = requestAnimationFrame(() => {
    rafId = undefined
    if (!lastMouse || !pigContainer.value || isRolling.value) return
    const m = lastMouse
    const rect = pigContainer.value.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    eyeOffset.x = ((m.x - cx) / (rect.width / 2)) * MAX_RADIUS
    eyeOffset.y = ((m.y - cy) / (rect.height / 2)) * MAX_RADIUS
    const len = Math.sqrt(eyeOffset.x ** 2 + eyeOffset.y ** 2)
    if (len > MAX_RADIUS) {
      eyeOffset.x = (eyeOffset.x / len) * MAX_RADIUS
      eyeOffset.y = (eyeOffset.y / len) * MAX_RADIUS
    }
  })
}

// ===== 3. 鼻子嗅闻 =====
const snoutScale = ref(1)
const showHengheng = ref(false)
let sniffTimer: ReturnType<typeof setInterval> | undefined

function doSniff() {
  if (isRolling.value) return

  // 是否哼哼（30% 概率，在整段嗅闻期间保持显示）
  const willHeng = Math.random() < 0.3
  if (willHeng) showHengheng.value = true

  // 第一下：大抽（1 → 1.08），过渡 150ms，停留 50ms
  snoutScale.value = 1.08
  setTimeout(() => {
    snoutScale.value = 1
    // 第二下：小抽（1 → 1.04），等上一段回弹完再接
    setTimeout(() => {
      snoutScale.value = 1.04
      setTimeout(() => {
        snoutScale.value = 1
        if (willHeng) showHengheng.value = false
      }, 250)
    }, 200)
  }, 200)
}

function startSniffing() {
  sniffTimer = setInterval(doSniff, 3500)
}

// ===== 4. 点击翻身（lottie-web） =====
const isRolling = ref(false)

function initLottie() {
  if (!lottieContainer.value) return
  lottieInstance = lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/pig-roll.json',
  })
  lottieInstance.addEventListener('complete', () => {
    eyeOffset.x = 0
    eyeOffset.y = 0
    isRolling.value = false
    isFloating.value = true
  })
}

function onClick() {
  if (isRolling.value || !lottieInstance) return
  isRolling.value = true
  isFloating.value = false
  lottieInstance.goToAndPlay(0)
}

onMounted(() => {
  startSniffing()
  initLottie()
  window.addEventListener('mousemove', onGlobalMouseMove)
})
onUnmounted(() => {
  clearInterval(sniffTimer)
  if (rafId != null) cancelAnimationFrame(rafId)
  if (lottieInstance) lottieInstance.destroy()
  window.removeEventListener('mousemove', onGlobalMouseMove)
})
</script>

<style lang="scss" scoped>
.lab-pig {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  user-select: none;
}

.pig-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

// ===== 1. 呼吸动感（底部定住，仅猪媒体缩放，背景不受影响） =====
.lab-pig.floating .pig-media {
  animation: pig-breathe 4s ease-in-out infinite;
  transform-origin: bottom center;
}

@keyframes pig-breathe {
  0%, 100% { transform: scaleY(1); }
  50%      { transform: scaleY(1.025); }
}

// ===== SVG / Lottie 共用样式 =====
.pig-media {
  position: relative;
  z-index: 1;
  width: 280px;
  height: auto;
  cursor: pointer;
}

// ===== 2. 眼睛追鼠标 =====
// ===== 3. 眨眼 =====
.eye-blink {
  animation: pig-blink 4.5s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes pig-blink {
  0%, 93%  { transform: scaleX(1); }
  96%, 99% { transform: scaleX(0.05); }
  100%     { transform: scaleX(1); }
}

// ===== 鼻子嗅闻过渡（必须跟 JS setTimeout 节奏一致） =====
.snout-group {
  transition: transform 0.15s ease-out;
}

// ===== 哼哼气泡（绝对定位，不撑大容器 → 背景不会抽搐） =====
.henheng-bubble {
  position: absolute;
  top: auto;
  bottom: 12px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  background: #fff;
  color: var(--color-text);
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  // 气泡小三角
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
  }
}

// 气泡过渡
.henheng-enter-active { transition: all 0.3s ease-out; }
.henheng-leave-active { transition: all 0.3s ease-in; }
.henheng-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.henheng-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
