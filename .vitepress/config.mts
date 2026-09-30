import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "HoshiiMei-blog",
  description: "映星湖的个人博客，记录技术与生活",
  base: '/',
  ignoreDeadLinks: false,
  lang: 'zh-CN',
  srcExclude: ['**/_drafts/**'],
  cleanUrls: true,
  sitemap: { hostname: 'https://www.hoshii.zone' },
  appearance: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: '/feed.rss' }],
    // 鸿蒙字体（按 unicode-range 分片，按需加载；由 cn-font-split 生成）
    ['link', { rel: 'stylesheet', href: '/fonts/harmony/regular/result.css' }],
    ['link', { rel: 'stylesheet', href: '/fonts/harmony/bold/result.css' }],
  ],
  transformHead({ pageData }) {
    const head: any[] = []
    const description = pageData.frontmatter.description || pageData.description
    if (description) {
      head.push(['meta', { property: 'og:description', content: description }])
    }
    if (pageData.title) {
      head.push(['meta', { property: 'og:title', content: pageData.title }])
    }
    head.push(['meta', { property: 'og:type', content: 'website' }])
    head.push(['meta', { property: 'og:site_name', content: 'HoshiiMei-blog' }])
    head.push(['meta', { property: 'og:url', content: `https://www.hoshii.zone${pageData.relativePath ? '/' + pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '.html') : '/'}` }])
    return head
  },
  markdown: { headers: { level: [2, 3, 4, 5, 6] } },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
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
