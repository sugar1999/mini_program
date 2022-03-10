import hasOwnProp from './hasOwnProp';
import getType from './getType';

/**
 * @description: 判断指定参数是否是一个纯粹的对象
 * @param {object} obj
 * @return {boolean}
 */
export default function isPlainObject(obj) {
  if (!obj || getType(obj) !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  const ctor = hasOwnProp(proto, 'constructor') && proto.constructor;
  const fnToString = Object.hasOwnProperty.toString;
  return typeof ctor === 'function' && fnToString.call(ctor) === fnToString.call(Object);
}
