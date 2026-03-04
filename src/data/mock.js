// 模拟用户数据
export const users = [
  { id: 1, name: '创意星辰', avatar: '', bio: 'AI视频创作者 | ComfyUI深度用户', followers: 12800, following: 356, works: 89 },
  { id: 2, name: '像素工坊', avatar: '', bio: '专注AI短片创作，分享工作流', followers: 8900, following: 210, works: 56 },
  { id: 3, name: '灵感AI', avatar: '', bio: '每天一个AI视频教程', followers: 25600, following: 180, works: 134 },
  { id: 4, name: '数字梦境', avatar: '', bio: 'Stable Diffusion + AnimateDiff', followers: 6700, following: 420, works: 42 },
  { id: 5, name: '光影实验室', avatar: '', bio: 'AI电影短片制作人', followers: 15300, following: 290, works: 67 },
  { id: 6, name: '未来视觉', avatar: '', bio: 'Sora & Runway 创作者', followers: 31200, following: 150, works: 98 },
]

// 模拟视频数据
export const videos = [
  {
    id: 1,
    title: '赛博朋克城市漫步 - AI生成4K视频',
    cover: '',
    coverColor: '#1a1a3e',
    author: users[0],
    likes: 2340,
    forks: 186,
    views: 45600,
    tags: ['赛博朋克', 'AI视频', '4K'],
    category: '文生视频',
    createdAt: '2024-03-01',
    description: '使用Stable Video Diffusion生成的赛博朋克风格城市漫步视频，搭配原创BGM。完整工作流已开源，欢迎Fork和改进。',
    prompt: 'cyberpunk city street at night, neon lights, rain reflections, cinematic camera movement, 4K, ultra detailed, volumetric lighting',
    model: 'Stable Video Diffusion 1.1',
    params: { steps: 30, cfg_scale: 7.5, motion_bucket_id: 127, fps: 24, frames: 96 }
  },
  {
    id: 2,
    title: '水墨山水动画 - 中国风AI艺术',
    cover: '',
    coverColor: '#2d4a3e',
    author: users[1],
    likes: 1890,
    forks: 234,
    views: 38200,
    tags: ['中国风', '水墨', '动画'],
    category: '风格转换',
    createdAt: '2024-02-28',
    description: '将实景山水转换为水墨画风格的动画视频，使用自定义LoRA模型实现。',
    prompt: 'chinese ink painting style, mountains and rivers, flowing water, misty atmosphere, traditional art',
    model: 'AnimateDiff v3',
    params: { steps: 25, cfg_scale: 8, motion_module: 'mm_sd_v15_v2', fps: 16, frames: 64 }
  },
  {
    id: 3,
    title: '产品展示动画 - 电商AI视频',
    cover: '',
    coverColor: '#4a2d3e',
    author: users[2],
    likes: 3120,
    forks: 567,
    views: 72400,
    tags: ['电商', '产品展示', '商业'],
    category: '电商广告',
    createdAt: '2024-02-25',
    description: '零成本AI生成产品展示视频，适合电商商家。一键生成高质量产品宣传片。',
    prompt: 'product showcase animation, rotating view, studio lighting, white background, professional commercial',
    model: 'Runway Gen-2',
    params: { duration: 4, interpolate: true, style: 'commercial', resolution: '1080p' }
  },
  {
    id: 4,
    title: '星际探索 - 太空主题AI短片',
    cover: '',
    coverColor: '#0d1b3e',
    author: users[3],
    likes: 4560,
    forks: 312,
    views: 89100,
    tags: ['太空', '科幻', 'AI短片'],
    category: '文生视频',
    createdAt: '2024-02-22',
    description: '一部完全由AI生成的太空探索短片，包含宇宙飞船、星球表面等场景。',
    prompt: 'deep space exploration, spacecraft flying through nebula, cinematic, epic scale, sci-fi movie quality',
    model: 'Sora',
    params: { duration: 10, resolution: '1080p', style: 'cinematic', aspect_ratio: '16:9' }
  },
  {
    id: 5,
    title: '美食制作过程 - AI美食短视频',
    cover: '',
    coverColor: '#3e2d1a',
    author: users[4],
    likes: 1670,
    forks: 145,
    views: 31500,
    tags: ['美食', '教程', '短视频'],
    category: '图生视频',
    createdAt: '2024-02-20',
    description: '从一张美食图片生成完整的烹饪过程视频，适合美食博主使用。',
    prompt: 'cooking process, food preparation, close-up shots, warm lighting, appetizing presentation',
    model: 'Stable Video Diffusion',
    params: { steps: 20, cfg_scale: 6, image_strength: 0.7, fps: 24, frames: 48 }
  },
  {
    id: 6,
    title: '古风人物动画 - AI角色生成',
    cover: '',
    coverColor: '#3e1a2d',
    author: users[5],
    likes: 5230,
    forks: 423,
    views: 96700,
    tags: ['古风', '角色', '动画'],
    category: '风格转换',
    createdAt: '2024-02-18',
    description: '使用AI生成古风风格的角色动画，可用于短剧、MV等场景。',
    prompt: 'ancient chinese character animation, flowing robes, elegant movement, traditional aesthetics',
    model: 'AnimateDiff + ControlNet',
    params: { steps: 28, cfg_scale: 7, controlnet_weight: 0.8, fps: 24, frames: 72 }
  },
  {
    id: 7,
    title: '城市延时摄影 - AI增强版',
    cover: '',
    coverColor: '#1a3e4a',
    author: users[0],
    likes: 890,
    forks: 67,
    views: 15800,
    tags: ['延时', '城市', '增强'],
    category: '图生视频',
    createdAt: '2024-02-15',
    description: 'AI增强的城市延时摄影效果，将普通照片转换为流畅的延时视频。',
    prompt: 'city timelapse, day to night transition, traffic light trails, urban landscape',
    model: 'Runway Gen-2',
    params: { duration: 6, motion: 'auto', upscale: true, resolution: '4K' }
  },
  {
    id: 8,
    title: '自然风光 - AI生成纪录片片段',
    cover: '',
    coverColor: '#1a3e1a',
    author: users[1],
    likes: 2100,
    forks: 198,
    views: 42300,
    tags: ['自然', '纪录片', '风光'],
    category: '文生视频',
    createdAt: '2024-02-12',
    description: '纪录片级别的自然风光AI视频，可用于素材库和短视频创作。',
    prompt: 'nature documentary, aerial view of mountains, golden hour, pristine wilderness, BBC quality',
    model: 'Sora',
    params: { duration: 8, resolution: '4K', style: 'documentary', camera: 'aerial' }
  },
  {
    id: 9,
    title: 'MV视觉特效 - AI音乐视频',
    cover: '',
    coverColor: '#3e1a4a',
    author: users[2],
    likes: 3450,
    forks: 289,
    views: 67800,
    tags: ['MV', '视觉特效', '音乐'],
    category: 'MV',
    createdAt: '2024-02-10',
    description: 'AI生成的MV视觉特效，搭配音乐节拍自动生成视觉效果。',
    prompt: 'music video visual effects, abstract patterns, synchronized to beat, vibrant colors, psychedelic',
    model: 'Deforum + AnimateDiff',
    params: { steps: 20, cfg_scale: 9, beat_sync: true, fps: 30, frames: 120 }
  },
]

