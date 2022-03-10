<template>
  <view class="s-picker" :class="custom_class" :style="custom_style">
    <s-popup
      position="bottom"
      :value="visible"
      :z-index="zIndex"
      :animate="animate"
      :animate-duration="animateDuration"
      :mask="mask"
      :mask-opacity="maskOpacity"
      :mask-close="maskClose"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @open="onOpen"
      @mask-close="triggerCancel"
      @close="close"
      @closed="onClosed"
    >
      <view class="s-picker__header s-hairline--bottom">
        <view class="s-picker__header-left">
          <s-button
            v-if="showCancel"
            type="text"
            size="custom"
            square
            custom-class="s-picker__action s-picker__cancel-action"
            :custom-style="{ color: cancelColor }"
            @click="onCance"
          >
            {{ cancelText }}
          </s-button>
        </view>
        <view class="s-picker__title" :style="{ color: titleColor }">{{ title }}</view>
        <view class="s-picker__header-right">
          <s-button
            type="text"
            size="custom"
            square
            :custom-class="confirm_class"
            :custom-style="{ color: isDisabledConfirm ? isDisabledConfirm : confirmColor }"
            @click="onConfirm"
          >
            {{ confirmText }}
          </s-button>
        </view>
      </view>
      <view class="s-picker__body">
        <picker-view
          v-if="pickerView"
          :value="indexList"
          class="s-picker__picker-view"
          :indicator-class="indicator_class"
          :indicator-style="indicator_style"
          :mask-class="mask_class"
          :mask-style="mask_Style"
          @change="onPickerChange"
          @pickstart="onPickerStart"
          @pickend="onPickerEnd"
        >
          <picker-view-column v-for="(column, columnIndex) of columnDataList" :key="columnIndex">
            <view v-for="(item, index) of column" :key="index" class="s-picker__option">
              <slot :scopeParams="scopeParams" :columnIndex="columnIndex" :item="item" :index="index">
                <text class="s-picker__option-text">{{ item[labelKey] }}</text>
              </slot>
            </view>
          </picker-view-column>
        </picker-view>
      </view>
      <view v-if="loading" class="s-picker__loading">
        <s-loading />
      </view>
    </s-popup>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import toValidListData from '../../utils/toValidListData';

/**
 * s-picker 底部弹出滑动选择组件 picker
 * @description 滑动选则，支持多列，级联选择
 * @property {Array|Object} columns 选择数据列表 [{label:'中国',value:'1'}]，multiple 为true时，必须是数组格式[[{label:'中国',value:'1'}]]
 * @property {String} title 标题
 * @property {Boolean} visible 弹框显示隐藏
 * @property {Boolean} multiple 是否是多列选择
 * @property {*} value 选中的value，多列选择时为数组
 * @property {String} text 双向绑定用来同步确认后的选中label描述
 * @property {String} valuelKey 取数据中的那个字段作为value关联
 * @property {String} labelKey 取数据中的那个字段作为显示文字
 * @property {String|Array} placeholder 给列数据的前面插入一项value为''的占位选择项数据
 * @property {String} separator text在多列选择结果字符串的分割符号，默认 -
 * @property {String} cancelText 取消按钮文字
 * @property {String} confirmText 确认按钮文字
 * @property {String} titleColor 标题颜色
 * @property {String} cancelColor 取消按钮颜色
 * @property {String} confirmColor 确认按钮颜色
 * @property {String} disabledColor 确认按钮禁用时颜色
 * @property {String|Object} indicatorClass 设置选择器中间选中框的类名
 * @property {String|Object} indicatorStyle 设置选择器中间选中框的样式
 * @property {String|Object} maskClass 设置蒙层的类名
 * @property {String|Object} maskStyle 设置蒙层的样式
 * @property {String|Number} zIndex 同popup组件zIndex属性
 * @property {String|Boolean|Object} animate 同popup组件animate属性
 * @property {Number|String|Object} animateDuration 同popup组件animateDuration属性
 * @property {Boolean} mask 同popup组件mask属性
 * @property {Boolean} maskClose 点击遮罩是否关闭
 * @property {Number|String} maskOpacity 同popup组件maskOpacity属性
 * @property {Boolean} showCancel 是否显示取消按钮
 * @property {Boolean} safeAreaInsetBottom 同popup组件safeAreaInsetBottom属性，默认true
 * @event {Function} change ({
    i: 当前列下标,
    index: 当前列选中的下标,
    value: 当前列选中的value,
    data: 当前列选中的数据对象,
    indexList: 选中的下标数组,
    valueList: 选中的value数组,
    dataList: 选中的数据对象数组,
    text: 选中的label拼接字符串,
    showLoading: 拉取数据时可以开启loading,
    hideLoading: 拉取数据后可以关闭loading,
    setData: 级联选择时在change事件中设置列的数据,
  }) 滑动改变时触发
 * @event {Function} cancel 点击取消按钮或遮罩关闭取消时触发
 * @event {Function} confirm ({
    indexList: 选中的index数组,
    valueList: 选中的value数组,
    dataList: 选中的data数组,
    value: 选中的value，只有在单列时会有
    data: 选中的data，只有在单列时会有
    text: 选中的label拼接字符串,
    getText: 根据自定义间隔符返回选中的label拼接字符串,
  }) 点击确认时触发
 * @example <s-picker v-model="value" :columns="columns" :visible.sync="visible" @confirm="onConfirm" />
 */
