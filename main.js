import Vue from 'vue'
import App from './App'
import store from './store/index.js'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
import TnCustom from './components/TnCustom/TnCustom.vue'
Vue.component('tn-custom', TnCustom);


// 引入:uView
import uView from "uview-ui";
Vue.use(uView);



// 全局组件
import empty from	'./components/empty.vue'
Vue.component('empty',empty)


import './font_support/iconfont.css'



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()