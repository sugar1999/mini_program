<template>
  <view class="s-swiper" :class="c_class" :style="custom_style">
    <swiper
      :indicator-dots="false"
      :current="current"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      :vertical="vertical"
      :previous-margin="previous_margin"
      :next-margin="next_margin"
      :display-multiple-items="displayMultipleItems"
      :style="swiper_style"
      @change="onChange"
    >
      <swiper-item v-for="(item, index) of list" :key="index">
        <view class="s-swiper-item" :class="{ 's-swiper-item--active': isActive(index) }" :style="item_style">
          <view class="s-swiper-item__wrap" :style="wrap_style" @click="onItemClick(index)">
            <slot :scopeParams="scopeParams" :item="item" :index="index" :active="isActive(index)">
              <s-image
                :src="getSrc(item)"
                custom-class="s-swiper-item__image"
                :mode="imgMode"
                :show-loading="imgLoading"
                :fade-show="imgFade"
              />
            </slot>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <slot v-if="indicator" name="indicator">
      <view class="s-swiper-indicators" :class="indicators_class" :style="indicators_style">
        <view
          v-for="(item, index) of list"
          :key="index"
          class="s-swiper-indicator"
          :class="indicatorClassList[index]"
          :style="indicatorStyleList[index]"
          @click="onItemClick(index)"
        ></view>
      </view>
    </slot>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-swiper 轮播
 * @description 该组件一般用于banner轮播
 * @property {Array} list 轮播图数据
 * @property {String|Number} height swiper 高度
 * @property {String} name list中对象数据读取图片url的属性名
 * @property {Boolean} autoplay 是否自动切换
 * @property {Number} current 当前所在滑块的 index
 * @property {String} type = [3d|chain] 轮播类型
 * @property {String} background 图片容器背景
 * @property {String|Number} margin 左右inset距离
 * @property {String|Number} chainMargin type为chain时，左右边距
 * @property {String|Number} gutter 轮播之间间距
 * @property {String|Number} padding 轮播内边距，不能和gutter同时使用
 * @property {Number} interval 自动切换时间间隔
 * @property {Number} duration 滑动动画时长
 * @property {Boolean} circular 是否采用衔接滑动，即播放到末尾后重新回到开头
 * @property {Boolean} vertical 滑动方向是否为纵向
 * @property {Number} displayMultipleItems 同时显示的滑块数量
 * @property {String|Number} radius 圆角
 * @property {String} imgMode = [scaleToFill|aspectFill|widthFix] 图片裁剪、缩放的模式
 * @property {Boolean} imgLoading 图片是否显示加载状态
 * @property {Boolean} imgFade 图片加载显示时fade效果
 * @property {Boolean} indicator 是否显示指示点
 * @property {String} indicatorType = [default|round|rect] 指示点类型
 * @property {String|Object} indicatorWrapClass 指示点容器class
 * @property {String|Object} indicatorWrapStyle 指示点容器样式
 * @property {String|Number} indicatorGutter 指示点之间间距
 * @property {String} indicatorColor 指示点颜色
 * @property {String} indicatorActiveColor 当前选中的指示点颜色
 * @property {String|Object} indicatorStyle 指示点样式
 * @property {String|Object} indicatorActiveStyle 当前选中指示点样式
 * @event {Function} click (current) 点击轮播图时触发
 * @event {Function} change (current, source) 轮播图切换时触发(自动或者手动切换)
 * @example <s-swiper :list="[]"/>
 */
