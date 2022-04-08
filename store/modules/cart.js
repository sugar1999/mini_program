import request from '../../utils/request.js'
const state = {
	cartList:  []
}

const mutations = {
	getCartList(state,cartList){
		state.cartList = cartList
	},
	// 添加至购物车
	changeCartList(state, shopItem) {
		let flag = false
		let updateItem = {}
		shopItem = JSON.parse(JSON.stringify(shopItem))
		//发请求修改数据
		state.cartList.forEach(item=>{
			if(item.id === shopItem.id){
				flag = true
				item.count++
				updateItem = item
			}
		})
		if(flag){
			request('/update',updateItem,'POST')
		}else{
			shopItem.count+=1
			shopItem.selected = true
			request('/add',shopItem,'POST')
		}
	},

	// 修改商品数量
	changeCount(state, {type,index}) {
		state.cartList[index].selected = state.cartList[index].selected ? 1 : 0
		if (type) {
			state.cartList[index].count += 1
			console.log(state.cartList[index].count)
			request('/update',state.cartList[index],'POST')
		} else {
			if(state.cartList[index].count>1){
				state.cartList[index].count -= 1
				request('/update',state.cartList[index],'POST')
			}else{
				request('/remove',state.cartList[index],'POST')
				state.cartList.splice(index, 1)
			}
		}
	},

	// 是否选中 
	changeSelected(state, {selected,index}) {
		let select = ''
		select = selected? 1 : 0
		state.cartList[index].selected = select;
		request('/update',state.cartList[index],'POST')
	},

	// 全选/全不选
	changeAll(state, allSelected) {
		allSelected = allSelected ? 1 : 0
		state.cartList.forEach(item => item.selected = allSelected)
		const reqData = {
			selected:allSelected,
			isAll:true
		}
		request('/update',reqData,'POST')
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
