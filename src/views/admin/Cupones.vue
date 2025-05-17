<template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="">Cupones</h5>
            <button class="btn btn-success" @click="abrirFormulario()">+ Nuevo Cupon</button>
        </div>

        <div v-if="loading" class="">Cargando...</div>

        <div v-else>
            <CouponTable :datos="cupones" :campos-filtrables="['name', 'code', 'discount_percentage']" :por-pagina="20"
                :exportable="true">
                <template #thead>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Descuento</th>
                    <th>N° de usos</th>
                    <th>Usados</th>
                    <th>Desde</th>
                    <th>Hasta</th>
                    <th>Acciones</th>
                </template>

                <template #row="{ item }">
                    <tr @click="abrirFormulario(item)" class="cursor-pointer">
                        <td>{{ item.name }}</td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.discount_percentage }}%</td>
                        <td>{{ item.max_uses }}</td>
                        <td>{{ item.uses_count }}</td>
                        <td>{{ item.valid_from }}</td>
                        <td>{{ item.valid_to }}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-warning me-2" @click.stop="abrirFormulario(item)">
                                <i class="bi bi-pencil" />
                            </button>
                            <button class="btn btn-sm btn-outline-danger" @click.stop="eliminarCupon(item.id)">
                                <i class="bi bi-trash" />
                            </button>
                        </td>
                    </tr>
                </template>
            </CouponTable>
        </div>

        <!-- MODAL -->
        <CuponModal :show="mostrarModal" :on-close="cerrarModal">
            <h5 class="mb-3">{{ form.id ? 'Editar' : 'Nuevo' }} Cupon</h5>
            <form @submit.prevent="guardarCupon">
                <div class="mb-2">
                    <label class="form-label">Nombre</label>
                    <input v-model="form.name" type="text" class="form-control" />
                    <div v-if="errores.name" class="text-danger small">{{ errores.name }}</div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Código</label>
                    <input v-model="form.code" type="text" class="form-control" />
                    <div v-if="errores.code" class="text-danger small">{{ errores.code }}</div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Descripción</label>
                    <textarea v-model="form.description" class="form-control" rows="2" />
                </div>
                <div class="mb-2">
                    <label class="form-label">Descuento (%)</label>
                    <input v-model="form.discount_percentage" type="number" class="form-control" placeholder="10" />
                    <div v-if="errores.discount_percentage" class="text-danger small">{{ errores.discount_percentage }}
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-label">N° de usos permitidos</label>
                    <input v-model="form.max_uses" type="number" class="form-control" placeholder="1000" />
                    <div v-if="errores.max_uses" class="text-danger small">{{ errores.max_uses }}
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Válido desde</label>
                    <input v-model="form.valid_from" type="date" class="form-control" />
                    <div v-if="errores.valid_from" class="text-danger small">{{ errores.valid_from }}
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Válido hasta</label>
                    <input v-model="form.valid_to" type="date" class="form-control" />
                    <div v-if="errores.valid_to" class="text-danger small">{{ errores.valid_to }}
                    </div>
                </div>

                <div class="mb-2">
                    <label class="form-label">Productos</label>
                    <Multiselect v-model="form.product_ids" :options="productos" :track-by="'id'" :label="'name'"
                        :multiple="true" placeholder="Selecciona los productos" :allow-empty="true" />
                </div>

                <div class="d-flex justify-content-between mt-3">
                    <button type="submit" class="btn btn-success" :disabled="guardando">
                        <span v-if="guardando" class="spinner-border spinner-border-sm me-1" />Guardar
                    </button>
                    <button type="button" class="btn btn-outline-light" @click="cerrarModal">Cancelar</button>
                </div>
                <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </form>
        </CuponModal>
    </div>
</template>

<script setup>
// eslint-disable-next-line vue/multi-word-component-names
import { ref, onMounted } from 'vue'
import CuponService from '../../services/CuponService'
import ProductoService from '../../services/ProductoService'
import { parseError } from '../../utils/parseError'
import { showSuccess, showError, showConfirm } from '../../utils/alert'
import Multiselect from 'vue-multiselect'
import CouponTable from '../../components/Table.vue'
import CuponModal from '../../components/Modal.vue'

const cupones = ref([])
const productos = ref([])
const loading = ref(false)
const mostrarModal = ref(false)
const error = ref('')
const errores = ref({})
const guardando = ref(false)

const form = ref({
    id: null,
    name: '',
    code: '',
    description: '',
    discount_percentage: '',
    max_uses: '',
    uses_count: 0,
    valid_from: '',
    valid_to: '',
    product_ids: [],
})

const obtenerCupones = async () => {
    loading.value = true
    try {
        const res = await CuponService.getCoupons()
        cupones.value = Array.isArray(res.data.data) ? res.data.data : []

    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const obtenerProductos = async () => {
    loading.value = true
    try {
        const res = await ProductoService.getProductos()
        productos.value = Array.isArray(res.data.data) ? res.data.data : []

    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const abrirFormulario = (cupon = null) => {
    if (cupon) {
        form.value = {
            ...cupon,
        }
    } else {
        form.value = {
            id: null,
            name: '',
            code: '',
            description: '',
            discount_percentage: '',
            max_uses: '',
            uses_count: 0,
            valid_from: '',
            valid_to: '',
            product_ids: [],
        }
    }

    errores.value = {}
    error.value = ''
    mostrarModal.value = true
}


const cerrarModal = () => {
    mostrarModal.value = false
    error.value = ''
    errores.value = {}
    form.value = {
        id: null,
        name: '',
        code: '',
        description: '',
        discount_percentage: '',
        max_uses: '',
        uses_count: 0,
        valid_from: '',
        valid_to: '',
        product_ids: [],
    }
}

const guardarCupon = async () => {
    errores.value = {}
    error.value = ''

    if (!form.value.name) errores.value.name = 'Nombre obligatorio'
    if (Object.keys(errores.value).length) return

    if (Array.isArray(form.value.product_ids)) {
        form.value.product_ids = form.value.product_ids.map(p => p.id)
    }

    const payload = {
        name: form.value.name,
        code: form.value.code,
        description: form.value.description,
        discount_percentage: form.value.discount_percentage,
        max_uses: form.value.max_uses,
        uses_count: form.value.uses_count || 0,
        valid_from: form.value.valid_from,
        valid_to: form.value.valid_to,
        product_ids: form.value.product_ids || [],
    }

    guardando.value = true
    console.log(payload)
    try {
        if (form.value.id) {
            await CuponService.patchCoupon(form.value.id, payload)
            showSuccess('Actualizado correctamente')
        } else {
            await CuponService.postCoupon(payload)
            showSuccess('Creado correctamente')
        }
        await obtenerCupones()
        cerrarModal()
        } catch (err) {
        error.value = parseError(err)
        showError('Error al guardar', error.value)
    } finally {
        guardando.value = false
    }
    
}


const eliminarCupon = async (id) => {
    const confirmado = await showConfirm('¿Estás seguro?', 'Esta acción eliminará el registro.')
    if (!confirmado) return
    try {
        await CuponService.deleteCoupon(id)
        await obtenerCupones()
        showSuccess('Eliminado correctamente')
    } catch (err) {
        showError('Error al eliminar', parseError(err))
    }
}

onMounted(()=>{
    obtenerCupones()
    obtenerProductos()
})
</script>

<style scoped></style>