import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "Songhai Fan",
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
      "/blog/": [
        {
          text: "Latest Posts",
          items: [
            // These will be populated by your blog posts
          ],
        },
        {
          text: "Categories",
          items: [
            { text: "Data Visualization", link: "/blog/categories/data-viz" },
            { text: "Large Language Models", link: "/blog/categories/llm" },
            {
              text: "Immersive Analytics",
              link: "/blog/categories/immersive-analytics",
            },
            { text: "AI Technologies", link: "/blog/categories/ai-tech" },
          ],
        },
      ],
      "/research/": [
        {
          text: "Research Areas",
          items: [
            {
              text: "Narrative Visualization",
              link: "/research/narrative-viz",
            },
            { text: "Time-Track Narrative Graph", link: "/research/ttng" },
            { text: "Scrollytelling", link: "/research/scrollytelling" },
            { text: "Publications", link: "/research/publications" },
          ],
        },
      ],
      "/projects/": [
        {
          text: "Featured Projects",
          items: [
            { text: "GPT Storytale", link: "/projects/gpt-storytale" },
            { text: "Causal Network Viz", link: "/projects/causal-network" },
            { text: "Perspectiva", link: "/projects/perspectiva" },
          ],
        },
      ],
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
