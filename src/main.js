import Vue from 'vue'
//清除默认样式
import 'reset-css'

import store from './store'

import App from './App.vue'
import VueSvgIcon from 'vue-svgicon'



// import ElementUI from 'element-ui';
// import { Button,Row,DatePicker } from 'element-ui'; //按需引用
// import 'element-ui/lib/theme-chalk/index.css';
//引入element样式
import ElementUI from './plugins/element-ui.js'


import VueRouter from 'vue-router'
import router from './router'
import '@/Utils/filters'
import "@/icons/index.js"
import '@/Utils/icons.js'
import '@/plugins/datav.js'
import VCharts from 'v-charts'
import Viewer from './plugins/viewer.js'
import {btnPermissionPlugin} from '@/directives/btnPemission.js'

Vue.use(VCharts)


//应用插件
Vue.use(VueRouter)

Vue.use(VueSvgIcon,{
  tagName:'svg-icon'
})

Vue.use(btnPermissionPlugin)
//全部引用
//  Vue.use(ElementUI)
// Vue.component(Button.name,Button);
// Vue.component(Row.name,Row);
// Vue.component(Row.name,DatePicker);
//  Vue.use(Button)
//  Vue.use(Row)
//  Vue.use(DatePicker)

//使用 echarts 4.7版本 + v-charts ，bmap做底图，地图看似正常显示，控制台报错
Vue._watchers = Vue.prototype._watchers = []

Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
  router:router,
  store
});
// .$mount('#app')
