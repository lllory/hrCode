/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
//  window.SITE_CONFIG['baseUrl'] = 'http://112.35.115.106:9110/ping-service/';//正式
 window.SITE_CONFIG['baseUrl'] = 'https://112.35.115.106:1441/ping-service/';
 window.SITE_CONFIG['apmUrl'] = 'https://112.35.115.106:1441/monitoring/'
 window.SITE_CONFIG['uapmUrl'] = 'https://112.35.115.106:1441/itsm1';
//  window.SITE_CONFIG['baseUrl'] = 'http://112.35.115.105:9110/ping-service/'; //测试
  //  window.SITE_CONFIG['baseUrl'] = 'http://112.35.115.106:9110/ping-service/';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
