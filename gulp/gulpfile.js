const gulp = require('gulp');
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');

// 接口域名
const target = 'http://api.meijujingxuan.com';
const root = './src';
const port = 8888;

gulp.task('dev', function () {
  connect.server({
    root: root,
    port: port,
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
