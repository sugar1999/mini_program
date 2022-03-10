import getTypeValue from '../../utils/getTypeValue';
import extend from '../../utils/extend';

// 默认参数
const dialogOptions = {
  className: '', // 自定义class
  animate: 'zoom-in', // 过渡效果
  animateDuration: 300, // 过渡时间
  maskOpacity: '', // 遮罩透明度
  title: '', // 标题
  titleColor: '', // 标题颜色
  message: '', // 提示信息
  messageColor: '', // 提示信息颜色
  showCancel: true, // 是否显示取消按钮
  cancelText: '取消', // 取消按钮文字
  cancelColor: '', // 取消按钮颜色
  confirmText: '确定', // 确认按钮文字
  confirmColor: '', // 确认按钮颜色
  zIndex: 9999, // z-index层级 如没指定，则在显示时比较自增
  success({ confirm, cancel }) { }, // callback回调用法
  custom: '', // 自定义参数，用于特殊场景判断
};

function getOptions(options, defaultOptions = dialogOptions) {
  options = extend(true, {}, defaultOptions, options, getTypeValue(options, Object, { message: options }));
  if (typeof options.content !== 'undefined') options.message = options.content;
  return options;
};

// 事件管理器
const handler = {
  reject() { },
  resolve() { },
  success() { },
};

const state = {
  isInit: false,
  visible: false,
  ...getOptions(),
  onCancel() {
    hide();
    handler.success && handler.success({ confirm: false, cancel: true });
    handler.reject && handler.reject();
  },
  onConfirm() {
    hide();
    handler.success && handler.success({ confirm: true, cancel: false });
    handler.resolve && handler.resolve();
  },
};

/**
 * @description: 显示dialog
 * @param {string|dialogOptions} options
 * @return {promise}
 */
function dialog(options) {
  options = getOptions(options);
  return new Promise((resolve, reject) => {
    extend(handler, { reject, resolve, success: options.success });
    extend(state, options, {
      isInit: true,
      visible: true,
    });
  });
}

/**
 * @description: 关闭dialog
 * @return {void}
 */
function hide() {
  state.visible = false;
}

/**
 * @description: 马上清除正在显示的dialog
 * @return {void}
 */
function clear() {
  state.isInit = false;
  state.visible = false;
}

dialog.defaultOptions = dialogOptions;
dialog.state = state;
dialog.hide = hide;
dialog.clear = clear;

export default dialog;
