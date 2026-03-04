<template>
  <div class="category-card card" @click="$router.push('/discover')">
    <div class="icon-wrapper" :style="{ background: category.color + '20' }">
      <component :is="iconComponent" :size="24" :style="{ color: category.color }" />
    </div>
    <h3 class="name">{{ category.name }}</h3>
    <p class="desc">{{ category.description }}</p>
    <span class="count">{{ category.count }} 个作品</span>
  </div>
</template>

<script setup>
import { Type, Image, Palette, ShoppingBag, Film, Music } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({ category: Object })

const iconMap = { Type, Image, Palette, ShoppingBag, Film, Music }
const iconComponent = computed(() => iconMap[props.category.icon] || Type)
</script>

<style scoped>
.category-card {
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.count {
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
