<template>
  <view class="s-count-down" :class="custom_class" :style="custom_style">
    <slot :scopeParams="scopeParams" :data="currentData">{{ formatText }}</slot>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import countDown from '../../utils/countDown';
import parseMilliseconds from '../../utils/parseMilliseconds';

/**
 * s-count-down 倒计时
 * @description 用于实时展示倒计时数值，支持毫秒精度
 * @property {Number|String} time 倒计时时长，单位毫秒
 * @property {String} format 时间格式 HH:mm:ss
 * @property {Boolean} autoStart 是否自动开始倒计时
 * @property {Boolean} millisecond 是否开启毫秒级渲染
 * @property {String|Array} parseAttrs data格式化属性 'd,h,m,s,S'
 * @event {Function} change (data) 倒计时改变触发
 * @event {Function} finish () 倒计时结束触发
 * @example <s-count-down :time="time" />
 */
export default {
  name: 'SCountDown',
  mixins: [componentMixin],
  props: {
    time: {
      type: [Number, String],
      default: 0,
    },
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    autoStart: {
      type: Boolean,
      default: true,
    },
    millisecond: Boolean,
    parseAttrs: {
      type: [String, Array],
      default: 'd,h,m,s,S',
    },
  },
  data: () => ({
    currentTime: 0,
  }),
  computed: {
    currentData() {
      const data = parseMilliseconds(this.currentTime, this.parseAttrs);
      data.total = this.currentTime;
      return data;
    },
    formatText() {
      const { w2, d2, h2, m2, s2 } = this.currentData;
      return this.format
        .replace('WW', w2)
        .replace('DD', d2)
        .replace('HH', h2)
        .replace('mm', m2)
        .replace('ss', s2)
        .replace(/(S+)/, (_, $1) => this.currentData[`S${$1.length}`]);
    },
  },
  watch: {
    time() {
      this.reset();
    },
  },
  created() {
    this.countDown = countDown({
      time: +this.time,
      millisecond: this.millisecond,
      onChange: time => {
        this.currentTime = time;
        this.$emit('change', this.currentData);
      },
      onFinish: () => {
        this.$emit('finish');
      },
    });
    this.reset();
  },
  beforeDestroy() {
    this.stop();
  },
  methods: {
    reset() {
      this.countDown.reset(+this.time);
      if (this.autoStart) this.start();
    },
    start() {
      this.countDown.start();
    },
    stop() {
      this.countDown.stop();
    },
    finish() {
      this.countDown.finish();
    },
  },
};
</script>
