<template>
  <view class="s-page" :class="custom_class" :style="custom_style">
    <!-- 页面内容 -->
    <view class="s-page__wrap">
      <slot />
    </view>
    <!-- toast -->
    <s-toast />
    <!-- dialog -->
    <s-dialog />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-page 页面
 * @description 页面容器组件
 * @example <s-page custom-class="Home-Page"></s-page>
 */
export default {
  name: 'SPage',
  mixins: [componentMixin],
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
