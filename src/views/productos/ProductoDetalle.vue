<template>
    <section>
        <div class="position-relative">
            <img src="/images/bg-tours.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-0 w-100 text-center text-white mb-3">
                <h1>{{ product }}</h1>
            </div>
        </div>
    </section>
    <section class="container mb-5">
        <div class="d-flex mb-4 gap-3">
            <div id="carouselTour" class="carousel slide mt-4 mb-4 w-50 h-50 shadow-sm" data-bs-ride="carousel">
                <div class="carousel-inner rounded-5">
                    <div class="carousel-item active">
                        <img src="/images/carrusellMain/cajamarca.png" class="d-block w-100" alt="Imagen 1 del tour">
                    </div>
                    <div class="carousel-item">
                        <img src="/images/carrusellMain/ica.png" class="d-block w-100" alt="Imagen 2 del tour">
                    </div>
                    <div class="carousel-item">
                        <img src="/images/carrusellMain/piura.png" class="d-block w-100" alt="Imagen 3 del tour">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselTour" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselTour" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselTour" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#carouselTour" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carouselTour" data-bs-slide-to="2"></button>
                </div>
            </div>

            <div class="card h-100 mt-4 mb-4 w-50"
                style="background-color: #f1f1f1; color: black; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <div class="card-body">
                    <!-- Título del tour -->
                    <h1 class="card-title">{{product}}</h1>

                    <!-- Botón para descargar archivo -->
                    <div class="text-center mb-3 d-flex gap-5">
                        <p>Ubicación</p>
                        <button class="btn btn-outline-primary">
                            Descargar itinerario
                        </button>
                    </div>

                    <!-- Selector de moneda -->
                    <div class="mb-3 w-50">
                        <label for="moneda" class="form-label">Moneda:</label>
                        <select class="form-select" id="moneda" v-model="selectedCurrency">
                            <option value="PEN">Soles (PEN)</option>
                            <option value="USD">Dólares (USD)</option>
                        </select>
                    </div>

                    <!-- Precio del tour -->
                    <div class="mb-4">
                        <h2 class="fs-1 fw-bold text-success">
                            {{ selectedCurrency === 'USD' ? '$120' : 'S/ 450' }}
                        </h2>
                    </div>

                    <!-- Información en columnas -->
                    <div class="d-flex flex-column text-center mb-4 gap-3">
                        <div class="column justify-content-center gap-3 bg-white p-3 rounded shadow-sm">
                            <h3 class="text-uppercase fs-4">Incluye</h3>
                            <ul class="list-unstyled d-flex gap-3 justify-content-center">
                                <li>Transporte</li>
                                <li>Guía turístico</li>
                                <li>Entrada a sitios</li>
                            </ul>
                        </div>
                        <div class="column justify-content-center gap-3 bg-white p-3 rounded shadow-sm">
                            <h3 class="text-uppercase fs-4">Actividades</h3>
                            <ul class="list-unstyled d-flex gap-3 justify-content-center">
                                <li>Caminata</li>
                                <li>Visita guiada</li>
                                <li>Almuerzo típico</li>
                            </ul>
                        </div>
                        <div class="column justify-content-center gap-3 bg-white p-3 rounded shadow-sm">
                            <h3 class="text-uppercase fs-4">Categoría</h3>
                            <ul class="list-unstyled d-flex gap-3 justify-content-center">
                                <li>Aventura</li>
                                <li>Cultural</li>
                                <li>Full Day</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Botones de acción -->
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-success">Reservar</button>
                        <a href="https://wa.me/51999999999" target="_blank" class="btn btn-outline-success">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="d-flex justify-content-center gap-3 mb-4">
                <button type="button" class="btn btn-success change px-4 py-2"
                    @click="setContent('itinerary')">Itinerario</button>
                <button type="button" class="btn btn-success change px-4 py-2"
                    @click="setContent('includes')">Incluye</button>
                <button type="button" class="btn btn-success change px-4 py-2" @click="setContent('payment')">Métodos de
                    pago</button>
                <button type="button" class="btn btn-success change px-4 py-2"
                    @click="setContent('requirements')">Requisitos para reservar</button>
                <button type="button" class="btn btn-success change px-4 py-2"
                    @click="setContent('description')">Descripción</button>
            </div>

            <div>
                <div class="card max-w-100"
                    style="background-color: #d9d9d9; color: black; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <p>{{ content }}</p>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            product: this.$route.params.tour,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse et corporis consequuntur similique incidunt mollitia repudiandae, quas vel voluptates doloribus, asperiores nesciunt accusamus quae sapiente obcaecati numquam dicta quia praesentium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse et corporis consequuntur similique incidunt mollitia repudiandae, quas vel voluptates doloribus, asperiores nesciunt accusamus quae sapiente obcaecati numquam dicta quia praesentium?"
        };
    },
    watch: {
        '$route.params.tour'(newVal) {
            this.product = newVal;
            console.log(this.product);
        },
    },
    mounted() {
        console.log(this.product);
    },
    methods: {
        setContent(type) {
            switch (type) {
                case 'itinerary':
                    this.content = 'Contenido del itinerario';
                    break;
                case 'includes':
                    this.content = 'Contenido de lo que incluye el paquete';
                    break;
                case 'payment':
                    this.content = 'Contenido de los métodos de pago';
                    break;
                case 'requirements':
                    this.content = 'Contenido de los requisitos para reservar';
                    break;
                case 'description':
                    this.content = 'Descripción del paquete turístico';
                    break;
                default:
                    this.content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit...';
            }
        }
    },

};
</script>

<style scoped>
.change:hover {

    background-color: var(--bs-warning) !important;
    border: var(--bs-warning) !important;
    color: var(--bs-success) !important;
}
</style>
