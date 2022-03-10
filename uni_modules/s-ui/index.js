import config from './config';
import extend from './utils/extend';
import emitPageMixin from './mixins/emitPageMixin';
import gobalMixin from './mixins/gobalMixin';
import { replaceUniLoading, replaceUniModal, replaceUniToast } from './plugins/uni';

/**
 * @description: vue插件
 * @param {Vue} Vue
 * @param {config} options
 * @return {void}
 */
function install(Vue, options = {}) {
  if (!Vue.prototype.toJSON) {
    Vue.prototype.toJSON = function () { };
  }
  extend(config, options);
  // 页面mixin
  Vue.mixin(gobalMixin);
  // onEmitPage生命周期
  if (config.useEmitPageMixin) {
    Vue.mixin(emitPageMixin);
  }
  if (config.replaceUniLoading) {
    replaceUniLoading();
  }
  if (config.replaceUniToast) {
    replaceUniToast();
  }
  if (config.replaceUniToast) {
    replaceUniModal();
  }
}

const sUi = {
  config,
  install,
};

export default sUi;
