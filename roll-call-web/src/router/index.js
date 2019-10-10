import Vue from 'vue'
import Router from 'vue-router'
// import Cookies from 'js-cookie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      mode: 'history'
      // component: () => import('@/components/HelloWorld')
    },
    {
      path: '*',
      name: '404 Page Not Found',
      // component: () => import('./pathToComponent'),
      meta: {
        title: '404 Page Not Found',
        requiredAuth: false
      }
    }
  ]
})
