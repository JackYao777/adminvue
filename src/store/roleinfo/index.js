import { GetRoleInfoAllApi } from "@/request/api.js"
export default {
    namespaced: true,
    state: {
         roleInfos: (await GetRoleInfoAllApi()).data,
        // roleInfos:[],
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