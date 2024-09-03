export default {
    namespaced: true,
    state: {
        isCollapse: true
    },
    actions: {},
    mutations: {
  changeIsCollapse(state){
    //取反
    //console.log(state)
    state.isCollapse=!state.isCollapse;
  }
    }
}