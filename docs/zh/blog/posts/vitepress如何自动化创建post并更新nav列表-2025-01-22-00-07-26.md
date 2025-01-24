---
title: VitePress如何自动化创建post并更新nav列表
date: 2025-01-22T13:07:26.038Z
tags: ["VitePress", "自动化", "博客"]
description: "探讨如何通过自动化脚本简化VitePress博客的文章创建和导航更新流程，提升写作效率。"
---

# 选择 VitePress 的历程

## 寻找理想的博客平台

最近我开始尝试搭建自己的个人博客，我一直很喜欢轻量化的 serverless 的博客搭建框架。作为一个效率工具爱好者（虽然经常只顾磨刀，不砍柴），我对博客平台有着特别的要求。

## 从 Notion 到 Obsidian

我曾经尝试过 Notion。虽然它是个优秀的工具，但其 all-in-one 的设计理念，逐渐偏离了我对笔记工具的核心需求：

- 小而美的记录体验
- 简单的分享功能
- 专注于内容创作

最终，我选择了 Obsidian，主要是看中它纯粹的 Markdown 文件管理特性。这自然引发了下一个需求：寻找一个能完美托管 Markdown 文件的博客平台。

## 为什么选择 VitePress

在对比了主流的静态站点生成器（如 Jekyll 和 Hugo）后，VitePress 凭借以下优势吸引了我：

- 简洁的设计理念
- 强大的可扩展性
- Vue 生态系统的支持

## 自动化实现方案

我们的自动化脚本主要实现以下功能：

1. 自动创建新文章（支持中英双语）
2. 更新导航列表
3. 维护文章索引和分类
4. 自动更新最新文章列表

## 目录结构

```bash
scripts/
├── blog-utils.js    # 主要工具脚本
└── blogIndex.js     # 自动生成的博客索引

docs/
├── .vitepress/
│   └── config.mts   # VitePress配置文件
├── en/
│   └── blog/
│       ├── posts/   # 英文博客文章
│       └── index.md # 英文博客首页
└── zh/
    └── blog/
        ├── posts/   # 中文博客文章
        └── index.md # 中文博客首页
```

## 核心代码实现

### 1. 创建新文章

```javascript
function createPost(title, lang = "zh") {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].replace(/:/g, "-");
  const fileName = `${title
    .toLowerCase()
    .replace(/\s+/g, "-")}-${date}-${time}.md`;

  const postsDir = lang === "zh" ? ZH_POSTS_DIR : EN_POSTS_DIR;
  const filePath = path.join(postsDir, fileName);

  const template = `---
title: ${title}
date: ${now.toISOString()}
tags: []
description: ""
---
`;

  fs.writeFileSync(filePath, template);
  console.log(`Created new ${lang.toUpperCase()} post: ${filePath}`);
  return filePath;
}
```

### 2. 更新博客索引

```javascript
function updateBlogIndex(lang = "zh") {
  const postsDir = lang === "zh" ? ZH_POSTS_DIR : EN_POSTS_DIR;
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  const categoriesMap = {};
  files.forEach((file) => {
    const { data } = matter(
      fs.readFileSync(path.join(postsDir, file), "utf-8")
    );
    const firstTag = data.tags?.[0] || "Uncategorized";

    if (!categoriesMap[firstTag]) {
      categoriesMap[firstTag] = [];
    }

    categoriesMap[firstTag].push({
      text: data.title || "Untitled",
      link: `/${lang}/blog/posts/${file.replace(".md", "")}`,
      date: data.date,
    });
  });

  return Object.entries(categoriesMap).map(([category, items]) => ({
    text: category,
    items: items.sort((a, b) => new Date(b.date) - new Date(a.date)),
  }));
}
```

### 3. VitePress 配置集成

在 `config.mts` 中，我们导入生成的索引：

```typescript
import { defineConfig } from "vitepress";
import { enBlogIndex, zhBlogIndex } from "../../scripts/blogIndex";

export default defineConfig({
  // ...其他配置...
  themeConfig: {
    sidebar: {
      "/en/blog/": enBlogIndex,
      "/zh/blog/": zhBlogIndex,
    },
  },
});
```

## 使用方法

1. 创建新的中文博客文章：

```bash
node scripts/blog-utils.js new "文章标题"
```

2. 同时创建中英文博客文章：

```bash
node scripts/blog-utils.js new "中文标题" "English Title"
```

3. 更新索引和分类：

```bash
node scripts/blog-utils.js update
```

## 后续优化方向

1. 添加文章模板系统
2. 集成图片资源管理
3. 支持更多元数据字段
4. 添加文章预览功能
5. 集成 Git 自动提交

通过这套自动化工具，我们显著降低了使用 VitePress 写博客的门槛，让写作过程更加流畅。虽然还有很多优化空间，但目前的功能已经能满足基本需求。
