/**
 * @description: 数字保留几位小数
 * @param {Number|String} number 数字
 * @param {Number} digits 小数位数
 * @return {String}
 * @example: toFixed(1234.25555,2) // '1234.25'
 */
export default function toFixed(number, digits = 0) {
  const str = ('' + number);
  const decimalIndex = str.lastIndexOf('.');
  const decimal = (decimalIndex > -1 ? str.substr(decimalIndex + 1, digits) : '').padEnd(digits, '0');
  return '' + parseInt(number) + (decimal.length ? '.' + decimal : '');
};
