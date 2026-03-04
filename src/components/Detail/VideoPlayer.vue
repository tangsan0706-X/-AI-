<template>
  <div class="video-player" :style="{ backgroundColor: bgColor }">
    <div class="player-content">
      <button class="play-btn" @click="playing = !playing">
        <component :is="playing ? Pause : Play" :size="48" />
      </button>
      <div class="player-overlay" v-if="!playing">
        <Film :size="64" class="film-icon" />
        <p>AI生成视频预览</p>
      </div>
    </div>
    <div class="controls">
      <div class="controls-left">
        <button @click="playing = !playing">
          <component :is="playing ? Pause : Play" :size="18" />
        </button>
        <span class="time">0:00 / 0:{{ 10 + (videoId || 1) * 3 }}</span>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: playing ? '35%' : '0%' }" />
      </div>
      <div class="controls-right">
        <button><Volume2 :size="18" /></button>
        <button><Maximize :size="18" /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Play, Pause, Volume2, Maximize, Film } from 'lucide-vue-next'

defineProps({
  bgColor: { type: String, default: '#1a1a2e' },
  videoId: { type: Number, default: 1 }
})

const playing = ref(false)
</script>

<style scoped>
.video-player {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.player-content {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(89, 97, 249, 0.15), rgba(238, 154, 229, 0.1));
}

.play-btn {
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(89, 97, 249, 0.8);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-btn:hover {
  background: var(--accent);
  transform: scale(1.1);
}

.player-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 1;
}

.film-icon {
  color: rgba(255, 255, 255, 0.15);
}

.player-overlay p {
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.6);
}

.controls-left,
.controls-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.controls button {
  color: rgba(255, 255, 255, 0.8);
  padding: 4px;
  display: flex;
}

.controls button:hover {
  color: #fff;
}

.time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-variant-numeric: tabular-nums;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
}

.progress {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.3s ease;
}
</style>
