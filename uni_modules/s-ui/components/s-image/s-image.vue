<template>
  <view class="s-image" :class="c_class" :style="c_style" @click="handleClick">
    <view :id="$sUid" class="s-image__wrap">
      <image
        v-if="startLoad"
        class="s-image__img"
        :src="loadSrc"
        :mode="mode"
        :lazy-load="false"
        :fade-show="false"
        :webp="webp"
        :show-menu-by-longpress="showMenuByLongpress"
        :style="image_style"
        @load="handleLoad"
        @error="handleError"
      />
      <view v-if="showLoading && isLoading" class="s-image__loading">
        <slot name="loading">
          <s-icon
            v-if="showIcon && loadingIcon"
            custom-class="s-image__loading-icon"
            :class-prefix="iconPrefix"
            :name="loadingIcon"
            :size="iconSize"
          />
        </slot>
      </view>
      <view v-else-if="showError && isError" class="s-image__error">
        <slot name="error">
          <s-icon
            v-if="showIcon && errorIcon"
            custom-class="s-image__error-icon"
            :class-prefix="iconPrefix"
            :name="errorIcon"
            :size="iconSize"
          />
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-image 图片
 * @description 图片组件
 * @property {String} src 图片路径
 * @property {String} mode = [scaleToFill|aspectFill|widthFix] 图片裁剪、缩放的模式，默认 scaleToFill
 * @property {Number|String} width 图片宽度
 * @property {Number|String} height 图片高度
 * @property {Number|String} radius 图片圆角
 * @property {Boolean} round 是否显示为圆形
 * @property {Boolean} block 是否为块级元素，消除间隙，默认false
 * @property {Boolean} lazyLoad 是否开启懒加载
 * @property {Number|String} threshold 触发加载时的位置
 * @property {Boolean} fadeShow 图片加载成功后显示时fade效果
 * @property {Number|String} fadeDuration fade效果过渡时间，单位ms
 * @property {Boolean} showLoading 是否显示加载状态
 * @property {Boolean} showError 是否显示加载失败状态
 * @property {String} loadingIcon 加载时提示的图标名称或图片链接
 * @property {String} errorIcon 失败时提示的图标名称或图片链接
 * @property {String} iconPrefix 图标类名前缀，同 Icon 组件的 class-prefix 属性
 * @property {Number|String} iconSize 图标大小
 * @property {Boolean} webp image webp属性 默认为false
 * @property {Boolean} showMenuByLongpress image show-menu-by-longpress属性 默认为false
 * @property {Boolean} showIcon 是否显示加载中或加载失败图标
 * @event {Function} click 点击事件
 * @event {Function} load 加载成功事件
 * @event {Function} error 加载失败事件
 * @example <s-image src="" width="100" height="100" />
 */
export default {
  name: 'SImage',
  mixins: [componentMixin],
  props: {
    src: {
      default: '',
    },
    mode: {
      type: String,
      default: 'scaleToFill',
    },
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    round: Boolean,
    block: Boolean,
    showLoading: Boolean,
    showError: {
      type: Boolean,
      default: true,
    },
    loadingIcon: {
      type: String,
      default: 'photo',
    },
    errorIcon: {
      type: String,
      default: 'photo-fail',
    },
    iconPrefix: String,
    iconSize: [Number, String],
    lazyLoad: Boolean,
    threshold: {
      type: [Number, String],
      default: 100,
    },
    fadeShow: Boolean,
    fadeDuration: {
      type: [Number, String],
      default: 300,
    },
    loading: Boolean,
    error: Boolean,
    showIcon: {
      type: Boolean,
      default: true,
    },
    webp: Boolean,
    showMenuByLongpress: Boolean,
  },
  data: () => ({
    loadSrc: '',
    startLoad: false,
    isLoading: true,
    isError: false,
  }),
  computed: {
    c_class() {
      return this.$mergeClass({
        's-image--round': this.round,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        width: this.$addUnit(this.width),
        height: this.$addUnit(this.height),
        borderRadius: this.$addUnit(this.radius),
        display: this.block ? 'block' : '',
      }, this.custom_style);
    },
    image_style() {
      const style = {};
      if (this.fadeShow) {
        const showImage = !(this.isLoading || this.isError);
        if (showImage) {
          style.opacity = 1;
          style.transition = `opacity ${this.fadeDuration}ms ease-in-out`;
        } else {
          style.opacity = 0;
        }
      }
      return this.$mergeStyle(style);
    },
    lazyState() {
      return [
        this.lazyLoad,
        this.startLoad,
        this.threshold,
      ];
    },
  },
  watch: {
    loading(bool) {
      this.updateLoadingStatus(bool);
    },
    error(bool) {
      this.updateErrorStatus(bool);
    },
    src: {
      immediate: true,
      handler(src) {
        this.loadSrc = this.lazyLoad ? '' : src;
        this.startLoad = !this.lazyLoad;
        if (src) {
          this.updateLoadingStatus(true);
          this.updateErrorStatus(false);
        } else {
          this.updateLoadingStatus(false);
          this.updateErrorStatus(true);
        }
      },
    },
    lazyState() {
      this.startObserver();
    },
  },
  mounted() {
    this.startObserver();
  },
  beforeDestroy() {
    this.stopObserver();
  },
  methods: {
    updateLoadingStatus(bool) {
      this.isLoading = this.loading || bool;
    },
    updateErrorStatus(bool) {
      this.isError = this.error || bool;
    },
    handleClick(e) {
      this.$emit('click', e);
    },
    handleLoad(e) {
      if (this.startLoad) {
        this.updateLoadingStatus(false);
        this.updateErrorStatus(false);
        this.$emit('load', e);
      }
    },
    handleError(e) {
      if (this.startLoad) {
        this.updateLoadingStatus(false);
        this.updateErrorStatus(true);
        this.$emit('error', e);
      }
    },
    startObserver() {
      this.stopObserver();
      if (this._isMounted && !this._isDestroyed && this.lazyLoad && !this.startLoad) {
        const threshold = this.$toPx(this.threshold);
        this.observe = uni.createIntersectionObserver(this);
        this.observe.relativeToViewport({
          top: threshold,
          bottom: threshold,
        }).observe(`#${this.$sUid}`, res => {
          if (res.intersectionRatio > 0) {
            this.loadSrc = this.src;
            this.startLoad = true;
            this.stopObserver();
          }
        });
      }
    },
    stopObserver() {
      if (this.observe) {
        this.observe.disconnect();
        this.observe = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
