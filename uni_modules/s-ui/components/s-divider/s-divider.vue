<template>
  <view class="s-divider" :class="c_class" :style="custom_style">
    <slot />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-divider 分割线
 * @description 用于将内容分隔为多个区域
 * @property {String} align = [left|right] 内容位置
 * @property {Boolean} dashed 是否使用虚线
 * @property {Boolean} hairline 是否使用 0.5px 线
 * @example <s-divider></s-divider>
 */

export default {
  name: 'SDivider',
  mixins: [componentMixin],
  props: {
    align: String,
    dashed: Boolean,
    hairline: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        [`s-divider--${this.align}`]: this.align,
        's-divider--dashed': this.dashed,
        's-divider--hairline': this.hairline,
      }, this.custom_class);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
