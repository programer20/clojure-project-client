import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'filters',
    component: () => import('../views/Filters.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: () => import('../views/SearchResult.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
