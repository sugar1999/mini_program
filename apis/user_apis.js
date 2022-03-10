import {
	userBaseUrl
} from '../common/config.js'

export function selectUserByAccount(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${userBaseUrl}/user/selectUserByAccount`);
		uni.request({
			url: `${userBaseUrl}/user/selectUserByAccount`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('第一次登陆', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}



export function selectUserByUid(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${userBaseUrl}/user/selectUserByUid`);
		uni.request({
			url: `${userBaseUrl}/user/selectUserByUid`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('根据uid获取用户信息', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}
