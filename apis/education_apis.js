import {
	educationBaseUrl
} from '../common/config.js'

export function selectAllCourses(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${educationBaseUrl}/education/selectAllCourses`);
		uni.request({
			url: `${educationBaseUrl}/education/selectAllCourses`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有课程', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function selectAllCourseCategory(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${educationBaseUrl}/education/selectAllCourseCategory`);
		uni.request({
			url: `${educationBaseUrl}/education/selectAllCourseCategory`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('所有课程类别', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}


export function selectAllCourseByCategoryId(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${educationBaseUrl}/education/selectAllCourseByCategoryId`);
		uni.request({
			url: `${educationBaseUrl}/education/selectAllCourseByCategoryId`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('某类别所有课程', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}



export function selectCourseById(data) {
	return new Promise(function(reslove, reject) {
		console.log(`${educationBaseUrl}/education/selectCourseById`);
		uni.request({
			url: `${educationBaseUrl}/education/selectCourseById`,
			method: 'GET',
			data: data,
			success: res => {
				let result = res;
				console.log('获取某一课程', res, result.statusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}
