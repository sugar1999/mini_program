import {
	baseUrl
} from '../common/config.js'

//获取所有选举类型
export function selectAllVoteType(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${baseUrl}/vote/allVoteType`);
		uni.request({
			url: `${baseUrl}/vote/allVoteType`,
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

export function voteDetailsByType(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/vote/voteDetailsByType`,
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

export function voteDetailById(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/vote/voteDetailById`,
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

export function votePersonDetailsByVoteInfoId(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/vote/votePersonDetailsByVoteInfoId`,
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


export function votePersonDetailsById(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/vote/votePersonDetailsById`,
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



export function updatePersonVote(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/vote/updatePersonVote`,
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

export function selectVoteRecord(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/vote/selectVoteRecord`,
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


export function addVoteRecord(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/vote/addVoteRecord`,
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
