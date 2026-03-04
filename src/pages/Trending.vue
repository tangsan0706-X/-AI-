<template>
  <div class="trending-page">
    <h1 class="page-title">排行榜</h1>
    <p class="page-desc">看看社区里最受欢迎的AI视频作品</p>

    <div class="tabs-row">
      <div class="tab-group">
        <button
          v-for="scope in scopes"
          :key="scope.value"
          :class="['tab', { active: activeScope === scope.value }]"
          @click="activeScope = scope.value"
        >
          {{ scope.label }}
        </button>
      </div>
      <div class="tab-group">
        <button
          v-for="period in periods"
          :key="period.value"
          :class="['tab', { active: activePeriod === period.value }]"
          @click="activePeriod = period.value"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <div class="ranking-list">
      <div
        v-for="(video, index) in rankedVideos"
        :key="video.id"
        class="ranking-item"
      >
        <div :class="['rank', { top: index < 3 }]">
          <Trophy v-if="index === 0" :size="18" />
          <template v-else>{{ index + 1 }}</template>
        </div>
        <router-link :to="`/video/${video.id}`" class="item-cover" :style="{ backgroundColor: video.coverColor }">
          <Play :size="18" />
        </router-link>
        <div class="item-info">
          <router-link :to="`/video/${video.id}`" class="item-title">{{ video.title }}</router-link>
          <div class="item-author">
            <UserAvatar :name="video.author.name" :size="20" />
            <span>{{ video.author.name }}</span>
          </div>
        </div>
        <div class="item-stats">
          <span><Heart :size="14" /> {{ formatNum(video.likes) }}</span>
          <span><GitFork :size="14" /> {{ formatNum(video.forks) }}</span>
          <span><Eye :size="14" /> {{ formatNum(video.views) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Trophy, Play, Heart, GitFork, Eye } from 'lucide-vue-next'
import UserAvatar from '../components/Common/UserAvatar.vue'
import { videos } from '../data/mock'

const activeScope = ref('all')
const activePeriod = ref('week')

const scopes = [
  { label: '全网热门', value: 'all' },
  { label: '站内热门', value: 'site' },
]

const periods = [
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
]

const rankedVideos = computed(() => {
  return [...videos].sort((a, b) => b.views - a.views)
})

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n
}
</script>

<style scoped>
.trending-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 6px;
}

.page-desc {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.tabs-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-group {
  display: flex;
  gap: 4px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  padding: 3px;
}

.tab {
  padding: 6px 14px;
  font-size: 13px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: all var(--transition);
}

.tab:hover {
  color: var(--text-primary);
}

.tab.active {
  color: #fff;
  background: var(--accent);
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition);
}

.ranking-item:hover {
  box-shadow: var(--shadow-md);
}

.rank {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.rank.top {
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #fff;
}

.item-cover {
  width: 80px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.5);
  background: linear-gradient(135deg, rgba(89, 97, 249, 0.2), rgba(238, 154, 229, 0.15));
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-title:hover {
  color: var(--accent);
}

.item-author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.item-stats {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

.item-stats span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .item-stats {
    display: none;
  }
}
</style>
