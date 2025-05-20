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
                            <div v-for="(img, i) in tour.images" :key="i" class="carousel-item"
                                :class="{ active: i === 0 }">
                                <img :src="getImagenUrl(img.url)" class="d-block w-100" alt="Imagen del tour"
                                    style="height: 400px; object-fit: contain;" />
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
                        <img v-for="(img, i) in tour.images" :key="i" :src="getImagenUrl(img.url)" @click="goToSlide(i)"
                            :class="['me-2 rounded-2 border border-light preview', { 'border-primary border-2 scale-up': i === activeIndex }]"
                            style="width: 70px; height: 50px; object-fit: cover; cursor: pointer" />
                    </div>
                </div>

                <!-- Detalles -->
                <div class="col-md-5 card p-4">
                    <h4 class="fw-bold">{{ tour.name }}</h4>
                    <p class="text-muted mb-1"><i class="bi bi-geo-alt-fill text-warning"></i> {{ tour.destino?.place
                    }},
                        {{ tour.destino?.country.toUpperCase() }}</p>
                    <!-- <button class="btn btn-warning btn-sm mb-3">Descargar Brochure</button> -->
                    <a class="btn btn-warning btn-sm mb-3" :href="getFileUrl(tour.file)" download target="_blank"
                        v-if="tour.file">
                        Descargar Brochure
                    </a>


                    <p class="fw-semibold mb-1">Precio por persona:</p>
                    <p class="fs-3 fw-bold text-danger">S/. {{ tour.price_PEN }}</p>
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
                        {{tour.activities?.map(act => act.name).join(' / ')}}
                    </p>

                    <p class="fw-bold mb-0">Categoría</p>
                    <p class="text-muted small">{{ tour.category?.name }}</p>
                    <hr>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-warning fw-bold" @click="abrirFormulario()">Reservar Ahora</button>
                        <a href="https://wa.me/51940055540" target="_blank" class="btn btn-success fw-bold">Por
                            WhatsApp</a>
                    </div>
                </div>
            </div>
            <!-- MODAL -->
            <!-- <ReservaModal :show="mostrarModal" :on-close="cerrarModal">
                <h5 class="mb-3">Nueva Reserva</h5>
                <form @submit.prevent="guardarReserva">
                    <div class="mb-2">
                        <label class="form-label">Fecha de inicio</label>
                        <input v-model="form.start_date" type="date" class="form-control" />
                        <div v-if="errores.start_date" class="text-danger small">{{ errores.start_date }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Fecha de fin</label>
                        <input v-model="form.end_date" type="date" class="form-control" />
                        <div v-if="errores.end_date" class="text-danger small">{{ errores.end_date }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">N° de viajeros</label>
                        <input v-model="form.number_of_people" type="number" class="form-control" />
                        <div v-if="errores.number_of_people" class="text-danger small">{{ errores.number_of_people }}
                        </div>
                    </div>

                    <div class="d-flex justify-content-between mt-3">
                        <button type="submit" class="btn btn-success" :disabled="guardando">
                            <span v-if="guardando" class="spinner-border spinner-border-sm me-1" />Guardar
                        </button>
                        <button type="button" class="btn btn-outline-light" @click="cerrarModal">Cancelar</button>
                    </div>
                    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
                </form>
            </ReservaModal> -->
            <ReservaModal :show="mostrarModal" :on-close="cerrarModal">
                <div class="p-3">
                    <!-- Título con ícono -->
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary">
                            <i class="bi bi-calendar2-check-fill me-2"></i>Reserva tu aventura
                        </h3>
                        <p class="text-muted">Completa el formulario para confirmar tu reserva</p>
                    </div>

                    <form @submit.prevent="guardarReserva">
                        <!-- Fecha de inicio -->
                        <div class="mb-3">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-calendar-date me-2"></i>Fecha de inicio
                            </label>
                            <input v-model="form.start_date" type="date" class="form-control" />
                            <div v-if="errores.start_date" class="text-danger small">{{ errores.start_date }}</div>
                        </div>

                        <!-- Fecha de fin -->
                        <div class="mb-3">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-calendar3 me-2"></i>Fecha de fin
                            </label>
                            <input v-model="form.end_date" type="date" class="form-control" />
                            <div v-if="errores.end_date" class="text-danger small">{{ errores.end_date }}</div>
                        </div>

                        <!-- Número de viajeros -->
                        <div class="mb-3">
                            <label class="form-label fw-semibold">
                                <i class="bi bi-people-fill me-2"></i>N° de viajeros
                            </label>
                            <input v-model="form.number_of_people" type="number" class="form-control" min="1" />
                            <div v-if="errores.number_of_people" class="text-danger small">{{ errores.number_of_people
                            }}</div>
                        </div>

                        <!-- Botones de acción -->
                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <button type="submit" class="btn btn-success px-4" @click="guardarReserva"
                                :disabled="guardando">
                                <span v-if="guardando" class="spinner-border spinner-border-sm me-2" />
                                <i class="bi bi-save me-1"></i>Guardar
                            </button>

                            <button type="button" class="btn btn-outline-secondary" @click="cerrarModal">
                                <i class="bi bi-x-circle me-1"></i>Cancelar
                            </button>

                            <!-- Botón para pagar -->
                            <button type="button" class="btn btn-primary" @click="realizarPago">
                                <i class="bi bi-credit-card-fill me-1"></i>Pagar ahora
                            </button>
                        </div>

                        <!-- Mensaje de error -->
                        <div v-if="error" class="alert alert-danger mt-3 d-flex align-items-center">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ error }}
                        </div>
                    </form>
                </div>
            </ReservaModal>


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
                        <div v-html="tour.itinerary" class="prose max-w-none"></div>
                    </div>
                    <div v-else-if="currentTab === 'incluye'" id="incluye">
                        <div class="container">
                            <div v-html="tour.reservation_included" class="prose max-w-none"></div>
                        </div>
                    </div>
                    <div v-else-if="currentTab === 'metodos'">
                        <p>Transferencias, Yape, Plin, tarjeta crédito/débito.</p>
                    </div>
                    <div v-else-if="currentTab === 'requisitos'" id="requisitos">
                        <div v-html="tour.reservation_requirements" class="prose max-w-none"></div>
                    </div>
                    <div v-else-if="currentTab === 'descripcion'" id="descripcion">
                        <div v-html="tour.description" class="prose max-w-none"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Carousel } from 'bootstrap'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { parseError } from '../../utils/parseError'
