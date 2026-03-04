<template>
  <div class="workflow-page">
    <h1 class="page-title">工作流</h1>
    <p class="page-desc">开源AI视频工作流，一键Fork即可使用</p>

    <FilterBar
      v-model="activeFilter"
      :tabs="filterTabs"
    />

    <div class="workflow-grid">
      <WorkflowCard v-for="wf in filteredWorkflows" :key="wf.id" :workflow="wf" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterBar from '../components/Common/FilterBar.vue'
import WorkflowCard from '../components/Common/WorkflowCard.vue'
import { workflows } from '../data/mock'

const activeFilter = ref('all')

const filterTabs = [
  { label: '全部', value: 'all' },
  { label: '入门', value: '入门' },
  { label: '进阶', value: '进阶' },
  { label: '电商', value: '电商' },
  { label: '短剧', value: '短剧' },
  { label: 'MV', value: 'MV' },
]

const filteredWorkflows = computed(() => {
  if (activeFilter.value === 'all') return workflows
  return workflows.filter(w => w.tags.includes(activeFilter.value))
})
</script>

<style scoped>
.workflow-page {
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

.workflow-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .workflow-grid {
    grid-template-columns: 1fr;
  }
}
</style>
