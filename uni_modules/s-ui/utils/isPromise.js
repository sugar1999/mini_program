/**
 * @description: 是否为promise对象
 * @param {*} value
 * @return {boolean}
 */
export default function isPromise(value) {
  return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
}
