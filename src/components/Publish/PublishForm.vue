<template>
  <div class="publish-form">
    <div class="form-group">
      <label>作品标题</label>
      <input v-model="form.title" placeholder="输入作品标题" class="form-input" />
    </div>

    <div class="form-group">
      <label>作品描述</label>
      <textarea v-model="form.description" placeholder="描述你的作品..." class="form-textarea" rows="4" />
    </div>

    <div class="form-group">
      <label>分类</label>
      <select v-model="form.category" class="form-select">
        <option value="">选择分类</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>标签</label>
      <div class="tags-input">
        <span v-for="(tag, i) in form.tags" :key="i" class="tag-item">
          {{ tag }}
          <button @click="removeTag(i)"><X :size="12" /></button>
        </span>
        <input v-model="tagInput" placeholder="输入标签后回车" @keyup.enter="addTag" class="tag-input" />
      </div>
    </div>

    <div class="form-group">
      <label>封面</label>
      <CoverUpload v-model="form.cover" />
    </div>

    <div class="form-group">
      <label>提示词 (Prompt)</label>
      <textarea v-model="form.prompt" placeholder="输入生成时使用的提示词..." class="form-textarea" rows="3" />
    </div>

    <div class="form-group">
      <label>使用模型</label>
      <input v-model="form.model" placeholder="例如: Stable Diffusion 1.5" class="form-input" />
    </div>

    <div class="form-actions">
      <button class="btn btn-outline" @click="$emit('saveDraft', form)">保存草稿</button>
      <button class="btn btn-primary" @click="$emit('publish', form)">发布作品</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { X } from 'lucide-vue-next'
import CoverUpload from './CoverUpload.vue'

defineEmits(['publish', 'saveDraft'])

const categories = ['文生视频', '图生视频', '风格转换', '电商广告', '短剧创作', 'MV制作']

const form = reactive({
  title: '',
  description: '',
  category: '',
  tags: [],
  cover: '',
  prompt: '',
  model: ''
})

const tagInput = ref('')

function addTag() {
  const tag = tagInput.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
  }
  tagInput.value = ''
}

function removeTag(index) {
  form.tags.splice(index, 1)
}
</script>

<style scoped>
.publish-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.form-input,
.form-textarea,
.form-select {
  padding: 10px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  transition: border-color var(--transition);
  width: 100%;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  border-color: var(--accent);
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-light);
}

.form-textarea {
  resize: vertical;
}

.form-select {
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 12px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  min-height: 42px;
  align-items: center;
}

.tags-input:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 20px;
  font-size: 12px;
}

.tag-item button {
  display: flex;
  color: var(--accent);
}

.tag-input {
  flex: 1;
  min-width: 100px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}
</style>
