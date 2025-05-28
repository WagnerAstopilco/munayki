<template>
    <div class="">
        <div class="row align-items-center justify-content-center bg-success text-white" style="height: 200px;">
        </div>
        <div class="container mt-4">
            <h2>Reservación de Tour</h2>
            <div class="d-flex gap-3">
                <div class="flex-grow-1">
                    <div class="card p-3">
                        <h4>Información de pasajeros</h4>

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
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>

                                <div class="form-check">
                                    <input v-model="person.is_adult" type="checkbox" class="form-check-input"
                                        :id="'adultCheck' + index" />
                                    <label class="form-check-label" :for="'adultCheck' + index">Es adulto</label>
                                </div>
                            </form>

                            <button class="btn btn-danger btn-sm mt-2" @click="removePerson(index)"
                                v-if="persons.length > 1">
                                Eliminar persona
                            </button>
                        </div>

                        <button class="btn btn-primary" @click="addPerson">
                            Agregar persona
                        </button>
                    </div>
                </div>


                <div style="width: 300px;">
                    <div class="card p-3">
                        <h4>Detalle del Tour</h4>
                        <p><strong>Nombre:</strong> {{ tour.name }}</p>
                        <p><strong>Precio:</strong> {{ tour.number_of_people>1? tour.price_PEN:`S/.${tour.price_PEN} por persona`}}</p>
                        <p><strong>Tipo:</strong>
                            {{ tour.number_of_people > 1 ? `Paquete para ${tour.number_of_people} personas` :
                            'Individual' }}
                        </p>
                        <  


                        <button class="btn btn-success w-100 mb-2" @click="reservar">
                            Reservar ahora
                        </button>
                        <button class="btn btn-warning w-100" @click="pagar">
                            Pagar ahora
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script setup>
import { reactive, ref, watch, onMounted,computed } from "vue"
import ProductoService from '../../services/ProductoService'
import { useRoute } from 'vue-router'


const tour = ref({})
const route = useRoute()
let res
const slug = route.params.slug

// const name = computed(() => {
//     return '/' + route.fullPath.replace(/^\/tours\//, '')
// })
const obtenerProducto = async () => {
    const res = await ProductoService.getProductos();
    tour.value = res.data.data.find(producto => producto.slug === slug);
}

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

// Mantener cantidad de personas sincronizada con tour.personsCount
watch(
    () => tour.personsCount,
    (newCount) => {
        if (newCount < 1) {
            tour.personsCount = 1
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

const reservar = () => {
    alert(
        `Reservar ahora para ${persons.value.length} persona(s)\n` +
        JSON.stringify(persons.value, null, 2)
    )
}

const pagar = () => {
    alert(
        `Pagar ahora para ${persons.value.length} persona(s)\n` +
        JSON.stringify(persons.value, null, 2)
    )
}

onMounted(() => {
    obtenerProducto();

   
})
</script>

<style scoped>
/* Opcional: ajustar el scroll si hay muchas personas */
.card.p-3 {
    max-height: 80vh;
    overflow-y: auto;
}
</style>
