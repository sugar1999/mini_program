/**
 * @description: -转驼峰
 * @param {String} str 字符串
 * @param {String} mark 转换符号：-
 * @return {String}
 * @example: toHump('border-radius')  // borderRadius
 */
export default function toHump(str = '', mark = '-') {
  return str.replace(new RegExp(`${mark}(\\w)`, 'g'), function (all, letter) {
    return letter.toUpperCase();
  });
}
