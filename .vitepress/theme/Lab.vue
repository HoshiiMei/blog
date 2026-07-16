<template>
  <div class="lab-page">
    <div class="lab-content">
      <Content />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Content, useRouter, useRoute } from 'vitepress'

const SECRET = ['l', 'o', 'v', 'e']

const router = useRouter()
const route = useRoute()

const keyBuffer = ref<string[]>([])

function onKey(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

  keyBuffer.value.push(e.key.toLowerCase())
  if (keyBuffer.value.length > SECRET.length) {
    keyBuffer.value = keyBuffer.value.slice(-SECRET.length)
  }

  if (keyBuffer.value.length >= SECRET.length &&
      keyBuffer.value.slice(-SECRET.length).every((k, i) => k === SECRET[i])) {
    if (route.path === '/lab/easter-egg') return
    router.go('/lab/easter-egg')
    keyBuffer.value = []
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style lang="scss" scoped>
.lab-page {
  min-height: 80vh;
}

.lab-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 24px 48px;
}
</style>
