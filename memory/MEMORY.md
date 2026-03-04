# 先筹AI - 项目记忆库

这是先筹AI（恰恰热AI）项目的开发记忆库，记录每日的开发进展、解决的问题和重要决策。

## 项目概述

**项目名称：** 先筹AI（恰恰热AI）
**技术栈：** Vue 3 + Vite + Pinia + Vue Router
**核心功能：** AI 创作平台，接入阿里云 DashScope API
**仓库地址：** https://github.com/tangsan0706-X/-AI-
**开发端口：** http://localhost:3000

---

## 核心功能模块

### 1. AI 创作工作台 (`/create`)
- 文生图 (Text-to-Image)
- 图生图 (Image-to-Image)
- 文生视频 (Text-to-Video)
- 图生视频 (Image-to-Video)
- 风格转换

### 2. 画布编辑器 (`/canvas`)
- 可视化节点编辑器
- 支持 10 种节点类型
- 拓扑排序自动执行
- 节点管道流程编排
- 预设示例工作流

### 3. API 集成
- 完整的 DashScope API 封装
- 支持多种 AI 模型（wanx-v1, flux-schnell, flux-dev, SD3.5, SDXL, wan2.1 等）
- 严格的参数验证和错误处理
- 异步任务轮询机制

---

## 项目结构

```
xianchou/
├── src/
│   ├── components/      # 组件库
│   │   ├── Canvas/     # 画布编辑器组件
│   │   ├── Common/     # 通用组件
│   │   ├── Create/     # 创作页组件
│   │   └── Layout/     # 布局组件
│   ├── pages/          # 页面组件
│   ├── stores/         # Pinia 状态管理
│   ├── services/       # API 服务层
│   │   └── dashscope.js  # DashScope API 封装
│   ├── router/         # 路由配置
│   ├── styles/         # 全局样式
│   └── utils/          # 工具函数
├── memory/             # 项目记忆库（每日开发记录）
└── public/             # 静态资源
```

---

## 关键文件说明

| 文件路径 | 用途 |
|---------|------|
| `src/services/dashscope.js` | DashScope API 封装层 |
| `src/stores/create.js` | 创作页状态管理 |
| `src/stores/canvas.js` | 画布节点管道 |
| `src/components/Common/ApiKeyModal.vue` | API Key 设置弹窗 |
| `src/data/nodeRegistry.js` | 节点类型定义 |
| `vite.config.js` | Vite 配置和代理设置 |

---

## 开发环境配置

### 必需软件
- Node.js >= 16
- npm 或 yarn
- Git

### DashScope API Key
- 获取地址：https://dashscope.console.aliyun.com/apiKey
- 存储位置：localStorage (`dashscope_api_key`)
- 格式要求：必须以 `sk-` 开头

### Vite 代理配置
```javascript
proxy: {
  '/api/dashscope': {
    target: 'https://dashscope.aliyuncs.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/dashscope/, '')
  }
}
```

---

## 重要技术决策

### API 调用方式
- ✅ **完全真实 API 调用**，无任何模拟
- ✅ 异步任务提交 + 轮询获取结果
- ✅ 支持任务取消（AbortController）
- ✅ 自动保存执行结果到 localStorage

### 数据流设计
- 创作页：直接调用 DashScope API
- 画布页：节点管道自动执行，结果自动保存
- 状态管理：Pinia 响应式状态

### 用户体验优化
- API Key 可随时修改（导航栏钥匙图标）
- 弹窗可关闭，验证失败时抖动提示
- 节点配置面板显示执行结果和下载按钮
- 首次访问画布显示工作流指南

---

## 已知问题和解决方案

### 1. DNS 劫持问题
**现象：** `dashscope.aliyuncs.com` 被解析到 `198.18.0.125`
**原因：** 本地 DNS 被劫持
**解决：** 参考 `DNS修复指南.txt`，更换为公共 DNS（如 223.5.5.5）

### 2. 加速器导致 API 500 错误
**现象：** 使用加速器规则模式时，API 请求返回 500 错误
**原因：** 加速器将阿里云 API 请求代理到国外服务器
**解决：** 参考 `加速器配置指南.txt`，添加直连规则

### 3. 输出节点数据显示问题
**现象：** 输出节点执行成功但没有下载按钮
**原因：** 数据存储在 `node.output.media` 字段，显示逻辑未正确匹配
**解决：** 增强 `getOutputData()` 函数，支持多种数据结构

---

## Git 配置

```bash
用户名: tangsan0706-X
邮箱: tangsan0706-X@users.noreply.github.com
仓库: https://github.com/tangsan0706-X/-AI-.git
分支: main
```

### 提交规范（Conventional Commits）
- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `refactor:` - 重构
- `perf:` - 性能优化
- `chore:` - 构建/工具链更新

---

## 快速命令

```bash
# 开发运行
npm run dev

# 构建生产版本
npm run build

# Git 快速提交（使用 git-push.bat）
双击 git-push.bat

# 清除 DNS 缓存
ipconfig /flushdns

# 检查 DNS 解析
nslookup dashscope.aliyuncs.com
```

---

## 每日开发记录

详细的每日开发记录请查看 `memory/` 目录下的日期文件：

- [2026-03-04 项目初始化和核心功能开发](./2026-03-04.md)

---

## 参考资料

- [DashScope API 官方文档](https://help.aliyun.com/zh/dashscope/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [项目 GitHub 仓库](https://github.com/tangsan0706-X/-AI-)

---

**最后更新：** 2026-03-04
**维护者：** Claude Opus 4.6 & tangsan0706-X
