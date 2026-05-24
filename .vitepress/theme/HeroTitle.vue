<template>
  <h1 class="clean-title">{{ text }}</h1>
</template>

<script setup lang="ts">
const { text } = defineProps<{ text: string }>()
</script>

<style lang="scss">
.clean-title {
  display: block;
  margin: 0;
  font-weight: bold;
  font-size: 90px;
  color: white;
  line-height: 1.2;
  margin-bottom: 0px;
  /* 用更柔和、更现代的弥散阴影代替原来生硬的黑影，确保在亮色背景图上也能看清文字 */
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);

  /* 加入一点极其克制的丝滑动画 */
  transition: transform 0.4s ease, text-shadow 0.4s ease;

}

/* 手机端适配依然保留 */
@media (max-width: 720px) {
  .clean-title {
    font-size: 48px;
  }
}
</style>
