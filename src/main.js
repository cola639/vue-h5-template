import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './assets/icons' // svg
// import '@/permission' // permission control
import '@/plugins/vant'
import '@/styles/index.scss'
import 'vant/lib/index.less'

Vue.config.productionTip = false

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
