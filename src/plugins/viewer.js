import Vue from 'vue'
import Viewer,{ directive as viewerDirective } from 'v-viewer'

import 'viewerjs/dist/viewer.css'

//  进行Vue注册调用
Vue.use(Viewer,{defaultOptions: {zIndex: 9999}});

//注册指令，在元素上直接使用v-viewer，比如<div v-viewer><img /></div>
Vue.directive('viewer', viewerDirective({
  debug: true
}));
                        