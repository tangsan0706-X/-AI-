<template>
  <div class="search-bar">
    <Search :size="16" class="search-icon" />
    <input
      type="text"
      v-model="query"
      placeholder="搜索视频、工作流、创作者..."
      @keyup.enter="handleSearch"
    />
    <kbd v-if="!query" class="search-kbd">/</kbd>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'

const router = useRouter()
const query = ref('')

function handleSearch() {
  if (query.value.trim()) {
    router.push({ path: '/search', query: { q: query.value.trim() } })
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  height: 38px;
  background: var(--bg-input);
  border-radius: 20px;
  border: 1px solid transparent;
  transition: all var(--transition);
}

.search-bar:focus-within {
  border-color: var(--accent);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.search-icon {
  color: var(--text-tertiary);
  flex-shrink: 0;
}

input {
  flex: 1;
  height: 100%;
  font-size: 14px;
  color: var(--text-primary);
}

input::placeholder {
  color: var(--text-tertiary);
}

.search-kbd {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-tertiary);
  font-family: monospace;
}
</style>
