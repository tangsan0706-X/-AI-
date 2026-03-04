<template>
  <div class="layout">
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

const sidebarOpen = ref(false)
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.main-content {
  margin-top: var(--navbar-height);
  margin-left: var(--sidebar-width);
  min-height: calc(100vh - var(--navbar-height));
  padding: 24px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
  }
}
</style>
