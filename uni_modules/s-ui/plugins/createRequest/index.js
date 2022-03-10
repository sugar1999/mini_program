import extend from '../../utils/extend';
import getType from '../../utils/getType';
import getTypeValue from '../../utils/getTypeValue';
import mergePath from '../../utils/mergePath';
import toast from '../../utils/toast';
import noop from './../../utils/noop';
import createError from './createError';
import createSuccess from './createSuccess';
import defaultConfig from './defaultConfig';
import defaultInterceptors from './defaultInterceptors';
import failMap from './failMap';
import loading from './loading';

/**
 * @description: 创建一个请求器
 * @param {defaultConfig} config 默认参数
 * @param {defaultInterceptors} interceptors 拦截器
 * @return {function(defaultConfig)}
 */
export default function createRequest(config = {}, interceptors = {}) {
  // 配置
  config = extend(true, {}, defaultConfig, config);
  // 拦截器
  interceptors = Object.assign({}, defaultInterceptors, interceptors);

  /**
   * @description: 请求方法
   * @param {defaultConfig} options
   * @return {Promise}
   */
  const request = function request(options = {}) {
    options = extend(true, {}, config, options);
    // 显示loading
    if (options.showLoading && options.useDefaultLoading) {
      loading.show(options.loadingText, options.loadingTime);
    }
    // 创建 promise
    const promise = new Promise((resolve, reject) => {
      // 执行请求前拦截器
      Promise.resolve(interceptors.request(options)).then(newOptions => {
        // 获取新的options
        options = getTypeValue(newOptions, Object, options);
        // method转大写
        options.method = options.method.toUpperCase();
        // 路径参数赋值
        if (options.url && options.urlParams) {
          options.url = options.url.replace(/{([^{}}]+)}/g, (_str, k) => options.urlParams[k]);
        }
        // 判断url是否携带域名，然后拼接域名
        if (!/^(https|http|\/{2})/.test(options.url)) {
          options.url = mergePath(options.baseURL, options.url);
        }
        // 去除无效参数
        if (getType(options.data) === 'object') {
          const data = JSON.parse(JSON.stringify(options.data));
          const isUrlParams = ['GET', 'DELETE', 'PATCH'].includes(options.method);
          Object.keys(data).forEach(k => {
            const value = data[k];
            if ([undefined, null].includes(value)) {
              // 如果属性值为undefined或null，则直接移除属性
              delete data[k];
            } else if (isUrlParams && typeof value === 'string' && !value.trim()) {
              // 如果是'GET', 'DELETE', 'PATCH'请求方式，则移除值为空字符串的属性
              delete data[k];
            }
          });
          options.data = data;
        }
        // 发起请求
        const createTask = () => {
          options.getTask = getTypeValue(options.getTask, Function, defaultConfig.getTask);
          options.validateStatus = getTypeValue(options.validateStatus, Function, defaultConfig.validateStatus);
          options.getTask(uni.request(Object.assign({}, options, {
            success: noop,
            fail: noop,
            complete(res) {
              // 判断请求状态
              if (options.validateStatus(res, options)) {
                resolve(res.data);
              } else {
                const { statusCode, errMsg } = res;
                let msg = failMap[statusCode];
                if (!msg) {
                  if (errMsg.indexOf('timeout') > -1) {
                    msg = '请求超时';
                  } else if (errMsg.indexOf('request:fail') > -1) {
                    msg = '请求异常';
                  } else {
                    msg = errMsg;
                  }
                }
                if (statusCode) msg = statusCode + ` ${msg}`;
                reject(createError(msg, statusCode));
              }
            },
          })));
        };
        // 判断是否延时发起请求
        if (options.delayTime > 0) {
          setTimeout(createTask, options.delayTime);
        } else {
          createTask();
        }
      }).catch(error => reject(createError(error)));
    }).then(
      data => {
        // 执行请求成功拦截器
        return interceptors.success({ options, data, createError, createSuccess });
      },
      error => {
        if (options.showError && options.useDefaultToast) {
          toast({ message: error.message, duration: options.toastTime });
        }
        // 执行请求失败拦截器
        return interceptors.fail({ options, error, createError, createSuccess });
      },
    ).finally(() => {
      // 关闭loading
      if (options.showLoading && options.useDefaultLoading) {
        loading.hide();
      }
    });
    // 执行参数上的回调方法
    promise.then(res => {
      typeof options.success === 'function' && options.success(res);
      typeof options.complete === 'function' && options.complete(res);
    }).catch(err => {
      typeof options.fail === 'function' && options.fail(err);
      typeof options.complete === 'function' && options.complete(err);
    });
    // 返回 promise
    return promise;
  };
  // 增加属性方法
  ['get', 'post', 'put', 'delete', 'head', 'trace', 'options', 'connect'].map(method => {
    request[method] = (url, data, options) => request({
      method,
      url,
      data,
      ...options,
    });
  });
  return request;
}
