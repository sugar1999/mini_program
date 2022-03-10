import getTypeValue from '../../utils/getTypeValue';
import extend from '../../utils/extend';

let timer = 0;

// 默认参数
const toastOptions = {
  type: '', // 提示类型，会自动拼接一个对应的class
  className: '', // 自定义class
  background: '', // 背景色
  color: '', // 提示信息色
  position: 'center', // 显示位置，center|top|bottom
  animate: 'fade', // 过渡效果
  animateDuration: 300, // 过渡时间
  message: '', // 提示信息
  icon: '', // 提示图标
  iconStyle: '', // 图标样式
  mask: true, // 是否显示遮罩
  maskOpacity: 0, // 遮罩透明度
  duration: 2000, // 自动关闭时间
  zIndex: 99999, // z-index层级 如没指定，则在显示时比较自增
  custom: '', // 自定义参数，用于特殊场景判断
  success() { }, // callback回调
};

function getOptions(options, defaultOptions = toastOptions) {
  return extend(true, {}, defaultOptions, getTypeValue(options, Object, { message: options }));
}

const state = {
  isInit: false,
  visible: false,
  ...getOptions(),
};

/**
 * @description: 显示toast
 * @param {String|toastOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function toast(options, cb) {
  options = getOptions(options);
  const beforeVisible = state.isInit && state.visible;
  extend(state, options, {
    isInit: true,
    visible: true,
  });
  clearTimeout(timer);
  if (options.duration > 0) {
    const duration = (!beforeVisible && options.animate ? options.animateDuration : 0) + options.duration;
    timer = setTimeout(() => {
      state.visible = false;
      typeof cb === 'function' && cb();
    }, duration);
  }
  options.success();
}

/**
 * @description: 关闭toast
 * @param {String} type
 * @return {void}
 */
function hide(type = '') {
  if (!type || typeof type !== 'string' || state.type === type) {
    clearTimeout(timer);
    state.visible = false;
  }
}

/**
 * @description: 马上清除正在显示的toast
 * @return {void}
 */
function clear() {
  clearTimeout(timer);
  state.isInit = false;
  state.visible = false;
}

/**
 * @description: 显示loading
 * @param {string|toastOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function loading(options, cb) {
  toast(getOptions(options, loading.defaultOptions), cb);
}

loading.defaultOptions = {
  type: 'loading',
  icon: 'loading',
  duration: 0,
};

/**
 * @description: 显示成功toast
 * @param {string|toastOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function success(options, cb) {
  toast(getOptions(options, success.defaultOptions), cb);
}

success.defaultOptions = {
  type: 'success',
  icon: 'success',
};

/**
 * @description: 显示失败toast
 * @param {string|toastOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function fail(options, cb) {
  toast(getOptions(options, fail.defaultOptions), cb);
}

fail.defaultOptions = {
  type: 'fail',
  icon: 'fail',
};

toast.defaultOptions = toastOptions;
toast.state = state;
toast.loading = loading;
toast.success = success;
toast.fail = fail;
toast.hide = hide;
toast.clear = clear;

export default toast;
