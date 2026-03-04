<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-btn" @click="open = !open">
      <Bell :size="20" />
      <span v-if="store.unreadCount > 0" class="bell-badge">{{ store.unreadCount > 9 ? '9+' : store.unreadCount }}</span>
    </button>
    <transition name="fade">
      <div v-if="open" class="bell-dropdown">
        <div class="bell-header">
          <span class="bell-title">通知</span>
          <button class="btn btn-ghost btn-sm" @click="store.markAllAsRead()">全部已读</button>
        </div>
        <div class="bell-list">
          <NotificationItem
            v-for="n in store.notifications.slice(0, 5)"
            :key="n.id"
            :notification="n"
            :isRead="store.isRead(n.id)"
            @click="handleClick(n)"
          />
        </div>
        <router-link to="/messages" class="bell-footer" @click="open = false">
          查看全部通知
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Bell } from 'lucide-vue-next'
import NotificationItem from './NotificationItem.vue'
import { useNotificationStore } from '../../stores/notification'

const store = useNotificationStore()
const open = ref(false)
const bellRef = ref(null)

function handleClick(n) {
  store.markAsRead(n.id)
}

function onClickOutside(e) {
  if (bellRef.value && !bellRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.notification-bell {
  position: relative;
}

.bell-btn {
  position: relative;
  padding: 6px;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition);
}

.bell-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.bell-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  background: var(--danger);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.bell-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 360px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 200;
}

.bell-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
}

.bell-title {
  font-size: 15px;
  font-weight: 600;
}

.bell-list {
  max-height: 320px;
  overflow-y: auto;
}

.bell-footer {
  display: block;
  text-align: center;
  padding: 12px;
  font-size: 13px;
  color: var(--accent);
  border-top: 1px solid var(--border-color);
  transition: background var(--transition);
}

.bell-footer:hover {
  background: var(--bg-hover);
}
</style>
