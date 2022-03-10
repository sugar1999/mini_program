/**
 * @description: 查询节点信息
 * @param {String} selector 选择器
 * @param {Boolean} isAll 是否选择全部，默认否
 * @return {Promise}
 * @example: this.$getRect('#wrap').then(rect=>{})
 * @example: this.$getRect('.item',true).then(rects=>{})
 */
export default function getRect(selector, isAll) {
  return new Promise(resolve => {
    uni.createSelectorQuery().in(this)[isAll ? 'selectAll' : 'select'](selector)
      .boundingClientRect(resolve)
      .exec();
  });
}
