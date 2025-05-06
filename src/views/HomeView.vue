<template>
  <div>
    <!-- seccion carrusel -->
    <section class="position-relative full-screen">
      <!-- <div class="position-absolute w-100 " style="z-index: 10;">
        <MainNavbar />
      </div> -->
      <!-- main carrusel -->
      <div id="mainCarousel" class="carousel slide">
        <div class="carousel-indicators" style="z-index: 6;">
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="5" aria-label="Slide 6"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/images/carrusellMain/cajamarca.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
              style="z-index: 10;">
              <h2>First slide label</h2>
              <p>Some representative placeholder content for the first slide.</p>
              <div class="input-group mt-4 mx-auto" style="max-width: 600px;">
                <input type="text" class="form-control" placeholder="¿A dónde quieres ir?" />
                <button class="btn btn-warning" type="button">Buscar</button>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/carrusellMain/huaraz.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
              style="z-index: 10;">
              <h2>Second slide label</h2>
              <p>Some representative placeholder content for the second slide.</p>
              <div class="input-group mt-4 mx-auto" style="max-width: 600px;">
                <input type="text" class="form-control" placeholder="¿A dónde quieres ir?" />
                <button class="btn btn-warning" type="button">Buscar</button>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/carrusellMain/ica.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
              style="z-index: 10;">
              <h2>Third slide label</h2>
              <p>Some representative placeholder content for the third slide.</p>
              <div class="input-group mt-4 mx-auto" style="max-width: 600px;">
                <input type="text" class="form-control" placeholder="¿A dónde quieres ir?" />
                <button class="btn btn-warning" type="button">Buscar</button>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/carrusellMain/lambayeque.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
              style="z-index: 10;">
              <h2>Third slide label</h2>
              <p>Some representative placeholder content for the third slide.</p>
              <div class="input-group mt-4 mx-auto" style="max-width: 600px;">
                <input type="text" class="form-control" placeholder="¿A dónde quieres ir?" />
                <button class="btn btn-warning" type="button">Buscar</button>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/carrusellMain/piura.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
              style="z-index: 10;">
              <h2>Third slide label</h2>
              <p>Some representative placeholder content for the third slide.</p>
              <div class="input-group mt-4 mx-auto" style="max-width: 600px;">
                <input type="text" class="form-control" placeholder="¿A dónde quieres ir?" />
                <button class="btn btn-warning" type="button">Buscar</button>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/carrusellMain/tumbes.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
              style="z-index: 10;">
              <h2>Third slide label</h2>
              <p>Some representative placeholder content for the third slide.</p>
              <div class="input-group mt-4 mx-auto" style="max-width: 600px;">
                <input type="text" class="form-control" placeholder="¿A dónde quieres ir?" />
                <button class="btn btn-warning" type="button">Buscar</button>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev"
          style="z-index: 6;">
          <!-- <span class="carousel-control-prev-icon" aria-hidden="true"></span> -->
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next"
          style="z-index: 6;">
          <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span> -->
          <span class="visually-hidden">Next</span>
        </button>
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background: rgba(0, 0, 0, 0.4); z-index: 5;">
        </div>
      </div>
    </section>
    <!-- section special offers -->
    <section class="full-screen">
      <div class="p-4 bg-warning">
        <h2 class="text-center fw-bold">Ofertas Especiales</h2>
      </div>
      <div class="row h-25 p-5">
        <div class="col-md-4" v-for="(oferta, index) in ofertasEspeciales" :key="index">
          <div class="card oferta-card border-0 shadow-sm" :style="{ backgroundImage: 'url(' + oferta.imagen + ')' }">
            <a :href="oferta.link" class="d-block h-100 w-100 text-decoration-none">
              <div class="card-img-overlay d-flex align-items-end p-3"
                >
                <div class="bg-dark bg-opacity-50 text-white p-3 rounded w-100 text-center">
                  <h5 class="card-title mb-1">{{ oferta.titulo }}</h5>
                  <p class="card-text">{{ oferta.descripcion }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </section>

    <!-- section popular destinations -->
    <!-- <section class="full-screen">
      <h2 class="text-center mb-4 fw-bold">Destinos Populares</h2>
      <div class="row g-3">
        <div class="col-6 col-md-4 hover-shadow" v-for="(destino, index) in destinosPopulares" :key="index">
          <div class="position-relative overflow-hidden rounded shadow-sm">
            <img :src="destino.imagen" class="w-100"
              :style="{ width: destino.ancho + 'px', height: destino.altura + 'px', objectFit: 'cover' }"
              :alt="destino.nombre" />
            <div class="position-absolute bottom-0 start-0 w-100 text-white bg-dark bg-opacity-50 p-2">
              <strong>{{ destino.nombre }}</strong>
            </div>
          </div>
        </div>
      </div>   
    </section> -->

    <!-- section favorite Tours -->
    <section class="full-screen mb-4">
      <h2 class="text-center mb-4 fw-bold">Tours Favoritos</h2>
      <div class="row g-4 p-5">
        <div class="col-12 col-sm-6 col-md-3" v-for="(tour, index) in toursFavoritos" :key="index">
          <div class="card h-100 border-0 shadow-sm hover-shadow">
            <img :src="tour.imagen" class="card-img-top" :alt="tour.nombre" style="height: 180px; object-fit: cover" />
            <div class="card-body text-center">
              <h5 class="card-title mb-2">{{ tour.nombre }}</h5>
              <p class="text-primary fw-bold mb-0">{{ tour.precio }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-outline-success px-4">Ver más tours</button>
      </div>
    </section>

    <!-- section international destinations -->
    <section class="py-5 bg-light full-screen">
      <h2 class="text-center mb-4 fw-bold">Destinos Nacionales</h2>

      <div id="carouselInternacional" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner w-50 mx-auto" >
          <div v-for="(destino, index) in destinosNacionales" :key="index"
            :class="['carousel-item', { active: index === 0 }] ">
            <img :src="destino.imagen" class="d-block w-100" :alt="destino.nombre"
              style="height: 400px; object-fit: cover" />
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
              <h5>{{ destino.nombre }}</h5>
              <p>{{ destino.descripcion }}</p>
            </div>
          </div>
        </div>

        <!-- Controles -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselInternacional"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselInternacional"
          data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>

    <!-- section testimonials -->
    <section id="testimonios" class="py-5  full-screen">
      <div class="container">
        <h2 class="text-center mb-5 fw-bold">Lo que dicen nuestros viajeros</h2>

        <div id="carouselTestimonios" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">

            <div class="carousel-item" v-for="(testimonio, index) in testimonios" :key="index"
              :class="{ active: index === 0 }">
              <div class="row justify-content-center">
                <div class="col-md-8 text-center">
                  <img :src="testimonio.avatar" class="rounded-circle mb-4" alt="avatar"
                    style="width: 80px; height: 80px; object-fit: cover;" />
                  <blockquote class="blockquote">
                    <p class="mb-4 fst-italic">"{{ testimonio.mensaje }}"</p>
                  </blockquote>
                  <h6 class="fw-bold mb-0">{{ testimonio.nombre }}</h6>
                  <small class="text-muted">{{ testimonio.cargo }}</small>
                </div>
              </div>
            </div>

          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselTestimonios"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselTestimonios"
            data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// import MainNavbar from '@/components/MainNavbar.vue';
const ofertasEspeciales = [
  {
    titulo: 'Piura - Tumbes - Guayaquil',
    descripcion: '5 días y 4 noches',
    imagen: '/images/ofertasEspeciales/piura-tumbes-guayaquil.png',
    link: '#'
  },
  {
    titulo: 'Huaraz - Trujillo',
    descripcion: '6 días y 5 noches',
    imagen: '/images/ofertasEspeciales/huaraz-trujillo.png',
    link: '#'
  },
  {
    titulo: 'Ica - Paracas - Nazca',
    descripcion: '4 días y 3 noches',
    imagen: '/images/ofertasEspeciales/ica-paracas-nazca.png',
    link: '#'
  }
]
// const destinosPopulares = [
//   {
//     nombre: 'Machu Picchu',
//     imagen: '/images/destinosPopulares/machu.png',
//     ancho: 300,
//     altura: 250
//   },
//   {
//     nombre: 'Lago Titicaca',
//     imagen: '/images/destinosPopulares/titicaca.png',
//     altura: 300
//   },
//   {
//     nombre: 'Arequipa',
//     imagen: '/images/destinosPopulares/arequipa.png',
//     altura: 220
//   },
//   {
//     nombre: 'Paracas',
//     imagen: '/images/destinosPopulares/paracas.png',
//     altura: 280
//   },
//   {
//     nombre: 'Huaraz',
//     imagen: '/images/destinosPopulares/huaraz.png',
//     altura: 260
//   },
//   {
//     nombre: 'Iquitos',
//     imagen: '/images/destinosPopulares/iquitos.png',
//     altura: 240
//   }
// ]

const toursFavoritos = [
  { nombre: 'Cusco Mágico', precio: 'Desde S/999', imagen: '/images/toursFavoritos/cusco.png' },
  { nombre: 'Arequipa Blanca', precio: 'Desde S/850', imagen: '/images/toursFavoritos/arequipa.png' },
  { nombre: 'Selva Viva', precio: 'Desde S/780', imagen: '/images/toursFavoritos/selva.png' },
  { nombre: 'Colca Adventure', precio: 'Desde S/720', imagen: '/images/toursFavoritos/colca.png' },
  { nombre: 'Lima City Tour', precio: 'Desde S/500', imagen: '/images/toursFavoritos/lima.png' },
  { nombre: 'Puno Encantado', precio: 'Desde S/890', imagen: '/images/toursFavoritos/puno.png' },
  { nombre: 'Huaraz Trekking', precio: 'Desde S/950', imagen: '/images/toursFavoritos/huaraz.png' },
  { nombre: 'Paracas & Ica', precio: 'Desde S/690', imagen: '/images/toursFavoritos/paracas.png' }
]

const destinosNacionales = [
  {
    nombre: 'Huaraz, Perú',
    descripcion: 'Montañas y aventura',
    imagen: '/images/destinosNacionales/huaraz.png'
  },
  {
    nombre: 'Cajamarca, Perú',
    descripcion: 'Cultura y naturaleza',
    imagen: '/images/destinosNacionales/cajamarca.png'
  },
  {
    nombre: 'Piura, Perú',
    descripcion: 'Playas y diversión',
    imagen: '/images/destinosNacionales/piura.png'
  }
]

const testimonios = [
  {
    nombre: 'Lucía Fernández',
    cargo: 'Cliente feliz',
    mensaje: 'Una experiencia inolvidable, atención de primera desde el primer momento.',
    avatar: '/images/testimonios/lucia.jpg'
  },
  {
    nombre: 'Carlos Mejía',
    cargo: 'Turista frecuente',
    mensaje: 'He viajado con varias agencias, pero Adventur realmente se preocupa por los detalles.',
    avatar: '/images/testimonios/carlos.jpg'
  },
  {
    nombre: 'María Soto',
    cargo: 'Primera vez viajando',
    mensaje: 'Gracias por hacer mi primer viaje tan especial. ¡100% recomendado!',
    avatar: '/images/testimonios/maria.jpg'
  }
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

</style>
