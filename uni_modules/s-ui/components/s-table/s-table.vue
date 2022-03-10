<template>
  <view class="s-table" :class="c_class" :style="c_style">
    <scroll-view class="s-table__scroll-x" scroll-x>
      <view class="s-table__wrap">
        <view v-if="showHeader" class="s-table__header" :style="header_style">
          <slot name="header" :scopeParams="scopeParams" :columnWidthStyleList="columnWidthStyleList">
            <template v-for="(column, columnIndex) of columns">
              <view
                v-if="!column.hidden"
                :key="columnIndex"
                class="s-table__th"
                :class="thClassList[columnIndex]"
                :style="thStyleList[columnIndex]"
                @click="onThClick(column, columnIndex)"
              >
                <slot name="th" :scopeParams="scopeParams" :column="column" :columnIndex="columnIndex">
                  <view>{{ column.label }}</view>
                  <view v-if="hasSort(column)" class="s-table__sort-wrap">
                    <view
                      v-for="order of ['asc', 'desc']"
                      :key="order"
                      class="s-table__sort-icon"
                      :class="{ 's-table__sort-icon--active': isActiveSort(column, order) }"
                      :style="{
                        color: isActiveSort(column, order) ? sortActiveColor : sortColor,
                      }"
                    ></view>
                  </view>
                </slot>
              </view>
            </template>
          </slot>
        </view>
        <view class="s-table__body">
          <scroll-view class="s-table__scroll-y" scroll-y>
            <view
              v-for="(row, rowIndex) of data"
              :key="rowIndex"
              class="s-table__tr"
              :class="'' + getRowClass(row, rowIndex)"
              :style="'' + getRowStyle(row, rowIndex)"
              @click="onTrClick(row, rowIndex)"
            >
              <slot
                name="tr"
                :scopeParams="scopeParams"
                :row="row"
                :rowIndex="rowIndex"
                :columnWidthStyleList="columnWidthStyleList"
              >
                <template v-for="(column, columnIndex) of columns">
                  <view
                    v-if="!column.hidden"
                    :key="columnIndex"
                    class="s-table__td"
                    :class="'' + getTdClass({ row, rowIndex, column, columnIndex })"
                    :style="'' + getTdStyle({ row, rowIndex, column, columnIndex })"
                    @click="onTdClick({ row, rowIndex, column, columnIndex })"
                  >
                    <slot
                      :scopeParams="scopeParams"
                      :row="row"
                      :rowIndex="rowIndex"
                      :column="column"
                      :columnIndex="columnIndex"
                    >
                      <view class="s-table__cell">
                        {{ row[column.prop] }}
                      </view>
                    </slot>
                  </view>
                </template>
              </slot>
            </view>
          </scroll-view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

/**
 * s-table 简单数据表格
 * @description 简单的表格组件，可设每列宽度，内置排序功能
 * @property {Array} columns 表头 [{label, prop, minWidth, width，sortBy, hidden}]
 * @property {Array} data 数据列表
 * @property {Number|String} height table 的高度，默认为自动高度，设此属性可固定表头
 * @property {String} align = [left|center|right] 文字居中方向
 * @property {Boolean} stripe 是否为斑马纹 table
 * @property {Boolean} border 是否显示边框
 * @property {String} borderColor 边框颜色色
 * @property {Boolean} showHeader 是否显示表头
 * @property {String|Object} headerStyle 表头样式
 * @property {String|Object|Array|Function} rowClass 行 class 方法参数 rowClass(row, rowIndex)
 * @property {String|Object|Function} rowStyle 行 style 方法参数 rowStyle(row, rowIndex)
 * @property {String|Object|Array|Function} thClass 表头单元格 class 方法参数 thClass(column, columnIndex)
 * @property {String|Object|Function} thStyle 表头单元格 style 方法参数 thStyle(column, columnIndex)
 * @property {String|Object|Array|Function} tdClass 单元格 class 方法参数 tdClass({ row, rowIndex, column, columnIndex })
 * @property {String|Object|Function} tdStyle 单元格 style 方法参数 tdStyle({ row, rowIndex, column, columnIndex })
 * @property {String|Number} sortBy 排序字段，sort-by.sync双向绑定用于获取
 * @property {String} sortOrder = [asc | desc] 排序顺序， sort-order.sync 双向绑定用于获取
 * @property {String} sortColor 排序箭头颜色
 * @property {String} sortActiveColor 排序箭头激活颜色
 * @event {Function} sort ({ row, rowIndex, column, columnIndex }) 触发排序时, 需要双向绑定获取 :sort-by.sync="sortBy" :sort-order.sync="sortOrder"
 * @event {Function} th-click (column, columnIndex) th点击事件
 * @event {Function} tr-click (row, rowIndex) tr点击事件
 * @event {Function} td-click ({ row, rowIndex, column, columnIndex }) td点击事件
 * @example <s-table border align="center" :columns="table.columns" :data="table.data" />
 */
