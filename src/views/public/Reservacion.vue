<template>
    <div class="container-fluid bg-light mb-4">
        <div class="row align-items-center justify-content-center bg-success text-white" style="height: 200px;">
        </div>
        <div class="container mt-4">
            <h2>Reservación de Tour</h2>
            <div class="d-flex gap-3">
                <div class="flex-grow-1">
                    <!-- Contenedor de tarjetas scrolleable -->
                    <!-- Contenedor de pasajeros -->
                    <div class="card p-3">
                        <h4>Información de pasajeros</h4>

                        <!-- Contenedor scrolleable de tarjetas -->
                        <div style="max-height: 400px; overflow-y: auto;">
                            <div v-for="(person, index) in persons" :key="index" class="card mb-3 p-3">
                                <h5>Persona {{ index + 1 }}</h5>
                                <form @submit.prevent>
                                    <div class="mb-2">
                                        <label class="form-label">Nombre Completo</label>
                                        <input v-model="person.full_name" type="text" class="form-control" />
                                    </div>

                                    <div class="mb-2">
                                        <label class="form-label">Número de Documento</label>
                                        <input v-model="person.document_number" type="text" class="form-control" />
                                    </div>

                                    <div class="mb-2">
                                        <label class="form-label">Edad</label>
                                        <input v-model.number="person.age" type="number" min="0" class="form-control" />
                                    </div>

                                    <div class="mb-2">
                                        <label class="form-label">Género</label>
                                        <select v-model="person.gender" class="form-select">
                                            <option value="">Seleccione</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="fenemino">Femenino</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="person.is_adult" type="checkbox" class="form-check-input"
                                            :id="'adultCheck' + index" />
                                        <label class="form-check-label" :for="'adultCheck' + index">Es adulto</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>


                <div style="width: 400px;">
                    <div class="card p-2">
                        <h4><i class="bi bi-calendar2-check-fill me-2"></i>Detalle del Tour</h4>
                        <div class="text-center p-2">
                            <p class="text-muted">Completa el formulario para confirmar tu reserva de <strong>{{
                                tour.name }}</strong></p>
                        </div>
                        <div>
                            <form class="p-3">
                                <!-- Fecha de inicio -->
                                <div class="mb-3" v-if="tour">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-calendar-date me-2"></i>Fecha de inicio
                                    </label>
                                    <input v-model="form.start_date" type="date" class="form-control"
                                        @change="actualizarFechaFin" />
                                    <div v-if="errores.start_date" class="text-danger small">{{ errores.start_date }}
                                    </div>
                                </div>

                                <!-- Fecha de fin (deshabilitado) -->
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-calendar3 me-2"></i>Fecha de fin
                                    </label>
                                    <input v-model="form.end_date" type="date" class="form-control"
                                        :disabled="tour?.number_of_days > 1" />

                                    <div v-if="errores.end_date" class="text-danger small">{{ errores.end_date }}</div>
                                </div>

                                <!-- Número de viajeros -->
                                <input v-model="form.number_of_people" type="number" class="form-control" min="1"
                                    :disabled="tour?.number_of_people > 1" />

                                <!-- Precio total -->
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-cash-coin me-2"></i>Precio total
                                    </label>
                                    <input v-model="form.total_price" type="number" class="form-control" min="1"
                                        disabled />
                                    <div v-if="errores.total_price" class="text-danger small">{{ errores.total_price }}
                                    </div>
                                </div>

                                <!-- Mensaje de error -->
                                <div v-if="error" class="alert alert-danger mt-3 d-flex align-items-center">
                                    <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ error }}
                                </div>
                            </form>

                            <div class="px-5" v-if="tour.stock > 0">
                                <button class="btn btn-success w-100 mb-2" @click="reservar">
                                    <i class="bi bi-save me-1"></i>Reservar ahora
                                </button>
                                <button class="btn btn-warning w-100" @click="pagar">
                                    <i class="bi bi-credit-card-fill me-1"></i>Pagar ahora
                                </button>
                            </div>
                            <div v-else class="alert alert-danger text-center">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i>Lo sentimos, no hay stock disponible
                                para este tour.
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<!-- <script setup>
import { reactive, ref, watch, onMounted, computed } from "vue"
import ProductoService from '../../services/ProductoService'
import { useRoute } from 'vue-router'


