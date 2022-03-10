<template>
  <view class="s-action-sheet" :class="custom_class" :style="custom_style">
    <s-popup
      position="bottom"
      :value="value"
      :round="round"
      :z-index="zIndex"
      :animate="animate"
      :animate-duration="animateDuration"
      :mask="mask"
      :mask-opacity="maskOpacity"
      :mask-close="maskClose"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @mask-close="triggerCancel"
      @close="close"
    >
      <view v-if="title" class="s-action-sheet__header" :style="title_style">
        {{ title }}
      </view>
      <view v-if="description" class="s-action-sheet__description" :style="description_style">
        {{ description }}
      </view>
      <scroll-view v-if="list.length" class="s-action-sheet__content" scroll-y>
        <view class="s-action-sheet__list">
          <s-button
            v-for="(item, index) of list"
            :key="index"
            custom
            hairline
            custom-class="s-action-sheet__item"
            :custom-style="item.customStyle"
            :color="item.color"
            :loading="item.loading"
            :disabled="item.disabled"
            :icon="item.icon"
            :icon-size="item.iconSize"
            :icon-color="item.iconColor"
            :icon-style="item.iconStyle"
            :lang="item.lang"
            :open-type="item.openType"
            :app-parameter="item.appParameter"
            :session-from="item.sessionFrom"
            :send-message-title="item.sendMessageTitle"
            :send-message-path="item.sendMessagePath"
            :send-message-img="item.sendMessageImg"
            :show-message-card="item.showMessageCard"
            :options="item.shareOptions"
            @click="onSheetItemClick(index)"
            @getuserinfo="$emit('getuserinfo', $event)"
            @contact="$emit('contact', $event)"
            @getphonenumber="$emit('getphonenumber', $event)"
            @error="$emit('error', $event)"
            @opensetting="$emit('opensetting', $event)"
            @launchapp="$emit('launchapp', $event)"
          >
            <view class="s-action-sheet__name">{{ item.name }}</view>
            <view v-if="item.subname" class="s-action-sheet__subname">{{ item.subname }}</view>
          </s-button>
        </view>
      </scroll-view>
      <template v-if="showCancel && cancelText">
        <view class="s-action-sheet__gap" />
        <s-button custom custom-class="s-action-sheet__cancel" :color="cancelColor" @click="onCancel">
          {{ cancelText }}
        </s-button>
      </template>
    </s-popup>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-action-sheet 动作面板
 * @description 底部弹起的模态面板，包含与当前情境相关的多个选项。
 * @property {Boolean} value 双向绑定v-model，显示隐藏
 * @property {Array} actions 面板选项列表 [{
 * name:string,
 * subname:string,
 * color:string,
 * disabled:boolean,
 * openType:string,
 * customStyle:string|object,
 * icon:string,
 * iconSize:number|string,
 * iconColor:string,
 * iconStyle:string|object
 * }]
 * @property {String} title 顶部标题
 * @property {String} description 选项上方的描述信息
 * @property {String|Object} titleStyle 顶部标题样式
 * @property {String|Object} descriptionStyle 选项上方的描述信息样式
 * @property {Boolean} showCancel 是否显示取消按钮
 * @property {String} cancelText 取消按钮文字
 * @property {String} cancelColor 取消按钮文字颜色
 * @property {Boolean} actionClose 是否在点击选项后关闭
 * @property {Boolean} round 是否显示圆角
 * @property {Number|String} zIndex 同popup组件zIndex属性
 * @property {Boolean} mask 同popup组件mask属性
 * @property {Number|String} maskOpacity 同popup组件maskOpacity属性
 * @property {Boolean} maskClose 是否在点击遮罩后关闭
 * @property {String|Boolean|Object} animate 同popup组件animate属性
 * @property {Number|String|Object} animateDuration 同popup组件animateDuration属性
 * @property {Boolean} safeAreaInsetBottom 同popup组件safeAreaInsetBottom属性，默认true
 * @event {Function} select (index) 点击选项时触发，禁用或加载状态下不会触发
 * @event {Function} cancel 点击取消按钮或遮罩关闭时触发
 * @event {Function} getuserinfo 获取用户信息回调，openType="getUserInfo"时有效
 * @event {Function} contact 客服消息回调，openType="contact"时有效
 * @event {Function} getphonenumber 获取用户手机号回调，openType="getPhoneNumber"时有效
 * @event {Function} launchapp 打开 APP 成功的回调，openType="launchApp"时有效
 * @event {Function} opensetting 在打开授权设置页后回调，openType="openSetting"时有效
 * @example <s-action-sheet v-model="showActionSheet" :actions="actions" />
 */
export default {
  name: 'SActionSheet',
  mixins: [componentMixin],
  props: {
    value: Boolean,
    actions: {
      type: Array,
      default: () => [],
    },
    title: String,
    description: String,
    titleStyle: [String, Object],
    descriptionStyle: [String, Object],
    showCancel: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    cancelColor: String,
    actionClose: {
      type: Boolean,
      default: true,
    },
    round: Boolean,
    zIndex: [Number, String],
    mask: {
      type: Boolean,
      default: true,
    },
    maskOpacity: [Number, String],
    maskClose: {
      type: Boolean,
      default: true,
    },
    animate: {
      type: [String, Boolean, Object],
      default: 'auto',
    },
    animateDuration: {
      type: [Number, String, Object],
      default: 300,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    list() {
      return this.actions.map(item => this.$getType(item) === 'object' ? item : { name: item });
    },
    title_style() {
      return this.$mergeStyle(this.titleStyle);
    },
    description_style() {
      return this.$mergeStyle(this.descriptionStyle);
    },
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
    onSheetItemClick(index) {
      this.actionClose && this.close();
      this.$emit('select', index);
    },
    triggerCancel() {
      this.$emit('cancel');
    },
    onCancel() {
      this.close();
      this.triggerCancel();
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
