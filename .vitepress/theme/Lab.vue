<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const SECRET = 'lab'
const unlocked = ref(false)
const showHint = ref(false)
const buffer = ref('')

let hintTimer: ReturnType<typeof setTimeout> | undefined

function onKey(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

  buffer.value += e.key.toLowerCase()
  buffer.value = buffer.value.slice(-SECRET.length)

  if (buffer.value === SECRET) {
    unlocked.value = true
  }

  if (buffer.value.length >= Math.ceil(SECRET.length / 2) && buffer.value === SECRET.slice(0, buffer.value.length)) {
    showHint.value = true
    clearTimeout(hintTimer)
    hintTimer = setTimeout(() => showHint.value = false, 1500)
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="lab-page">
    <Transition name="lock-fade" mode="out-in">
      <div v-if="!unlocked" key="locked" class="lock-screen">
        <div class="lock-icon">🔒</div>
        <h2>此区域已锁定</h2>
        <p class="lock-desc">在此页面输入正确密钥以解锁</p>
        <Transition name="hint-fade">
          <p v-if="showHint" class="hint-text">密钥就在你手边……继续输入</p>
        </Transition>
      </div>

      <div v-else key="unlocked" class="lab-content">
        <div class="lab-header">
          <h1>🧪 实验室</h1>
          <p>欢迎来到实验室。这里是一些实验性的互动内容和彩蛋。</p>
        </div>

        <div class="lab-placeholder">
          <p>更多内容即将到来……</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.lab-page {
  min-height: 80vh;
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

.lock-screen h2 {
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

// 解锁后内容
.lab-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 24px 48px;
}

.lab-header {
  text-align: center;
  margin-bottom: 48px;

  h1 {
    font-family: 'Merriweather', 'Noto Serif SC', serif;
    font-size: 2em;
    color: var(--color-text);
    margin: 0;
  }

  p {
    font-size: 16px;
    color: var(--color-gray);
    margin: 12px 0 0;
  }
}

.lab-placeholder {
  text-align: center;
  padding: 80px 24px;
  border: 2px dashed var(--color-border);
  border-radius: 16px;
  color: var(--color-gray);
  font-size: 15px;
}
</style>
