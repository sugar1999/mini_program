import getType from './getType';

/**
 * @description: 判断是否为object
 * @param {*} value
 * @return {boolean}
 * @example isObject({}) // true
 */
export default function isObject(value) {
  return getType(value) === 'object';
}
