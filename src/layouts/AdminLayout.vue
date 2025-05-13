<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <Sidebar :sidebar-visible="sidebarVisible" />

    <!-- Contenido principal -->
    <div :class="['main-content', { expanded: !sidebarVisible }]" @click="closeSidebarOnMobile">
      <!-- Barra superior -->

      <div class=" d-flex justify-content-between align-items-center p-3 background-verdeopaco m-4 rounded-3">
        <i class="bi bi-list toggle-btn" @click="toggleSidebar" />


        <button class="btn btn-nema mt-auto">
          Inciar Sesión
        </button>
      </div>

      <!-- Vista principal -->
      <div class="container-fluid mt-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/SidebarAdmin.vue'
const sidebarVisible = ref(true)

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const closeSidebarOnMobile = () => {
  if (window.innerWidth <= 768) {
    sidebarVisible.value = false
  }
}
</script>

<style scoped>
.main-content {
  transition: all 0.3s ease;
  margin-left: 220px;
  width: 100%;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 0;
}

.main-content.expanded {
  margin-left: 0;
}

.topbar {
  background-color: #002E4D;
  border-bottom: 1px solid var(--color-verde) !important;
}

.toggle-btn {
  font-size: 1.8rem;
  color: black;
  cursor: pointer;
}

.hidden {
  display: none !important;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0 !important;
  }
}
</style>