import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DistrictView from '../views/DistrictView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/district/:name', name: 'district', component: DistrictView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router