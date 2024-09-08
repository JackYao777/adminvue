import Vue from "vue";
import store from "@/store";
import router from "@/router";
//按钮权限普通模式引用
// Vue.directive("permission", {
//     inserted(el, binding) {
//         var buttoms = store.state.btninfos.btnInfos;
//         console.log('buttoms', buttoms)
//         console.log('router', router.currentRoute.fullPath)
//         let permission = binding.value; // 获取到 v-permission的值
//         if (permission) {
//             let hasPermission = buttoms.filter(x => x.routerPath == router.currentRoute.fullPath && x.buttomName == permission);
//             console.log('hasPermission', hasPermission)
//             if (hasPermission.length <= 0) { // 没有权限 移除Dom元素
//                 el.parentNode && el.parentNode.removeChild(el);
//             }
//         }
//     }
// });

//按钮权限插件模式引用
export const btnPermissionPlugin = {
    install(app) {
        app.directive("permission", {
            inserted(el, binding) {
                var buttoms = store.state.btninfos.btnInfos;
                let permission = binding.value; // 获取到 v-permission的值
                if (permission) {
                    let hasPermission = buttoms.filter(x => x.routerPath == router.currentRoute.fullPath && x.buttomName == permission);
                    if (hasPermission.length <= 0) { // 没有权限 移除Dom元素
                        el.parentNode && el.parentNode.removeChild(el);
                    }
                }
            }
        });
    }
}
