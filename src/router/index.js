import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaTours from '../views/Categorias/ListaTours.vue'
import Tour from '../views/productos/ProductoDetalle.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tours/:categoria',
    name: 'listaTours',
    component: ListaTours,
  },
  {
    path: '/tours/:tour',
    name: 'tour',
    component:Tour,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
