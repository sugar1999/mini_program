<template>
  <view v-if="$sUid" class="s-circle" :class="custom_class" :style="custom_style">
    <canvas :id="$sUid" :canvas-id="$sUid" class="s-circle__canvas" :style="canvas_style"></canvas>
    <view class="s-circle__text">
      <slot>{{ text }}</slot>
    </view>
  </view>
</template>

<script>
import { primary, white } from '../../common/color';
import componentMixin from '../../mixins/componentMixin';
import createTimer from '../../utils/createTimer';
import getPercentRangeValue from '../../utils/getPercentRangeValue';

const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;

/**
 * s-circle 环形进度条
 * @description 圆环形的进度条组件，支持进度渐变动画
 * @property {Number} percent 进度百分比
 * @property {Number|String} size 圆环直径，默认单位为 rpx
 * @property {String|Object} color 进度条颜色，传入对象格式可以定义渐变色
 * @property {String} layerColor 轨道颜色
 * @property {Number|String} text 文字
 * @property {Number} speed 动画速度（单位为 rate/s）
 * @property {String} fill 填充颜色
 * @property {Boolean} clockwise 是否顺时针，默认 true
 * @property {Number|String} strokeWidth 进度条宽度，默认单位为 rpx
 * @property {String} lineCap = [sqaure | butt | round] 进度条端点的形状
 * @example <s-circle :percent="percent" />
 */
export default {
  name: 'SCircle',
  mixins: [componentMixin],
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    size: {
      type: [Number, String],
      default: 200,
    },
    color: {
      type: [String, Object, Array],
      default: primary,
    },
    layerColor: {
      type: String,
      default: white,
    },
    text: [String, Number],
    speed: {
      type: Number,
      default: 50,
    },
    fill: String,
    clockwise: {
      type: Boolean,
      default: true,
    },
    strokeWidth: {
      type: [Number, String],
      default: 8,
    },
    lineCap: {
      type: String,
      default: 'round',
    },
  },
  computed: {
    pxSize() {
      return this.$toPx(this.size);
    },
    stroke_width() {
      return this.$toPx(this.strokeWidth);
    },
    canvas_style() {
      return this.$mergeStyle({
        width: this.pxSize + 'px',
        height: this.pxSize + 'px',
      });
    },
    styleState() {
      return [
        this.percent,
        this.size,
        this.color,
        this.lineCap,
        this.fill,
        this.fillStyle,
        this.layerColor,
        this.strokeWidth,
      ];
    },
  },
  watch: {
    percent() {
      this.updatePercent();
    },
    styleState() {
      this.updateStyle();
    },
  },
  created() {
    this.currentPercent = this.percent;
    this.hoverColor = this.color;
  },
  mounted() {
    this.updateStyle();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    updateStyle() {
      this.$nextTick(() => {
        this.setHoverColor();
        this.drawCircle(this.currentPercent);
      });
    },
    updatePercent() {
      const { percent, speed } = this;
      if (speed <= 0 || speed > 1000) {
        this.drawCircle(percent);
        return;
      }
      this.clearTimer();
      this.timer = createTimer((next, stop) => {
        if (this.currentPercent !== percent) {
          if (Math.abs(this.currentPercent - percent) < STEP) {
            this.currentPercent = percent;
          } else if (this.currentPercent < percent) {
            this.currentPercent += STEP;
          } else {
            this.currentPercent -= STEP;
          }
          this.drawCircle(this.currentPercent);
          next();
        } else {
          stop();
        }
      }, 1000 / speed, true);
    },
    getContext() {
      if (!this.ctx) {
        this.ctx = uni.createCanvasContext(this.$sUid, this);
      }
      return this.ctx;
    },
    setHoverColor() {
      const { color, pxSize, percent } = this;
      if (this.$getType(color) === 'object') {
        const context = this.getContext();
        const linearGradient = context.createLinearGradient(pxSize, 0, 0, 0);
        Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map(key =>
          linearGradient.addColorStop(parseFloat(key) / 100, color[key]),
        );
        this.hoverColor = linearGradient;
      } else {
        this.hoverColor = getPercentRangeValue(color, percent, 'percent', 'color');
      }
    },
    drawCircle(currentPercent) {
      const { pxSize } = this;
      const context = this.getContext();
      context.clearRect(0, 0, pxSize, pxSize);
      this.renderLayerCircle(context);
      const percent = Math.min(Math.max(currentPercent, 0), 100);
      if (percent !== 0) {
        this.renderHoverCircle(context, percent);
      }
      context.draw();
    },
    presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
      const { stroke_width, lineCap, clockwise, pxSize } = this;
      const position = pxSize / 2;
      const radius = position - stroke_width / 2;

      context.strokeStyle = strokeStyle;
      context.lineWidth = stroke_width;
      context.lineCap = lineCap;

      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();

      if (fill) {
        context.fillStyle = fill;
        context.fill();
      }
    },
    renderLayerCircle(context) {
      this.presetCanvas(context, this.layerColor, 0, PERIMETER, this.fill);
    },
    renderHoverCircle(context, percent) {
      const { clockwise } = this;
      const progress = PERIMETER * (percent / 100);
      const endAngle = clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress);
      this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
    },
    clearTimer() {
      if (this.timer) {
        this.timer.stop();
        this.timer = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
