/**
 * @description: 转px，兼容字符串
 * @param {Number|String} val
 * @return {Number}
 * @example: toPx('50rpx')
 */
export default function toPx(val) {
  if (!/\d+px$/.test(val)) {
    val = uni.upx2px(parseInt(val));
  }
  return parseInt(val) || 0;
}
