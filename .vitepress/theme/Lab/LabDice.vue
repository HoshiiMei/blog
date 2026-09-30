<template>
  <div class="lab-toy lab-dice">
    <span class="dice-face" :class="{ rolling: isRolling }">{{ faces[face] }}</span>
    <button class="toy-btn" @click="roll">🎲 扔一下</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
const face = ref(0)
const isRolling = ref(false)

function roll() {
  face.value = Math.floor(Math.random() * 6)
  isRolling.value = true
  setTimeout(() => (isRolling.value = false), 400)
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

.dice-face {
  font-size: 80px;
  line-height: 1.2;
  display: block;
}

.dice-face.rolling {
  animation: dice-roll 0.4s ease-out;
}

@keyframes dice-roll {
  0%   { transform: rotateZ(0deg) scale(0.5); }
  50%  { transform: rotateZ(180deg) scale(1.2); }
  100% { transform: rotateZ(360deg) scale(1); }
}

.toy-btn {
  margin-top: 16px;
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
