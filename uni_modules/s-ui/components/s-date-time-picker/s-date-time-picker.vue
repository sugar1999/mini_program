<template>
  <s-picker
    ref="picker"
    :custom-class="c_class"
    :custom-style="custom_style"
    multiple
    :title="title"
    :visible="visible"
    :columns="columns"
    :value="values"
    :show-cancel="showCancel"
    :mask="mask"
    :mask-close="maskClose"
    @change="onChange"
    @update:visible="updateVisible"
    @cancel="onCancel"
    @confirm="onConfirm"
  />
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
import formatDate from '../../utils/formatDate';
import getDaysInMonth from '../../utils/getDaysInMonth';
import parseDate from '../../utils/parseDate';

const yearReg = /^\d{4}$/;
const timeReg = /^\d{2}(:\d{2})+$/;

/**
 * s-date-time-picker 日期时间选择器
 * @description 选择日期和时间
 * @property {String} title 标题
 * @property {String} type = [date | time | datetime | year | month]  选择类型
 * @property {Boolean} visible 显示隐藏，双向绑定
 * @property {String|Number} value 选择结果，双向绑定
 * @property {String|Number} start 开始时间
 * @property {String|Number} end 结束时间
 * @property {Boolean} showTag 是否显示中文单位
 * @property {Function} filter ({name,list,valueList}) 过滤每列数据
 * @property {Boolean} showCancel 是否显示取消按钮
 * @property {Boolean} mask 是否显示遮罩
 * @property {Boolean} maskClose 点击遮罩是否关闭
 * @event {Function} cancel 点击取消按钮或遮罩关闭取消时触发
 * @event {Function} confirm ({type,value,valueList,dataList,timestamp}) 选中事件
 * @example <s-date-time-picker v-model="date" :visible.sync="dateVisible" />
 */
