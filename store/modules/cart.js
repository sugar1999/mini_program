import request from '../../utils/request.js'
import serverData from '../../utils/serveData.js'
const state = {
	// cartList: [{
	// 		"count": 3,
	// 		"showIndex": 1,
	// 		"superCategoryId": 1005000,
	// 		"selected": true,
	// 		"wapBannerUrl": "https://s1.ax1x.com/2022/03/23/q1Ucs1.png",
	// 		"name": "樱桃",
	// 		"retailPrice": 20.9,
	// 		"id": 109243003,
	// 		"frontDesc": "樱桃",
	// 		"type": 0,
	// 		"subCateList": []
	// 	},
	// 	{
	// 		"count": 1,
	// 		"showIndex": 2,
	// 		"superCategoryId": 1005000,
	// 		"wapBannerUrl": "https://s1.ax1x.com/2022/03/23/q1UBiF.png",
	// 		"name": "香蕉",
	// 		"retailPrice": 4.99,
	// 		"selected": true,
	// 		"id": 109243004,
	// 		"frontDesc": "大大大香蕉",
	// 		"type": 0,
	// 		"subCateList": []
	// 	}
	// ], // 购物车
	cartList:  []
}



const mutations = {
	// 添加至购物车
	changeCartList(state, shopItem) {
		shopItem = JSON.parse(JSON.stringify(shopItem))
		//发请求修改数据
		serverData('/add-shoppingCart',shopItem,'POST')
		let item = state.cartList.find(item => item.id === shopItem.id)
		// 如果之前有
		if (item) {
			// console.log('xx')
			item.count += 1;
		} else { // 如果之前没有
			shopItem.count = 1;
			shopItem.selected = true;
			state.cartList.push(shopItem);
		}
	},

	// 修改商品数量
	changeCount(state, {type,index}) {
		if (type) {
			state.cartList[index].count += 1
			serverData('/add-shoppingCart',{type,index},'POST')
		} else {
			serverData('/add-shoppingCart',{type,index},'POST')
			if (state.cartList[index].count > 1) {
				state.cartList[index].count -= 1
			} else {
				// 方案一: 数量为0， 不移除
				// state.cartList[index].count = 0
				// 方案二: 直接从购物车移除
				state.cartList.splice(index, 1)

			}
		}
	},

	// 是否选中 
	changeSelected(state, {selected,index}) {
		state.cartList[index].selected = selected;
		serverData('/select-shoppingCart',{selected,index},'POST')
	},

	// 全选/全不选
	changeAll(state, allSelected) {
		state.cartList.forEach(item => item.selected = allSelected)
		serverData('/selectAll-shoppingCart',{allSelected},'POST')
	},
	
	getCartListData(state, cartList){
		state.cartList = cartList
	}
		
}

const actions = { }

const getters = {
	isAllSelected(state) {
		let result = true;
		state.cartList.forEach((item) => !item.selected && (result = false))
		return result;
	},
	totalPrice(state) {
		return state.cartList.reduce((pre, item) => {
			return pre += item.selected ? item.retailPrice * item.count : 0//计算选中的总价
			// return pre += item.retailPrice * item.count
		}, 0)
	},

	totalCount(state) {
		return state.cartList.reduce((pre, item) => {
			return pre += item.count
		}, 0)
	}
}


export default {
	state,
	mutations,
	actions,
	getters
}
