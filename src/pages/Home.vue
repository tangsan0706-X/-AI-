<template>
  <div class="home-page">
    <HeroSection />
    <StatsBar />

    <section class="section">
      <div class="section-header">
        <h2>精选视频作品</h2>
        <router-link to="/discover" class="btn btn-ghost btn-sm">
          查看全部 <ArrowRight :size="14" />
        </router-link>
      </div>
      <div class="grid-3">
        <VideoCard v-for="video in featuredVideos" :key="video.id" :video="video" />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>热门工作流</h2>
        <router-link to="/workflow" class="btn btn-ghost btn-sm">
          查看全部 <ArrowRight :size="14" />
        </router-link>
      </div>
      <div class="workflow-scroll">
        <WorkflowCard v-for="wf in workflows.slice(0, 4)" :key="wf.id" :workflow="wf" />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>分类入口</h2>
      </div>
      <div class="grid-categories">
        <CategoryCard v-for="cat in categories" :key="cat.id" :category="cat" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import HeroSection from '../components/Home/HeroSection.vue'
import StatsBar from '../components/Home/StatsBar.vue'
import VideoCard from '../components/Common/VideoCard.vue'
import WorkflowCard from '../components/Common/WorkflowCard.vue'
import CategoryCard from '../components/Common/CategoryCard.vue'
import { videos, workflows, categories } from '../data/mock'

const featuredVideos = computed(() => videos.slice(0, 6))
</script>

<style scoped>
.home-page {
  max-width: 1100px;
  margin: 0 auto;
}

.section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
}

.workflow-scroll {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.grid-categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .workflow-scroll {
    grid-template-columns: 1fr;
  }
  .grid-categories {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-categories {
    grid-template-columns: 1fr;
  }
}
</style>
