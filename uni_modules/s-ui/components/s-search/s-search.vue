<template>
  <view class="s-search" :class="c_class" :style="c_style" @click="handleClick">
    <slot name="left" />
    <view class="s-search__content" :style="content_style">
      <slot>
        <view v-if="showPrefix" class="s-search__prefix">
          <slot name="prefix">
            <s-icon :name="prefixIcon" :size="prefixIconSize" :color="prefixIconColor" />
          </slot>
        </view>
        <view v-if="disabled" class="s-search__input">{{ keyword || placeholder }}</view>
        <input
          v-else
          v-model="keyword"
          class="s-search__input"
          type="text"
          confirm-type="search"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :placeholder-class="placeholder_class"
          :placeholder-style="placeholder_style"
          :adjust-position="false"
          :disabled="disabled"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleSearch"
        />
        <view v-if="showSuffix" class="s-search__suffix">
          <slot name="suffix">
            <view v-if="clear_visible" class="s-search__clear" @touchstart="handleClear">
              <s-icon :name="clearIcon" :size="clearIconSize" :color="clearIconColor" />
            </view>
          </slot>
        </view>
      </slot>
    </view>
    <view v-if="showAction" class="s-search__action" :style="action_style" @click="handleAction">
      <slot name="action">{{ actionText }}</slot>
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import trim from '../../utils/trim';

/**
 * s-search 搜索框
 * @description 搜索输入框组件
 * @property {Number|String} height 搜索框高度
 * @property {String|Number} value v-model 双向绑定输入值
 * @property {String} background 搜索框外部背景色
 * @property {String} color 文字颜色
 * @property {Number|String} padding 搜索框边距
 * @property {Number} maxlength 输入的最大字符数
 * @property {String} align = [left|center|right] 输入框内容对齐方式，默认left
 * @property {String} shape = [square|round] 搜索框形状
 * @property {String|Object} contentStyle 内容样式
 * @property {Boolean} disabled 是否禁用搜索框
 * @property {String} placeholder 占位提示文字
 * @property {String} placeholderColor 占位提示文字文字颜色
 * @property {String|Object} placeholderStyle 占位提示文字样式
 * @property {String|Object} inputStyle 输入框样式
 * @property {Boolean} showPrefix 是否显示左边icon
 * @property {Boolean} showSuffix 是否显示右边icon
 * @property {String} prefixIcon 搜索图标 icon名称，为空则不显示
 * @property {Number|String} prefixIconSize 搜索图标 icon大小
 * @property {String} prefixIconColor 搜索图标 icon颜色
 * @property {Boolean} clearable 是否启用清除图标，点击清除图标后会清空输入框
 * @property {Boolean} clearTrigger 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示，默认focus
 * @property {String} clearIcon 清除图标icon名称，为空则不显示
 * @property {Number|String} clearIconSize 清空图标 icon大小
 * @property {String} clearIconColor 清空图标 icon 颜色
 * @property {Boolean} showAction 是否显示右边 action
 * @property {String} actionText 右边action 文字
 * @property {String} actionColor 右边action 颜色
 * @property {String|Object} actionStyle 右边action 样式
 * @property {Boolean} trim 是否自动去除两端的空格
 * @event {Function} focus (event) 事件对象
 * @event {Function} clear (event) 事件对象
 * @event {Function} search (value) 回车或手机上点击键盘上搜索按钮时触发
 * @event {Function} action (value) 点击右边action时触发
 * @example <s-search v-model="keyword" @search="onSearch" />
 */
export default {
  name: 'SSearch',
  mixins: [componentMixin],
  props: {
    height: [Number, String],
    value: [Number, String],
    background: String,
    color: String,
    padding: [Number, String],
    align: String,
    shape: String,
    disabled: Boolean,
    contentStyle: [String, Object],
    maxlength: {
      type: Number,
      default: 140,
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键词',
    },
    placeholderColor: String,
    placeholderClass: {
      type: [String, Object],
      default: 's-search__placeholder',
    },
    placeholderStyle: [String, Object],
    showPrefix: {
      type: Boolean,
      default: true,
    },
    showSuffix: {
      type: Boolean,
      default: true,
    },
    prefixIcon: {
      type: String,
      default: 'search',
    },
    prefixIconSize: [Number, String],
    prefixIconColor: String,
    clearable: {
      type: Boolean,
      default: true,
    },
    clearTrigger: {
      type: String,
      default: 'focus',
    },
    clearIcon: {
      type: String,
      default: 'clear',
    },
    clearIconSize: [Number, String],
    clearIconColor: String,
    showAction: Boolean,
    actionText: {
      type: String,
      default: '搜索',
    },
    actionColor: String,
    actionStyle: [String, Object],
    trim: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      keyword: '',
      focus: false,
    };
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        [`s-search--align-${this.align}`]: this.align,
        [`s-search--shape-${this.shape}`]: this.shape,
        's-search--disabled': this.disabled,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
        padding: this.$addUnit(this.padding),
        background: this.background,
        color: this.color,
      }, this.custom_style);
    },
    content_style() {
      return this.$mergeStyle(this.contentStyle);
    },
    placeholder_class() {
      return this.$mergeClass(this.placeholderClass);
    },
    placeholder_style() {
      return this.$mergeStyle({
        color: this.placeholderColor,
      }, this.placeholderStyle);
    },
    clear_visible() {
      return this.clearable &&
        this.clearIcon &&
        this.keyword !== '' &&
        (this.clearTrigger !== 'focus' || this.focus);
    },
    action_style() {
      return this.$mergeStyle({
        color: this.actionColor,
      }, this.actionStyle);
    },
  },
  watch: {
    keyword(keyword) {
      if (this.trim) keyword = trim(keyword);
      if (this.value !== keyword) {
        this.$emit('input', keyword);
      }
    },
    value: {
      immediate: true,
      handler(value) {
        this.keyword = value;
      },
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
    handleClear(e) {
      this.keyword = '';
      this.$emit('clear', e);
    },
    handleFocus(e) {
      this.focus = true;
      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.focus = false;
      this.$emit('blur', e);
    },
    handleSearch() {
      this.$emit('search', this.value);
    },
    handleAction() {
      this.$emit('action', this.value);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
