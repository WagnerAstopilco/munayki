<template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="">Categorías</h5>
            <button class="btn btn-success" @click="abrirFormulario()">+ Nueva Categoría</button>
        </div>

        <div v-if="loading" class="">Cargando...</div>

        <div v-else>
            <AdminTable :datos="categorias" :campos-filtrables="['name', 'description']" :por-pagina="20"
                :exportable="true">
                <template #thead>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Categoría padre</th>
                    <th>Acciones</th>
                </template>

                <template #row="{ item }">
                    <tr @click="abrirFormulario(item)" class="cursor-pointer">
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            {{
                                categorias.find(cat => cat.id === item.parent_id)?.name || '—'
                            }}
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-warning me-2" @click.stop="abrirFormulario(item)">
                                <i class="bi bi-pencil" />
                            </button>
                            <button class="btn btn-sm btn-outline-danger" @click.stop="eliminarCategoria(item.id)">
                                <i class="bi bi-trash" />
                            </button>
                        </td>
                    </tr>
                </template>
            </AdminTable>
        </div>

        <!-- MODAL -->
        <AdminModal :show="mostrarModal" :on-close="cerrarModal">
            <h5 class="mb-3">{{ form.id ? 'Editar' : 'Nueva' }} Categoría</h5>
            <form @submit.prevent="guardarCategoria">
                <div class="mb-2">
                    <label class="form-label">Nombre</label>
                    <input v-model="form.name" type="text" class="form-control" />
                    <div v-if="errores.name" class="text-danger small">{{ errores.name }}</div>
                </div>

                <div class="mb-2">
                    <label class="form-label">Descripción</label>
                    <textarea v-model="form.description" class="form-control" rows="2" />
                </div>
                <div class="mb-2">
                    <label class="form-label">Categoría padre</label>
                    <Multiselect v-model="form.parent_id" :options="categorias.filter(cat => cat.id !== form.id)"
                        :track-by="'id'" :label="'name'" placeholder="Selecciona categoría padre" :allow-empty="true" />
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <button type="submit" class="btn btn-success" :disabled="guardando">
                        <span v-if="guardando" class="spinner-border spinner-border-sm me-1" />Guardar
                    </button>
                    <button type="button" class="btn btn-outline-light" @click="cerrarModal">Cancelar</button>
                </div>
                <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </form>
        </AdminModal>
    </div>
</template>

<script setup>
// eslint-disable-next-line vue/multi-word-component-names
import { ref, onMounted } from 'vue'
import CategoryService from '../../services/CategoryService'
import { parseError } from '../../utils/parseError'
import { showSuccess, showError, showConfirm } from '../../utils/alert'
import Multiselect from 'vue-multiselect'
import AdminTable from '../../components/Table.vue'
import AdminModal from '../../components/Modal.vue'

const categorias = ref([])
const loading = ref(false)
const mostrarModal = ref(false)
const error = ref('')
const errores = ref({})
const guardando = ref(false)

const form = ref({
    id: null,
    name: '',
    slug:'',
    description: '',
    parent_id: null,
})

const obtenerCategorias = async () => {
    loading.value = true
    try {
        const res = await CategoryService.getCategories()
        categorias.value = Array.isArray(res.data.data) ? res.data.data : []

    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const abrirFormulario = (categoria = null) => {
    if (categoria) {
        form.value = {
            ...categoria,
            parent_id: categorias.value.find(cat => cat.id === categoria.parent_id) || null
        }
    } else {
        form.value = {
            id: null,
            name: '',
            slug:'',
            description: '',
            parent_id: null
        }
    }

    errores.value = {}
    error.value = ''
    mostrarModal.value = true
}


const cerrarModal = () => {
    mostrarModal.value = false
    form.value = { id: null, name: '', description: '', parent_id: null }
}

const guardarCategoria = async () => {
    errores.value = {}
    error.value = ''

    if (!form.value.name) errores.value.name = 'Nombre obligatorio'
    if (Object.keys(errores.value).length) return

    const nombreNormalizado = form.value.name.trim().toLowerCase()

    const payload = {
    name: nombreNormalizado,
    slug: nombreNormalizado
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'),
    description: form.value.description,
    parent_id: form.value.parent_id?.id || null,
}

    guardando.value = true

    try {
        if (form.value.id) {
            await CategoryService.patchCategory(form.value.id, payload)
            showSuccess('Actualizado correctamente')
        } else {
            await CategoryService.postCategory(payload)
            showSuccess('Creado correctamente')
        }
        await obtenerCategorias()
        cerrarModal()
    } catch (err) {
        error.value = parseError(err)
        showError('Error al guardar', error.value)
    } finally {
        guardando.value = false
    }
}

const eliminarCategoria = async (id) => {
    const confirmado = await showConfirm('¿Estás seguro?', 'Esta acción eliminará el registro.')
    if (!confirmado) return
    try {
        await CategoryService.deleteCategory(id)
        await obtenerCategorias()
        showSuccess('Eliminado correctamente')
    } catch (err) {
        showError('Error al eliminar', parseError(err))
    }
}

onMounted(obtenerCategorias)
</script>

<style scoped></style>