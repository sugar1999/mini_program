import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// import {
// 	http
// } from "../common/http.js" 

export const store = new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('userInfo') || {},
		token: uni.getStorageSync('token') || '',
		city: uni.getStorageSync('city') || '北京市',
		start: {},
		end: {},
		hyend: {},
		hyaddress: uni.getStorageSync('hyaddress') ||[],
		height: 30, //状态栏高度
		tabList: [],
		address: uni.getStorageSync('address') || [], //默认搜索的地址
		city1: '',
		city2: '',
	},
	mutations: {
		getCity1(state, city1) {
			state.city1 = city1
		},
		getCity2(state, city2) {
			state.city2 = city2
		},
		getTab(state, tabList) {
			state.tabList = tabList
		},
		getHeight(state, height) {
			state.height = height
		},
		getStart(state, start) {
			state.start = start
			state.city1 = start.city
			let flag = false;
			state.address.forEach(item => {
				if (item.address == start.address) {
					flag = true
				}
			})
			if (!flag) {
				if (state.address.length < 5) {
					state.address.unshift(start)
				} else {
					state.address.pop()
					state.address.unshift(start)
				}
			}
			uni.setStorageSync('address', state.address)
		},
		getEnd(state, end) {
			state.end = end
			state.city2 = end.city
			let flag = false;
			state.address.forEach(item => {
				if (item.address == end.address) {
					flag = true
				}
			})
			if (!flag) {
				if (state.address.length < 5) {
					state.address.unshift(end)
				} else {
					state.address.pop()
					state.address.unshift(end)
				}
			}
			uni.setStorageSync('address', state.address)
		},
		getHyEnd(state, end) {
			state.hyend = end
			if (Object.keys(end).length > 0) {
				let flag = false;
				state.address.forEach(item => {
					if (item.address == end.address) {
						flag = true
					}
				})
				if (!flag) {
					if (state.address.length < 5) {
						state.address.unshift(end)
					} else {
						state.address.pop()
						state.address.unshift(end)
					}
				}
				uni.setStorageSync('address', state.address)
			}
		},
		getHyAddress(state, addr) {
			state.hyaddress.push(addr)
			uni.setStorageSync('hyaddress', state.hyaddress)
		},
		delHyAddress(state, index) {
			state.hyaddress.splice(index,1)
			uni.setStorageSync('hyaddress', state.hyaddress)
		},
		getCity(state, city) {
			state.city = city
			uni.setStorageSync('city', state.city)
		},
		getUserInfo(state, info) {
			console.log(state);
			state.userInfo = info
			state.token = state.userInfo.token
			uni.setStorageSync('userInfo', state.userInfo)
			uni.setStorageSync('token', state.userInfo.token)
		},
		exitLogin(state) {
			state.userInfo = {}
			state.token = ''
			uni.setStorageSync('userInfo', state.userInfo)
			uni.setStorageSync('token', state.userInfo.token)
		},
	},
	getters: {},
	// this.$store.dispatch('updateUserInfo')
	actions: {
		updateUserInfo({
			commit
		}) {
			http('/addons/ddrive/user/userInfo', "POST").then(data => {
				commit('getUserInfo', data)
			})
		}
	}
})
