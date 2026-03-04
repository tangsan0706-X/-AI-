<template>
  <div class="canvas-minimap">
    <svg :viewBox="viewBox" width="100%" height="100%">
      <rect
        v-for="node in nodes"
        :key="node.id"
        :x="node.x"
        :y="node.y"
        :width="node.width || 180"
        :height="node.height || 80"
        :fill="getNodeColor(node)"
        rx="4"
        opacity="0.7"
      />
      <line
        v-for="edge in edgePositions"
        :key="edge.id"
        :x1="edge.x1" :y1="edge.y1"
        :x2="edge.x2" :y2="edge.y2"
        stroke="var(--text-tertiary)"
        stroke-width="2"
        opacity="0.4"
      />
      <!-- Viewport rectangle -->
      <rect
        :x="-viewport.x / viewport.zoom"
        :y="-viewport.y / viewport.zoom"
        :width="containerWidth / viewport.zoom"
        :height="containerHeight / viewport.zoom"
        fill="none"
        stroke="var(--accent)"
        stroke-width="3"
        rx="4"
        opacity="0.6"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getNodeType } from '../../data/nodeRegistry'

const props = defineProps({
  nodes: Array,
  edges: Array,
  viewport: Object,
  containerWidth: { type: Number, default: 1200 },
  containerHeight: { type: Number, default: 800 }
})

const viewBox = computed(() => {
  if (props.nodes.length === 0) return '-100 -100 1400 1000'
  const xs = props.nodes.map(n => n.x)
  const ys = props.nodes.map(n => n.y)
  const minX = Math.min(...xs) - 100
  const minY = Math.min(...ys) - 100
  const maxX = Math.max(...xs) + 300
  const maxY = Math.max(...ys) + 200
  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
})

const edgePositions = computed(() => {
  return props.edges.map(e => {
    const src = props.nodes.find(n => n.id === e.sourceNode)
    const tgt = props.nodes.find(n => n.id === e.targetNode)
    if (!src || !tgt) return null
    return {
      id: e.id,
      x1: src.x + (src.width || 180),
      y1: src.y + (src.height || 80) / 2,
      x2: tgt.x,
      y2: tgt.y + (tgt.height || 80) / 2
    }
  }).filter(Boolean)
})

function getNodeColor(node) {
  const def = getNodeType(node.type)
  return def?.color || '#5961f9'
}
</script>

<style scoped>
.canvas-minimap {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 200px;
  height: 140px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  z-index: 15;
  overflow: hidden;
  opacity: 0.85;
}

.canvas-minimap:hover {
  opacity: 1;
}
</style>
