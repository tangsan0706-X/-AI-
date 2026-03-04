<template>
  <div
    :class="['cover-upload', { 'has-cover': modelValue, dragging }]"
    @click="triggerInput"
    @dragover.prevent="dragging = true"
    @dragleave="dragging = false"
    @drop.prevent="handleDrop"
  >
    <template v-if="modelValue">
      <div class="cover-preview" :style="{ backgroundImage: `url(${modelValue})` }">
        <button class="remove-btn" @click.stop="$emit('update:modelValue', '')">
          <X :size="14" />
        </button>
      </div>
    </template>
    <template v-else>
      <ImagePlus :size="32" />
      <span>上传封面图</span>
      <span class="cover-hint">推荐 16:9 比例</span>
    </template>
    <input ref="inputRef" type="file" accept="image/*" @change="handleFile" hidden />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ImagePlus, X } from 'lucide-vue-next'

defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
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
  reader.onload = (e) => emit('update:modelValue', e.target.result)
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.cover-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 180px;
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition);
  color: var(--text-tertiary);
}

.cover-upload:hover,
.cover-upload.dragging {
  border-color: var(--accent);
  background: var(--accent-light);
  color: var(--accent);
}

.cover-upload.has-cover {
  padding: 0;
  border-style: solid;
}

.cover-preview {
  width: 100%;
  height: 100%;
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

.cover-hint {
  font-size: 12px;
}
</style>