import { showSuccess, showError, showConfirm } from '../../utils/alert'
import ProductoService from '../../services/ProductoService'
import ReservaService from '../../services/ReservaService'
import ReservaModal from '../../components/Modal.vue'

const carouselRef = ref(null)
const activeIndex = ref(0)
const route = useRoute()
let res
const tour = ref({})
const mostrarModal = ref(false)
const error = ref('')
const errores = ref({})
const guardando = ref(false)
const today = new Date().toISOString().slice(0, 10)

const currentTab = ref('itinerario')
const tabs = [
    { name: 'itinerario', label: 'Itinerario' },
    { name: 'incluye', label: 'Incluye' },
    { name: 'metodos', label: 'Métodos de pago' },
    { name: 'requisitos', label: 'Requisitos' },
    { name: 'descripcion', label: 'Descripción' }
]

const options = {
    readOnly: true,
}



const form = ref({
    id: null,
    user_id: null,
    product_id: null,
    reservation_date: '',
    number_of_people: '',
    status: '',
    total_price: '',
    start_date: '',
    end_date: '',
})

const name = computed(() => {
    return '/' + route.fullPath.replace(/^\/tours\//, '')
})

const obtenerProducto = async () => {
    res = await ProductoService.getProductos();
    tour.value = res.data.data.find(producto => producto.slug === name.value);
}

const getImagenUrl = (imagen) => {
    if (imagen) {
        return process.env.VUE_APP_API_URL + "/storage/" + imagen;
    }
}

const getFileUrl = (fileName) => {
    return fileName ? `${process.env.VUE_APP_API_URL}/storage/${fileName}` : '#'
}

const goToSlide = (index) => {
    const bsCarousel = Carousel.getInstance(carouselRef.value) || new Carousel(carouselRef.value)
    bsCarousel.to(index)
    activeIndex.value = index
}

const abrirFormulario = () => {
    form.value = {
        id: null, user_id: null, product_id: null, reservation_date: '', number_of_people: '',
        status: '', total_price: '', start_date: '', end_date: '',
    }
    errores.value = {}
    error.value = ''
    mostrarModal.value = true
}
const cerrarModal = () => {
    mostrarModal.value = false
    form.value = {
        id: null, user_id: null, product_id: null, reservation_date: '', number_of_people: '',
        status: '', total_price: '', start_date: '', end_date: '',
    }
}
const guardarReserva = async () => {
    errores.value = {}
    error.value = ''
    if (!form.value.start_date) errores.value.start_date = 'Fecha de inicio obligatorio'
    if (Object.keys(errores.value).length) return
    const payload = {
        user_id: 1,
        product_id: tour.value.id,
        reservation_date: today,
        number_of_people: form.value.number_of_people,
        status: 'pendiente',
        total_price: (form.value.number_of_people * tour.value.price_PEN),
        start_date: form.value.start_date,
        end_date: form.value.end_date,
    }
    console.log(payload)
    guardando.value = true
    try {
        await ReservaService.postReservation(payload)
        showSuccess('Creado correctamente')
        cerrarModal()
    } catch (err) {
        error.value = parseError(err)
        showError('Error al guardar', error.value)
    } finally {
        guardando.value = false
    }
}

const realizarPago = async () => {
    errores.value = {}
    error.value = ''

    if (!form.value.start_date) errores.value.start_date = 'Fecha de inicio obligatorio'
    if (Object.keys(errores.value).length) return

    const payload = {
        user_id: 1,
        product_id: tour.value.id,
        reservation_date: today,
        number_of_people: form.value.number_of_people,
        status: 'pendiente',
        total_price: form.value.number_of_people * tour.value.price_PEN,
        start_date: form.value.start_date,
        end_date: form.value.end_date,
    }

    console.log('Reserva:', payload)
    guardando.value = true

    try {
        const reserva = await ReservaService.postReservation(payload)
        const res = await fetch('https://d7af-190-43-17-16.ngrok-free.app/api/pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: tour.value.title,
                quantity: form.value.number_of_people,
                price: tour.value.price_PEN,
                reservation_id: reserva.id
            })
        })

        const data = await res.json()

        if (data.init_point) {
            window.location.href = data.init_point
        } else {
            console.error('No se recibió init_point:', data)
            showError('No se pudo generar el pago con Mercado Pago')
        }

    } catch (err) {
        error.value = parseError(err)
        showError('Error al guardar', error.value)
    } finally {
        guardando.value = false
    }
}


onMounted(() => {
    obtenerProducto();
    const bsCarousel = new Carousel(carouselRef.value)

    carouselRef.value.addEventListener('slid.bs.carousel', (e) => {
        activeIndex.value = e.to
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