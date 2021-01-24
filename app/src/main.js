import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

/* IMPORT ASSETS */
import './assets/small-frost.css'
import './assets/utils-frost.css'
import './assets/darkmode-frost.css'
import './assets/darkmode'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: store
}).$mount('#app')
