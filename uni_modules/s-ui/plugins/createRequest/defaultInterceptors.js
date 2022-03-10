/*
 * @Description: 默认拦截器，处理返回结果
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-02-02 13:48:00
 * @LastEditTime: 2021-12-01 17:18:07
 * @LastEditors: 无痕
 */
const defaultInterceptors = {
  /**
   * @description: 发起请求前拦截器
   * @param {object} options
   * @return {?object|Promise}
   */
  request(options) {
    return options;
  },
  /**
   * @description: 请求成功拦截器
   * @param {object}
   * @return {object|Promise}
   */
  success({ options, data, createError, createSuccess }) {
    return createSuccess(data);
  },
  /**
   * @description: 请求失败拦截器
   * @param {object}
   * @return {object|Promise}
   */
  fail({ options, error, createError, createSuccess }) {
    return error;
  },
};

export default defaultInterceptors;
