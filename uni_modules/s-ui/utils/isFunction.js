import getType from './getType';

/**
 * @description: 判断是否为function
 * @param {*} value
 * @return {boolean}
 * @example isFunction(()=>{}) // true
 */
export default function isFunction(value) {
  return getType(value) === 'function';
}
