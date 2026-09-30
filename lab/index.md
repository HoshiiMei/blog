---
layout: lab
---

# 实验室

边学边搓的小玩具集合，想到什么加什么。

<div class="toy-grid">

<a class="toy-card" href="/lab/dice">
  <span class="toy-icon">🎲</span>
  <span class="toy-name">掷骰子</span>
  <span class="toy-desc">点击按钮随机掷出一个骰子面</span>
</a>

<a class="toy-card" href="/lab/color">
  <span class="toy-icon">🎨</span>
  <span class="toy-name">随机颜色</span>
  <span class="toy-desc">随机生成十六进制颜色值</span>
</a>

<a class="toy-card" href="/lab/key-tester">
  <span class="toy-icon">⌨️</span>
  <span class="toy-name">键盘测试器</span>
  <span class="toy-desc">按下任意键查看键码信息</span>
</a>

<a class="toy-card" href="/lab/pig">
  <span class="toy-icon">🐖</span>
  <span class="toy-name">猪</span>
  <span class="toy-desc">一只可爱的猪猪</span>
</a>

</div>

> 🔨 更多玩具施工中…… 

<style>
.toy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 32px 0;
}

.toy-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;
}

.toy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.toy-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
  line-height: 1;
}

.toy-name {
  font-size: 18px;
  font-weight: 700;
  display: block;
  margin-bottom: 6px;
  color: var(--color-text);
}

.toy-desc {
  font-size: 13px;
  color: var(--color-gray);
  line-height: 1.5;
}
</style>
