<template>
  <div class="search-page">
    <div class="search-header">
      <h1>搜索结果</h1>
      <p v-if="searchStore.keyword">
        "{{ searchStore.keyword }}" 共找到 {{ searchStore.totalCount() }} 个结果
      </p>
    </div>

    <SearchResultTabs
      v-model="searchStore.activeTab"
      :tabs="tabs"
    />

    <!-- All -->
    <template v-if="searchStore.activeTab === 'all'">
      <template v-if="results.videos.length">
        <h3 class="section-title">视频作品</h3>
        <div class="grid-3">
          <VideoCard v-for="v in results.videos.slice(0, 3)" :key="v.id" :video="v" />
        </div>
      </template>
      <template v-if="results.workflows.length">
        <h3 class="section-title">工作流</h3>
        <div class="grid-3">
          <WorkflowCard v-for="w in results.workflows.slice(0, 3)" :key="w.id" :workflow="w" />
        </div>
      </template>
      <template v-if="results.users.length">
        <h3 class="section-title">创作者</h3>
        <div class="user-list">
          <div v-for="u in results.users" :key="u.id" class="user-row">
            <UserAvatar :name="u.name" :size="40" />
            <div class="user-info">
              <div class="user-name">{{ u.name }}</div>
              <div class="user-bio">{{ u.bio }}</div>
            </div>
            <span class="user-followers">{{ u.followers.toLocaleString() }} 粉丝</span>
          </div>
        </div>
      </template>
    </template>

    <!-- Videos -->
    <div v-if="searchStore.activeTab === 'videos'" class="grid-3">
      <VideoCard v-for="v in results.videos" :key="v.id" :video="v" />
    </div>

    <!-- Workflows -->
    <div v-if="searchStore.activeTab === 'workflows'" class="grid-3">
      <WorkflowCard v-for="w in results.workflows" :key="w.id" :workflow="w" />
    </div>

    <!-- Users -->
    <div v-if="searchStore.activeTab === 'users'" class="user-list">
      <div v-for="u in results.users" :key="u.id" class="user-row">
        <UserAvatar :name="u.name" :size="40" />
        <div class="user-info">
          <div class="user-name">{{ u.name }}</div>
          <div class="user-bio">{{ u.bio }}</div>
        </div>
        <span class="user-followers">{{ u.followers.toLocaleString() }} 粉丝</span>
      </div>
    </div>

    <div v-if="searchStore.totalCount() === 0 && searchStore.keyword" class="empty-state">
      <SearchX :size="48" />
      <p>未找到相关内容</p>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { SearchX } from 'lucide-vue-next'
import SearchResultTabs from '../components/Search/SearchResultTabs.vue'
import VideoCard from '../components/Common/VideoCard.vue'
import WorkflowCard from '../components/Common/WorkflowCard.vue'
import UserAvatar from '../components/Common/UserAvatar.vue'
import { useSearchStore } from '../stores/search'

const route = useRoute()
const searchStore = useSearchStore()

const results = computed(() => searchStore.results)

const tabs = computed(() => [
  { key: 'all', label: '全部', count: searchStore.totalCount() },
  { key: 'videos', label: '视频', count: results.value.videos.length },
  { key: 'workflows', label: '工作流', count: results.value.workflows.length },
  { key: 'users', label: '创作者', count: results.value.users.length },
])

function doSearch() {
  const q = route.query.q || ''
  if (q) searchStore.search(q)
}

onMounted(doSearch)
watch(() => route.query.q, doSearch)
</script>

<style scoped>
.search-page {
  max-width: 1100px;
  margin: 0 auto;
}

.search-header {
  margin-bottom: 24px;
}

.search-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.search-header p {
  font-size: 14px;
  color: var(--text-secondary);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0 12px;
}

.section-title:first-of-type {
  margin-top: 0;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition);
}

.user-row:hover {
  box-shadow: var(--shadow-sm);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
}

.user-bio {
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-followers {
  font-size: 12px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-tertiary);
}

.empty-state p {
  margin-top: 12px;
  font-size: 15px;
}
</style>
