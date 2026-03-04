/**
 * DashScope API 服务层
 * 封装阿里云 DashScope 的文生图、图生图、文生视频、图生视频接口
 */

const API_BASE = '/api/dashscope'
const STORAGE_KEY = 'dashscope_api_key'

// ========== API Key 管理 ==========

export function getApiKey() {
  return localStorage.getItem(STORAGE_KEY) || ''
}

export function setApiKey(key) {
  localStorage.setItem(STORAGE_KEY, key)
}

export function hasApiKey() {
  return !!getApiKey()
}

// ========== 模型与分辨率常量 ==========

export const MODELS = {
  text2img: [
    { value: 'wanx-v1', label: '通义万相 (wanx-v1)' },
    { value: 'flux-schnell', label: 'Flux Schnell (快速)' },
    { value: 'flux-dev', label: 'Flux Dev (高质量)' },
    { value: 'stable-diffusion-3.5-large', label: 'SD 3.5 Large' },
    { value: 'stable-diffusion-xl', label: 'SDXL' }
  ],
  img2img: [
    { value: 'wanx-v1', label: '通义万相 (wanx-v1)' }
  ],
  text2video: [
    { value: 'wan2.1-t2v-turbo', label: 'Wan2.1 Turbo (快速)' },
    { value: 'wan2.1-t2v-plus', label: 'Wan2.1 Plus (高质量)' }
  ],
  img2video: [
    { value: 'wan2.1-i2v-turbo', label: 'Wan2.1 I2V Turbo (快速)' },
    { value: 'wan2.1-i2v-plus', label: 'Wan2.1 I2V Plus (高质量)' }
  ],
  style: [
    { value: 'wanx-v1', label: '通义万相 (wanx-v1)' }
  ]
}

export const RESOLUTIONS = {
  image: [
    { value: '1024*1024', label: '1024×1024 (1:1)' },
    { value: '720*1280', label: '720×1280 (9:16)' },
    { value: '1280*720', label: '1280×720 (16:9)' },
    { value: '768*1024', label: '768×1024 (3:4)' },
    { value: '1024*768', label: '1024×768 (4:3)' }
  ],
  video: [
    { value: '1280*720', label: '1280×720 (16:9)' },
    { value: '720*1280', label: '720×1280 (9:16)' },
    { value: '960*960', label: '960×960 (1:1)' }
  ]
}

// ========== 图片工具 ==========

/**
 * 将 Data URL (data:image/png;base64,...) 转为纯 base64 字符串
 * 如果已经是 http(s) URL 则原样返回
 */
function normalizeImageInput(url) {
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  // data:image/png;base64,iVBOR... → iVBOR...
  const match = url.match(/^data:[^;]+;base64,(.+)$/)
  if (match) return match[1]
  return url
}

// ========== 请求工具 ==========

async function request(url, options = {}) {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('请先设置 DashScope API Key')
  }

  // 验证 API Key 格式
  if (!apiKey.startsWith('sk-')) {
    throw new Error('API Key 格式不正确，应以 sk- 开头')
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    ...options.headers
  }

  let res
  try {
    res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
      signal: options.signal
    })
  } catch (e) {
    if (e.name === 'AbortError') throw e
    throw new Error(`网络请求失败: ${e.message}`)
  }

  if (!res.ok) {
    let errorMsg = `API 请求失败 (${res.status})`
    try {
      const body = await res.json()
      if (body.message) {
        errorMsg = body.message
      } else if (body.error) {
        errorMsg = body.error.message || body.error
      }
      // 处理常见错误码
      if (res.status === 401) {
        errorMsg = 'API Key 无效或已过期，请重新设置'
      } else if (res.status === 429) {
        errorMsg = 'API 调用频率超限，请稍后再试'
      } else if (res.status === 400) {
        errorMsg = `请求参数错误: ${errorMsg}`
      }
    } catch (parseError) {
      // JSON 解析失败，使用默认错误消息
    }
    throw new Error(errorMsg)
  }

  const data = await res.json()
  return data
}

