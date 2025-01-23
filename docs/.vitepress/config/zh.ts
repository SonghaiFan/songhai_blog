import { defineConfig } from "vitepress";
import { zhBlogIndex } from "../../../scripts/blogIndex";

export const zh = defineConfig({
  lang: "zh",
  title: "Songhai Fan's Blog",
  description: "Personal Research and Technology Blog",

  themeConfig: {
    // logo: "/images/profile.png",

    nav: [
      { text: "首页", link: "/zh/" },
      { text: "博客", link: "/zh/blog/" },
      { text: "项目", link: "/zh/projects/" },
      { text: "研究", link: "/zh/research/" },
      { text: "关于", link: "/zh/about/" },
    ],

    sidebar: {
      "/zh/blog/": zhBlogIndex,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/SonghaiFan" },
      { icon: "linkedin", link: "https://linkedin.com/in/songhaifan" },
    ],

    footer: {
      message: "基于 MIT 许可发布",
      copyright: "Copyright © 2024-present 范松海",
    },
  },
});
