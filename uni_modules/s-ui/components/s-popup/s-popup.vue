<template>
  <view class="s-popup" :class="c_class" :style="c_style">
    <view v-if="mask" class="s-popup__mask" :style="mask_Style" @touchmove.prevent @click="onMaskClick"></view>
    <view class="s-popup__wrap" :class="wrap_class" :style="wrap_Style" @touchmove.prevent>
      <view v-if="position === 'top' && safeAreaInsetTop" style="height: var(--safe-area-inset-top)"></view>
      <slot />
      <view v-if="closeable" class="s-popup__close" :style="close_style" @click="onCloseClick">
        <slot name="close">
          <s-icon :name="closeIcon" :size="closeSize" :color="closeColor" />
        </slot>
      </view>
      <view v-if="position === 'bottom' && safeAreaInsetBottom" style="height: var(--safe-area-inset-bottom)"></view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

// 记录弹框的zIndex
const zIndexMap = new Map();
const getMaxZindex = () => {
  return Math.max(200, ...zIndexMap.values());
};

// position 默认效果
const autoAnimateMap = {
  center: 'fade',
  left: 'slide-left',
  right: 'slide-right',
  top: 'slide-top',
  bottom: 'slide-bottom',
};

/**
 * s-popup 弹框
 * @description 基础弹框组件
 * @property {String} position = [center | left | right | top | bottom ] 显示位置
 * @property {Boolean} value v-model双向绑定显示关闭
 * @property {String} background 背景色
 * @property {Number|String} width wrap容器宽度
 * @property {Number|String} height wrap容器高度
 * @property {Number|String} radius wrap容器圆角
 * @property {Boolean} round 是否显示圆角
 * @property {String|Object} wrapStyle wrap容器style样式
 * @property {Number|String} zIndex z-index,如没指定，则在显示时使用比较自增
 * @property {String} animatePrefix 内置动画class前缀，默认为 s-animate
 * @property {String|Boolean|Object} animate = [false|auto|fade|fade-top|slide-top|{enter:'fade',leave:'fade-top'}] 过渡效果，默认 auto 为s-ui styles下animate.scss中定义的效果
 * @property {Number|String|Object} animateDuration 显示关闭过渡效果时间 ms
 * @property {Boolean} mask 是否显示遮罩
 * @property {Number|String} maskOpacity 遮罩透明度 0.7
 * @property {String|Object} maskStyle 遮罩自定样式
 * @property {Boolean} maskClose 点击遮罩是否关闭
 * @property {Number|String} duration 自动关闭时间，为 0不会自动关闭
 * @property {Boolean} closeable 是否显示关闭图标
 * @property {Boolean} closeIcon 关闭图标名称或图片链接
 * @property {String} closeColor 关闭图标颜色
 * @property {String|Object} closeStyle 关闭图标样式
 * @property {Function} beforeOpen 显示时拦截钩子返回Boolean或Promise通过resolve(Boolean)拦截
 * @property {Function} beforeClose 关闭时拦截钩子返回Boolean或Promise通过resolve(Boolean)拦截
 * @property {Boolean} safeAreaInsetTop 是否留出顶部安全距离（状态栏高度），默认false
 * @property {Boolean} safeAreaInsetBottom 是否开启底部安全区域适配，默认false
 * @event {Function} open 打开弹出层时触发
 * @event {Function} opened 打开弹出层且动画结束后触发
 * @event {Function} close 关闭弹出层时触发
 * @event {Function} closed 关闭弹出层且动画结束后触发
 * @event {Function} mask-close 点击遮罩层关闭时触发
 * @event {Function} icon-close 点击关闭图标关闭时触发
 * @example <s-popup v-model="visible"></s-popup>
 */
