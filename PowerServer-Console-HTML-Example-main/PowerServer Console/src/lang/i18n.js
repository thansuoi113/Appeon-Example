import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const defaultLang = 'en'   // 默认语言
const messages = {
  // 'cn': require('@/assets/lang/zh-cn'), // 中文语言包
  'en': require('@/assets/lang/en-us')  // 英文语言包
}

export default new VueI18n({
  locale: defaultLang,
  messages
})