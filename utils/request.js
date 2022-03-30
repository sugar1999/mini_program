import config from './config.js'
export default (url, data, method='GET') => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.host + url,
			data,
			method,
			success: (res) => {
				// console.log(res.data,'request')
				resolve(res.data)
			},
			fail: (error) => {
				// console.log(error,'request')
				reject(error);
			}
		})
	})
}