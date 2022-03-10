/**
 * @description: 判断是否可以转为一个合法的时间对象
 * @param {*} date
 * @return {boolean}
 */
export default function isValidDate(date) {
  return !/Invalid|NaN/.test(new Date(date).toString());
}
