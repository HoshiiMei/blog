import Layout from './Layout.vue'
import { type EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// ⚡ 核心：把你刚刚下载到本地的图标库 CSS 引入进来！
import '@fortawesome/fontawesome-free/css/all.min.css'

// 实验室玩具组件
import LabDice from './Lab/LabDice.vue'
import LabColor from './Lab/LabColor.vue'
import LabKeyTester from './Lab/LabKeyTester.vue'
import LabPig from './Lab/LabPig.vue'

export default {
  Layout,
  DefaultTheme,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('LabDice', LabDice)
    app.component('LabColor', LabColor)
    app.component('LabKeyTester', LabKeyTester)
    app.component('LabPig', LabPig)
  }
}
