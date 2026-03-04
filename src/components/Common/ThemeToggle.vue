<template>
  <button class="theme-toggle" @click="themeStore.toggle" :title="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'">
    <Sun v-if="themeStore.isDark" :size="18" />
    <Moon v-else :size="18" />
  </button>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore } from '../../stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition);
}

.theme-toggle:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}
</style>
