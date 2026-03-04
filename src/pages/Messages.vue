<template>
  <div class="messages-page">
    <div class="page-header">
      <div>
        <h1>消息中心</h1>
        <p>{{ store.unreadCount }} 条未读消息</p>
      </div>
      <button class="btn btn-outline btn-sm" @click="store.markAllAsRead()">
        <CheckCheck :size="16" /> 全部已读
      </button>
    </div>

    <div class="message-filters">
      <button
        v-for="f in filters"
        :key="f.key"
        :class="['filter-btn', { active: activeFilter === f.key }]"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="message-list">
      <NotificationItem
        v-for="n in filteredNotifications"
        :key="n.id"
        :notification="n"
        :isRead="store.isRead(n.id)"
        @click="store.markAsRead(n.id)"
      />
    </div>

    <div v-if="filteredNotifications.length === 0" class="empty-state">
      <Inbox :size="48" />
      <p>暂无消息</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CheckCheck, Inbox } from 'lucide-vue-next'
import NotificationItem from '../components/Common/NotificationItem.vue'
import { useNotificationStore } from '../stores/notification'

const store = useNotificationStore()
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: '全部' },
  { key: 'like', label: '点赞' },
  { key: 'fork', label: 'Fork' },
  { key: 'comment', label: '评论' },
  { key: 'follow', label: '关注' },
  { key: 'system', label: '系统' },
]

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') return store.notifications
  return store.notifications.filter(n => n.type === activeFilter.value)
})
</script>

<style scoped>
.messages-page {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

.message-filters {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 20px;
  color: var(--text-secondary);
  background: var(--bg-hover);
  transition: all var(--transition);
}

.filter-btn:hover {
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent);
  color: #fff;
}

.message-list {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
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