export default {
  name: 'SDateTimePicker',
  mixins: [componentMixin],
  props: {
    title: String,
    type: {
      type: String,
      default: 'date',
    },
    visible: Boolean,
    value: [String, Number],
    start: {
      type: [String, Number],
      default: '1970/01/01 00:00',
    },
    end: {
      type: [String, Number],
      default: formatDate(new Date(new Date().getFullYear() + 10, 11, 31), 'YYYY/MM/DD 23:59'),
    },
    showTag: {
      type: Boolean,
      default: true,
    },
    filter: Function,
    showCancel: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    maskClose: Boolean,
  },
  data: () => ({
    columns: [],
    values: [],
    valueList: [],
    strDate: formatDate(new Date(), 'YYYY/MM/DD'),
  }),
  computed: {
    c_class() {
      return this.$mergeClass('s-date-time-picker', this.custom_class);
    },
    startTime() {
      const { start, endTime, strDate } = this;
      let date = start;
      if (yearReg.test(date)) {
        date = `${date}/01/01`;
      } else if (timeReg.test(date)) {
        date = `${strDate} ${date}`;
      }
      date = parseDate(date).getTime();
      return date > endTime ? endTime : date;
    },
    endTime() {
      const { end, strDate } = this;
      let date = end;
      if (yearReg.test(date)) {
        date = `${date}/01/01`;
      } else if (timeReg.test(date)) {
        date = `${strDate} ${date}`;
      }
      return parseDate(date).getTime();
    },
    startYear() {
      return parseInt(formatDate(this.startTime, 'YYYY'));
    },
    startMonth() {
      return parseInt(formatDate(this.startTime, 'MM'));
    },
    startDay() {
      return parseInt(formatDate(this.startTime, 'DD'));
    },
    startHour() {
      return parseInt(formatDate(this.startTime, 'HH'));
    },
    startMinute() {
      return parseInt(formatDate(this.startTime, 'mm'));
    },
    endYear() {
      return parseInt(formatDate(this.endTime, 'YYYY'));
    },
    endMonth() {
      return parseInt(formatDate(this.endTime, 'MM'));
    },
    endDay() {
      return parseInt(formatDate(this.endTime, 'DD'));
    },
    endHour() {
      return parseInt(formatDate(this.endTime, 'HH'));
    },
    endMinute() {
      return parseInt(formatDate(this.endTime, 'mm'));
    },
    yearList() {
      const list = [];
      const { startYear, endYear, showTag } = this;
      const tag = showTag ? '年' : '';
      for (let i = startYear; i <= endYear; i++) {
        const value = String(i).padStart(4, '0');
        list.push({ label: value + tag, value });
      }
      return this.filterList('year', list);
    },
    monthList() {
      const list = [];
      const { showTag } = this;
      const tag = showTag ? '月' : '';
      const [start, end] = this.getListRange(1, 'YYYY', 1, 12);
      for (let i = start; i <= end; i++) {
        const value = String(i).padStart(2, '0');
        list.push({ label: value + tag, value });
      }
      return this.filterList('month', list);
    },
    dayList() {
      const list = [];
      const [year, month] = this.valueList;
      if (year && month) {
        const { showTag } = this;
        const tag = showTag ? '日' : '';
        const [start, end] = this.getListRange(2, 'YYYYMM', 1, getDaysInMonth(year, month));
        for (let i = start; i <= end; i++) {
          const value = String(i).padStart(2, '0');
          list.push({ label: value + tag, value });
        }
      }
      return this.filterList('day', list);
    },
    hourList() {
      const list = [];
      const { type, startHour, endHour, showTag } = this;
      const tag = showTag ? '时' : '';
      let range = [0, 0];
      if (type === 'time') {
        range = [startHour, endHour];
      } else {
        range = this.getListRange(3, 'YYYYMMDD', 0, 23);
      }
      const [start, end] = range;
      for (let i = start; i <= end; i++) {
        const value = String(i).padStart(2, '0');
        list.push({ label: value + tag, value });
      }
      return this.filterList('hour', list);
    },
    minuteList() {
      const list = [];
      const { type, startHour, endHour, startMinute, endMinute, showTag } = this;
      const tag = showTag ? '分' : '';
      let range = [0, 0];
      const min = 0;
      const max = 59;
      if (type !== 'time') {
        range = this.getListRange(4, 'YYYYMMDDHH', min, max);
      } else {
        let [hour] = this.valueList;
        if (hour) {
          hour = parseInt(hour);
          range = [
            hour <= startHour ? startMinute : min,
            hour >= endHour ? endMinute : max,
          ];
        }
      }
      const [start, end] = range;
      for (let i = start; i <= end; i++) {
        const value = String(i).padStart(2, '0');
        list.push({ label: value + tag, value });
      }
      return this.filterList('minute', list);
    },
    initState() {
      return [
        this.type,
        this.startTime,
        this.endTime,
      ];
    },
  },
  watch: {
    initState() {
      this.init();
    },
    value() {
      this.setValue(this.value);
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      switch (this.type) {
        case 'datetime':
          this.columns = [this.yearList, this.monthList, this.dayList, this.hourList, this.minuteList];
          break;
        case 'year':
          this.columns = [this.yearList];
          break;
        case 'month':
          this.columns = [this.yearList, this.monthList];
          break;
        case 'time':
          this.columns = [this.hourList, this.minuteList];
          break;
        default:
          this.columns = [this.yearList, this.monthList, this.dayList];
          break;
      }
      this.setValue(this.value);
    },
    getListRange(n, fmt, min, max) {
      const { startTime, endTime, valueList } = this;
      const values = valueList.slice(0, n);
      let range = [0, 0];
      if (values.every(value => value)) {
        const current = values.join('');
        range = [
          current <= formatDate(startTime, fmt) ? this[[
            'startYear',
            'startMonth',
            'startDay',
            'startHour',
            'startMinute',
          ][n]] : min,
          current >= formatDate(endTime, fmt) ? this[[
            'endYear',
            'endMonth',
            'endDay',
            'endHour',
            'endMinute',
          ][n]] : max,
        ];
      }
      return range;
    },
    filterList(name, list) {
      const filter = this.$getPropsFn('filter');
      return filter ? filter({
        name,
        list,
        valueList: this.valueList,
      }) : list;
    },
    updateVisible(visible) {
      this.$emit('update:visible', visible);
    },
    setValue(value) {
      const { type, strDate } = this;
      let date = value;
      if (!date) {
        date = new Date();
      } else if (yearReg.test(date)) {
        date = `${date}/01/01`;
      } else if (timeReg.test(date)) {
        date = `${strDate} ${date}`;
      }
      date = parseDate(Math.min(Math.max(parseDate(date).getTime(), this.startTime), this.endTime));
      const values = [
        formatDate(date, 'YYYY'),
        formatDate(date, 'MM'),
        formatDate(date, 'DD'),
        formatDate(date, 'HH'),
        formatDate(date, 'mm'),
      ];
      switch (type) {
        case 'year':
          this.values = values.slice(0, 1);
          break;
        case 'month':
          this.values = values.slice(0, 2);
          break;
        case 'datetime':
          this.values = values.slice(0);
          break;
        case 'time':
          this.values = values.slice(3);
          break;
        default:
          this.values = values.slice(0, 3);
          break;
      }
    },
    onChange({ i, setData, valueList }) {
      this.valueList = valueList;
      switch (this.type) {
        case 'datetime':
          if (i < 1) {
            setData(1, this.monthList);
          }
          if (i < 2) {
            setData(2, this.dayList);
          }
          if (i < 3) {
            setData(3, this.hourList);
          }
          if (i < 4) {
            setData(4, this.minuteList);
          }
          break;
        case 'year':
          break;
        case 'month':
          if (i < 1) {
            setData(1, this.monthList);
          }
          break;
        case 'time':
          if (i < 1) {
            setData(1, this.minuteList);
          }
          break;
        default:
          if (i < 1) {
            setData(1, this.monthList);
          }
          if (i < 2) {
            setData(2, this.dayList);
          }
          break;
      }
    },
    onCancel() {
      this.$emit('cancel');
    },
    onConfirm({ valueList, dataList }) {
      let value = '';
      let date = '';
      const { type, strDate } = this;
      switch (type) {
        case 'datetime':
          date = parseDate(valueList.slice(0, 3).join('/') + ' ' + valueList.slice(3, 5).join(':'));
          value = formatDate(date, 'YYYY-MM-DD HH:mm');
          break;
        case 'year':
          date = parseDate(valueList[0] + '/01/01');
          value = formatDate(date, 'YYYY');
          break;
        case 'month':
          date = parseDate(valueList.join('/') + '/01');
          value = formatDate(date, 'YYYY-MM');
          break;
        case 'time':
          date = parseDate(strDate + ' ' + valueList.join(':'));
          value = formatDate(date, 'HH:mm');
          break;
        default:
          date = parseDate(valueList.join('/'));
          value = formatDate(date, 'YYYY-MM-DD');
          break;
      }
      let timestamp = date.getTime();
      if (type === 'time') {
        timestamp -= parseDate(strDate).getTime();
      }
      this.$emit('input', value);
      this.$emit('confirm', {
        type,
        value,
        valueList,
        dataList,
        timestamp,
      });
    },
  },
};
</script>
