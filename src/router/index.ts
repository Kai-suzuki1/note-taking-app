import { createRouter, createWebHistory } from 'vue-router'
import TopIndex from '../views/TopIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'top',
      component: TopIndex
    }
  ]
})

export default router
