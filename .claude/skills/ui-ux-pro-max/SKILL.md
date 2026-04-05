---
name: ui-ux-pro-max
description: UI/UX 设计智能。50 种样式、21 种配色、50 种字体搭配、20 种图表、9 种技术栈。
---
# ui-ux-pro-max

Web 和移动应用程序的综合设计指南。包含 67 种样式、96 种配色方案、57 种字体搭配、99 条 UX 指南和 25 种图表类型，涵盖 13 种技术栈。带优先级推荐的可搜索数据库。

## 前置条件

检查 Python 是否已安装：

```bash
python3 --version || python --version
```

如果 Python 未安装，根据用户的操作系统安装：

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## 如何使用本 Skill

当用户请求 UI/UX 工作（设计、构建、创建、实施、审查、修复、改进）时，遵循此工作流程：

### 步骤 1：分析用户需求

从用户请求中提取关键信息：
- **产品类型**：SaaS、电商、作品集、仪表板、落地页等
- **风格关键词**：极简、有趣、专业、优雅、深色模式等
- **行业**：医疗、金融科技、游戏、教育等
- **技术栈**：React、Vue、Next.js，或默认使用 `html-tailwind`

### 步骤 2：生成设计系统（必需）

**始终以 `--design-system` 开头**以获取带推理的全面推荐：

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

此命令：
1. 并行搜索 5 个领域（产品、风格、颜色、落地页、字体）
2. 应用来自 `ui-reasoning.csv` 的推理规则选择最佳匹配
3. 返回完整设计系统：模式、风格、颜色、字体、效果
4. 包含要避免的反模式

**示例：**
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

### 步骤 2b：持久化设计系统（Master + Overrides 模式）

要保存设计系统以跨会话分层检索，添加 `--persist`：

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

这将创建：
- `design-system/MASTER.md` — 包含所有设计规则的全局真相来源
- `design-system/pages/` — 页面特定覆盖文件夹

**带页面特定覆盖：**
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

这还将创建：
- `design-system/pages/dashboard.md` — 页面特定与 Master 的偏差

**分层检索工作原理：**
1. 构建特定页面（例如"Checkout"）时，首先检查 `design-system/pages/checkout.md`
2. 如果页面文件存在，其规则**覆盖** Master 文件
3. 如果不存在，则仅使用 `design-system/MASTER.md`

### 步骤 3：补充详细搜索（按需）

获取设计系统后，使用领域搜索获取额外详情：

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**何时使用详细搜索：**

| 需要 | 领域 | 示例 |
|------|--------|-------------------|
| 更多风格选项 | `style` | `--domain style "glassmorphism dark"` |
| 图表推荐 | `chart` | `--domain chart "real-time dashboard"` |
| UX 最佳实践 | `ux` | `--domain ux "animation accessibility"` |
| 替代字体 | `typography` | `--domain typography "elegant luxury"` |
| 落地页结构 | `landing` | `--domain landing "hero social-proof"` |

### 步骤 4：技术栈指南（默认：html-tailwind）

获取特定实现的最佳实践。如果用户未指定技术栈，**默认为 `html-tailwind`**。

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

可用技术栈：`html-tailwind`、`react`、`nextjs`、`vue`、`svelte`、`swiftui`、`react-native`、`flutter`、`shadcn`、`jetpack-compose`

---

## 搜索参考

### 可用领域

| 领域 | 用于 | 示例关键词 |
|--------|---------|-------------------|
| `product` | 产品类型推荐 | SaaS、电商、作品集、医疗、beauty、服务 |
| `style` | UI 样式、颜色、效果 | glassmorphism、minimalism、dark mode、brutalism |
| `typography` | 字体搭配、Google Fonts | elegant、playful、professional、modern |
| `color` | 按产品类型的配色方案 | saas、ecommerce、healthcare、beauty、fintech、服务 |
| `landing` | 页面结构、CTA 策略 | hero、hero-centric、testimonial、pricing、social-proof |
| `chart` | 图表类型、库推荐 | trend、comparison、timeline、funnel、pie |
| `ux` | 最佳实践、反模式 | animation、accessibility、z-index、loading |
| `react` | React/Next.js 性能 | waterfall、bundle、suspense、memo、rerender、cache |
| `web` | Web 界面指南 | aria、focus、keyboard、semantic、virtualize |
| `prompt` | AI 提示、CSS 关键词 | (style name) |

### 可用技术栈

| 技术栈 | 焦点 |
|-------||
| `html-tailwind` | Tailwind 工具类、响应式、a11y（默认） |
| `react` | State、hooks、性能、模式 |
| `nextjs` | SSR、路由、图像、API 路由 |
| `vue` | Composition API、Pinia、Vue Router |
| `svelte` | Runes、stores、SvelteKit |
| `swiftui` | Views、State、Navigation、Animation |
| `react-native` | Components、Navigation、Lists |
| `flutter` | Widgets、State、Layout、Theming |
| `shadcn` | shadcn/ui 组件、theming、forms、模式 |
| `jetpack-compose` | Composables、Modifiers、State Hoisting、Recomposition |

---

## 示例工作流程

**用户请求：** "为专业皮肤护理服务制作落地页"

