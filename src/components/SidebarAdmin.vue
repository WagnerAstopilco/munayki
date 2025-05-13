<template>
  <div :class="['sidebar', { mobile: isMobile, hidden: !props.sidebarVisible }]"
    :style="{ left: props.sidebarVisible ? '0' : isMobile ? '-100%' : '0' }">
    <div class="logo text-center py-3">
      <img src="@/assets/images/logo.png" alt="Logo" width="100">
    </div>
    <router-link to="/admin/dashboard" class="nav-link-custom" active-class="active">
      <i class="bi bi-speedometer2 me-2" />Dashboard
    </router-link>
    <router-link to="/admin/banners" class="nav-link-custom" active-class="active">
      <i class="bi bi-images me-2" />Banners
    </router-link>
    <router-link to="/admin/tours" class="nav-link-custom" active-class="active">
      <i class="bi bi-map me-2" />Tours
    </router-link>
    <router-link to="/admin/categorias" class="nav-link-custom" active-class="active">
      <i class="bi bi-tags me-2" />Categorias
    </router-link>
    <router-link to="/admin/destinos" class="nav-link-custom" active-class="active">
      <i class="bi bi-geo-alt me-2" />Destinos
    </router-link>
    <router-link to="/admin/actividades" class="nav-link-custom" active-class="active">
      <i class="bi bi-calendar-event me-2" />Actividades
    </router-link>
    <router-link to="/admin/promociones" class="nav-link-custom" active-class="active">
      <i class="bi bi-megaphone me-2" />Promociones
    </router-link>
    <router-link to="/admin/cupones" class="nav-link-custom" active-class="active">
      <i class="bi bi-ticket-perforated me-2"/>Cupones
    </router-link>
    <router-link to="/admin/usuarios" class="nav-link-custom" active-class="active">
      <i class="bi bi-people me-2" />Usuarios
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props=defineProps({sidebarVisible:Boolean})
const isMobile = ref(false)
const active = ref('dashboard')

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  background-color: #002E4D;
  color: #fefefe;
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.sidebar.mobile {
  z-index: 2000;
}

a {
  text-decoration: none;
  color: #fefefe;
}

.nav-link-custom {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.nav-link-custom:hover,
.nav-link-custom.active {
  background-color: #007B6E;
  color: #02F5BD;
}
</style>
