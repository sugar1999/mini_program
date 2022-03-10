<template>
  <view :id="$sUid" class="s-tabs" :class="c_class" :style="c_style">
    <scroll-view
      class="s-tabs__scroll"
      scroll-x
      :show-scrollline="false"
      :scroll-with-animation="isInit && scrollWithAnimation"
      :scroll-left="scrollLeft"
      :class="{ 's-hide-scrollbar': !showScrollBar }"
    >
      <view class="s-tabs__wrap">
        <view class="s-tab-list">
          <view
            v-for="(item, index) of c_list"
            :key="index"
            class="s-tab"
            :class="tabClassList[index]"
            :style="tabStyleList[index]"
            @click="onTabClick(item, index)"
          >
            <slot :scopeParams="scopeParams" :item="item" :index="index" :active="isActive(index)">
              <view class="s-tab__content">
                <s-badge
                  v-if="hasBadge(item)"
                  custom-class="s-tab__badge"
                  :type="item.badge.type"
                  :value="item.badge.value"
                  :dot="item.badge.dot"
                  :background="item.badge.background"
                  :color="item.badge.color"
                  :show-zero="item.badge.showZero"
                  :offset="item.badge.offset"
                  :offset-center="false"
                  :max="item.badge.max"
                  :scale="item.badge.scale"
                />
                <text class="s-tab__text" :class="{ 's-ellipsis': ellipsis }">
                  {{ item[labelKey] }}
                </text>
              </view>
            </slot>
          </view>
        </view>
        <view v-if="show_line" class="s-tabs__line" :style="line_style"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import toValidListData from '../../utils/toValidListData';

/**
 * s-tabs 标签
 * @description 标签组件，主要功能 选中项居中显示，横条跟随
 * @property {Array} list 标签数据 [{label:'Tab1', value:1, disabled:true}]
 * @property {Number|String} height 标签栏高度
 * @property {Number|String} value v-model双向绑定，valueKey为空时根据下标匹配，默认为空
 * @property {String} labelKey 标签名称属性字段，默认 label
 * @property {String} valueKey 标签匹配属性字段，设值后则开启value和属性值匹配
 * @property {String} background 标签栏背景色
 * @property {Boolean} activeBold 标签选中是否加粗
 * @property {String} color 标签颜色
 * @property {String} activeColor 标签选中颜色
 * @property {String} disabledColor 标签禁用颜色
 * @property {Boolean} ellipsis 标签内容超出是否隐藏显示...
 * @property {String|Object} tabStyle 标签样式
 * @property {String|Object} activeTabStyle 标签选中样式
 * @property {Boolean} showLine 是否显示横条
 * @property {String} linePosition = [center | top] 横条位置
 * @property {Number|String} lineWidth 横条宽度，如果带%号，则为选中项宽度的百分比
 * @property {Number|String} lineHeight 横条高度
 * @property {Number|String} lineRadius 横条圆角
 * @property {String} lineColor 横条颜色，未指定则使用activeColor
 * @property {String|Object} lineStyle 横条样式
 * @property {Number|String} lineDuration 横条切换动画持续时间 ms
 * @property {Boolean} border 底部是否显示下边框，默认不显示
 * @property {String} borderColor 下边框颜色
 * @property {Boolean} showScrollBar 是否显示滚动条，默认不显示
 * @event {Function} click (index) 点击标签时触发
 * @event {Function} change (index) 选中标签改变时触发
 * @example <s-tabs v-model="activeTab" :list="list"/>
 */
