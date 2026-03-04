<template>
  <div class="workflow-card card">
    <div class="card-header">
      <div class="flow-preview">
        <div
          v-for="(node, i) in workflow.nodesPreview.slice(0, 5)"
          :key="i"
          class="flow-node"
        >
          <span class="node-dot" />
          <span class="node-label">{{ node }}</span>
          <span v-if="i < Math.min(workflow.nodesPreview.length, 5) - 1" class="node-arrow">→</span>
        </div>
        <div v-if="workflow.nodesPreview.length > 5" class="flow-node more">
          +{{ workflow.nodesPreview.length - 5 }} 更多
        </div>
      </div>
    </div>
    <div class="card-body">
      <h3 class="name">{{ workflow.name }}</h3>
      <p class="desc">{{ workflow.description }}</p>
      <div class="meta">
        <div class="author">
          <UserAvatar :name="workflow.author.name" :size="20" />
          <span>{{ workflow.author.name }}</span>
        </div>
        <div class="stats-row">
          <span class="stat"><Box :size="13" /> {{ workflow.nodes }} 节点</span>
          <span class="stat"><GitFork :size="13" /> {{ formatNum(workflow.forks) }}</span>
          <span class="stat"><Download :size="13" /> {{ formatNum(workflow.uses) }}</span>
        </div>
      </div>
      <div class="actions">
        <div class="tag-list">
          <span class="badge badge-accent" v-for="tag in workflow.tags" :key="tag">{{ tag }}</span>
        </div>
        <button class="btn btn-primary btn-sm" @click.stop>
          <GitFork :size="14" /> Fork
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GitFork, Download, Box } from 'lucide-vue-next'
import UserAvatar from './UserAvatar.vue'

defineProps({ workflow: Object })

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n
}
</script>

<style scoped>
.workflow-card {
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 16px;
  background: var(--bg-input);
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
}

.flow-preview {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  min-width: 0;
}

.flow-node {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-secondary);
}

.node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.node-label {
  padding: 2px 6px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 10px;
}

.node-arrow {
  color: var(--text-tertiary);
  font-size: 10px;
}

.more {
  color: var(--text-tertiary);
  font-size: 10px;
}

.card-body {
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.stats-row {
  display: flex;
  gap: 10px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.tag-list {
  display: flex;
  gap: 6px;
}
</style>
