<template>
    <div>
        <h3>Modificar Configuración</h3>
        <div v-if="config">
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="campo1" class="form-label">Campo 1</label>
                    <input v-model="config.campo1" type="text" class="form-control" id="campo1">
                </div>
                <div class="mb-3">
                    <label for="campo2" class="form-label">Campo 2</label>
                    <input v-model="config.campo2" type="text" class="form-control" id="campo2">
                </div>
                <button type="submit" class="btn btn-primary">Actualizar</button>
            </form>
        </div>
        <div v-else>
            <p>Cargando configuración...</p>
        </div>
    </div>
</template>

<script setup>
// Importaciones necesarias
import { ref, onMounted } from 'vue';

const config = ref(null);

// Cargar el archivo JSON estático del frontend
const loadConfig = () => {
    // Aquí se puede cargar el JSON desde un archivo local o un objeto estático.
    // Si está en un archivo `.json` en el directorio público:
    // const configData = require('@/assets/config.json');

    // Si el JSON es un objeto estático directamente en el código
    config.value = {
        campo1: 'Texto de ejemplo 1',
        campo2: 'Texto de ejemplo 2',
    };
};

// Función para actualizar el JSON localmente
const submitForm = () => {
    // Aquí puedes manipular el JSON de manera directa.
    console.log('Configuración actualizada:', config.value);
    alert('Configuración actualizada correctamente');
};

// Cargar la configuración cuando el componente se monta
onMounted(loadConfig);
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>
