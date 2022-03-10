<template>
  <view :id="$sUid" :style="wrap_style">
    <view class="s-index-anchor" :class="c_class" :style="c_style">
      <slot>{{ index }}</slot>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-index-anchor 索引标题组件
 * @description 索引列表组件的子级组件
 * @property {String|Number} sort 当使用方数据变动时，anchor组件的数量会变动，传入sort可使其正确排列父级anchorList顺序
 * @property {String|Number} index 索引字符
 * @property {String|Object} activeStyle 高亮时的样式
 * @example <s-index-anchor :index=""></s-index-anchor>
 */
export default {
  name: 'SIndexAnchor',
  mixins: [componentMixin],
  props: {
    sort: {
      type: [String, Number],
      default: 0,
    },
    index: [String, Number],
    activeStyle: [String, Object],
  },
  data: () => ({
    active: false,
    prevActive: false,
    wrapStyle: null,
    anchorStyle: null,
  }),
  computed: {
    wrap_style() {
      return this.$mergeStyle(this.wrapStyle);
    },
    c_class() {
      return this.$mergeClass({
        's-index-anchor--active': this.active,
        's-hairline--bottom': this.prevActive,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle(
        this.custom_style,
        this.anchorStyle,
        this.active ? this.activeStyle : '',
      );
    },
  },
  created() {
    this.$sIndexList = this.$getParentUntil('SIndexList');
  },
  mounted() {
    this.$sIndexList.anchorList.push(this);
    this.$sIndexList.anchorList.sort((a, b) => a.sort == b.sort ? 0 : a.sort > b.sort ? 1 : -1);
    this.$sIndexList.anchorIndexList = this.$sIndexList.anchorList.map(({ index }) => index);
    this.$sIndexList.refresh();
  },
  beforeDestroy() {
    const index = this.$sIndexList.anchorList.findIndex(context => context === this);
    if (index > -1) {
      this.$sIndexList.anchorList.splice(index, 1);
      this.$sIndexList.anchorIndexList = this.$sIndexList.anchorList.map(({ index }) => index);
      this.$sIndexList.refresh();
    }
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
