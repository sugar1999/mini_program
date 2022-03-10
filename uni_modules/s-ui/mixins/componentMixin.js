/*
 * @Description: 组件混入
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-03-04 16:14:55
 * @LastEditTime: 2021-10-21 23:33:44
 * @LastEditors: 无痕
 */
import getComponentOptions from '../common/getComponentOptions';
import addUnit from '../utils/addUnit';
import getParentUntil from '../utils/getParentUntil';
import getPropsFn from '../utils/getPropsFn';
import getRect from '../utils/getRect';
import getType from '../utils/getType';
import getUid from '../utils/getUid';
import isDef from '../utils/isDef';
import mergeClass from '../utils/mergeClass';
import mergeStyle from '../utils/mergeStyle';
import toPx from '../utils/toPx';

const componentMixin = {
  options: getComponentOptions(),
  props: {
    // 自定义class
    customClass: [String, Object, Array],
    // 自定义样式
    customStyle: [Object, String],
    // scope
    scopeParams: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    custom_class() {
      return this.$mergeClass(this.customClass);
    },
    custom_style() {
      return this.$mergeStyle(this.customStyle);
    },
    $sUid() {
      return `S-${getUid()}`;
    },
  },
  methods: {
    $isDef: isDef,
    $getType: getType,
    $addUnit: addUnit,
    $toPx: toPx,
    $mergeClass: mergeClass,
    $mergeStyle: mergeStyle,
    $getPropsFn: getPropsFn,
    $getParentUntil: getParentUntil,
    $getRect: getRect,
  },
  mounted() {
    this.$emit('mounted', this);
  },
};

export default componentMixin;
