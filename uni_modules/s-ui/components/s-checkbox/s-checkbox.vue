<template>
  <view class="s-checkbox" :class="c_class" :style="custom_style" @click="handleClick">
    <slot :scopeParams="scopeParams" :checked="checked">
      <slot name="icon" :scopeParams="scopeParams" :checked="checked">
        <s-icon name="success" :size="iconSize" :custom-class="icon_class" :custom-style="icon_style" />
      </slot>
      <view v-if="$isDef(label) || labelSlot" class="s-checkbox__label" :style="label_style">
        <slot name="label" :scopeParams="scopeParams" :checked="checked">{{ label }}</slot>
      </view>
    </slot>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-checkbox 单选框
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配s-checkbox-group使用
 * @property {*} name 标识符
 * @property {*} label 描述文字
 * @property {Boolean} disabled 是否禁用单选框
 * @property {String} shape = [round] 形状
 * @property {Number|String} iconSize 图标大小
 * @property {String} checkedColor 单选框的选中状态颜色
 * @property {String|Object} labelStyle 描述样式
 * @property {Boolean} labelSlot 是否使用描述信息插槽
 * @method {Function} toggle(checked) 切换选中状态，传 true 为选中，false 为取消选中，不传参为取反 checked?: boolean
 * @event {Function} click (event) 点击事件
 * @event {Function} change (checked) 当绑定值变化时触发的事件
 * @example <s-checkbox :name="" label="单选框" />
 */
export default {
  name: 'SCheckbox',
  mixins: [componentMixin],
  props: {
    value: {
      default: false,
    },
    name: {
      default: '',
    },
    label: {
      default: '',
    },
    disabled: Boolean,
    shape: {
      type: String,
      default: 'square',
    },
    iconSize: [Number, String],
    checkedColor: String,
    labelStyle: [String, Object],
    labelSlot: Boolean,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-checkbox--checked': this.checked,
        's-checkbox--disabled': this.isDisabeld,
      }, this.custom_class);
    },
    checked() {
      return this.value || this.$sCheckboxGroup?.value.includes(this.name);
    },
    checked_color() {
      return this.checkedColor || this.$sCheckboxGroup?.checkedColor;
    },
    isDisabeld() {
      return this.disabled || this.$sCheckboxGroup?.disabled;
    },
    icon_class() {
      return this.$mergeClass('s-checkbox__icon', {
        [`s-checkbox__icon--${this.shape}`]: this.shape,
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
    this.$sCheckboxGroup = this.$getParentUntil('SCheckboxGroup');
    if (this.$sCheckboxGroup) {
      this.$sCheckboxGroup.checkboxGroup.push(this);
    }
  },
  beforeDestroy() {
    if (this.$sCheckboxGroup) {
      this.$sCheckboxGroup.checkboxGroup = this.$sCheckboxGroup.checkboxGroup.filter(context => context !== this);
    }
  },
  methods: {
    handleClick(e) {
      if (!this.isDisabeld) {
        this.$emit('click', e);
        this.toggle();
      }
    },
    toggle(bool) {
      let checked = !this.checked;
      if (typeof bool !== 'undefined') {
        checked = !!bool;
        if (checked === this.checked) return;
      }
      this.$emit('input', checked);
      this.$emit('change', checked);
      if (this.$sCheckboxGroup) {
        const max = parseInt(this.$sCheckboxGroup.max);
        const names = [...this.$sCheckboxGroup.value];
        if (checked) {
          if (max > 0 && names.length >= max) {
            this.$sCheckboxGroup.$emit('max', names);
          } else if (!names.includes(this.name)) {
            names.push(this.name);
          }
        } else {
          const index = names.indexOf(this.name);
          if (index > -1) {
            names.splice(index, 1);
          }
        }
        this.$sCheckboxGroup.updateValue(names);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
