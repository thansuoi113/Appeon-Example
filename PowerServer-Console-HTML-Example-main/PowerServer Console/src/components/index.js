// 导出全局组件

import MenuLeft from '@/components/Layout/MenuLeft'
import TopBar from '@/components/Layout/TopBar'
import WorkTab from '@/components/Layout/WorkTab'
import Personality from '@/components/Layout/Personality'
import TaoTable from '@/components/Table/TaoTable'
import TableBar from '@/components/Table/TableBar'
// import FormInput from '@/components/Form/FormInput'
// import FormSelect from '@/components/Form/FormSelect'

export default (Vue)=>{
  Vue.component("menu-left", MenuLeft)
  Vue.component("top-bar", TopBar)
  Vue.component("work-tab", WorkTab)
  Vue.component("personality", Personality)
  Vue.component("tao-table", TaoTable)
  Vue.component("table-bar", TableBar)
  // Vue.component("form-input", FormInput)
  // Vue.component("form-select", FormSelect)
}