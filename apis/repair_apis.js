import { repairBaseUrl } from '../common/config.js'

export function addFixRequest(data) {
	console.log("新增报修申请")
	console.log(data)
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${repairBaseUrl}/fix/addFixRequest`,
			header: {
				"authorization": token
			},
			method: 'POST',
			data: data,
			success: res=> {
				let result =res;
				console.log('123', res, result.statusCode);
				reslove(result);
			},
			fail: () => {
				console.log(123) 
			},
			complete: () => {}
		})
	})
}

export function selectUserByAccount(data){
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${repairBaseUrl}/user/selectUserByAccount`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('用户的id', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function allFixDetailsByUserId(data){
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${repairBaseUrl}/fix/allFixDetailsByUserId`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('用户的全部工单详情', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function allFixDetails(data){
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${repairBaseUrl}/fix/allFixDetails`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('所有用户的全部工单详情', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function analysisTimeline(data){
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${repairBaseUrl}/fix/analysisTimeline`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('根据工单id,获得并分析时间线', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}