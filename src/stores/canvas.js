import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, setItem } from '../utils/localStorage'
import { hasApiKey, text2image, image2image, text2video, image2video } from '../services/dashscope'

let nextNodeId = 1
let nextEdgeId = 1

export const useCanvasStore = defineStore('canvas', () => {
  const nodes = ref([])
  const edges = ref([])
  const viewport = ref({ x: 0, y: 0, zoom: 1 })
  const selectedNodeId = ref(null)
  const selectedEdgeId = ref(null)
  const isRunning = ref(false)
  const canvasName = ref('未命名画布')
  const draggingPort = ref(null) // { nodeId, portId, portType, x, y }
  const mouseCanvas = ref({ x: 0, y: 0 })

  const selectedNode = computed(() => nodes.value.find(n => n.id === selectedNodeId.value))

  function addNode(type, x, y, config = {}) {
    const node = {
      id: nextNodeId++,
      type,
      x,
      y,
      width: 200,
      height: 120,
      status: 'idle', // idle | running | completed | error
      config: { ...config },
      label: config.label || type
    }
    nodes.value.push(node)
    return node
  }

  function removeNode(nodeId) {
    nodes.value = nodes.value.filter(n => n.id !== nodeId)
    edges.value = edges.value.filter(e => e.sourceNode !== nodeId && e.targetNode !== nodeId)
    if (selectedNodeId.value === nodeId) selectedNodeId.value = null
  }

  function updateNodePosition(nodeId, x, y) {
    const node = nodes.value.find(n => n.id === nodeId)
    if (node) { node.x = x; node.y = y }
  }

  function updateNodeConfig(nodeId, config) {
    const node = nodes.value.find(n => n.id === nodeId)
    if (node) { node.config = { ...node.config, ...config } }
  }

  function selectNode(nodeId) {
    selectedNodeId.value = nodeId
    selectedEdgeId.value = null
  }

  function addEdge(sourceNode, sourcePort, targetNode, targetPort) {
    // prevent duplicates
    const exists = edges.value.find(
      e => e.sourceNode === sourceNode && e.sourcePort === sourcePort &&
           e.targetNode === targetNode && e.targetPort === targetPort
    )
    if (exists) return
    // prevent self-connection
    if (sourceNode === targetNode) return
    edges.value.push({
      id: nextEdgeId++,
      sourceNode, sourcePort,
      targetNode, targetPort
    })
  }

  function removeEdge(edgeId) {
    edges.value = edges.value.filter(e => e.id !== edgeId)
    if (selectedEdgeId.value === edgeId) selectedEdgeId.value = null
  }

  function setViewport(v) {
    viewport.value = { ...viewport.value, ...v }
  }

  function clearSelection() {
    selectedNodeId.value = null
    selectedEdgeId.value = null
  }

  function startDragPort(nodeId, portId, portType, x, y) {
    draggingPort.value = { nodeId, portId, portType, x, y }
  }

  function endDragPort() {
    draggingPort.value = null
  }

  // Topological sort for running
  function getTopoOrder() {
    const inDegree = {}
    const adj = {}
    nodes.value.forEach(n => { inDegree[n.id] = 0; adj[n.id] = [] })
    edges.value.forEach(e => {
      inDegree[e.targetNode] = (inDegree[e.targetNode] || 0) + 1
      if (adj[e.sourceNode]) adj[e.sourceNode].push(e.targetNode)
    })
    const queue = nodes.value.filter(n => inDegree[n.id] === 0).map(n => n.id)
    const order = []
    while (queue.length) {
      const id = queue.shift()
      order.push(id)
      ;(adj[id] || []).forEach(next => {
        inDegree[next]--
        if (inDegree[next] === 0) queue.push(next)
      })
    }
    return order
  }

  async function runPipeline() {
    if (isRunning.value) return
    isRunning.value = true
    nodes.value.forEach(n => { n.status = 'idle'; n.output = null })

    const order = getTopoOrder()
    // 收集每个节点的输出，供下游使用
    const outputs = {}

    for (const nodeId of order) {
      const node = nodes.value.find(n => n.id === nodeId)
      if (!node) continue
      node.status = 'running'

      try {
        // 收集上游输入
        const inputData = {}
        edges.value.filter(e => e.targetNode === nodeId).forEach(e => {
          inputData[e.targetPort] = outputs[e.sourceNode]?.[e.sourcePort]
        })

        const result = await executeNode(node, inputData)
        if (result) {
          outputs[nodeId] = result
          node.output = result
        }
        node.status = 'completed'
      } catch (e) {
        node.status = 'error'
        node.output = { error: e.message }
        console.error(`节点 ${node.label} 执行失败:`, e)
      }
    }
    isRunning.value = false
  }

  async function executeNode(node, inputData) {
    const config = node.config || {}
    const AI_TYPES = ['ai-text2img', 'ai-img2img', 'ai-text2video', 'ai-img2video']

    if (AI_TYPES.includes(node.type) && hasApiKey()) {
      // 真实 AI 调用
      if (node.type === 'ai-text2img') {
        const results = await text2image({
          prompt: inputData.prompt || config.text || '',
          model: config.model,
          size: config.size,
          n: 1,
          seed: config.seed,
          steps: config.steps
        })
        return { image: results[0]?.url || '' }
      }
      if (node.type === 'ai-img2img') {
        const results = await image2image({
          prompt: inputData.prompt || '',
          imageUrl: inputData.image || '',
          model: config.model,
          size: config.size,
          n: 1,
          seed: config.seed,
          steps: config.steps
        })
        return { image: results[0]?.url || '' }
      }
      if (node.type === 'ai-text2video') {
        const results = await text2video({
          prompt: inputData.prompt || config.text || '',
          model: config.model,
          size: config.size
        })
        return { video: results[0]?.url || '' }
      }
      if (node.type === 'ai-img2video') {
        const results = await image2video({
          imageUrl: inputData.image || '',
          model: config.model,
          size: config.size
        })
        return { video: results[0]?.url || '' }
      }
    }

    // 非AI节点即时返回
    if (node.type === 'text-input') {
      return { text: config.text || '' }
    }
    if (node.type === 'image-upload') {
      return { image: config.imageUrl || '' }
    }
    // 其他处理节点直接透传上游输出
    return { ...inputData }
  }

  function saveToLocal(id) {
    const key = id || 'canvas_default'
    setItem(key, {
      nodes: nodes.value,
      edges: edges.value,
      viewport: viewport.value,
      canvasName: canvasName.value,
      nextNodeId,
      nextEdgeId
    })
  }

  function loadFromLocal(id) {
    const key = id || 'canvas_default'
    const data = getItem(key)
    if (data) {
      nodes.value = data.nodes || []
      edges.value = data.edges || []
      viewport.value = data.viewport || { x: 0, y: 0, zoom: 1 }
      canvasName.value = data.canvasName || '未命名画布'
      nextNodeId = data.nextNodeId || (nodes.value.length + 1)
      nextEdgeId = data.nextEdgeId || (edges.value.length + 1)
    } else {
      // 首次使用，加载示例工作流
      loadExampleWorkflow()
    }
  }

  function loadExampleWorkflow() {
    // 创建示例工作流：文本输入 → AI文生图 → AI图生视频 → 输出
    nodes.value = [
      {
        id: 1,
        type: 'text-input',
        x: 100,
        y: 150,
        width: 200,
        height: 120,
        status: 'idle',
        label: '文本输入',
        config: {
          label: '文本输入',
          text: '一只可爱的橘猫在樱花树下玩耍，阳光明媚，动漫风格'
        }
      },
      {
        id: 2,
        type: 'ai-text2img',
        x: 380,
        y: 150,
        width: 200,
        height: 120,
        status: 'idle',
        label: 'AI文生图',
        config: {
          label: 'AI文生图',
          model: 'wanx-v1',
          size: '1024*1024',
          steps: 30,
          cfgScale: 7.5,
          seed: -1
        }
      },
      {
        id: 3,
        type: 'ai-img2video',
        x: 660,
        y: 150,
        width: 200,
        height: 120,
        status: 'idle',
        label: 'AI图生视频',
        config: {
          label: 'AI图生视频',
          model: 'wan2.1-i2v-turbo',
          size: '1280*720',
          fps: 8,
          frames: 24
        }
      },
      {
        id: 4,
        type: 'output',
        x: 940,
        y: 150,
        width: 200,
        height: 120,
        status: 'idle',
        label: '输出',
        config: {
          label: '输出',
          format: 'mp4',
          quality: 'high',
          filename: 'ai-video-output'
        }
      }
    ]

    edges.value = [
      { id: 1, sourceNode: 1, sourcePort: 'text', targetNode: 2, targetPort: 'prompt' },
      { id: 2, sourceNode: 2, sourcePort: 'image', targetNode: 3, targetPort: 'image' },
      { id: 3, sourceNode: 3, sourcePort: 'video', targetNode: 4, targetPort: 'media' }
    ]

    viewport.value = { x: 50, y: 50, zoom: 1 }
    canvasName.value = '示例工作流 - 文本生成动态视频'
    nextNodeId = 5
    nextEdgeId = 4
  }

  function resetCanvas() {
    nodes.value = []
    edges.value = []
    viewport.value = { x: 0, y: 0, zoom: 1 }
    selectedNodeId.value = null
    selectedEdgeId.value = null
    isRunning.value = false
    canvasName.value = '未命名画布'
    nextNodeId = 1
    nextEdgeId = 1
  }

  return {
    nodes, edges, viewport, selectedNodeId, selectedEdgeId,
    isRunning, canvasName, draggingPort, mouseCanvas, selectedNode,
    addNode, removeNode, updateNodePosition, updateNodeConfig,
    selectNode, addEdge, removeEdge, setViewport, clearSelection,
    startDragPort, endDragPort, runPipeline, saveToLocal, loadFromLocal, resetCanvas,
    loadExampleWorkflow
  }
})
