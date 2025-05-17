<template>
  <transition name="fade">
    <div
      v-if="show"
      class="modal-backdrop"
      @click.self="onClose"
    >
      <div class="modal-card animate__animated animate__fadeInDown">
        <button class="close-button" @click="onClose" aria-label="Cerrar">x</button>
        
        <slot />
      </div>
    </div>
  </transition>
</template>
  
  <script setup lang="ts">
  defineProps<{
    show: boolean
    onClose: () => void
  }>()
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.764);
    width: 100%;
    height: 100%;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-card {
  background-color: #fbfcfd;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh; 
  overflow-y: auto; 
}

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .close-button {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 24px;
  background: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  z-index: 10;
}

  </style>
  