<template>
    <div class="">
        <div class="row align-items-center justify-content-center bg-success text-white" style="height: 200px;">

        </div>

        <div class="container mt-4">
            <div class="row g-4">
                <!-- Carrusel -->
                <div class="col-md-7">
                    <div id="carouselTourImages" class="carousel slide" data-bs-ride="carousel" ref="carouselRef">
                        <div class="carousel-inner rounded-4 overflow-hidden">
                            <div v-for="(img, i) in images" :key="i" class="carousel-item" :class="{ active: i === 0 }">
                                <img :src="img" class="d-block w-100" alt="Imagen del tour" />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselTourImages"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselTourImages"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                        <img v-for="(img, i) in images" :key="i" :src="img" @click="goToSlide(i)"
                            :class="['me-2 rounded-2 border border-light preview',{ 'border-primary border-2 scale-up': i === activeIndex } ]"
                            style="width: 70px; height: 50px; object-fit: cover; cursor: pointer" />
                    </div>
                </div>

                <!-- Detalles -->
                <div class="col-md-5 card p-4">
                    <h4 class="fw-bold">Ayacucho 03D/02N</h4>
                    <p class="text-muted mb-1"><i class="bi bi-geo-alt-fill text-warning"></i> Ayacucho, Perú</p>
                    <button class="btn btn-warning btn-sm mb-3">Descargar Brochure</button>

                    <p class="fw-semibold mb-1">Precio por persona:</p>
                    <p class="fs-3 fw-bold text-danger">S/ 430.00</p>
                    <hr>
                    <div class="mb-3">
                        <p class="fw-bold mb-1">Incluye</p>
                        <div class="d-flex gap-3">
                            <i class="bi bi-building fs-4"></i>
                            <i class="bi bi-emoji-smile fs-4"></i>
                            <i class="bi bi-bus-front fs-4"></i>
                            <i class="bi bi-cup-straw fs-4"></i>
                        </div>
                    </div>

                    <p class="fw-bold mb-0">Actividades</p>
                    <p class="text-muted small">
                        Caminatas / Complejo arqueológico / Museos / Naturaleza / Textilería
                    </p>

                    <p class="fw-bold mb-0">Categoría</p>
                    <p class="text-muted small">Destinos Nacionales</p>
                    <hr>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-warning fw-bold">Reservar Ahora</button>
                        <a href="#" class="btn btn-success fw-bold">Por WhatsApp</a>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="mt-5">
                <ul class="nav nav-pills mb-3 justify-content-center gap-2" id="tourTabs">
                    <li class="nav-item" v-for="(tab, i) in tabs" :key="i">
                        <button class="nav-link" :class="{ active: currentTab === tab.name }"
                            @click="currentTab = tab.name">
                            {{ tab.label }}
                        </button>
                    </li>
                </ul>
                <div class="tab-content bg-light p-4 rounded">
                    <div v-if="currentTab === 'itinerario'">
                        <ul>
                            <li><strong>Día 01:</strong> City Tour</li>
                            <li><strong>Día 02:</strong> Millpu - Aguas Turquesas</li>
                            <li><strong>Día 03:</strong> Vilcashuamán - Intihuatana</li>
                        </ul>
                    </div>
                    <div v-else-if="currentTab === 'incluye'"  id="incluye">
                        <div class="container">
                            <QuillEditor theme="snow" toolbar="full" />
                            <p>Transporte, hotel, guía, desayuno, entradas.</p>

                        </div>
                    </div>
                    <div v-else-if="currentTab === 'metodos'">
                        <p>Transferencias, Yape, Plin, tarjeta crédito/débito.</p>
                    </div>
                    <div v-else-if="currentTab === 'requisitos'" id="requisitos">
                        <QuillEditor theme="snow" />
                        <p>Documento de identidad, buen estado físico, ropa ligera.</p>
                    </div>
                    <div v-else-if="currentTab === 'descripcion'" id="descripcion">
                        <QuillEditor theme="snow" />
                        <p>Descubre Ayacucho en un viaje de 3 días lleno de historia, naturaleza y cultura viva.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Carousel } from 'bootstrap'
import {QuillEditor} from '@vueup/vue-quill'

const carouselRef = ref(null)
const activeIndex = ref(0)

const currentTab = ref('itinerario')


const tabs = [
  { name: 'itinerario', label: 'Itinerario' },
  { name: 'incluye', label: 'Incluye' },
  { name: 'metodos', label: 'Métodos de pago' },
  { name: 'requisitos', label: 'Requisitos' },
  { name: 'descripcion', label: 'Descripción' }
]


const images = [
    'https://i.ibb.co/1Zc7z5t/aya1.jpg',
    'https://i.ibb.co/dPbrnJ9/aya2.jpg',
    'https://i.ibb.co/tswRMrf/aya3.jpg',
    'https://i.ibb.co/0pFkbNb/aya4.jpg',
    'https://i.ibb.co/MBXHH7J/aya5.jpg'
]



const goToSlide = (index) => {
  const bsCarousel = Carousel.getInstance(carouselRef.value) || new Carousel(carouselRef.value)
  bsCarousel.to(index)
  activeIndex.value = index
}

onMounted(() => {
  const bsCarousel = new Carousel(carouselRef.value)

  carouselRef.value.addEventListener('slid.bs.carousel', (e) => {
    activeIndex.value = e.to // índice de la nueva imagen activa
  })
})
</script>

<style scoped>
.carousel-inner img {
    height: 400px;
    object-fit: cover;
}

.nav-pills .nav-link.active {
    background-color: #ffc107;
    color: #000;
    font-weight: bold;
}

.preview {
  transition: transform 0.3s ease;
}

.preview:hover {
  transform: scale(1.05);
}
.scale-up {
  transform: scale(1.5);
  transition: transform 0.3s ease;
  z-index: 1;
}
</style>