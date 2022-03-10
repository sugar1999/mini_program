<template>
	<view class="fui-wrap">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">挂号查看</block>
		</cu-custom>
		<view class="fui-page__hd">
			<view class="fui-page__title">挂号查看</view>
			<view class="fui-page__desc">下面为您的挂号信息</view>
		</view>

		<view class="fui-page__bd">
			
			<view class="fui-section__title">挂号科室</view>
			<fui-input borderTop disabled :value="department"></fui-input>
			
			<view class="fui-section__title">就诊地点</view>
			<fui-input borderTop disabled :value="location"></fui-input>
			
			<view class="fui-section__title">目前挂号号码</view>
			<fui-input borderTop disabled :value="orderid"></fui-input>
		</view>
	</view>
</template>

<script>
	import {
		selectIdByAccount,selectOrderById
	} from '@/apis/cure_apis.js'
	export default {
		data() {
			return {
				department: '',
				location: '',
				account: uni.getStorageSync('userInfo').nickName,
				villagersid: '',
				orderid: ''
			}
		},
		onLoad: function () {
			let Account = {account: this.account}
			selectIdByAccount(Account).then((res) => {
				if (res.statusCode == "200")
				{
					this.villagersid = res.data
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
				let uid = {uid: this.villagersid}
				selectOrderById(uid).then((res) => {
					if (res.statusCode == "200")
					{
						this.orderid = res.data.orderid
						this.location = res.data.hospital_location_name
						this.department = res.data.hospital_department
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
