import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
// import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  base: '',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      mode: 'history',
      component: () => import('@/components/index'),
      meta: {
        title: 'หน้าแรก',
        requiredAuth: true,
        PreventAuth: true
      }
    },
    {
      path: '/Class',
      name: 'Class',
      mode: 'history',
      component: () => import('@/components/Auth'),
      children: [
        {
          path: 'Create/1',
          name: 'Create_1',
          component: () => import('@/components/Class/Create_1'),
          meta: {
            title: 'สร้างห้องเรียน',
            requiredAuth: false,
            PreventAuth: true
          }
        },
        {
          path: 'Create/2',
          name: 'Create_2',
          component: () => import('@/components/Class/Create_2'),
          meta: {
            title: 'สร้างห้องเรียน',
            requiredAuth: false,
            PreventAuth: true
          }
        },
        {
          path: '*',
          name: 'Page Not found',
          component: () => import('@/components/404'),
          meta: {
            title: 'ERROR 404',
            requiredAuth: false,
            PreventAuth: false
          }
        }
      ],
      meta: {
        title: 'จัดการห้องเรียน',
        requiredAuth: false,
        PreventAuth: true
      }
    },
    {
      path: '/Auth',
      name: 'Auth',
      mode: 'history',
      component: () => import('@/components/Auth'),
      children: [
        {
          path: 'Login',
          name: 'Login',
          component: () => import('@/components/Auth/Login'),
          meta: {
            title: 'เข้าสู่ระบบ',
            requiredAuth: false,
            PreventAuth: true
          }
        },
        {
          path: 'Register',
          name: 'Register',
          component: () => import('@/components/Auth/Register'),
          meta: {
            title: 'สมัครสมาชิก',
            requiredAuth: false,
            PreventAuth: true
          }
        },
        {
          path: '*',
          name: 'Page Not found',
          component: () => import('@/components/404'),
          meta: {
            title: 'ERROR 404',
            requiredAuth: false,
            PreventAuth: false
          }
        }
      ],
      meta: {
        title: 'รับรองบัญชี',
        requiredAuth: false,
        PreventAuth: true
      }
    },
    {
      path: '/Home',
      name: 'Home',
      mode: 'history',
      component: () => import('@/components/Home'),
      meta: {
        title: 'หน้าหลัก',
        requiredAuth: true,
        PreventAuth: false
      }
    },
    {
      path: '/onlearn',
      name: 'learning',
      mode: 'history',
      component: () => import('@/components/learning'),
      meta: {
        title: 'กำลังหัดเขียน Vue',
        requiredAuth: true,
        PreventAuth: false
      }
    },
    {
      path: '*',
      name: 'Page Not Found',
      mode: 'history',
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

const DEFAULT_TITLE = 'APP | IT-RollCall'
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' | IT-RollCall'
  } else {
    document.title = DEFAULT_TITLE
  }
  NProgress.done()
})

export default router