export default {
  name: 'STable',
  mixins: [componentMixin],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    height: [Number, String],
    align: String,
    stripe: Boolean,
    border: Boolean,
    borderColor: String,
    showHeader: {
      type: Boolean,
      default: true,
    },
    headerStyle: [String, Object],
    rowClass: [String, Object, Array, Function],
    rowStyle: [String, Object, Function],
    thClass: [String, Object, Array, Function],
    thStyle: [String, Object, Function],
    tdClass: [String, Object, Array, Function],
    tdStyle: [String, Object, Function],
    sortBy: [Number, String],
    sortOrder: String,
    sortColor: String,
    sortActiveColor: String,
  },
  computed: {
    c_class() {
      return this.$mergeClass({
        's-table--border': this.border,
        's-table--stripe': this.stripe,
        [`s-table--align-${this.align}`]: this.align,
      }, this.custom_class);
    },
    c_style() {
      return this.$mergeStyle({
        height: this.$addUnit(this.height),
        borderColor: this.borderColor,
      }, this.custom_style);
    },
    header_style() {
      return this.$mergeStyle(this.headerStyle);
    },
    columnWidthStyleList() {
      return this.columns.map(item => {
        const style = {};
        if (this.$isDef(item.width)) {
          style.width = this.$addUnit(item.width);
        } else {
          style['flex-grow'] = '1';
        }
        if (this.$isDef(item.minWidth)) {
          style.minWidth = this.$addUnit(item.minWidth);
        }
        return style;
      });
    },
    thClassList() {
      const thClass = this.$getPropsFn('thClass');
      return this.columns.map((column, columnIndex) => {
        return this.$mergeClass({
          [`s-table__th--align-${column.align}`]: column.align,
        }, thClass ? thClass(column, columnIndex) : this.thClass);
      });
    },
    thStyleList() {
      const { columns, columnWidthStyleList, borderColor } = this;
      const thStyle = this.$getPropsFn('thStyle');
      return columns.map((column, columnIndex) => {
        return this.$mergeStyle(columnWidthStyleList[columnIndex], {
          borderColor: borderColor,
        }, thStyle ? thStyle(column, columnIndex) : this.thStyle);
      });
    },
  },
  methods: {
    hasSort(column) {
      return this.$isDef(column.sortBy);
    },
    isActiveSort(column, sortOrder) {
      return this.sortBy === column.sortBy && this.sortOrder === sortOrder;
    },
    getRowClass(row, rowIndex) {
      const rowClass = this.$getPropsFn('rowClass');
      return this.$mergeClass({
        's-table__tr--stripe': this.stripe && rowIndex % 2,
      }, rowClass ? rowClass(row, rowIndex) : this.rowClass);
    },
    getRowStyle(row, rowIndex) {
      const rowStyle = this.$getPropsFn('rowStyle');
      return this.$mergeStyle(rowStyle ? rowStyle(row, rowIndex) : this.rowStyle);
    },
    getTdClass(params) {
      const { column } = params;
      const tdClass = this.$getPropsFn('tdClass');
      return this.$mergeClass({
        [`s-table__td--align-${column.align}`]: column.align,
      }, tdClass ? tdClass(params) : this.tdClass);
    },
    getTdStyle(params) {
      const tdStyle = this.$getPropsFn('tdStyle');
      return this.$mergeStyle(this.columnWidthStyleList[params.columnIndex], {
        borderColor: this.borderColor,
      }, tdStyle ? tdStyle(params) : this.tdStyle);
    },
    onThClick(column, columnIndex) {
      this.$emit('th-click', column, columnIndex);
      if (this.hasSort(column)) {
        if (this.sortBy !== column.sortBy) {
          this.$emit('update:sortBy', column.sortBy);
          this.$emit('update:sortOrder', 'asc');
        } else {
          if (!this.sortOrder) {
            this.$emit('update:sortOrder', 'asc');
          } else if (this.sortOrder === 'asc') {
            this.$emit('update:sortOrder', 'desc');
          } else if (this.sortOrder === 'desc') {
            this.$emit('update:sortBy', '');
            this.$emit('update:sortOrder', '');
          }
        }
        this.$emit('sort', column, columnIndex);
      }
    },
    onTrClick(row, rowIndex) {
      this.$emit('tr-click', row, rowIndex);
    },
    onTdClick(params) {
      this.$emit('td-click', params);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
