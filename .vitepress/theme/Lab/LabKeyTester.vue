<template>
  <div class="lab-toy lab-key-tester">
    <p class="key-hint">随便按个键试试（点一下这里先聚焦）</p>
    <div
      ref="displayRef"
      class="key-display"
      tabindex="0"
      @keydown.prevent="onKey"
    >{{ display }}</div>
    <p class="key-code">{{ code }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const display = ref('—')
const code = ref('')
const displayRef = ref<HTMLElement | null>(null)

function onKey(e: KeyboardEvent) {
  display.value = e.key === ' ' ? '␣' : e.key
  code.value = `key: "${e.key}" | code: "${e.code}" | keyCode: ${e.keyCode}`
}
</script>

<style lang="scss" scoped>
.lab-toy {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin: 24px 0;
  transition: background-color 0.3s ease;
}

.key-hint {
  margin: 0 0 12px;
  color: var(--color-gray);
  font-size: 14px;
}

.key-display {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  border: 3px dashed var(--color-border);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  font-family: 'Merriweather', serif;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
  user-select: none;

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 4px rgba(91, 155, 213, 0.15);
  }
}

.key-code {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--color-gray);
  font-family: 'Courier New', monospace;
}
</style>
