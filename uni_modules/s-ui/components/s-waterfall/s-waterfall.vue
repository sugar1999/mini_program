<template>
  <view :id="$sUid" class="s-waterfall" :class="custom_class" :style="custom_style">
    <view v-for="(list, index) of columnList" :key="index" class="s-waterfall__column" :style="columnStyleList[index]">
      <slot :scopeParams="scopeParams" :list="list" :index="index" />
    </view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';
/**
 * s-waterfall 瀑布流
 * @description 瀑布流，自动分发各列数据，实现错位排列
 * @property {Number|String} column 列数
 * @property {Number|String} gutter 间距
 * @property {Function} loadItem (item,callback) 自定义加载每个item，使用callback触发加载完毕
 * @example <s-waterfall ref="waterfall"></s-waterfall>
 */
export default {
  name: 'SWaterfall',
  mixins: [componentMixin],
  props: {
    column: {
      type: [Number, String],
      default: 2,
    },
    gutter: {
      type: [Number, String],
      default: 20,
    },
    loadItem: Function,
  },
  data: () => ({
    columnList: [],
  }),
  computed: {
    columnStyleList() {
      return this.columnList.map((_, index) => this.$mergeStyle({
        marginLeft: index > 0 ? this.$addUnit(this.gutter) : '',
      }));
    },
  },
  watch: {
    column() {
      this.init();
    },
  },
  created() {
    this.list = [];
    this.resetId = 0;
    this.reset();
  },
  methods: {
    init() {
      const data = [...this.list];
      this.reset();
      this.push(data);
    },
    reset() {
      const columnList = [];
      const column = parseInt(this.column);
      for (let i = 0; i < column; i++) {
        columnList.push([]);
      }
      this.list = [];
      this.columnList = columnList;
      this.promise = Promise.resolve();
      this.resetId++;
    },
    push(data) {
      if (!this._isMounted || this._isDestroyed || !this.columnList.length) return;
      const resetId = this.resetId;
      const loadItem = this.$getPropsFn('loadItem');
      this.list.push(...data);
      this.$nextTick(() => {
        if (resetId === this.resetId) {
          data.forEach(item => {
            this.promise = this.promise.then(() => new Promise(resolve => {
              if (resetId === this.resetId) {
                this.$getRect(`#${this.$sUid} .s-waterfall__column`, true).then(rects => {
                  if (resetId === this.resetId) {
                    const heights = rects.map(item => item.height);
                    const index = heights.indexOf(Math.min(...heights));
                    this.columnList[index].push(item);
                    if (loadItem) {
                      loadItem(item, resolve);
                    } else {
                      this.$nextTick(resolve);
                    }
                  } else {
                    resolve();
                  }
                });
              } else {
                resolve();
              }
            }));
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
