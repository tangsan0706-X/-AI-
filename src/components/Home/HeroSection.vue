<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-glow glow-1" />
      <div class="hero-glow glow-2" />
    </div>
    <div class="hero-content">
      <span class="hero-badge">
        <Sparkles :size="14" /> 开源 · 共创 · 免费
      </span>
      <h1 class="hero-title">
        AI视频<span class="gradient-text">开源社区</span>
      </h1>
      <p class="hero-subtitle">
        发现、分享、Fork优质AI视频工作流。<br />
        一键复用创作者的完整参数，让AI视频创作触手可及。
      </p>
      <div class="hero-actions">
        <router-link to="/workflow" class="btn btn-primary btn-lg">
          <Zap :size="18" /> 开始创作
        </router-link>
        <router-link to="/discover" class="btn btn-outline btn-lg">
          <Play :size="18" /> 浏览作品
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Sparkles, Zap, Play } from 'lucide-vue-next'
</script>

<style scoped>
.hero {
  position: relative;
  padding: 60px 20px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #0d0d2b 0%, #1a1a3e 50%, #2d1a3e 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: #5961f9;
  top: -100px;
  right: -50px;
}

.glow-2 {
  width: 300px;
  height: 300px;
  background: #ee9ae5;
  bottom: -80px;
  left: -30px;
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(89, 97, 249, 0.2);
  border: 1px solid rgba(89, 97, 249, 0.3);
  border-radius: 20px;
  font-size: 13px;
  color: #b8bbff;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 44px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 16px;
}

.gradient-text {
  background: linear-gradient(135deg, #5961f9, #ee9ae5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 16px;
  color: #9ca3bf;
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-actions .btn-outline {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.hero-actions .btn-outline:hover {
  border-color: #ee9ae5;
  color: #ee9ae5;
  background: rgba(238, 154, 229, 0.1);
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 16px;
  }
  .hero-title {
    font-size: 28px;
  }
  .hero-subtitle {
    font-size: 14px;
  }
}
</style>
