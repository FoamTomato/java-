import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import animate from 'animate.css'

Vue.config.productionTip = false
Vue.use(animate)

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
