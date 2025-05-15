<template>
  <div class="container mt-4 background-verdeopaco rounded-3 p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>Tours / Productos</h5>
      <button class="btn btn-success" @click="abrirFormulario()">+ Nuevo Tour</button>
    </div>

    <div v-if="loading">Cargando...</div>
    <div v-else>
      <AdminTable :datos="productos" :campos-filtrables="['name', 'description']" :por-pagina="20" :exportable="true">
        <template #thead>
          <th>Nombre</th>
          <th>Destino</th>
          <th>Categoría</th>
          <th>Días</th>
          <th>Noches</th>
          <th>Personas</th>
          <th>Precio PEN</th>
          <th>USD</th>
          <th>Acciones</th>
        </template>
        <template #row="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>--</td>
            <td>--</td>
            <td>{{ item.number_of_days }}</td>
            <td>{{ item.number_of_nights }}</td>
            <td>{{ item.number_of_people }}</td>
            <td>S/ {{ item.price_PEN }}</td>
            <td>$ {{ item.price_USD }}</td>
            <td>
              <button class="btn btn-sm btn-outline-warning me-2" @click="abrirFormulario(item)">
                <i class="bi bi-pencil" />
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="eliminarProducto(item.id)">
                <i class="bi bi-trash" />
              </button>
            </td>
          </tr>
        </template>
      </AdminTable>
    </div>

    <AdminModal :show="mostrarModal" :on-close="cerrarModal">
      <h5 class="mb-3">{{ form.id ? 'Editar' : 'Nuevo' }} Tour</h5>
      <form @submit.prevent="guardarProducto">
        <div class="mb-2" v-for="(label, field) in campos" :key="field">
          <label class="form-label">{{ label }}</label>
          <input
            v-if="['price_PEN', 'price_USD', 'stock', 'number_of_days', 'number_of_nights', 'number_of_people'].includes(field)"
            v-model="form[field]" type="number" class="form-control" />
          <input v-else-if="field==='name'" v-model="form.name" type="text" class="form-control"/>
          <textarea v-else-if="['description', 'itinerary','reservation_requirements','reservation_included'].includes(field)" 
          v-model="form[field]" class="form-control" rows="2" />
        </div>



        <div class="mb-2">
          <label class="form-label">Destino</label>
          <Multiselect v-model="form.destino_id" :options="destinos || []" :track-by="'id'" :label="'place'"
            placeholder="Destino" />
        </div>

        <div class="mb-2">
          <label class="form-label">Categoría</label>
          <Multiselect v-model="form.category_id" :options="categorias || []" :track-by="'id'" :label="'name'"
            placeholder="Categoría" />
        </div>

        <div class="mb-2">
          <label class="form-label">Actividades</label>
          <Multiselect v-model="form.activities" :options="actividades || []" :multiple="true" :track-by="'id'"
            :label="'name'" placeholder="Selecciona actividades" />
        </div>

        <div class="mb-2">
          <label class="form-label">Brochure (PDF o archivo)</label>
          <input type="file" class="form-control" accept=".pdf,.doc,.docx" @change="handleFileUpload" />
        </div>

        <div class="mb-2">
          <label class="form-label">Imágenes</label>
          <input type="file" class="form-control" multiple @change="handleImageUpload" />
          <div class="mt-2 d-flex flex-wrap">
            <img v-for="img in imagenesPreview" :key="img.name" :src="img.url" class="img-thumbnail me-1 mb-1"
              style="width: 60px; height: 60px;" />
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
    </AdminModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductoService from '@/services/ProductoService'
import CategoryService from '@/services/CategoryService'
import ActividadService from '@/services/ActividadService'
import DestinoService from '@/services/DestinoService'
import { showSuccess, showError, showConfirm } from '@/utils/alert'
import { parseError } from '@/utils/parseError'
import AdminTable from '@/components/Table.vue'
import AdminModal from '@/components/Modal.vue'
import Multiselect from 'vue-multiselect'

const productos = ref([])
const categorias = ref([])
const actividades = ref([])
const destinos = ref([])
const imagenes = ref([])
const imagenesPreview = ref([])
const brochure = ref(null)

const loading = ref(false)
const mostrarModal = ref(false)
const error = ref('')
const errores = ref({})
const guardando = ref(false)

