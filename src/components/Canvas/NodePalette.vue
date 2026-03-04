<template>
  <div :class="['node-palette', { open: isOpen }]">
    <div class="palette-header">
      <h3>节点面板</h3>
      <button class="close-btn" @click="$emit('close')">
        <X :size="18" />
      </button>
    </div>
    <div class="palette-search">
      <Search :size="14" />
      <input v-model="searchQuery" placeholder="搜索节点..." />
    </div>
    <div class="palette-list">
      <div v-for="category in filteredCategories" :key="category" class="palette-category">
        <div class="category-title">{{ category }}</div>
        <div
          v-for="nodeType in getNodesByCategory(category)"
          :key="nodeType.type"
          class="palette-item"
          draggable="true"
          @dragstart="onDragStart($event, nodeType)"
          @click="$emit('addNode', nodeType)"
        >
          <div class="palette-icon" :style="{ background: nodeType.color }">
            <component :is="getIcon(nodeType.icon)" :size="16" />
          </div>
          <div class="palette-info">
            <span class="palette-name">{{ nodeType.label }}</span>
            <span class="palette-ports">
              {{ nodeType.inputs.length }}入 / {{ nodeType.outputs.length }}出
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { X, Search, Type, Image, Wand2, ImagePlus, Video, Clapperboard, Scissors, SlidersHorizontal, Layers, Download } from 'lucide-vue-next'
import { nodeTypes, nodeCategories } from '../../data/nodeRegistry'

defineProps({ isOpen: Boolean })
defineEmits(['close', 'addNode'])

const searchQuery = ref('')

const iconMap = { Type, Image, Wand2, ImagePlus, Video, Clapperboard, Scissors, SlidersHorizontal, Layers, Download }

function getIcon(name) {
  return iconMap[name] || Type
}

const filteredTypes = computed(() => {
  if (!searchQuery.value) return nodeTypes
  const q = searchQuery.value.toLowerCase()
  return nodeTypes.filter(n => n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q))
})

const filteredCategories = computed(() => {
  const cats = new Set(filteredTypes.value.map(n => n.category))
  return nodeCategories.filter(c => cats.has(c))
})

function getNodesByCategory(category) {
  return filteredTypes.value.filter(n => n.category === category)
}

function onDragStart(e, nodeType) {
  e.dataTransfer.setData('nodeType', nodeType.type)
  e.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.node-palette {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
  z-index: 20;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
}

.node-palette.open {
  transform: translateX(0);
}

.palette-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.palette-header h3 {
  font-size: 15px;
  font-weight: 600;
}

.close-btn {
  color: var(--text-tertiary);
  padding: 4px;
  border-radius: var(--radius-sm);
}

.close-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.palette-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin: 8px 12px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  color: var(--text-tertiary);
}

.palette-search input {
  flex: 1;
  font-size: 13px;
}

.palette-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 12px 12px;
}

.category-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 4px 6px;
}

.palette-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-md);
  cursor: grab;
  transition: background var(--transition);
}

.palette-item:hover {
  background: var(--bg-hover);
}

.palette-item:active {
  cursor: grabbing;
}

.palette-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.palette-name {
  font-size: 13px;
  font-weight: 500;
  display: block;
}

.palette-ports {
  font-size: 11px;
  color: var(--text-tertiary);
}
</style>
