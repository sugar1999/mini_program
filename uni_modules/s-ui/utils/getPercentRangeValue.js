import getType from './getType';

/**
 * @description: 获取数值范围内对应的属性值
 * @param {String|Array|Object} value 数据
 * @param {Number|String} percent 当前值
 * @param {String} percentName 数据中值属性名称
 * @param {String} prop 要获取的属性名称
 * @return {*}
 */
export default function getPercentRangeValue(value, percent, percentName, prop) {
  const type = getType(value);
  if (['array', 'object'].includes(type)) {
    const values = [];
    if (type === 'array') {
      values.push(...value);
    } else if (type === 'object') {
      for (const k of Object.keys(value)) {
        values.push({ [percentName]: k, [prop]: value[k] });
      }
    }
    values.sort((a, b) => {
      a = parseInt(a[percentName]);
      b = parseInt(b[percentName]);
      return a == b ? 0 : a > b ? -1 : 1;
    });
    for (const item of values) {
      if (percent >= item[percentName]) {
        return item[prop];
      }
    }
    return '';
  }
  return value;
}
