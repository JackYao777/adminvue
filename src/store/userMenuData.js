import {GetMenuInfoRawApi} from '@/request/api'

export default {
    namespaced: true,
    state: {
        menuData:[],
        rawMenuData:[],
    },
    // actions: {},
    // mutations: {
    //  changeMenuData(state,payload)
    //  {
    //     console.log('这里修改菜单数据',payload)
    //     state.menuData=payload
    //     console.log('这里修改菜单数据',payload)
    //  }
    // }

    mutations: {
         changeMenuData(state,payload) {
            state.menuData=payload
            console.log('这里修改成功1111',state.menuData)
        },
         initalRawMenuData(state,payload) {
            console.log('这里看看payLoad',payload)
                state.rawMenuData=payload;
        }
    },
    actions: {
        async asyncChangeMenuData({ commit }, payload) {
            commit('changeMenuData',payload);
        },
        async asyncinitalRawMenuData({ commit }, payload) {
            console.log('这里看看payLoad',payload)
            if(!payload){
                let resRaw= await GetMenuInfoRawApi();
              return  commit('initalRawMenuData',resRaw.data);
            }
            commit('initalRawMenuData',payload);
        }
    },
}