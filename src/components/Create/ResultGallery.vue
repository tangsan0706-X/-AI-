<template>
  <div class="result-gallery">
    <h3>生成结果</h3>

    <div v-if="generating" class="generating-state">
      <div class="gen-animation">
        <Loader2 :size="32" class="spinning" />
      </div>
      <p>AI正在创作中...</p>
      <ProgressBar :percent="progress" />
    </div>

    <div v-else-if="error" class="error-state">
      <AlertCircle :size="32" />
      <p>{{ error }}</p>
      <button class="btn btn-ghost btn-sm" @click="$emit('retry')">重试</button>
    </div>

    <div v-else-if="results.length > 0" class="results-grid" :class="{ 'single-result': results.length === 1 }">
      <div
        v-for="(result, i) in results"
        :key="i"
        :class="['result-item', { selected: selectedIndex === i }]"
        @click="selectedIndex = i"
      >
        <div class="result-preview">
          <img
            v-if="result.type === 'image' && result.url"
            :src="result.url"
            alt="生成结果"
            class="result-media"
            loading="lazy"
          />
          <video
            v-else-if="result.type === 'video' && result.url"
            :src="result.url"
            class="result-media"
            controls
            preload="metadata"
          />
          <div v-else class="result-placeholder" :style="{ backgroundColor: result.color || '#1a1a3e' }">
            <component :is="result.type === 'video' ? Video : ImageIcon" :size="32" />
          </div>
        </div>
        <div class="result-meta">
          <span v-if="result.seed != null && result.seed >= 0" class="result-seed">Seed: {{ result.seed }}</span>
          <a
            v-if="result.url"
            :href="result.url"
            target="_blank"
            download
            class="download-link"
            @click.stop
          >
            <Download :size="14" />
          </a>
        </div>
      </div>
    </div>

    <div v-else class="empty-results">
      <Sparkles :size="32" />
      <p>开始创作，结果将显示在这里</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sparkles, Loader2, Image as ImageIcon, Video, AlertCircle, Download } from 'lucide-vue-next'
import ProgressBar from '../Common/ProgressBar.vue'

defineProps({
  results: { type: Array, default: () => [] },
  generating: Boolean,
  progress: { type: Number, default: 0 },
  error: { type: String, default: '' }
})

defineEmits(['retry'])

const selectedIndex = ref(0)
</script>

<style scoped>
.result-gallery {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.result-gallery h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}

.generating-state {
  text-align: center;
  padding: 40px 20px;
}

.gen-animation {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--accent);
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.generating-state p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.error-state {
  text-align: center;
  padding: 40px 20px;
  color: #ef4444;
}

.error-state p {
  margin: 10px 0 16px;
  font-size: 14px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.results-grid.single-result {
  grid-template-columns: 1fr;
  max-width: 480px;
}

.result-item {
  cursor: pointer;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  overflow: hidden;
  transition: all var(--transition);
}

.result-item:hover {
  border-color: var(--border-color);
}

.result-item.selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-light);
}

.result-preview {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg-secondary);
}

.single-result .result-preview {
  aspect-ratio: auto;
}

.result-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.single-result .result-media {
  object-fit: contain;
  max-height: 400px;
}

.result-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.4);
  background: linear-gradient(135deg, rgba(89,97,249,0.15), rgba(238,154,229,0.1));
}

.result-meta {
  padding: 6px 8px;
  background: var(--bg-secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-seed {
  font-size: 11px;
  color: var(--text-tertiary);
  font-family: monospace;
}

.download-link {
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  transition: color var(--transition);
}

.download-link:hover {
  color: var(--accent);
}

.empty-results {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-tertiary);
}

.empty-results p {
  margin-top: 10px;
  font-size: 14px;
}
</style>
