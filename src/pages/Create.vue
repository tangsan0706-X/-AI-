<template>
  <div class="create-page">
    <div class="page-header">
      <h1>AI 创作工作台</h1>
      <p>选择创作模式，输入提示词，一键生成AI内容</p>
    </div>

    <ModeSelector v-model="mode" />

    <div class="create-layout">
      <div class="create-left">
        <InputPanel
          :mode="mode"
          :generating="createStore.generating"
          @generate="handleGenerate"
          @cancel="createStore.cancel()"
        />
        <ParamsPanel ref="paramsPanelRef" :mode="mode" />
      </div>
      <div class="create-right">
        <ResultGallery
          :results="createStore.results"
          :generating="createStore.generating"
          :progress="createStore.progress"
          :error="createStore.error"
          @retry="retryGenerate"
        />
        <HistoryPanel ref="historyRef" @select="loadFromHistory" />
      </div>
    </div>

    <ApiKeyModal
      :visible="showApiKeyModal"
      @close="showApiKeyModal = false"
      @saved="onApiKeySaved"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModeSelector from '../components/Create/ModeSelector.vue'
import InputPanel from '../components/Create/InputPanel.vue'
import ParamsPanel from '../components/Create/ParamsPanel.vue'
import ResultGallery from '../components/Create/ResultGallery.vue'
import HistoryPanel from '../components/Create/HistoryPanel.vue'
import ApiKeyModal from '../components/Common/ApiKeyModal.vue'
import { useCreateStore } from '../stores/create'
import { hasApiKey } from '../services/dashscope'

const createStore = useCreateStore()
const mode = ref('text2img')
const paramsPanelRef = ref(null)
const historyRef = ref(null)
const showApiKeyModal = ref(false)

// 缓存上次的 input 用于重试
let lastInput = null

async function handleGenerate(input) {
  if (!input.prompt.trim() && !input.imageUrl) return

  // 检查 API Key
  if (!hasApiKey()) {
    showApiKeyModal.value = true
    lastInput = input
    return
  }

  lastInput = input
  const params = paramsPanelRef.value?.params || {}

  await createStore.generate(mode.value, input, params)

  // 检查是否因缺少 API Key 而失败
  if (createStore.error === 'NO_API_KEY') {
    showApiKeyModal.value = true
    return
  }

  // 成功后添加到历史
  if (createStore.results.length > 0 && historyRef.value) {
    const isVideo = ['text2video', 'img2video'].includes(mode.value)
    const modeLabels = { text2img: '文生图', img2img: '图生图', text2video: '文生视频', img2video: '图生视频', style: '风格转换' }
    const firstResult = createStore.results[0]
    historyRef.value.addToHistory({
      prompt: input.prompt || '(图片输入)',
      mode: modeLabels[mode.value] || mode.value,
      resultType: isVideo ? 'video' : 'image',
      thumbnail: firstResult?.url || '',
      time: new Date().toLocaleTimeString()
    })
  }
}

function onApiKeySaved() {
  // API Key 保存后自动重试上次的生成
  if (lastInput) {
    handleGenerate(lastInput)
  }
}

function retryGenerate() {
  if (lastInput) {
    handleGenerate(lastInput)
  }
}

function loadFromHistory(item) {
  // placeholder for loading history item
}
</script>

<style scoped>
.create-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.page-header p {
  font-size: 14px;
  color: var(--text-secondary);
}

.create-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
  align-items: start;
}

.create-left,
.create-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 1024px) {
  .create-layout {
    grid-template-columns: 1fr;
  }
}
</style>
