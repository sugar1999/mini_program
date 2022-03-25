import {
	CHANGEINDEXDATA
} from '../mutation-type.js'

import request from '../../utils/request.js'

const state = {
	indexData: {}
}


const mutations = {
	[CHANGEINDEXDATA](state, indexData){
		state.indexData = indexData
	}
}


const actions = {
	async getIndexData({commit}){
		let indexDataResult = await request('/getIndexData');
		// console.log('action: ', indexDataResult)
		indexDataResult.code === 0 && commit(CHANGEINDEXDATA, indexDataResult.data)	
	}
}


export default {
	state,
	mutations,
	actions
}