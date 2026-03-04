<template>
  <div
    class="user-avatar"
    :style="{
      width: size + 'px',
      height: size + 'px',
      fontSize: size * 0.4 + 'px',
      background: avatarColor
    }"
  >
    {{ initial }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '用户' },
  size: { type: Number, default: 36 }
})

const colors = ['#5961f9', '#ee9ae5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316']
const initial = computed(() => props.name.charAt(0))
const avatarColor = computed(() => {
  let hash = 0
  for (let i = 0; i < props.name.length; i++) {
    hash = props.name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
})
</script>

<style scoped>
.user-avatar {
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  flex-shrink: 0;
  user-select: none;
}
</style>
