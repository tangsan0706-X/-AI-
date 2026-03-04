<template>
  <div class="history-panel">
    <div class="history-header">
      <h3>历史记录</h3>
      <button v-if="history.length > 0" class="btn btn-ghost btn-sm" @click="clearHistory">清空</button>
    </div>

    <div v-if="history.length > 0" class="history-list">
      <div v-for="(item, i) in history" :key="i" class="history-item" @click="$emit('select', item)">
        <div class="history-preview">
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            alt=""
            class="history-thumb"
          />
          <div v-else class="history-placeholder" :style="{ backgroundColor: item.color }">
            <component :is="item.resultType === 'video' ? Video : Image" :size="16" />
          </div>
        </div>
        <div class="history-info">
          <div class="history-prompt">{{ item.prompt }}</div>
          <div class="history-meta">
            <span>{{ item.mode }}</span>
            <span>{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-history">
      <Clock :size="24" />
      <p>暂无记录</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Clock, Image, Video } from 'lucide-vue-next'
import { getItem, setItem } from '../../utils/localStorage'

defineEmits(['select'])

const history = ref(getItem('create_history', []))

function addToHistory(item) {
  history.value.unshift(item)
  if (history.value.length > 20) history.value = history.value.slice(0, 20)
  setItem('create_history', history.value)
}

function clearHistory() {
  history.value = []
  setItem('create_history', [])
}

defineExpose({ addToHistory })
</script>

<style scoped>
.history-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.history-header h3 {
  font-size: 15px;
  font-weight: 600;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition);
}

.history-item:hover {
  background: var(--bg-hover);
}

.history-preview {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
}

.history-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.history-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.4);
  background: linear-gradient(135deg, rgba(89,97,249,0.15), rgba(238,154,229,0.1));
}

.history-info {
  flex: 1;
  min-width: 0;
}

.history-prompt {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.history-meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--text-tertiary);
}

.empty-history {
  text-align: center;
  padding: 30px 10px;
  color: var(--text-tertiary);
}

.empty-history p {
  margin-top: 8px;
  font-size: 13px;
}
</style>
