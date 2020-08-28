'use strict'
// Template version: 1.2.5
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const devEnv = require('./dev.env')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 代理列表, 是否开启代理通过[./dev.env.js]配置
    proxyTable: devEnv.OPEN_PROXY === false ? {} : {
      '/proxyApi': {
      // target: 'http://112.35.115.106:9110/ping-service/', //正式
      // target: 'http://192.168.5.85:8060/ping-service',
      //  target: 'http://192.168.47.1:8060/ping-service',
        // target: 'http://192.168.4.119:8060/ping-service',
        target: 'http://121.36.245.230:9001/ping-service/',
      // target: 'http://192.168.7.227:8060/ping-service',/
          // target: 'http://112.35.115.105:9110/ping-service/', //测试
          // http://112.35.32.139:9001/ping-service
        changeOrigin: true,
        secure:false,
        pathRewrite: {
          '^/proxyApi': '/'
        }
      },
      '/api': {
        target: 'http://192.168.4.117:9000/monitoring',
        // target: 'http://112.35.69.43:10080/monitoring/',
        
        
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/uapm': {
        target: 'http://112.35.69.43:10080/itsm1',
        changeOrigin: true,
        pathRewrite: {
          '^/uapm': '/'
        }
      },
    },
    

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
