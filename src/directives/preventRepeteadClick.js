import Vue from "vue";

Vue.directive('prevent-repetead-click', {
    inserted: function (el, binding) {
      el.addEventListener('click', () => {
        if (el.timeout) {
          return;
        }
        el.timeout = setTimeout(() => {
          el.timeout = null;
        }, binding.value || 600); // 默认600毫秒防抖时间可以通过参数指定
        handler(); // 这里是你要执行的函数或方法引用，可以通过binding.value传递进来
      });
    }
  });