<template>
  <view :id="$sUid" class="s-collapse-item" :class="c_class" :style="custom_style">
    <s-cell
      custom-class="s-collapse-item__title"
      :custom-style="titleStyle"
      :border="border"
      :value="value"
      :icon="icon"
      :icon-size="iconSize"
      :icon-color="iconColor"
      :arrow="arrow"
      :arrow-icon="arrowIcon"
      :arrow-size="arrowSize"
      :arrow-color="arrowColor"
      :hover-class="hover_class"
      @click="onTitleClick"
    >
      <template #title>
        <slot name="title" :scopeParams="scopeParams" :expanded="expanded">
          <text v-if="$isDef(title)">{{ title }}</text>
        </slot>
      </template>
    </s-cell>
    <view class="s-collapse-item__wrap" :style="wrap_style" @transitionend="onTransitionEnd">
      <view class="s-collapse-item__content" :style="content_style">
        <slot :scopeParams="scopeParams" :expanded="expanded" />
      </view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-collapse-item 面板item
 * @description 必须放在s-collapse面板容器组件下使用
 * @property {String|Number} name 唯一标识符，默认为索引值
 * @property {*} title 标题栏左侧内容
 * @property {*} value 标题栏右侧内容
 * @property {Boolean} border 是否显示内边框
 * @property {String} hoverClass 点击效果，设为none可去掉点击效果
 * @property {String} icon 左侧图标名称或图片链接
 * @property {Number|String} iconSize 左侧图标大小
 * @property {String} iconColor 左侧图标颜色
 * @property {Boolean} arrow 是否显示右侧箭头图标
 * @property {Boolean} arrowIcon 右侧箭头图标名称
 * @property {String} arrowColor 右侧箭头图标颜色
 * @property {Number|String} arrowSize 右侧箭头图标大小
 * @property {Boolean} disabled 是否禁用面板
 * @property {Boolean} readonly 是否为只读状态，只读状态下无法操作面板
 * @property {String|Object} titleStyle 标题样式
 * @property {String|Object} contentStyle 内容样式
 * @method {Function} toggle(bool) 切换面试展开状态，传 true 为展开，false 为收起，不传参为切换
 * @example <s-collapse-item title="标题">内容</s-collapse-item>
 */
export default {
  name: 'SCollapseItem',
  mixins: [componentMixin],
  props: {
    name: [String, Number],
    title: {
      default: '',
    },
    value: {
      default: '',
    },
    border: {
      type: Boolean,
      default: true,
    },
    hoverClass: {
      type: String,
      default: 's-cell--hover',
    },
    icon: String,
    iconSize: [Number, String],
    iconColor: String,
    arrow: {
      type: Boolean,
      default: true,
    },
    arrowIcon: {
      type: String,
      default: 'arrow-down',
    },
    arrowSize: [Number, String],
    arrowColor: String,
    disabled: Boolean,
    readonly: Boolean,
    titleStyle: [String, Object],
    contentStyle: [String, Object],
  },
  data: () => ({
    height: 0,
  }),
  computed: {
    c_class() {
      return this.$mergeClass({
        's-collapse-item--border': this.border,
        's-collapse-item--expanded': this.expanded,
        's-collapse-item--disabled': this.disabled,
      }, this.custom_class);
    },
    hover_class() {
      return !this.disabled && !this.readonly ? this.hoverClass : 'none';
    },
    wrap_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height, 'px'),
      });
    },
    content_style() {
      return this.$mergeStyle(this.contentStyle);
    },
    matchName() {
      return this.name ?? this.$sCollapse.collapseItems.indexOf(this);
    },
    expanded() {
      return this.$sCollapse.isExpanded(this.matchName);
    },
  },
  created() {
    this.transition = false;
    this.updateId = 0;
    this.timer = null;
    this.$sCollapse = this.$getParentUntil('SCollapse');
    this.$sCollapse.collapseItems.push(this);
    this.height = this.expanded ? '' : 0;
    this.$watch(() => this.expanded, this.updateHeight);
  },
  beforeDestroy() {
    this.clearTimer();
    this.$sCollapse.collapseItems = this.$sCollapse.collapseItems.filter(context => context !== this);
  },
  methods: {
    onTitleClick() {
      if (!this.disabled && !this.readonly) {
        this.toggle();
      }
    },
    toggle(bool) {
      this.$sCollapse.toggle(this.matchName, bool ?? !this.expanded);
    },
    async getHeight() {
      return (await this.$getRect(`#${this.$sUid} .s-collapse-item__content`)).height;
    },
    async updateHeight() {
      if (!this._isMounted || this._isDestroyed) return;
      this.clearTimer();
      const updateId = ++this.updateId;
      const height = await this.getHeight();
      if (updateId === this.updateId) {
        this.height = height;
        if (!this.expanded) {
          this.timer = setTimeout(() => {
            this.height = 0;
          }, 1000 / 30);
        }
      }
    },
    onTransitionEnd() {
      if (this.expanded) {
        this.height = '';
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
