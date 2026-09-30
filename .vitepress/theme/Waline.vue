<template>
  <div id="waline"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'
import { init } from '@waline/client'
import '@waline/client/style'

let waline: ReturnType<typeof init> | null = null

onMounted(() => {
  const serverURL = useData().site.value.themeConfig.waline
  if (!serverURL) {
    return
  }
  waline = init({
    el: '#waline',
    serverURL,
  })
})

const update = () => {
  waline?.update()
}

defineExpose({ update })
</script>

<style lang="scss">
.v[data-class="v"] {

  label,
  .vinput,
  .veditor,
  .vbtn {
    font-family: var(--global-font);
    font-size: 14px !important;
  }
}
</style>
