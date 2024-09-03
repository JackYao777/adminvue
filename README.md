# adminvue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 第一天 
1：创建项目 vue create name,   
2: npm i element-ui  安装element, 按需引入
3：login页面创建,然后引入router,npm i reset-css(去掉默认样式)
4：登录验证,验证码的获取,验证码和token存入localstorage
5：统一请求头,路由全局守卫,建立request文件,建立api文件
6：登录成功,跳转首页this.$router.push()
7: 布局导航条, mainLayout,navBar,header,content,四个组件,动态渲染navBar,引入vuex,store,控制collapse,menuData

各个功能梳理
首先首页路由和Login是写死的，动态获取的是chidrden的路由数据（子集路由数据）
菜单数据是动态获取的,首页也是写死的,方法是存在store中的userMenudata中,而路由数据是全局数据Router,当前路由是Route
实现方式是全局路由守卫

登录成功,清除uuid,保存token,跳转首页/,保存userInfo数据,userInfo也是全局store数据
退出登录:删除token,删除userInfo数据,跳转Login页面,在Login页面的Created方法中清除userMenu数据,获取验证码,保存uuid到本地,登录成功如上操作



