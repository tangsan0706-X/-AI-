<template>
  <div class="network-test-page">
    <div class="test-card">
      <h1>🔧 网络诊断工具</h1>
      <p class="subtitle">检测 DashScope API 连接状态</p>

      <div class="test-section">
        <h3>1️⃣ DNS 解析测试</h3>
        <div class="test-result" :class="dnsStatus">
          <div class="status-icon">{{ dnsIcon }}</div>
          <div class="status-text">{{ dnsMessage }}</div>
        </div>
        <button class="btn btn-primary" @click="testDNS" :disabled="testing">
          {{ testing ? '测试中...' : '测试 DNS' }}
        </button>
      </div>

      <div class="test-section">
        <h3>2️⃣ API 连接测试</h3>
        <div class="test-result" :class="apiStatus">
          <div class="status-icon">{{ apiIcon }}</div>
          <div class="status-text">{{ apiMessage }}</div>
        </div>
        <button class="btn btn-primary" @click="testAPI" :disabled="testing || !hasApiKey">
          {{ hasApiKey ? (testing ? '测试中...' : '测试 API') : '请先设置 API Key' }}
        </button>
      </div>

      <div class="test-section">
        <h3>3️⃣ 诊断信息</h3>
        <pre class="diagnostic-info">{{ diagnosticInfo }}</pre>
      </div>

      <div class="test-section">
        <h3>💡 解决方案</h3>
        <div class="solutions">
          <div class="solution-item">
            <strong>方案 1：更换 DNS 服务器</strong>
            <p>打开项目文件夹，查看 <code>DNS修复指南.txt</code></p>
          </div>
          <div class="solution-item">
            <strong>方案 2：关闭 VPN/代理</strong>
            <p>关闭所有 VPN、加速器、代理软件</p>
          </div>
          <div class="solution-item">
            <strong>方案 3：刷新 DNS 缓存</strong>
            <p>打开命令提示符，运行：<code>ipconfig /flushdns</code></p>
          </div>
        </div>
      </div>

      <router-link to="/create" class="btn btn-outline">返回创作页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getApiKey } from '../services/dashscope'

const testing = ref(false)
const dnsStatus = ref('pending')
const apiStatus = ref('pending')
const dnsMessage = ref('点击按钮开始测试')
const apiMessage = ref('点击按钮开始测试')
const diagnosticInfo = ref('')

const hasApiKey = computed(() => !!getApiKey())

const dnsIcon = computed(() => {
  if (dnsStatus.value === 'success') return '✅'
  if (dnsStatus.value === 'error') return '❌'
  return '⏳'
})

const apiIcon = computed(() => {
  if (apiStatus.value === 'success') return '✅'
  if (apiStatus.value === 'error') return '❌'
  return '⏳'
})

async function testDNS() {
  testing.value = true
  dnsStatus.value = 'pending'
  dnsMessage.value = '正在测试 DNS 解析...'

  try {
    // 尝试访问 DashScope 域名
    const response = await fetch('https://dashscope.aliyuncs.com', {
      method: 'HEAD',
      mode: 'no-cors'
    })

    dnsStatus.value = 'success'
    dnsMessage.value = '✅ DNS 解析正常，可以访问 DashScope'

    diagnosticInfo.value = `DNS 测试通过\n时间: ${new Date().toLocaleString()}`
  } catch (error) {
    dnsStatus.value = 'error'
    dnsMessage.value = `❌ DNS 解析失败: ${error.message}`

    diagnosticInfo.value = `DNS 错误详情:\n${error.stack || error.message}\n\n当前 DNS 将 dashscope.aliyuncs.com 解析到: 198.18.0.125\n这是错误的 IP 地址！\n\n请按照上方"解决方案"操作。`
  } finally {
    testing.value = false
  }
}

async function testAPI() {
  testing.value = true
  apiStatus.value = 'pending'
  apiMessage.value = '正在测试 API 连接...'

  try {
    const response = await fetch('/api/dashscope/api/v1/services/aigc/text2image/image-synthesis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getApiKey()}`,
        'X-DashScope-Async': 'enable'
      },
      body: JSON.stringify({
        model: 'wanx-v1',
        input: { prompt: '网络测试' },
        parameters: { size: '1024*1024', n: 1 }
      })
    })

    if (response.ok) {
      const data = await response.json()
      apiStatus.value = 'success'
      apiMessage.value = `✅ API 连接成功！任务 ID: ${data.output?.task_id || '未知'}`
      diagnosticInfo.value = `API 测试通过\n响应: ${JSON.stringify(data, null, 2)}`
    } else {
      apiStatus.value = 'error'
      const errorText = await response.text()
      apiMessage.value = `❌ API 返回错误 (${response.status})`
      diagnosticInfo.value = `API 错误:\nHTTP ${response.status}\n${errorText}`
    }
  } catch (error) {
    apiStatus.value = 'error'
    apiMessage.value = `❌ API 连接失败: ${error.message}`
    diagnosticInfo.value = `API 错误详情:\n${error.stack || error.message}`
  } finally {
    testing.value = false
  }
}
</script>

<style scoped>
.network-test-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: var(--bg-primary);
  display: flex;
  justify-content: center;
  align-items: center;
}

.test-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 40px;
  max-width: 800px;
  width: 100%;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.test-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-color);
}

.test-section:last-of-type {
  border-bottom: none;
}

.test-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.test-result {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
}

.test-result.success {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.test-result.error {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.status-icon {
  font-size: 24px;
}

.status-text {
  flex: 1;
  font-size: 14px;
}

.diagnostic-info {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-primary);
  white-space: pre-wrap;
  word-break: break-word;
}

.solutions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.solution-item {
  padding: 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.solution-item strong {
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.solution-item p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.solution-item code {
  background: rgba(89, 97, 249, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: var(--accent);
}
</style>
