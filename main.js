import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
import TnCustom from './components/TnCustom/TnCustom.vue'
Vue.component('tn-custom', TnCustom);

// 时间格式过滤器
// import './common/filter.js';//过滤器配置



// 引入:uView
// main.js 文件
import uView from "uview-ui";
Vue.use(uView);


// <div class="time">{{item.createtime |timeFilter(第二个参数,第三个参数)}} 至 {{item.endtime |timeFilter}}</div>


// 全局组件
import empty from	'./components/empty.vue'
Vue.component('empty',empty)

import {store} from './store/index'
// Vue.prototype.$store=store

// 全局引入http
// import {http} from './common/http.js'
// Vue.prototype.$http=http

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store,
})
app.$mount()