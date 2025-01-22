<script setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="blog-post-header">
        <h1 v-if="frontmatter.title" class="post-title">
          {{ frontmatter.title }}
        </h1>
        <div class="post-info">
          <div v-if="frontmatter.date" class="post-time">
            {{ formatDate(frontmatter.date) }}
          </div>
          <div v-if="frontmatter.tags" class="post-tags">
            <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.blog-post-header {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.post-title {
  margin: 0 0 1rem;
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.post-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.post-time {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0 0.75rem;
  height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  border-radius: 1rem;
  transition: background-color 0.2s;
}

.tag:hover {
  background: var(--vp-c-brand-soft);
}
</style>
