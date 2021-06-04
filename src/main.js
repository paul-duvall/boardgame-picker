import Vue from 'vue'
import App from './App.vue'

// Toast notifications
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

Vue.config.productionTip = false

Vue.use(VueToast);

new Vue({
  render: h => h(App),
}).$mount('#app')
