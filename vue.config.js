// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false
// })
module.exports={
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/Admin': {
        target: 'http://localhost:7203',
				//pathRewrite:{'^/Admin':''},
        // ws: true, //用于支持websocket
       //changeOrigin: true //用于控制请求头中的host值
      },
      '/demo': {
        target: 'http://localhost:5001',
				pathRewrite:{'^/demo':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      }
    }
  },
  // plugins:
  //   [
  //     "component",
  //     {
  //       "libraryName": "element-ui",
  //       "styleLibraryName": "~theme"
  //     }
  //   ]
}
