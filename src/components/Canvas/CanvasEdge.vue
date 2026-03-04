<template>
  <g class="canvas-edge" @click.stop="handleClick">
    <path
      :d="pathD"
      fill="none"
      :stroke="selected ? 'var(--accent)' : 'var(--text-tertiary)'"
      :stroke-width="selected ? 3 : 2"
      stroke-linecap="round"
      class="edge-path"
    />
    <path
      :d="pathD"
      fill="none"
      stroke="transparent"
      stroke-width="12"
      stroke-linecap="round"
      class="edge-hitbox"
    />
  </g>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  x1: Number,
  y1: Number,
  x2: Number,
  y2: Number,
  selected: Boolean
})

const emit = defineEmits(['click'])

const pathD = computed(() => {
  const dx = Math.abs(props.x2 - props.x1) * 0.5
  const cpx1 = props.x1 + dx
  const cpx2 = props.x2 - dx
  return `M ${props.x1} ${props.y1} C ${cpx1} ${props.y1}, ${cpx2} ${props.y2}, ${props.x2} ${props.y2}`
})

function handleClick() {
  emit('click')
}
</script>

<style scoped>
.edge-path {
  transition: stroke 0.15s, stroke-width 0.15s;
}

.canvas-edge:hover .edge-path {
  stroke: var(--accent);
  stroke-width: 3;
}

.edge-hitbox {
  cursor: pointer;
}
</style>
