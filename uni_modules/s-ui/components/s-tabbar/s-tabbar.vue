<template>
  <view>
    <view class="s-tabbar" :class="c_class" :style="c_style">
      <view class="s-tabbar-list" :style="height_style">
        <view
          v-for="(item, index) of list"
          :key="index"
          class="s-tabbar-item"
          :class="itemClassList[index]"
          :style="itemStyleList[index]"
          @click="onItemClick(item, index)"
        >
          <slot :scopeParams="scopeParams" :item="item" :index="index" :active="isActive(index)">
            <template v-if="item.midButton && minButtonCircle">
              <view
                class="s-tabbar-item__mid-button-circle"
                :class="c_midButtonCircleClass"
                :style="c_midButtonCircleStyle"
              ></view>
              <view class="s-tabbar-item__mid-button-circle-mask" :style="midButtonCircleMaskStyle"></view>
            </template>
            <view class="s-tabbar-item__icon" :style="iconStyleList[index]">
              <slot :scopeParams="scopeParams" name="icon" :item="item" :index="index" :active="isActive(index)">
                <s-icon
                  :icon-prefix="iconPrefix"
                  :name="isActive(index) && item.activeIcon ? item.activeIcon : item.icon"
                />
              </slot>
              <s-badge
                v-if="hasBadge(item)"
                :type="item.badge.type"
                :value="item.badge.value"
                :dot="item.badge.dot"
                :background="item.badge.background"
                :color="item.badge.color"
                :show-zero="item.badge.showZero"
                :offset="item.badge.offset"
                :offset-center="!item.badge.offset"
                :max="item.badge.max"
                :scale="item.badge.scale"
              />
            </view>
            <text v-if="!item.hideText && $isDef(item.text)" class="s-tabbar-item__text">
              {{ item.text }}
            </text>
          </slot>
        </view>
      </view>
      <view v-if="safeAreaInsetBottom" style="height: var(--safe-area-inset-bottom)"></view>
    </view>
    <template v-if="fixed">
      <view class="s-tabbar-placeholder" :style="height_style"></view>
      <view v-if="safeAreaInsetBottom" style="height: var(--safe-area-inset-bottom)"></view>
    </template>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-tabbar 标签栏
 * @description 底部导航栏，用于在不同页面之间进行切换
 * @property {Array} list 各项的配置参数，[{
 *  text: '',
    icon: '',
    activeIcon: '',
    color: '',
    activeColor: '',
    iconStyle: '',
    midButton：false,
    alignCenter: false,
    hideText: false,
    customClass: '',
    customStyle: '',
    badge: {
      dot: true,
      value: 9,
      type: 'danger',
      showZero: false,
      max: 0,
    },
 * }]
 * @property {Number|String} value 双向绑定的激活项的值
 * @property {Number|String} height 高度
 * @property {String} background 背景色
 * @property {Number|String} padding item内边距
 * @property {String} valueKey 标签匹配属性字段，设值后则开启value和属性值匹配
 * @property {String} iconPrefix 图标类名前缀，同 Icon 组件的 class-prefix 属性
 * @property {String} inactiveColor 文字和字体图标未激活时的颜色
 * @property {String} activeColor 文字和字体图标激活时的颜色
 * @property {Number|String} iconSize 图标大小
 * @property {Number|String} textSize 文本大小
 * @property {Number|String} midButtonIconSize 凸起项图标大小
 * @property {Number|String} midButtonIconTop 凸起项图标居上偏移距离
 * @property {String|Object} midButtonIconStyle 凸起项图标样式
 * @property {Boolean} minButtonCircle 是否显示凸起项图标外层圆圈
 * @property {Number|String} midButtonCircleSize 凸起项图标外层圆圈大小
 * @property {Number|String} midButtonCircleTop 凸起项图标外层圆圈居上偏移距离
 * @property {Boolean} midButtonCircleStyle 凸起项图标外层圆圈样式
 * @property {Boolean} fixed 是否固定到底部
 * @property {Number|String} zIndex z-index值
 * @property {Boolean} safeAreaInsetBottom 是否开启底部安全区域适配
 * @property {Boolean} border 是否显示顶部边框
 * @property {String} borderColor 顶部边框颜色和凸起按钮边框颜色
 * @property {Boolean} shadow 是否显示阴影
 * @property {Boolean} hidePageTabbar 是否隐藏原生tabbar
 * @event {Function} click (index) 点击事件
 * @event {Function} change (index) 选择项改变事件
 * @example <s-tabbar :list="list" :v-model="value" />
 */
