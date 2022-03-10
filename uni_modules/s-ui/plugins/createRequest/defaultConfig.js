/*
 * @Description: 请求默认参数
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2020-11-16 13:57:52
 * @LastEditTime: 2021-11-23 14:36:36
 * @LastEditors: 无痕
 */
const defaultConfig = {
  // uni自带
  header: {}, // 请求头
  method: 'GET', // 请求方式
  url: '', // 接口路径
  timeout: 20 * 1000, // 超时时间
  // 自定义添加
  baseURL: '', // 域名
  urlParams: {}, // 接口路径中的参数
  useDefaultLoading: true, // 是否使用自定义内置loading
  showLoading: true, // 是否显示加载loading
  loadingText: '请求中', // loading 文字
  loadingTime: 200, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
  useDefaultToast: true, // 是否使用自定义内置toast
  toastTime: 2000, // 提示时间
  showError: true, // 是否显示错误提示
  delayTime: 0, // 延时多久发起请求
  getTask(task) { }, // 获取请求返回对象
  // 判断请求状态是成功还是失败
  validateStatus(res) {
    return res.statusCode === 200;
  },
};

export default defaultConfig;
