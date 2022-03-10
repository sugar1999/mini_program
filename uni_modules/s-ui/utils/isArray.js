import getType from './getType';

/**
 * @description: 判断是否为数组
 * @param {*} value
 * @return {boolean}
 * @example isArray([]) // true
 */
export default function isArray(value) {
  return getType(value) === 'array';
}
