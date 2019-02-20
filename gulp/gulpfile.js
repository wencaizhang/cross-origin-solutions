const gulp = require('gulp');
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');

// 接口域名
const target = 'http://api.meijujingxuan.com';
const root = './src';
const port = 8888;

///////////////////获取本机ip///////////////////////
const os = require('os');
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();

gulp.task('server', function () {
  connect.server({
    root: root,
    port: port,
    host: myHost,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        proxy('/proxy', {
          target: target,
          changeOrigin: true,
          pathRewrite: {
            '^/proxy': ''
          }
        }),
      ]
    }

  });
});
