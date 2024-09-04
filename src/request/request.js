import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
import Vue from "vue";
const service = axios.create({
    // baseURL: 'http://47.115.128.32:8027',
    baseURL: 'http://127.0.0.1:8027',
    timeout: 10000
})

service.interceptors.request.use(config => {
    // console.log('请求头不信息',config)
    const token = localStorage.getItem('edb-authorization-token');
    if (token && !config.url.endsWith('/login') && !config.url.endsWith('/GetCapcha')) {
        config.headers['Authorization'] = "Bearer " + token;
    }
    return config
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use(res => {
    let resData = res.data;
    if (resData != '' & resData.code != 200) {
        Message.error(res.data.msg || '网络请求错误');

        if (resData.code == 401) // 授权未通过或者token过期
        {
            localStorage.removeItem('edb-authorization-token')
            router.push('/Login')
        }

        return false;
    }
    else {
        if (!resData.success) {
            Message.warning('操作失败' + resData.msg);
            return false;
        }
    }
    return resData;

}, err => {
    if (err.response.status == 401) {
        Message.warning('状态未授权或已过期,请重新登录');
        localStorage.removeItem('edb-authorization-token')
        localStorage.removeItem('edb-userInfo')
        router.push('/Login')
    }
    return process.reject(err)
})

Vue.prototype.$axios = axios;
export default service