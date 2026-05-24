import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "映星湖的博客（开发中）",
  description: "",
  base: '/',
  ignoreDeadLinks: true,
  appearance: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // 告诉 Vite 使用现代 Sass API
        }
      }
    }
  },
  themeConfig: {
    hello: '映星湖的个人网页',
    motto: '基于vue3和vitepress的前端实验基地',
    cover: '/images/cover.webp',

    // 社交图标列表
    social: [
      { icon: 'fa-github', url: 'https://github.com/HoshiiMei' },
      { icon: 'fa-twitter', url: 'https://twitter.com/你的名字' }
    ],

  }
})
