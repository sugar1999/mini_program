/*
 * @Name: regExp
 * @Descripttion: 常用验证方法
 * @Author: 无痕
 * @Date: 2019-09-23 15:53:33
 * @LastEditors: 无痕
 * @LastEditTime: 2021-09-29 14:27:38
 */

/**
 * @description: 是否为整数
 * @param {string|number} val
 * @return {boolean}
 */
function isInteger(val) {
  return /^[1-9]\d*$/.test(val);
}

/**
 * @description: 是否为正确的手机号码格式
 * @param {string} val
 * @return {boolean}
 */
function isPhone(val) {
  return /^1[3456789]\d{9}$/g.test(val);
}

/**
 * @description: 是否为电子邮箱地址
 * @param {string} val
 * @return {boolean}
 */
function isEmail(val) {
  return /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/.test(val);
}

/**
 * @description: 是否带有域名
 * @param {string} val
 * @return {boolean}
 */
function hasHost(val) {
  return /^(https|http|\/{2}|ftp|rtsp|mms)/.test(val);
}

/**
 * @description: 是否带有表情字符
 * @param {string} val
 * @return {boolean}
 */
function hasEmoj(val) {
  return /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(val);
}

/**
 * @description: 是否为有效的身份证号码
 * @param {string} idCard
 * @return {boolean}
 */
function isIdCard(idCard) {
  // 15位和18位身份证号码的正则表达式
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if ((idCard = String(idCard)) && regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      // 将前17位加权因子保存在数组里
      const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      const idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      // 用来保存前17位各自乖以加权因子后的总和
      let idCardWiSum = 0;
      for (let i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      const idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
      const idCardLast = idCard.substring(17); // 得到最后一位身份证号码
      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (idCardLast == 'X' || idCardLast == 'x') {
          return true;
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * @description: 中文姓名判断
 * @param {string} name
 * @param {number} length
 * @return {boolean}
 */
function isNameZh(name, length = 2) {
  return new RegExp(`/^[\u4e00-\u9fa5]{${length},}$/`).test(name);
}

/**
 * @description: 港澳居民来往内地通行证，规则： H/M + 10位或6位数字，样本： H1234567890
 * @param {string} card
 * @return {boolean}
 */
function isHKCard(card) {
  return /^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(card);
}

/**
 * @description: 台湾居民来往大陆通行证，规则： 新版8位或18位数字， 旧版 英文字母 + 10位数字，样本： 12345678 或 1234567890B
 * @param {string} card
 * @return {boolean}
 */
function isTWCard(card) {
  return /^(\d{8}|[a-zA-Z0-9]{10}|\d{18})$/.test(card);
}

/**
 * @description: 中国护照
 * @param {string} val
 * @return {boolean}
 */
function isPassport(val) {
  return /(^[CcTtEeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/.test(val);
}

/**
 * @description: 军官证，规则： 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"，样本： 军字第2001988号, 士字第P011816X号
 * @param {string} card
 * @return {boolean}
 */
function isOfficerCard(card) {
  return /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/.test(card);
}

const validate = {
  isInteger,
  isPhone,
  isEmail,
  hasHost,
  hasEmoj,
  isIdCard,
  isNameZh,
  isHKCard,
  isTWCard,
  isPassport,
  isOfficerCard,
};

export default validate;
