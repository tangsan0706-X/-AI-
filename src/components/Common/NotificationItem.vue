<template>
  <div :class="['notification-item', { unread: !isRead }]" @click="$emit('click')">
    <div class="notif-icon" :style="{ background: iconBg }">
      <component :is="iconComp" :size="14" />
    </div>
    <div class="notif-body">
      <div class="notif-title">{{ notification.title }}</div>
      <div v-if="notification.content" class="notif-content">{{ notification.content }}</div>
      <div class="notif-time">{{ notification.time }}</div>
    </div>
    <div v-if="!isRead" class="notif-dot" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Heart, GitFork, UserPlus, MessageCircle, Info } from 'lucide-vue-next'

const props = defineProps({
  notification: Object,
  isRead: Boolean
})

defineEmits(['click'])

const iconMap = {
  like: { icon: Heart, bg: 'rgba(239,68,68,0.1)' },
  fork: { icon: GitFork, bg: 'rgba(89,97,249,0.1)' },
  follow: { icon: UserPlus, bg: 'rgba(16,185,129,0.1)' },
  comment: { icon: MessageCircle, bg: 'rgba(245,158,11,0.1)' },
  system: { icon: Info, bg: 'rgba(139,92,246,0.1)' },
}

const iconComp = computed(() => (iconMap[props.notification.type] || iconMap.system).icon)
const iconBg = computed(() => (iconMap[props.notification.type] || iconMap.system).bg)
</script>

<style scoped>
.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background var(--transition);
}

.notification-item:hover {
  background: var(--bg-hover);
}

.notification-item.unread {
  background: var(--accent-light);
}

.notif-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text-primary);
}

.notif-body {
  flex: 1;
  min-width: 0;
}

.notif-title {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
}

.notif-content {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notif-time {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.notif-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 4px;
}
</style>
