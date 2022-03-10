<template>
  <view class="s-grid" :class="custom_class" :style="custom_style">
    <view class="s-grid__wrap" :class="wrap_class" :style="wrap_style">
      <slot />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-grid 宫格
 * @description 宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航
 * @property {Number|String} column 列数
 * @property {Number|String} gutter 格子之间的间距
 * @property {Boolean} border 是否显示边框
 * @property {Boolean} square 是否将格子根据宽度固定为正方形
 * @property {String} direction = [horizontal] 格子内容排列的方向
 * @property {String} borderColor 边框颜色
 * @example <s-grid></s-grid>
 */
export default {
  name: 'SGrid',
  mixins: [componentMixin],
  props: {
    column: {
      type: [Number, String],
      default: 4,
    },
    gutter: [Number, String],
    border: {
      type: Boolean,
      default: true,
    },
    square: Boolean,
    direction: String,
    borderColor: String,
  },
  computed: {
    wrap_class() {
      return this.$mergeClass({
        's-hairline': this.border && !this.space,
      });
    },
    wrap_style() {
      return this.$mergeStyle({
        borderColor: this.borderColor,
        margin: this.space ? `-${this.space}` : '',
      });
    },
    space() {
      const space = parseInt(this.$toPx(this.gutter) / 2);
      return space > 0 ? space + 'px' : '';
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
