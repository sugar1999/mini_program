<template>
  <view class="s-col" :class="c_class" :style="c_style">
    <slot />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-col s-row子级
 * @description 栅格组件子元素
 * @property {Number|String} span 列元素主轴空间比例
 * @property {Number|String} flex 同flex的flex-grow属性，用于自适应剩余空间，优先级高于span
 * @property {Number|String} offset 列元素主轴空间偏移比例
 * @property {String} overflow 同style中overflow属性
 * @example <s-span :span="8"></s-span>
 */
export default {
  name: 'SCol',
  mixins: [componentMixin],
  props: {
    span: [Number, String],
    offset: [Number, String],
    flex: [Number, String],
  },
  computed: {
    c_class() {
      const { vertical } = this.$sRow;
      const classs = [];
      const flex = parseInt(this.flex);
      const span = parseInt(this.span);
      const offset = parseInt(this.offset);
      if (flex > 0) {
        classs.push(`s-col--flex-${this.flex}`);
      } else if (span > 0) {
        classs.push(`s-col--${this.span}`);
      }
      if (offset > 0) {
        classs.push(`s-col--${vertical ? 'vertical-' : ''}offset-${this.offset}`);
      }
      return this.$mergeClass(classs, this.custom_class);
    },
    c_style() {
      const { vertical, mainSpace, crossSpace } = this.$sRow;
      const style = {};
      if (parseInt(this.span) > 0 || parseInt(this.flex)) {
        style[vertical ? 'height' : 'width'] = '0px';
      }
      if (mainSpace) {
        style[vertical ? 'paddingTop' : 'paddingLeft'] = mainSpace;
        style[vertical ? 'paddingBottom' : 'paddingRight'] = mainSpace;
      }
      if (crossSpace) {
        style[vertical ? 'paddingLeft' : 'paddingTop'] = crossSpace;
        style[vertical ? 'paddingRight' : 'paddingBottom'] = crossSpace;
      }
      return this.$mergeStyle(style, this.custom_style);
    },
  },
  created() {
    this.$sRow = this.$getParentUntil('SRow');
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
