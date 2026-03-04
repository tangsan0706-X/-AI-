<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">
        <div class="logo-icon">恰</div>
        <span class="logo-text">恰恰热</span>
      </router-link>

      <SearchBar class="navbar-search" />

      <div class="navbar-actions">
        <router-link to="/discover" class="nav-link">发现</router-link>
        <router-link to="/workflow" class="nav-link">工作流</router-link>
        <router-link to="/create" class="nav-link nav-link-create">
          <Sparkles :size="16" />
          创作
        </router-link>
        <ThemeToggle />
        <NotificationBell v-if="authStore.isLoggedIn" />
        <template v-if="authStore.isLoggedIn">
          <router-link to="/profile" class="avatar-link">
            <UserAvatar :name="authStore.user.name" :size="32" />
          </router-link>
        </template>
        <template v-else>
          <button class="btn btn-ghost btn-sm" @click="authStore.openLogin">登录</button>
          <button class="btn btn-primary btn-sm" @click="authStore.openRegister">注册</button>
        </template>
      </div>

      <button class="mobile-menu-btn" @click="$emit('toggle-sidebar')">
        <Menu :size="22" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { Menu, Sparkles } from 'lucide-vue-next'
import SearchBar from '../Common/SearchBar.vue'
import ThemeToggle from '../Common/ThemeToggle.vue'
import UserAvatar from '../Common/UserAvatar.vue'
import NotificationBell from '../Common/NotificationBell.vue'
import { useAuthStore } from '../../stores/auth'

defineEmits(['toggle-sidebar'])
const authStore = useAuthStore()
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  background: var(--bg-navbar);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
}

.navbar-inner {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  color: var(--text-primary);
  flex-shrink: 0;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.logo-text {
  background: linear-gradient(135deg, var(--accent), var(--pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-search {
  flex: 1;
  max-width: 420px;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.nav-link {
  padding: 6px 12px;
  font-size: 14px;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent);
  background: var(--accent-light);
}

.nav-link-create {
  color: var(--accent);
  font-weight: 500;
}

.avatar-link {
  margin-left: 4px;
}

.mobile-menu-btn {
  display: none;
  padding: 6px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .navbar-search,
  .navbar-actions .nav-link {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
}
</style>
