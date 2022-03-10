/**
 * @description: 数组item查询
 * @param {Array} list
 * @param {String} key
 * @param {*} value
 */
export default function arrayFind(list = [], key, value, attr) {
  const item = list.find(item => item[key] == value);
  if (typeof attr !== 'undefined') return item?.[attr];
  return item;
}
