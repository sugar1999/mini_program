<template>
  <view class="s-ui" :class="c_class" :style="c_style">s-ui</view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-ui
 * @description 描述
 * @property {String} 参数
 * @event {Function} click (e) 点击事件
 * @example <s-ui></s-ui>
 */
export default {
  name: 'SUi',
  mixins: [componentMixin],
  props: {},
  data: () => ({}),
  computed: {
    c_class() {
      return this.$mergeClass(this.custom_class);
    },
    c_style() {
      return this.$mergeStyle(this.custom_style);
    },
  },
  watch: {},
  created() { },
  mounted() { },
  beforeDestroy() { },
  methods: {},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
