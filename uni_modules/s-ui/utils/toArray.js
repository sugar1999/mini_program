import isArrayLike from './isArrayLike';

/**
 * @description: 转数组
 * @param {*} list
 * @return {array}
 */
export default function toArray(list) {
  return isArrayLike(list) ? Array.prototype.slice.call(list) : [];
}
