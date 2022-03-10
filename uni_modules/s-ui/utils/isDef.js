/**
 * @description: 判断是不是一个有效值
 * @param {*} val
 * @return {Boolean}
 * @example: isDef(1) // true
 */
export default function isDef(val) {
  return val !== undefined && val !== null && val !== '';
}
