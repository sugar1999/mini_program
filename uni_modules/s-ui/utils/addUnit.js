import isNumber from './isNumber';

/**
 * @description: 添加单位
 * @param {String|Number} value ''
 * @param {String} unit rpx
 * @return {String}
 * @example addUnit(30) // 30rpx
 */
export default function addUnit(value = '', unit = 'rpx') {
  return isNumber(value) ? Number(value) + unit : value;
}
