<template>
  <view class="s-loadmore" :class="custom_class" :style="c_style">
    <view v-if="status === 'loading'" class="s-loadmore__loading">
      <s-loading :type="loadingType" :size="loadingSize" :color="loadingColor" />
      <view class="s-loadmore__text" :style="text_style">{{ loadText }}</view>
    </view>
    <s-divider v-else-if="status === 'nomore' && divider" custom-class="s-loadmore__divider">
      <view class="s-loadmore__text" :style="text_style">{{ loadText }}</view>
    </s-divider>
    <view v-else class="s-loadmore__text" :style="text_style">{{ loadText }}</view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-loadmore 加载提示
 * @description 长列表加载提示组件
 * @property {String} status = [loadmore|loading|nomore]
 * @property {String} loadmoreText 加载前文本
 * @property {String} loadingText 加载中文本
 * @property {String} nomoreText 加载完文本
 * @property {String} loadingType = [spinner|circular] 加载图标类型
 * @property {Number|String} loadingSize 加载图标大小
 * @property {String} loadingColor 加载图标大小
 * @property {Number|String} fontSize 提示文字大小
 * @property {String} color 提示文字颜色
 * @property {Boolean} divider 加载完是否显示左右分割线
 * @property {Number|String} padding 容器内边距
 * @property {Number|String} margin 容器外边距
 * @example <s-loadmore status="loading" />
 */
export default {
  name: 'SLoadmore',
  mixins: [componentMixin],
  props: {
    status: {
      type: String,
      default: 'loadmore',
    },
    loadmoreText: String,
    loadingText: {
      type: String,
      default: '加载中',
    },
    nomoreText: {
      type: String,
      default: '没有更多了',
    },
    loadingType: {
      type: String,
      default: 'circular',
    },
    loadingColor: String,
    loadingSize: [Number, String],
    divider: {
      type: Boolean,
      default: true,
    },
    fontSize: [Number, String],
    color: String,
    padding: [Number, String],
    margin: [Number, String],
  },
  computed: {
    c_style() {
      return this.$mergeStyle({
        padding: this.$addUnit(this.padding),
        margin: this.$addUnit(this.margin),
      }, this.custom_style);
    },
    loadMap() {
      return {
        loadmore: this.loadmoreText,
        loading: this.loadingText,
        nomore: this.nomoreText,
      };
    },
    loadText() {
      return this.loadMap[this.status] || '';
    },
    text_style() {
      return this.$mergeStyle({
        fontSize: this.$addUnit(this.fontSize),
        color: this.color,
      });
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
