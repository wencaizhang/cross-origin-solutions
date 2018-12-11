const path = require("path");
const proxyip = 'http://api.meijujingxuan.com';

module.exports = {
  //这里填写配置项
  devServer: {
    disableHostCheck: true,
    open: true,  // 自动打开浏览器
    port: 3000,  // 端口号
    proxy: {
      "/proxy": {
        target: proxyip,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      },
    }
  }
}