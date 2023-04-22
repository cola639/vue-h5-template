import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// import '@/permission' // permission control

import Vant from 'vant'

import '@/styles/index.scss'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(Vant)

// Mock data
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
