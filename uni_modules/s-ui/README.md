# s-ui

#### uni-app uni_modules 插件，集 组件，工具方法，接口请求，基础样式及个人常用封装为一体，便于项目开发，所有组件及全局样式都有独立命名前缀。

### 官方qq群 864429513

#### [gitee地址](https://gitee.com/sldt/s-ui)

#### [h5示例地址](https://sldt.gitee.io/s-ui)

#### 扫码体验 [s-ui示例] 小程序
<img src="https://gitee.com/sldt/s-ui/raw/master/static/imgs/mini_erweima.jpg" width="200" height="200" />

#### 扫码体验 [s-ui示例] H5
<img src="https://gitee.com/sldt/s-ui/raw/master/static/imgs/h5_erweima.png" width="200" height="200" />

### 使用说明

```js
// main.js中引入
import Vue from 'vue';
import sUi from '@/uni_modules/s-ui';

Vue.use(sUi, {
  // 是否给页面page全局混入一个onEmitPage钩子，使用this.$emitPage(pagePath,...args)触发
  useEmitPageMixin: true,
  // 是否替换uni默认的showLoading,hideLoading
  replaceUniLoading: true,
  // 是否替换uni默认的showToast,hideToast
  replaceUniToast: true,
  // 是否替换uni默认的showModal
  replaceUniModal: true,
  // NavBar 组件点击返回时，没有后退记录时默认reLaunch到的页面
  homePath: '/pages/index/index',
});

// 替换uni默认的showLoading，showToast，showModal需在页面上引入<s-toast/> <s-dialog/>
// 推荐直接使用<s-page custom-class="Index-Page">内容</s-page>
```

### scss变量需要在uni.scss中引入

```scss
@import '@/uni_modules/s-ui/styles/var.scss';
@import '@/uni_modules/s-ui/styles/component-var.scss';
```

### 全局公用样式

```scss
@import "@/uni_modules/s-ui/styles/index.scss";
```

### 组件在page.json中使用easycom引入

```json
"easycom": {
  "^s-(.*)": "@/uni_modules/s-ui/components/s-$1/s-$1.vue"
}
```

### 工具方法使用

```js
import formatDate from "@/uni_modules/s-ui/utils/formatDate";
```

### 接口请求

```js
import createRequest from "@/uni_modules/s-ui/plugins/createRequest";

// 简单使用
const request = createRequest({
  baseURL: 'https://www.baidu.com'
})

// 使用方式
request.get('/xxx/xxx', {
  a: 1,
  b: 2
}, {
  loadingText: '请求中'
}).then(res => {
  console.log(res.data)
}).catch(err => {
  console.log(err.message)
})

// 全部默认参数
const request = createRequest({
  // uni自带
  header: {}, // 请求头
  method: 'GET', // 请求方式
  url: '', // 接口路径
  timeout: 20 * 1000, // 超时时间
  // 自定义添加
  baseURL: '', // 域名
  urlParams: {}, // 接口路径中的参数
  useDefaultLoading: true, // 是否使用自定义内置loading
  showLoading: true, // 是否显示加载loading
  loadingText: '请求中', // loading 文字
  loadingTime: 200, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
  useDefaultToast: true, // 是否使用自定义内置toast
  toastTime: 2000, // 提示时间
  showError: true, // 是否显示错误提示
  delayTime: 0, // 延时多久发起请求
  getTask(task) {}, // 获取请求返回对象
  // 判断请求状态是成功还是失败
  validateStatus(response) {
    return response.statusCode === 200;
  }
}, {
  /**
   * @description: 发起请求前拦截器
   * @param {object} options
   * @return {?object|Promise}
   */
  request(options) {
    return options;
  },
  /**
   * @description: 请求成功拦截器
   * @param {object}
   * @return {object|Promise}
   */
  success({ options, data, createError, createSuccess }) {
    return createSuccess(data);
  },
  /**
   * @description: 请求失败拦截器
   * @param {object}
   * @return {object|Promise}
   */
  fail({ options, error, createError, createSuccess }) {
    return error;
  },
})
```
