<template>
  <view class="s-collapse" :class="c_class" :style="custom_style">
    <slot />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-collapse 折叠面板
 * @description 将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。
 * @property {String|Number|Array} value 当前展开面板的 name，手风琴模式：number | string 非手风琴模式：(number | string)[]
 * @property {Boolean} border 是否显示外边框
 * @property {Boolean} accordion 是否开启手风琴模式
 * @event {Function} change (value) 切换面板时触发，value类型与 v-model 绑定的值一致
 * @example <s-collapse></s-collapse>
 */
export default {
  name: 'SCollapse',
  mixins: [componentMixin],
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    border: {
      type: Boolean,
      default: true,
    },
    accordion: Boolean,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-hairline--top-bottom': this.border,
      }, this.custom_class);
    },
    matchValue() {
      const { accordion, value } = this;
      return accordion ? value : this.$getType(value) === 'array' ? value : [];
    },
  },
  created() {
    this.collapseItems = [];
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
    toggle(name, expanded) {
      const { accordion, matchValue } = this;
      if (accordion) {
        this.updateValue(name === matchValue ? '' : name);
      } else if (expanded) {
        this.updateValue(matchValue.concat(name));
      } else {
        this.updateValue(matchValue.filter(value => value !== name));
      }
    },
    isExpanded(name) {
      const { accordion, matchValue } = this;
      return accordion ? matchValue === name : matchValue.includes(name);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
