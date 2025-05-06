<template>
    <section>
        <div class="position-relative">
            <img src="/images/bg-tours.png" class="d-block w-100" alt="...">
            <div class="position-absolute top-50 start-0 w-100 text-center text-white mb-3">
                <h1>Paquetes turísticos {{ category }}</h1>
                <p>Explora los mejores paquetes turísticos en la categoría {{ category }} y vive experiencias
                    inolvidables.</p>
            </div>
        </div>
    </section>
    <section class="mb-5">
        <!-- Filtros y búsqueda -->
        <h2 class="text-center mt-3">Búsqueda y Filtros</h2>
        <div class="container mt-4 mb-4">
            <div class="row gx-2 align-items-end flex-nowrap overflow-auto">

                <!-- Buscar -->
                <div class="col-6 col-md-3 col-lg-2">
                    <label for="search" class="form-label">Buscar</label>
                    <input type="text" id="search" v-model="searchTerm" class="form-control"
                        placeholder="Paquete o destino">
                </div>

                <!-- Precio -->
                <div class="col-6 col-md-2 col-lg-1">
                    <label for="price" class="form-label">Precio máx</label>
                    <input type="number" id="price" v-model="maxPrice" class="form-control" placeholder="S/">
                </div>

                <!-- Duración -->
                <div class="col-6 col-md-2 col-lg-1">
                    <label for="duration" class="form-label">Duración</label>
                    <input type="number" id="duration" v-model="duration" class="form-control" placeholder="Días">
                </div>

                <!-- Destino -->
                <div class="col-6 col-md-2 col-lg-2">
                    <label for="destination" class="form-label">Destino</label>
                    <select id="destination" v-model="destination" class="form-select">
                        <option value="">Todos</option>
                        <option value="Cajamarca">Cajamarca</option>
                        <option value="Cusco">Cusco</option>
                        <option value="Arequipa">Arequipa</option>
                    </select>
                </div>

                <!-- Actividad -->
                <div class="col-6 col-md-2 col-lg-2">
                    <label for="activity" class="form-label">Actividad</label>
                    <select id="activity" v-model="activity" class="form-select">
                        <option value="">Todas</option>
                        <option value="aventura">Aventura</option>
                        <option value="cultural">Cultural</option>
                        <option value="playa">Playa</option>
                    </select>
                </div>

                <!-- Orden -->
                <div class="col-6 col-md-3 col-lg-2">
                    <label for="sort" class="form-label">Ordenar por</label>
                    <select id="sort" v-model="sortOrder" class="form-select">
                        <option value="popular">Más vendidos</option>
                        <option value="rating">Mejor calificados</option>
                        <option value="priceAsc">Menor precio</option>
                        <option value="priceDesc">Mayor precio</option>
                    </select>
                </div>

            </div>
        </div>


        <!-- Cards -->
        <div class="container-fluid mt-5 px-5">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                <div class="col" v-for="i in 12" :key="i">
                    <router-link :to="{ name: 'tour', params: { tour: i } }" class="text-decoration-none">
                        <div class="card h-100 square-card">
                            <img src="/images/paquete-turistico.jpg" class="card-img-top h-100 object-fit-cover"
                                alt="Paquete turístico">
                            <div class="card-body position-absolute bottom-0 bg-dark bg-opacity-50 text-white w-100">
                                <h5 class="card-title">Paquete {{ i }}</h5>
                                <p class="card-text">Descripción del paquete turístico {{ i }}.</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Paginación -->
        <nav aria-label="Page navigation" class="mt-5">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            category: this.$route.params.categoria,
        };
    },
    watch: {
        '$route.params.categoria'(newVal) {
            this.category = newVal;
            console.log(this.category);
        },
    },
    mounted() {
        console.log(this.category);
    },
};
</script>

<style scoped>
.square-card {
    aspect-ratio: 1 / 0.8;
    border-radius: 25px;
    overflow: hidden;
}
</style>
