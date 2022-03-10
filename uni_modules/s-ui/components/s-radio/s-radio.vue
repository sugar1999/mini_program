<template>
  <view class="s-radio" :class="c_class" :style="custom_style" @click="handleClick">
    <slot :scopeParams="scopeParams" :checked="checked">
      <slot name="icon" :scopeParams="scopeParams" :checked="checked">
        <s-icon name="success" :size="iconSize" :custom-class="icon_class" :custom-style="icon_style" />
      </slot>
      <view v-if="$isDef(label) || labelSlot" class="s-radio__label" :style="label_style">
        <slot name="label" :scopeParams="scopeParams" :checked="checked">{{ label }}</slot>
      </view>
    </slot>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-radio 单选框
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配s-radio-group使用
 * @property {*} name 标识符
 * @property {*} label 描述文字
 * @property {Boolean} disabled 是否禁用单选框
 * @property {String} shape = [square] 形状
 * @property {Number|String} iconSize 图标大小
 * @property {String} checkedColor 单选框的选中状态颜色
 * @property {String|Object} labelStyle 描述样式
 * @property {Boolean} labelSlot 是否使用描述信息插槽
 * @event {Function} click (event) 点击事件
 * @example <s-radio :name="" label="单选框" />
 */
export default {
  name: 'SRadio',
  mixins: [componentMixin],
  props: {
    name: {
      default: '',
    },
    label: {
      default: '',
    },
    disabled: Boolean,
    shape: {
      type: String,
      default: 'round',
    },
    iconSize: [Number, String],
    checkedColor: String,
    labelStyle: [String, Object],
    labelSlot: Boolean,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-radio--checked': this.checked,
        's-radio--disabled': this.isDisabeld,
      }, this.custom_class);
    },
    checked() {
      return this.$sRadioGroup.value === this.name;
    },
    checked_color() {
      return this.checkedColor || this.$sRadioGroup.checkedColor;
    },
    isDisabeld() {
      return this.disabled || this.$sRadioGroup.disabled;
    },
    icon_class() {
      return this.$mergeClass('s-radio__icon', {
        [`s-radio__icon--${this.shape}`]: this.shape,
      });
    },
    icon_style() {
      const style = {};
      if (this.checked && this.checked_color) {
        style.backgroundColor = this.checked_color;
        style.borderColor = this.checked_color;
      }
      return this.$mergeStyle(style);
    },
    label_style() {
      return this.$mergeStyle(this.labelStyle);
    },
  },
  created() {
    this.$sRadioGroup = this.$getParentUntil('SRadioGroup');
  },
  methods: {
    handleClick(e) {
      if (!this.isDisabeld) {
        this.$emit('click', e);
        if (!this.checked) {
          this.$sRadioGroup.$emit('input', this.name);
          this.$sRadioGroup.$emit('change', this.name);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
