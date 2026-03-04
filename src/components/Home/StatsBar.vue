<template>
  <section class="stats-bar">
    <div class="stat-item" v-for="stat in stats" :key="stat.label">
      <div class="stat-icon">
        <component :is="iconMap[stat.icon]" :size="22" />
      </div>
      <div class="stat-info">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, Layout, Activity, GitFork } from 'lucide-vue-next'
import { stats } from '../../data/mock'

const iconMap = { Users, Layout, Activity, GitFork }
</script>

<style scoped>
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition);
}

.stat-item:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--accent-light);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-bar {
    grid-template-columns: 1fr;
  }
}
</style>
