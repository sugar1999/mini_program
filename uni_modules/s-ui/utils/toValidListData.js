import each from './each';
import getType from './getType';
import trim from './trim';

/**
 * @description: 把不规则的数据格式转换为统一的数组[{value:'1'，label:'文字'}]数据格式
 * @param {Array|object} data
 * @param {string} valueKey
 * @param {string} labelKey
 * @return {Array}
 */
export default function toValidListData(data, valueKey = 'value', labelKey = 'label') {
  const list = [];
  const type = getType(data);
  if (type === 'object') {
    each(data, (item, k) => {
      const obj = {};
      if (trim(valueKey)) {
        obj[valueKey] = k;
      }
      if (trim(labelKey)) {
        obj[labelKey] = item;
      }
      list.push(obj);
    });
  } else if (type === 'array') {
    each(data, item => {
      if (getType(item) === 'object') {
        list.push(item);
      } else {
        const obj = {};
        if (trim(valueKey)) {
          obj[valueKey] = item;
        }
        if (trim(labelKey)) {
          obj[labelKey] = item;
        }
        list.push(obj);
      }
    });
  }
  return list;
}
