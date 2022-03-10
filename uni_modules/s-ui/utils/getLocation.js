let lastTime = 0;
let promise = null;
let loading = false;
const cacheTime = 30 * 1000;

/**
 * @description: 获取地理位置信息，由于微信小程序从基础库2.17.0版本起 30秒内重复调用wx.getLocation会返回错误,因此使用此方法获取，在30秒内重复调用会使用缓存的成功信息
 * @param {object} options
 * @example 同 uni.getLocation，注意30秒内新参数无效，会使用上次获取的结果直接返回
 */
export default function getLocation(options) {
  if (!loading && Date.now() - lastTime > cacheTime) {
    loading = true;
    promise = new Promise((resolve, reject) => {
      uni.getLocation(Object.assign({}, options, {
        success(res) {
          lastTime = Date.now();
          resolve(res);
        },
        fail: reject,
        complete() {
          loading = false;
        },
      }));
    });
  }
  promise.then(res => {
    if (options) {
      typeof options.success === 'function' && options.success(res);
      typeof options.complete === 'function' && options.complete(res);
    }
  }, err => {
    if (options) {
      typeof options.fail === 'function' && options.fail(err);
      typeof options.complete === 'function' && options.complete(err);
    }
  });
  return promise;
}
