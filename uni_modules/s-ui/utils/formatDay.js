import isValidDate from './isValidDate';
import parseDate from './parseDate';
import formatDate from './formatDate';

/**
 * @description: 格式化日期为今天，明天，后天，周几
 * @param {Date | String | Number} date
 * @param {Number} num 0,1,2,3
 * @return {String}
 * @example formatDay(new Date())
 */
export default function formatDay(date, num) {
  if (!isValidDate((date = parseDate(date)))) return '';
  num = parseInt(num) || 1;
  const nowTime = new Date(formatDate(new Date(), 'YYYY/MM/DD')).getTime();
  const dayTime = 24 * 60 * 60 * 1000;
  const dateTime = new Date(formatDate(date, 'YYYY/MM/DD')).getTime();
  const dayName = (
    [
      { label: '今天', value: nowTime },
      { label: '明天', value: nowTime + dayTime },
      { label: '后天', value: nowTime + dayTime * 2 },
    ]
      .slice(0, num)
      .find(item => item.value == dateTime) || { label: '' }
  ).label;
  return formatDate(date, `${dayName || '周E'}`);
}
