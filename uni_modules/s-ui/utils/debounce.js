import restArguments from './restArguments';

/**
 * @description: 函数防抖
 * @param {Function} func 回调函数
 * @param {Number} wait 等待时间
 * @param {Boolean} immediate 首次触发是否立即执行，true
 * @return {Function}
 * @example const func = debounce(()=>console.log(1),100);
 */
export default function debounce(func, wait = 100, immediate = true) {
  let timeout, previous, args, result, context;

  const later = function () {
    const passed = Date.now() - previous;
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
      if (!timeout) args = context = null;
    }
  };

  const debounced = restArguments(function (_args) {
    context = this;
    args = _args;
    previous = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) result = func.apply(context, args);
    }
    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = args = context = null;
  };

  return debounced;
}
