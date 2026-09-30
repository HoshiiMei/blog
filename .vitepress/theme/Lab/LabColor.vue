<template>
  <div class="lab-toy lab-color">
    <div class="color-swatch" :style="{ background: color }" />
    <p class="color-hex">{{ color.toUpperCase() }}</p>
    <button class="toy-btn" @click="randomize">🎨 换一个</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#5b9bd5')

function randomize() {
  color.value = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
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

.color-swatch {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  margin: 0 auto 16px;
  transition: background 0.3s;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.color-hex {
  font-size: 22px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin: 0 0 12px;
  color: var(--color-text);
}

.toy-btn {
  padding: 10px 28px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: var(--color-accent, #5b9bd5);
  color: #fff;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  font-family: inherit;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(91, 155, 213, 0.4);
  }
  &:active { transform: scale(0.96); }
}
</style>