const tour = ref({})
const route = useRoute()
let res
const slug = route.params.slug
const errores = ref({})
const error = ref('')


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

// const name = computed(() => {
//     return '/' + route.fullPath.replace(/^\/tours\//, '')
// })
const price = computed(() => {
    if (tour.value.number_of_people === 1) {
        return tour.value.price_PEN
    } else {
        return tour.value.price_PEN * personCount.value
    }
})
const personCount = computed(() => {
    return form.value.number_of_people
})
const obtenerProducto = async () => {
    const res = await ProductoService.getProductos();
    tour.value = res.data.data.find(producto => producto.slug === slug);
    if (tour.value) {
        asignarDatos();
    }
}
const asignarDatos = () => {
    form.value = {
        id: null,
        user_id: null,
        product_id: tour.value.id,
        reservation_date: '',
        number_of_people: tour.value.number_of_people,
        status: '',
        total_price: price.value,
        start_date: '',
        end_date: '',
    }
    errores.value = {}
    error.value = ''
}
watch(price, (newPrice) => {
    form.value.total_price = newPrice
})

// Lista reactiva de personas
const persons = ref([
    {
        full_name: "",
        document_number: "",
        age: null,
        gender: "",
        is_adult: false,
    },
])

const addPerson = () => {
    persons.value.push({
        full_name: "",
        document_number: "",
        age: null,
        gender: "",
        is_adult: false,
    })
}

const removePerson = (index) => {
    persons.value.splice(index, 1)
}
const actualizarFechaFin = () => {
    if (!form.value.start_date) return

    if (tour?.value.number_of_days > 1) {
        const startDate = new Date(form.value.start_date)
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + (tour.value.number_of_days - 1))

        const year = endDate.getFullYear()
        const month = String(endDate.getMonth() + 1).padStart(2, '0')
        const day = String(endDate.getDate()).padStart(2, '0')

        form.value.end_date = `${year}-${month}-${day}`
    }
    // Si el tour es de un solo día, no toca la fecha de fin (queda editable por el usuario)
}



// Mantener cantidad de personas sincronizada con tour.personsCount
watch(
    () => tour.value.personsCount,
    (newCount) => {
        if (newCount < 1) {
            tour.value.personsCount = 1
            return
        }
        while (persons.value.length < newCount) {
            addPerson()
        }
        while (persons.value.length > newCount) {
            persons.value.pop()
        }
    }
)
watch(() => form.value.start_date, () => {
    actualizarFechaFin()
})

const reservar = async () => {
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

const pagar = () => {
    alert(
        `Pagar ahora para ${persons.value.length} persona(s)\n` +
        JSON.stringify(persons.value, null, 2)
    )
}

onMounted(() => {
    obtenerProducto();
    asignarDatos();

})
</script> -->
<script setup>
import { reactive, ref, watch, onMounted, computed } from "vue"
import ProductoService from '../../services/ProductoService'
import ReservaService from '../../services/ReservaService'
import { useRoute } from 'vue-router'
import { parseError } from '../../utils/parseError'
import { showSuccess, showError, showConfirm } from '../../utils/alert'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-js';

const PUBLIC_KEY = 'APP_USR-113270780464392-052015-c378bc239aba75148604593bd1e357e8-2452299980'

const tour = ref({})
const route = useRoute()
const slug = route.params.slug

const errores = ref({})
const error = ref('')
const guardando = ref(false)

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

// Calcular precio total
const personCount = computed(() => form.value.number_of_people)
const price = computed(() => {
    if (tour.value.number_of_people === 1) {
        return tour.value.price_PEN
    } else {
        return tour.value.price_PEN * personCount.value
    }
})

// Lista de personas
const persons = ref([
    createEmptyPerson(),
])

function createEmptyPerson() {
    return {
        full_name: "",
        document_number: "",
        age: null,
        gender: "",
        is_adult: false,
    }
}

const asignarDatos = () => {
    form.value = {
        id: null,
        user_id: null,
        product_id: tour.value.id,
        reservation_date: '',
        number_of_people: tour.value.number_of_people,
        status: '',
        total_price: price.value,
        start_date: '',
        end_date: '',
    }

    // Inicializa el arreglo persons según el número de personas
    persons.value = []
    for (let i = 0; i < form.value.number_of_people; i++) {
        persons.value.push(createEmptyPerson())
    }

    errores.value = {}
    error.value = ''
}

// Obtención de datos del producto
const obtenerProducto = async () => {
    const res = await ProductoService.getProductos()
    tour.value = res.data.data.find(producto => producto.slug === slug)
    if (tour.value) {
        asignarDatos()
    }
}

// Actualiza fecha fin si aplica
const actualizarFechaFin = () => {
    if (!form.value.start_date) return

    if (tour?.value.number_of_days > 1) {
        const startDate = new Date(form.value.start_date)
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + (tour.value.number_of_days - 1))

        const year = endDate.getFullYear()
        const month = String(endDate.getMonth() + 1).padStart(2, '0')
        const day = String(endDate.getDate()).padStart(2, '0')

        form.value.end_date = `${year}-${month}-${day}`
    }
    // Si es solo un día, la fecha de fin es editable manualmente
}

