import { GetUserInfoApi } from "@/request/api.js"
export default {
    namespaced: true,
    state: {
        userInfo: JSON.parse(localStorage.getItem('edb-userInfo'))||{
            // permissions: null,
            // roles: null,
            //  user: null
        }
    },

    mutations: {
        changeUserInfo(state, payload) {
           state.userInfo=payload;
           localStorage.setItem('edb-userInfo',JSON.stringify(state.userInfo));
           console.log('打印userinfo'+state.userInfo)
        }
    },
    actions: {
        async asyncChangeUserInfo({ commit }, query) {
            let GetUserInfoApiRes = await GetUserInfoApi(query);
            console.log('这里打印用户信息' + GetUserInfoApi)
            if (!GetUserInfoApiRes) return;
            commit('changeUserInfo',GetUserInfoApiRes.data)
        }
    },
}