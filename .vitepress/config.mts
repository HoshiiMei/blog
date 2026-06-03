import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "HoshiiMei-blog",
  description: "",
  base: '/',
  ignoreDeadLinks: true,
  appearance: false,
  markdown: { headers: { level: [2, 3, 4, 5, 6] } },
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
      { icon: 'fa-bilibili', url: 'https://space.bilibili.com/24225737' }
    ],

  }
})
