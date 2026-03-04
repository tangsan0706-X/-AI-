/**
 * 节点类型注册表 — 10种节点类型
 */
export const nodeTypes = [
  {
    type: 'text-input',
    label: '文本输入',
    category: '输入',
    color: '#5961f9',
    icon: 'Type',
    inputs: [],
    outputs: [{ id: 'text', label: '文本', type: 'string' }],
    defaultConfig: { text: '' }
  },
  {
    type: 'image-upload',
    label: '图片上传',
    category: '输入',
    color: '#10b981',
    icon: 'Image',
    inputs: [],
    outputs: [{ id: 'image', label: '图片', type: 'image' }],
    defaultConfig: { imageUrl: '' }
  },
  {
    type: 'ai-text2img',
    label: 'AI文生图',
    category: 'AI生成',
    color: '#ee9ae5',
    icon: 'Wand2',
    inputs: [{ id: 'prompt', label: '提示词', type: 'string' }],
    outputs: [{ id: 'image', label: '图片', type: 'image' }],
    defaultConfig: { model: 'wanx-v1', steps: 30, cfgScale: 7.5, size: '1024*1024', seed: -1 }
  },
  {
    type: 'ai-img2img',
    label: 'AI图生图',
    category: 'AI生成',
    color: '#f59e0b',
    icon: 'ImagePlus',
    inputs: [
      { id: 'image', label: '图片', type: 'image' },
      { id: 'prompt', label: '提示词', type: 'string' }
    ],
    outputs: [{ id: 'image', label: '图片', type: 'image' }],
    defaultConfig: { model: 'wanx-v1', steps: 25, cfgScale: 7, size: '1024*1024', strength: 0.75 }
  },
  {
    type: 'ai-text2video',
    label: 'AI文生视频',
    category: 'AI生成',
    color: '#8b5cf6',
    icon: 'Video',
    inputs: [{ id: 'prompt', label: '提示词', type: 'string' }],
    outputs: [{ id: 'video', label: '视频', type: 'video' }],
    defaultConfig: { model: 'wan2.1-t2v-turbo', size: '1280*720', frames: 24, fps: 8 }
  },
  {
    type: 'ai-img2video',
    label: 'AI图生视频',
    category: 'AI生成',
    color: '#ef4444',
    icon: 'Clapperboard',
    inputs: [{ id: 'image', label: '图片', type: 'image' }],
    outputs: [{ id: 'video', label: '视频', type: 'video' }],
    defaultConfig: { model: 'wan2.1-i2v-turbo', size: '1280*720', fps: 8, frames: 24 }
  },
  {
    type: 'video-clip',
    label: '视频剪辑',
    category: '处理',
    color: '#06b6d4',
    icon: 'Scissors',
    inputs: [{ id: 'video', label: '视频', type: 'video' }],
    outputs: [{ id: 'video', label: '视频', type: 'video' }],
    defaultConfig: { startTime: 0, endTime: 10, speed: 1 }
  },
  {
    type: 'image-process',
    label: '图片处理',
    category: '处理',
    color: '#14b8a6',
    icon: 'SlidersHorizontal',
    inputs: [{ id: 'image', label: '图片', type: 'image' }],
    outputs: [{ id: 'image', label: '图片', type: 'image' }],
    defaultConfig: { brightness: 1, contrast: 1, saturation: 1, blur: 0 }
  },
  {
    type: 'video-compose',
    label: '视频合成',
    category: '处理',
    color: '#6366f1',
    icon: 'Layers',
    inputs: [
      { id: 'video1', label: '视频1', type: 'video' },
      { id: 'video2', label: '视频2', type: 'video' }
    ],
    outputs: [{ id: 'video', label: '视频', type: 'video' }],
    defaultConfig: { mode: 'concat', transition: 'fade', transitionDuration: 0.5 }
  },
  {
    type: 'output',
    label: '输出',
    category: '输出',
    color: '#84cc16',
    icon: 'Download',
    inputs: [
      { id: 'media', label: '媒体', type: 'any' }
    ],
    outputs: [],
    defaultConfig: { format: 'mp4', quality: 'high', filename: 'output' }
  }
]

export const nodeCategories = ['输入', 'AI生成', '处理', '输出']

export function getNodeType(type) {
  return nodeTypes.find(n => n.type === type)
}
