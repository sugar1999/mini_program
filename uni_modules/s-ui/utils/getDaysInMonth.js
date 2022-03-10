/**
 * @description: 获取某年某月有多少天
 * @param {String|Number} year
 * @param {String|Number} month
 * @return {Number}
 * @example getDaysInMonth(2021,2) // 28
 */
export default function getDaysInMonth(year = '', month = '') {
  const curDate = new Date(`${year}/${String(month).padStart(2, '0')}/01`);
  /* 获取当前月份 */
  const curMonth = curDate.getMonth();
  /* 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
  curDate.setMonth(curMonth + 1);
  /* 将日期设置为0 */
  curDate.setDate(0);
  /* 返回当月的天数 */
  return curDate.getDate();
}
