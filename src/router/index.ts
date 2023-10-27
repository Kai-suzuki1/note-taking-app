import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'top',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/TopIndex.vue')
      },
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/SignUp.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/LogIn.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      meta: { requiresAuth: false }
    },
    {
      // TODO change the temporary code for home
      path: '/home',
      name: 'home',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/LogIn.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      components: {
        default: () => import('../views/NotFound.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      meta: { requiresAuth: false }
    }
  ]
})

export default router
