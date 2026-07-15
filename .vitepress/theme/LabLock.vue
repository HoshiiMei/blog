<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const SECRET = 'lab'
const unlocked = ref(false)
const showHint = ref(false)
const buffer = ref('')

function onKey(e: KeyboardEvent) {
  // 忽略输入框内的按键
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

  buffer.value += e.key.toLowerCase()
  buffer.value = buffer.value.slice(-SECRET.length)

  if (buffer.value === SECRET) {
    unlocked.value = true
  } else if (buffer.value.length >= SECRET.length && buffer.value !== SECRET) {
    // 只保留最后几个字符，防止无限增长
  }

  // 输入到 secret 长度的一半时给个微弱提示
  if (buffer.value.length >= Math.ceil(SECRET.length / 2) && buffer.value === SECRET.slice(0, buffer.value.length)) {
    showHint.value = true
    clearTimeout(window._labHintTimer)
    window._labHintTimer = setTimeout(() => showHint.value = false, 1500)
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="lab-lock">
    <Transition name="lock-fade" mode="out-in">
      <!-- 锁定状态 -->
      <div v-if="!unlocked" key="locked" class="lock-screen">
        <div class="lock-icon">🔒</div>
        <h2>此区域已锁定</h2>
        <p class="lock-desc">在此页面输入正确密钥以解锁</p>
        <Transition name="hint-fade">
          <p v-if="showHint" class="hint-text">密钥就在你手边……继续输入</p>
        </Transition>
      </div>

      <!-- 解锁后 -->
      <div v-else key="unlocked" class="lab-content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.lab-lock {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lock-screen {
  text-align: center;
  user-select: none;
}

.lock-icon {
  font-size: 64px;
  margin-bottom: 16px;
  animation: lock-pulse 2s ease-in-out infinite;
}

h2 {
  font-family: 'Merriweather', 'Noto Serif SC', serif;
  font-size: 1.5em;
  color: var(--color-text);
  margin: 0 0 8px;
}

.lock-desc {
  color: var(--color-gray);
  font-size: 14px;
  margin: 0;
}

.hint-text {
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-accent);
  opacity: 0.8;
}

@keyframes lock-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.lock-fade-enter-active,
.lock-fade-leave-active {
  transition: all 0.5s ease;
}
.lock-fade-enter-from,
.lock-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.hint-fade-enter-active { transition: opacity 0.3s; }
.hint-fade-leave-active { transition: opacity 0.3s; }
.hint-fade-enter-from,
.hint-fade-leave-to { opacity: 0; }
</style>
