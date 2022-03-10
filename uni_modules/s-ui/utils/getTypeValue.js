/**
 * @description: 类型验证获取value，返回默认值
 * @param {*} value
 * @param {Function|Array<Function>} types
 * @param {*} defaultValue
 * @return {*}
 * @example: getTypeValue(1,Number) //1
 * @example: getTypeValue(1,Number,1) //1
 * @example: getTypeValue('0',[String,Number],0) // '0'
 */
export default function getTypeValue(value, types, defaultValue) {
  if (!types || !types.length) {
    if (typeof value === 'undefined' && typeof defaultValue !== 'undefined') return defaultValue;
    return value;
  }
  types = Array.isArray(types) ? types : [types];
  const valueType = value !== undefined && value !== null ? value.constructor : undefined;
  if (valueType && types.includes(valueType)) return value;
  if (typeof defaultValue !== 'undefined') return defaultValue;
  return types[0]().valueOf();
}
