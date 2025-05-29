<template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="">Reservas</h5>
            <!-- <button class="btn btn-success" @click="abrirFormulario()">+ Nueva Categoría</button> -->
        </div>

        <div v-if="loading" class="">Cargando...</div>

        <div v-else>
            <ReservasTable :datos="reservas" :campos-filtrables="['status']" :por-pagina="20" :exportable="true">
                <template #thead>
                    <th>Cliente</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </template>

                <template #row="{ item }">
                    <tr @click="abrirFormulario(item)" class="cursor-pointer">
                        <td>{{ item.user.names }} {{ item.user.last_names }} </td>
                        <td>{{ item.total_price }}</td>
                        <td>{{ item.status }}</td>

                        <td>
                            <button class="btn btn-sm btn-outline-warning me-2" @click.stop="abrirFormulario(item)">
                                <i class="bi bi-pencil" />
                            </button>
                            <button class="btn btn-sm btn-outline-danger" @click.stop="eliminarRerva(item.id)">
                                <i class="bi bi-trash" />
                            </button>
                        </td>
                    </tr>
                </template>
            </ReservasTable>
        </div>

        <!-- MODAL -->
       <ReservaModal :show="mostrarModal" :on-close="cerrarModal">
  <h5 class="mb-3">{{ form.id ? 'Editar' : 'Nueva' }} Reserva</h5>
  <form @submit.prevent="guardarReserva">
    <div class="mb-2">
      <label class="form-label">ID Reserva</label>
      <input v-model="form.id" type="text" class="form-control" disabled />
    </div>

    <div class="mb-2">
      <label class="form-label">Usuario que reservó</label>
      <input
        type="text"
        class="form-control"
        :value="form.user ? form.user.names + ' ' + form.user.last_names : ''"
        disabled
      />
    </div>

    <div class="mb-2">
      <label class="form-label">Producto</label>
      <input
        type="text"
        class="form-control"
        :value="form.product ? form.product.name:'Tour Generico'"
        disabled
      />
    </div>

    <div class="mb-2">
      <label class="form-label">Fecha de Reserva</label>
      <input v-model="form.reservation_date" type="date" class="form-control" />
    </div>

    <div class="mb-2">
      <label class="form-label">Número de Personas</label>
      <input v-model="form.number_of_people" type="number" class="form-control" />
    </div>

    <div class="mb-2">
      <label class="form-label">Estado</label>
      <input v-model="form.status" type="text" class="form-control" />
    </div>

    <div class="mb-2">
      <label class="form-label">Precio Total</label>
      <input v-model="form.total_price" type="number" step="0.01" class="form-control" />
    </div>

    <div class="mb-2">
      <label class="form-label">Fecha Inicio</label>
      <input v-model="form.start_date" type="date" class="form-control" />
    </div>

    <div class="mb-2">
      <label class="form-label">Fecha Fin</label>
      <input v-model="form.end_date" type="date" class="form-control" />
    </div>

    <div class="d-flex justify-content-between mt-3">
      <button type="submit" class="btn btn-success" :disabled="guardando">
        <span v-if="guardando" class="spinner-border spinner-border-sm me-1" />Guardar
      </button>
      <button type="button" class="btn btn-outline-light" @click="cerrarModal">Cancelar</button>
    </div>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </form>
</ReservaModal>


    </div>
</template>

<script setup>
// eslint-disable-next-line vue/multi-word-component-names
import { ref, onMounted } from 'vue'
import ReservaService from '../../services/ReservaService'
import { parseError } from '../../utils/parseError'
import { showSuccess, showError, showConfirm } from '../../utils/alert'
import ReservasTable from '../../components/Table.vue'
import ReservaModal from '../../components/Modal.vue'

const reservas = ref([])
const loading = ref(false)
const mostrarModal = ref(false)
const error = ref('')
const errores = ref({})
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

const obtenerReservas = async () => {
    loading.value = true
    try {
        const res = await ReservaService.getReservations()
        reservas.value = Array.isArray(res.data.data) ? res.data.data : []

    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const abrirFormulario = (reserva = null) => {
    if (reserva) {
        form.value = {
            ...reserva,
        }
    } else {
        form.value = {
            id: null,
    user_id: null,
    product_id: null,
    reservation_date: '',
    number_of_people: '',
    status: '',
    total_price: '',
    start_date: '',
    end_date: '',
        }
    }

    errores.value = {}
    error.value = ''
    mostrarModal.value = true
}


const cerrarModal = () => {
    mostrarModal.value = false
    form.value = {id: null,
    user_id: null,
    product_id: null,
    reservation_date: '',
    number_of_people: '',
    status: '',
    total_price: '',
    start_date: '',
    end_date: '', }
}

const guardarReserva = async () => {
    errores.value = {};
    error.value = '';

    // Validaciones mínimas
    if (!form.value.product_id) errores.value.product_id = 'Producto obligatorio';
    if (!form.value.number_of_people) errores.value.number_of_people = 'Número de personas obligatorio';
    if (!form.value.start_date) errores.value.start_date = 'Fecha de inicio obligatoria';
    if (!form.value.end_date) errores.value.end_date = 'Fecha de fin obligatoria';
    if (!form.value.total_price) errores.value.total_price = 'Precio total obligatorio';

    if (Object.keys(errores.value).length) return;

    // Construcción del payload
    const payload = {
        user_id: form.value.user_id, // este puede venir oculto o prellenado
        product_id: form.value.product_id,
        reservation_date: form.value.reservation_date || new Date().toISOString().split('T')[0],
        number_of_people: parseInt(form.value.number_of_people),
        status: form.value.status || 'pendiente',
        total_price: parseFloat(form.value.total_price),
        start_date: form.value.start_date,
        end_date: form.value.end_date,
    };

    guardando.value = true;

    try {
        if (form.value.id) {
            // Actualizar reserva existente
            await ReservaService.patchReservation(form.value.id, payload);
            showSuccess('Reserva actualizada correctamente');
        } else {
            // Crear nueva reserva
            await ReservaService.postReservation(payload);
            showSuccess('Reserva creada correctamente');
        }

        await obtenerReservas(); // recargar lista de reservas si tienes este método
        cerrarModal();
    } catch (err) {
        error.value = parseError(err);
        showError('Error al guardar la reserva', error.value);
    } finally {
        guardando.value = false;
    }
};


 const eliminarRerva = async (id) => {
     const confirmado = await showConfirm('¿Estás seguro?', 'Esta acción eliminará el registro.')
     if (!confirmado) return
     try {
         await ReservaService.deleteReservation(id)
         await obtenerReservas()
         showSuccess('Eliminado correctamente')
     } catch (err) {
         showError('Error al eliminar', parseError(err))
     }
 }

onMounted(obtenerReservas)
</script>

<style scoped></style>