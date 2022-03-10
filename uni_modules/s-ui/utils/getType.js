/**
 * @description: 获取数据类型
 * @param {*} value
 * @return {string}
 * @example getType({}) // object
 */
export default function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
