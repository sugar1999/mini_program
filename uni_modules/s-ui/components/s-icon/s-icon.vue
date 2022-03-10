<template>
  <view class="s-icon" :class="c_class" :style="c_style" @click="handleClick">
    <image v-if="isImage" class="s-icon__image" :src="name" :mode="mode" />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-icon 图标
 * @description s-icon 图标
 * @property {String} classPrefix 类名前缀，用于使用自定义图标
 * @property {String} name 图标名称或图片链接
 * @property {Number|String} size 图标大小，默认单位为rpx
 * @property {String} color 图标颜色
 * @property {String} mode = [scaleToFill|aspectFill|widthFix] 图片裁剪、缩放的模式
 * @property {String|Number} width  图片宽度
 * @property {String|Number} height 图片高度
 * @event {Function} click 点击事件
 * @example <s-icon name="love" size="40" />
 */
export default {
  name: 'SIcon',
  mixins: [componentMixin],
  props: {
    classPrefix: {
      type: String,
      default: 's-icon',
    },
    name: String,
    size: [Number, String],
    color: String,
    mode: {
      type: String,
      default: 'scaleToFill',
    },
    width: [Number, String],
    height: [Number, String],
  },
  computed: {
    isImage() {
      return String(this.name).indexOf('/') !== -1;
    },
    c_class() {
      const classPrefix = this.classPrefix || 's-icon';
      return this.$mergeClass({
        [classPrefix]: !this.isImage && classPrefix !== 's-icon',
        [`${classPrefix}-${this.name}`]: !this.isImage,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        width: this.$addUnit(this.width),
        height: this.$addUnit(this.height),
        fontSize: this.$addUnit(this.size),
        color: this.color,
      }, this.custom_style);
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
