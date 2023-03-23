/**
 * 根据权限匹配路由并返回
 * @param {array} permission    后台返回的权限列表（菜单列表）
 * @param {array} allowRouters  需要权限的路由表（我这里因为要做多语言，所以用到了全部路由）
 */
 export function routerMatch(permission, allowRouters) {
  return new Promise((resolve) => {
    const routers = []
    function createRouter(permission) {
      permission.forEach((item) => {
        let { path, title, title_en } = item
        let pathArr = path && path.split('/')

        if(pathArr) {
          path = pathArr[pathArr.length-1]
        }

        if (item.children && item.children.length) {
          createRouter(item.children)
        }

        allowRouters.find((s) => {
          if(s.path == item.path) {
            s.meta.title = item.title
            s.meta.title_en = item.title_en
          }

          if (s.children) {
            s.children.find((y) => {
              let cPath = s.path + '/' + y.path

              if (cPath === item.path) {
                y.meta.permission = item.permission
                y.meta.title = title
                y.meta.title_en = title_en
                routers.push(s)
              }
            })
          }else {
            if (path && s.path === path) {
              s.meta.permission = item.permission
              y.meta.title = title
              y.meta.title_en = title_en
              routers.push(s);
            }
          }
        })
      })
    }
    createRouter(permission)
    resolve(Array.from(new Set(routers)))
  })
}