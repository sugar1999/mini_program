/**
 * @description: 格式化数字
 * @param {Number} number 数字
 * @param {Number} places 保留的小位数,2
 * @param {String} thousand 用啥隔开：','
 * @param {String} decimal 表示小数点:'.'
 * @return {String}
 * @example formatNumber(12345) // 12,345
 */
export default function formatNumber(number = 0, places = 0, thousand = ',', decimal = '.') {
  number = +number || 0;
  const negative = number < 0 ? '-' : '';
  const i = parseInt(Math.abs(number)) + '';
  const j = i.length > 3 ? i.length % 3 : 0;
  const decimalIndex = ('' + number).lastIndexOf('.');
  return negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places > 0 ? decimal + (decimalIndex > -1 ? ('' + number).substr(decimalIndex + 1, places) : '').padEnd(places, '0') : '');
}