export default {
  name: 'STabs',
  mixins: [componentMixin],
  props: {
    height: [Number, String],
    list: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Number, String, Boolean],
      default: 0,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: String,
    background: String,
    color: String,
    activeColor: String,
    activeBold: Boolean,
    disabledColor: String,
    ellipsis: Boolean,
    tabStyle: [String, Object],
    activeTabStyle: [String, Object],
    showLine: {
      type: Boolean,
      default: true,
    },
    linePosition: {
      type: String,
      default: 'bottom',
    },
    lineWidth: {
      type: [Number, String],
      default: 50,
    },
    lineHeight: [Number, String],
    lineColor: String,
    lineRadius: [Number, String],
    lineStyle: [String, Object],
    lineDuration: {
      type: [Number, String],
      default: 400,
    },
    border: Boolean,
    borderColor: String,
    showScrollBar: Boolean,
  },
  data() {
    return {
      isInit: false,
      scrollLeft: 0,
      lineLeft: 0,
      line_width: 0,
      scrollWithAnimation: false,
    };
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-hairline--bottom': this.border,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
        background: this.background,
        borderColor: this.borderColor,
      }, this.custom_style);
    },
    c_list() {
      return toValidListData(this.list, this.valueKey, this.labelKey);
    },
    current() {
      if (this.valueKey) return this.c_list.findIndex(item => item[this.valueKey] === this.value);
      const index = parseInt(this.value);
      return index > -1 ? index : -1;
    },
    show_line() {
      return this.isInit && this.showLine && this.current > -1;
    },
    line_style() {
      return this.$mergeStyle({
        width: this.$addUnit(this.line_width, 'px'),
        height: this.$addUnit(this.lineHeight),
        top: this.linePosition === 'top' ? 0 : this.linePosition === 'center' ? '50%' : '',
        bottom: this.linePosition === 'bottom' ? 0 : '',
        background: this.lineColor || this.activeColor,
        borderRadius: this.$addUnit(this.lineRadius),
        transform: `translate3d(${this.lineLeft}px,${this.linePosition === 'center' ? '-50%' : 0},0)`,
        transitionDuration: `${this.lineDuration}ms`,
      }, this.lineStyle);
    },
    tabClassList() {
      return this.c_list.map((item, index) => {
        return this.$mergeClass({
          's-tab--active': this.isActive(index),
          's-tab--disabled': item.disabled,
        });
      });
    },
    tabStyleList() {
      return this.c_list.map((item, index) => {
        const isActive = this.isActive(index);
        return this.$mergeStyle({
          color: item.disabled ? this.disabledColor : isActive ? this.activeColor : this.color,
          fontWeight: isActive && this.activeBold ? '500' : '',
          overflow: this.ellipsis ? 'hidden' : '',
        }, this.tabStyle, isActive ? this.activeTabStyle : '');
      });
    },
    refreshState() {
      return [
        this.c_list,
        this.value,
        this.lineWidth,
      ];
    },
  },
  watch: {
    refreshState() {
      this.refresh();
    },
  },
  created() {
    this.diffLeft = 0;
  },
  mounted() {
    this.refresh();
  },
  methods: {
    isActive(index) {
      return this.current === index;
    },
    hasBadge(item) {
      return this.$getType(item.badge) === 'object';
    },
    onTabClick(item, index) {
      this.$emit('click', index);
      if (!this.isActive(index) && !item.disabled) {
        this.$emit('input', this.valueKey ? item[this.valueKey] : index);
        this.$emit('change', index);
      }
    },
    refresh() {
      this.scrollWithAnimation = false;
      this.$nextTick(() => {
        if (!this._isMounted || this._isDestroyed || this.current < 0) return;
        this.scrollWithAnimation = true;
        Promise.all([
          this.$getRect(`#${this.$sUid} .s-tabs__scroll,#${this.$sUid} .s-tabs__wrap`, true),
          this.$getRect(`#${this.$sUid} .s-tab`, true),
        ]).then(([[scrollRect, wrapRect], listRect]) => {
          const currentRect = listRect[this.current];
          if (currentRect && this.scrollWithAnimation) {
            const centerLeft = (scrollRect.width - currentRect.width) / 2;
            if (this.scrollLeft === 0) this.diffLeft = wrapRect.left - scrollRect.left;
            this.scrollLeft = Math.abs(wrapRect.left - scrollRect.left - this.diffLeft) + currentRect.left - centerLeft - scrollRect.left;
            this.line_width = /%/.test(this.lineWidth) ? currentRect.width * parseFloat(this.lineWidth) / 100 : this.$toPx(this.lineWidth);
            this.lineLeft = this.scrollLeft - this.diffLeft + centerLeft + (currentRect.width - this.line_width) / 2;
            if (!this.isInit) {
              this.$nextTick(() => {
                this.isInit = true;
              });
            }
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
