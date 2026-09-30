<template>
  <div class="not-found">
    <div class="code">404</div>
    <p class="message">这个页面好像迷路了…</p>
    <a :href="withBase('/')" class="home-link">
      <i class="fa fa-home"></i> 回到首页
    </a>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  color: var(--color-text);

  .code {
    font-size: 6rem;
    font-weight: 700;
    color: var(--color-accent);
    opacity: 0.3;
    line-height: 1;
  }

  .message {
    font-size: 1.2rem;
    margin-top: 0.5em;
    color: var(--color-gray);
  }

  .home-link {
    margin-top: 1.5em;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.6em 1.5em;
    border-radius: 2em;
    background: var(--color-accent-soft);
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 500;
    transition: background 0.2s;

    &:hover {
      background: var(--color-accent);
      color: #fff;
    }
  }
}
</style>
