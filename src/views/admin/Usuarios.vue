<template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="">Usuarios</h5>
            <button class="btn btn-success" @click="abrirFormulario()">+ Nuevo Usuario</button>
        </div>
        <div v-if="loading" class="">Cargando...</div>
        <div v-else>
            <UserTable :datos="usuarios" :campos-filtrables="['names', 'last_names', 'role']" :por-pagina="20"
                :exportable="true">
                <template #thead>
                    <th>Foto</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </template>
                <template #row="{ item }">
                    <tr @click="abrirFormulario(item)" class="cursor-pointer">
                        <td><img :src="getImagenUrl(item.profile_photo)" class="card-img img-fluid"
                                style="max-width: 120px; max-height: 80px;" alt="foto de perfil" /></td>
                        <td>{{ item.names }}</td>
                        <td>{{ item.last_names }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.role }}</td>
                        <td>{{ item.status }}</td>

                        <td>
                            <button class="btn btn-sm btn-outline-warning me-2" @click.stop="abrirFormulario(item)">
                                <i class="bi bi-pencil" />
                            </button>
                            <button class="btn btn-sm btn-outline-danger" @click.stop="eliminarUsuario(item.id)">
                                <i class="bi bi-trash" />
                            </button>
                        </td>
                    </tr>
                </template>
            </UserTable>

            <UserModal :show="mostrarModal" :on-close="cerrarModal">
                <h5 class="mb-3">{{ form.id ? 'Editar' : 'Nuevo' }} Usuario</h5>
                <form @submit.prevent="guardarUsuario">
                    <div class="mb-2">
                        <label class="form-label">Nombres</label>
                        <input v-model="form.names" type="text" class="form-control" />
                        <div v-if="errores.names" class="text-danger small">{{ errores.names }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Apellidos</label>
                        <input v-model="form.last_names" type="text" class="form-control" />
                        <div v-if="errores.last_names" class="text-danger small">{{ errores.last_names }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Correo</label>
                        <input v-model="form.email" type="email" class="form-control" />
                        <div v-if="errores.email" class="text-danger small">{{ errores.email }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Contraseña</label>
                        <input v-model="form.password" type="password" class="form-control" />
                        <div v-if="errores.password" class="text-danger small">{{ errores.password }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Teléfono</label>
                        <input v-model="form.phone" type="tel" placeholder="+51 987654321"
                            pattern="^\+?[0-9\s\-]{7,20}$" class="form-control" />
                        <div v-if="errores.phone" class="text-danger small">{{ errores.phone }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Rol</label>
                        <select v-model="form.role" class="form-control">
                            <option disabled value="">Seleccione una opción</option>
                            <option value="administrador">Administrador</option>
                            <option value="agente">Agente</option>
                            <option value="cliente">Cliente</option>
                        </select>
                        <div v-if="errores.role" class="text-danger small">{{ errores.role }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Estado</label>
                        <select v-model="form.status" class="form-control">
                            <option disabled value="">Seleccione una opción</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        <div v-if="errores.status" class="text-danger small">{{ errores.status }}</div>
                    </div>

                    <div class="mb-2">
                        <label class="form-label">Foto</label>
                        <input type="file" class="form-control" @change="handleImageUpload" />
                        <div class="mt-2 d-flex flex-wrap" v-if="imagenPreview && imagenPreview.url">
                            <img :key="imagenPreview.name" :src="imagenPreview.url" class="img-thumbnail me-1 mb-1"
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
            </UserModal>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserService from '../../services/UsuarioService'
import { parseError } from '../../utils/parseError'
import { showSuccess, showError, showConfirm } from '../../utils/alert'
import UserTable from '../../components/Table.vue'
import UserModal from '../../components/Modal.vue'

const usuarios = ref([])
const loading = ref(false)
const mostrarModal = ref(false)
const error = ref('')
const errores = ref({})
const guardando = ref(false)
const imagenPreview = ref([])

const form = ref({
    id: null,
    names: '',
    last_names: '',
    email: '',
    password: '',
    phone: '',
    profile_photo: '',
    role: '',
    status: ''
})

const obtenerUsuarios = async () => {
    loading.value = true
    try {
        const res = await UserService.getUsers()
        usuarios.value = Array.isArray(res.data.data) ? res.data.data : []

    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const abrirFormulario = (usuario = null) => {
    if (usuario) {
        form.value = {
            ...usuario,
        }
    } else {
        form.value = {
            id: null,
            names: '',
            last_names: '',
            email: '',
            password: '',
            phone: '',
            profile_photo: '',
            role: '',
            status: ''
        }
    }

    errores.value = {}
    error.value = ''
    mostrarModal.value = true
}
const cerrarModal = () => {
    mostrarModal.value = false
    form.value = { id: null, names: '', last_names: '', email: '', password: '', phone: '', profile_photo: '', role: '', status: '' }
}

const guardarUsuario = async () => {
    errores.value = {}
    error.value = ''

    if (!form.value.names) errores.value.names = 'Nombre obligatorio'
    if (Object.keys(errores.value).length) return

    const formData = new FormData()
    formData.append('names', form.value.names,)
    formData.append('last_names', form.value.last_names,)
    formData.append('email', form.value.email,)
    formData.append('password', form.value.password,)
    formData.append('password_confirmation', form.value.password)
    formData.append('phone', form.value.phone,)
    formData.append('role', form.value.role,)
    formData.append('status', form.value.status,)
    if (form.value.profile_photo instanceof File) {
        formData.append('profile_photo', form.value.profile_photo)
    }
    
    guardando.value = true

    try {
        if (form.value.id) {
            await UserService.patchUser(form.value.id, formData)
            showSuccess('Actualizado correctamente')
        } else {
            await UserService.postUser(formData)
            showSuccess('Creado correctamente')
        }
        await obtenerUsuarios()
        cerrarModal()
    } catch (err) {
        error.value = parseError(err)
        showError('Error al guardar', error.value)
    } finally {
        guardando.value = false
    }
}
const eliminarUsuario = async (id) => {
    const confirmado = await showConfirm('¿Estás seguro?', 'Esta acción eliminará el registro.')
    if (!confirmado) return
    try {
        await UserService.deleteUser(id)
        await obtenerUsuarios()
        showSuccess('Eliminado correctamente')
    } catch (err) {
        showError('Error al eliminar', parseError(err))
    }
}
const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    form.value.profile_photo = file
    imagenPreview.value = {
        name: file.name,
        url: URL.createObjectURL(file)
    }
}

const getImagenUrl = (imagen) => {
    if (imagen) {
        return process.env.VUE_APP_API_URL + "/storage/" + imagen;
    }
}
onMounted(obtenerUsuarios)
</script>