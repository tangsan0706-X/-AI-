<template>
  <div class="params-panel">
    <h3>参数设置</h3>

    <div class="param-group">
      <label>模型</label>
      <select v-model="params.model" class="param-select">
        <option v-for="m in modelOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
      </select>
    </div>

    <SliderInput
      v-if="showImageParams"
      label="采样步数"
      v-model="params.steps"
      :min="10" :max="50" :step="1"
    />

    <SliderInput
      v-if="showImageParams"
      label="CFG Scale"
      v-model="params.cfgScale"
      :min="1" :max="20" :step="0.5"
    />

    <div class="param-group resolution">
      <label>分辨率</label>
      <div class="resolution-inputs">
        <select v-model="params.resolution" class="param-select">
          <option v-for="r in resolutionOptions" :key="r.value" :value="r.value">{{ r.label }}</option>
        </select>
      </div>
    </div>

    <div v-if="showImageParams" class="param-group">
      <label>随机种子</label>
      <div class="seed-row">
        <input v-model.number="params.seed" type="number" class="param-input" />
        <button class="btn btn-ghost btn-sm" @click="params.seed = -1" title="随机">
          <Shuffle :size="14" />
        </button>
      </div>
    </div>

    <div v-if="showVideoParams" class="video-params">
      <SliderInput label="帧数" v-model="params.frames" :min="8" :max="96" :step="8" />
      <SliderInput label="FPS" v-model="params.fps" :min="4" :max="30" :step="1" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { Shuffle } from 'lucide-vue-next'
import SliderInput from '../Common/SliderInput.vue'
import { MODELS, RESOLUTIONS } from '../../services/dashscope'

const props = defineProps({ mode: String })

const params = reactive({
  model: 'wanx-v1',
  steps: 30,
  cfgScale: 7.5,
  resolution: '1024*1024',
  seed: -1,
  frames: 24,
  fps: 8
})

const modelOptions = computed(() => {
  const key = props.mode || 'text2img'
  return MODELS[key] || MODELS.text2img
})

const isVideoMode = computed(() => ['text2video', 'img2video'].includes(props.mode))
const showImageParams = computed(() => !isVideoMode.value)
const showVideoParams = computed(() => isVideoMode.value)

const resolutionOptions = computed(() => {
  return isVideoMode.value ? RESOLUTIONS.video : RESOLUTIONS.image
})

// 切换模式时重置模型为新模式的第一个选项
watch(() => props.mode, () => {
  const options = modelOptions.value
  if (options.length && !options.find(m => m.value === params.model)) {
    params.model = options[0].value
  }
  const resOpts = resolutionOptions.value
  if (resOpts.length && !resOpts.find(r => r.value === params.resolution)) {
    params.resolution = resOpts[0].value
  }
})

defineExpose({ params })
</script>

<style scoped>
.params-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.params-panel h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.param-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.param-group label {
  font-size: 13px;
  color: var(--text-secondary);
}

.param-select,
.param-input {
  padding: 8px 12px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-primary);
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
}

.param-select:focus,
.param-input:focus {
  border-color: var(--accent);
  outline: none;
}

.seed-row {
  display: flex;
  gap: 6px;
}

.seed-row .param-input {
  flex: 1;
}

.video-params {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}
</style>
