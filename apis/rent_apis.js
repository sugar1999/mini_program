import {
	rentBaseUrl
} from '../common/config.js'

//获取所有选举类型
export function selectRentInformationByAllSearchItems(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${rentBaseUrl}/rent/selectRentInformationByAllSearchItems`);
		uni.request({
			url: `${rentBaseUrl}/rent/selectRentInformationByAllSearchItems`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有选举类型', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function selectRentInformationByHouseId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${rentBaseUrl}/rent/selectRentInformationByHouseId`);
		uni.request({
			url: `${rentBaseUrl}/rent/selectRentInformationByHouseId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有选举类型', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function insertIntoRentAppointment(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${rentBaseUrl}/rent/insertIntoRentAppointment`,
			header: {
				"authorization": token
			},
			method: 'POST',
			data: data,
			success: res => {
				let result = res;
				console.log('手机绑定验证', res);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function selectRentInformationByUserId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${rentBaseUrl}/rent/selectRentInformationByUserId`);
		uni.request({
			url: `${rentBaseUrl}/rent/selectRentInformationByUserId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有选举类型', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function insertIntoRentInformation(data) {
	console.log(data);
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${rentBaseUrl}/rent/insertIntoRentInformation`,
			header: {
				"authorization": token
			},
			method: 'POST',
			data: data,
			success: res => {
				let result = res;
				console.log('手机绑定验证', res);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function selectRentInformationByDescribe(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${rentBaseUrl}/rent/selectRentInformationByDescribe`);
		uni.request({
			url: `${rentBaseUrl}/rent/selectRentInformationByDescribe`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('模糊搜索', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function selectRentAppointmentByHouseId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${rentBaseUrl}/rent/selectRentAppointmentByHouseId`);
		uni.request({
			url: `${rentBaseUrl}/rent/selectRentAppointmentByHouseId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('模糊搜索', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}