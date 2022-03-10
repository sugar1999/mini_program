import formatNumber from './formatNumber';

/**
 * @description: 格式化货币
 * @param {Number} number 货币数字
 * @param {Number} places 保留的小位数,2
 * @param {String} symbol 货币符号：'￥'
 * @param {String} thousand 用啥隔开：','
 * @param {String} decimal 表示小数点符合:'.'
 * @return {String}
 * @example formatMoney(12345) // ￥12,345.00
 */
export default function formatMoney(number = 0, places = 2, symbol = '￥', thousand = ',', decimal = '.') {
  return symbol + formatNumber(number, places, thousand, decimal);
}
