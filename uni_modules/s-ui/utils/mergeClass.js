import getType from './getType';
import trim from './trim';

/**
 * @description: 合并多个class
 * @param {String|object|Array<String|object>} classList
 * @return {String} 返回字符串class
 * @example: mergeClass({a:false},{b:true},'c d ',['e f','g',{h:true}]) //b c d e f g h
 */
export default function mergeClass(...classList) {
  return [
    ...new Set(
      trim(
        classList
          .map(item => {
            const type = getType(item);
            let str = '';
            if (type === 'string') {
              str = item;
            } else if (type === 'object') {
              str = Object.keys(item)
                .filter(name => name && item[name])
                .join(' ');
            } else if (type === 'array') {
              str = mergeClass(...item);
            }
            return str;
          })
          .join(' '),
      ).split(/\s+/),
    ),
  ].join(' ');
}
