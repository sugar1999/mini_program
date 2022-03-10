/**
 * @description: 驼峰转-
 * @param {String} str 字符串
 * @param {String} mark 转换符号：-
 * @return {String}
 * @example: toLine('borderRadius')  // border-radius
 */
export default function toLine(str = '', mark = '-') {
  return str.replace(/([A-Z])/g, `${mark}$1`).toLowerCase();
}
