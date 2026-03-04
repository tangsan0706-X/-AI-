<template>
  <div class="mode-selector">
    <button
      v-for="mode in modes"
      :key="mode.key"
      :class="['mode-btn', { active: modelValue === mode.key }]"
      @click="$emit('update:modelValue', mode.key)"
    >
      <component :is="mode.icon" :size="20" />
      <span class="mode-label">{{ mode.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { Type, ImagePlus, Video, Clapperboard, Palette } from 'lucide-vue-next'

defineProps({ modelValue: String })
defineEmits(['update:modelValue'])

const modes = [
  { key: 'text2img', label: '文生图', icon: Type },
  { key: 'img2img', label: '图生图', icon: ImagePlus },
  { key: 'text2video', label: '文生视频', icon: Video },
  { key: 'img2video', label: '图生视频', icon: Clapperboard },
  { key: 'style', label: '风格转换', icon: Palette },
]
</script>

<style scoped>
.mode-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 14px;
  transition: all var(--transition);
}

.mode-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.mode-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(89, 97, 249, 0.3);
}

.mode-label {
  font-weight: 500;
}
</style>
