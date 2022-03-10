/**
 * @description: 创建一个定时控制器
 * @param {function} fn 每次执行回调
 * @param {number} wait 间隔时间 5000
 * @param {boolean} immediate 初始化是否启动，false
 * @return {object} {start:Function,stop:Function}返回一个对象，可暂停和启动
 * @example createTimer(()=>console.log('执行'))
 */
export default function createTimer(fn, wait = 5000, immediate = false) {
  let timerId = null;
  let isStop = true;

  const start = function () {
    if (isStop) {
      isStop = false;
      fn(next, stop);
    }
    return this;
  };
  const next = function () {
    if (!isStop) {
      stop();
      timerId = setTimeout(start, wait);
    }
  };
  const stop = function () {
    isStop = true;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    return this;
  };

  if (immediate) start();

  return { start, stop };
}
