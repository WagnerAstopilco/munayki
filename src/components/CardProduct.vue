<template>
    <div class="card">
        <div class="position-relative">
                <img :src="tour.imagen" class="card-img-top img-cover" :alt="tour.nombre">
                <div class="overlay-gradient d-flex flex-column justify-content-end p-3">
                    <div class="info-overlay">
                        <div class="mb-2">
                            <span class="text-warning">★★★★★</span>
                        </div>
                        <h5 class="mb-1 fw-bold">
                            {{ tour.nombre }}
                        </h5>
                        <p class="mb-2">
                            <i class="bi bi-geo-alt-fill me-1"></i> Ayacucho, Perú
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex gap-2">
                                <a href="/tours/full-day/producto" class="btn btn-success btn-sm d-flex align-items-center ">
                                    VER MÁS
                                </a>
                                <a href="https://wa.me/51940055540" target="_blank"
                                    class="btn btn-success btn-sm d-flex align-items-center img-fluid">
                                    <i class="bi bi-whatsapp me-1"></i>
                                </a>
                            </div>
                            <span class="fw-bold fs-5">Desde S/ {{ tour.precio }}</span>
                        </div>
                    </div>
                </div>
        </div>
    </div>


</template>

<script setup>
defineProps({
    tour: Object,
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
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
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