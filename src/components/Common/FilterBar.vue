<template>
  <div class="filter-bar">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab', { active: modelValue === tab.value }]"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="sort" v-if="showSort">
      <select v-model="sortValue" @change="$emit('sort', sortValue)">
        <option value="latest">最新</option>
        <option value="hot">最热</option>
        <option value="forks">最多Fork</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  tabs: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
  showSort: { type: Boolean, default: true }
})
defineEmits(['update:modelValue', 'sort'])

const sortValue = ref('latest')
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tab {
  padding: 7px 16px;
  font-size: 14px;
  border-radius: 20px;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.tab:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.tab.active {
  color: #fff;
  background: var(--accent);
}

select {
  padding: 7px 12px;
  font-size: 13px;
  background: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
}
</style>
