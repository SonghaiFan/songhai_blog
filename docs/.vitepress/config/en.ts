import { defineConfig } from "vitepress";
import { enBlogIndex } from "../../../scripts/blogIndex";

export const en = defineConfig({
  lang: "en",
  title: "Songhai Fan's Blog",
  description: "Personal Research and Technology Blog",

  themeConfig: {
    // logo: "/images/profile.png",

    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/blog/" },
      { text: "Projects", link: "/projects/" },
      { text: "Research", link: "/research/" },
      { text: "About", link: "/about/" },
    ],

    sidebar: {
      "/blog/": enBlogIndex,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/SonghaiFan" },
      { icon: "linkedin", link: "https://linkedin.com/in/songhaifan" },
    ],

    footer: {
      message: "Released under the MIT License",
      copyright: "Copyright © 2024-present Songhai Fan",
    },
  },
});