async function submitAsyncTask(url, body, signal) {
  // 验证请求体
  if (!body || typeof body !== 'object') {
    throw new Error('请求参数无效')
  }
  if (!body.model) {
    throw new Error('缺少必要参数: model')
  }
  if (!body.input || typeof body.input !== 'object') {
    throw new Error('缺少必要参数: input')
  }

  const data = await request(url, {
    method: 'POST',
    headers: { 'X-DashScope-Async': 'enable' },
    body: JSON.stringify(body),
    signal
  })

  // 验证响应数据
  if (!data || typeof data !== 'object') {
    throw new Error('API 返回数据格式错误')
  }
  if (!data.output) {
    throw new Error('API 返回数据缺少 output 字段')
  }

  const taskId = data.output.task_id
  if (!taskId || typeof taskId !== 'string') {
    throw new Error('未获取到有效的任务 ID，请检查请求参数或联系技术支持')
  }

  return taskId
}

// ========== 任务轮询 ==========

export async function pollTaskStatus(taskId, { onProgress, signal } = {}) {
  if (!taskId || typeof taskId !== 'string') {
    throw new Error('无效的任务 ID')
  }

  const POLL_INTERVAL_MIN = 2000
  const POLL_INTERVAL_MAX = 5000
  const MAX_POLLS = 300 // 最长约10-25分钟

  for (let i = 0; i < MAX_POLLS; i++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

    const data = await request(`/api/v1/tasks/${taskId}`, { signal })

    // 验证响应数据
    if (!data || !data.output) {
      throw new Error('任务查询响应数据格式错误')
    }

    const status = data.output.task_status
    if (!status) {
      throw new Error('任务状态未知')
    }

    if (status === 'SUCCEEDED') {
      // 验证成功结果
      if (!data.output.results && !data.output.video_url) {
        throw new Error('任务成功但未返回结果数据')
      }
      return data.output
    }

    if (status === 'FAILED') {
      const errorMsg = data.output.message || data.output.code || '任务执行失败'
      throw new Error(`任务失败: ${errorMsg}`)
    }

    // 进度回调
    if (onProgress) {
      const metrics = data.output.task_metrics
      if (metrics && metrics.TOTAL > 0) {
        const pct = Math.round((metrics.SUCCEEDED / metrics.TOTAL) * 100)
        onProgress(Math.min(pct, 95))
      } else if (status === 'RUNNING') {
        onProgress(Math.min(10 + i * 3, 90))
      } else {
        onProgress(5)
      }
    }

    const interval = POLL_INTERVAL_MIN + Math.random() * (POLL_INTERVAL_MAX - POLL_INTERVAL_MIN)
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, interval)
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timer)
          reject(new DOMException('Aborted', 'AbortError'))
        }, { once: true })
      }
    })
  }

  throw new Error('任务超时（已等待超过10分钟），请检查 DashScope 控制台或稍后重试')
}

// ========== 4个生成函数 ==========

/**
 * 文生图
 */
export async function text2image({ prompt, negativePrompt, model, size, n, seed, steps }, { onProgress, signal } = {}) {
  // 参数验证
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    throw new Error('提示词不能为空')
  }

  model = model || 'wanx-v1'
  size = size || '1024*1024'
  n = n || 4

  // 验证分辨率格式
  if (!/^\d+\*\d+$/.test(size)) {
    throw new Error('分辨率格式不正确，应为 "宽*高" 格式（如 1024*1024）')
  }

  const body = {
    model,
    input: { prompt: prompt.trim() },
    parameters: { size, n }
  }

  if (negativePrompt && negativePrompt.trim()) {
    body.input.negative_prompt = negativePrompt.trim()
  }
  if (seed != null && seed >= 0) body.parameters.seed = seed
  if (steps && steps > 0) body.parameters.steps = steps

  const taskId = await submitAsyncTask('/api/v1/services/aigc/text2image/image-synthesis', body, signal)
  onProgress?.(5)
  const output = await pollTaskStatus(taskId, { onProgress, signal })

  // 验证并返回结果
  const results = output.results || []
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error('API 返回结果为空')
  }

  return results.map(r => ({
    type: 'image',
    url: r.url || r.b64_image,
    seed: seed
  }))
}

