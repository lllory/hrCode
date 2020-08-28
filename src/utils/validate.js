/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  // return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
  return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(s)
}
/**
 * 手机号码
 * @param {*} s
 */

export function isMobileTwo (s) {
  return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(s)
}
/**
 * 电话号码
 * @param {*} s
 */

export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 匹配链接
 * @param {*} s
 */
export function isHTTP (s) {
  var reg = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(s)
  return reg
}

/**
 * 匹配FTP
 * @param {*} s
 */
export function isFTP (s) {
  var reg = /(http):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/i.test(s)
  return reg
}

/**
 * 匹配密码
 * @param {*} s
 */

export function UpdatePsw (s) {
  var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_~$@$!%*?&-+=.#^,/])[A-Za-z\d_~$@$!%*?&-+=.#^,/]{16,20}/.test(s)
  return reg 
}

/**
 * 匹配身份证
 * @param {*} s
 */
export function cardId (s) {
  var cardReg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/.test(s)
  return cardReg
}
/**
 * 匹配IP
 * @param {*} s
 */
export function IsIP (s) {
  var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(s)
  return reg
}

// 校验全局
export default {
  install (Vue, options) {
    // 账号、
    Vue.prototype.validateUser = function (rule, value, callback) {
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        // const reg = /^([a-zA-Z0-9]|[._]){4,19}$/;
        // if (!reg.test(value) && value != "") {
        //   callback(new Error("只能输入6-20个以字母开头、可带数字、“_”、“.”"));
        // } else {
        //   callback();
        // }
        const reg = /^([a-zA-Z0-9]|[._]){6,19}$/;
        if (!reg.test(value) && value != "") {
          callback(new Error("只能输入6-20个以字母开头、可带数字、“_”、“.”"));
        } else {
          callback()
        }
      }
    }
    // 密码、
    Vue.prototype.validatePwd = function (rule, value, callback) {
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        // const reg = /^(\w){4,20}$/;
        // if (!reg.test(value) && value != "") {
        //   callback(new Error("只能输入4-20个字母、数字、下划线"));
        // } else {
        //   callback();
        // }
        const reg = /^(\w){6,20}$/;
        if (!reg.test(value) && value != "") {
          callback(new Error("只能输入6-20个字母、数字、下划线"));
        } else {
          callback();
        }
      }
    }
  }
}