export default {
  name: 'SSwiper',
  mixins: [componentMixin],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    height: {
      type: [String, Number],
      default: 300,
    },
    type: String,
    background: String,
    name: {
      type: String,
      default: 'url',
    },
    margin: [Number, String],
    chainMargin: [Number, String],
    gutter: [Number, String],
    padding: [Number, String],
    autoplay: Boolean,
    current: {
      type: Number,
      default: 0,
    },
    interval: {
      type: Number,
      default: 5000,
    },
    duration: {
      type: Number,
      default: 500,
    },
    circular: Boolean,
    vertical: Boolean,
    displayMultipleItems: {
      type: Number,
      default: 1,
    },
    radius: [Number, String],
    imgMode: {
      type: String,
      default: 'aspectFill',
    },
    imgLoading: Boolean,
    imgFade: Boolean,
    indicator: Boolean,
    indicatorType: {
      type: String,
      default: 'default',
    },
    indicatorWrapClass: [String, Object],
    indicatorWrapStyle: [String, Object],
    indicatorGutter: [Number, String],
    indicatorColor: String,
    indicatorActiveColor: String,
    indicatorStyle: [String, Object],
    indicatorActiveStyle: [String, Object],
  },
  data: () => ({
    activeIndex: 0,
  }),
  computed: {
    c_class() {
      return this.$mergeClass('s-swiper--' + (this.vertical ? 'vertical' : 'horizontal'), {
        [`s-swiper--${this.type}`]: this.type,
      }, this.custom_class);
    },
    swiper_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
      });
    },
    gutterNum() {
      return Math.round(this.$toPx(this.gutter) / 2);
    },
    marginNum() {
      return this.$toPx(this.margin) - this.gutterNum;
    },
    chainMarginNum() {
      return this.$toPx(this.chainMargin) - this.gutterNum;
    },
    previous_margin() {
      if (this.type === 'chain') {
        switch (this.activeIndex) {
          case 0:
            return this.chainMarginNum + 'px';
          case this.list.length - 1:
            return this.marginNum + 'px';
          default:
            return parseInt((this.marginNum + this.chainMarginNum) / 2) + 'px';
        }
      }
      return this.marginNum + 'px';
    },
    next_margin() {
      if (this.type === 'chain') {
        switch (this.activeIndex) {
          case 0:
            return this.marginNum + 'px';
          case this.list.length - 1:
            return this.chainMarginNum + 'px';
          default:
            return parseInt((this.marginNum + this.chainMarginNum) / 2) + 'px';
        }
      }
      return this.marginNum + 'px';
    },
    indicators_class() {
      return this.$mergeClass('s-swiper-indicators--' + (this.vertical ? 'vertical' : 'horizontal'), {
        [`s-swiper-indicators--${this.indicatorType}`]: this.indicatorType !== 'none',
      }, this.indicatorWrapClass);
    },
    indicators_style() {
      return this.$mergeStyle(this.indicatorWrapStyle);
    },
    item_style() {
      const style = {};
      const { padding, vertical, gutterNum } = this;
      if (padding) {
        style.padding = this.$addUnit(padding);
      } else if (gutterNum) {
        style[vertical ? 'paddingTop' : 'paddingLeft'] = gutterNum + 'px';
        style[vertical ? 'paddingBottom' : 'paddingRight'] = gutterNum + 'px';
      }
      return this.$mergeStyle(style);
    },
    wrap_style() {
      return this.$mergeStyle({
        background: this.background,
        borderRadius: this.$addUnit(this.radius),
      });
    },
    indicatorClassList() {
      return this.list.map((item, index) => this.$mergeClass({
        's-swiper-indicator--active': this.isActive(index),
      }));
    },
    indicatorStyleList() {
      return this.list.map((item, index) => {
        const isActive = this.isActive(index);
        const style = {
          background: isActive ? this.indicatorActiveColor : this.indicatorColor,
        };
        if (index > 0) {
          style[this.vertical ? 'marginTop' : 'marginLeft'] = this.$addUnit(this.indicatorGutter);
        }
        return this.$mergeStyle(style, this.indicatorStyle, isActive ? this.indicatorActiveStyle : '');
      });
    },
  },
  watch: {
    current: {
      immediate: true,
      handler() {
        this.activeIndex = this.current;
      },
    },
  },
  methods: {
    getSrc(item) {
      return item && typeof item === 'object' ? item[this.name] : item;
    },
    isActive(index) {
      return this.activeIndex === index;
    },
    onItemClick(index) {
      this.$emit('click', index);
    },
    onChange(e) {
      const { current, source } = e.detail;
      this.activeIndex = current;
      this.$emit('update:current', current);
      this.$emit('change', current, source);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
