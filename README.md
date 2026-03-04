# 先筹 AI - AI 创作平台

完整的 AI 内容生成平台，基于 Vue 3 + Vite + Pinia 构建，接入阿里云 DashScope 真实 API。

## ✨ 核心功能

- 🎨 **AI 创作工作台** (`/create`)
  - 文生图 (Text-to-Image)
  - 图生图 (Image-to-Image)
  - 文生视频 (Text-to-Video)
  - 图生视频 (Image-to-Video)
  - 风格转换

- 📐 **画布编辑器** (`/canvas`)
  - 可视化节点编辑器
  - 支持 10 种节点类型
  - 拓扑排序自动执行
  - 节点管道流程编排

- 🔑 **API Key 管理**
  - 安全的本地存储
  - 完善的验证机制
  - 用户友好的设置流程

## 🚀 快速开始

### 前置要求

- Node.js >= 16
- npm 或 yarn
- 阿里云 DashScope API Key ([获取链接](https://dashscope.console.aliyun.com/apiKey))

### 安装依赖

```bash
npm install
```

### 开发运行

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **图标**: Lucide Vue
- **样式**: CSS Variables + 响应式设计

## 📦 项目结构

```
xianchou/
├── src/
│   ├── components/      # 组件库
│   │   ├── Canvas/     # 画布编辑器组件
│   │   ├── Common/     # 通用组件
│   │   ├── Create/     # 创作页组件
│   │   └── ...
│   ├── pages/          # 页面组件
│   ├── stores/         # Pinia 状态管理
│   ├── services/       # API 服务层
│   │   └── dashscope.js  # DashScope API 封装
│   ├── router/         # 路由配置
│   ├── styles/         # 全局样式
│   └── utils/          # 工具函数
├── public/             # 静态资源
└── vite.config.js      # Vite 配置
```

## 🔌 DashScope API 集成

项目完全接入阿里云 DashScope API，支持以下模型：

### 文生图模型
- `wanx-v1` - 通义万相
- `flux-schnell` - Flux Schnell (快速)
- `flux-dev` - Flux Dev (高质量)
- `stable-diffusion-3.5-large` - SD 3.5 Large
- `stable-diffusion-xl` - SDXL

### 图生图模型
- `wanx-v1` - 通义万相

### 文生视频模型
- `wan2.1-t2v-turbo` - Wan2.1 Turbo (快速)
- `wan2.1-t2v-plus` - Wan2.1 Plus (高质量)

### 图生视频模型
- `wan2.1-i2v-turbo` - Wan2.1 I2V Turbo (快速)
- `wan2.1-i2v-plus` - Wan2.1 I2V Plus (高质量)

## 🎯 API 服务特性

- ✅ 完整的 DashScope API 封装
- ✅ 严格的参数验证和响应验证
- ✅ 详细的错误处理和提示
- ✅ 支持异步任务轮询
- ✅ 网络异常处理
- ✅ 支持任务取消 (AbortController)

## 💡 使用说明

### 首次使用

1. 访问创作页面 `/create`
2. 点击生成按钮时会提示设置 API Key
3. 输入您的 DashScope API Key（格式：`sk-...`）
4. 开始创作！

### API Key 管理

- API Key 存储在浏览器的 localStorage 中
- 可以随时在设置中修改
- 格式验证：必须以 `sk-` 开头

### 画布编辑器使用

1. 访问画布页面 `/canvas`
2. 从节点面板拖拽节点到画布
3. 连接节点的输入/输出端口
4. 点击运行按钮执行管道
5. 查看执行结果

## 🔒 隐私安全

- API Key 仅存储在本地浏览器
- 不会上传到任何服务器
- 所有 API 调用通过 Vite 代理转发到 DashScope

## 📝 开发计划

- [ ] 支持更多 AI 模型
- [ ] 增加作品分享功能
- [ ] 优化画布编辑器性能
- [ ] 添加批量生成功能
- [ ] 支持自定义模型参数预设

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**由 Claude Opus 4.6 协助开发** 🤖
