import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vue-facebook/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/vue-facebook/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/vue-facebook/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/vue-facebook/photoalbum',
      name: 'photoalbum',
      component: () => import('../views/PhotoalbumView.vue'),
    },
  ],
})

export default router
