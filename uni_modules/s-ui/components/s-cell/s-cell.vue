<template>
  <view
    class="s-cell"
    :class="c_class"
    :style="c_style"
    :hover-class="hoverClass"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    @click="handleClick"
  >
    <slot>
      <slot name="icon">
        <s-icon
          v-if="icon"
          custom-class="s-cell__icon"
          :class-prefix="iconPrefix"
          :name="icon"
          :size="iconSize"
          :color="iconColor"
        />
      </slot>
      <view class="s-cell__title" :style="title_style">
        <slot name="title">
          <text v-if="$isDef(title)">{{ title }}</text>
        </slot>
      </view>
      <view class="s-cell__value" :style="value_style">
        <slot name="value">
          <text v-if="$isDef(value)">{{ value }}</text>
        </slot>
      </view>
      <view class="s-cell__right" :style="right_style">
        <slot name="right">
          <s-icon
            v-if="arrow"
            custom-class="s-cell__arrow-icon"
            :name="arrowIcon"
            :size="arrowSize"
            :color="arrowColor"
          />
        </slot>
      </view>
    </slot>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-cell
 * @description 单元格
 * @property {*} title 左侧标题
 * @property {*} value 右侧内容
 * @property {String} background 背景色
 * @property {Number|String} padding 内边距
 * @property {Boolean} border 是否显示边框
 * @property {String} borderColor 边框颜色
 * @property {String} hoverClass 点击效果，设为none可去掉点击效果
 * @property {Number} hoverStartTime 按住后多久出现点击态，单位毫秒
 * @property {Number} hoverStayTime 手指松开后点击态保留时间，单位毫秒
 * @property {String} icon 左侧图标名称或图片链接
 * @property {String} iconPrefix 图标类名前缀，同 Icon 组件的 class-prefix 属性
 * @property {Number|String} iconSize 左侧图标大小
 * @property {String} iconColor 左侧图标颜色
 * @property {Boolean} arrow 是否显示右侧箭头图标
 * @property {Boolean} arrowIcon 右侧箭头图标名称
 * @property {String} arrowColor 右侧箭头图标颜色
 * @property {Number|String} arrowSize 右侧箭头图标大小
 * @property {String|Object} titleStyle 标题样式
 * @property {String|Object} valueStyle 内容样式
 * @property {String|Object} rightStyle 右侧样式
 * @event {Function} click 点击事件
 * @example <s-cell title="单元格" />
 */
export default {
  name: 'SCell',
  mixins: [componentMixin],
  props: {
    title: {
      default: '',
    },
    value: {
      default: '',
    },
    background: String,
    padding: [Number, String],
    border: {
      type: Boolean,
      default: true,
    },
    borderColor: String,
    hoverClass: {
      type: String,
      default: 's-cell--hover',
    },
    hoverStartTime: {
      type: Number,
      default: 0,
    },
    hoverStayTime: {
      type: Number,
      default: 100,
    },
    icon: String,
    iconPrefix: String,
    iconSize: [Number, String],
    iconColor: String,
    arrow: Boolean,
    arrowIcon: {
      type: String,
      default: 'arrow',
    },
    arrowSize: [Number, String],
    arrowColor: String,
    titleStyle: [String, Object],
    valueStyle: [String, Object],
    rightStyle: [String, Object],
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-cell--border': this.border,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        padding: this.$addUnit(this.padding),
        background: this.background,
        borderColor: this.borderColor,
      }, this.custom_style);
    },
    title_style() {
      return this.$mergeStyle(this.titleStyle);
    },
    value_style() {
      return this.$mergeStyle(this.valueStyle);
    },
    right_style() {
      return this.$mergeStyle(this.rightStyle);
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
