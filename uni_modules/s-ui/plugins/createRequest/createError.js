import getTypeValue from '../../utils/getTypeValue';

/**
 * @description: 包装一个错误返回对象
 * @param {String|Error} error
 * @param {Number|String} code
 * @return {{
 *  ok: false
 *  code: number|string
 *  msg: string
 *  message: string
 * }}
 */
export default function createError(error, code = 500) {
  const msg = error && error.message ? error.message : error || '请求异常';
  return { ok: false, code, ...getTypeValue(error, [Error, Object], {}), msg, message: msg };
}