### 步骤 1：分析需求
- 产品类型：Beauty/Spa 服务
- 风格关键词：elegant、professional、soft
- 行业：Beauty/Wellness
- 技术栈：html-tailwind（默认）

### 步骤 2：生成设计系统（必需）

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service elegant" --design-system -p "Serenity Spa"
```

**输出：** 带模式、风格、颜色、字体、效果和反模式的完整设计系统。

### 步骤 3：补充详细搜索（按需）

```bash
# 获取动画和可访问性的 UX 指南
python3 skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# 如果需要，获取替代字体选项
python3 skills/ui-ux-pro-max/scripts/search.py "elegant luxury serif" --domain typography
```

### 步骤 4：技术栈指南

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "layout responsive form" --stack html-tailwind
```

**然后：** 综合设计系统 + 详细搜索并实现设计。

---

## 输出格式

`--design-system` 标志支持两种输出格式：

```bash
# ASCII 框（默认）- 适合终端显示
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system

# Markdown - 适合文档
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

---

## 更好结果的提示

1. **关键词要具体** - "healthcare SaaS dashboard" > "app"
2. **多次搜索** - 不同关键词揭示不同见解
3. **组合领域** - Style + Typography + Color = 完整设计系统
4. **始终检查 UX** - 搜索"animation"、""z-index"、"accessibility"了解常见问题
5. **使用技术栈标志** - 获取特定实现的最佳实践
6. **迭代** - 如果首次搜索不匹配，尝试不同关键词

---

## 专业 UI 的常见规则

这些是常被忽视的使 UI 看起来不专业的问题：

### 图标和视觉元素

| 规则 | 正确 | 错误 |
|------|----|----- |
| **不用 emoji 图标** | 使用 SVG 图标（Heroicons、Lucide、Simple Icons） | 使用 emojis 如 🎨 🚀 ⚙️ 作为 UI 图标 |
| **稳定的悬停状态** | 悬停时使用颜色/不透明度过渡 | 使用改变布局的缩放变换 |
| **正确的品牌 logo** | 从 Simple Icons 研究官方 SVG | 猜测或使用不正确的 logo 路径 |
| **一致的图标大小** | 使用固定 viewBox (24x24) 配 w-6 h-6 | 随机混用不同图标大小 |

### 交互和光标

| 规则 | 正确 | 错误 |
|------|----|----- |
| **光标指针** | 为所有可点击/悬停卡片添加 `cursor-pointer` | 让交互元素保持默认光标 |
| **悬停反馈** | 提供视觉反馈（颜色、阴影、边框） | 不指示元素可交互 |
| **平滑过渡** | 使用 `transition-colors duration-200` | 即时状态更改或太慢（>500ms） |

### 浅色/深色模式对比

| 规则 | 正确 | 错误 |
|------|----|----- |
| **浅色模式玻璃卡片** | 使用 `bg-white/80` 或更高不透明度 | 使用 `bg-white/10`（太透明） |
| **浅色模式文本对比** | 使用 `#0F172A` (slate-900) 作为文本 | 使用 `#94A3B8` (slate-400) 作为正文文本 |
| **浅色模式次要文本** | 至少使用 `#475569` (slate-600) | 使用 gray-400 或更浅 |
| **边框可见性** | 浅色模式使用 `border-gray-200` | 使用 `border-white/10`（不可见） |

### 布局和间距

| 规则 | 正确 | 错误 |
|------|----|----- |
| **浮动导航栏** | 添加 `top-4 left-4 right-4` 间距 | 让导航栏紧贴 `top-0 left-0 right-0` |
| **内容内边距** | 考虑固定导航栏高度 | 让内容隐藏在固定元素后面 |
| **一致的 max-width** | 使用相同的 `max-w-6xl` 或 `max-w-7xl` | 混用不同的容器宽度 |

---

## 交付前检查清单

交付 UI 代码前，验证以下项目：

### 视觉质量
- [ ] 不用 emojis 作为图标（改用 SVG）
- [ ] 所有图标来自一致的图标集（Heroicons/Lucide）
- [ ] 品牌 logo 正确（从 Simple Icons 验证）
- [ ] 悬停状态不导致布局偏移
- [ ] 直接使用主题颜色（bg-primary）而不是 var() 包装器

### 交互
- [ ] 所有可点击元素有 `cursor-pointer`
- [ ] 悬停状态提供清晰的视觉反馈
- [ ] 过渡平滑（150-300ms）
- [ ] 键盘导航的焦点状态可见

### 浅色/深色模式
- [ ] 浅色模式文本有足够对比度（最少 4.5:1）
- [ ] 玻璃/透明元素在浅色模式下可见
- [ ] 两种模式下边框都可见
- [ ] 交付前测试两种模式

### 布局
- [ ] 浮动元素与边缘有适当间距
- [ ] 没有内容藏在固定导航栏后面
- [ ] 在 375px、768px、1024px、1440px 下响应
- [ ] 移动端无水平滚动

### 可访问性
- [ ] 所有图片有 alt 文本
- [ ] 表单输入有标签
- [ ] 颜色不是唯一的指示器
- [ ] 尊重 `prefers-reduced-motion`
