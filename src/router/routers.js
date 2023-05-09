// covert to function lazy load
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Profile = () => import('@/views/Profile')
const NotFound = () => import('@/views/404')

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { title: '关于我', keepAlive: false }
      }
    ]
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
