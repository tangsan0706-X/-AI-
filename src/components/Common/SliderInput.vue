<template>
  <div class="slider-input">
    <div class="slider-header">
      <label class="slider-label">{{ label }}</label>
      <span class="slider-value">{{ displayValue }}</span>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      class="slider"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  modelValue: Number,
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  suffix: { type: String, default: '' }
})

defineEmits(['update:modelValue'])

const displayValue = computed(() => props.modelValue + props.suffix)
</script>

<style scoped>
.slider-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.slider-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  font-family: monospace;
}

.slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--bg-hover);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(89, 97, 249, 0.3);
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(89, 97, 249, 0.3);
}
</style>