// 模拟工作流数据
export const workflows = [
  {
    id: 1,
    name: '文生视频基础工作流',
    description: '从文字描述生成高质量视频的完整工作流',
    nodes: 8,
    uses: 12400,
    forks: 3200,
    author: users[0],
    tags: ['入门', '文生视频'],
    nodesPreview: ['文本输入', 'CLIP编码', '采样器', 'VAE解码', '视频合成', '后处理', '音频混合', '输出']
  },
  {
    id: 2,
    name: '图生视频高级流程',
    description: '将静态图片转换为动态视频，支持多种运动模式',
    nodes: 12,
    uses: 8900,
    forks: 2100,
    author: users[1],
    tags: ['进阶', '图生视频'],
    nodesPreview: ['图片加载', '图片预处理', 'ControlNet', 'IP-Adapter', '运动模块', 'AnimateDiff', '帧插值', '超分辨率', '色彩校正', '视频编码', '水印', '输出']
  },
  {
    id: 3,
    name: '电商产品展示模板',
    description: '一键生成电商产品展示视频，支持360度旋转',
    nodes: 6,
    uses: 15600,
    forks: 4500,
    author: users[2],
    tags: ['电商', '模板'],
    nodesPreview: ['产品图输入', '背景移除', '3D旋转', '光影渲染', '品牌水印', '输出']
  },
  {
    id: 4,
    name: '风格迁移工作流',
    description: '将视频转换为不同艺术风格：水墨、油画、漫画等',
    nodes: 10,
    uses: 7200,
    forks: 1800,
    author: users[3],
    tags: ['风格迁移', '艺术'],
    nodesPreview: ['视频输入', '帧提取', '风格参考', 'LoRA加载', '风格迁移', '一致性检测', '帧融合', '时序平滑', '视频合成', '输出']
  },
  {
    id: 5,
    name: 'AI短剧制作流程',
    description: '从剧本到成片的完整AI短剧制作工作流',
    nodes: 15,
    uses: 5400,
    forks: 1200,
    author: users[4],
    tags: ['短剧', '完整流程'],
    nodesPreview: ['剧本输入', '分镜生成', '角色设计', '场景生成', '动作捕捉', '表情合成', 'AnimateDiff', '镜头切换', '特效合成', '配音', 'BGM', '字幕', '色彩分级', '最终合成', '输出']
  },
  {
    id: 6,
    name: 'MV快速生成器',
    description: '上传音乐自动生成配套MV视觉效果',
    nodes: 9,
    uses: 6800,
    forks: 1600,
    author: users[5],
    tags: ['MV', '音乐'],
    nodesPreview: ['音频输入', '节拍检测', '歌词提取', '视觉提示', '风格选择', 'AI生成', '节拍同步', '转场效果', '输出']
  },
]

