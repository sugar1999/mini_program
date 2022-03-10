/*
 * @Description: 覆盖uni默认的一些方法
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-01-26 17:42:43
 * @LastEditTime: 2021-11-25 11:05:53
 * @LastEditors: 无痕
 */
import dialog from '../../utils/dialog';
import getType from '../../utils/getType';
import getTypeValue from '../../utils/getTypeValue';
import isDef from '../../utils/isDef';
import toast from '../../utils/toast';

/**
 * @description: 替换uni默认的showToast,hideToast
 * @return {void}
 */
export function replaceUniToast() {
  uni.showToast = function showToast(options = {}, cb) {
    options = getTypeValue(options, Object, { title: options });
    if (options.icon === 'none') options.icon = '';
    if (options.image) options.icon = options.image;
    toast(Object.assign({ message: options.title }, options), cb);
  };

  uni.hideToast = function hideToast(type = '') {
    toast.hide(type);
  };
}

/**
 * @description: 替换uni默认的showModal
 * @return {void}
 */
export function replaceUniModal() {
  uni.showModal = function showModal(options = {}) {
    // 为了兼容小程序授权时只用 title，此时使用title的值充当content显示
    if (getType(options) === 'object' && isDef(options.title) && !isDef(options.content)) {
      options.content = options.title;
      options.title = '';
    }
    const promise = dialog(options);
    promise.then(() => { }, () => { });
    return promise;
  };
}

/**
 * @description: 替换uni默认的showLoading,hideLoading
 * @return {void}
 */
export function replaceUniLoading() {
  uni.showLoading = function showLoading(options = {}, cb) {
    options = getTypeValue(options, Object, { title: options });
    toast.loading(Object.assign({ message: options.title }, options), cb);
  };

  uni.hideLoading = function hideLoading() {
    toast.hide('loading');
  };
}
