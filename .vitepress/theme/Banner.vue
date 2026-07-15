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
    <!-- 首页下拉箭头 -->
    <div class="headertop-down" @click="scrollDown">
      <span>
        <svg class="homepage-downicon" viewBox="0 0 1843 1024" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
          <path d="M1221.06136021 284.43250057a100.69380037 100.69380037 0 0 1 130.90169466 153.0543795l-352.4275638 302.08090944a100.69380037 100.69380037 0 0 1-130.90169467 0L516.20574044 437.48688007A100.69380037 100.69380037 0 0 1 647.10792676 284.43250057L934.08439763 530.52766665l286.97696258-246.09516608z" fill="currentColor"></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import HeroTitle from './HeroTitle.vue'
const themeConfig = useData().theme.value
const hello = themeConfig.hello || '这里是缺省值'
const motto = themeConfig.motto || '如果你看到了这一行，请前往.vitepress/config.mts里面输入自己的博客介绍'
const social = themeConfig.social || []
const cover = themeConfig.cover
function scrollDown() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}
</script>

<style lang="scss">

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
    width: 100%;
    bottom: 0;
  }

  .wave1 {
    height: 65px;
    background: url(./assets/wave1.png) repeat-x;
    background-size: auto 65px;
    animation: wave-scroll-1 30s infinite linear;
  }

  .wave2 {
    height: 80px;
    background: url(./assets/wave2.png) repeat-x;
    background-size: auto 80px;
    animation: wave-scroll-2 20s infinite linear;
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

@keyframes wave-scroll-1 {
  0% { background-position-x: 0; }
  100% { background-position-x: -997px; }
}

@keyframes wave-scroll-2 {
  0% { background-position-x: 0; }
  100% { background-position-x: -1009px; }
}

//首页下拉箭头
.headertop-down {
  position: absolute;
  bottom: 50px;
  left: calc(50% - 40px);
  z-index: 10;
  cursor: pointer;
  animation: float-down 5s ease-in-out infinite;

  .homepage-downicon {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
  }

  &:hover .homepage-downicon {
    color: var(--color-accent);
  }
}

@keyframes float-down {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-7px); }
  100% { transform: translateY(0px); }
}
</style>
