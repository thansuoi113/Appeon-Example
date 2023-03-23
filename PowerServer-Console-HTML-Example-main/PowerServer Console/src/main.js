import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'default-passive-events'
import "@styles/reset.scss"            // 重置HTML样式、
import "@styles/app.scss"              // 全局样式
import "@styles/el-ui.scss"            // 优化element样式
import '@styles/dark.scss'             // 暗黑主题
import "@icons/system/iconfont.css"    // 系统图标
import "@icons/system/iconfont.js"     // 系统彩色图标
import "@icons/icons/iconfont.css"     // 系统提供的图标库
import ElementUI from 'element-ui'     // 组件库
import vuescroll from 'vuescroll'      // 滚动插件
import i18n from './lang/i18n'         // 多语言
import VCharts from 'v-charts'         // 图表库
import components from '@/components'  // 注册全局组件
import derectives from '@/directives'  // 注册全局指令
import JsonExcel from 'vue-json-excel' // Excel导出

Vue.use(components)
Vue.use(derectives)
Vue.use(vuescroll)
Vue.use(VCharts)
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 }) // 全局设置element组件默认大小

//Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
