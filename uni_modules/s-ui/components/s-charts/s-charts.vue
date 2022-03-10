<template>
  <view v-if="$sUid" :class="custom_class" :style="c_style">
    <canvas
      v-if="showCanvas"
      :id="$sUid"
      :canvasId="$sUid"
      :style="{ width: c_width, height: c_height }"
      @click="click"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    ></canvas>
    <image v-else-if="renderImg && imgSrc" :style="{ width: c_width, height: c_height }" :src="imgSrc" />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import Ucharts from '../../lib/u-charts';

const defaultOpts = {
  fontSize: 12,
  formatToolTip(item, category) {
    return category + ' ' + item.name + ':' + item.data;
  },
};

/**
 * s-charts 图表
 * @description 基于u-charts的图表组件
 * @property {Number|String} width charts宽度，默认 750rpx
 * @property {Number|String} height charts高度，默认 500rpx
 * @property {Boolean} renderImg 是否使用图片代替canvas显示，为了解决 弹框显示时 canvas 层级问题
 * @method {Function} init(options:Object) 使用 this.$refs.sCharts.init({}) 渲染图表
 * @example <s-charts width="500" height="500" ref="sCharts" /> this.$refs.sCharts.init({})
 */
export default {
  name: 'SCharts',
  mixins: [componentMixin],
  props: {
    width: {
      type: [Number, String],
      default: 750,
    },
    height: {
      type: [Number, String],
      default: 500,
    },
    renderImg: Boolean,
  },
  data() {
    return {
      showCanvas: true,
      imgSrc: '',
    };
  },
  computed: {
    c_width() {
      return this.$addUnit(this.width);
    },
    c_height() {
      return this.$addUnit(this.height);
    },
    c_style() {
      return this.$mergeStyle({
        width: this.c_width,
        height: this.c_height,
      }, this.custom_style);
    },
    pxWidth() {
      return this.$toPx(this.width);
    },
    pxHeight() {
      return this.$toPx(this.height);
    },
  },
  watch: {
    renderImg(bool) {
      if (bool) {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.pxWidth,
          height: this.pxHeight,
          canvasId: this.$sUid,
          complete: res => {
            this.showCanvas = false;
            this.imgSrc = res.tempFilePath;
          },
        }, this);
      } else {
        this.showCanvas = true;
        if (this.opts) {
          this.init({ animation: false });
        }
      }
    },
  },
  methods: {
    // 触发方法
    init(opts = {}) {
      this.opts = Object.assign({}, defaultOpts, this.opts, opts);
      this.$nextTick(() => {
        this.$uChart = new Ucharts({
          $this: this,
          canvasId: this.$sUid,
          width: this.pxWidth,
          height: this.pxHeight,
          ...this.opts,
        });
      });
    },
    click(e) {
      if (this.$uChart) {
        this.$uChart.showToolTip(e, {
          format: this.opts.formatToolTip,
        });
      }
    },
    touchstart(e) {
      this.$uChart && this.$uChart.scrollStart(e);
    },
    touchmove(e) {
      this.$uChart && this.$uChart.scroll(e);
    },
    touchend(e) {
      this.$uChart && this.$uChart.scrollEnd(e);
    },
  },
};
</script>
