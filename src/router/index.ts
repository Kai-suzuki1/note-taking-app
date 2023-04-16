import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import TopIndex from '../views/TopIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'top',
      component: TopIndex
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})

export default router
