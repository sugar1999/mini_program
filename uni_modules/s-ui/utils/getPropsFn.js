/**
 * @description: 为了兼容非H5 props 传Function 调用后this指向子组件问题，用此方法获取后再触发
 * @param {String} handlerName props 方法名称
 * @return {Function} 返回一个绑定传入方vm为this指向的方法
 * @example: this.$getPropsFn('beforeOpen')()
 */
export default function getPropsFn(handlerName) {
  const handler = this[handlerName];
  if (typeof handler === 'function') {
    // #ifndef H5
    let parent = this.$parent;
    while (parent) {
      // 因为在非H5中props中的方法没有绑定this，尝试从$options.methods上找到传递的方法
      const methodsHandlers = Object.values(parent.$options.methods || {});
      if (methodsHandlers.includes(handler)) {
        // 使this指向使用该组件的实例vm
        return handler.bind(parent);
      } else {
        parent = parent.$parent;
      }
    }
    // #endif
    return handler;
  }
  return undefined;
}
