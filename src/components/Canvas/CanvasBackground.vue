<template>
  <svg class="canvas-background" width="100%" height="100%">
    <defs>
      <pattern
        id="grid-small"
        :width="20 * zoom"
        :height="20 * zoom"
        patternUnits="userSpaceOnUse"
        :x="offsetX"
        :y="offsetY"
      >
        <circle :cx="1" :cy="1" r="1" fill="var(--grid-dot)" />
      </pattern>
      <pattern
        id="grid-large"
        :width="100 * zoom"
        :height="100 * zoom"
        patternUnits="userSpaceOnUse"
        :x="offsetX"
        :y="offsetY"
      >
        <rect :width="100 * zoom" :height="100 * zoom" fill="url(#grid-small)" />
        <circle :cx="1" :cy="1" r="2" fill="var(--grid-dot-large)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="var(--canvas-bg)" />
    <rect width="100%" height="100%" fill="url(#grid-large)" />
  </svg>
</template>

<script setup>
const props = defineProps({
  zoom: { type: Number, default: 1 },
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 0 }
})
</script>

<style scoped>
.canvas-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
