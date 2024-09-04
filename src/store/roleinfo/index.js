import { GetRoleInfoAllApi } from "@/request/api.js"
export default {
    namespaced: true,
    state: {
        //   roleInfos: (await GetRoleInfoAllApi()).data??[],  //这里有个bug,如果获取失败的话就去
          roleInfos:[],
    },

    mutations: {
        async changeRoleInfos(state) {
            let resdata = await GetRoleInfoAllApi();
            if (!resdata) return;
            state.roleInfos = resdata.data;
        }
    },
    actions: {
        async asyncChangeRoleInfos({ commit }, payload) {
            let GetUserInfoApiRes = await GetRoleInfoAllApi();
            if (!GetUserInfoApiRes) return;
            commit('changeRoleInfos');
        }
    },
}