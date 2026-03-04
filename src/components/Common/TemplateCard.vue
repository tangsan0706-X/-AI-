<template>
  <div class="template-card card">
    <div class="cover" :style="{ backgroundColor: template.coverColor || '#1a1a2e' }">
      <div class="cover-inner">
        <LayoutGrid :size="32" class="cover-icon" />
      </div>
    </div>
    <div class="info">
      <h3 class="name">{{ template.name }}</h3>
      <p class="desc">{{ template.description }}</p>
      <div class="footer">
        <span class="uses"><Download :size="13" /> {{ formatNum(template.uses) }} 次使用</span>
        <button class="btn btn-outline btn-sm" @click.stop>
          <GitFork :size="14" /> Fork
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LayoutGrid, Download, GitFork } from 'lucide-vue-next'

defineProps({ template: Object })

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n
}
</script>

<style scoped>
.template-card {
  display: flex;
  flex-direction: column;
}

.cover {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.cover-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(89, 97, 249, 0.2), rgba(238, 154, 229, 0.15));
}

.cover-icon {
  color: rgba(255, 255, 255, 0.5);
}

.info {
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.4;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.uses {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
