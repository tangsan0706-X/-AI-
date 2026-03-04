<template>
  <div class="canvas-toolbar">
    <div class="toolbar-group">
      <button class="toolbar-btn" @click="$emit('togglePalette')" title="节点面板">
        <Plus :size="18" />
      </button>
    </div>

    <div class="toolbar-divider" />

    <div class="toolbar-group">
      <button class="toolbar-btn" @click="$emit('run')" :disabled="isRunning" title="运行">
        <Play :size="18" />
      </button>
      <button class="toolbar-btn" @click="$emit('save')" title="保存">
        <Save :size="18" />
      </button>
      <button class="toolbar-btn" @click="$emit('loadExample')" title="加载示例工作流">
        <Lightbulb :size="18" />
      </button>
    </div>

    <div class="toolbar-divider" />

    <div class="toolbar-group zoom-group">
      <button class="toolbar-btn" @click="$emit('zoomOut')" title="缩小">
        <Minus :size="16" />
      </button>
      <span class="zoom-label">{{ Math.round(zoom * 100) }}%</span>
      <button class="toolbar-btn" @click="$emit('zoomIn')" title="放大">
        <PlusIcon :size="16" />
      </button>
      <button class="toolbar-btn" @click="$emit('zoomReset')" title="重置">
        <Maximize2 :size="16" />
      </button>
    </div>

    <div class="toolbar-divider" />

    <div class="toolbar-group">
      <button class="toolbar-btn" @click="$emit('clear')" title="清空画布">
        <Trash2 :size="16" />
      </button>
    </div>

    <div class="toolbar-spacer" />

    <div class="toolbar-group">
      <input v-model="canvasName" class="canvas-name-input" @blur="$emit('rename', canvasName)" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Plus, Play, Save, Minus, Plus as PlusIcon, Maximize2, Trash2, Lightbulb } from 'lucide-vue-next'

const props = defineProps({
  zoom: Number,
  isRunning: Boolean,
  name: String
})

defineEmits(['togglePalette', 'run', 'save', 'loadExample', 'zoomIn', 'zoomOut', 'zoomReset', 'clear', 'rename'])

const canvasName = ref(props.name || '未命名画布')
watch(() => props.name, (v) => { canvasName.value = v })
</script>

<style scoped>
.canvas-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  height: 48px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.toolbar-btn {
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: all var(--transition);
  display: flex;
  align-items: center;
}

.toolbar-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.toolbar-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: var(--border-color);
  margin: 0 4px;
}

.zoom-label {
  font-size: 12px;
  color: var(--text-secondary);
  min-width: 40px;
  text-align: center;
  font-family: monospace;
}

.toolbar-spacer {
  flex: 1;
}

.canvas-name-input {
  padding: 4px 8px;
  font-size: 13px;
  color: var(--text-primary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
  text-align: right;
  width: 180px;
}

.canvas-name-input:focus {
  border-color: var(--accent);
  background: var(--bg-input);
}
</style>
