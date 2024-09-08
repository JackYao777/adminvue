import { getButtonsPemission } from "@/request/menu"
import store from "@/store";
export default {
    namespaced: true,
    state: {
        btnInfos:JSON.parse(localStorage.getItem('edb-btnInfos'))||[]
    },
    actions: {},
    mutations: {
       async changeButtonsInfo(state) {
            let resData=await getButtonsPemission(store.state.userInfo.userInfo.adminID);
            localStorage.setItem('edb-btnInfos',JSON.stringify(resData.data));
            state.btnInfos =resData.data;
        }
    }
}
