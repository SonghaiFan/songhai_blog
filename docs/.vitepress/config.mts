import { defineConfig } from "vitepress";
import { enBlogIndex, zhBlogIndex } from "../../scripts/blogIndex";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  lastUpdated: true,
  title: "Songhai Fan's Blog",
  description: "Personal Research and Technology Blog",

  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/en/",
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      themeConfig: {
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
          copyright: "Copyright © 2024-现在 范松海",
        },
      },
    },
  },

  themeConfig: {
    // logo: "/images/profile.png",

    nav: [
      { text: "Home", link: "/en/" },
      { text: "Blog", link: "/en/blog/" },
      { text: "Projects", link: "/en/projects/" },
      { text: "Research", link: "/en/research/" },
      { text: "About", link: "/en/about/" },
    ],

    sidebar: {
      "/en/blog/": enBlogIndex,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/SonghaiFan" },
      { icon: "linkedin", link: "https://linkedin.com/in/songhaifan" },
    ],

    footer: {
      message: "Released under the MIT License",
      copyright: "Copyright © 2024-present Songhai Fan",
    },

    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },
  },
});
