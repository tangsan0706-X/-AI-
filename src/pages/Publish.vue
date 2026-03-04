<template>
  <div class="publish-page">
    <div class="page-header">
      <h1>发布作品</h1>
      <p>分享你的AI创作给社区</p>
    </div>

    <div class="publish-layout">
      <div class="publish-main">
        <PublishForm @publish="handlePublish" @saveDraft="handleSaveDraft" />
      </div>

      <aside class="publish-sidebar">
        <div class="drafts-section" v-if="publishStore.drafts.length > 0">
          <h3>草稿箱 ({{ publishStore.drafts.length }})</h3>
          <div class="draft-list">
            <div v-for="draft in publishStore.drafts" :key="draft.id" class="draft-item">
              <div class="draft-info">
                <span class="draft-title">{{ draft.title || '未命名草稿' }}</span>
                <span class="draft-time">{{ formatTime(draft.updatedAt) }}</span>
              </div>
              <button class="btn btn-ghost btn-sm" @click="publishStore.removeDraft(draft.id)">
                <Trash2 :size="14" />
              </button>
            </div>
          </div>
        </div>

        <div class="tips-section">
          <h3>发布提示</h3>
          <ul>
            <li>标题应简洁明了，不超过50字</li>
            <li>提供完整的提示词和参数，方便他人复现</li>
            <li>添加合适的标签和分类，增加曝光</li>
            <li>上传高质量封面图，吸引更多浏览</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import PublishForm from '../components/Publish/PublishForm.vue'
import { usePublishStore } from '../stores/publish'
import { useNotificationStore } from '../stores/notification'

const router = useRouter()
const publishStore = usePublishStore()
const notificationStore = useNotificationStore()

function handlePublish(form) {
  if (!form.title.trim()) return alert('请输入作品标题')
  const id = publishStore.publishWork(form)
  notificationStore.addNotification({
    type: 'system',
    title: '发布成功',
    content: `你的作品"${form.title}"已发布到社区`
  })
  router.push('/profile')
}

function handleSaveDraft(form) {
  publishStore.saveDraft(form)
}

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}
</script>

<style scoped>
.publish-page {
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.page-header p {
  font-size: 14px;
  color: var(--text-secondary);
}

.publish-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

.publish-main {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.publish-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drafts-section,
.tips-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px;
}

.drafts-section h3,
.tips-section h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
}

.draft-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.draft-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: var(--radius-md);
  transition: background var(--transition);
}

.draft-item:hover {
  background: var(--bg-hover);
}

.draft-title {
  font-size: 13px;
  font-weight: 500;
}

.draft-time {
  font-size: 11px;
  color: var(--text-tertiary);
  display: block;
}

.tips-section ul {
  padding-left: 16px;
  list-style: disc;
}

.tips-section li {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 2;
}

@media (max-width: 1024px) {
  .publish-layout {
    grid-template-columns: 1fr;
  }
}
</style>
