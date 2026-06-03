import Theme from 'vitepress-theme-hoshii'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { data as posts } from '../posts.data'

// 封面图映射 — glob 必须在博客项目侧执行
const imageMap = import.meta.glob(
  '/posts/**/images/*.{png,jpg,webp}',
  { eager: true, query: '?url', import: 'default' }
)

export default {
  ...Theme,
  enhanceApp(ctx: any) {
    Theme.enhanceApp?.(ctx)
    ctx.app.provide('posts', posts)
    ctx.app.provide('imageMap', imageMap)
  }
}
