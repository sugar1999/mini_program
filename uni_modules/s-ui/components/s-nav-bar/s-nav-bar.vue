<template>
  <view :class="custom_class">
    <view v-if="fixed && !immersive" class="s-nav-bar__placeholder" :style="{ height: nav_height + 'px' }"></view>
    <view class="s-nav-bar" :class="nav_class" :style="nav_style">
      <view class="s-nav-bar__background" :style="background_style"></view>
      <view v-if="statusBar" class="s-nav-bar__status-bar" :style="status_bar_style"></view>
      <view class="s-nav-bar__container" :style="container_style">
        <slot>
          <view class="s-nav-bar__content">
            <view class="s-nav-bar__left">
              <slot name="left">
                <view v-if="back" class="s-nav-bar__back" @click="handleBack">
                  <slot name="back">
                    <s-button
                      type="text"
                      size="custom"
                      :icon="backIcon"
                      :icon-size="$addUnit(backIconSize, 'px')"
                      custom-class="s-nav-bar__back-btn"
                      :custom-style="backStyle"
                    >
                      <view v-if="$isDef(backText)">{{ backText }}</view>
                    </s-button>
                  </slot>
                </view>
              </slot>
            </view>
            <view class="s-nav-bar__center">
              <slot name="center">
                <view class="s-nav-bar__title" :class="title_class" :style="title_style">
                  <slot name="title">
                    <text v-if="$isDef(title)" class="s-nav-bar__title-text s-ellipsis">{{ title }}</text>
                  </slot>
                </view>
              </slot>
            </view>
            <view class="s-nav-bar__right">
              <slot name="right" />
            </view>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import sUi from '../../index';

/**
 * s-nav-bar 导航栏
 * @description 自定义导航栏
 * @property {Number|String} height 导航栏高度(不包括状态栏高度在内，内部自动加上)，注意这里的单位是px
 * @property {String} background 导航栏背景设置(APP和小程序上包括状态栏的颜色)
 * @property {String|Object} backgroundStyle 背景样式
 * @property {String} color 导航栏文本颜色
 * @property {Boolean} border 底部是否显示下边框，默认不显示
 * @property {String} borderColor 边框颜色
 * @property {Boolean} fixed 导航栏是否固定在顶部，默认固定
 * @property {Number|String} immersive 沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效
 * @property {Number|String} zIndex 固定在顶部时的z-index值
 * @property {String} title 导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String} titleAlign = [left|center] 标题位置
 * @property {Number|String} titleWidth 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx
 * @property {String|Object} titleStyle 标题样式
 * @property {Boolean} back 是否显示导航栏左边返回功能
 * @property {String} backIcon 左边返回图标的名称，只支持s-ui自带的图标
 * @property {String} backText 左边返回按钮文字
 * @property {Number|String} backIconSize 左边返回图标的大小，单位px
 * @property {String|Object} backStyle 返回样式
 * @property {String} homePath 当没有页面栈记录时，默认返回首页路径
 * @property {Function} customBack 自定义返回逻辑方法
 * @property {Boolean} statusBar 是否预留状态栏高度
 * @property {String|Object} statusBarStyle 状态栏样式
 * @property {Boolean} rightMenuButton 是否预留右边胶囊菜单宽度
 * @property {String} transparent = [none|fade-in|fade-out|always] 导航栏整体（前景、背景）透明设置。支持 always 一直透明 / fade-in 从0-1 / fade-out 从1-0 / none 不透明
 * @property {Number|String} maxOpacity 导航透明度最大数值
 * @property {Number} scrollTop 页面滚动scrollTop，用来计算透明度
 * @property {Number|String} startTop 开始计算透明度的scrollTop
 * @property {Number|String} scrollRatio 滚动计算透明度阈值
 * @event {Function} opacity(opacity) 透明度改变时触发
 * @example <s-nav-bar title="标题" />
 */
