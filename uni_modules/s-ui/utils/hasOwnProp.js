/**
 * @description: 判断是否是此对象上的实例属性
 * @param {object} obj
 * @param {string} prop
 * @return {boolean}
 * @example hasOwnProp({a:1},'a') // true
 */
export default function hasOwnProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
