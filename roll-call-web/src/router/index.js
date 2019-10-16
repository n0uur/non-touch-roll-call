import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
// import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  base: '',
  routes: [
    {
      path: '/login',
      name: 'Login',
      mode: 'history',
      // component: () => import('@/components/Login'),
      meta: {
        title: 'เข้าสู่ระบบ',
        requiredAuth: false,
        PreventAuth: true
      }
    },
    {
      path: '*',
      name: 'Page Not Found',
      component: () => import('@/components/404'),
      meta: {
        title: 'ERROR 404',
        requiredAuth: false,
        PreventAuth: false
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

const DEFAULT_TITLE = 'APP | IT ROLL-CALL'
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' | IT ROLL-CALL'
  } else {
    document.title = DEFAULT_TITLE
  }
  NProgress.done()
})

export default router
