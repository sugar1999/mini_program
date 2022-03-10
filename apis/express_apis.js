import {
	baseUrl
} from '../common/config.js'

export function unsignedPackageByUserIdAndOrderTime(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/unsignedPackageByUserIdAndOrderTime`);
		uni.request({
			url: `${baseUrl}/express/unsignedPackageByUserIdAndOrderTime`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有未签收', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function signedPackageByUserIdAndOrderTime(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/signedPackageByUserIdAndOrderTime`);
		uni.request({
			url: `${baseUrl}/express/signedPackageByUserIdAndOrderTime`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有已签收', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function selectNotAppointmentPackageByUserId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/selectNotAppointmentPackageByUserId`);
		uni.request({
			url: `${baseUrl}/express/selectNotAppointmentPackageByUserId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有未预约', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function packageByPackageId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/packageByPackageId`);
		uni.request({
			url: `${baseUrl}/express/packageByPackageId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有未预约', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function postUserIndoorBooking(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/express/postUserIndoorBooking`,
			header: {
				"authorization": token
			},
			method: 'POST',
			data: data,
			success: res => {
				let result = res;
				console.log('预约上传', res);
				reslove(result);
			},
			fail: () => {},
			complete: () => {

			}
		})
	})
}



export function indoorBookedPackageByUserIdAndOrderTime(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/indoorBookedPackageByUserIdAndOrderTime`);
		uni.request({
			url: `${baseUrl}/express/indoorBookedPackageByUserIdAndOrderTime`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有派送中', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}



export function indoorFinishedPackageByUserIdAndOrderTime(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/indoorFinishedPackageByUserIdAndOrderTime`);
		uni.request({
			url: `${baseUrl}/express/indoorFinishedPackageByUserIdAndOrderTime`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有已完成', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}



export function bookedDeliveryRequestByPackageId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/bookedDeliveryRequestByPackageId`);
		uni.request({
			url: `${baseUrl}/express/bookedDeliveryRequestByPackageId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有已预约派送中', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function finishedDeliveryRequestByPackageId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/finishedDeliveryRequestByPackageId`);
		uni.request({
			url: `${baseUrl}/express/finishedDeliveryRequestByPackageId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有已完成', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function selectNoOrderBookedPackageByUserId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/selectNoOrderBookedPackageByUserId`);
		uni.request({
			url: `${baseUrl}/express/selectNoOrderBookedPackageByUserId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有已预约', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function selectNoOrderBookedPackageByPackageId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/express/selectNoOrderBookedPackageByPackageId`);
		uni.request({
			url: `${baseUrl}/express/selectNoOrderBookedPackageByPackageId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有已预约未接单单个包裹', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}
