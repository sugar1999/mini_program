<template>
  <view class="s-checkbox-group" :class="custom_class" :style="custom_style">
    <slot />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-checkbox-group 复选框父组件
 * @description 复选框组件一般用于需要多个选择的场景，搭配s-checkbox使用
 * @property {*} value 当前选中项的标识符
 * @property {Boolean} disabled 是否禁用所有复选框
 * @property {String} checkedColor 所有复选框的选中状态颜色
 * @method {Function} toggleAll(options?: boolean | object) 切换所有复选框，传 true 为选中，false 为取消选中，不传参为取反
 * @event {Function} change (names) 当绑定值变化时触发的事件
 * @event {Function} max (names) 当选中超过最大数量时触发的事件
 * @example <s-checkbox-group :v-model=""></s-checkbox-group>
 */
export default {
  name: 'SCheckboxGroup',
  mixins: [componentMixin],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    max: [Number, String],
    disabled: Boolean,
    checkedColor: String,
  },
  created() {
    this.checkboxGroup = [];
  },
  methods: {
    toggleAll(options) {
      if (typeof options === 'boolean') {
        options = { checked: options };
      }
      options = options || {};
      this.updateValue(this.checkboxGroup.filter(checkbox => {
        if (checkbox.disabled && options.skipDisabled) return checkbox.checked;
        return options.checked ?? !checkbox.checked;
      }).map(checkbox => checkbox.name));
    },
    updateValue(names) {
      this.$emit('input', names);
      this.$emit('change', names);
    },
  },
};
</script>
