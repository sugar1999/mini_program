<template>
  <view class="s-grid-item" :class="c_class" :style="c_style">
    <view
      class="s-grid-item__wrap"
      :class="wrap_class"
      :style="wrap_style"
      :hover-class="hoverClass"
      :hover-start-time="hoverStartTime"
      :hover-stay-time="hoverStayTime"
      @click="onItemClick"
    >
      <view class="s-grid-item__content" :style="content_style">
        <slot>
          <view class="s-grid-item__icon">
            <slot name="icon">
              <s-icon :icon-prefix="iconPrefix" :name="icon" :size="iconSize" :color="iconColor" />
            </slot>
            <s-badge :value="badge" :dot="dot" />
          </view>
          <view class="s-grid-item__text" :style="text_style">
            <slot name="text">{{ text }}</slot>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-grid-item 宫格格子
 * @description 宫格里面格子item，父级必须为grid组件
 * @property {String} icon 图标名称或图片链接
 * @property {String} text 文字
 * @property {String} iconPrefix 图标类名前缀，同 Icon 组件的 class-prefix 属性
 * @property {Number, String} iconSize 图标大小
 * @property {String} iconColor 图标颜色
 * @property {Number, String} badge 图标右上角徽标的内容
 * @property {Boolean} dot 是否显示图标右上角小红点
 * @property {Number, String} padding 内边距
 * @property {String} background 背景色
 * @property {String, Object} textStyle 文字样式
 * @property {String} hoverClass 点击效果，设为none可禁用点击效果
 * @property {Number} hoverStartTime 按住后多久出现点击态，单位毫秒
 * @property {Number} hoverStayTime 手指松开后点击态保留时间，单位毫秒
 * @event {Function} click (e) 点击事件
 * @example <s-grid-item icon="" text="" />
 */
export default {
  name: 'SGridItem',
  mixins: [componentMixin],
  props: {
    icon: String,
    text: String,
    iconPrefix: String,
    iconSize: [Number, String],
    iconColor: String,
    badge: [Number, String],
    dot: Boolean,
    padding: [Number, String],
    background: String,
    textStyle: [String, Object],
    hoverClass: {
      type: String,
      default: 's-grid-item--hover',
    },
    hoverStartTime: {
      type: Number,
      default: 0,
    },
    hoverStayTime: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    c_class() {
      const { square, direction, space } = this.$sGrid;
      return this.$mergeClass({
        's-grid-item--square': square,
        [`s-grid-item--${direction}`]: direction,
        's-grid-item--gutter': space,
      }, this.custom_class);
    },
    c_style() {
      const { column, space } = this.$sGrid;
      const percent = (100 / Number(column)) + '%';
      return this.$mergeStyle({
        width: percent,
        padding: space,
      }, this.custom_style);
    },
    wrap_class() {
      const { border } = this.$sGrid;
      return this.$mergeClass({
        's-hairline': border,
      });
    },
    wrap_style() {
      const { borderColor } = this.$sGrid;
      return this.$mergeStyle({
        background: this.background,
        borderColor,
      });
    },
    content_style() {
      return this.$mergeStyle({
        padding: this.padding,
      });
    },
    text_style() {
      return this.$mergeStyle(this.textStyle);
    },
  },
  created() {
    this.$sGrid = this.$getParentUntil('SGrid');
  },
  methods: {
    onItemClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
