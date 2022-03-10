<template>
  <view :id="$sUid" :class="custom_class" :style="wrap_style">
    <view class="s-sticky" :class="c_class" :style="c_style">
      <slot />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-sticky 粘性布局
 * @description Sticky 组件与 CSS 中position: sticky属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部
 * @property {Number} scrollTop 通过传入的scrollTop改变来触发scroll事件
 * @property {String} position = [top|bottom] 吸顶方向
 * @property {Number|String} offsetTop 吸顶时与顶部的距离，单位rpx
 * @property {Number|String} offsetBottom 吸底时与底部的距离，单位rpx
 * @property {Boolean} enable 启用粘性功能
 * @property {Number|String} zIndex z-index，在吸附时的z-index
 * @property {Function} container 一个函数，返回容器对应的 NodesRef 节点
 * @event {Function} change (bool) 吸附状态改变事件
 * @example <s-sticky></s-sticky>
 */
export default {
  name: 'SSticky',
  mixins: [componentMixin],
  props: {
    scrollTop: {
      type: Number,
      default: 0,
    },
    position: {
      type: String,
      default: 'top',
    },
    offsetTop: {
      type: [Number, String],
      default: 0,
    },
    offsetBottom: {
      type: [Number, String],
      default: 0,
    },
    enable: {
      type: Boolean,
      default: true,
    },
    zIndex: [Number, String],
    container: Function,
  },
  data: () => ({
    sticky: false,
    fixed: false,
    width: 0,
    height: 0,
    transform: 0,
    windowHeight: 0,
    windowTop: 0,
    windowBottom: 0,
  }),
  computed: {
    wrap_style() {
      return this.enable && this.fixed ? this.$mergeStyle({
        height: this.$addUnit(this.height, 'px'),
      }) : '';
    },
    c_class() {
      return this.$mergeClass({
        's-sticky--fixed': this.fixed,
        's-sticky--sticky': this.sticky,
      }, this.custom_class);
    },
    c_style() {
      const style = {};
      if (this.enable) {
        if (this.fixed) {
          style[this.position] = this.$addUnit(this.offset + this.other_height, 'px');
          style.width = this.$addUnit(this.width, 'px');
        }
        if (this.sticky) {
          style.zIndex = this.zIndex;
        }
        if (this.transform) {
          style.transform = 'translate3d(0, ' + this.transform + 'px, 0)';
        }
      }
      return this.$mergeStyle(
        style,
        this.custom_style,
      );
    },
    offset() {
      return this.$toPx(this.position === 'top' ? this.offsetTop : this.offsetBottom);
    },
    other_height() {
      return parseInt(this.position === 'top' ? this.windowTop : this.windowBottom);
    },
    scrollState() {
      return [
        this.enable,
        this.scrollTop,
        this.position,
        this.container,
        this.offsetTop,
        this.offsetBottom,
      ];
    },
  },
  watch: {
    enable(bool) {
      if (!bool) this.resetStickyData();
    },
    scrollState() {
      this.onScroll();
    },
    sticky(bool) {
      this.$emit('change', bool);
    },
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    this.windowHeight = systemInfo.windowHeight;
    this.windowTop = systemInfo.windowTop || 0;
    this.windowBottom = systemInfo.windowBottom || 0;
  },
  mounted() {
    this.$nextTick(this.onScroll);
  },
  methods: {
    getRootRect() {
      return this.$getRect(`#${this.$sUid}`);
    },
    getContainerRect(container) {
      return new Promise(resolve => container().boundingClientRect(resolve).exec());
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    onScroll() {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.timer = null;
        const { _isMounted, _isDestroyed, enable, position, offset, windowHeight } = this;
        if (!_isMounted || _isDestroyed || !enable) return;
        const container = this.$getPropsFn('container');
        if (position === 'top') {
          if (container) {
            Promise.all([this.getRootRect(), this.getContainerRect(container)]).then(([rootRect, containerRect]) => {
              this.resetStickyData();
              if (offset + rootRect.height >= containerRect.height + containerRect.top) {
                this.transform = containerRect.height - rootRect.height;
                this.sticky = true;
              } else if (offset >= rootRect.top && containerRect.bottom >= 0) {
                this.setStickyData(rootRect);
              }
            });
          } else {
            this.getRootRect().then(rootRect => {
              this.resetStickyData();
              if (offset >= rootRect.top) {
                this.setStickyData(rootRect);
              }
            });
          }
        } else {
          if (container) {
            Promise.all([this.getRootRect(), this.getContainerRect(container)]).then(([rootRect, containerRect]) => {
              this.resetStickyData();
              if (offset + rootRect.height >= windowHeight - containerRect.top) {
                this.transform = rootRect.height - containerRect.height;
                this.sticky = true;
              } else if (offset >= windowHeight - rootRect.bottom && windowHeight >= containerRect.top) {
                this.setStickyData(rootRect);
              }
            });
          } else {
            this.getRootRect().then(rootRect => {
              this.resetStickyData();
              if (offset >= windowHeight - rootRect.bottom) {
                this.setStickyData(rootRect);
              }
            });
          }
        }
      });
    },
    resetStickyData() {
      this.sticky = false;
      this.fixed = false;
      this.width = 0;
      this.height = 0;
      this.transform = 0;
    },
    setStickyData(rect) {
      this.sticky = true;
      this.fixed = true;
      this.width = rect.width;
      this.height = rect.height;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
