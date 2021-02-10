import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Compose from '@/views/Compose.vue'
import { globalStore } from '@/store'
Vue.use(VueRouter)

const mustBeAuthenticated = (to, from, next) => {
  if (globalStore.loggedIn) {
    next()
    return
  }
  globalStore.addNotification("You were not logged in. This page needs you to be authenticated! :)", "error", 10000)
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "register" */ '../views/Login.vue')
  },
  {
    path: '/compose',
    name: 'Create Post',
    component: Compose,
    beforeEnter: mustBeAuthenticated
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
