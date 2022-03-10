import getType from './getType';
import toLine from './toLine';
import trim from './trim';

/**
 * @description: 合并多个style
 * @param {Array<String|object>} styleList
 * @return {String} 返回字符串style，兼容其它端
 * @example: mergeStyle('width:10rpx',{height:'20rpx',zIndex:2},'border:2rpx') //width:10rpx;height:20rpx;z-index:2;border:2rpx
 */
export default function mergeStyle(...styleList) {
  const styleObj = {};
  const addStyle = (name, value) => {
    name = trim(name);
    value = ['string', 'number'].includes(getType(value)) ? trim(value) : '';
    if (name && value) styleObj[toLine(name)] = value;
  };
  styleList.forEach(style => {
    const type = getType(style);
    if (type === 'string' && style) {
      style = trim(style);
      if (style) {
        style.replace(/^;+|;+$/, '')
          .split(/;+/)
          .map(str => str.split(/:+/))
          .forEach(([k, value]) => addStyle(k, value));
      }
    } else if (type === 'object') {
      Object.keys(style).forEach(k => addStyle(k, style[k]));
    }
  });
  return Object.keys(styleObj).map(k => `${k}:${styleObj[k]}`).join(';');
}
