import Vue from "vue"
import moment from 'moment';


//全局过滤器  FormatDate 专门过滤日期
Vue.filter("FormatDate",value=>{
    return value&& new Date(value).toLocaleDateString().replaceAll('/','-');
})


// 在Vue组件中定义过滤器
Vue.filter('FormatDateTime',value=> {
    if (value) {
      return moment(String(value)).format('YYYY-MM-DD HH:mm:ss');
    }
  });

/**
 * Upper case first char
 * @param {String} string
 */

Vue.filter("uppercaseFirst",string=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
})