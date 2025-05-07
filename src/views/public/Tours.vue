<template>
    <div>
        <div class="row align-items-center justify-content-center bg-dark text-white" style="height: 200px;"></div>
        <div class="container">
            <section class="full-screen mb-4">
              
                <div class="row g-4 p-5">
                    <div class="col-12 col-sm-6 col-md-3" v-for="(tour, index) in toursFavoritos" :key="index">
                        <div class="card tour-card border-0 shadow-sm h-100 text-white">
                            <div class="position-relative">
                                <img :src="tour.imagen" class="card-img-top img-cover" :alt="tour.nombre">
                                <div class="overlay-gradient d-flex flex-column justify-content-end p-3">
                                    <div class="mb-2">
                                        <span class="text-warning">★★★★★</span>
                                    </div>
                                    <h5 class="mb-1 fw-bold">
                                        {{ tour.nombre }}
                                    </h5>
                                    <p class="mb-2">
                                        <i class="bi bi-geo-alt-fill me-1" /> Ayacucho, Perú
                                    </p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <a href="/tours/1"
                                            class="btn btn-success btn-sm d-flex align-items-center">
                                            VER MÁS
                                        </a>
                                        <a href="https://wa.me/tu_numero" target="_blank"
                                            class="btn btn-success btn-sm d-flex align-items-center">
                                            <i class="bi bi-whatsapp me-1" />
                                        </a>
                                        <span class="fw-bold fs-5">Desde S/ {{ tour.precio }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
const toursFavoritos = [
    { nombre: 'Cusco Mágico', precio: '999', imagen: '/images/toursFavoritos/cusco.png' },
    { nombre: 'Arequipa Blanca', precio: '850', imagen: '/images/toursFavoritos/arequipa.png' },
    { nombre: 'Selva Viva', precio: '780', imagen: '/images/toursFavoritos/selva.png' },
    { nombre: 'Colca Adventure', precio: '720', imagen: '/images/toursFavoritos/colca.png' },
    { nombre: 'Lima City Tour', precio: '500', imagen: '/images/toursFavoritos/lima.png' },
    { nombre: 'Puno Encantado', precio: '890', imagen: '/images/toursFavoritos/puno.png' },
    { nombre: 'Huaraz Trekking', precio: '950', imagen: '/images/toursFavoritos/huaraz.png' },
    { nombre: 'Paracas & Ica', precio: '690', imagen: '/images/toursFavoritos/paracas.png' }
]

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
