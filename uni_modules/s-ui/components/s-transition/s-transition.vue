<template>
  <view class="s-transition" :class="c_class" :style="c_style">
    <slot />
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-transition 动画
 * @description 用来控制一个元素显示隐藏时的动画
 * @property {Boolean} value v-model双向绑定显示隐藏
 * @property {String|Object|Boolean} name = [false|fade-top|slide-top|{enter:'fade',leave:'fade-top'}] 过渡效果 ，为s-ui styles下animate.scss中定义的效果
 * @property {Number|String|Object} duration 动画执行时间
 * @property {String} enterClass 进入过渡时自定义class
 * @property {String} leaveClass 离开过渡时自定义class
 * @event {Function} before-enter 进入过渡的开始前触发
 * @event {Function} enter 进入过渡时触发
 * @event {Function} before-leave 离开过渡的开始前触发
 * @event {Function} leave 离开过渡时触发
 * @example <s-transition v-model="visible"></s-transition>
 */
export default {
  name: 'STransition',
  mixins: [componentMixin],
  props: {
    value: Boolean,
    name: {
      type: [String, Object, Boolean],
      default: 'fade',
    },
    duration: {
      type: [Number, String, Object],
      default: 300,
    },
    namePrefix: {
      type: String,
      default: 's-animate',
    },
    enterClass: String,
    leaveClass: String,
  },
  data: () => ({
    animateStatus: '',
    isVisible: false,
  }),
  computed: {
    c_class() {
      const { animateStatus, namePrefix, custom_class } = this;
      const animateName = this.animateStatus ? this.animateMap[this.animateStatus].name : '';
      const animateClass = animateName ? `${namePrefix ? namePrefix + '-' : ''}${animateName}-${this.animateStatus}` : '';
      return this.$mergeClass(
        {
          's-transition--enter': animateStatus === 'enter',
          's-transition--leave': animateStatus === 'leave',
        },
        animateClass,
        animateStatus === 'enter' ? this.enterClass : '',
        animateStatus === 'leave' ? this.leaveClass : '',
        custom_class,
      );
    },
    c_style() {
      return this.$mergeStyle({
        animationDuration: this.animateStatus ? this.animateMap[this.animateStatus].duration + 'ms' : '',
        display: this.isVisible ? '' : 'none',
      }, this.custom_style);
    },
    animateMap() {
      let animate = this.name;
      let duration = this.duration;

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
    this.visibleStatus = false;
    this.timer = null;
  },
  mounted() {
    this.updateVisible();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
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
        this[this.value ? 'show' : 'hide']();
      }
    },
    show() {
      if (!this.visibleStatus) {
        this.clearTimer();
        this.visibleStatus = true;
        this.animateStatus = 'enter';
        this.isVisible = true;
        this.$emit('input', true);
        this.$emit('before-enter');
        const duration = this.animateMap.enter.duration;
        this.setTimer(() => {
          this.animateStatus = '';
          this.$emit('enter');
        }, duration > 0 ? duration + 50 : 0);
      }
    },
    hide() {
      if (this.visibleStatus) {
        this.clearTimer();
        this.visibleStatus = false;
        this.animateStatus = 'leave';
        this.$emit('input', false);
        this.$emit('before-leave');
        const duration = this.animateMap.leave.duration;
        this.setTimer(() => {
          this.isVisible = false;
          this.zIndexValue = 0;
          this.animateStatus = '';
          this.$emit('leave');
        }, duration);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
