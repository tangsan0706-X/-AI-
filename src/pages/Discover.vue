<template>
  <div class="discover-page">
    <h1 class="page-title">发现</h1>
    <p class="page-desc">探索社区最新最热的AI视频作品</p>

    <FilterBar
      v-model="activeCategory"
      :tabs="filterTabs"
      :showSort="true"
    />

    <div class="grid-3">
      <VideoCard v-for="video in filteredVideos" :key="video.id" :video="video" />
    </div>

    <div v-if="filteredVideos.length === 0" class="empty-state">
      <SearchX :size="48" />
      <p>暂无匹配的作品</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchX } from 'lucide-vue-next'
import FilterBar from '../components/Common/FilterBar.vue'
import VideoCard from '../components/Common/VideoCard.vue'
import { videos } from '../data/mock'

const activeCategory = ref('all')

const filterTabs = [
  { label: '全部', value: 'all' },
  { label: '文生视频', value: '文生视频' },
  { label: '图生视频', value: '图生视频' },
  { label: '风格转换', value: '风格转换' },
  { label: '电商广告', value: '电商广告' },
  { label: 'MV', value: 'MV' },
]

const filteredVideos = computed(() => {
  if (activeCategory.value === 'all') return videos
  return videos.filter(v => v.category === activeCategory.value)
})
</script>

<style scoped>
.discover-page {
  max-width: 1100px;
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

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-tertiary);
}

.empty-state p {
  margin-top: 12px;
  font-size: 15px;
}
</style>
