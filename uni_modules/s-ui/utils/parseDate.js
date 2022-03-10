import isValidDate from './isValidDate';

/**
 * @description: 尝试转一个合法Date对象,兼容ios
 * @param {string|Date|number} date
 * @return {Date}
 * @example parseDate('2021-05-17') // Mon May 17 2021 08:00:00 GMT+0800 (中国标准时间)
 */
export default function parseDate(date) {
  if (typeof date === 'string') {
    if (/^\d*$/.test(date)) {
      date = Number(date);
    } else if (!isValidDate(date)) {
      date = date.replace(/-/g, '/').replace(/(\.0)$/, '');
    }
  }
  return new Date(date);
}
