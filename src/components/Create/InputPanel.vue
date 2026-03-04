<template>
  <div class="input-panel">
    <div class="prompt-section">
      <label>提示词 (Prompt)</label>
      <textarea
        v-model="prompt"
        placeholder="描述你想要生成的内容..."
        rows="4"
        class="prompt-input"
      />
      <div class="prompt-actions">
        <button class="btn btn-ghost btn-sm" @click="prompt = ''">清空</button>
        <span class="char-count">{{ prompt.length }} 字</span>
      </div>
    </div>

    <div v-if="showNegative" class="prompt-section">
      <label>反向提示词 (Negative)</label>
      <textarea
        v-model="negative"
        placeholder="不想出现的内容..."
        rows="2"
        class="prompt-input"
      />
    </div>

    <div v-if="needsImage" class="upload-section">
      <label>参考图片</label>
      <ImageUploader v-model="imageUrl" />
    </div>

    <div class="btn-row">
      <button class="btn btn-primary btn-lg generate-btn" @click="handleGenerate" :disabled="generating">
        <Sparkles :size="18" />
        {{ generating ? '生成中...' : '开始生成' }}
      </button>
      <button v-if="generating" class="btn btn-ghost btn-lg cancel-btn" @click="$emit('cancel')">
        <XCircle :size="18" />
        取消
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Sparkles, XCircle } from 'lucide-vue-next'
import ImageUploader from '../Common/ImageUploader.vue'

const props = defineProps({
  mode: String,
  generating: Boolean
})
const emit = defineEmits(['generate', 'cancel'])

const prompt = ref('')
const negative = ref('')
const imageUrl = ref('')

const showNegative = computed(() => ['text2img', 'img2img', 'text2video'].includes(props.mode))
const needsImage = computed(() => ['img2img', 'img2video', 'style'].includes(props.mode))

function handleGenerate() {
  emit('generate', {
    prompt: prompt.value,
    negative: negative.value,
    imageUrl: imageUrl.value
  })
}
</script>

<style scoped>
.input-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prompt-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.prompt-section label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.prompt-input {
  padding: 12px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  resize: vertical;
  transition: border-color var(--transition);
  width: 100%;
  font-family: inherit;
}

.prompt-input:focus {
  border-color: var(--accent);
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-light);
}

.prompt-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 12px;
  color: var(--text-tertiary);
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.upload-section label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.btn-row {
  display: flex;
  gap: 8px;
}

.generate-btn {
  flex: 1;
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  flex-shrink: 0;
}
</style>
