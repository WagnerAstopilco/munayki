<template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5>Actividades</h5>
        <button class="btn btn-success" @click="abrirFormulario()">+ Nueva Actividad</button>
      </div>
  
      <div v-if="loading">Cargando...</div>
  
      <div v-else>
        <AdminTable
          :datos="actividades"
          :campos-filtrables="['name', 'description']"
          :por-pagina="20"
          :exportable="true"
        >
          <template #thead>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </template>
  
          <template #row="{ item }">
            <tr @click="abrirFormulario(item)" class="cursor-pointer">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>
                <button class="btn btn-sm btn-outline-warning me-2" @click.stop="abrirFormulario(item)">
                  <i class="bi bi-pencil" />
                </button>
                <button class="btn btn-sm btn-outline-danger" @click.stop="eliminarActividad(item.id)">
                  <i class="bi bi-trash" />
                </button>
              </td>
            </tr>
          </template>
        </AdminTable>
      </div>
  
      <!-- MODAL -->
      <AdminModal :show="mostrarModal" :on-close="cerrarModal">
        <h5 class="mb-3">{{ form.id ? 'Editar' : 'Nueva' }} Actividad</h5>
        <form @submit.prevent="guardarActividad">
          <div class="mb-2">
            <label class="form-label">Nombre</label>
            <input v-model="form.name" type="text" class="form-control" />
            <div v-if="errores.name" class="text-danger small">{{ errores.name }}</div>
          </div>
          <div class="mb-2">
            <label class="form-label">Descripción</label>
            <textarea v-model="form.description" class="form-control" rows="2" />
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
  import { ref, onMounted } from 'vue'
  import ActividadService from '../../services/ActividadService'
  import { parseError } from '../../utils/parseError'
  import { showSuccess, showError, showConfirm } from '../../utils/alert'
  import AdminTable from '../../components/Table.vue'
  import AdminModal from '../../components/Modal.vue'
  
  const actividades = ref([])
  const loading = ref(false)
  const mostrarModal = ref(false)
  const error = ref('')
  const errores = ref({})
  const guardando = ref(false)
  
  const form = ref({
    id: null,
    name: '',
    description: ''
  })
  
  const obtenerActividades = async () => {
    loading.value = true
    try {
      const res = await ActividadService.getActividades()
      actividades.value = Array.isArray(res.data.data) ? res.data.data : []
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  
  const abrirFormulario = (actividad = null) => {
    form.value = actividad
      ? { ...actividad }
      : { id: null, name: '', description: '' }
    errores.value = {}
    error.value = ''
    mostrarModal.value = true
  }
  
  const cerrarModal = () => {
    mostrarModal.value = false
    form.value = { id: null, name: '', description: '' }
  }
  
  const guardarActividad = async () => {
    errores.value = {}
    error.value = ''
  
    if (!form.value.name) errores.value.name = 'Nombre obligatorio'
    if (Object.keys(errores.value).length) return
  
    const payload = {
      name: form.value.name,
      description: form.value.description
    }
  
    guardando.value = true
    try {
      if (form.value.id) {
        await ActividadService.patchActividad(form.value.id, payload)
        showSuccess('Actualizado correctamente')
      } else {
        await ActividadService.postActividad(payload)
        showSuccess('Creado correctamente')
      }
      await obtenerActividades()
      cerrarModal()
    } catch (err) {
      error.value = parseError(err)
      showError('Error al guardar', error.value)
    } finally {
      guardando.value = false
    }
  }
  
  const eliminarActividad = async (id) => {
    const confirmado = await showConfirm('¿Estás seguro?', 'Esta acción eliminará el registro.')
    if (!confirmado) return
    try {
      await ActividadService.deleteActividad(id)
      await obtenerActividades()
      showSuccess('Eliminado correctamente')
    } catch (err) {
      showError('Error al eliminar', parseError(err))
    }
  }
  
  onMounted(obtenerActividades)
  </script>
  
  <style scoped></style>
  