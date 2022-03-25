import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import cart from './modules/cart'


Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		index,
		cart
	}
})

