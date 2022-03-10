<template>
  <view :style="wrap_style">
    <view :id="$sUid" class="s-fixed" :class="custom_class" :style="c_style">
      <view v-if="fixed && safeAreaInset && position === 'top'" style="height: var(--safe-area-inset-top)"></view>
      <slot />
      <view v-if="fixed && safeAreaInset && position === 'bottom'" style="height: var(--safe-area-inset-bottom)"></view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-fixed 固定定位
 * @description 固定某个元素到一个位置
 * @property {String} position = [top|bottom] 固定方向
 * @property {Number|String} top 顶部的距离，单位rpx
 * @property {Number|String} bottom 底部的距离，单位rpx
 * @property {Boolean} fixed 启用固定功能
 * @property {Number|String} zIndex z-index
 * @property {String} background 背景色
 * @property {Boolean} safeAreaInset 是否空出底部或顶部安全距离
 * @example <s-fixed></s-fixed>
 */
export default {
  name: 'SFixed',
  mixins: [componentMixin],
  props: {
    position: {
      type: String,
      default: 'bottom',
    },
    top: {
      type: [Number, String],
      default: 0,
    },
    bottom: {
      type: [Number, String],
      default: 0,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    zIndex: [Number, String],
    background: String,
    safeAreaInset: Boolean,
  },
  data: () => ({
    isFixed: false,
    width: 0,
    height: 0,
    windowTop: 0,
    windowBottom: 0,
  }),
  computed: {
    wrap_style() {
      const style = {};
      if (this.fixed && !this.isFixed) {
        style.opacity = 0;
      } else if (this.isFixed) {
        style.height = this.height + 'px';
      }
      return this.$mergeStyle(style);
    },
    c_style() {
      const style = {
        background: this.background,
      };
      if (this.isFixed) {
        style.position = 'fixed';
        style.width = this.width + 'px';
        style[this.position] = (this.offset + this.otherHeight) + 'px';
        style.zIndex = this.zIndex;
      }
      return this.$mergeStyle(style, this.custom_style);
    },
    offset() {
      return this.$toPx(this.position === 'top' ? this.top : this.bottom);
    },
    otherHeight() {
      return parseInt(this.position === 'top' ? this.windowTop : this.windowBottom);
    },
    refreshState() {
      return [
        this.fixed,
        this.position,
        this.top,
        this.bottom,
        this.safeAreaInset,
      ];
    },
  },
  watch: {
    refreshState() {
      this.refresh();
    },
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    this.windowTop = systemInfo.windowTop || 0;
    this.windowBottom = systemInfo.windowBottom || 0;
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        if (!this._isMounted || this._isDestroyed || !this.fixed) {
          this.isFixed = false;
        } else {
          this.$getRect(`#${this.$sUid}`).then(rect => {
            this.isFixed = true;
            this.width = rect.width;
            this.height = rect.height;
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
