import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
// import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
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
      component: () => import('@/components/404'),
      meta: {
        title: '404 Page Not Found',
        requiredAuth: false
      }
    }
  ]
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
