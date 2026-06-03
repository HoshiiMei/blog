import Layout from './Layout.vue'
import { type EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// ⚡ 核心：把你刚刚下载到本地的图标库 CSS 引入进来！
import '@fortawesome/fontawesome-free/css/all.min.css'

export default {
  Layout,
  DefaultTheme,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
}
