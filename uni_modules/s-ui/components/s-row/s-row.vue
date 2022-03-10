<template>
  <view class="s-row" :class="c_class" :style="c_style">
    <view class="s-row__wrap" :class="wrap_class" :style="wrap_style">
      <slot />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-row 栅格布局
 * @description 栅格组件父元素
 * @property {Boolean} vertical 是否竖向排列，默认false
 * @property {String} gutter 列元素主轴之间的间距（默认单位为 rpx）
 * @property {String} gutterY 列元素交叉轴之间的间距（默认单位为 rpx）
 * @property {String} justify = [start|center|end|space-around|space-between] Flex水平对齐方式，默认start
 * @property {String} align = [stretch|start|center|end] Flex垂直对齐方式，默认stretch，等高
 * @property {Number|String} height 同style中height属性，设了height属性代表有了指定高度，竖向排列时会对子组件高度加以约束，防止外层无限撑高。
 * @property {String|Object} wrapStyle wrap容器的样式
 * @property {String} overflow 同style中overflow属性
 * @example <s-row></s-row>
 */
export default {
  name: 'SRow',
  mixins: [componentMixin],
  props: {
    vertical: Boolean,
    justify: String,
    align: String,
    gutter: [Number, String],
    gutterY: [Number, String],
    height: [Number, String],
    wrapStyle: [String, Object],
    overflow: String,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-row--vertical': this.vertical,
      });
    },
    c_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
        overflow: this.overflow,
      }, this.custom_style);
    },
    wrap_class() {
      return this.$mergeClass({
        [`s-row--justify-${this.justify}`]: this.justify,
        [`s-row--align-${this.align}`]: this.align,
      });
    },
    wrap_style() {
      const style = {};
      let { vertical, height, mainSpace, crossSpace } = this;
      if (height && height !== 'auto') {
        style.height = '0px';
      }
      if (mainSpace) {
        mainSpace = '-' + mainSpace;
        style[vertical ? 'marginTop' : 'marginLeft'] = mainSpace;
        style[vertical ? 'marginBottom' : 'marginRight'] = mainSpace;
      }
      if (crossSpace) {
        crossSpace = '-' + crossSpace;
        style[vertical ? 'marginLeft' : 'marginTop'] = crossSpace;
        style[vertical ? 'marginRight' : 'marginBottom'] = crossSpace;
      }
      return this.$mergeStyle(style, this.wrapStyle);
    },
    mainSpace() {
      const mainSpace = parseInt(this.$toPx(this.gutter) / 2);
      return mainSpace > 0 ? mainSpace + 'px' : '';
    },
    crossSpace() {
      const crossSpace = parseInt(this.$toPx(this.gutterY) / 2);
      return crossSpace > 0 ? crossSpace + 'px' : '';
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
