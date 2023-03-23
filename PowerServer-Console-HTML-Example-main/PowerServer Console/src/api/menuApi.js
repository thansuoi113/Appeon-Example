import axios from '@/utils/request'
import store from '../store'
import router from '../router'
import { allRoutes } from '@/router/index.js'
import { routerMatch } from '@/utils/menu.js'
import { menuData } from '@/mock/menuData.js'

// 模拟获取菜单数据
export function getMenuList() {
  let sys = JSON.parse(localStorage.getItem("sys"))
  let isLogin = false

  if(sys) {
    isLogin = sys.user.isLogin
  }
  isLogin = true//默认登录
  if(!isLogin) {
    return
  }

  routerMatch(menuData, allRoutes).then(routes => {
    store.dispatch('menu/setMenuList', menuData)
    router.options.routes = Array.from(
      new Set(router.options.routes.concat(routes))
    )
    router.addRoutes(routes) // 动态添加路由
  })
}
