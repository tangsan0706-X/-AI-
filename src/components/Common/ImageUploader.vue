<template>
  <div
    :class="['uploader', { 'has-image': imageUrl, dragging }]"
    @click="triggerInput"
    @dragover.prevent="dragging = true"
    @dragleave="dragging = false"
    @drop.prevent="handleDrop"
  >
    <template v-if="imageUrl">
      <div class="preview" :style="{ backgroundImage: `url(${imageUrl})` }">
        <button class="remove-btn" @click.stop="removeImage">
          <X :size="14" />
        </button>
      </div>
    </template>
    <template v-else>
      <Upload :size="32" />
      <span class="uploader-text">点击或拖拽上传图片</span>
      <span class="uploader-hint">支持 JPG、PNG、WebP</span>
    </template>
    <input ref="inputRef" type="file" accept="image/*" @change="handleFile" hidden />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload, X } from 'lucide-vue-next'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const imageUrl = ref(props.modelValue || '')
const dragging = ref(false)

function triggerInput() { inputRef.value?.click() }

function handleFile(e) {
  const file = e.target.files[0]
  if (!file) return
  readFile(file)
}

function handleDrop(e) {
  dragging.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) readFile(file)
}

function readFile(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target.result
    emit('update:modelValue', imageUrl.value)
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  imageUrl.value = ''
  emit('update:modelValue', '')
}
</script>

<style scoped>
.uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 160px;
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition);
  color: var(--text-tertiary);
  padding: 20px;
}

.uploader:hover,
.uploader.dragging {
  border-color: var(--accent);
  background: var(--accent-light);
  color: var(--accent);
}

.uploader.has-image {
  padding: 0;
  border-style: solid;
  border-color: var(--border-color);
}

.preview {
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-lg);
  position: relative;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: rgba(0,0,0,0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uploader-text {
  font-size: 14px;
  font-weight: 500;
}

.uploader-hint {
  font-size: 12px;
}
</style>
