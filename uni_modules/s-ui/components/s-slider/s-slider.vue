<template>
  <view :id="$sUid" class="s-slider" :class="c_class" :style="c_style" @click="onClick">
    <view class="s-slider__bar" :style="bar_style">
      <template v-if="isRange">
        <view
          class="s-slider__button-wrap-start"
          @touchstart="onStartButtonTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
          @click.stop
        >
          <slot name="startButton">
            <view class="s-slider__button"></view>
          </slot>
        </view>
        <view
          class="s-slider__button-wrap-end"
          @touchstart="onEndButtonTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
          @click.stop
        >
          <slot name="endButton">
            <view class="s-slider__button"></view>
          </slot>
        </view>
      </template>
      <view
        v-else
        class="s-slider__button-wrap"
        @touchstart="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @click.stop
      >
        <slot name="button">
          <view class="s-slider__button" :style="button_style"></view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import useTouch from '../../common/useTouch';

/**
 * s-slider 滑块
 * @description 该组件一般用于表单中，手动选择一个区间范围的场景。
 * @property {Number|Array<Number>} value 双向绑定滑块选择值，为数组时为双滑块
 * @property {Boolean} disabled 是否禁用滑块
 * @property {Boolean} readonly 是否只读滑块
 * @property {Boolean} vertical 是否垂直展示
 * @property {Number|String} barHeight 进度条高度
 * @property {String} inactiveColor 进度条非激活态颜色
 * @property {String} activeColor 进度条激活态颜色
 * @property {Number|String} min 最小值
 * @property {Number|String} max 最大值
 * @property {Number|String} step 步长，默认 1
 * @property {Number|String} buttonSize 滑块按钮大小
 * @property {String|Object} buttonStyle 滑块按钮样式
 * @event {Function} change (value) 改变后的值
 * @event {Function} start (event) 开始触发滑块移动
 * @event {Function} move (event) 正在滑动中
 * @event {Function} end (event)  滑动结束
 * @example <s-slider :v-model="50">
 */
export default {
  name: 'SSlider',
  mixins: [componentMixin],
  props: {
    value: {
      type: [Number, Array],
      default: 0,
    },
    disabled: Boolean,
    readonly: Boolean,
    vertical: Boolean,
    barHeight: [Number, String],
    inactiveColor: String,
    activeColor: String,
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    buttonSize: [Number, String],
    buttonStyle: [String, Object],
  },
  data: () => ({
    buttonIndex: 0,
    startValue: 0,
    currentValue: 0,
    dragStatus: '',
  }),
  computed: {
    c_class() {
      return this.$mergeClass({
        's-slider--vertical': this.vertical,
        's-slider--readonly': this.readonly,
        's-slider--disabled': this.disabled,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        [this.vertical ? 'width' : 'height']: this.$addUnit(this.barHeight),
        background: this.inactiveColor,
      }, this.custom_style);
    },
    scope() {
      return Number(this.max) - Number(this.min);
    },
    isRange() {
      return Array.isArray(this.value);
    },
    bar_style() {
      const { value, min, scope } = this;
      let progress = 0;
      let offset = 0;
      if (this.isRange) {
        progress = ((value[1] - value[0]) * 100) / scope;
        offset = ((value[0] - Number(min)) * 100) / scope;
      } else {
        progress = ((value - Number(min)) * 100) / scope;
      }
      return this.$mergeStyle({
        [this.vertical ? 'height' : 'width']: `${progress}%`,
        left: this.vertical ? '' : `${offset}%`,
        bottom: this.vertical ? `${offset}%` : '',
        background: this.activeColor,
        transition: this.dragStatus ? 'none' : '',
      });
    },
    button_style() {
      return this.$mergeStyle({
        width: this.$addUnit(this.buttonSize),
        height: this.$addUnit(this.buttonSize),
      }, this.buttonStyle);
    },
  },
  created() {
    this.touch = useTouch();
    this.updateValue(this.value);
  },
  methods: {
    onStartButtonTouchStart(event) {
      this.buttonIndex = 0;
      this.onTouchStart(event);
    },
    onEndButtonTouchStart(event) {
      this.buttonIndex = 1;
      this.onTouchStart(event);
    },
    onTouchStart(event) {
      if (this.disabled || this.readonly) return;
      this.touch.start(event);
      this.currentValue = this.value;
      if (this.isRange) {
        this.startValue = this.currentValue.map(this.format);
      } else {
        this.startValue = this.format(this.currentValue);
      }
      this.dragStatus = 'start';
    },
    onTouchMove(event) {
      if (this.disabled || this.readonly) return;
      if (this.dragStatus === 'start') {
        this.$emit('start');
      } else if (this.dragStatus === 'draging') {
        this.$emit('move');
      }
      this.touch.move(event);
      this.dragStatus = 'draging';
      this.$getRect(`#${this.$sUid}`).then(rect => {
        const delta = this.vertical ? -this.touch.deltaY : this.touch.deltaX;
        const total = this.vertical ? rect.height : rect.width;
        const diff = (delta / total) * this.scope;
        if (this.isRange) {
          this.currentValue[this.buttonIndex] = this.startValue[this.buttonIndex] + diff;
        } else {
          this.currentValue = this.startValue + diff;
        }
        this.updateValue(this.currentValue);
      });
    },
    onTouchEnd() {
      if (this.disabled || this.readonly) return;
      if (this.dragStatus === 'draging') {
        this.updateValue(this.currentValue, true);
        this.$emit('end');
      }
      this.dragStatus = '';
    },
    onClick(event) {
      if (this.disabled || this.readonly) return;
      const { min, vertical, scope } = this;
      this.$getRect(`#${this.$sUid}`).then(rect => {
        const { clientX, clientY } = this.touch.getTouch(event);
        const delta = vertical ? rect.top + rect.height - clientY : clientX - rect.left;
        const total = vertical ? rect.height : rect.width;
        const value = Number(min) + (delta / total) * scope;
        if (this.isRange) {
          const [left, right] = this.value;
          const middle = (left + right) / 2;
          if (value <= middle) {
            this.updateValue([value, right], true);
          } else {
            this.updateValue([left, value], true);
          }
        } else {
          this.updateValue(value, true);
        }
      });
    },
    updateValue(value, end) {
      if (this.isRange) {
        value = this.overlap(value).map(this.format);
      } else {
        value = this.format(value);
      }
      if (!this.isSameValue(value, this.value)) {
        this.$emit('input', value);
      }
      if (end && !this.isSameValue(value, this.startValue)) {
        this.$emit('change', value);
      }
    },
    isSameValue(newValue, oldValue) {
      return JSON.stringify(newValue) === JSON.stringify(oldValue);
    },
    format(value) {
      const { min, max, step } = this;
      value = Math.max(+min, Math.min(value, +max));
      return Math.round(value / +step) * +step;
    },
    overlap(value) {
      if (value[0] > value[1]) {
        return value.slice(0).reverse();
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
