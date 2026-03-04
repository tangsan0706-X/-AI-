<template>
  <div
    :class="['canvas-node', { selected, running: node.status === 'running' }]"
    :style="nodeStyle"
    @mousedown.stop="onMouseDown"
    @click.stop="$emit('select', node.id)"
  >
    <div class="node-header" :style="{ background: nodeDef?.color || '#5961f9' }">
      <span class="node-type-label">{{ nodeDef?.label || node.type }}</span>
      <div :class="['status-dot', node.status]" />
    </div>
    <div class="node-body">
      <div class="node-ports">
        <div class="input-ports">
          <CanvasPort
            v-for="port in inputPorts"
            :key="port.id"
            :port="port"
            portType="input"
            :nodeId="node.id"
            :isConnected="isPortConnected(port.id, 'input')"
            @startDrag="$emit('portDragStart', $event)"
            @endDrag="$emit('portDragEnd', $event)"
          />
        </div>
        <div class="output-ports">
          <CanvasPort
            v-for="port in outputPorts"
            :key="port.id"
            :port="port"
            portType="output"
            :nodeId="node.id"
            :isConnected="isPortConnected(port.id, 'output')"
            @startDrag="$emit('portDragStart', $event)"
            @endDrag="$emit('portDragEnd', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CanvasPort from './CanvasPort.vue'
import { getNodeType } from '../../data/nodeRegistry'

const props = defineProps({
  node: Object,
  selected: Boolean,
  edges: Array,
  zoom: { type: Number, default: 1 }
})

const emit = defineEmits(['select', 'dragStart', 'portDragStart', 'portDragEnd'])

const nodeDef = computed(() => getNodeType(props.node.type))
const inputPorts = computed(() => nodeDef.value?.inputs || [])
const outputPorts = computed(() => nodeDef.value?.outputs || [])

const nodeStyle = computed(() => ({
  transform: `translate(${props.node.x}px, ${props.node.y}px)`,
  width: props.node.width + 'px'
}))

function isPortConnected(portId, portType) {
  if (!props.edges) return false
  if (portType === 'input') {
    return props.edges.some(e => e.targetNode === props.node.id && e.targetPort === portId)
  }
  return props.edges.some(e => e.sourceNode === props.node.id && e.sourcePort === portId)
}

let startPos = null
function onMouseDown(e) {
  startPos = { x: e.clientX, y: e.clientY, nodeX: props.node.x, nodeY: props.node.y }
  emit('dragStart', { nodeId: props.node.id, startPos })
}
</script>

<style scoped>
.canvas-node {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  cursor: grab;
  user-select: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  min-width: 180px;
}

.canvas-node:hover {
  border-color: var(--text-tertiary);
}

.canvas-node.selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-light), var(--shadow-lg);
}

.canvas-node.running {
  border-color: var(--warning);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.3); }
  50% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
}

.node-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-radius: 6px 6px 0 0;
  color: #fff;
}

.node-type-label {
  font-size: 12px;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
}

.status-dot.running {
  background: #fbbf24;
  animation: blink 0.8s ease-in-out infinite;
}

.status-dot.completed {
  background: #34d399;
}

.status-dot.error {
  background: #f87171;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.node-body {
  padding: 8px 12px 10px;
}

.node-ports {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.input-ports,
.output-ports {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.output-ports {
  align-items: flex-end;
}
</style>
