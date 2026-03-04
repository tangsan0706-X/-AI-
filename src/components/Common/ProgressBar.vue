<template>
  <div class="progress-bar">
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: percent + '%' }" />
    </div>
    <span v-if="showLabel" class="progress-label">{{ percent }}%</span>
  </div>
</template>

<script setup>
defineProps({
  percent: { type: Number, default: 0 },
  showLabel: { type: Boolean, default: true }
})
</script>

<style scoped>
.progress-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: var(--bg-hover);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--pink));
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-label {
  font-size: 12px;
  color: var(--text-secondary);
  min-width: 36px;
  text-align: right;
}
</style>
