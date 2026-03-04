<template>
  <div :class="['config-panel', { open: !!node }]">
    <template v-if="node">
      <div class="config-header">
        <h3>{{ nodeDef?.label || node.type }}</h3>
        <button class="close-btn" @click="$emit('close')">
          <X :size="18" />
        </button>
      </div>
      <div class="config-body">
        <div class="config-section">
          <div class="config-label">节点ID</div>
          <div class="config-value">#{{ node.id }}</div>
        </div>
        <div class="config-section">
          <div class="config-label">状态</div>
          <div :class="['status-badge', node.status]">{{ statusLabel }}</div>
        </div>

        <!-- Debug: Show if output exists -->
        <div v-if="node.status === 'completed'" class="config-section">
          <div class="config-label">输出数据</div>
          <div class="config-value">{{ node.output ? '✅ 有数据' : '❌ 无数据' }}</div>
        </div>

        <div class="config-divider" />

        <!-- Dynamic config fields based on node type -->
        <template v-for="(value, key) in node.config" :key="key">
          <div class="config-field">
            <label>{{ key }}</label>
            <template v-if="typeof value === 'number'">
              <input
                type="number"
                :value="value"
                @input="updateConfig(key, Number($event.target.value))"
                class="config-input"
              />
            </template>
            <template v-else-if="typeof value === 'boolean'">
              <label class="toggle">
                <input type="checkbox" :checked="value" @change="updateConfig(key, $event.target.checked)" />
                <span class="toggle-slider" />
              </label>
            </template>
            <template v-else>
              <input
                type="text"
                :value="value"
                @input="updateConfig(key, $event.target.value)"
                class="config-input"
              />
            </template>
          </div>
        </template>

        <!-- Output Results -->
        <template v-if="node.output && node.status === 'completed'">
          <div class="config-divider" />

          <div class="output-section">
            <div class="config-label">输出结果</div>

            <!-- 视频输出 -->
            <template v-if="getOutputData('video')">
              <div class="output-preview">
                <video :src="getOutputData('video')" controls class="output-video" />
              </div>
              <a :href="getOutputData('video')" :download="getDownloadFilename('video')" class="btn btn-primary btn-sm download-btn">
                <Download :size="14" /> 下载视频
              </a>
            </template>

            <!-- 图片输出 -->
            <template v-else-if="getOutputData('image')">
              <div class="output-preview">
                <img :src="getOutputData('image')" alt="输出图片" class="output-image" />
              </div>
              <a :href="getOutputData('image')" :download="getDownloadFilename('image')" class="btn btn-primary btn-sm download-btn">
                <Download :size="14" /> 下载图片
              </a>
            </template>

            <!-- 文本输出 -->
            <template v-else-if="getOutputData('text')">
              <div class="output-text">{{ getOutputData('text') }}</div>
            </template>

            <!-- 其他数据输出 -->
            <template v-else>
              <pre class="output-json">{{ JSON.stringify(node.output, null, 2) }}</pre>
            </template>
          </div>
        </template>

        <div class="config-divider" />

        <button class="btn btn-outline btn-sm delete-btn" @click="$emit('delete', node.id)">
          <Trash2 :size="14" /> 删除节点
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { X, Trash2, Download } from 'lucide-vue-next'
import { getNodeType } from '../../data/nodeRegistry'

const props = defineProps({ node: Object })
const emit = defineEmits(['close', 'delete', 'updateConfig'])

const nodeDef = computed(() => props.node ? getNodeType(props.node.type) : null)

// Debug: 监听节点变化，打印输出数据
watch(() => props.node, (node) => {
  if (node && node.status === 'completed') {
    console.log('✅ 节点执行完成:', {
      id: node.id,
      label: node.label,
      status: node.status,
      hasOutput: !!node.output,
      output: node.output
    })
  }
}, { immediate: true, deep: true })

const statusLabels = { idle: '空闲', running: '运行中', completed: '已完成', error: '错误' }
const statusLabel = computed(() => statusLabels[props.node?.status] || '空闲')

function updateConfig(key, value) {
  emit('updateConfig', { nodeId: props.node.id, config: { [key]: value } })
}

function getOutputData(type) {
  if (!props.node?.output) return null

  const output = props.node.output

  // 直接访问
  if (output[type]) return output[type]

  // 通过 media 字段访问（输出节点）
  if (output.media && output.media[type]) return output.media[type]

  return null
}

function getDownloadFilename(type) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const nodeName = props.node.label || props.node.type
  if (type === 'video') {
    return `${nodeName}-${timestamp}.mp4`
  } else if (type === 'image') {
    return `${nodeName}-${timestamp}.png`
  }
  return `${nodeName}-${timestamp}.txt`
}
</script>

<style scoped>
.config-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: var(--bg-card);
  border-left: 1px solid var(--border-color);
  z-index: 20;
  transform: translateX(100%);
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.config-panel.open {
  transform: translateX(0);
}

.config-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.config-header h3 {
  font-size: 15px;
  font-weight: 600;
}

.close-btn {
  color: var(--text-tertiary);
  padding: 4px;
  border-radius: var(--radius-sm);
}

.close-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.config-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.config-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.config-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.config-value {
  font-size: 13px;
  font-family: monospace;
  color: var(--text-primary);
}

.status-badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.status-badge.idle { background: var(--bg-hover); color: var(--text-secondary); }
.status-badge.running { background: rgba(245,158,11,0.1); color: #f59e0b; }
.status-badge.completed { background: rgba(16,185,129,0.1); color: #10b981; }
.status-badge.error { background: rgba(239,68,68,0.1); color: #ef4444; }

.config-divider {
  height: 1px;
  background: var(--border-color);
  margin: 4px 0;
}

.config-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.config-field label {
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: capitalize;
}

.config-input {
  padding: 6px 10px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--text-primary);
  width: 100%;
}

.config-input:focus {
  border-color: var(--accent);
  outline: none;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.toggle input { opacity: 0; width: 0; height: 0; }

.toggle-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: var(--bg-hover);
  border-radius: 10px;
  transition: 0.2s;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  left: 2px;
  top: 2px;
  transition: 0.2s;
}

.toggle input:checked + .toggle-slider {
  background: var(--accent);
}

.toggle input:checked + .toggle-slider::before {
  transform: translateX(16px);
}

.delete-btn {
  color: var(--danger);
  border-color: var(--danger);
  margin-top: 8px;
}

.delete-btn:hover {
  background: rgba(239,68,68,0.1);
}

.output-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.output-preview {
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-hover);
  border: 1px solid var(--border-color);
}

.output-video,
.output-image {
  width: 100%;
  height: auto;
  display: block;
}

.output-text {
  padding: 12px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-primary);
  word-break: break-word;
}

.output-json {
  padding: 12px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-primary);
  font-family: 'Consolas', 'Monaco', monospace;
  overflow-x: auto;
  margin: 0;
}

.download-btn {
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}
</style>
