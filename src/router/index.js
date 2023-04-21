import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home') // covert to function lazy load
const NotFound = () => import('@/views/404')

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Custom Title'
    }
  },

  {
    path: '/404',
    name: 'notFound',
    component: NotFound,
    meta: {
      title: '页面不存在'
    }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
