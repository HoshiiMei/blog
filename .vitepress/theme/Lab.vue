<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Content } from 'vitepress'

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
        <h2>好慈祥的老奶奶啊</h2>
        <Transition name="hint-fade">
          <p v-if="showHint" class="hint-text">滚木滚木棍</p>
        </Transition>
      </div>

      <div v-else key="unlocked" class="lab-content">
        <Content />
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

</style>
