<template>
  <router-link :to="`/video/${video.id}`" class="video-card card">
    <div class="cover" :style="{ backgroundColor: video.coverColor || '#1a1a2e' }">
      <div class="cover-content">
        <Play :size="40" class="play-icon" />
      </div>
      <div class="cover-overlay">
        <span class="duration">0:{{ 10 + video.id * 3 }}</span>
      </div>
    </div>
    <div class="info">
      <h3 class="title">{{ video.title }}</h3>
      <div class="meta">
        <div class="author">
          <UserAvatar :name="video.author.name" :size="22" />
          <span>{{ video.author.name }}</span>
        </div>
        <div class="stats">
          <span><Heart :size="13" /> {{ formatNum(video.likes) }}</span>
          <span><GitFork :size="13" /> {{ formatNum(video.forks) }}</span>
          <span><Eye :size="13" /> {{ formatNum(video.views) }}</span>
        </div>
      </div>
      <div class="tags" v-if="video.tags">
        <span class="tag" v-for="tag in video.tags.slice(0, 2)" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { Play, Heart, GitFork, Eye } from 'lucide-vue-next'
import UserAvatar from './UserAvatar.vue'

defineProps({ video: Object })

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n
}
</script>

<style scoped>
.video-card {
  display: block;
  cursor: pointer;
}

.cover {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.cover-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(89, 97, 249, 0.3), rgba(238, 154, 229, 0.2));
}

.play-icon {
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.video-card:hover .play-icon {
  opacity: 1;
  transform: scale(1);
}

.cover-overlay {
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.duration {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.info {
  padding: 12px;
}

.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.stats {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.stats span {
  display: flex;
  align-items: center;
  gap: 3px;
}

.tags {
  display: flex;
  gap: 6px;
}

.tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  background: var(--accent-light);
  color: var(--accent);
}
</style>
