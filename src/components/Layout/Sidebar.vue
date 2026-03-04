<template>
  <aside :class="['sidebar', { open: isOpen }]">
    <div class="sidebar-overlay" @click="$emit('close')" />
    <div class="sidebar-content">
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="['sidebar-link', { active: $route.path === item.path }]"
          @click="$emit('close')"
        >
          <component :is="item.icon" :size="20" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-section">
        <div class="sidebar-section-title">创作工具</div>
        <nav class="sidebar-nav">
          <router-link
            v-for="item in createItems"
            :key="item.path"
            :to="item.path"
            :class="['sidebar-link', { active: $route.path === item.path }]"
            @click="$emit('close')"
          >
            <component :is="item.icon" :size="20" />
            <span>{{ item.label }}</span>
          </router-link>
        </nav>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">热门标签</div>
        <div class="sidebar-tags">
          <span class="tag" v-for="tag in hotTags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="sidebar-footer">
        <p>恰恰热 &copy; 2024</p>
        <p>AI视频开源社区</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {
  Home, Compass, Flame, Workflow, LayoutGrid, TrendingUp,
  PenTool, Sparkles, Send, FolderOpen, MessageSquare
} from 'lucide-vue-next'

defineProps({ isOpen: Boolean })
defineEmits(['close'])

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/discover', label: '发现', icon: Compass },
  { path: '/trending', label: '热门', icon: Flame },
  { path: '/workflow', label: '工作流', icon: Workflow },
  { path: '/templates', label: '模板库', icon: LayoutGrid },
  { path: '/trending', label: '排行榜', icon: TrendingUp },
]

const createItems = [
  { path: '/canvas', label: '画布编辑器', icon: PenTool },
  { path: '/create', label: 'AI创作台', icon: Sparkles },
  { path: '/publish', label: '发布作品', icon: Send },
  { path: '/resources', label: '资源库', icon: FolderOpen },
  { path: '/messages', label: '消息中心', icon: MessageSquare },
]

const hotTags = ['Sora', 'ComfyUI', 'AnimateDiff', 'ControlNet', 'Runway', 'Stable Diffusion', 'LoRA', 'IP-Adapter']
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  z-index: 90;
}

.sidebar-overlay {
  display: none;
}

.sidebar-content {
  height: 100%;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  padding: 16px 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.sidebar-link:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.sidebar-link.active {
  color: var(--accent);
  background: var(--accent-light);
  font-weight: 500;
}

.sidebar-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.sidebar-section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 14px;
  margin-bottom: 10px;
}

.sidebar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 10px;
}

.tag {
  padding: 3px 10px;
  font-size: 12px;
  background: var(--bg-hover);
  color: var(--text-secondary);
  border-radius: 20px;
  cursor: pointer;
  transition: all var(--transition);
}

.tag:hover {
  background: var(--accent-light);
  color: var(--accent);
}

.sidebar-footer {
  margin-top: auto;
  padding: 16px 14px 0;
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-tertiary);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .sidebar {
    z-index: 95;
    width: 100%;
    pointer-events: none;
  }
  .sidebar.open {
    pointer-events: auto;
  }
  .sidebar-overlay {
    display: block;
    position: absolute;
    inset: 0;
    background: var(--bg-modal-overlay);
    opacity: 0;
    transition: opacity var(--transition);
  }
  .sidebar.open .sidebar-overlay {
    opacity: 1;
  }
  .sidebar-content {
    width: var(--sidebar-width);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.open .sidebar-content {
    transform: translateX(0);
  }
}
</style>
