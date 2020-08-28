/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://112.35.32.139:9001/ping-service/'; //正式
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.47.1:8060/ping-service/';
  //  window.SITE_CONFIG['baseUrl'] = 'http://192.168.4.119:8060/ping-service/';
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.4.117:8060/ping-service/';
  // window.SITE_CONFIG['apmUrl'] = 'http://192.168.4.117:9000/monitoring/'
  // window.SITE_CONFIG['apmUrl'] = 'http://112.35.69.43:10080/monitoring/'
  window.SITE_CONFIG['apmUrl'] = 'https://112.35.115.106:1441/monitoring/'
  
  
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.5.85:8060/ping-service/';
  
  // window.SITE_CONFIG['baseUrl'] = 'http://112.35.115.105:9110/ping-service/'; //测试
  
  // cdn地址 = 域名 + 版本号
 window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();

 