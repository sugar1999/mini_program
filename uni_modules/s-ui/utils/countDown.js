import createTimer from './createTimer';

function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

/**
 * @description: 倒计时控制器
 * @param {{ time: Number, millisecond?: Boolean, onChange?: Function, onFinish?: Function }} options
 * @return {{ start: Function, stop: Function, reset: Function, finish: Function }}
 */
export default function countDown(options) {
  const { time, millisecond, onChange, onFinish } = Object.assign({
    time: 0,
    millisecond: false,
    onChange: null,
    onFinish: null,
  }, options);

  let remain = time;
  let endTime = 0;

  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);

  const setRemain = value => {
    remain = value;
    onChange && onChange(remain);
    if (remain === 0) {
      stop();
      onFinish && onFinish();
    }
  };

  const timer = createTimer(next => {
    const currentRemain = getCurrentRemain();
    if (millisecond) {
      setRemain(currentRemain);
    } else {
      if (!isSameSecond(currentRemain, remain) || currentRemain === 0) {
        setRemain(currentRemain);
      }
    }
    if (remain > 0) {
      next();
    }
  }, 30, false);

  const start = function () {
    endTime = Date.now() + remain;
    timer.start();
    return this;
  };

  const stop = function () {
    timer.stop();
    return this;
  };

  const reset = function (newTime) {
    timer.stop();
    setRemain(typeof newTime === 'number' ? newTime : time);
    return this;
  };

  const finish = function () {
    timer.stop();
    setRemain(0);
    return this;
  };

  return { start, stop, reset, finish };
}
