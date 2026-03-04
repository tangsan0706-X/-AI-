<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="authStore.closeModal">
      <div class="modal">
        <button class="close-btn" @click="authStore.closeModal">
          <X :size="20" />
        </button>

        <div class="modal-header">
          <div class="logo-icon">恰</div>
          <h2>{{ isLogin ? '欢迎回来' : '加入恰恰热' }}</h2>
          <p>{{ isLogin ? '登录你的账户' : '创建新账户，开始AI视频创作' }}</p>
        </div>

        <form class="modal-form" @submit.prevent="handleSubmit">
          <div v-if="!isLogin" class="form-group">
            <label>昵称</label>
            <input type="text" v-model="form.name" placeholder="输入你的昵称" />
          </div>
          <div class="form-group">
            <label>手机号 / 邮箱</label>
            <input type="text" v-model="form.account" placeholder="输入手机号或邮箱" />
          </div>
          <div class="form-group">
            <label>密码</label>
            <input type="password" v-model="form.password" placeholder="输入密码" />
          </div>
          <button type="submit" class="btn btn-primary btn-lg submit-btn">
            {{ isLogin ? '登录' : '注册' }}
          </button>
        </form>

        <div class="divider"><span>或</span></div>

        <div class="social-login">
          <button class="social-btn" v-for="s in socials" :key="s.name" :title="s.name">
            <component :is="s.icon" :size="20" />
          </button>
        </div>

        <p class="switch-mode">
          {{ isLogin ? '还没有账户？' : '已有账户？' }}
          <a @click="toggleMode">{{ isLogin ? '立即注册' : '立即登录' }}</a>
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { X, Github, Twitter, Chrome } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const isLogin = computed(() => authStore.modalMode === 'login')

const form = reactive({ name: '', account: '', password: '' })

const socials = [
  { name: 'GitHub', icon: Github },
  { name: 'Twitter', icon: Twitter },
  { name: 'Google', icon: Chrome },
]

function toggleMode() {
  authStore.modalMode = isLogin.value ? 'register' : 'login'
}

function handleSubmit() {
  authStore.login({
    id: 1,
    name: form.name || '用户',
    bio: 'AI视频爱好者',
    followers: 0,
    following: 0,
    works: 0
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-modal-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
}

.modal {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  color: var(--text-tertiary);
  padding: 4px;
  border-radius: var(--radius-sm);
}

.close-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.modal-header {
  text-align: center;
  margin-bottom: 24px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  margin: 0 auto 12px;
}

.modal-header h2 {
  font-size: 20px;
  margin-bottom: 4px;
}

.modal-header p {
  font-size: 14px;
  color: var(--text-secondary);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--text-secondary);
}

.form-group input {
  width: 100%;
  padding: 10px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  transition: border-color var(--transition);
}

.form-group input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.submit-btn {
  width: 100%;
  margin-top: 8px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: var(--text-tertiary);
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.social-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}

.switch-mode {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: var(--text-secondary);
}

.switch-mode a {
  color: var(--accent);
  cursor: pointer;
  font-weight: 500;
}

.switch-mode a:hover {
  text-decoration: underline;
}
</style>
