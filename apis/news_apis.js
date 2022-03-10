import { cureBaseUrl } from '../common/config.js'

export function selectInformationByType(data){
	return new Promise(function(reslove, reject){
		uni.request({
			url: `${cureBaseUrl}/selectInformationByType`,
			method: 'GET',
			data: data,
			success: res=> {
				let result =res;
				console.log('全部的新闻', res, result.sratusCode);
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		})
	})
	
}