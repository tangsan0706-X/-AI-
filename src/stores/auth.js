import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, setItem, removeItem } from '../utils/localStorage'

export const useAuthStore = defineStore('auth', () => {
  const showModal = ref(false)
  const modalMode = ref('login') // 'login' | 'register'
  const user = ref(getItem('user', null))

  const isLoggedIn = computed(() => !!user.value)

  function openLogin() {
    modalMode.value = 'login'
    showModal.value = true
  }

  function openRegister() {
    modalMode.value = 'register'
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  function login(userData) {
    user.value = userData
    setItem('user', userData)
    showModal.value = false
  }

  function logout() {
    user.value = null
    removeItem('user')
  }

  return { showModal, modalMode, user, isLoggedIn, openLogin, openRegister, closeModal, login, logout }
})
