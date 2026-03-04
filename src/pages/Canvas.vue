<template>
  <div class="canvas-page">
    <!-- Top toolbar -->
    <CanvasToolbar
      :zoom="store.viewport.zoom"
      :isRunning="store.isRunning"
      :name="store.canvasName"
      @togglePalette="paletteOpen = !paletteOpen"
      @run="store.runPipeline()"
      @save="handleSave"
      @loadExample="handleLoadExample"
      @zoomIn="zoomIn"
      @zoomOut="zoomOut"
      @zoomReset="zoomReset"
      @clear="handleClear"
      @rename="store.canvasName = $event"
    />

    <!-- Main canvas area -->
    <div class="canvas-body">
      <NodePalette
        :isOpen="paletteOpen"
        @close="paletteOpen = false"
        @addNode="handleAddNode"
      />

      <CanvasView />

      <NodeConfigPanel
        :node="store.selectedNode"
        @close="store.clearSelection()"
        @delete="handleDeleteNode"
        @updateConfig="handleUpdateConfig"
      />

      <CanvasMinimap
        :nodes="store.nodes"
        :edges="store.edges"
        :viewport="store.viewport"
      />
    </div>

    <!-- Back to home -->
    <router-link to="/" class="back-btn">
      <ArrowLeft :size="18" />
      返回
    </router-link>

    <ApiKeyModal
      :visible="showApiKeyModal"
      @close="showApiKeyModal = false"
      @saved="showApiKeyModal = false"
    />

    <WorkflowGuide
      :visible="showWorkflowGuide"
      @close="showWorkflowGuide = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import CanvasToolbar from '../components/Canvas/CanvasToolbar.vue'
import CanvasView from '../components/Canvas/CanvasView.vue'
import NodePalette from '../components/Canvas/NodePalette.vue'
import NodeConfigPanel from '../components/Canvas/NodeConfigPanel.vue'
import CanvasMinimap from '../components/Canvas/CanvasMinimap.vue'
import ApiKeyModal from '../components/Common/ApiKeyModal.vue'
import WorkflowGuide from '../components/Canvas/WorkflowGuide.vue'
import { useCanvasStore } from '../stores/canvas'
import { getNodeType } from '../data/nodeRegistry'
import { getItem, setItem } from '../utils/localStorage'

const route = useRoute()
const store = useCanvasStore()
const paletteOpen = ref(false)
const showApiKeyModal = ref(false)
const showWorkflowGuide = ref(false)

onMounted(() => {
  const id = route.params.id
  if (id) {
    store.loadFromLocal(id)
  } else {
    store.loadFromLocal()
  }

  // 首次访问画布时显示工作流指南
  const hasSeenGuide = getItem('canvas_guide_seen')
  if (!hasSeenGuide) {
    setTimeout(() => {
      showWorkflowGuide.value = true
      setItem('canvas_guide_seen', true)
    }, 800)
  }
})

function handleAddNode(nodeTypeDef) {
  const cx = (-store.viewport.x + 400) / store.viewport.zoom
  const cy = (-store.viewport.y + 300) / store.viewport.zoom
  store.addNode(nodeTypeDef.type, cx + Math.random() * 100, cy + Math.random() * 100, {
    label: nodeTypeDef.label,
    ...nodeTypeDef.defaultConfig
  })
}

function handleDeleteNode(nodeId) {
  store.removeNode(nodeId)
}

function handleUpdateConfig({ nodeId, config }) {
  store.updateNodeConfig(nodeId, config)
}

function handleSave() {
  const id = route.params.id || undefined
  store.saveToLocal(id)
}

function handleClear() {
  if (confirm('确定要清空画布吗？')) {
    store.resetCanvas()
  }
}

function handleLoadExample() {
  if (store.nodes.length > 0) {
    if (confirm('加载示例工作流将清空当前画布，确定要继续吗？')) {
      store.loadExampleWorkflow()
      showWorkflowGuide.value = true
    }
  } else {
    store.loadExampleWorkflow()
    showWorkflowGuide.value = true
  }
}

function zoomIn() {
  store.setViewport({ zoom: Math.min(3, store.viewport.zoom + 0.1) })
}

function zoomOut() {
  store.setViewport({ zoom: Math.max(0.1, store.viewport.zoom - 0.1) })
}

function zoomReset() {
  store.setViewport({ x: 0, y: 0, zoom: 1 })
}
</script>

<style scoped>
.canvas-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  z-index: 200;
}

.canvas-body {
  flex: 1;
  position: relative;
  display: flex;
  overflow: hidden;
}

.back-btn {
  position: absolute;
  top: 56px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-secondary);
  z-index: 30;
  transition: all var(--transition);
}

.back-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}
</style>
