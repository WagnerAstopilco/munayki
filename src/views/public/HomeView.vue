<template>
  <div>
    <!-- seccion carrusel -->
    <section class="position-relative full-screen">
      <div id="mainCarousel" class="carousel slide">
        <div class="carousel-indicators" style="z-index: 6;">
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" aria-label="Slide 1" class="active"
            aria-current="true"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="5" aria-label="Slide 6"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item" :class="{ active: index === 0 }" v-for="(slide, index) in banner.mainCarrusell"
            :key="index">
            <img :src="slide.image" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
              style="z-index: 10; width: 100%;">
              <h2 class="h1">
              {{ slide.title }}
              </h2>
              <p class="h5">
              {{ slide.description }}
              </p>
              <div class="input-group mt-4 mx-auto" style="max-width: 600px;">
              <input type="text" class="form-control" placeholder="¿A dónde quieres ir?">
              <button class="btn btn-warning" type="button">
                Buscar
              </button>
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
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background: rgba(0, 0, 0, 0.4); z-index: 5;" />
      </div>
    </section>

    <!-- section special offers -->
    <section class="container py-5">
      <h2 class="mb-4 text-center fw-bold">Ofertas Especiales</h2>
      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3" v-for="(card, index) in banner.specialOffers" :key="index">
          <a href="#"><img :src="card.image" :alt="'Oferta' + (index + 1)" class="img-fluid rounded-4 shadow-sm" /></a>
        </div>
      </div>
    </section>

    <!-- section popular destinations -->
    <section class="container my-5">
      <h2 class="mb-4 text-center">Destinos Populares</h2>
      <div class="row g-3">
        <div class="col-6 col-md-4 col-lg-3" v-for="destino in destinosPopulares" :key="destino.id">
          <a href="#"><div class="destino-card position-relative rounded-4 overflow-hidden">
            <img :src="getImagenUrl(destino.image.url)" alt="Destino" class="img-fluid w-100 h-100 object-cover" />
            <div class="destino-nombre text-white fw-bold">{{ destino.place }}<span style="display: block; font-weight: 400; font-size: 0.8em; margin-top: 1px !important;">{{ destino.description }}</span></div>
            <div class="destino-fav position-absolute top-0 end-0 m-2">
              <i class="bi bi-heart rounded-circle border border-2 p-1 text-warning bg-white"></i>
            </div>
          </div></a>
        </div>
      </div>
    </section>  

    <!-- section advisors -->
    <section class="container py-5 text-center">
      <h2 class="fw-bold mb-4">Contacta a nuestros Asesores ✌️👩‍💼</h2>
      <div class="row g-4 justify-content-center">

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card contacto-card shadow-sm h-100">
            <div class="card-body">
              <i class="bi bi-camera-video-fill fs-1 text-dark"></i>
              <h5 class="card-title mt-3">Agendar</h5>
              <p class="card-text">Videollamada</p>
              <a href="https://wa.me/51940055540" target="_blank" class="btn btn-success btn-sm">Agendar</a>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card contacto-card shadow-sm h-100">
            <div class="card-body">
              <i class="bi bi-telephone-fill fs-1 text-dark"></i>
              <h5 class="card-title mt-3">Llámanos</h5>
              <p class="card-text fw-bold">(51) 940 055 540</p>
              <a href="tel:940055540" class="btn btn-success btn-sm">Llamar ahora</a>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card contacto-card shadow-sm h-100">
            <div class="card-body">
              <i class="bi bi-whatsapp fs-1 text-dark"></i>
              <h5 class="card-title mt-3">WhatsApp</h5>
              <p class="card-text fw-bold">940 055 540</p>
              <a href="https://wa.me/51940055540" target="_blank" class="btn btn-success btn-sm">Chatear</a>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card contacto-card shadow-sm h-100">
            <div class="card-body">
              <i class="bi bi-shop fs-1 text-dark"></i>
              <h5 class="card-title mt-3">Oficina</h5>
              <p class="card-text">Calle Agustin Arbulú 115 - Lambayeque</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=-6.7707270069791%2C-79.859550744295"
                target="_blank" class="btn btn-success btn-sm">Abrir Google Maps</a>
            </div>
          </div>
        </div>

      </div>
    </section>


    <!-- section favorite Tours -->
    <section class="full-screen mb-4">
      <h2 class="text-center  fw-bold">
        Tours Favoritos
      </h2>
      <div class="row g-4 p-5">
        <div class="col-12 col-md-3" v-for="(tour, index) in toursFavoritos" :key="index">
          <TourCard :tour="tour" class="img-fluid" />
        </div>
      </div>
      <div class="text-center mt-4">
        <a href="/tours/todos" class="btn btn-outline-success px-4 py-3 rounded-4">  
          Ver más tours
        </a>
      </div>
    </section>

    <!-- section discover -->
    <section class="py-5 bg-light position-relative overflow-hidden">
      <div class="container">
        <div class="row align-items-center">

          <div class="col-lg-5 mb-4 mb-lg-0">
            <img src="../../assets/images/munayki.jpg" alt="Experiencia Munayki"
              class="img-fluid rounded-4 shadow-lg" />
          </div>

          <div class="col-lg-7">
            <h2 class="fw-bold text-dark mb-4">Descubre el Perú a tu manera con <span
                class="text-success">Munayki</span></h2>
            <p class="text-muted mb-5">Creamos experiencias auténticas, seguras y transformadoras para que vivas el
              turismo como nunca antes.</p>

            <div class="row g-4">
              <div class="col-12 col-md-6">
                <div class="d-flex align-items-start">
                  <div class="icon-circle bg-success text-white me-3"><i class="bi bi-stars"></i></div>
                  <div>
                    <h5 class="fw-bold">Viajes Personalizados</h5>
                    <p class="text-muted small mb-0">Diseñamos rutas a medida según tus gustos, tiempo y estilo de
                      viaje.</p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="d-flex align-items-start">
                  <div class="icon-circle bg-success text-white me-3"><i class="bi bi-gem"></i></div>
                  <div>
                    <h5 class="fw-bold">Destinos Únicos</h5>
                    <p class="text-muted small mb-0">Accede a experiencias fuera de lo común, alejadas del turismo
                      masivo.</p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="d-flex align-items-start">
                  <div class="icon-circle bg-success text-white me-3"><i class="bi bi-shield-check"></i></div>
                  <div>
                    <h5 class="fw-bold">Seguridad Garantizada</h5>
                    <p class="text-muted small mb-0">Protocolos actualizados, guías expertos y atención 24/7.</p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="d-flex align-items-start">
                  <div class="icon-circle bg-success text-white me-3"><i class="bi bi-globe-americas"></i></div>
                  <div>
                    <h5 class="fw-bold">Turismo Responsable</h5>
                    <p class="text-muted small mb-0">Apoyamos a comunidades locales y cuidamos nuestro entorno natural.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- section testimonials -->
    <section id="testimonios" class="py-5 bg-light">
      <h2 class="text-center mb-5 fw-bold text-dark">Lo que dicen nuestros viajeros</h2>

      <div class="container">
        <div id="carouselTestimonios" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div class="col-md-4 mb-3" v-for="n in 3" :key="n">
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img src="https://i.pravatar.cc/32?img=1" class="rounded-circle me-2"
                          style="width: 80px; height: 80px; object-fit: cover;" alt="avatar">
                        <div>
                          <h6 class="mb-0 fw-bold">Usuario {{ n }}</h6>
                          <small class="text-muted">Abril 2025</small>
                        </div>
                        <img src="https://images.icon-icons.com/2429/PNG/512/google_logo_icon_147282.png"
                          class="ms-auto" style="width: 40px; height: 40px; object-fit: cover;" alt="Google">
                      </div>
                      <div class="mb-2 text-warning">★★★★★ <span class="text-success">✔️</span></div>
                      <p class="mb-0">Comentario número {{ n }} sobre lo increíble del servicio recibido con Munayki.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Clona esto para más slides -->
            <div class="carousel-item">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <!-- Testimonio 4 -->
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img src="https://i.pravatar.cc/32?img=4" class="rounded-circle me-2"
                          style="width: 80px; height: 80px; object-fit: cover;" alt="avatar">
                        <div>
                          <h6 class="mb-0 fw-bold">María López</h6>
                          <small class="text-muted">10 Abril 2025</small>
                        </div>
                        <img src="https://images.icon-icons.com/2429/PNG/512/google_logo_icon_147282.png"
                          class="ms-auto" style="width: 40px; height: 40px; object-fit: cover;" alt="Google">
                      </div>
                      <div class="mb-2 text-warning">★★★★★ <span class="text-success">✔️</span></div>
                      <p class="mb-0">Todo fue excelente, desde la organización hasta la atención en cada destino.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <!-- Testimonio 5 -->
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img src="https://i.pravatar.cc/32?img=5" class="rounded-circle me-2"
                          style="width: 80px; height: 80px; object-fit: cover;" alt="avatar">
                        <div>
                          <h6 class="mb-0 fw-bold">Carlos Vega</h6>
                          <small class="text-muted">8 Abril 2025</small>
                        </div>
                        <img src="https://images.icon-icons.com/2429/PNG/512/google_logo_icon_147282.png"
                          class="ms-auto" style="width: 40px; height: 40px; object-fit: cover;" alt="Google">
                      </div>
                      <div class="mb-2 text-warning">★★★★★ <span class="text-success">✔️</span></div>
                      <p class="mb-0">Una experiencia única y segura. Gracias Munayki por hacer el viaje especial.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <!-- Testimonio 6 -->
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img src="https://i.pravatar.cc/32?img=6" class="rounded-circle me-2"
                          style="width: 80px; height: 80px; object-fit: cover;" alt="avatar">
                        <div>
                          <h6 class="mb-0 fw-bold">Sandra G.</h6>
                          <small class="text-muted">6 Abril 2025</small>
                        </div>
                        <img src="https://images.icon-icons.com/2429/PNG/512/google_logo_icon_147282.png"
                          class="ms-auto" style="width: 40px; height: 40px; object-fit: cover;" alt="Google">
                      </div>
                      <div class="mb-2 text-warning">★★★★★ <span class="text-success">✔️</span></div>
                      <p class="mb-0">Muy profesionales y atentos. Repetiría el tour sin duda alguna.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselTestimonios"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselTestimonios"
            data-bs-slide="next">
            <span class="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </section>



  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BannerService from '../../services/BannerService';
