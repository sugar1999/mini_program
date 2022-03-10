<template>
  <view :id="$sUid" class="s-index-list" :class="custom_class" :style="custom_style">
    <slot />
    <!-- 右边索引滑块 -->
    <view
      v-if="indexList.length"
      class="s-index-list__sidebar"
      :style="sidebar_style"
      @touchstart.stop.prevent="onTouchMove"
      @touchmove.stop.prevent="onTouchMove"
      @touchend.stop.prevent="onTouchStop"
      @touchcancel.stop.prevent="onTouchStop"
    >
      <view
        v-for="(value, index) of indexList"
        :key="index"
        class="s-index-list__index"
        :class="{ 's-index-list__index--active': activeIndexValue === value }"
        :style="{ color: activeIndexValue === value ? activeColor : '' }"
      >
        {{ value }}
      </view>
    </view>
    <!-- 滑动索引时提示 -->
    <view v-if="alertIndexValue" class="s-index-list__alert" :style="alert_style">{{ alertIndexValue }}</view>
  </view>
</template>

<script>
import componentMixin from '../../mixins/componentMixin';

function getDefaultIndexList() {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList;
};

/**
 * s-index-list 索引列表
 * @description 需要监听页面的onPageScroll事件，给组件传入scrollTop
 * @property {Array<String|Number>} indexList 索引字符列表，默认[A-Z]
 * @property {Boolean} sticky 是否开启锚点自动吸顶
 * @property {Number|String} scrollTop 当前滚动高度，自定义组件无法获得滚动事件，所以依赖接入方传入
 * @property {Number|String} offsetTop 锚点自动吸顶时与顶部的距离，单位rpx
 * @property {Number|String} zIndex 锚点吸顶时的层级
 * @property {String} activeColor 锚点和右边索引字符高亮颜色
 * @property {String|Object} sidebarStyle 右边索引条的样式
 * @property {Boolean} showAlert 右边索引滑动时是否显示弹框提示
 * @property {String|Object} alertStyle 弹框提示样式
 * @event {Function} select 选中右边索引字符时触发
 * @example <s-index-list :scroll-top="scrollTop"></s-index-list>
 */
