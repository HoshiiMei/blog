<template>
  <header class="integrated-header">
    <nav class="pill-bar">
      <ul class="menu-list">
        <li v-for="m in menu" :key="m.name" class="menu-item">
          <a :href="withBase(m.url)" class="menu-link">{{ m.name }}</a>
        </li>
      </ul>

      <div class="divider"></div>

      <div class="icons-group">
        <button class="icon-btn search" title="搜索">
          <i class="fa fa-search"></i>
        </button>
        <button class="icon-btn dice" title="随机">
          <i class="fa fa-dice"></i>
        </button>
      </div>
    </nav>

    <div class="profile-avatar">
      <img src="/images/avatar.png" alt="用户头像" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

interface MenuItem { name: string, url: string }

const menu: MenuItem[] = [
  { name: '首页', url: '/' },
  { name: '标签', url: '/tags/' },
]
</script>

<style lang="scss">
header.integrated-header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  background: transparent;
  z-index: 100;

  /* 圆角卡片式导航栏 */
  .pill-bar {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    height: 48px;
    padding: 0 15px;
    backdrop-filter: blur(8px); /* 背景模糊效果 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 微妙的阴影 */
    margin-right: 12px; /* 给右侧头像留出间距 */

    .menu-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
      flex-grow: 1;
      gap: 10px;
    }

    .menu-item {
      margin: 0;
      white-space: nowrap;
    }

    .menu-link {
      font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun", "Times New Roman", serif;
      font-size: 16px;
      color: #333; /* 用具体颜色替换变量 */
      display: inline-block;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 20px;
      transition: all 0.3s ease-out;

      &:hover {
        background-color: var(--color-accent);
        color: #ffffff;
      }
    }

    .divider {
      margin: 0 10px;
      height: 18px; /* 控制竖线的高度 */
      width: 1px;   /* 控制竖线的粗细 */
      background-color: var(--color-border); /* 竖线的颜色 */
    }

    .icons-group {
      display: flex;
      align-items: center;
    }

    .icon-btn {
      background: transparent; /* 清除默认灰色背景 */
      border: none;            /* 清除默认边框 */
      padding: 0;              /* 清除默认内边距 */
      outline: none;           /* 去除点击时的黑框 */

      margin-left: 10px;
      cursor: pointer;
      color: #333;
      font-size: 1.2rem;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  /* 独立头像样式 */
  .profile-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: white;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
