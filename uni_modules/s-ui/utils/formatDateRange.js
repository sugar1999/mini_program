import formatDate from './formatDate';

/**
 * @description: 格式化时间段
 * @param {Date|Number|String} startDateTime
 * @param {Date|Number|String} endDateTime
 * @param {String} separator ~
 * @param {String} startformat
 * @param {String} endformat
 * @return {String}
 * @example formatDateRange(new Date(),new Date())
 */
export default function formatDateRange(
  startDateTime,
  endDateTime,
  separator = ' ~ ',
  startformat = 'YYYY-MM-DD HH:mm',
  endformat = 'YYYY-MM-DD HH:mm',
) {
  return startDateTime && endDateTime ? formatDate(startDateTime, startformat) + separator + formatDate(endDateTime, endformat) : '';
}
