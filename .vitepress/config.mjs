import { defineConfig } from 'vitepress'
import { getThemeConfig } from '@sugarat/theme/node'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "映星湖的博客",
  description: "有趣是最大的价值",
  ignoreDeadLinks: true,
  extends: getThemeConfig({
    blog: {
      themeColor: 'vp-default', // 可以选喜欢的颜色
    }
  }),
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    head: [
      ['script', { src: 'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js' }]
    ],
    
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
