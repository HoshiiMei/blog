<template>
  <div class="banner" :style="`background-image: url(${cover})`">
    <!-- SVG 波浪：颜色跟随夜间模式切换（白天白色渐变 / 夜间融入深色背景） -->
    <!-- 深色浪在后层，白色渐变浪在前层 -->
    <div class="wave wave2" aria-hidden="true">
      <svg class="wave-svg" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path d="M0,52 Q250,10 500,52 T1000,52 L1000,80 L0,80 Z" fill="url(#wave2-fill)" />
      </svg>
      <svg class="wave-svg" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path d="M0,52 Q250,10 500,52 T1000,52 L1000,80 L0,80 Z" fill="url(#wave2-fill)" />
      </svg>
    </div>
    <div class="wave wave1" aria-hidden="true">
      <svg class="wave-svg" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path d="M0,40 Q125,14 250,40 T500,40 T750,40 T1000,40 L1000,80 L0,80 Z" fill="url(#wave1-fill)" />
      </svg>
      <svg class="wave-svg" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path d="M0,40 Q125,14 250,40 T500,40 T750,40 T1000,40 L1000,80 L0,80 Z" fill="url(#wave1-fill)" />
      </svg>
    </div>
    <!-- 渐变定义：宽高为 0，只作为填充引用，不参与布局 -->
    <svg class="wave-defs" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wave1-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="w1-top" />
          <stop offset="1" class="w1-bottom" />
        </linearGradient>
        <linearGradient id="wave2-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="w2-top" />
          <stop offset="1" class="w2-bottom" />
        </linearGradient>
      </defs>
    </svg>
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

  .wave {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 200%;
    display: flex;
    pointer-events: none;
    will-change: transform;

    .wave-svg {
      width: 50%;
      height: 100%;
      flex: none;
      display: block;
    }
  }

  .wave1 {
    height: 65px;
    animation: wave-move 30s infinite linear;
  }

  .wave2 {
    height: 80px;
    animation: wave-move 20s infinite linear;
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

/* 位移半个容器宽度 = 刚好一个波形周期，无缝循环 */
@keyframes wave-move {
  to { transform: translate3d(-50%, 0, 0); }
}

/* 用户开启"减少动态效果"时停用波浪动画 */
@media (prefers-reduced-motion: reduce) {
  .wave1,
  .wave2 {
    animation: none;
  }
}

/* ===== 波浪配色：白天沿用原图的白色渐变 + 深灰前浪，夜间融入深色背景 ===== */
.wave-defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.wave stop {
  transition: stop-color 0.3s ease;
}

.w1-top { stop-color: #e3e7ec; }
.w1-bottom { stop-color: #eee; }
.w2-top { stop-color: #59606a; }
.w2-bottom { stop-color: #454b54; }

html.dark {
  .w1-top { stop-color: #272d34; }
  .w1-bottom { stop-color: #15171a; }
  .w2-top { stop-color: #1a2027; }
  .w2-bottom { stop-color: #10141a; }
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
