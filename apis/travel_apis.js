import {
	travelBaseUrl
} from '../common/config.js'


export function allHotelList(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${travelBaseUrl}/hotel/allList`);
		uni.request({
			url: `${travelBaseUrl}/hotel/allList`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有民宿', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function allRestList(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${travelBaseUrl}/rest/allList`);
		uni.request({
			url: `${travelBaseUrl}/rest/allList`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有餐饮', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}
