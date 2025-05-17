<template>
    <div>
        <div class="row align-items-center justify-content-center bg-dark text-white" style="height: 200px;"></div>
        <div class="container">
            <section class="full-screen mb-4">
                <div class="row g-4 p-5">                    
<h5>{{name}}</h5>
                    <div class="col-12 col-md-3" v-for="(tour, index) in tours" :key="index">
                        <TourCard :tour="tour" class="img-fluid" />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted,watch } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import ProductoService from '../../services/ProductoService'
import TourCard from '@/components/CardProduct.vue'
const route = useRoute()
let res
const tours=ref({})

const name = computed(() => {
  return route.params.category?.replaceAll('-', ' ') || ''
})
watch(name, () => {
  obtenerTours()
})


const obtenerTours=async()=>{
    res = await ProductoService.getProductos();
    if (name.value.toLowerCase() === 'todos') {
    tours.value = res.data.data
  } else {
    tours.value = res.data.data.filter(producto => producto.category.name.toLowerCase() === name.value.toLowerCase())
  }
    // tours.value=res.data.data.filter(producto=>producto.category.name===name.value)
}


onMounted(() => {
  obtenerTours();
})  
</script>

<style scoped>
.full-screen {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.hover-shadow:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

.carousel-indicators button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    margin: 0 6px;
    transition: background-color 0.3s ease;
}

.carousel-indicators .active {
    background-color: #ffc107;
    width: 30px;
    height: 30px;
}

.carousel-item img {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
}

.oferta-card {
    height: 300px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
}

.oferta-card a {
    display: block;
    height: 100%;
    width: 100%;
}

.oferta-card .card-img-overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0;
}

.oferta-card .card-title,
.oferta-card .card-text {
    margin: 0;
}

.destino-card {
    height: 180px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.destino-card:hover {
    transform: scale(1.03);
}

.destino-nombre {
    position: absolute;
    bottom: 10px;
    left: 15px;
    font-size: 1.2rem;
    text-shadow: 1px 1px 3px #000;
}

.object-cover {
    object-fit: cover;
}

.img-fluid {
    transition: transform 0.3s ease;
}

.img-fluid:hover {
    transform: scale(1.03);
}

.contacto-card {
    background: linear-gradient(135deg, #44d62c 0%, #1E7F61 100%) !important;
    color: black;
    border: none;
    border-radius: 1rem;
}

.contacto-card .card-body {
    background: linear-gradient(135deg, #44d62c 0%, #09c18c 100%) !important;
    border-radius: 0.75rem;
    padding: 1.5rem;
    transition: transform 0.3s ease;
}

.contacto-card .card-body:hover {
    background: linear-gradient(135deg, #09c18c 0%, #09c18c 100%) !important;
    border-radius: 0.75rem;
    padding: 1.5rem;
    transform: scale(1.03);
}

.icon-circle {
    width: 90px;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
}
</style>



