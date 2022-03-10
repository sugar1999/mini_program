<template>
  <view
    :id="$sUid"
    class="s-rate"
    :class="c_class"
    :style="custom_style"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
  >
    <view
      v-for="(item, index) of list"
      :key="index"
      class="s-rate__item"
      :style="itemStyleList[index]"
      @click="onItemClick($event, index)"
    >
      <s-icon
        :class-prefix="iconPrefix"
        :size="size"
        :name="item.status === 'full' ? fullIcon : voidIcon"
        :color="disabled ? disabledColor : item.status === 'full' ? fullColor : voidColor"
        :img-width="imgWidth"
        :img-height="imgHeight"
        :custom-class="
          $mergeClass('s-rate__icon', {
            's-rate__icon--full': item.status === 'full',
            's-rate__icon--disabled': disabled,
          })
        "
      />
      <s-icon
        v-if="allowHalf && item.value > 0 && item.value < 1"
        :class-prefix="iconPrefix"
        :size="size"
        :name="item.status === 'void' ? voidIcon : fullIcon"
        :color="disabled ? disabledColor : item.status === 'void' ? voidColor : fullColor"
        :img-width="imgWidth"
        :img-height="imgHeight"
        :custom-class="
          $mergeClass('s-rate__icon s-rate__icon--half', {
            's-rate__icon--full': item.status !== 'void',
            's-rate__icon--disabled': disabled,
          })
        "
        :custom-style="{ width: item.value * 100 + '%' }"
      />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import useTouch from '../../common/useTouch';
import getPercentRangeValue from '../../utils/getPercentRangeValue';

/**
 * s-rate 评分
 * @description 用于对事物进行评级操作
 * @property {Number} value 当前分值
 * @property {Number|String} count 图标总数
 * @property {Number|String} size 图标大小
 * @property {String|Array|Object} color 选中时的颜色
 * @property {String} icon 选中时的图标名称或图片链接
 * @property {String} voidColor 未选中时的颜色
 * @property {String} disabledColor 禁用时的颜色
 * @property {String} voidIcon 未选中时的图标名称或图片链接
 * @property {String} iconPrefix 图标类名前缀，等同于 Icon 组件的 class-prefix 属性
 * @property {Boolean} allowHalf 是否允许半选
 * @property {Boolean} readonly 是否为只读状态，只读状态下无法修改评分
 * @property {Boolean} disabled 是否禁用评分
 * @property {Boolean} touchable 是否可以通过滑动手势选择评分
 * @event {Function} change (value) 改变后的值
 * @example <s-rate v-model="value" />
 */
export default {
  name: 'SRate',
  mixins: [componentMixin],
  props: {
    value: {
      type: Number,
      default: 0,
    },
    count: {
      type: [Number, String],
      default: 5,
    },
    size: [Number, String],
    color: [String, Array, Object],
    icon: {
      type: [String, Array, Object],
      default: 'star',
    },
    voidIcon: {
      type: String,
      default: 'star-o',
    },
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    touchable: {
      type: Boolean,
      default: true,
    },
    iconPrefix: String,
    disabledColor: String,
    imgWidth: [Number, String],
    imgHeight: [Number, String],
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-rate--readonly': this.readonly,
        's-rate--disabled': this.disabled,
      }, this.custom_class);
    },
    list() {
      const list = [];
      const len = +this.count;
      for (let i = 0; i < len; i++) {
        list.push(this.getRateStatus(
          this.value,
          i + 1,
          this.allowHalf,
          this.readonly,
        ));
      }
      return list;
    },
    disabledTouch() {
      return this.readonly || this.disabled || !this.touchable;
    },
    fullColor() {
      return getPercentRangeValue(this.color, this.value, 'value', 'color');
    },
    fullIcon() {
      return getPercentRangeValue(this.icon, this.value, 'value', 'icon');
    },
    itemStyleList() {
      const { gutter } = this;
      return this.list.map((item, index) => {
        const style = {};
        if (gutter && index > 0) {
          style.marginLeft = this.$addUnit(gutter);
        }
        return this.$mergeStyle(style);
      });
    },
  },
  created() {
    this.ranges = [];
    this.touch = useTouch();
  },
  mounted() {
    this.updateRanges();
  },
  methods: {
    getRateStatus(value, index, allowHalf, readonly) {
      if (value >= index) {
        return { status: 'full', value: 1 };
      }
      if (value + 0.5 >= index && allowHalf && !readonly) {
        return { status: 'half', value: 0.5 };
      }
      if (value + 1 >= index && allowHalf && readonly) {
        const cardinal = 10 ** 10;
        return {
          status: 'half',
          value: Math.round((value - index + 1) * cardinal) / cardinal,
        };
      }
      return { status: 'void', value: 0 };
    },
    onTouchStart(e) {
      if (this.disabledTouch) return;
      this.updateRanges();
      this.touch.start(e);
    },
    onTouchMove(e) {
      if (this.disabledTouch) return;
      this.touch.move(e);
      if (this.touch.isHorizontal()) {
        const { clientX } = e.touches[0];
        this.select(this.getScoreByPosition(clientX));
      }
    },
    updateRanges() {
      this.$nextTick(() => {
        this.$getRect(`#${this.$sUid} .s-rate__item`, true).then(rects => {
          this.ranges = [];
          rects.forEach((rect, index) => {
            if (this.allowHalf) {
              this.ranges.push(
                { score: index + 0.5, left: rect.left },
                { score: index + 1, left: rect.left + rect.width / 2 },
              );
            } else {
              this.ranges.push({ score: index + 1, left: rect.left });
            }
          });
        });
      });
    },
    getScoreByPosition(x) {
      for (let i = this.ranges.length - 1; i > 0; i--) {
        if (x > this.ranges[i].left) {
          return this.ranges[i].score;
        }
      }
      return this.allowHalf ? 0.5 : 1;
    },
    select(value) {
      if (!this.disabled && !this.readonly && value !== this.value) {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
    onItemClick(e, index) {
      const { clientX } = this.touch.getTouch(e);
      this.updateRanges();
      this.select(this.allowHalf ? this.getScoreByPosition(clientX) : index + 1);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
