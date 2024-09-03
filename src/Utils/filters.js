import Vue from "vue"

//全局过滤器  FormatDate 专门过滤日期
Vue.filter("FormatDate",value=>{
    return value&& new Date(value).toLocaleDateString().replaceAll('/','-');
})


/**
 * Upper case first char
 * @param {String} string
 */

Vue.filter("uppercaseFirst",string=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
})