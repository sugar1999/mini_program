<template>
  <view
    :id="$sUid"
    class="s-swipe-action"
    :class="custom_class"
    :style="custom_style"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view class="s-swipe-action__wrap" :style="wrap_style">
      <view class="s-swipe-action__left">
        <slot name="left" />
      </view>
      <view class="s-swipe-action__content" @click="onContentClick">
        <slot />
      </view>
      <view class="s-swipe-action__right">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import useTouch from '../../common/useTouch';

const actions = new Set();

/**
 * s-swipe-action 滑动操作
 * @description 可以左右滑动来展示操作按钮的组件
 * @property {String} value = [left|right|'']开启关闭组件，双向v-model绑定
 * @property {Boolean} disabled 是否禁止滑动
 * @property {Boolean} autoClose 其他组件开启的时候，当前组件是否自动关闭
 * @property {Number|String} duration 动画时长
 * @property {Number} threshold 滑动比例值
 * @property {Boolean} contentClose 点击内容区域是否关闭
 * @event {Function} open (direction) 打开时触发
 * @event {Function} close (direction) 关闭时触发
 * @example <s-swipe-action></s-swipe-action>
 */
export default {
  name: 'SSwipeAction',
  mixins: [componentMixin],
  props: {
    value: String,
    disabled: Boolean,
    autoClose: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: [Number, String],
      default: 600,
    },
    threshold: {
      type: Number,
      default: 0.3,
    },
    contentClose: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    offset: 0,
    dragging: false,
  }),
  computed: {
    wrap_style() {
      return this.$mergeStyle({
        transform: `translate3d(${this.offset}px, 0, 0)`,
        transitionDuration: this.dragging ? '0s' : this.duration + 'ms',
      });
    },
  },
  watch: {
    value() {
      this.refresh();
    },
    autoClose(bool) {
      !bool && actions.delete(this);
    },
  },
  created() {
    this.leftWidth = 0;
    this.rightWidth = 0;
    this.startOffset = 0;
    this.status = '';
    this.touch = useTouch();
  },
  mounted() {
    this.preventDefaultTouchmove = false;
    this.refresh();
    /* #ifdef H5 */
    this.$el.addEventListener('touchmove', e => {
      if (this.preventDefaultTouchmove) {
        e.preventDefault();
      }
    });
    /* #endif */
  },
  beforeDestroy() {
    actions.delete(this);
  },
  methods: {
    async refresh() {
      if (!this._isMounted) return;
      await this.resize();
      if (['left', 'right'].includes(this.value)) {
        this.open(this.value);
      } else {
        this.close();
      }
    },
    async resize() {
      const [leftRect, rightRect] = await this.$getRect(`#${this.$sUid} .s-swipe-action__left,#${this.$sUid} .s-swipe-action__right`, true);
      this.leftWidth = leftRect.width;
      this.rightWidth = rightRect.width;
    },
    async onTouchStart(event) {
      this.preventDefaultTouchmove = false;
      if (!this.disabled) {
        this.closeOther();
        await this.resize();
        this.startOffset = this.offset;
        this.touch.start(event);
      }
    },
    onTouchMove(event) {
      if (!this.disabled) {
        this.touch.move(event);
        if (this.touch.isHorizontal()) {
          this.preventDefaultTouchmove = true;
          this.dragging = true;
          this.offset = Math.min(this.leftWidth, Math.max(this.touch.deltaX + this.startOffset, -this.rightWidth));
        } else {
          this.preventDefaultTouchmove = false;
        }
      }
    },
    onTouchEnd() {
      this.preventDefaultTouchmove = false;
      if (this.dragging) {
        this.dragging = false;
        this.toggle(this.offset > 0 ? 'left' : 'right');
      }
    },
    toggle(value) {
      const offset = Math.abs(this.offset);
      const threshold = this.status ? 1 - this.threshold : this.threshold;
      const width = value === 'left' ? this.leftWidth : this.rightWidth;
      if (width && offset > width * threshold) {
        this.open(value);
      } else {
        this.close();
      }
    },
    open(value) {
      this.offset = value === 'left' ? this.leftWidth : -this.rightWidth;
      if (this.status !== value) {
        this.status = value;
        this.autoClose && actions.add(this);
        this.updateValue(value);
        this.$emit('open', value);
      }
    },
    close() {
      this.offset = 0;
      if (this.status) {
        actions.delete(this);
        this.updateValue('');
        this.$emit('close', this.status);
        this.status = '';
      }
    },
    closeOther() {
      for (const vm of actions.values()) {
        if (vm !== this) vm.close();
      }
    },
    updateValue(value) {
      this.value !== value && this.$emit('input', value);
    },
    onContentClick() {
      this.contentClose && this.close();
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
