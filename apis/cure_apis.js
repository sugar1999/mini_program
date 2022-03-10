import { cureBaseUrl } from '../common/config.js'

export function selectIdByAccount(Account){
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectIdByAccount`,
			method: 'GET',
			data: Account,
			success: res=> {
				let result =res;
				console.log('用户的uid', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

//保存村民问医生的问题
export function saveQuestion(data) {
	console.log(123)
	console.log(data)
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${cureBaseUrl}/saveQuestion`,
			header: {
				"authorization": token
			},
			method: 'POST',
			data: data,
			fail: () => {},
			complete: () => {}
		})
	})
}

export function selectDepartment(data){
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectDepartment`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('医院的科室', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function selectDoctorDetailByDepartment(data){
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectDoctorDetailByDepartment`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('某科室的医生们的信息', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function selectWaitNumber(data){
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectWaitNumber`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('某科室的等待人数', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function selectUserByAccount(data){
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectUserByAccount`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('村民详细信息', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function selectHospitalLocation(data){
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectHospitalLocation`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('某科室地点信息', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function saveOrder(data) {
	console.log(data)
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${cureBaseUrl}/saveOrder`,
			header: {
				"authorization": token
			},
			method: 'POST',
			data: data,
			fail: () => {},
			complete: () => {}
		})
	})
}

export function selectOrderById(data) {
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectOrderById`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('用户挂号信息', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function doctorAnswerCheck(data) {
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/doctorAnswerCheck`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('所有医生的回答', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}
export function selectAnswerById(data) {
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectAnswerById`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('某一医生的回答', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function insertOut(data) {
	console.log(data)
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${cureBaseUrl}/insertOut`,
			header: {
				"authorization": token
			},
			method: 'POST',
			data: data,
			fail: () => {},
			complete: () => {}
		})
	})
}
export function selectAllOut(data) {
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectAllOut`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('村民查询全部出诊预约单', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}

export function selectOneOut(data) {
	console.log(data)
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectOneOut`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('村民查询某一出诊预约单', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}