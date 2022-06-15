import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue') 
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dash.vue')
  },
   {
    path: '/Edit',
    name: 'Edit',
    component: () => import('../views/Edit.vue')
  }
]

const router = new VueRouter({
	mode: 'history',
  	routes
})

export default router