export default {
  name: 'SPopup',
  mixins: [componentMixin],
  props: {
    position: {
      type: String,
      default: 'center',
    },
    value: Boolean,
    background: String,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    round: Boolean,
    wrapStyle: [String, Object],
    zIndex: [Number, String],
    animatePrefix: {
      type: String,
      default: 's-animate',
    },
    animate: {
      type: [String, Boolean, Object],
      default: 'auto',
    },
    animateDuration: {
      type: [Number, String, Object],
      default: 300,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    maskOpacity: [Number, String],
    maskStyle: [String, Object],
    maskClose: {
      type: Boolean,
      default: true,
    },
    duration: [Number, String],
    closeable: Boolean,
    closeIcon: {
      type: String,
      default: 'cross',
    },
    closeSize: [Number, String],
    closeColor: String,
    closeStyle: [String, Object],
    beforeOpen: Function,
    beforeClose: Function,
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean,
  },
  data() {
    return {
      animateStatus: '',
      isVisible: false,
      zIndexValue: 1,
    };
  },
  computed: {
    c_class() {
      const { position, round, animateStatus, custom_class } = this;
      return this.$mergeClass({
        [`s-popup--${position}`]: position && position !== 'custom',
        's-popup--round': round,
        's-popup--enter': animateStatus === 'enter',
        's-popup--leave': animateStatus === 'leave',
      }, custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        animationDuration: this.animateStatus ? this.animateMap[this.animateStatus].duration + 'ms' : '',
        display: this.isVisible ? '' : 'none',
        zIndex: this.zIndexValue > 0 ? this.zIndexValue : '',
      }, this.custom_style);
    },
    wrap_class() {
      const animateName = this.animateStatus ? this.animateMap[this.animateStatus].name : '';
      return animateName ? `${this.animatePrefix ? this.animatePrefix + '-' : ''}${animateName}-${this.animateStatus}` : '';
    },
    wrap_Style() {
      return this.$mergeStyle({
        width: this.$addUnit(this.width),
        height: this.$addUnit(this.height),
        background: this.background,
        borderRadius: this.$addUnit(this.radius),
      }, this.wrapStyle);
    },
    mask_Style() {
      return this.$mergeStyle({
        backgroundColor: this.$isDef(this.maskOpacity) ? 'rgba(0, 0, 0, ' + this.maskOpacity + ')' : '',
      }, this.maskStyle);
    },
    close_style() {
      return this.$mergeStyle(this.closeStyle);
    },
    animateMap() {
      let animate = this.animate;
      let duration = this.animateDuration;

      if (animate === 'auto') {
        animate = autoAnimateMap[this.position];
      }

      if (this.$getType(animate) !== 'object') {
        animate = { enter: animate, leave: animate };
      }

      if (this.$getType(duration) !== 'object') {
        duration = { enter: duration, leave: duration };
      }

      return {
        enter: {
          name: animate.enter,
          duration: parseInt(animate.enter ? duration.enter : 0) || 0,
        },
        leave: {
          name: animate.leave,
          duration: parseInt(animate.leave ? duration.leave : 0) || 0,
        },
      };
    },
  },
  watch: {
    value() {
      this.updateVisible();
    },
  },
  created() {
    Object.assign(this, {
      visibleId: 0,
      visibleStatus: false,
      timer: null,
    });
  },
  mounted() {
    this.updateVisible();
  },
  beforeDestroy() {
    zIndexMap.delete(this.$sUid);
    this.clearTimer();
  },
  methods: {
    setTimer(callback, duration) {
      if (duration > 0) {
        this.timer = setTimeout(callback, duration);
      } else {
        callback();
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    updateVisible() {
      if (this._isMounted && this.visibleStatus !== this.value) {
        this[this.value ? 'open' : 'close']();
      }
    },
    async open() {
      if (!this.visibleStatus) {
        const visibleId = ++this.visibleId;
        const beforeOpen = this.$getPropsFn('beforeOpen');
        const flag = beforeOpen ? await beforeOpen() && visibleId === this.visibleId : true;
        if (flag) {
          this.clearTimer();
          let zIndex = this.zIndex;
          if (!(+zIndex > 0)) {
            zIndex = getMaxZindex() + 1;
            zIndexMap.set(this.$sUid, zIndex);
          }
          this.visibleStatus = true;
          this.zIndexValue = zIndex;
          this.isVisible = true;
          this.animateStatus = 'enter';
          this.$emit('input', true);
          this.$emit('open');
          const duration = this.animateMap.enter.duration;
          this.setTimer(() => {
            this.animateStatus = '';
            this.$emit('opened');
            // 自动关闭
            const duration = parseInt(this.duration);
            if (duration > 0) {
              this.timer = setTimeout(() => {
                this.visibleStatus && this.close();
              }, duration);
            }
          }, duration > 0 ? duration + 50 : 0);
        } else {
          this.$emit('input', false);
        }
      }
    },
    async close() {
      if (this.visibleStatus) {
        const visibleId = ++this.visibleId;
        const beforeClose = this.$getPropsFn('beforeClose');
        const flag = beforeClose ? await beforeClose() && visibleId === this.visibleId : true;
        if (flag) {
          this.clearTimer();
          this.visibleStatus = false;
          this.animateStatus = 'leave';
          this.$emit('input', false);
          this.$emit('close');
          const duration = this.animateMap.leave.duration;
          this.setTimer(() => {
            this.isVisible = false;
            this.zIndexValue = 0;
            this.animateStatus = '';
            zIndexMap.delete(this.$sUid);
            this.$emit('closed');
          }, duration);
        } else {
          this.$emit('input', true);
        }
      }
    },
    onMaskClick() {
      if (this.maskClose) {
        this.close();
        this.$emit('mask-close');
      }
    },
    onCloseClick() {
      this.close();
      this.$emit('icon-close');
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
