<template>
  <div class="profile-page">
    <div class="profile-header">
      <UserAvatar :name="profileUser.name" :size="80" />
      <div class="profile-info">
        <h1 class="profile-name">{{ profileUser.name }}</h1>
        <p class="profile-bio">{{ profileUser.bio }}</p>
        <div class="profile-stats">
          <div class="stat"><strong>{{ profileUser.followers.toLocaleString() }}</strong> 粉丝</div>
          <div class="stat"><strong>{{ profileUser.following }}</strong> 关注</div>
          <div class="stat"><strong>{{ profileUser.works }}</strong> 作品</div>
        </div>
      </div>
      <button class="btn btn-outline">编辑资料</button>
    </div>

    <div class="content-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab', { active: activeTab === tab.value }]"
        @click="activeTab = tab.value"
      >
        <component :is="tab.icon" :size="16" />
        {{ tab.label }}
        <span v-if="tab.count" class="tab-count">{{ tab.count }}</span>
      </button>
    </div>

    <div class="grid-3">
      <VideoCard v-for="video in displayVideos" :key="video.id" :video="video" />
    </div>

    <div v-if="displayVideos.length === 0" class="empty-state">
      <FolderOpen :size="48" />
      <p>暂无内容</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Video, Star, GitFork, FolderOpen } from 'lucide-vue-next'
import UserAvatar from '../components/Common/UserAvatar.vue'
import VideoCard from '../components/Common/VideoCard.vue'
import { users, videos } from '../data/mock'
import { useAuthStore } from '../stores/auth'
import { useInteractionStore } from '../stores/interaction'

const authStore = useAuthStore()
const interaction = useInteractionStore()
const activeTab = ref('works')

const profileUser = computed(() => authStore.user || users[0])

const collectedVideos = computed(() => {
  const ids = interaction.getCollectedIds()
  return videos.filter(v => ids.includes(v.id))
})

const forkedVideos = computed(() => {
  const ids = interaction.getForkedIds()
  return videos.filter(v => ids.includes(v.id))
})

const tabs = computed(() => [
  { label: '我的作品', value: 'works', icon: Video, count: videos.slice(0, 4).length },
  { label: '我的收藏', value: 'favorites', icon: Star, count: collectedVideos.value.length },
  { label: '我的Fork', value: 'forks', icon: GitFork, count: forkedVideos.value.length },
])

const displayVideos = computed(() => {
  switch (activeTab.value) {
    case 'works': return videos.slice(0, 4)
    case 'favorites': return collectedVideos.value
    case 'forks': return forkedVideos.value
    default: return []
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 1100px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  margin-bottom: 24px;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.profile-bio {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.profile-stats {
  display: flex;
  gap: 24px;
}

.profile-stats .stat {
  font-size: 14px;
  color: var(--text-secondary);
}

.profile-stats strong {
  color: var(--text-primary);
  font-weight: 700;
}

.content-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0;
}

.content-tabs .tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all var(--transition);
}

.content-tabs .tab:hover {
  color: var(--text-primary);
}

.content-tabs .tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-count {
  font-size: 11px;
  background: var(--bg-hover);
  padding: 1px 6px;
  border-radius: 10px;
  color: var(--text-tertiary);
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

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px;
  }
  .profile-stats {
    justify-content: center;
  }
}
</style>
