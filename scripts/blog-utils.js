import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, "../docs/blog");
const POSTS_DIR = path.join(BLOG_DIR, "posts");
const CATEGORIES_DIR = path.join(BLOG_DIR, "categories");

// Create a new blog post
function createPost(title) {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].replace(/:/g, "-");
  const fileName = `${title
    .toLowerCase()
    .replace(/\s+/g, "-")}-${date}-${time}.md`;
  const filePath = path.join(POSTS_DIR, fileName);

  const template = `---
title: ${title}
date: ${now.toISOString()}
tags: []
---

# ${title}

`;

  fs.writeFileSync(filePath, template);
  console.log(`Created new post: ${filePath}`);
  return filePath;
}

// Generate category pages
function generateCategories(categories) {
  if (!fs.existsSync(CATEGORIES_DIR)) {
    fs.mkdirSync(CATEGORIES_DIR, { recursive: true });
  }

  categories.forEach((category) => {
    const categoryPath = path.join(
      CATEGORIES_DIR,
      `${category.toLowerCase().replace(/\s+/g, "-")}.md`
    );
    const template = `---
title: ${category}
layout: doc
---

# ${category} Posts

<BlogList category="${category}" />
`;
    fs.writeFileSync(categoryPath, template);
  });
}

// Update blog index
function updateBlogIndex() {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"));
  const categoriesSet = new Set();
  const categoriesMap = {};

  files.forEach((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const { data } = matter(fs.readFileSync(filePath, "utf-8"));
    const firstTag = data.tags?.[0] || "Uncategorized";

    categoriesSet.add(firstTag);
    if (!categoriesMap[firstTag]) {
      categoriesMap[firstTag] = [];
    }

    categoriesMap[firstTag].push({
      text: data.title || "Untitled",
      link: `/blog/posts/${file.replace(".md", "")}`,
      date: data.date,
    });
  });

  // Sort posts by date within each category
  Object.values(categoriesMap).forEach((posts) => {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const blogIndex = Array.from(categoriesSet).map((category) => ({
    text: category,
    items: categoriesMap[category] || [],
  }));

  // Write blog index
  const indexPath = path.join(__dirname, "blogIndex.js");
  const indexContent = `const blogIndex = ${JSON.stringify(blogIndex, null, 2)};

export default blogIndex;`;

  fs.writeFileSync(indexPath, indexContent);
  console.log("Blog index updated successfully");

  // Generate category pages
  generateCategories(categoriesSet);
  console.log("Category pages generated");
}

// Handle command line arguments
const command = process.argv[2];
const title = process.argv[3];

if (command === "new" && title) {
  createPost(title);
  updateBlogIndex();
} else if (command === "update") {
  updateBlogIndex();
} else {
  console.log(`
Usage:
  node blog-utils.js new "Post Title"  - Create a new post
  node blog-utils.js update           - Update blog index and categories
  `);
}
