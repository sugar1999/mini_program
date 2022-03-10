<template>
  <button
    class="s-button"
    :class="c_class"
    :style="c_style"
    :hover-class="show_hover ? hoverClass : 'none'"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :hover-stop-propagation="hoverStopPropagation"
    :data-options="options"
    :lang="lang"
    :open-type="enabled ? openType : ''"
    :form-type="formType"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @click="onBindEvent('click', $event)"
    @getuserinfo="onBindEvent('getuserinfo', $event)"
    @contact="onBindEvent('contact', $event)"
    @getphonenumber="onBindEvent('getphonenumber', $event)"
    @error="onBindEvent('error', $event)"
    @opensetting="onBindEvent('opensetting', $event)"
    @launchapp="onBindEvent('launchapp', $event)"
  >
    <view class="s-button__content">
      <slot v-if="show_loading" name="loading">
        <s-loading :type="loadingType" :size="loadingSize" custom-class="s-button__loading" />
      </slot>
      <slot v-else-if="icon" name="icon">
        <s-icon
          :name="icon"
          :size="iconSize"
          :color="iconColor"
          :class-prefix="iconPrefix"
          custom-class="s-button__icon"
          :custom-style="iconStyle"
        />
      </slot>
      <slot v-if="shape === 'circle' && !show_loading" />
      <view v-if="shape !== 'circle'" class="s-button__text">
        <template v-if="show_loading && loadingText">{{ loadingText }}</template>
        <slot v-else>{{ text }}</slot>
      </view>
    </view>
  </button>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-button 按钮
 * @property {Boolean} custom 是否完全自定义样式，type，size，hover-class样式都清除，默认false
 * @property {String} type = [default|primary|info|warning|success|danger] 类型
 * @property {String} size = [normal|large|small|mini] 尺寸
 * @property {String} text 按钮文字
 * @property {Boolean} plain 是否为朴素按钮
 * @property {Boolean} block 是否为块级元素
 * @property {String} shape = [square|round|circle] 按钮形状
 * @property {Boolean} hairline 是否使用 0.5px 边框
 * @property {Boolean} disabled 是否禁用按钮
 * @property {Boolean} loading 是否显示为加载状态
 * @property {String} loadingText 加载状态提示文字
 * @property {String} loadingType = [circular|spinner] 加载状态图标类型
 * @property {Number|String} loadingSize 加载图标大小
 * @property {String} icon 左侧图标名称或图片链接，可选值见 Icon 组件 name
 * @property {Number|String} iconSize 左侧图标大小
 * @property {String} iconColor 左侧图标颜色
 * @property {String|Object} iconStyle 左侧图标样式
 * @property {String} iconPrefix 图标类名前缀，同 Icon 组件的 class-prefix 属性
 * @property {String} color 按钮颜色，支持传入linear-gradient渐变色
 * @property {String} openType 开放能力，具体支持可参考 uni-app官方文档
 * @property {String} formType 用于 form 组件，可选值为submit reset，点击分别会触发 form 组件的 submit/reset 事件
 * @property {*} options 用于通过e.target.dataset.options拿到传递的值，比如用来区分那个按钮点击分享
 * @property {String} hoverClass 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
 * @property {Number} hoverStartTime 按住后多久出现点击态，单位毫秒
 * @property {Number} hoverStayTime 手指松开后点击态保留时间，单位毫秒
 * @property {Boolean} hoverStopPropagation 指定是否阻止本节点的祖先节点出现点击态
 * @property {String} appParameter 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
 * @property {String} lang 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
 * @property {String} sessionFrom 会话来源，open-type="contact"时有效
 * @property {String} sendMessageTitle 会话内消息卡片标题，open-type="contact"时有效
 * @property {String} sendMessagePath 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
 * @property {String} sendMessageImg 会话内消息卡片图片，open-type="contact"时有效
 * @property {String} showMessageCard 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
 * @event {Function} click 点击事件
 * @event {Function} getuserinfo 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
 * @event {Function} getphonenumber 获取用户手机号回调
 * @event {Function} error 当使用开放能力时，发生错误的回调
 * @event {Function} opensetting 在打开授权设置页并关闭后回调
 * @event {Function} launchapp 从小程序打开 App 成功的回调
 * @example <s-button type="primary">按钮</s-button>
 */
export default {
  name: 'SButton',
  mixins: [componentMixin],
  props: {
    custom: Boolean,
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'normal',
    },
    text: {
      type: String,
      default: '',
    },
    plain: Boolean,
    block: Boolean,
    shape: String,
    hairline: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    padding: [Number, String],
    color: String,
    disabled: Boolean,
    loading: Boolean,
    showLoading: {
      type: Boolean,
      default: true,
    },
    loadingText: String,
    loadingType: {
      type: String,
      default: 'circular',
    },
    loadingSize: [Number, String],
    icon: String,
    iconSize: [Number, String],
    iconColor: String,
    iconStyle: [String, Object],
    iconPrefix: String,
    hoverClass: {
      type: String,
      default: 's-button--hover',
    },
    hoverStartTime: {
      type: Number,
      default: 0,
    },
    hoverStayTime: {
      type: Number,
      default: 100,
    },
    hoverStopPropagation: Boolean,
    options: {},
    lang: String,
    openType: String,
    formType: String,
    appParameter: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        [`s-button--${this.type}`]: !this.custom && this.type,
        [`s-button--${this.size}`]: !this.custom && this.size,
        [`s-button--${this.shape}`]: this.shape,
        's-button--plain': this.plain,
        's-button--block': this.block,
        's-button--hairline': this.hairline,
        's-button--gradient': !this.plain && String(this.color).indexOf('gradient') > -1,
        's-button--loading': this.loading,
        's-button--disabled': this.disabled,
      }, this.custom_class);
    },
    c_style() {
      const { custom, type, color, plain } = this;
      const style = {
        width: this.$addUnit(this.width),
        height: this.$addUnit(this.height),
        padding: this.$addUnit(this.padding),
        borderRadius: this.$addUnit(this.radius),
      };
      if (color) {
        if (custom || type === 'text') {
          style.color = color;
        } else {
          style.color = plain ? color : 'white';
          style.background = plain ? '' : color;
          style.borderColor = plain ? color : '';
        }
      }
      return this.$mergeStyle(style, this.custom_style);
    },
    enabled() {
      return !(this.disabled || this.loading);
    },
    show_hover() {
      return this.hoverClass && this.enabled;
    },
    show_loading() {
      return this.loading && this.showLoading;
    },
  },
  methods: {
    onBindEvent(name, e) {
      if (this.enabled || name === 'error') {
        this.$emit(name, e);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>