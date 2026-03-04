<template>
  <div class="resource-card" @click="$emit('click')">
    <div class="resource-icon" :style="{ background: resource.color || 'var(--accent)' }">
      <component :is="iconComp" :size="24" />
    </div>
    <div class="resource-body">
      <h4 class="resource-name">{{ resource.name }}</h4>
      <div class="resource-meta">
        <span class="resource-category">{{ resource.category }}</span>
        <span v-if="resource.size" class="resource-size">{{ resource.size }}</span>
        <span v-if="resource.duration" class="resource-size">{{ resource.duration }}</span>
        <span v-if="resource.resolution" class="resource-size">{{ resource.resolution }}</span>
      </div>
      <p v-if="resource.description" class="resource-desc">{{ resource.description }}</p>
    </div>
    <div class="resource-action">
      <span v-if="resource.downloads" class="resource-downloads">
        <Download :size="12" /> {{ formatNum(resource.downloads) }}
      </span>
      <button class="btn btn-outline btn-sm">
        <Download :size="14" /> 获取
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Box, Image, Music, Volume2, Download } from 'lucide-vue-next'

const props = defineProps({ resource: Object })
defineEmits(['click'])

const typeIcons = { model: Box, image: Image, music: Music, audio: Volume2 }
const iconComp = computed(() => typeIcons[props.resource.type] || Box)

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n
}
</script>

<style scoped>
.resource-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition);
}

.resource-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.resource-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.resource-body {
  flex: 1;
  min-width: 0;
}

.resource-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.resource-meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.resource-category {
  color: var(--accent);
}

.resource-desc {
  font-size: 13px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.resource-downloads {
  font-size: 12px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
