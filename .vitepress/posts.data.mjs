// from https://github.com/vuejs/blog
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url';
import { createMarkdownRenderer } from 'vitepress'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd()

export default {
  watch: path.relative(__dirname, cwd + '/posts/**/*.md').replace(/\\/g, '/'),
  async load(asFeed = false) {
    const md = await createMarkdownRenderer(cwd)
    const postDir = path.join(cwd, 'posts')
    checkTags()
    const result = []
    walkPosts(postDir, '', result)
    return result
      .map((file) => getPost(md, file, postDir, asFeed))
      .filter(Boolean)
      .sort((a, b) => b.create - a.create)
  }
}

const SKIP_DIRS = new Set(['_drafts', 'images', '.git'])

function walkPosts(dir, relPath, result) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walkPosts(path.join(dir, entry.name), relPath + entry.name + '/', result)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      result.push(relPath + entry.name)
    }
  }
}

const cache = new Map()

function getPost(md, file, postDir, asFeed = false) {
  const fullePath = path.join(postDir, file)
  const timestamp = Math.floor(fs.statSync(fullePath).mtimeMs)

  const cached = cache.get(fullePath)
  if (cached && timestamp === cached.timestamp) {
    return cached.post
  }

  const src = fs.readFileSync(fullePath, 'utf-8')
  const { data, excerpt } = matter(src, { excerpt: true })

  if (!data.title) return null

  const href = file.endsWith('/index.md')
    ? `posts/${file.replace(/\/index\.md$/, '.html')}`
    : `posts/${file.replace(/\.md$/, '.html')}`

  const post = {
    title: data.title,
    href,
    create: +new Date(data.date) || timestamp,
    update: timestamp,
    tags: data.tags,
    cover: data.cover,
    excerpt: md.render(excerpt)
  }
  if (asFeed) {
    post.data = data
  }

  cache.set(fullePath, {
    timestamp,
    post
  })
  return post
}

function checkTags() {
  const dir = path.join(cwd, 'tags')
  if (!fs.existsSync(dir)) {
    console.log('Creating page: /tags')
    fs.mkdirSync(dir)
    fs.writeFileSync('tags/index.md', '---\ntitle: 标签\n---\n')
  }
}
