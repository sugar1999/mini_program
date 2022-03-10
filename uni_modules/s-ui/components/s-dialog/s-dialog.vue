<template>
  <view v-if="state.isInit && $sIsCurrentPage" class="s-dialog" :class="state.className">
    <s-popup
      :animate="state.animate"
      :animate-duration="state.animateDuration"
      :mask-opacity="state.maskOpacity"
      :mask-close="false"
      :z-index="state.zIndex"
      :value="state.visible"
    >
      <view v-if="showHeader" class="s-dialog__header" :style="header_style">
        {{ state.title }}
      </view>
      <view v-if="showMessage" class="s-dialog__message" :style="message_style">
        {{ state.message }}
      </view>
      <view v-if="showFooter" class="s-dialog__footer s-hairline--top">
        <s-button
          v-if="hasCancel"
          custom
          hairline
          custom-class="s-dialog__action s-dialog__cancel-action"
          :custom-style="cancel_style"
          @click="state.onCancel"
        >
          {{ state.cancelText }}
        </s-button>
        <s-button
          v-if="hasConfirm"
          custom
          hairline
          custom-class="s-dialog__action s-dialog__confirm-action"
          :custom-style="confirm_style"
          @click="state.onConfirm"
        >
          {{ state.confirmText }}
        </s-button>
      </view>
    </s-popup>
  </view>
</template>

<script>
import Dialog from './dialog';
import componentMixin from '../../mixins/componentMixin';

/**
 * s-dialog 模态确认弹框
 * @description 用于提示或二次确认，使用需通过 import Dialog from '@/uni_modules/s-ui/utils/dialog'
 * @example Dialog({message:'确定删除吗？'}).then(()=>{},()=>{})
 */
export default {
  name: 'SDialog',
  mixins: [componentMixin],
  data() {
    return {
      state: Dialog.state,
    };
  },
  computed: {
    showHeader() {
      return this.$isDef(this.state.title);
    },
    showMessage() {
      return this.$isDef(this.state.message);
    },
    hasCancel() {
      return this.state.showCancel && this.$isDef(this.state.cancelText);
    },
    hasConfirm() {
      return this.$isDef(this.state.confirmText);
    },
    showFooter() {
      return this.hasCancel || this.hasConfirm;
    },
    header_style() {
      return this.$mergeStyle({
        color: this.state.titleColor,
      });
    },
    message_style() {
      return this.$mergeStyle({
        color: this.state.messageColor,
      });
    },
    cancel_style() {
      return {
        color: this.state.cancelColor,
      };
    },
    confirm_style() {
      return {
        color: this.state.confirmColor,
      };
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
