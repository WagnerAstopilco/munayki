<template>
  <div class="admin-table-wrapper">
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <input
        v-model="filtro"
        type="text"
        class="form-control w-100 w-md-25"
        placeholder="Buscar..."
      >
      <div class="d-flex gap-2">
        <span class="text-white small">Total: {{ datosFiltrados.length }}</span>
        <button
          v-if="exportable"
          class="btn btn-sm btn-outline-light"
          @click="exportarExcel"
        >
          <i class="bi bi-file-earmark-excel" /> Exportar Excel
        </button>
      </div>
    </div>
  
    <div class="table-responsive rounded overflow-hidden">
      <table class="table table-hover table-bordered table-custom">
        <thead>
          <tr>
            <slot name="thead" />
          </tr>
        </thead>
        <tbody>
          <slot
            name="row"
            v-for="item in paginados"
            :item="item"
            :key="item.id"
          />
        </tbody>
      </table>
    </div>
  
    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: pagina === 1 }"
        >
          <a
            class="page-link"
            @click="pagina > 1 && pagina--"
          >Anterior</a>
        </li>
        <li
          v-for="n in totalPaginas"
          :key="n"
          :class="['page-item', { active: pagina === n }]"
        >
          <a
            class="page-link"
            @click="pagina = n"
          >{{ n }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: pagina === totalPaginas }"
        >
          <a
            class="page-link"
            @click="pagina < totalPaginas && pagina++"
          >Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import * as XLSX from 'xlsx'
  
  const props = defineProps<{
    datos: any[]
    camposFiltrables: string[]
    porPagina?: number
    exportable?: boolean
  }>()
  
  const filtro = ref('')
  const pagina = ref(1)
  
  const datosFiltrados = computed(() =>
    props.datos.filter((item) =>
      props.camposFiltrables.some((campo) =>
        (item[campo] || '').toString().toLowerCase().includes(filtro.value.toLowerCase())
      )
    )
  )
  
  const totalPaginas = computed(() =>
    Math.ceil(datosFiltrados.value.length / (props.porPagina || 20))
  )
  
  const paginados = computed(() =>
    datosFiltrados.value.slice(
      (pagina.value - 1) * (props.porPagina || 20),
      pagina.value * (props.porPagina || 20)
    )
  )
  
  watch(filtro, () => (pagina.value = 1))
  
  const exportarExcel = () => {
    if (!datosFiltrados.value.length) return
    const worksheet = XLSX.utils.json_to_sheet(datosFiltrados.value)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos')
    XLSX.writeFile(workbook, 'exportacion.xlsx')
  }
  </script>
  
  <style scoped>
  .table-custom {
    border-radius: 12px;
    overflow: hidden;
    color: #fefefe;
  }
  
  thead tr {
    background-color: #007B6E;
    color: #fff;
  }
  
  tbody tr td {
    background-color: #002E4D;
  }
  
  .pagination .page-link {
    background-color: #002E4D;
    color: #fff;
    border: none;
  }
  
  .pagination .page-item.active .page-link {
    background-color: #02F5BD;
    color: #002E4D;
  }
  </style>
  