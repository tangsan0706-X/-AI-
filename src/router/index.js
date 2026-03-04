import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/Home.vue') },
  { path: '/discover', name: 'Discover', component: () => import('../pages/Discover.vue') },
  { path: '/workflow', name: 'Workflow', component: () => import('../pages/Workflow.vue') },
  { path: '/templates', name: 'Templates', component: () => import('../pages/Templates.vue') },
  { path: '/video/:id', name: 'VideoDetail', component: () => import('../pages/VideoDetail.vue') },
  { path: '/trending', name: 'Trending', component: () => import('../pages/Trending.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../pages/Profile.vue') },
  { path: '/canvas/:id?', name: 'Canvas', component: () => import('../pages/Canvas.vue'), meta: { fullscreen: true } },
  { path: '/create', name: 'Create', component: () => import('../pages/Create.vue') },
  { path: '/publish', name: 'Publish', component: () => import('../pages/Publish.vue') },
  { path: '/resources', name: 'Resources', component: () => import('../pages/Resources.vue') },
  { path: '/search', name: 'Search', component: () => import('../pages/Search.vue') },
  { path: '/messages', name: 'Messages', component: () => import('../pages/Messages.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
