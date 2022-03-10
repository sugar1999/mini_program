import isValidDate from './isValidDate';
import parseDate from './parseDate';

/**
 * @description: 时间格式化
 * @param {Date|Number|String} date
 * @param {String} fmt = 'YYYY-MM-DD HH:mm'
 * @return {String}
 * @example formatDate(new Date(), fmt = 'YYYY-MM-DD HH:mm')
 */
export default function formatDate(date, fmt = 'YYYY-MM-DD HH:mm') {
  if (!isValidDate((date = parseDate(date)))) return '';
  const o = {
    'M+': date.getMonth() + 1, // 月份
    '(D|d)+': date.getDate(), // 日
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds(), // 毫秒
  };
  if (/(Y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]);
  }
  Object.keys(o).forEach(k => {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('0'.repeat(RegExp.$1.length) + o[k]).substr(('' + o[k]).length),
      );
    }
  });
  return fmt;
}
