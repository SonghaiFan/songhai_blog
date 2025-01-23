import { defineConfig } from "vitepress";

export const shared = defineConfig({
  rewrites: {
    "en/:rest*": ":rest*",
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
});
