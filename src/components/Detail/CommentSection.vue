<template>
  <div class="comments-section">
    <h3 class="section-title">
      <MessageSquare :size="18" /> 评论 ({{ comments.length }})
    </h3>

    <div class="comment-input">
      <UserAvatar name="我" :size="32" />
      <div class="input-wrapper">
        <input type="text" v-model="newComment" placeholder="写下你的评论..." @keyup.enter="addComment" />
        <button class="btn btn-primary btn-sm" @click="addComment" :disabled="!newComment.trim()">发送</button>
      </div>
    </div>

    <div class="comment-list">
      <div class="comment-item" v-for="comment in allComments" :key="comment.id">
        <UserAvatar :name="comment.user.name" :size="36" />
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-author">{{ comment.user.name }}</span>
            <span class="comment-time">{{ comment.time }}</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
          <div class="comment-actions">
            <button class="action-btn" @click="comment.liked = !comment.liked">
              <Heart :size="14" :class="{ filled: comment.liked }" />
              {{ comment.likes + (comment.liked ? 1 : 0) }}
            </button>
            <button class="action-btn">
              <MessageSquare :size="14" /> 回复
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MessageSquare, Heart } from 'lucide-vue-next'
import UserAvatar from '../Common/UserAvatar.vue'

const props = defineProps({
  comments: { type: Array, default: () => [] }
})

const newComment = ref('')
const userComments = ref([])

const allComments = computed(() => [
  ...userComments.value,
  ...props.comments.map(c => ({ ...c, liked: false }))
])

function addComment() {
  if (!newComment.value.trim()) return
  userComments.value.unshift({
    id: Date.now(),
    user: { name: '我' },
    content: newComment.value,
    time: '刚刚',
    likes: 0,
    liked: false
  })
  newComment.value = ''
}
</script>

<style scoped>
.comments-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.comment-input {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.input-wrapper {
  flex: 1;
  display: flex;
  gap: 8px;
}

.input-wrapper input {
  flex: 1;
  padding: 8px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
}

.input-wrapper input:focus {
  border-color: var(--accent);
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.comment-author {
  font-size: 14px;
  font-weight: 600;
}

.comment-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.comment-content {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 8px;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-tertiary);
  transition: color var(--transition);
}

.action-btn:hover {
  color: var(--accent);
}

.filled {
  color: #ef4444;
}
</style>