export default {
  name: 'STabbar',
  mixins: [componentMixin],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    height: [Number, String],
    background: String,
    padding: [Number, String],
    valueKey: String,
    iconPrefix: String,
    inactiveColor: String,
    activeColor: String,
    iconSize: [Number, String],
    textSize: [Number, String],
    midButtonIconSize: [Number, String],
    midButtonIconTop: [Number, String],
    midButtonIconStyle: [String, Object],
    minButtonCircle: {
      type: Boolean,
      default: true,
    },
    midButtonCircleSize: [Number, String],
    midButtonCircleTop: [Number, String],
    midButtonCircleStyle: [String, Object],
    fixed: {
      type: Boolean,
      default: true,
    },
    zIndex: [Number, String],
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    border: Boolean,
    borderColor: String,
    shadow: Boolean,
    hidePageTabbar: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-tabbar--fixed': this.fixed,
        's-tabbar--shadow': this.shadow,
        's-hairline--top': this.border,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        background: this.background,
        borderColor: this.borderColor,
        zIndex: this.zIndex,
      }, this.custom_style);
    },
    height_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
      });
    },
    c_midButtonCircleClass() {
      return this.$mergeClass({
        's-hairline--surround': this.border,
        's-tabbar-item__mid-button-circle--shadow': this.shadow,
      });
    },
    c_midButtonCircleStyle() {
      return this.$mergeStyle({
        width: this.$addUnit(this.midButtonCircleSize),
        height: this.$addUnit(this.midButtonCircleSize),
        background: this.background,
        borderColor: this.borderColor,
        top: this.$addUnit(this.midButtonCircleTop),
      }, this.midButtonCircleStyle);
    },
    midButtonCircleMaskStyle() {
      return this.$mergeStyle({
        background: this.background,
      });
    },
    current() {
      if (this.valueKey) return this.list.findIndex(item => item[this.valueKey] === this.value);
      const index = parseInt(this.value);
      return index > -1 ? index : -1;
    },
    itemClassList() {
      return this.list.map((item, index) => this.$mergeClass({
        's-tabbar-item--mid-button': item.midButton,
        's-tabbar-item--active': this.isActive(index),
        's-tabbar-item--align-center': item.alignCenter || item.hideText,
      }, item.customClass));
    },
    itemStyleList() {
      const { list, textSize, padding, inactiveColor, activeColor } = this;
      return list.map((item, index) => {
        const isActive = this.isActive(index);
        return this.$mergeStyle({
          fontSize: this.$addUnit(textSize),
          color: isActive ? (item.activeColor || activeColor) : inactiveColor,
          padding: this.$addUnit(padding),
        }, item.customStyle);
      });
    },
    iconStyleList() {
      const { list, iconSize, midButtonIconSize, midButtonIconTop, midButtonIconStyle } = this;
      return list.map(item => {
        const style = {
          fontSize: this.$addUnit(iconSize),
        };
        if (item.midButton) {
          style.fontSize = midButtonIconSize;
          style.top = this.$addUnit(midButtonIconTop);
        }
        return this.$mergeStyle(
          style,
          item.midButton ? midButtonIconStyle : '',
          item.iconStyle,
        );
      });
    },
  },
  created() {
    if (this.hidePageTabbar) {
      uni.hideTabBar();
    }
  },
  methods: {
    isActive(index) {
      return this.current === index;
    },
    hasBadge(item) {
      return this.$getType(item.badge) === 'object';
    },
    onItemClick(item, index) {
      this.$emit('click', index);
      if (!this.isActive(index)) {
        this.$emit('input', this.valueKey ? item[this.valueKey] : index);
        this.$emit('change', index);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
