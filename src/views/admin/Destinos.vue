<template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5>Destinos</h5>
            <button class="btn btn-success" @click="abrirFormulario()">+ Nuevo Destino</button>
        </div>

        <div v-if="loading">Cargando...</div>

        <div v-else>
            <AdminTable :datos="destinos" :campos-filtrables="['place','country', 'description']" :por-pagina="20"
                :exportable="true">
                <template #thead>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>País</th>
                    <th>Descripción</th>
                    <th>Visible</th>
                    <th>Acciones</th>
                </template>

                <template #row="{ item }">
                    <tr @click="abrirFormulario(item)" class="cursor-pointer">
                        <td><img :src="getImagenUrl(item.image.url)" class="card-img img-fluid"
                                style="max-width: 120px; max-height: 80px;" alt="Imagen destino" /></td>
                        <td>{{ item.place }}</td>
                        <td>{{ item.country }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.visible_in_main_web === true ? 'Visible' : '—' }}</td>

                        <td>
                            <button class="btn btn-sm btn-outline-warning me-2" @click.stop="abrirFormulario(item)">
                                <i class="bi bi-pencil" />
                            </button>
                            <button class="btn btn-sm btn-outline-danger" @click.stop="eliminarDestino(item)">
                                <i class="bi bi-trash" />
                            </button>
                        </td>
                    </tr>
                </template>
            </AdminTable>
        </div>

        <!-- MODAL -->
        <AdminModal :show="mostrarModal" :on-close="cerrarModal">
            <h5 class="mb-3">{{ form.id ? 'Editar' : 'Nuevo' }} Destino</h5>
            <form @submit.prevent="guardarDestino">
                <div class="mb-2">
                    <label class="form-label">Nombre</label>
                    <input v-model="form.place" type="text" class="form-control" />
                    <div v-if="errores.place" class="text-danger small">{{ errores.place }}</div>
                </div>

                <div class="mb-2">
                    <label class="form-label">País</label>
                    <input v-model="form.country" type="text" class="form-control" />
                    <div v-if="errores.country" class="text-danger small">{{ errores.country }}</div>
                </div>

                <div class="mb-2">
                    <label class="form-label">Descripción</label>
                    <textarea v-model="form.description" class="form-control" rows="2" />
                </div>


                <div class="mb-2">
                    <label class="form-label">Imágen</label>
                    <input type="file" class="form-control" @change="handleImageUpload" />
                    <div class="mt-2 d-flex flex-wrap" v-if="imagenPreview && imagenPreview.url">
                        <img :key="imagenPreview.name" :src="imagenPreview.url" class="img-thumbnail me-1 mb-1"
                            style="width: 60px; height: 60px;" />
                    </div>
                </div>

                <div class="mb-2 mt-3">
                    <label class="form-label"> <input v-model="form.visible_in_main_web" class="form-check-input"
                            type="checkbox" id="vivisbleCheck" /> Visible para cliente</label>
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
import DestinoService from '../../services/DestinoService'
import ImagenService from '../../services/ImagenService'
import { parseError } from '../../utils/parseError'
import { showSuccess, showError, showConfirm } from '../../utils/alert'
import AdminTable from '../../components/Table.vue'
import AdminModal from '../../components/Modal.vue'


const destinos = ref([])
const loading = ref(false)
const mostrarModal = ref(false)
const error = ref('')
const errores = ref({})
const guardando = ref(false)
const imagen = ref([])
const imagenPreview = ref([])

const form = ref({
    id: null,
    place: '',
    country: '',
    description: '',
    visible_in_main_web: false,
    image_id: '',
})

