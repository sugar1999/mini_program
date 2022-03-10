<template>
  <view v-if="state.isInit && $sIsCurrentPage" class="s-toast" :class="c_class">
    <s-popup
      position="custom"
      :background="state.background"
      :animate="state.animate"
      :animate-duration="state.animateDuration"
      :mask="state.mask"
      :mask-opacity="state.maskOpacity"
      :mask-close="false"
      :z-index="state.zIndex"
      :value="state.visible"
      :wrap-style="{ color: state.color }"
    >
      <view class="s-toast__container">
        <s-loading v-if="state.type === 'loading'" custom-class="s-toast__loading" />
        <s-icon
          v-else-if="state.icon"
          :name="state.icon"
          custom-class="s-toast__icon"
          :custom-style="state.iconStyle"
        />
        <view v-if="showMessage" class="s-toast__message">{{ state.message }}</view>
      </view>
    </s-popup>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import Toast from './toast';

/**
 * s-toast 提示弹框
 * @description 用于提示反馈，使用需通过 import Toast from '@/uni_modules/s-ui/utils/toast'
 * @example Toast.success('发布成功'});
 */
export default {
  name: 'SToast',
  mixins: [componentMixin],
  data() {
    return {
      state: Toast.state,
    };
  },
  computed: {
    c_class() {
      const { position, type, icon, className } = this.state;
      return this.$mergeClass({
        [`s-toast--${type}`]: type,
        [`s-toast--${position}`]: position,
        's-toast--has-icon': type === 'loading' || icon,
      }, className);
    },
    showMessage() {
      return this.$isDef(this.state.message);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