export default {
  name: 'SPicker',
  mixins: [componentMixin],
  props: {
    visible: Boolean,
    columns: {
      type: [Array, Object],
      default: () => [],
    },
    value: {
      default: '',
    },
    multiple: Boolean,
    valueKey: {
      type: String,
      default: 'value',
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    placeholder: {
      type: [Array, String],
      default: () => [],
    },
    text: String,
    separator: {
      type: String,
      default: '-',
    },
    title: String,
    titleColor: String,
    cancelText: {
      type: String,
      default: '取消',
    },
    cancelColor: String,
    confirmText: {
      type: String,
      default: '确定',
    },
    confirmColor: String,
    disabledColor: String,
    indicatorClass: [String, Object],
    indicatorStyle: [String, Object],
    maskClass: [String, Object],
    maskStyle: [String, Object],
    zIndex: [Number, String],
    mask: {
      type: Boolean,
      default: true,
    },
    maskOpacity: [Number, String],
    maskClose: Boolean,
    showCancel: {
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
  data() {
    return {
      columnDataList: [], // column 合法数据数组
      indexList: [], // column 每列选中的索引
      pickerView: false, // 初始化picker-view
      isDisabledConfirm: false, // 滑动时禁用确认按钮
      loading: false,
    };
  },
  computed: {
    initState() {
      return [this.columns, this.multiple];
    },
    indicator_class() {
      return this.$mergeClass('s-picker__indicator', this.indicatorClass);
    },
    indicator_style() {
      return this.$mergeStyle(this.indicatorStyle);
    },
    mask_class() {
      return this.$mergeClass('s-picker__mask', this.maskClass);
    },
    mask_Style() {
      return this.$mergeStyle(this.maskStyle);
    },
    confirm_class() {
      return this.$mergeClass('s-picker__action s-picker__confirm-action', {
        's-picker__confirm-action--disabled': this.isDisabledConfirm,
      });
    },
  },
  watch: {
    initState() {
      this.init();
    },
    value(value) {
      this.updateValue(value);
    },
  },
  created() {
    this.columnIndexList = [];
    this.valueList = [];
    this.dataList = [];
    this.init();
  },
  methods: {
    init() {
      const columnIndexList = [];
      const columnDataList = [];
      const valueList = [];
      const indexList = [];
      const dataList = [];
      const columns = this.multiple ? this.columns : [this.columns];
      const values = this.$getType(this.value) === 'array' ? this.value : [this.value];
      columns.forEach((data, i) => {
        columnIndexList[i] = i;
        columnDataList[i] = this.toColumnDataList(i, data);
        indexList[i] = 0;
        valueList[i] = this.getDefValue(values[i]);
        dataList[i] = null;
      });
      this.columnIndexList = columnIndexList;
      this.columnDataList = columnDataList;
      this.valueList = valueList;
      this.indexList = indexList;
      this.dataList = dataList;
      this.updateValue(this.value);
    },
    getDefValue(value, defaultValue = '') {
      return this.$isDef(value) ? value : defaultValue;
    },
    onOpen() {
      this.$nextTick(() => {
        this.updateValue(this.value);
        this.pickerView = true;
        this.isDisabledConfirm = false;
      });
    },
    close() {
      this.$emit('update:visible', false);
    },
    onClosed() {
      this.hideLoading();
      this.pickerView = false;
    },
    onPickerStart() {
      this.isDisabledConfirm = true;
    },
    onPickerEnd() {
      this.isDisabledConfirm = false;
    },
    onPickerChange(e) {
      const prevIndexList = this.indexList;
      this.indexList = [...e.detail.value];
      this.indexList.some((index, i) => {
        if (index !== prevIndexList[i]) {
          this.onColumnChange(i);
          return true;
        }
      });
    },
    toColumnDataList(i, data) {
      const valueKey = this.valueKey;
      const labelKey = this.labelKey;
      const placeholderList = this.$getType(this.placeholder) === 'array' ? this.placeholder : [this.placeholder];
      const placeholder = placeholderList[i];
      return [
        ...(placeholder ? [{ [valueKey]: '', [labelKey]: placeholder }] : []),
        ...toValidListData(data, valueKey, labelKey),
      ];
    },
    showLoading() {
      this.loading = true;
      this.loadingVisible = true;
    },
    hideLoading() {
      this.loadingVisible = false;
      this.$nextTick(() => {
        this.$nextTick(() => {
          if (!this.loadingVisible) {
            this.loading = false;
          }
        });
      });
    },
    setData(i, data) {
      const list = this.toColumnDataList(i, data);
      if (JSON.stringify(this.columnDataList[i]) !== JSON.stringify(list)) {
        this.$set(this.columnDataList, i, list);
        this.$nextTick(() => {
          this.updateColumnIndex(i);
        });
      }
    },
    updateColumnIndex(i) {
      const { valueList, valueKey, columnDataList, indexList } = this;
      const value = String(this.getDefValue(valueList[i]));
      const valueIndex = columnDataList[i].findIndex(item => value === String(this.getDefValue(item[valueKey])));
      let index = this.getColumnIndex(i);
      index = valueIndex > -1 ? valueIndex : index;
      this.$set(indexList, i, index);
      this.onColumnChange(i);
    },
    onColumnChange(i) {
      const index = this.getColumnIndex(i);
      const prevData = this.dataList[i] || null;
      const data = this.columnDataList[i][index] || null;
      if (data !== prevData) {
        this.dataList[i] = data;
        this.valueList[i] = data ? data[this.valueKey] : '';
        this.$emit('change', {
          i,
          index,
          value: this.valueList[i],
          data,
          indexList: [...this.indexList],
          valueList: [...this.valueList],
          dataList: [...this.dataList],
          setData: this.setData,
          showLoading: this.showLoading,
          hideLoading: this.hideLoading,
        });
      }
    },
    getColumnIndex(i) {
      return Math.max(0, Math.min(this.indexList[i], this.columnDataList[i].length - 1));
    },
    getText(separator) {
      separator = this.getDefValue(separator, this.separator);
      return this.dataList.filter(item => item && this.$isDef(item[this.labelKey])).map(item => item[this.labelKey]).join(separator);
    },
    updateValue(value) {
      const values = this.$getType(value) === 'array' ? value : [value];
      this.columnIndexList.forEach(i => {
        this.valueList[i] = this.getDefValue(values[i]);
        this.updateColumnIndex(i);
      });
    },
    triggerCancel() {
      this.$emit('cancel');
    },
    onCance() {
      this.close();
      this.triggerCancel();
    },
    onConfirm() {
      if (!this.isDisabledConfirm) {
        const valueList = this.dataList.map(item => item ? item[this.valueKey] : '');
        const text = this.getText();
        const params = {
          text,
          indexList: [...this.indexList],
          valueList: [...valueList],
          dataList: [...this.dataList],
          getText: this.getText,
        };
        if (!this.multiple) {
          params.value = valueList[0];
          params.data = this.dataList[0];
        }
        this.close();
        this.$emit('input', this.multiple ? [...valueList] : valueList[0]);
        this.$emit('update:text', text);
        this.$emit('confirm', params);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
