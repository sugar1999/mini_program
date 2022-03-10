/*
 * @Description: 用于给页面混入一个定制的生命周期 onEmitPage，使用this.$emitPage(pagePath,...args)触发
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-02-03 10:04:35
 * @LastEditTime: 2021-09-24 16:10:40
 * @LastEditors: 无痕
 */
import getCurrentPagePath from '../utils/getCurrentPagePath';

const eventName = 'S_EMIT_PAGE_EVENT_NAME';
const eventHandler = 'S_EMIT_PAGE_EVENT_HANDLER';

function getEventName(pagePath = '') {
  return `${eventName}-${pagePath.replace(/^\/+/, '')}`;
}

const emitPageMixin = {
  onLoad() {
    if (typeof this.$options.onEmitPage === 'function') {
      const pagePath = getCurrentPagePath();
      this[eventName] = getEventName(pagePath);
      this[eventHandler] = this.$options.onEmitPage.bind(this);
      uni.$on(this[eventName], this[eventHandler]);
    }
  },
  methods: {
    /**
     * @description: 触发页面的onEmitPage事件
     * @param {String} pagePath 页面路径
     * @param {array} args 参数
     * @return {void}
     */
    $emitPage(pagePath, ...args) {
      uni.$emit(getEventName(pagePath), ...args);
    },
  },
  onUnload() {
    if (this[eventName]) {
      uni.$off(this[eventName], this[eventHandler]);
    }
  },
};

export default emitPageMixin;