// Watch para actualizar precio
watch(price, (newPrice) => {
    form.value.total_price = newPrice
})

// Watch para actualizar fecha fin
watch(() => form.value.start_date, () => {
    actualizarFechaFin()
})

// Watch para sincronizar personas con el número de personas en el formulario
watch(() => form.value.number_of_people, (newCount) => {
    if (newCount < 1) {
        form.value.number_of_people = 1
        newCount = 1
    }

    const diff = newCount - persons.value.length

    if (diff > 0) {
        for (let i = 0; i < diff; i++) {
            persons.value.push(createEmptyPerson())
        }
    } else if (diff < 0) {
        persons.value.splice(diff)
    }
})

const reservar = async () => {
    errores.value = {};
    error.value = '';
    guardando.value = true;

    const today = new Date();
    const reservationDate = today.toISOString().split('T')[0]; // yyyy-mm-dd

    const formattedCompanions = persons.value.map(person => ({
        full_name: person.full_name,
        document_number: person.document_number,
        age: person.age !== null ? parseInt(person.age) : null,
        gender: person.gender || null,
        is_adult: person.is_adult !== undefined ? person.is_adult : (person.age ? parseInt(person.age) >= 18 : false),
    }));

    const payload = {
        user_id: 1,
        product_id: tour.value.id,
        reservation_date: reservationDate,
        number_of_people: parseInt(form.value.number_of_people),
        status: 'pendiente',
        total_price: parseFloat(price.value),
        start_date: form.value.start_date,
        end_date: form.value.end_date,
        companions: formattedCompanions.length > 0 ? formattedCompanions : null,
    };

    console.log(payload);
    try {
        await ReservaService.postReservation(payload);
        showSuccess('Reserva creada correctamente');
    } catch (e) {
        error.value = parseError(e);
        showError('Error al reservar', error.value);
    } finally {
        guardando.value = false;
    }
};


const pagar = async () => {
  try {
    await reservar();
    const payload = {
      title: tour.value.name,
      price: parseFloat(tour.value.price_PEN)
    };

    const response = await ReservaService.createPaymentPreference(payload);
    const preferenceId = response.data.id;

    // Inicializa MercadoPago
    await initMercadoPago(PUBLIC_KEY, { locale: 'es-PE' });
    
    // Crea la instancia del checkout
    const wallet = new Wallet({
      initialization: { preferenceId: preferenceId },
      callbacks: {
        onError: (error) => console.error('Checkout error:', error),
        onReady: () => console.log('Checkout ready')
      }
    });
    
    // Abre el checkout
    wallet.open();
  } catch (error) {
    console.error('Error en el proceso de reserva o pago:', error);
    showError('No se pudo completar el pago', error.message || error);
  }
};


onMounted(() => {
    obtenerProducto()
})
</script>


<style scoped>
/* Opcional: ajustar el scroll si hay muchas personas */
.card.p-3 {
    max-height: 80vh;
    overflow-y: auto;
}
</style>
