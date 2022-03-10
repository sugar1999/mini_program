<template>
  <view class="s-progress" :class="c_class" :style="custom_style">
    <view class="s-progress-bar" :style="bar_style">
      <view class="s-progress-bar__inner" :style="inner_style">
        <view v-if="showText && textInside" class="s-progress-bar__inner-text" :style="text_style">
          <slot>{{ c_text }}</slot>
        </view>
      </view>
    </view>
    <view v-if="showText && !textInside" class="s-progress__text" :style="text_style">
      <slot>{{ c_text }}</slot>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import getPercentRangeValue from '../../utils/getPercentRangeValue';

/**
 * s-progress 进度条
 * @description 用于展示操作的当前进度
 * @property {Number|String} percent 进度百分比
 * @property {Number|String} text 进度文字内容
 * @property {Number|String} height 进度条粗细
 * @property {String|Array|Object} color 进度条颜色
 * @property {String} background 轨道颜色
 * @property {Number|String} radius 圆角大小
 * @property {Boolean} showText 是否显示进度文字内容
 * @property {Boolean} textInside 进度文字内容内置在进度条内
 * @property {String|Object} textStyle 进度文字内容样式
 * @example <s-progress :percent="60" />
 */
export default {
  name: 'SProgress',
  mixins: [componentMixin],
  props: {
    percent: {
      type: [Number, String],
      default: 0,
    },
    text: [Number, String],
    height: [Number, String],
    color: [String, Array, Object],
    background: String,
    radius: [Number, String],
    showText: {
      type: Boolean,
      default: true,
    },
    textInside: Boolean,
    textStyle: [String, Object],
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-progress--text-inside': this.textInside,
      }, this.custom_class);
    },
    bar_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
        borderRadius: this.$addUnit(this.radius),
        background: this.background,
      });
    },
    percentColor() {
      return getPercentRangeValue(this.color, this.percent, 'percent', 'color');
    },
    inner_style() {
      return this.$mergeStyle({
        width: this.percent + '%',
        background: this.percentColor,
      });
    },
    text_style() {
      return this.$mergeStyle(this.textStyle);
    },
    c_text() {
      return this.$isDef(this.text) ? this.text : `${this.percent}` + '%';
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
