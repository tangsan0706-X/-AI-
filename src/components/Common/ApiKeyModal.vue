<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card" :class="{ shake: shouldShake }">
        <h3>设置 DashScope API Key</h3>
        <p class="modal-desc">
          请输入阿里云 DashScope API Key 以使用 AI 生成功能。
          <a href="https://dashscope.console.aliyun.com/apiKey" target="_blank" rel="noopener">
            前往获取 API Key →
          </a>
        </p>

        <div class="input-group">
          <label>API Key</label>
          <input
            v-model="key"
            :type="showKey ? 'text' : 'password'"
            placeholder="sk-..."
            class="key-input"
            @keyup.enter="handleSave"
            autofocus
          />
          <button class="btn btn-ghost btn-sm toggle-btn" @click="showKey = !showKey">
            <component :is="showKey ? EyeOff : Eye" :size="16" />
          </button>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <div class="modal-actions">
          <button class="btn btn-ghost" @click="$emit('close')">取消</button>
          <button class="btn btn-primary" @click="handleSave" :disabled="!key.trim()">保存</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { getApiKey, setApiKey } from '../../services/dashscope'

const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(['close', 'saved'])

const key = ref(getApiKey())
const showKey = ref(false)
const error = ref('')
const shouldShake = ref(false)

// 当弹窗打开时重新加载 API Key
watch(() => props.visible, (visible) => {
  if (visible) {
    key.value = getApiKey()
    error.value = ''
    shouldShake.value = false
  }
})

function triggerShake() {
  shouldShake.value = true
  setTimeout(() => {
    shouldShake.value = false
  }, 500)
}

function handleSave() {
  const trimmed = key.value.trim()

  // 验证 API Key 不为空
  if (!trimmed) {
    error.value = '请输入有效的 API Key'
    triggerShake()
    return
  }

  // 验证 API Key 格式
  if (!trimmed.startsWith('sk-')) {
    error.value = 'API Key 格式不正确，应以 sk- 开头'
    triggerShake()
    return
  }

  // 验证通过，保存并关闭
  setApiKey(trimmed)
  error.value = ''
  emit('saved')
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-card.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
  20%, 40%, 60%, 80% { transform: translateX(8px); }
}

.modal-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 28px;
  width: 440px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.modal-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 20px;
}

.modal-desc a {
  color: var(--accent);
  text-decoration: none;
}

.modal-desc a:hover {
  text-decoration: underline;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  margin-bottom: 16px;
}

.input-group label {
  font-size: 13px;
  color: var(--text-secondary);
}

.key-input {
  padding: 10px 40px 10px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  width: 100%;
  font-family: monospace;
}

.key-input:focus {
  border-color: var(--accent);
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-light);
}

.toggle-btn {
  position: absolute;
  right: 8px;
  bottom: 6px;
}

.error-msg {
  font-size: 13px;
  color: #ef4444;
  margin-bottom: 12px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
