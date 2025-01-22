import { defineConfig } from "vitepress";
import blogIndex from "../../scripts/blogIndex";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  lastUpdated: true,
  title: "Songhai Fan's Blog",
  description:
    "PhD Researcher in Human-Centered Computing, focusing on narrative visualization, immersive analytics, and AI-augmented frameworks",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Research", link: "/research/" },
      { text: "Blog", link: "/blog/" },
      { text: "Projects", link: "/projects/" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/blog/": blogIndex,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/SonghaiFan" },
      { icon: "linkedin", link: "https://linkedin.com/in/songhaifan" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 Songhai Fan",
    },

    search: {
      provider: "local",
    },
  },
});
