<template>
  <div
    class="canvas-view"
    ref="containerRef"
    @mousedown="onCanvasMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @wheel.prevent="onWheel"
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <CanvasBackground
      :zoom="store.viewport.zoom"
      :offsetX="store.viewport.x"
      :offsetY="store.viewport.y"
    />

    <!-- Transform layer -->
    <div class="canvas-transform" :style="transformStyle">
      <!-- SVG layer for edges -->
      <svg class="edges-layer" :style="svgStyle">
        <CanvasEdge
          v-for="edge in store.edges"
          :key="edge.id"
          :x1="getPortPosition(edge.sourceNode, edge.sourcePort, 'output').x"
          :y1="getPortPosition(edge.sourceNode, edge.sourcePort, 'output').y"
          :x2="getPortPosition(edge.targetNode, edge.targetPort, 'input').x"
          :y2="getPortPosition(edge.targetNode, edge.targetPort, 'input').y"
          :selected="store.selectedEdgeId === edge.id"
          @click="store.selectedEdgeId = edge.id"
        />
        <TempEdge
          :visible="!!tempEdge"
          :x1="tempEdge?.x1 || 0"
          :y1="tempEdge?.y1 || 0"
          :x2="tempEdge?.x2 || 0"
          :y2="tempEdge?.y2 || 0"
        />
      </svg>

      <!-- DOM layer for nodes -->
      <CanvasNode
        v-for="node in store.nodes"
        :key="node.id"
        :node="node"
        :selected="store.selectedNodeId === node.id"
        :edges="store.edges"
        :zoom="store.viewport.zoom"
        @select="store.selectNode($event)"
        @dragStart="onNodeDragStart"
        @portDragStart="onPortDragStart"
        @portDragEnd="onPortDragEnd"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CanvasBackground from './CanvasBackground.vue'
import CanvasNode from './CanvasNode.vue'
import CanvasEdge from './CanvasEdge.vue'
import TempEdge from './TempEdge.vue'
import { useCanvasStore } from '../../stores/canvas'
import { getNodeType } from '../../data/nodeRegistry'

const store = useCanvasStore()
const containerRef = ref(null)

const transformStyle = computed(() => ({
  transform: `translate(${store.viewport.x}px, ${store.viewport.y}px) scale(${store.viewport.zoom})`
}))

const svgStyle = computed(() => {
  // Make SVG large enough to cover all edges
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '10000px',
    height: '10000px',
    pointerEvents: 'none',
    overflow: 'visible'
  }
})

// Port position calculation
function getPortPosition(nodeId, portId, portType) {
  const node = store.nodes.find(n => n.id === nodeId)
  if (!node) return { x: 0, y: 0 }

  const nodeDef = getNodeType(node.type)
  const ports = portType === 'input' ? (nodeDef?.inputs || []) : (nodeDef?.outputs || [])
  const portIndex = ports.findIndex(p => p.id === portId)
  const headerHeight = 30
  const portGap = 22
  const portY = node.y + headerHeight + 14 + portIndex * portGap

  if (portType === 'output') {
    return { x: node.x + (node.width || 200), y: portY }
  }
  return { x: node.x, y: portY }
}

// Panning
let isPanning = ref(false)
let panStart = null

function onCanvasMouseDown(e) {
  if (e.target === containerRef.value || e.target.closest('.canvas-background') || e.target.closest('.canvas-view') === containerRef.value && !e.target.closest('.canvas-node')) {
    isPanning.value = true
    panStart = { x: e.clientX - store.viewport.x, y: e.clientY - store.viewport.y }
    store.clearSelection()
  }
}

// Node dragging
let draggingNode = null

function onNodeDragStart(data) {
  draggingNode = data
}

// Port dragging (temp edge)
const tempEdge = ref(null)
let portDragInfo = null

function onPortDragStart(data) {
  portDragInfo = data
  const containerRect = containerRef.value.getBoundingClientRect()
  const startX = (data.x - containerRect.left - store.viewport.x) / store.viewport.zoom
  const startY = (data.y - containerRect.top - store.viewport.y) / store.viewport.zoom
  tempEdge.value = { x1: startX, y1: startY, x2: startX, y2: startY }
}

function onPortDragEnd(data) {
  if (portDragInfo && portDragInfo.nodeId !== data.nodeId) {
    if (portDragInfo.portType === 'output') {
      store.addEdge(portDragInfo.nodeId, portDragInfo.portId, data.nodeId, data.portId)
    } else {
      store.addEdge(data.nodeId, data.portId, portDragInfo.nodeId, portDragInfo.portId)
    }
  }
  tempEdge.value = null
  portDragInfo = null
}

function onMouseMove(e) {
  // Pan
  if (isPanning.value && panStart) {
    store.setViewport({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    })
  }

  // Drag node
  if (draggingNode) {
    const { nodeId, startPos } = draggingNode
    const dx = (e.clientX - startPos.x) / store.viewport.zoom
    const dy = (e.clientY - startPos.y) / store.viewport.zoom
    store.updateNodePosition(nodeId, startPos.nodeX + dx, startPos.nodeY + dy)
  }

  // Temp edge
  if (tempEdge.value && portDragInfo) {
    const containerRect = containerRef.value.getBoundingClientRect()
    tempEdge.value.x2 = (e.clientX - containerRect.left - store.viewport.x) / store.viewport.zoom
    tempEdge.value.y2 = (e.clientY - containerRect.top - store.viewport.y) / store.viewport.zoom
  }
}

function onMouseUp() {
  isPanning.value = false
  panStart = null
  draggingNode = null
  if (tempEdge.value) {
    tempEdge.value = null
    portDragInfo = null
  }
}

// Zoom
function onWheel(e) {
  const delta = e.deltaY > 0 ? -0.05 : 0.05
  const newZoom = Math.max(0.1, Math.min(3, store.viewport.zoom + delta))
  store.setViewport({ zoom: newZoom })
}

// Drop node from palette
function onDrop(e) {
  const nodeType = e.dataTransfer.getData('nodeType')
  if (!nodeType) return
  const containerRect = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - containerRect.left - store.viewport.x) / store.viewport.zoom
  const y = (e.clientY - containerRect.top - store.viewport.y) / store.viewport.zoom
  const nodeDef = getNodeType(nodeType)
  store.addNode(nodeType, x, y, { label: nodeDef?.label || nodeType, ...nodeDef?.defaultConfig })
}
</script>

<style scoped>
.canvas-view {
  position: relative;
  flex: 1;
  overflow: hidden;
  cursor: grab;
}

.canvas-view:active {
  cursor: grabbing;
}

.canvas-transform {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  will-change: transform;
}

.edges-layer {
  pointer-events: none;
}

.edges-layer :deep(g) {
  pointer-events: auto;
}
</style>
