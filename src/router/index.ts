import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/admin/Dashboard.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import HomeView from '../views/public/HomeView.vue'
import Categorias from '@/views/admin/Categorias.vue'
import Destinos from '@/views/admin/Destinos.vue'
import Actividades from '@/views/admin/Actividades.vue'
import Productos from '@/views/admin/Productos.vue'
import Usuarios from '@/views/admin/Usuarios.vue'
import Promociones from '@/views/admin/Promociones.vue'
import Cupones from '@/views/admin/Cupones.vue'
import Reservas from '@/views/admin/Reservas.vue'
import Banners from '@/views/admin/Banners.vue'
import DetalleProducto from '@/views/public/DetalleProducto.vue'
import Tours from '@/views/public/Tours.vue'
import Reservacion from '@/views/public/Reservacion.vue'



const routes = [

  //Pagina Web
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'tours/:category/:slug', name: 'DetalleProducto', component: DetalleProducto },
      { path: '/tours/:parent/:category/:slug', name: 'DetalleProductoConParent', component: DetalleProducto},
      { path: '/tours/:category', name: 'CategoriasNav', component: Tours },
      { path:'/reserva/:slug',name:'ReservacionProducto',component:Reservacion} 
    ],
    meta: { requiresAuth: false },
  },
  //Dashboard
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'adminDashboard', component: Dashboard },
      { path: 'tours', name: 'Tours', component: Productos },
      { path: 'categorias', name: 'Categorias', component: Categorias },
      { path: 'destinos', name: 'Destinos', component: Destinos },
      { path: 'actividades', name: 'Actividades', component: Actividades },
      { path: 'productos', name: 'Productos', component: Productos },
      { path: 'cupones', name: 'Cupones', component: Cupones },
      { path: 'promociones', name: 'Promociones', component: Promociones },
      { path: 'usuarios', name: 'Usuarios', component: Usuarios },
      { path: 'banners', name: 'Banners', component: Banners },
      { path:'reservas', name:'Reservas', component:Reservas}

    ],
    meta: { requiresAuth: true, role: 'admin' },
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
