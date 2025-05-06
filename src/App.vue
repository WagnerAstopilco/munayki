<template>
  <div class="position-absolute w-100 " style="z-index: 10;">
    <MainNavbar />
  </div>  
  <router-view />
  <MainFooter />
  <FloatButtons />
</template>
<script setup>
import MainNavbar from './components/MainNavbar.vue';
import MainFooter from './components/MainFooter.vue';
import FloatButtons from './components/FloatButtons.vue';

</script>

<style>

</style>
