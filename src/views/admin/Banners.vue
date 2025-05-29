<!-- <template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <form class="w-100">
                <h5 class="mb-3">Carrusel principal</h5>
                <div v-for="(item, index) in data.mainCarrusell" :key="'slide-' + index"
                    class="mb-4 p-3 rounded shadow-sm bg-white">
                    <h6>Slide {{ index + 1 }}</h6>
                    <div class="mb-2">
                        <label class="form-label">Nombre</label>
                        <input v-model="item.name" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Imagen (ruta)</label>
                        <input v-model="item.image" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Título</label>
                        <input v-model="item.title" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Descripción</label>
                        <textarea v-model="item.description" class="form-control"></textarea>
                    </div>
                </div>

                <h5 class="mb-3 mt-4">Ofertas especiales</h5>
                <div v-for="(offer, index) in data.specialOffers" :key="'offer-' + index"
                    class="mb-4 p-3 rounded shadow-sm bg-white">
                    <h6>Oferta {{ index + 1 }}</h6>
                    <div class="mb-2">
                        <label class="form-label">Nombre</label>
                        <input v-model="offer.name" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Imagen (ruta)</label>
                        <input v-model="offer.image" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">URL</label>
                        <input v-model="offer.url" type="text" class="form-control" />
                    </div>
                </div>

                <div class="text-end">
                    <button type="button" class="btn btn-primary" @click="updateConfig">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BannerService from '../../services/BannerService';
import { showSuccess, } from '../../utils/alert'

const data = ref({});

const loadConfig = async () => {
    const response = await BannerService.getBanner();
    data.value = response.data;
};

const updateConfig = async () => {
    await BannerService.putBanner(data.value);
    showSuccess('Actualizado correctamente')
};

onMounted(() => {
    loadConfig();
});
</script> -->

<script setup>
import { ref, onMounted } from 'vue';
import BannerService from '../../services/BannerService';
import ImagenService from '../../services/ImagenService';
import { showSuccess, showError } from '../../utils/alert';

const data = ref({});

const loadConfig = async () => {
    const response = await BannerService.getBanner();
    data.value = response.data;
};

const handleFileChange = async (e, item) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('title', item.name || 'imagen');
    formData.append('url', file);

    try {
        const response = await ImagenService.postImagen(formData);
        item.image = response.data.data.url; // Actualiza la URL de la imagen en el item
        console.log('Imagen subida correctamente:', response.data.url);
    } catch (err) {
        showError('Error al subir la imagen', err.message);
    }
};

const updateConfig = async () => {
    await BannerService.putBanner(data.value);
    showSuccess('Actualizado correctamente');
};

onMounted(() => {
    loadConfig();
});
</script>

<template>
    <div class="container mt-4 background-verdeopaco rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <form class="w-100">
                <h5 class="mb-3">Carrusel principal</h5>
                <div v-for="(item, index) in data.mainCarrusell" :key="'slide-' + index"
                    class="mb-4 p-3 rounded shadow-sm bg-white">
                    <h6>Slide {{ index + 1 }}</h6>
                    <div class="mb-2">
                        <label class="form-label">Nombre</label>
                        <input v-model="item.name" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Imagen</label>
                        <input type="file" class="form-control" @change="e => handleFileChange(e, item)" />
                        <small v-if="item.image" class="text-muted d-block mt-1">Subida: {{ item.image }}</small>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Título</label>
                        <input v-model="item.title" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Descripción</label>
                        <textarea v-model="item.description" class="form-control"></textarea>
                    </div>
                </div>

                <h5 class="mb-3 mt-4">Ofertas especiales</h5>
                <div v-for="(offer, index) in data.specialOffers" :key="'offer-' + index"
                    class="mb-4 p-3 rounded shadow-sm bg-white">
                    <h6>Oferta {{ index + 1 }}</h6>
                    <div class="mb-2">
                        <label class="form-label">Nombre</label>
                        <input v-model="offer.name" type="text" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Imagen</label>
                        <input type="file" class="form-control" @change="e => handleFileChange(e, offer)" />
                        <small v-if="offer.image" class="text-muted d-block mt-1">Subida: {{ offer.image }}</small>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">URL</label>
                        <input v-model="offer.url" type="text" class="form-control" />
                    </div>
                </div>

                <div class="text-end">
                    <button type="button" class="btn btn-primary" @click="updateConfig">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
