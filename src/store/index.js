//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

import navCollapseOption from './navCollapse'
import menuDataOption from './userMenuData'
import userinfoOption from './userinfo/index'
import tagMenuOption from './tag/index'
import roleinfoOption from './roleinfo'
import btninfoOption from './btninfo'

//应用Vuex插件
Vue.use(Vuex)


//  //准备actions对象——响应组件中用户的动作
//  const actions = {}
//  //准备mutations对象——修改state中的数据
//  const mutations = {}
//  //准备state对象——保存具体的数据
//  const state = {

//  }

//  创建并暴露store
//  export default new Vuex.Store({
//      actions,
//      mutations,
//      state
//  })
export default new Vuex.Store({
    modules: {
        navCollapse: navCollapseOption,
        menuDatas: menuDataOption,
        userInfo: userinfoOption,
        tagMenuData: tagMenuOption,
        roleInfos: roleinfoOption,
        btninfos: btninfoOption
    }
})