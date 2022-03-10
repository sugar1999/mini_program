import parseMilliseconds from './parseMilliseconds';

/**
 * @description: 格式化秒为对象
 * @param {Number} time
 * @param {String|Array} fmt 默认 'd,h,m,s'
 * @return {object} {d,d2,h,h2,m,m2,s,s2}
 * @example parseSeconds(5*60) // {d: 0, d2: '00', h: 0, h2: '00', m: 5, m2: '05', s: 0, s2: '00'}
 */
export default function parseSeconds(seconds = 0, fmt = 'd,h,m,s') {
  return parseMilliseconds(seconds * 1000, fmt);
}
