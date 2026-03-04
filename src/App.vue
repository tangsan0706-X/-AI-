<template>
  <div :class="['app', { dark: themeStore.isDark }]">
    <template v-if="isFullscreen">
      <router-view />
    </template>
    <template v-else>
      <AppLayout>
        <router-view />
      </AppLayout>
    </template>
    <AuthModal v-if="authStore.showModal" />
  </div>
</template>

<script setup>
import { watchEffect, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './components/Layout/AppLayout.vue'
import AuthModal from './components/Common/AuthModal.vue'
import { useThemeStore } from './stores/theme'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const themeStore = useThemeStore()
const authStore = useAuthStore()

const isFullscreen = computed(() => route.meta.fullscreen)

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', themeStore.isDark ? 'dark' : 'light')
})
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
