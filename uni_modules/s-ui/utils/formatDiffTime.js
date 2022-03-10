import isValidDate from './isValidDate';
import parseDate from './parseDate';
import parseSeconds from './parseSeconds';
import formatDate from './formatDate';

/**
 * @description: 格式化时间差，
 * @param {Date|Number|String} date
 * @param {Date|Number|String} now 默认与当前时间相比
 * @param {Number} maxDays
 * @param {String} nowStr '刚刚'
 * @return {String}
 * @example formatDiffTime(date, now, maxDays = 7, nowStr = '刚刚')
 */
export default function formatDiffTime(date, now, maxDays = 7, nowStr = '刚刚') {
  now = now || new Date();
  maxDays = maxDays || 7;
  if (!isValidDate((date = parseDate(date))) || !isValidDate((now = parseDate(now)))) return '';
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff === 0) return nowStr;
  const suffix = diff > 0 ? '前' : '后';
  const { d, h, m, s } = parseSeconds(Math.abs(diff));
  if (d > maxDays) {
    return formatDate(date, 'YYYY-MM-DD');
  }
  if (d) {
    return d + `天${suffix}`;
  } else if (h) {
    return h + `小时${suffix}`;
  } else if (m) {
    return m + `分钟${suffix}`;
  } else if (s) {
    return s + `秒${suffix}`;
  }
}
