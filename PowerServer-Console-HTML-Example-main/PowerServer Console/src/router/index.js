import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Console from '@/pages/dashboard/Console'
import setting from '@/config/setting'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })
Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 不需要权限的路由
export const routes = [
  {
    path: '/',
    redirect: '/dashboard/console'
  },
  {
    path: '/dashboard',
    component: Home,
    meta: {
      title: 'PowerServer'
    },
    children: [
      {
        path: 'console',
        component: Console,
        meta: {
          title: 'Console'
        }
      }
    ]
  }
]

const router = new Router({
  routes
})

// 需要权限的路由
export const allowRouters = [
  {
    path: '/session',
    component: Home,
    meta: {
      title: 'Monitor Center'
    },
    children: [
      {
        path: 'sessions',
        component: () => import('@/pages/session/sessionList'),
        meta: {
          title: 'Sessions'
        }
      }
    ]
  },{
    path: '/application',
    component: Home,
    meta: {
      title: 'Configuration Manager'
    },
    children: [
      {
        path: 'applications',
        component: () => import('@/pages/application/applicationList'),
        meta: {
          title: 'Applications'
        }
      }
    ]
  },{
    path: '/transaction',
    component: Home,
    meta: {
      title: 'Monitor Center'
    },
    children: [
      {
        path: 'transactions',
        component: () => import('@/pages/transaction/transactionList'),
        meta: {
          title: 'Transactions'
        }
      }
    ]
  },{
    path: '/connection',
    component: Home,
    meta: {
      title: 'Configuration Manager'
    },
    children: [
      {
        path: 'connections',
        component: () => import('@/pages/connection/connectionList'),
        meta: {
          title: 'Connections'
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Home,
    meta: {
      title: 'Setting'
    },
    children: [
      {
        path: 'serverurl',
        component: () => import('@/pages/setting/serverurl'),
        meta: {
          title: 'API Server Url'
        }
      }
    ]
  },
  {
    path: '/health',
    component: Home,
    meta: {
      title: 'Monitor Center'
    },
    children: [
      {
        path: 'healthInfo',
        component: () => import('@/pages/health/healthInfo'),
        meta: {
          title: 'PowerServer Health'
        }
      }
    ]
  }

]

export const allRoutes = routes.concat(allowRouters);

router.beforeEach((to, from, next) => {
  let isLogin = false
  let { meta, matched } = to
  let { title, title_en, newPage, keepAlive } = meta
  let { showNprogress } = store.state.setting.setting
  let sys = JSON.parse(localStorage.getItem("sys"))

  if(showNprogress) {
    NProgress.start()
  }

  if(sys) {
    isLogin = sys.user.isLogin
  }

  //默认登录
  isLogin=true

  to.params.keepAlive = keepAlive

  if(!isLogin && to.path !== '/login') {
    next('/login')
    return
  }else {
    let { menuList } = store.state.menu

    if(menuList.length > 0) { // 菜单数据加载成功
      if(!matched.length) {   // 打开的页面不存在
        router.push('/exception/404')
        return
      }
    }
    next()
  }

  // 不是标签页
  if (newPage) {
    return
  }

  // 路由添加到标签页
  store.dispatch('worktab/worktabRoute', {
    to: {
      name: to.name ? to.name : '',
      title: (to.meta && title) ? title : '',
      title_en: (to.meta && title_en) ? title_en : '',
      path: to.path,
      params: to.params
    },
    from: {
      name: from.name ? from.name : '',
      title: (from.meta && from.meta.title) ? from.meta.title : '',
      title_en: (from.meta && from.meta.title_en) ? from.meta.title_en : '',
      path: from.path,
      params: to.params
    }
  })

  // 设置网页title
  if(title) {
    document.title = `${setting.systemName}`
  }
  return
})

router.afterEach(() => {
  let { showNprogress } = store.state.setting.setting

  if(showNprogress) {
    NProgress.done()
  }
})

export default router
// export default new Router({
//   mode: "history", // 去掉url中的#
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// });
