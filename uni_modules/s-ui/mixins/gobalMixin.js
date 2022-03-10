/*
 * @Description: 全局mixin
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-02-23 14:35:39
 * @LastEditTime: 2021-04-14 15:06:03
 * @LastEditors: 无痕
 */
import Toast from '../utils/toast';
import Dialog from '../utils/dialog';

const state = {
  currentPagePath: '',
};

const gobalMixin = {
  data() {
    return {
      S_MIXIN_STATE: state,
    };
  },
  computed: {
    $sIsCurrentPage() {
      return state.currentPagePath === this.$root?.$mp?.page?.route;
    },
  },
  onShow() {
    state.currentPagePath = this.$root?.$mp?.page?.route;
  },
  onUnload() {
    Toast.clear();
    Dialog.clear();
  },
};

export default gobalMixin;
