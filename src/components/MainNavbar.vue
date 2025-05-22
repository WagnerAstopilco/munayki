<template>
    <div class="d-flex justify-content-center align-items-center mt-4 ">
        <div class="logo-container me-3">
            <a href="/"><img src="/LOGO.png" alt="Logo" height="120"></a>
        </div>
        <div class="w-50 d-flex flex-column gap-1">
            <div class="d-flex justify-content-end align-items-center justify-content-end gap-2">
                <!-- languajes -->
                <div class="d-flex gap-1 align-items-center">
                    <img src="/images/banderas/es.png" alt="Español" title="Español" class="idioma-bandera"
                        @click="cambiarIdioma('es')">
                    <img src="/images/banderas/en.png" alt="Inglés" title="Inglés" class="idioma-bandera"
                        @click="cambiarIdioma('en')">
                    <img src="/images/banderas/fr.png" alt="Francés" title="Francés" class="idioma-bandera"
                        @click="cambiarIdioma('fr')">
                </div>
                <!-- cart -->
                <div>
                    <button class="btn text-white">
                        Carrito<i class="bi bi-cart4" />
                    </button>
                </div>
                <!-- contact us -->
                <div>
                    <a href="https://wa.me/51940055540" target="_blank" class="btn btn-success">
                        Cotizar Ahora
                    </a>
                </div>
            </div>
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg custom-navbar">
                <div class="container-fluid p-0">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" />
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav d-flex justify-content-between w-100 ps-4 pe-4">
                            <li class="nav-item">
                                <router-link :to="{ name: 'CategoriasNav', params: { category: 'full-days' } }" class="nav-link d-flex flex-column align-items-center text-menu">
                                    <img src="/images/categorias navbar/full-days.svg"
                                        style="width: 30px; height: 30px;">
                                    Full Days
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'CategoriasNav', params: { category: 'half-days' } }" class="nav-link d-flex flex-column align-items-center text-menu">
                                    <img src="/images/categorias navbar/half-days.svg"
                                        style="width: 30px; height: 30px;">
                                    Half Days
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'CategoriasNav', params: { category: 'festivos' } }" class="nav-link d-flex flex-column align-items-center text-menu">
                                    <img src="/images/categorias navbar/festivos.svg"
                                        style="width: 30px; height: 30px;">
                                    Fechas Festivas
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'CategoriasNav', params: { category: 'nacionales' } }" class="nav-link d-flex flex-column align-items-center text-menu">
                                    <img src="/images/categorias navbar/nacional.svg"
                                        style="width: 30px; height: 30px;">
                                    Nacionales
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'CategoriasNav', params: { category: 'Internacionales' } }" class="nav-link d-flex flex-column align-items-center text-menu">
                                    <img src="/images/categorias navbar/internacional.svg"
                                        style="width: 30px; height: 30px;">
                                    Internacionales
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const idiomaSeleccionado = ref('es')

function cambiarIdioma(idioma) {
    idiomaSeleccionado.value = idioma
    console.log("Idioma cambiado a:", idioma)
}
</script>
<style scoped>
.text-menu{
    font-size: 0.9em !important;
    font-weight: 600 !important;
}
.custom-navbar {
    border-radius: 25px;
    width: 100%;
    z-index: 1050;
    background-color: rgba(255, 255, 255, 0.788);
}

.logo-container {
    flex-shrink: 0;
    transition: transform 0.2s, box-shadow 0.2s;
}

.nav-link {
    font-size: large;
    font-weight: 800;
    color: hsl(0, 0%, 27%) !important;
    margin-left: 1rem;
}

.nav-link:hover {
    color: #9b0958 !important;
}

.idioma-bandera {
    width: 32px;
    height: auto;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.idioma-bandera:hover {
    transform: scale(1.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

#navbarNav ul li a {
    transition: transform 0.2s, box-shadow 0.2s;
}

#navbarNav ul li a:hover {
    transform: scale(1.2);
}

.logo-container:hover {
    transform: scale(1.2);
}
</style>
