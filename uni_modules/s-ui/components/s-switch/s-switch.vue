<template>
  <view class="s-switch" :class="c_class" :style="c_style" @click="handleClick">
    <view class="s-switch__node">
      <s-loading v-if="loading" custom-class="s-switch__loading" />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-switch 开关
 * @description 用于在打开和关闭状态之间进行切换
 * @property {*} value 开关选中状态
 * @property {String} type = [primary | success | warning | danger | info] 类型
 * @property {Number|String} size 开关尺寸，单位为rpx
 * @property {Boolean} loading 是否为加载状态
 * @property {Boolean} disabled 是否为禁用状态
 * @property {*} inactiveValue 关闭时对应的值
 * @property {*} activeValue 打开时对应的值
 * @property {String} inactiveColor 关闭时的背景色
 * @property {String} activeColor 打开时的背景色
 * @event {Function} change(checked) 开关状态切换时触发
 * @event {Function} click(event) 点击时触发
 * @example <s-switch v-model="checked" />
 */
export default {
  name: 'SSwitch',
  mixins: [componentMixin],
  props: {
    value: {
      default: false,
    },
    type: String,
    size: [Number, String],
    loading: Boolean,
    disabled: Boolean,
    inactiveValue: {
      default: false,
    },
    activeValue: {
      default: true,
    },
    inactiveColor: String,
    activeColor: String,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        [`s-switch--${this.type}`]: this.type,
        's-switch--on': this.isChecked,
        's-switch--loading': this.loading,
        's-switch--disabled': this.disabled,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        fontSize: this.$addUnit(this.size),
        color: this.isChecked ? this.activeColor : this.inactiveColor,
        background: this.isChecked ? this.activeColor : this.inactiveColor,
      }, this.custom_style);
    },
    isChecked() {
      return this.value === this.activeValue;
    },
    isDisabled() {
      return this.loading || this.disabled;
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
      if (this.isDisabled) return;
      const value = this.isChecked ? this.inactiveValue : this.activeValue;
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
