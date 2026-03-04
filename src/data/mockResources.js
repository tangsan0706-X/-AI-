/**
 * 资源库 mock 数据
 */
export const models = [
  { id: 1, name: 'Stable Diffusion 1.5', type: 'model', category: '基础模型', size: '4.2 GB', downloads: 156000, description: '最经典的文生图模型', color: '#5961f9' },
  { id: 2, name: 'Stable Diffusion XL', type: 'model', category: '基础模型', size: '6.9 GB', downloads: 98000, description: '高分辨率文生图模型', color: '#8b5cf6' },
  { id: 3, name: 'AnimateDiff v3', type: 'model', category: '动画模型', size: '1.8 GB', downloads: 67000, description: '图片生成动画的运动模块', color: '#ee9ae5' },
  { id: 4, name: 'Stable Video Diffusion', type: 'model', category: '视频模型', size: '5.1 GB', downloads: 82000, description: '图生视频扩散模型', color: '#ef4444' },
  { id: 5, name: 'ControlNet Canny', type: 'model', category: '控制模型', size: '1.4 GB', downloads: 112000, description: '边缘检测控制网络', color: '#10b981' },
  { id: 6, name: 'IP-Adapter Plus', type: 'model', category: '控制模型', size: '0.9 GB', downloads: 54000, description: '图像提示适配器', color: '#f59e0b' },
  { id: 7, name: 'RealESRGAN x4', type: 'model', category: '后处理', size: '0.3 GB', downloads: 89000, description: '4倍超分辨率模型', color: '#06b6d4' },
  { id: 8, name: '水墨风格 LoRA', type: 'model', category: 'LoRA', size: '0.2 GB', downloads: 34000, description: '中国水墨画风格', color: '#14b8a6' },
]

export const images = [
  { id: 1, name: '赛博朋克城市', type: 'image', category: '参考图', resolution: '1920x1080', format: 'PNG', color: '#1a1a3e' },
  { id: 2, name: '水墨山水', type: 'image', category: '参考图', resolution: '2048x1024', format: 'PNG', color: '#2d4a3e' },
  { id: 3, name: '人物肖像', type: 'image', category: '参考图', resolution: '1024x1024', format: 'JPG', color: '#4a2d3e' },
  { id: 4, name: '产品白底图', type: 'image', category: '素材', resolution: '2000x2000', format: 'PNG', color: '#f5f5f7' },
  { id: 5, name: '太空背景', type: 'image', category: '背景', resolution: '3840x2160', format: 'JPG', color: '#0d1b3e' },
  { id: 6, name: '古风场景', type: 'image', category: '背景', resolution: '1920x1080', format: 'PNG', color: '#3e1a2d' },
]

export const sounds = [
  { id: 1, name: '科幻环境音', type: 'audio', category: '音效', duration: '0:30', format: 'WAV', color: '#5961f9' },
  { id: 2, name: '水流声', type: 'audio', category: '音效', duration: '1:00', format: 'WAV', color: '#10b981' },
  { id: 3, name: '城市喧嚣', type: 'audio', category: '音效', duration: '0:45', format: 'MP3', color: '#f59e0b' },
  { id: 4, name: '按键音效包', type: 'audio', category: '音效', duration: '合集', format: 'WAV', color: '#ef4444' },
]

export const music = [
  { id: 1, name: '电子氛围曲', type: 'music', category: '配乐', duration: '3:20', format: 'MP3', color: '#8b5cf6' },
  { id: 2, name: '古风轻音乐', type: 'music', category: '配乐', duration: '4:15', format: 'MP3', color: '#ee9ae5' },
  { id: 3, name: '商业广告BGM', type: 'music', category: '配乐', duration: '2:00', format: 'MP3', color: '#06b6d4' },
  { id: 4, name: '纪录片配乐', type: 'music', category: '配乐', duration: '5:30', format: 'MP3', color: '#14b8a6' },
]

export const resourceCategories = [
  { key: 'models', label: '模型', count: models.length },
  { key: 'images', label: '图片素材', count: images.length },
  { key: 'sounds', label: '音效', count: sounds.length },
  { key: 'music', label: '配乐', count: music.length },
]