const obtenerDestinos = async () => {
    loading.value = true
    try {
        const res = await DestinoService.getDestinos()
        destinos.value = Array.isArray(res.data.data) ? res.data.data : []
    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const getImagenUrl = (imagen) => {
    if (imagen) {
        return process.env.VUE_APP_API_URL + "/storage/" + imagen;
    }
}

const abrirFormulario = (destino = null) => {
    form.value = destino ? { 
        ...destino,
        // Asegurar que tenemos los campos necesarios
        place: destino.place || '',
        country: destino.country || '',
        description: destino.description || '',
        visible_in_main_web: destino.visible_in_main_web || false,
        image_id: destino.image?.id || null
    } : { 
        id: null, 
        place: '', 
        country: '', 
        description: '', 
        visible_in_main_web: false, 
        image_id: null 
    };
    
    // Resetear imagen temporal y preview
    imagen.value = null;
    imagenPreview.value = destino?.image?.url ? {
        url: getImagenUrl(destino.image.url),
        name: 'Imagen actual'
    } : null;
    
    errores.value = {};
    error.value = '';
    mostrarModal.value = true;
};

const cerrarModal = () => {
    mostrarModal.value = false;
    form.value = { 
        id: null, 
        place: '', 
        country: '', 
        description: '', 
        visible_in_main_web: false, 
        image_id: null 
    };
    imagen.value = null;
    imagenPreview.value = null;
};

// const guardarDestino = async () => {
//     errores.value = {}
//     error.value = ''

//     if (!form.value.place) errores.value.place = 'Nombre obligatorio'
//     if (Object.keys(errores.value).length) return

//     guardando.value = true
//     try {
//         let nuevaImageId = null
//         let imagenAnteriorId = null

//         if (form.value.id) {
//             const response = await DestinoService.getDestinoDetails(form.value.id)
//             imagenAnteriorId = response.data.data.image_id
//         }

//         if (imagen.value) {
//             const formData = new FormData()
//             formData.append('title', imagen.value.name)
//             formData.append('url', imagen.value)

//             const res = await ImagenService.postImagen(formData)
//             nuevaImageId = res.data.data.id
//             form.value.image_id = nuevaImageId
//         }

//         const payload = {
//             place: form.value.place,
//             country: form.value.country,
//             description: form.value.description,
//             visible_in_main_web: form.value.visible_in_main_web,
//             image_id: form.value.image_id,
//         }
//         if (form.value.id) {
//             await DestinoService.patchDestino(form.value.id, payload)
//             if (nuevaImageId && imagenAnteriorId && nuevaImageId !== imagenAnteriorId) {
//                 await ImagenService.deleteImagen(imagenAnteriorId)
//             }

//             showSuccess('Actualizado correctamente')
//         } else {
//             await DestinoService.postDestino(payload)
//             showSuccess('Creado correctamente')
//         }

//         imagen.value = null
//         await obtenerDestinos()
//         cerrarModal()
//     // } catch (err) {
//     //     error.value = parseError(err)
//     //     showError('Error al guardar', error.value)
//     // } finally {
//     //     guardando.value = false
//     // }
//     } catch (err) {
//         if (err.response && err.response.status === 422) {
//             console.error('Errores de validación:', err.response.data.errors)
//         }
//         error.value = parseError(err)
//         showError('Error al guardar', error.value)
//     } finally {
//         guardando.value = false
//     }
// }
const guardarDestino = async () => {
    errores.value = {};
    error.value = '';

    // Validaciones básicas
    if (!form.value.place) errores.value.place = 'Nombre obligatorio';
    if (Object.keys(errores.value).length) return;

    guardando.value = true;
    
    try {
        // 1. Manejo de la imagen
        let imageOperation = {
            newImageId: null,
            oldImageId: form.value.id ? form.value.image_id : null
        };

        // Solo procesar imagen si se subió una nueva
        if (imagen.value) {
            const formData = new FormData();
            formData.append('title', `destino-${Date.now()}`);
            formData.append('url', imagen.value);

            const res = await ImagenService.postImagen(formData);
            imageOperation.newImageId = res.data.data.id;
        }

        // 2. Preparar payload según el tipo de operación
        const payload = {
            place: form.value.place,
            country: form.value.country,
            description: form.value.description,
            visible_in_main_web: form.value.visible_in_main_web,
            ...(imageOperation.newImageId && { image_id: imageOperation.newImageId })
        };

        // 3. Operación de guardado
        if (form.value.id) {
            // Actualización
            await DestinoService.patchDestino(form.value.id, payload);
            
            // Eliminar imagen anterior solo después de confirmar la actualización
            if (imageOperation.newImageId && imageOperation.oldImageId) {
                try {
                    await ImagenService.deleteImagen(imageOperation.oldImageId);
                } catch (deleteError) {
                    console.error("Error eliminando imagen anterior:", deleteError);
                }
            }
            
            showSuccess('Destino actualizado correctamente');
        } else {
            // Creación - validar que tenga imagen
            if (!imageOperation.newImageId) {
                throw new Error('Debes subir una imagen para el nuevo destino');
            }
            
            await DestinoService.postDestino(payload);
            showSuccess('Destino creado correctamente');
        }

        // 4. Limpiar y actualizar
        await obtenerDestinos();
        cerrarModal();
    } catch (err) {
        handleSaveError(err);
    } finally {
        guardando.value = false;
    }
};
const handleSaveError = (err) => {
    if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        // Manejar errores específicos de imagen
        if (errors.url) {
            error.value = `Error en la imagen: ${errors.url[0]}`;
        } else {
            error.value = Object.values(errors)
                .flat()
                .join(', ');
        }
    } else {
        error.value = parseError(err);
    }
    showError('Error al guardar', error.value);
};

const eliminarDestino = async (destino) => {
    const confirmado = await showConfirm('¿Estás seguro?', 'Esta acción eliminará el registro.')
    if (!confirmado) return
    try {
        await ImagenService.deleteImagen(destino.image_id)
        await obtenerDestinos()
        showSuccess('Eliminado correctamente')
    } catch (err) {
        showError('Error al eliminar', parseError(err))
    }
}


const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    imagen.value = file
    imagenPreview.value = {
        name: file.name,
        url: URL.createObjectURL(file)
    }
}


onMounted(obtenerDestinos)
</script>

<style scoped></style>