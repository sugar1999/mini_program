/*
 * @Description: 全局配置信息
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-04-28 15:54:34
 * @LastEditTime: 2021-09-24 16:11:19
 * @LastEditors: 无痕
 */
const config = {
  // 是否给页面page全局混入一个onEmitPage钩子，使用this.$emitPage(pagePath,...args)触发
  useEmitPageMixin: true,
  // 是否替换uni默认的showLoading,hideLoading
  replaceUniLoading: true,
  // 是否替换uni默认的showToast,hideToast
  replaceUniToast: true,
  // 是否替换uni默认的showModal
  replaceUniModal: true,
  // 返回首页
  homePath: '/pages/index/index',
};

export default config;
