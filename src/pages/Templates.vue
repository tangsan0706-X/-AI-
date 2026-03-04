<template>
  <div class="templates-page">
    <h1 class="page-title">模板库</h1>
    <p class="page-desc">精选AI视频模板，一键Fork开始创作</p>

    <FilterBar
      v-model="activeCategory"
      :tabs="categoryTabs"
    />

    <div class="grid-3">
      <TemplateCard v-for="tpl in filteredTemplates" :key="tpl.id" :template="tpl" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterBar from '../components/Common/FilterBar.vue'
import TemplateCard from '../components/Common/TemplateCard.vue'
import { templates } from '../data/mock'

const activeCategory = ref('全部')

const categoryTabs = [
  { label: '全部', value: '全部' },
  { label: '电商广告', value: '电商广告' },
  { label: '短剧', value: '短剧' },
  { label: '动画', value: '动画' },
  { label: 'MV', value: 'MV' },
  { label: '教育', value: '教育' },
]

const filteredTemplates = computed(() => {
  if (activeCategory.value === '全部') return templates
  return templates.filter(t => t.category === activeCategory.value)
})
</script>

<style scoped>
.templates-page {
  max-width: 1100px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 6px;
}

.page-desc {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
</style>
