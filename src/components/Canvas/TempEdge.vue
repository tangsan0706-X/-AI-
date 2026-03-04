<template>
  <g class="temp-edge" v-if="visible">
    <path
      :d="pathD"
      fill="none"
      stroke="var(--accent)"
      stroke-width="2"
      stroke-dasharray="6 4"
      stroke-linecap="round"
      opacity="0.7"
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
  visible: Boolean
})

const pathD = computed(() => {
  const dx = Math.abs(props.x2 - props.x1) * 0.5
  const cpx1 = props.x1 + dx
  const cpx2 = props.x2 - dx
  return `M ${props.x1} ${props.y1} C ${cpx1} ${props.y1}, ${cpx2} ${props.y2}, ${props.x2} ${props.y2}`
})
</script>
