<template>
  <view class="s-loading" :class="c_class" :style="c_style">
    <view class="s-loading__wrap">
      <view v-if="type === 'spinner'" class="s-loading__spinner">
        <view v-for="i of 12" :key="i" class="s-loading__spinner-item"></view>
      </view>
      <view v-else-if="type === 'circular'" class="s-loading__circular"></view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-loading 加载
 * @description 加载中显示
 * @property {String} type = [spinner|circular] 类型 ，默认值circular
 * @property {Number|String} size 加载图标大小，默认单位为 rpx
 * @property {String} color 颜色
 * @example <s-loading />
 */
export default {
  name: 'SLoading',
  mixins: [componentMixin],
  props: {
    type: {
      type: String,
      default: 'circular',
    },
    size: [Number, String],
    color: String,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        [`s-loading--${this.type}`]: true,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        color: this.color,
        fontSize: this.$addUnit(this.size),
      }, this.custom_style);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