/**
 * 图生图
 */
export async function image2image({ prompt, negativePrompt, imageUrl, model, size, n, seed, steps }, { onProgress, signal } = {}) {
  // 参数验证
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
    throw new Error('参考图片不能为空')
  }

  model = model || 'wanx-v1'
  size = size || '1024*1024'
  n = n || 4

  // 验证分辨率格式
  if (!/^\d+\*\d+$/.test(size)) {
    throw new Error('分辨率格式不正确，应为 "宽*高" 格式（如 1024*1024）')
  }

  const normalizedImage = normalizeImageInput(imageUrl)
  if (!normalizedImage) {
    throw new Error('图片处理失败')
  }

  const body = {
    model,
    input: {
      prompt: (prompt && prompt.trim()) || '风格转换',
      ref_image: normalizedImage
    },
    parameters: { size, n }
  }

  if (negativePrompt && negativePrompt.trim()) {
    body.input.negative_prompt = negativePrompt.trim()
  }
  if (seed != null && seed >= 0) body.parameters.seed = seed
  if (steps && steps > 0) body.parameters.steps = steps

  const taskId = await submitAsyncTask('/api/v1/services/aigc/text2image/image-synthesis', body, signal)
  onProgress?.(5)
  const output = await pollTaskStatus(taskId, { onProgress, signal })

  // 验证并返回结果
  const results = output.results || []
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error('API 返回结果为空')
  }

  return results.map(r => ({
    type: 'image',
    url: r.url || r.b64_image,
    seed: seed
  }))
}

/**
 * 文生视频
 */
export async function text2video({ prompt, model, size }, { onProgress, signal } = {}) {
  // 参数验证
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    throw new Error('提示词不能为空')
  }

  model = model || 'wan2.1-t2v-turbo'
  size = size || '1280*720'

  // 验证分辨率格式
  if (!/^\d+\*\d+$/.test(size)) {
    throw new Error('分辨率格式不正确，应为 "宽*高" 格式（如 1280*720）')
  }

  const body = {
    model,
    input: { prompt: prompt.trim() },
    parameters: { size }
  }

  const taskId = await submitAsyncTask('/api/v1/services/aigc/video-generation/video-synthesis', body, signal)
  onProgress?.(5)
  const output = await pollTaskStatus(taskId, { onProgress, signal })

  const videoUrl = output.video_url
  if (videoUrl) {
    return [{ type: 'video', url: videoUrl }]
  }

  // 某些模型返回 results 数组
  const results = output.results || []
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error('API 返回结果为空')
  }

  return results.map(r => ({
    type: 'video',
    url: r.url || r.video_url
  }))
}

/**
 * 图生视频
 */
export async function image2video({ imageUrl, prompt, model, size }, { onProgress, signal } = {}) {
  // 参数验证
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
    throw new Error('输入图片不能为空')
  }

  model = model || 'wan2.1-i2v-turbo'
  size = size || '1280*720'

  // 验证分辨率格式
  if (!/^\d+\*\d+$/.test(size)) {
    throw new Error('分辨率格式不正确，应为 "宽*高" 格式（如 1280*720）')
  }

  const normalizedImage = normalizeImageInput(imageUrl)
  if (!normalizedImage) {
    throw new Error('图片处理失败')
  }

  const body = {
    model,
    input: { image_url: normalizedImage },
    parameters: { size }
  }

  if (prompt && prompt.trim()) {
    body.input.prompt = prompt.trim()
  }

  const taskId = await submitAsyncTask('/api/v1/services/aigc/video-generation/video-synthesis', body, signal)
  onProgress?.(5)
  const output = await pollTaskStatus(taskId, { onProgress, signal })

  const videoUrl = output.video_url
  if (videoUrl) {
    return [{ type: 'video', url: videoUrl }]
  }

  const results = output.results || []
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error('API 返回结果为空')
  }

  return results.map(r => ({
    type: 'video',
    url: r.url || r.video_url
  }))
}
