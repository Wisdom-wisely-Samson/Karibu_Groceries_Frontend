<!-- src/components/Toast.vue -->
<template>
  <transition name="fade">
    <div v-if="visible" class="toast">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')

function showToast(msg) {
  message.value = msg
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000) // auto-hide after 3s
}

defineExpose({ showToast })
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  z-index: 2000;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
