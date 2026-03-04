import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, setItem } from '../utils/localStorage'
import { mockNotifications } from '../data/mockNotifications'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref(getItem('notifications', mockNotifications))
  const readIds = ref(getItem('readIds', []))

  const unreadCount = computed(() =>
    notifications.value.filter(n => !readIds.value.includes(n.id)).length
  )

  function markAsRead(id) {
    if (!readIds.value.includes(id)) {
      readIds.value.push(id)
      setItem('readIds', readIds.value)
    }
  }

  function markAllAsRead() {
    readIds.value = notifications.value.map(n => n.id)
    setItem('readIds', readIds.value)
  }

  function isRead(id) {
    return readIds.value.includes(id)
  }

  function addNotification(notification) {
    const id = Date.now()
    notifications.value.unshift({ id, ...notification, time: '刚刚' })
    setItem('notifications', notifications.value)
  }

  return { notifications, unreadCount, markAsRead, markAllAsRead, isRead, addNotification }
})
