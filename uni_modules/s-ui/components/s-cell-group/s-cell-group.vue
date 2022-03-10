<template>
  <view class="s-cell-group" :class="custom_class" :style="custom_style">
    <slot name="title">
      <view v-if="title" class="s-cell-group__title" :style="title_style">{{ title }}</view>
    </slot>
    <view class="s-cell-group__content" :class="content_class" :style="content_style">
      <slot />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-cell-group 单元格组合
 * @description 用于包裹s-cell单元格的组件
 * @property {String} title 标题
 * @property {Boolean|String} border = [true|false|top|bottom] 边框
 * @property {String} borderColor 边框颜色
 * @property {String|Object} titleStyle 标题样式
 * @property {String|Object} contentStyle 内容样式
 * @example <s-cell-group></s-cell-group>
 */
export default {
  name: 'SCellGroup',
  mixins: [componentMixin],
  props: {
    title: String,
    border: {
      type: [Boolean, String],
      default: true,
    },
    borderColor: String,
    titleStyle: [String, Object],
    contentStyle: [String, Object],
  },
  computed: {
    title_style() {
      return this.$mergeStyle(this.titleStyle);
    },
    content_class() {
      return this.$mergeClass({
        's-hairline--top-bottom': this.border === true,
        's-hairline--top': this.border === 'top',
        's-hairline--bottom': this.border === 'bottom',
      });
    },
    content_style() {
      return this.$mergeStyle({
        borderColor: this.borderColor,
      }, this.contentStyle);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
