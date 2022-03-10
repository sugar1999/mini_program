<template>
  <view class="s-radio-group" :class="custom_class" :style="custom_style">
    <slot />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-radio-group 单选框父组件
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配s-radio使用
 * @property {*} value 当前选中项的标识符
 * @property {Boolean} disabled 是否禁用所有单选框
 * @property {String} checkedColor 所有单选框的选中状态颜色
 * @event {Function} change (value) 选中标项改变时触发
 * @example <s-radio-group v-model=""></s-radio-group>
 */
export default {
  name: 'SRadioGroup',
  mixins: [componentMixin],
  props: {
    value: {
      default: '',
    },
    disabled: Boolean,
    checkedColor: String,
  },
};
</script>