export default {
  name: 'SIndexList',
  mixins: [componentMixin],
  props: {
    indexList: {
      type: Array,
      default: () => getDefaultIndexList(),
    },
    sticky: Boolean,
    scrollTop: {
      type: Number,
      default: -1,
    },
    offsetTop: {
      type: [Number, String],
      default: 0,
    },
    zIndex: [Number, String],
    activeColor: String,
    sidebarStyle: [String, Object],
    showAlert: {
      type: Boolean,
      default: true,
    },
    alertStyle: [String, Object],
  },
  data: () => ({
    windowTop: 0,
    activeAnchorIndex: -1,
    touchmove: false,
    touchmoveIndex: -1,
    anchorIndexList: [],
  }),
  computed: {
    offset_top() {
      return this.$toPx(this.offsetTop);
    },
    stickyTop() {
      return this.offset_top + this.windowTop;
    },
    nextZindex() {
      const zIndex = parseInt(this.zIndex);
      return zIndex > 0 ? zIndex + 1 : '';
    },
    sidebar_style() {
      return this.$mergeStyle({
        zIndex: this.nextZindex,
      }, this.sidebarStyle);
    },
    alert_style() {
      return this.$mergeStyle({
        zIndex: this.nextZindex,
      }, this.alertStyle);
    },
    alertIndexValue() {
      return this.showAlert && this.touchmove ? this.indexList[this.touchmoveIndex] : '';
    },
    activeIndexValue() {
      return this.anchorIndexList[this.activeAnchorIndex];
    },
    refreshState() {
      return [
        this.scrollTop,
        this.offsetTop,
        this.sticky,
        this.indexList,
      ];
    },
  },
  watch: {
    refreshState() {
      this.refresh();
    },
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    this.windowTop = systemInfo.windowTop || 0;
    this.anchorList = [];
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    refresh() {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.timer = null;
        this.setRect().then(this.onScroll);
      });
    },
    setRect() {
      return Promise.all([
        this.setListRect(),
        this.setSiderbarRect(),
        this.setAnchorsRect(),
      ]);
    },
    setListRect() {
      return this.$getRect(`#${this.$sUid}`).then(rect => {
        Object.assign(this, {
          height: rect.height,
          top: rect.top + this.scrollTop,
        });
      });
    },
    setSiderbarRect() {
      return this.$getRect(`#${this.$sUid} .s-index-list__sidebar`).then(rect => {
        if (rect) {
          this.sidebar = {
            height: rect.height,
            top: rect.top,
          };
        }
      });
    },
    setAnchorsRect() {
      return Promise.all(this.anchorList.map(anchor => {
        return anchor.$getRect(`#${anchor.$sUid}`).then(rect => {
          Object.assign(anchor, {
            width: rect.width,
            height: rect.height,
            top: rect.top - this.offset_top,
          });
        });
      }));
    },
    getActiveAnchorIndex() {
      const { anchorList, sticky } = this;
      for (let i = anchorList.length - 1; i >= 0; i--) {
        const preAnchorHeight = i > 0 ? anchorList[i - 1].height : 0;
        const reachTop = sticky ? preAnchorHeight : 0;
        if (Math.floor(reachTop) >= Math.floor(anchorList[i].top)) {
          return i;
        }
      }
      return -1;
    },
    onScroll() {
      const { scrollTop, sticky, stickyTop, anchorList } = this;
      if (!anchorList.length) return;
      const activeAnchorIndex = scrollTop > -1 ? this.getActiveAnchorIndex() : -1;
      this.activeAnchorIndex = activeAnchorIndex;
      if (sticky) {
        const isActiveAnchorSticky = activeAnchorIndex > -1 ? anchorList[activeAnchorIndex].top <= 0 : false;
        anchorList.forEach((item, index) => {
          if (index === activeAnchorIndex) {
            const wrapStyle = {};
            const anchorStyle = {
              color: this.activeColor,
            };
            if (isActiveAnchorSticky) {
              Object.assign(wrapStyle, {
                height: `${item.height}px`,
              });
              Object.assign(anchorStyle, {
                position: 'fixed',
                width: `${item.width}px`,
                top: `${stickyTop}px`,
                zIndex: this.zIndex,
              });
            }
            item.active = true;
            item.prevActive = false;
            item.wrapStyle = wrapStyle;
            item.anchorStyle = anchorStyle;
          } else if (index === activeAnchorIndex - 1) {
            const currentAnchor = anchorList[index];
            const currentOffsetTop = currentAnchor.top;
            const targetOffsetTop = index === anchorList.length - 1 ? this.top : anchorList[index + 1].top;
            const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
            const translateY = parentOffsetHeight - currentAnchor.height;
            const anchorStyle = {
              position: 'relative',
              transform: `translate3d(0, ${translateY}px, 0)`,
              color: this.activeColor,
              zIndex: this.zIndex,
            };
            item.active = true;
            item.prevActive = true;
            item.anchorStyle = anchorStyle;
          } else {
            item.active = false;
            item.prevActive = false;
            item.anchorStyle = '';
            item.wrapStyle = '';
          }
        });
      }
    },
    onTouchMove(event) {
      const length = this.indexList.length;
      if (!length) return;
      this.touchmove = true;
      const touch = event.touches[0];
      const itemHeight = this.sidebar.height / length;
      const clientY = touch.clientY;
      const index = Math.max(0, Math.min(Math.floor((clientY - this.sidebar.top) / itemHeight), length - 1));
      this.touchmoveIndex = index;
      this.scrollToAnchor(index);
    },
    onTouchStop() {
      this.touchmove = false;
      this.scrollToAnchorIndex = null;
    },
    scrollToAnchor(index) {
      if (this.scrollToAnchorIndex === index) return;
      this.scrollToAnchorIndex = index;
      const anchor = this.anchorList.find(item => item.index === this.indexList[index]);
      if (anchor) {
        this.$emit('select', anchor.index);
        uni.pageScrollTo({
          duration: 0,
          scrollTop: anchor.top + this.scrollTop,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
