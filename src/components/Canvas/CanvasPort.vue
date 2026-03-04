<template>
  <div
    :class="['canvas-port', portType, { connected: isConnected }]"
    :title="port.label"
    @mousedown.stop="onMouseDown"
    @mouseup.stop="onMouseUp"
  >
    <div class="port-dot" />
    <span v-if="showLabel" :class="['port-label', portType]">{{ port.label }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  port: Object,
  portType: String, // 'input' | 'output'
  nodeId: Number,
  isConnected: Boolean,
  showLabel: { type: Boolean, default: true }
})

const emit = defineEmits(['startDrag', 'endDrag'])

function onMouseDown(e) {
  const rect = e.target.closest('.canvas-port').getBoundingClientRect()
  emit('startDrag', {
    nodeId: props.nodeId,
    portId: props.port.id,
    portType: props.portType,
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  })
}

function onMouseUp() {
  emit('endDrag', {
    nodeId: props.nodeId,
    portId: props.port.id,
    portType: props.portType
  })
}
</script>

<style scoped>
.canvas-port {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: crosshair;
  padding: 3px 0;
}

.canvas-port.input {
  flex-direction: row;
}

.canvas-port.output {
  flex-direction: row-reverse;
}

.port-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--text-tertiary);
  background: var(--bg-card);
  transition: all var(--transition);
  flex-shrink: 0;
}

.canvas-port:hover .port-dot,
.canvas-port.connected .port-dot {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
}

.port-label {
  font-size: 11px;
  color: var(--text-tertiary);
  white-space: nowrap;
}
</style>
