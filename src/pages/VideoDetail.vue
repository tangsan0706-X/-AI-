<template>
  <div class="detail-page" v-if="video">
    <div class="detail-grid">
      <div class="detail-main">
        <VideoPlayer :bgColor="video.coverColor" :videoId="video.id" />

        <div class="video-info">
          <h1 class="video-title">{{ video.title }}</h1>
          <div class="video-meta">
            <div class="author-info">
              <UserAvatar :name="video.author.name" :size="40" />
              <div>
                <div class="author-name">{{ video.author.name }}</div>
                <div class="author-followers">{{ video.author.followers.toLocaleString() }} 粉丝</div>
              </div>
            </div>
            <div class="action-buttons">
              <button :class="['btn btn-outline btn-sm', { liked: interaction.isLiked(video.id) }]" @click="interaction.toggleLike(video.id)">
                <Heart :size="16" /> {{ video.likes + (interaction.isLiked(video.id) ? 1 : 0) }}
              </button>
              <button :class="['btn btn-outline btn-sm', { collected: interaction.isCollected(video.id) }]" @click="interaction.toggleCollection(video.id)">
                <Star :size="16" /> {{ interaction.isCollected(video.id) ? '已收藏' : '收藏' }}
              </button>
              <button :class="['btn btn-primary btn-sm', { forked: interaction.isForked(video.id) }]" @click="interaction.toggleFork(video.id)">
                <GitFork :size="16" /> {{ interaction.isForked(video.id) ? '已Fork' : 'Fork' }}
              </button>
              <button class="btn btn-ghost btn-sm">
                <Share2 :size="16" />
              </button>
            </div>
          </div>
          <p class="video-desc">{{ video.description }}</p>
          <div class="video-tags">
            <span class="badge badge-accent" v-for="tag in video.tags" :key="tag">{{ tag }}</span>
            <span class="badge badge-pink">{{ video.category }}</span>
          </div>
          <div class="video-stats">
            <span><Eye :size="14" /> {{ video.views.toLocaleString() }} 次观看</span>
            <span><GitFork :size="14" /> {{ video.forks }} 次Fork</span>
            <span><Calendar :size="14" /> {{ video.createdAt }}</span>
          </div>
        </div>

        <CommentSection :comments="comments" />
      </div>

      <aside class="detail-sidebar">
        <OpenSourceParams
          :prompt="video.prompt"
          :model="video.model"
          :params="video.params"
        />

        <div class="related-section">
          <h3>相关作品</h3>
          <div class="related-list">
            <router-link
              v-for="rv in relatedVideos"
              :key="rv.id"
              :to="`/video/${rv.id}`"
              class="related-item"
            >
              <div class="related-cover" :style="{ backgroundColor: rv.coverColor }">
                <Play :size="16" />
              </div>
              <div class="related-info">
                <div class="related-title">{{ rv.title }}</div>
                <div class="related-author">{{ rv.author.name }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Heart, Star, GitFork, Share2, Eye, Calendar, Play } from 'lucide-vue-next'
import VideoPlayer from '../components/Detail/VideoPlayer.vue'
import OpenSourceParams from '../components/Detail/OpenSourceParams.vue'
import CommentSection from '../components/Detail/CommentSection.vue'
import UserAvatar from '../components/Common/UserAvatar.vue'
import { videos, comments } from '../data/mock'
import { useInteractionStore } from '../stores/interaction'

const route = useRoute()
const interaction = useInteractionStore()

const video = computed(() => {
  const id = parseInt(route.params.id)
  return videos.find(v => v.id === id) || videos[0]
})

const relatedVideos = computed(() => {
  return videos.filter(v => v.id !== video.value.id).slice(0, 4)
})
</script>

<style scoped>
.detail-page {
  max-width: 1100px;
  margin: 0 auto;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

.detail-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-info {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.video-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
}

.author-followers {
  font-size: 12px;
  color: var(--text-tertiary);
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.liked {
  color: #ef4444 !important;
  border-color: #ef4444 !important;
}

.collected {
  color: #f59e0b !important;
  border-color: #f59e0b !important;
}

.forked {
  background: var(--accent-hover) !important;
}

.video-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 12px;
}

.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.video-stats {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: var(--text-tertiary);
}

.video-stats span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.related-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px;
}

.related-section h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.related-item {
  display: flex;
  gap: 10px;
  padding: 6px;
  border-radius: var(--radius-md);
  transition: background var(--transition);
}

.related-item:hover {
  background: var(--bg-hover);
}

.related-cover {
  width: 100px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.5);
  background: linear-gradient(135deg, rgba(89, 97, 249, 0.2), rgba(238, 154, 229, 0.15));
}

.related-info {
  min-width: 0;
}

.related-title {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
}

.related-author {
  font-size: 12px;
  color: var(--text-tertiary);
}

@media (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