export default {
  name: 'SNavBar',
  mixins: [componentMixin],
  props: {
    height: {
      type: [Number, String],
      default: 44,
    },
    background: String,
    backgroundStyle: [String, Object],
    color: String,
    padding: [Number, String],
    border: Boolean,
    borderColor: String,
    zIndex: [Number, String],
    fixed: {
      type: Boolean,
      default: true,
    },
    immersive: Boolean,
    title: String,
    titleAlign: {
      type: String,
      default: 'center',
    },
    titleWidth: {
      type: [Number, String],
      default: 420,
    },
    titleStyle: [String, Object],
    back: Boolean,
    backIcon: {
      type: String,
      default: 'arrow-left',
    },
    backText: String,
    backIconSize: [Number, String],
    backStyle: [String, Object],
    statusBar: {
      type: Boolean,
      default: true,
    },
    statusBarStyle: [String, Object],
    rightMenuButton: {
      type: Boolean,
      default: true,
    },
    transparent: {
      type: String,
      default: 'none',
    },
    minOpacity: {
      type: [Number, String],
      default: 0,
    },
    maxOpacity: {
      type: [Number, String],
      default: 1,
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
    startTop: {
      type: [Number, String],
      default: 0,
    },
    scrollRatio: {
      type: [Number, String],
      default: 0.3,
    },
    homePath: String,
    customBack: Function,
  },
  data: () => ({
    windowWidth: 0,
    statusBarHeight: 0,
    rightMenuButtonWidth: 0,
    opacity: 1,
  }),
  computed: {
    nav_class() {
      return this.$mergeClass({
        's-nav-bar--fixed': this.fixed,
        's-nav-bar--immersive': this.immersive,
        's-hairline--bottom': this.border,
      });
    },
    nav_style() {
      return this.$mergeStyle({
        color: this.color,
        borderColor: this.borderColor,
        zIndex: this.fixed ? this.zIndex : '',
      }, this.custom_style);
    },
    c_height() {
      return parseInt(this.height);
    },
    nav_height() {
      return this.c_height + this.statusBarHeight;
    },
    status_bar_style() {
      return this.$mergeStyle({
        height: this.statusBarHeight + 'px',
      }, this.statusBarStyle);
    },
    background_style() {
      return this.$mergeStyle({
        background: this.background,
      }, this.backgroundStyle);
    },
    container_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.c_height, 'px'),
        padding: this.$addUnit(this.padding, 'px'),
        marginRight: this.$addUnit(this.rightMenuButtonWidth, 'px'),
      });
    },
    title_class() {
      return this.$mergeClass({
        [`s-nav-bar__title--${this.titleAlign}`]: this.titleAlign,
      });
    },
    title_style() {
      const titleWidth = this.$toPx(this.titleWidth);
      const style = {};
      if (this.titleAlign === 'center') {
        const space = parseInt((this.windowWidth - titleWidth) / 2);
        style.left = space + 'px';
        style.right = (space - this.rightMenuButtonWidth) + 'px';
      } else {
        style.width = titleWidth + 'px';
      }
      return this.$mergeStyle(style, this.titleStyle);
    },
    opacity_state() {
      return [
        this.scrollTop,
        this.transparent,
        this.minOpacity,
        this.maxOpacity,
      ];
    },
  },
  watch: {
    opacity_state() {
      this.updateOpacity();
    },
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    this.windowWidth = systemInfo.windowWidth;
    if (this.statusBar) {
      this.statusBarHeight = systemInfo.statusBarHeight;
    }
    // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
    if (this.rightMenuButton) {
      this.rightMenuButtonWidth = systemInfo.windowWidth - uni.getMenuButtonBoundingClientRect().left;
    }
    // #endif
    this.updateOpacity();
  },
  methods: {
    handleBack() {
      const customBack = this.$getPropsFn('customBack');
      if (customBack) {
        customBack();
      } else {
        if (getCurrentPages().length > 1) {
          uni.navigateBack();
        } else {
          uni.reLaunch({ url: this.homePath || sUi.config.homePath });
        }
      }
    },
    updateOpacity() {
      switch (this.transparent) {
        case 'fade-in':
        case 'fade-out':
          this.onScroll();
          break;
        case 'always':
          this.setOpacity(0);
          break;
        default:
          this.setOpacity(1);
          break;
      }
    },
    onScroll() {
      const scrollTop = Math.max(0, this.scrollTop - this.$toPx(this.startTop));
      let opacity = scrollTop / (this.windowWidth * Number(this.scrollRatio));
      opacity = this.transparent === 'fade-out' ? (1 - opacity) : opacity;
      if ((this.opacity >= this.maxOpacity && opacity >= this.maxOpacity) || (this.opacity <= this.minOpacity && opacity <= this.minOpacity)) return;
      this.setOpacity(opacity);
    },
    setOpacity(opacity) {
      this.opacity = Math.min(Math.max(opacity, this.minOpacity), this.maxOpacity);
      this.$emit('opacity', this.opacity);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
