import isDef from './isDef';

/**
 * @description: 去掉字符串空格
 * @param {String} str
 * @param {String} pos both：左右2边空格， left：左边空格，right：右边空格，all：全部空格
 * @return {String}
 */
export default function trim(str, pos = 'both') {
  str = String(isDef(str) ? str : '');
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  } else if (pos == 'left') {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  } else if (pos == 'all') {
    return str.replace(/\s+/g, '');
  } else {
    return str;
  }
}
