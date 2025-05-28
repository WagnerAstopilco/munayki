<template>
  <footer class="bg-dark text-white pt-5">
    <div class="container-fluid px-5">
      <div class="row">
        <!-- Logo y descripción -->
        <div class="col-md-3 mb-4">
          <img src="/logo.png" alt="Logo" style="height: 150px;" class="mb-3">
          <p>Tu mejor compañero de aventuras y viajes inolvidables. ¡Descubre el mundo con nosotros!</p>
        </div>

        <!-- Navegación -->
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold">
            Categorías
          </h5>
          <ul class="list-unstyled d-flex flex-column gap-2">
            <li>
              <router-link :to="{ name: 'CategoriasNav', params: { category: 'full-days' } }"
                class="text-white text-decoration-none" @click="scrollToTop">
                Full Days
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'CategoriasNav', params: { category: 'half-days' } }"
                class="text-white text-decoration-none" @click="scrollToTop">
                Half days
              </router-link>              
            </li>
            <li>
              <router-link :to="{ name: 'CategoriasNav', params: { category: 'nacionales' } }"
                class="text-white text-decoration-none" @click="scrollToTop">
                Nacionales
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'CategoriasNav', params: { category: 'internacionales' } }"
                class="text-white text-decoration-none" @click="scrollToTop">
                Internacionales
              </router-link>
            </li>
          </ul>
        </div>
        <!-- Acerca de -->
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold">
            Acerca de
          </h5>
          <ul class="list-unstyled d-flex flex-column gap-2">
            <li>
              <a href="#" class="text-white text-decoration-none">Nosotros</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Preguntas frecuentes</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Términos y condiciones</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Libro de Reclamaciones</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Codigo ESNA</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Contáctanos</a>
            </li>
          </ul>
        </div>

        <!-- contacto -->
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold">
            Contacto
          </h5>
          <div class="list-unstyled d-flex flex-column gap-3">
            <a href="https://wa.me/51940055540" class="text-white text-decoration-none"><i
                class="bi bi-telephone-fill" /> +51 940 055 540</a>
            <a href="mailto:munaykiturismo@gmail.com?subject=Consulta%20Turística&body=Hola%2C%20me%20gustaría%20más%20información..."
              target="_blank" class="text-white text-decoration-none">
              <i class="bi bi-envelope-open-fill"></i> munaykiturismo@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div class="text-center py-3 border-top border-secondary mt-4">
        <small>&copy; 2025 Munayki Turismo. Todos los derechos reservados.</small>
      </div>
    </div>
  </footer>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>