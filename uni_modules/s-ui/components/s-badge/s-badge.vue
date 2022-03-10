<template>
  <view v-if="showBadge" class="s-badge" :class="c_class" :style="c_style">
    <slot v-if="defaultSlot" />
    <template v-else>{{ content }}</template>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import isNumber from '../../utils/isNumber';
import trim from '../../utils/trim';

/**
 * s-badge 徽标
 * @description 出现在元素右上角的数字或状态标记。
 * @property {Number|String} value 徽标内容
 * @property {Boolean} dot 不展示数字，只有一个小点
 * @property {Number|String} max 最大值，超过最大值会显示 {max}+，仅当 value 为数字时有效
 * @property {String} type = [primary | success | warning | danger | info] 类型
 * @property {String} background 背景颜色，优先级比type高
 * @property {String} color 字体颜色
 * @property {Boolean} showZero 当数值为 0 时，是否展示 Badge
 * @property {Boolean} absolute 组件是否绝对定位，为true时，offset参数才有效
 * @property {Array<Number|String>} offset 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，单位rpx。absolute为true时有效
 * @property {Boolean} offsetCenter 组件中心点是否和父组件右上角重合，优先级比offset高，如设置，offset参数会失效
 * @property {Number|String} scale 缩放比例
 * @property {Boolean} defaultSlot 是否使用默认插槽
 * @example <s-badge value="10" />
 */
export default {
  name: 'SBadge',
  mixins: [componentMixin],
  props: {
    value: [Number, String],
    dot: Boolean,
    max: [Number, String],
    type: String,
    background: String,
    color: String,
    showZero: Boolean,
    absolute: {
      type: Boolean,
      default: true,
    },
    offset: Array,
    offsetCenter: {
      type: Boolean,
      default: true,
    },
    scale: [Number, String],
    defaultSlot: Boolean,
  },
  computed: {
    showBadge() {
      return this.$isDef(this.content) || this.dot || this.defaultSlot;
    },
    c_class() {
      return this.$mergeClass({
        [`s-badge--${this.type}`]: this.type,
        's-badge--dot': this.dot,
      }, this.custom_class);
    },
    c_style() {
      const style = {};
      if (this.absolute) {
        style.position = 'absolute';
        if (this.offset && this.offset.length) {
          style.top = this.$addUnit(this.offset[0]);
          style.right = this.$addUnit(this.offset[1]);
        }
      }
      return this.$mergeStyle(Object.assign(style, {
        background: this.background,
        color: this.color,
        transform: [
          this.absolute && this.offsetCenter ? 'translate(50%, -50%)' : '',
          this.scale ? `scale(${this.scale})` : '',
        ].join(' '),
      }), this.custom_style);
    },
    content() {
      let { dot, value, showZero, max } = this;
      if (dot || !this.$isDef(value)) return '';
      value = trim(value);
      if (isNumber(value)) {
        value = Number(value);
        if (value === 0 && !showZero) return '';
        if (isNumber(max)) {
          max = Number(max);
          return max > 0 && value > max ? max + '+' : value;
        }
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
