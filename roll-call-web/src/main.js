// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'

// bootstrap
import './assets/css/bootstrap/bootstrap.css'
import './assets/css/bootstrap-vue/bootstrap-vue.css'
// progressbar
import './assets/css/nprogress.css'
// vendor
import './assets/vendor/font-awesome-5/css/fontawesome-all.min.css'
import './assets/vendor/animsition/animsition.min.css'
import './assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css'
import './assets/vendor/wow/animate.css'
import './assets/vendor/css-hamburgers/hamburgers.min.css'
import './assets/vendor/slick/slick.css'
import './assets/vendor/select2/select2.min.css'
import './assets/vendor/perfect-scrollbar/perfect-scrollbar.css'
import './assets/css/theme.css'
// page script
// import './assets/js/main.js'

Vue.config.productionTip = false
// Vue.config.silent = true
Vue.use(BootstrapVue)
// Vue.use(vue-jquery)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
