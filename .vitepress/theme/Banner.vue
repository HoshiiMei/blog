<template>
  <div class="banner" :style="`background-image: url(${cover})`">
    <div class="wave1"></div>
    <div class="wave2"></div>
    <div class="info">
      <HeroTitle :text="hello" />
      <span class="box">
        <p class="text">
          {{ motto }}
        </p>
        <div class="contact">
          <a :href="s.url" v-for="s in social" aria-label="icon" target="_blank">
            <i :class="['fab', s.icon]"></i>
          </a>
        </div>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import HeroTitle from './HeroTitle.vue'
const themeConfig = useData().theme.value
const hello = themeConfig.hello || '这里是缺省值'
const motto = themeConfig.motto || ''
const social = themeConfig.social || []
const cover = themeConfig.cover
</script>

<style lang="scss">
@use "./base.scss" as *;

.banner {
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wave1,
  .wave2 {
    position: absolute;
    width: 400%;
    bottom: 0;
  }

  .wave1 {
    background: url($theme-base+"assets/wave1.png") repeat-x;
    height: 65px;
    animation: wave-animation-1 30s infinite linear;
  }

  .wave2 {
    background: url($theme-base+"assets/wave2.png") repeat-x;
    height: 80px;
    animation: wave-animation-2 20s infinite linear;
  }

  .info {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box {
    display: inline-block;
    width: 600px;
    color: white;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    margin-top: 10px;
    padding: 10px 0;
  }

  .text {
    font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun", "Times New Roman", serif;
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    margin: 0;
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .contact {
    display: flex;
    justify-content: center;
    font-size: 24px;

    a {
      color: white;
      margin: 6px;
      transition: transform 0.3s ease, color 0.3s ease;
      &:hover {
        color: var(--color-accent);
        transform: translateY(-3px);
      }
    }
  }
}

@media (max-width: 720px) {
  .banner {
    .info {
      margin: 0 0.5em;
    }

    .box {
      width: 100%;
    }

  }
}

@keyframes wave-animation-1 {
  0% {
    left: 0;
  }

  100% {
    left: -50%;
  }
}

@keyframes wave-animation-2 {
  0% {
    left: 0;
  }

  100% {
    left: -50%;
  }
}

//向下滚动提示（目前被弃用）
.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  .scroll-line {
    display: block;
    width: 24px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 8px;
      background: white;
      border-radius: 2px;
      animation: scroll-bounce 2s ease-in-out infinite;
    }
  }
}

@keyframes scroll-bounce {
  0%, 100% {
    top: 6px;
    opacity: 1;
  }
  50% {
    top: 20px;
    opacity: 0.3;
  }
}
</style>