// 模拟模板数据
export const templates = [
  { id: 1, name: '电商产品展示', category: '电商广告', description: '高端产品360度展示视频模板', uses: 23400, cover: '', coverColor: '#2d3a4a' },
  { id: 2, name: '短剧预告片', category: '短剧', description: '悬疑/爱情短剧预告片模板', uses: 12300, cover: '', coverColor: '#4a2d3a' },
  { id: 3, name: '二次元角色动画', category: '动画', description: '动漫风格角色动态生成', uses: 18900, cover: '', coverColor: '#3a4a2d' },
  { id: 4, name: '音乐可视化MV', category: 'MV', description: '自动跟随节拍的视觉效果', uses: 9800, cover: '', coverColor: '#3a2d4a' },
  { id: 5, name: 'AI教学演示', category: '教育', description: '知识点可视化教学视频', uses: 7600, cover: '', coverColor: '#2d4a3a' },
  { id: 6, name: '品牌Logo动画', category: '电商广告', description: 'Logo reveal动画效果', uses: 15200, cover: '', coverColor: '#4a3a2d' },
  { id: 7, name: '古风短剧模板', category: '短剧', description: '中国古风场景与角色', uses: 11400, cover: '', coverColor: '#3e1a2d' },
  { id: 8, name: '3D产品动画', category: '电商广告', description: '产品3D旋转展示动画', uses: 19800, cover: '', coverColor: '#1a3e4a' },
  { id: 9, name: '儿童动画故事', category: '动画', description: '卡通风格儿童故事动画', uses: 8700, cover: '', coverColor: '#4a4a1a' },
  { id: 10, name: '歌曲MV生成', category: 'MV', description: '输入歌曲自动生成MV', uses: 14500, cover: '', coverColor: '#1a2d4a' },
  { id: 11, name: '在线课程片头', category: '教育', description: '专业课程片头动画', uses: 6300, cover: '', coverColor: '#2d1a4a' },
  { id: 12, name: '直播带货视频', category: '电商广告', description: '产品介绍+效果展示', uses: 21000, cover: '', coverColor: '#4a2d1a' },
]

// 模拟评论数据
export const comments = [
  { id: 1, user: users[1], content: '太棒了！工作流分享得很详细，已经成功Fork并跑通了。', time: '2小时前', likes: 23 },
  { id: 2, user: users[2], content: '请问这个工作流对显存要求是多少？我8G显存的卡能跑吗？', time: '5小时前', likes: 8 },
  { id: 3, user: users[3], content: '分享一个小技巧：把cfg_scale调到6.5效果会更自然一些。', time: '1天前', likes: 45 },
  { id: 4, user: users[4], content: '已Fork，在原基础上加了超分辨率节点，效果更好了！', time: '2天前', likes: 31 },
  { id: 5, user: users[5], content: '能不能出一个详细的教程视频？新手看参数有点懵。', time: '3天前', likes: 17 },
]

// 分类数据
export const categories = [
  { id: 1, name: '文生视频', icon: 'Type', description: '从文字描述生成视频', count: 1240, color: '#5961f9' },
  { id: 2, name: '图生视频', icon: 'Image', description: '将图片转换为动态视频', count: 890, color: '#ee9ae5' },
  { id: 3, name: '风格转换', icon: 'Palette', description: '视频风格迁移与转换', count: 670, color: '#10b981' },
  { id: 4, name: '电商广告', icon: 'ShoppingBag', description: '电商产品展示视频', count: 1560, color: '#f59e0b' },
  { id: 5, name: '短剧创作', icon: 'Film', description: 'AI辅助短剧制作', count: 430, color: '#ef4444' },
  { id: 6, name: 'MV制作', icon: 'Music', description: '音乐视频自动生成', count: 380, color: '#8b5cf6' },
]

// 统计数据
export const stats = [
  { label: '创作者', value: '378,000+', icon: 'Users' },
  { label: '开源模板', value: '2,800+', icon: 'Layout' },
  { label: '日活用户', value: '42,000+', icon: 'Activity' },
  { label: '累计Fork', value: '156,000+', icon: 'GitFork' },
]
