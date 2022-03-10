import isArrayLike from './isArrayLike';

/**
 * @description: 数组和对象循环
 * @param {object|array} obj
 * @param {function(item,key,obj):boolean} callback(item,key,obj)
 * @return {void}
 */
export default function each(obj, callback) {
  if (!obj) return;
  if (isArrayLike(obj)) {
    for (let i = 0, len = obj.length; i < len; i++) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  } else {
    for (const key of Object.keys(obj)) {
      if (callback(obj[key], key, obj) === false) {
        break;
      }
    }
  }
}
