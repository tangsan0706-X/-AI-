import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  text2image,
  image2image,
  text2video,
  image2video,
  hasApiKey
} from '../services/dashscope'

export const useCreateStore = defineStore('create', () => {
  const generating = ref(false)
  const progress = ref(0)
  const results = ref([])
  const error = ref('')
  let abortController = null

  /**
   * 统一生成入口
   * @param {string} mode - text2img | img2img | text2video | img2video | style
   * @param {object} input - { prompt, negative, imageUrl }
   * @param {object} params - { model, resolution, seed, steps, ... }
   */
  async function generate(mode, input, params) {
    if (!hasApiKey()) {
      error.value = 'NO_API_KEY'
      return
    }

    generating.value = true
    progress.value = 0
    results.value = []
    error.value = ''
    abortController = new AbortController()

    const callbacks = {
      onProgress: (pct) => { progress.value = pct },
      signal: abortController.signal
    }

    try {
      let res
      const size = params.resolution || '1024*1024'

      if (mode === 'text2img') {
        res = await text2image({
          prompt: input.prompt,
          negativePrompt: input.negative,
          model: params.model,
          size,
          n: 4,
          seed: params.seed,
          steps: params.steps
        }, callbacks)
      } else if (mode === 'img2img' || mode === 'style') {
        res = await image2image({
          prompt: input.prompt,
          negativePrompt: input.negative,
          imageUrl: input.imageUrl,
          model: params.model,
          size,
          n: 4,
          seed: params.seed,
          steps: params.steps
        }, callbacks)
      } else if (mode === 'text2video') {
        res = await text2video({
          prompt: input.prompt,
          model: params.model,
          size
        }, callbacks)
      } else if (mode === 'img2video') {
        res = await image2video({
          imageUrl: input.imageUrl,
          prompt: input.prompt,
          model: params.model,
          size
        }, callbacks)
      }

      progress.value = 100
      results.value = res || []
    } catch (e) {
      if (e.name === 'AbortError') {
        error.value = '已取消生成'
      } else {
        error.value = e.message || '生成失败'
      }
    } finally {
      generating.value = false
      abortController = null
    }
  }

  function cancel() {
    if (abortController) {
      abortController.abort()
    }
  }

  function clearResults() {
    results.value = []
    error.value = ''
    progress.value = 0
  }

  return { generating, progress, results, error, generate, cancel, clearResults }
})
