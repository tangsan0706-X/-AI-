<template>
  <div class="search-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="['search-tab', { active: modelValue === tab.key }]"
      @click="$emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
      <span class="tab-count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: Array,
  modelValue: String
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
}

.search-tab {
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

.search-tab:hover {
  color: var(--text-primary);
}

.search-tab.active {
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
</style>
