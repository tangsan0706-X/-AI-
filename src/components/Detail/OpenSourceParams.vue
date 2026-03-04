<template>
  <div class="params-section">
    <h3 class="section-title">
      <Code :size="18" /> 开源参数
    </h3>

    <div class="param-group">
      <div class="param-label">提示词 (Prompt)</div>
      <div class="param-value prompt">{{ prompt }}</div>
    </div>

    <div class="param-group">
      <div class="param-label">模型</div>
      <div class="param-value">
        <span class="badge badge-accent">{{ model }}</span>
      </div>
    </div>

    <div class="param-group">
      <div class="param-label">参数配置</div>
      <pre class="param-json">{{ formattedParams }}</pre>
    </div>

    <button class="btn btn-outline copy-btn" @click="copyParams">
      <Copy :size="14" /> 复制参数
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Code, Copy } from 'lucide-vue-next'

const props = defineProps({
  prompt: { type: String, default: '' },
  model: { type: String, default: '' },
  params: { type: Object, default: () => ({}) }
})

const formattedParams = computed(() => JSON.stringify(props.params, null, 2))

function copyParams() {
  const text = `Prompt: ${props.prompt}\nModel: ${props.model}\nParams: ${formattedParams.value}`
  navigator.clipboard?.writeText(text)
}
</script>

<style scoped>
.params-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--accent);
}

.param-group {
  margin-bottom: 14px;
}

.param-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.param-value {
  font-size: 14px;
  color: var(--text-primary);
}

.param-value.prompt {
  background: var(--bg-input);
  padding: 12px;
  border-radius: var(--radius-md);
  line-height: 1.6;
  font-size: 13px;
}

.param-json {
  background: var(--bg-input);
  padding: 12px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-family: 'Fira Code', 'Consolas', monospace;
  color: var(--text-primary);
  overflow-x: auto;
  line-height: 1.6;
  margin: 0;
}

.copy-btn {
  margin-top: 12px;
  width: 100%;
}
</style>
