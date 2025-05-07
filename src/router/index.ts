import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/admin/Dashboard.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

import HomeView from '../views/public/HomeView.vue'
import Categorias from '@/views/admin/Categorias.vue'
import Destinos from '@/views/admin/Destinos.vue'
import Actividades from '@/views/admin/Actividades.vue'
import Productos from '@/views/admin/Productos.vue'
import DetalleProducto from '@/views/public/DetalleProducto.vue'
import Tours from '@/views/public/Tours.vue'


const routes = [
 
  //Pagina Web
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'tours/:idtour', name: 'DetalleProducto', component: DetalleProducto },
      { path: 'tours', name: 'Producto', component: Tours },
     
    ],
    meta: { requiresAuth: false },
  },
  //Dashboard
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'adminDashboard', component: Dashboard },
      { path: 'categorias', name: 'Categorias', component: Categorias },
      { path: 'destinos', name: 'Destinos', component: Destinos },
      { path: 'actividades', name: 'Actividades', component: Actividades },
      { path: 'tours', name: 'Tours', component: Productos },
     
    ],
    meta: { requiresAuth: true, role: 'admin' },
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
