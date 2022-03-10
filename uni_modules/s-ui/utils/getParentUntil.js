/**
 * @description: 获取父组件vm，因为支付宝小程序不支持provide/inject的写法
 * @param {Vue} vm
 * @param {String} name
 * @return {Vue|undefined}
 * @example: getParentUntil(this,'STabs')
 */
export default function getParentUntil(name = undefined) {
  let parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
}
