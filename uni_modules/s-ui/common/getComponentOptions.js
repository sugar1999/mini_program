const defaultOptions = {
  multipleSlots: true,
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
};

/**
 * @description: 返回组件options项设置
 * @param {defaultOptions} options
 * @return {defaultOptions}
 */
export default function getComponentOptions(options) {
  const {
    multipleSlots,
    addGlobalClass,
    virtualHost,
    styleIsolation,
  } = Object.assign({}, defaultOptions, options);

  return {
    // #ifdef MP-WEIXIN || MP-QQ
    multipleSlots, //  在组件定义时的选项中启动多slot支持，默认启用
    addGlobalClass, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
    virtualHost, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
    styleIsolation, //  表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件
    // #endif
  };
}
