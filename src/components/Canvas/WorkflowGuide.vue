<template>
  <Teleport to="body">
    <div v-if="visible" class="guide-overlay" @click="$emit('close')">
      <div class="guide-card" @click.stop>
        <div class="guide-header">
          <h3>🎬 示例工作流说明</h3>
          <button class="close-btn" @click="$emit('close')">×</button>
        </div>

        <div class="guide-content">
          <h4>当前工作流：文本生成动态视频</h4>

          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <strong>文本输入</strong>
                <p>输入提示词："一只可爱的橘猫在樱花树下玩耍，阳光明媚，动漫风格"</p>
              </div>
            </div>

            <div class="step-arrow">↓</div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <strong>AI 文生图</strong>
                <p>使用 DashScope API 根据文字生成静态图片</p>
              </div>
            </div>

            <div class="step-arrow">↓</div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <strong>AI 图生视频</strong>
                <p>将生成的图片转换为动态视频</p>
              </div>
            </div>

            <div class="step-arrow">↓</div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <strong>输出</strong>
                <p>导出最终的 MP4 视频文件</p>
              </div>
            </div>
          </div>

          <div class="guide-tips">
            <h5>💡 使用提示</h5>
            <ul>
              <li><strong>设置 API Key：</strong> 首次运行需要设置 DashScope API Key</li>
              <li><strong>修改提示词：</strong> 点击"文本输入"节点，在右侧面板修改提示词</li>
              <li><strong>调整参数：</strong> 点击任意节点查看和修改参数</li>
              <li><strong>运行工作流：</strong> 点击顶部工具栏的"▶ 运行"按钮</li>
              <li><strong>查看结果：</strong> 节点执行完成后会显示状态（成功/失败）</li>
            </ul>
          </div>

          <div class="guide-actions">
            <button class="btn btn-primary" @click="$emit('close')">开始使用</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: Boolean
})
defineEmits(['close'])
</script>

<style scoped>
.guide-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.guide-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  width: 600px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.guide-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

.guide-header h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  line-height: 1;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  transition: all var(--transition);
}

.close-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.guide-content {
  padding: 24px;
}

.guide-content h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: var(--accent);
}

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.step-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.step-content {
  flex: 1;
}

.step-content strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.step-content p {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.step-arrow {
  text-align: center;
  font-size: 20px;
  color: var(--accent);
  margin: 0;
  line-height: 1;
}

.guide-tips {
  background: linear-gradient(135deg, rgba(89, 97, 249, 0.1), rgba(238, 154, 229, 0.1));
  border: 1px solid rgba(89, 97, 249, 0.3);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-bottom: 20px;
}

.guide-tips h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text-primary);
}

.guide-tips ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.guide-tips li {
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-secondary);
  position: relative;
  padding-left: 4px;
}

.guide-tips li::before {
  content: "•";
  position: absolute;
  left: -16px;
  color: var(--accent);
  font-weight: 700;
}

.guide-tips li strong {
  color: var(--text-primary);
}

.guide-actions {
  display: flex;
  justify-content: center;
}
</style>
