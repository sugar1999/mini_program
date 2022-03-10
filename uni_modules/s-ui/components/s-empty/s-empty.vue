<template>
  <view class="s-empty" :class="custom_class" :style="c_style">
    <view class="s-empty__content">
      <s-image
        v-if="src"
        custom-class="s-empty__img"
        :src="src"
        :mode="imgMode"
        :show-loading="imgLoading"
        :fade-show="imgFade"
        :width="imgWidth"
        :height="imgHeight"
        :custom-style="imgStyle"
      />
      <slot name="text">
        <view v-if="text" class="s-empty__text" :style="text_style">{{ text }}</view>
      </slot>
      <slot />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-empty 空状态展示
 * @description 列表或数据为空时使用
 * @property {String} src 图片路径
 * @property {String} text 文字描述
 * @property {String|Number} padding 容器内边距
 * @property {String|Number} margin 容器外边距
 * @property {String|Number} height 容器高度
 * @property {String|Number} imgWidth  图片宽度
 * @property {String|Number} imgHeight 图片高度
 * @property {String} imgMode = [scaleToFill|aspectFill|widthFix] 图片裁剪、缩放的模式
 * @property {Boolean} imgLoading 图片是否显示加载状态
 * @property {Boolean} imgFade 图片加载显示时fade效果
 * @property {String|Object} imgStyle 图片style样式
 * @property {String|Number} fontSize 文字大小
 * @property {String} color 文字颜色
 * @property {String|Object} textStyle 文字style样式
 * @example <s-empty src="" text="" />
 */
export default {
  name: 'SEmpty',
  mixins: [componentMixin],
  props: {
    src: String,
    text: String,
    height: [Number, String],
    margin: [Number, String],
    padding: [Number, String],
    imgWidth: [Number, String],
    imgHeight: [Number, String],
    imgMode: {
      type: String,
      default: 'scaleToFill',
    },
    imgLoading: Boolean,
    imgFade: Boolean,
    imgStyle: [String, Object],
    fontSize: [Number, String],
    color: String,
    textStyle: [String, Object],
  },
  computed: {
    c_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
        margin: this.$addUnit(this.margin),
        padding: this.$addUnit(this.padding),
      }, this.custom_style);
    },
    text_style() {
      return this.$mergeStyle({
        fontSize: this.$addUnit(this.fontSize),
        color: this.color,
      }, this.textStyle);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
