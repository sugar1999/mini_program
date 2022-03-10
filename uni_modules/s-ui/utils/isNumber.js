import trim from './trim';

/**
 * @description: 判断是否可以转number
 * @param {String|Number} value
 * @return {boolean}
 * @example isNumber('5') // true
 */
export default function isNumber(value) {
  if (typeof value === 'number') return true;
  if (typeof value === 'string' && trim(value)) return !isNaN(value);
  return false;
}
