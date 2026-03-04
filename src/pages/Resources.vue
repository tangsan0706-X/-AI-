<template>
  <div class="resources-page">
    <div class="page-header">
      <h1>资源库</h1>
      <p>模型、图片素材、音效、配乐</p>
    </div>

    <div class="resource-tabs">
      <button
        v-for="cat in resourceCategories"
        :key="cat.key"
        :class="['resource-tab', { active: activeTab === cat.key }]"
        @click="activeTab = cat.key"
      >
        {{ cat.label }}
        <span class="tab-count">{{ cat.count }}</span>
      </button>
    </div>

    <div class="resource-list">
      <ResourceCard
        v-for="res in displayList"
        :key="res.id"
        :resource="res"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ResourceCard from '../components/Resources/ResourceCard.vue'
import { models, images, sounds, music, resourceCategories } from '../data/mockResources'

const activeTab = ref('models')

const displayList = computed(() => {
  switch (activeTab.value) {
    case 'models': return models
    case 'images': return images
    case 'sounds': return sounds
    case 'music': return music
    default: return []
  }
})
</script>

<style scoped>
.resources-page {
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.page-header p {
  font-size: 14px;
  color: var(--text-secondary);
}

.resource-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
}

.resource-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all var(--transition);
}

.resource-tab:hover {
  color: var(--text-primary);
}

.resource-tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-count {
  font-size: 11px;
  background: var(--bg-hover);
  padding: 1px 6px;
  border-radius: 10px;
  color: var(--text-tertiary);
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