const campos = {
  name: 'Nombre',
  description: 'Descripción',
  price_PEN: 'Precio PEN',
  price_USD: 'Precio USD',
  stock: 'Stock',
  number_of_days: 'Nro. de días',
  number_of_nights: 'Nro. de noches',
  number_of_people: 'Nro. de personas',
  itinerary: 'Itinerario',
  reservation_requirements: 'Requisitos de reserva',
  reservation_included: 'Incluye',
}

const form = ref({
  id: null,
  name: '',
  slug: '',
  description: '',
  price_PEN: '',
  price_USD: '',
  stock: 1,
  number_of_days: 1,
  number_of_nights: 0,
  number_of_people: 1,
  file: null,
  itinerary: '',
  reservation_requirements: '',
  reservation_included: '',
  destino_id: null,
  category_id: null,
  activities: [],
  visible_in_main_web: false,
})

const obtenerProductos = async () => {
  loading.value = true
  try {
    const res = await ProductoService.getProductos()
    productos.value = res.data.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const obtenerRelaciones = async () => {
  const [cat, act, des] = await Promise.all([
    CategoryService.getCategories(),
    ActividadService.getActividades(),
    DestinoService.getDestinos()
  ])
  categorias.value = cat.data.data
  actividades.value = act.data.data
  destinos.value = des.data.data
}

const abrirFormulario = (producto = null) => {
  if (producto) {
    form.value = {
      ...producto,
      destino_id: destinos.value.find(d => d.id === producto.destino_id) || null,
      category_id: categorias.value.find(c => c.id === producto.category_id) || null,
      activities: producto.activities || []
    }
  } else {
    Object.assign(form.value, {
      id: null, name: '', slug: '', description: '', price_PEN: '', price_USD: '', stock: 1,
      number_of_days: 1, number_of_nights: 0, number_of_people: 1, file: null, itinerary: '', reservation_requirements: '',
      reservation_included: '', destino_id: null, category_id: null, activities: [], visible_in_main_web: false,
    })
  }
  imagenes.value = []
  imagenesPreview.value = []
  brochure.value = null
  errores.value = {}
  error.value = ''
  mostrarModal.value = true
}

const cerrarModal = () => { mostrarModal.value = false }

const handleImageUpload = (e) => {
  imagenes.value = Array.from(e.target.files)
  imagenesPreview.value = imagenes.value.map(file => ({
    name: file.name,
    url: URL.createObjectURL(file)
  }))
}

const handleFileUpload = (e) => {
  brochure.value = e.target.files[0] || null
}

const guardarProducto = async () => {
  errores.value = {}
  error.value = ''

  if (!form.value.name) errores.value.name = 'Nombre obligatorio'
  if (Object.keys(errores.value).length) return

  const payload = {
    ...form.value,
    destino_id: form.value.destino_id?.id || null,
    category_id: form.value.category_id?.id || null,
    activities: form.value.activities.map(a => a.id),
  }

  guardando.value = true
  try {
    let res
    if (form.value.id) {
      res = await ProductoService.patchProducto(form.value.id, payload)
      showSuccess('Actualizado correctamente')
    } else {
      res = await ProductoService.postProducto(payload)
      showSuccess('Creado correctamente')
    }

    const id = res.data.id

    if (imagenes.value.length > 0) {
      const formData = new FormData()
      imagenes.value.forEach(file => formData.append('images[]', file))
      await ProductoService.uploadImagenes(id, formData)
    }

    if (brochure.value) {
      const brochureData = new FormData()
      brochureData.append('file', brochure.value)
      await ProductoService.uploadBrochure(id, brochureData)
    }

    await obtenerProductos()
    cerrarModal()
  } catch (err) {
    error.value = parseError(err)
    showError('Error al guardar', error.value)
  } finally {
    guardando.value = false
  }
}

const eliminarProducto = async (id) => {
  const confirmado = await showConfirm('¿Eliminar tour?', 'Esta acción no se puede deshacer.')
  if (!confirmado) return
  try {
    await ProductoService.deleteProducto(id)
    await obtenerProductos()
    showSuccess('Tour eliminado correctamente')
  } catch (err) {
    showError('Error al eliminar', parseError(err))
  }
}

onMounted(async () => {
  await obtenerProductos()
  await obtenerRelaciones()
})
</script>

<style scoped>
.img-thumbnail {
  object-fit: cover;
}
</style>