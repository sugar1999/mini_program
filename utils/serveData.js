import config from './config.js'
export default (url, data, method) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.host + url,
			data:data,
			method:method,
			success: (res) => {
				// console.log(res.data,'serveData')
				resolve(res.data)
			},
			fail: (error) => {
				// console.log(error,'serveData')
				reject(error);
			}
		})
	})
}