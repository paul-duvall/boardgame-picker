import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import App from './App.vue'
import Main from './layouts/Main.vue'
import Collection from './layouts/Collection.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)

// Router

const routes = [
  { path: '/', component: Main },
  { path: '/collection', component: Collection }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Toast notifications
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

Vue.config.productionTip = false

Vue.use(VueToast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
