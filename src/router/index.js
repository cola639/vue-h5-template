import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes } from './routers'

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base: process.env.VUE_APP_PUBLIC_PATH, // publicPath
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
