<template>
    <div class="card">
        <div class="position-relative" @click="$router.push(`/tours${tour.slug}`)" style="cursor: pointer;">
            <img :src="getImagenUrl(tour.images[0].url)" class="card-img-top img-cover" :alt="tour.nombre">
            <div class="overlay-gradient d-flex flex-column justify-content-end p-2">
                <div class="info-overlay">
                <div class="mb-2" v-if="ratingTour > 0">
                    <span class="text-warning">
                    <i v-for="n in Math.floor(ratingTour)" :key="'full-' + n" class="bi bi-star-fill"></i>
                    <i v-if="ratingTour % 1 >= 0.5" class="bi bi-star-half"></i>
                    <i v-for="n in (5 - Math.ceil(ratingTour))" :key="'empty-' + n" class="bi bi-star"></i>
                    </span>
                </div>
                <div class="mb-2" v-else>
                    <span class="text-warning">
                    <i v-for="n in 5" :key="'empty-' + n" class="bi bi-star"></i>
                    </span>
                </div>

                <h5 class="mb-1 fw-bold h6">
                    {{ tour.name }}
                </h5>
                <p class="mb-2" style="font-size: 0.9em;">
                    <i class="bi bi-geo-alt-fill me-1"></i> {{tour.destino.place}}, {{tour.destino.country.toUpperCase()}}
                </p>
                <span class="fw-bold fs-6">Desde S/ {{ tour.price_PEN }}</span>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex w-100 gap-2">
                        <a :href="`/tours${tour.slug}`" class="btn btn-success btn-sm w-50 d-flex align-items-center justify-content-center">
                            VER MÁS
                        </a>
                        <a :href="`https://wa.me/51940055540?text=Estoy%20interesado%20en%20el%20tour:%20${encodeURIComponent(tour.name)}`" target="_blank"
                            class="btn btn-success btn-sm w-50 d-flex align-items-center justify-content-center">
                            <i class="bi bi-whatsapp me-1"></i>
                        </a>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref, onMounted } from 'vue'

/* eslint-disable vue/no-setup-props-destructure */
const { tour } = defineProps({
  tour: Object,
})

const ratingTour=ref({})

const obtenerPuntuacion = () => {
  let suma = 0;
  if (tour.ratings && tour.ratings.length > 0) {
    for (const rating of tour.ratings) {
      suma += rating.value;
    }
    ratingTour.value = suma / tour.ratings.length;
  } else {
    ratingTour.value = 0;
  }
};

const getImagenUrl = (imagen) => {
    if (imagen) {
        return process.env.VUE_APP_API_URL + "/storage/" + imagen;
    }
}

onMounted(()=>{
    obtenerPuntuacion()
})
</script>

<style scoped>
.card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
}

.card .card-img-top {
    border-radius: 1rem 1rem 0 0;
}

.card .overlay-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.351) 50%, rgb(0, 0, 0) 100%);
}

.card .info-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
}

</style>