/**
 * @description: 判断是否为类数组
 * @param {*} o
 * @return {boolean}
 * @example isArrayLike({0:1,1:2,length:2}) // true
 */
export default function isArrayLike(o) {
  return (
    o &&
    typeof o === 'object' &&
    isFinite(o.length) &&
    o.length >= 0 &&
    o.length === Math.floor(o.length) &&
    o.length < 4294967296
  );
}
