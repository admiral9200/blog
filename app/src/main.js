import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { globalStore } from './store'
import axios from 'axios';

/* IMPORT ASSETS */
import { setTheme } from './assets/darkmode';
import './assets/small-frost.css'
import './assets/utils-frost.css'
import './assets/darkmode-frost.css'

Vue.config.productionTip = false
Vue.prototype.$globals = globalStore;
Vue.prototype.$http = axios.create({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

new Vue({
  router,
  render: h => h(App),
  created() {
    setTheme();
  },
}).$mount('#app')
