<template>
	<view class="fui-wrap">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">上门进度</block>
		</cu-custom>
		<view class="fui-page__hd">
			<view class="fui-page__title">上门进度查看</view>
			<view class="fui-page__desc">下面为您的预约信息</view>
		</view>

		<view class="fui-page__bd">
			
			<view class="fui-section__title">预约科室</view>
			<fui-input borderTop disabled :value="department"></fui-input>
			
			<view class="fui-section__title">受诊医生</view>
			<fui-input borderTop disabled :value="doctorname"></fui-input>
			
			<view class="fui-section__title">目前上门进度</view>
			<fui-input borderTop disabled :value="situation"></fui-input>
		</view>
	</view>
</template>

<script>
	import {
		selectOneOut,selectOrderById
	} from '@/apis/cure_apis.js'
	export default {
		data() {
			return {
				department: '',
				doctorname: '',
				situation: '',
				hospital_out_id: ''
			}
		},
	onLoad: function (options) {
		    this.hospital_out_id=options.hospital_out_id
		    console.log("hospital_out_id:"+this.hospital_out_id)
			let data = { 
				hospital_out_id: this.hospital_out_id
			}
			selectOneOut(data).then((res) => {
				if (res.statusCode == "200")
				{
					this.department = res.data.department
					this.doctorname = res.data.doctorname
					this.situation = res.data.situation
					console.log(res.data);
					uni.hideLoading();
				}
				else
				{
					uni.hideLoading();
					uni.showToast({
					title: '获取失败',
					duration: 2000,
					icon: 'error'
					});
				}
			})
		},
		methods: {

		}
	}
</script>

<style>
	.page {
		font-weight: normal;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-left__icon {
		padding-right: 24rpx;
	}
</style>