import DestinoService from '../../services/DestinoService'
import ProductoService from '../../services/ProductoService'
import TourCard from '@/components/CardProduct.vue'


const banner=ref([])
const destinosPopulares=ref([])
const toursFavoritos=ref([])
let res
const loadBanner=async()=>{
  const response = await BannerService.getBanner();
    banner.value = response.data;
}
const obtenerDestinos= async ()=>{
  try{
    res=await DestinoService.getDestinos();
    destinosPopulares.value=res.data.data.filter(destino => 
      destino.visible_in_main_web === true
    );
    console.log(destinosPopulares)
  }catch(error){
    console.log(error)
  }
}

const obtenerToursFavoritos=async ()=>{
  res=await ProductoService.getProductos();
  try{
    toursFavoritos.value=res.data.data.filter(tour=>
    tour.visible_in_main_web===true);
  }
  catch(error){
    console.log(error)
  }
}

const getImagenUrl = (imagen) => {
    if (imagen) {
        return process.env.VUE_APP_API_URL + "/storage/" + imagen;
    }
}


onMounted(() => {
  loadBanner();
  obtenerDestinos();
  obtenerToursFavoritos();
})  


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

// const toursFavoritos = [
//   { nombre: 'Cusco Mágico', precio: '999', imagen: '/images/toursFavoritos/cusco.png' },
//   { nombre: 'Arequipa Blanca', precio: '850', imagen: '/images/toursFavoritos/arequipa.png' },
//   { nombre: 'Selva Viva', precio: '780', imagen: '/images/toursFavoritos/selva.png' },
//   { nombre: 'Colca Adventure', precio: '720', imagen: '/images/toursFavoritos/colca.png' },
//   { nombre: 'Lima City Tour', precio: '500', imagen: '/images/toursFavoritos/lima.png' },
//   { nombre: 'Puno Encantado', precio: '890', imagen: '/images/toursFavoritos/puno.png' },
//   { nombre: 'Huaraz Trekking', precio: '950', imagen: '/images/toursFavoritos/huaraz.png' },
//   { nombre: 'Paracas & Ica', precio: '690', imagen: '/images/toursFavoritos/paracas.png' }
// ]




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
