<template>
	<view class="fui-wrap">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">预约挂号</block>
		</cu-custom>
		<view class="fui-page__hd">
			<view class="fui-page__title">预约挂号</view>
			<view class="fui-page__desc">请填写自身的详细信息，完成预约取号</view>
		</view>

		<view class="fui-page__bd">
			<picker @change="bindPickerChange" :range="array" class="picker_border">
				<view class="fui-section__title">请选择科室: {{department}}</view>
			</picker>
			<picker @change="bindPickerChange2" :range="array2" class="picker_border">
				<view class="fui-section__title">请选择就诊地点: {{location}}</view>
			</picker>
			<view class="fui-section__title">就诊地点当前等待人数:{{humen}}</view>
			
			<view class="fui-section__title">姓名</view>
			<fui-input borderTop disabled="true" :value="user.name"></fui-input>
			<view class="fui-section__title">身份证号</view>
			<fui-input borderTop maxlength="18" disabled="true" :value="user.id"></fui-input>
			<view class="fui-section__title">手机号码</view>
			<fui-input :bottomLeft="0" maxlength="11" disabled="true" :value="user.phone"></fui-input>
		</view>
		<view>
			<button class="blueBtn cu-btn bg-blue shadow lg" @click="saveOrder">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		selectUserByAccount,selectDepartment,selectHospitalLocation,saveOrder,selectOrderById
	} from '@/apis/cure_apis.js'
	export default {
		data() {
			return {
				humen:'',
				array: [],
				index: 0,
				department: '',
				account: uni.getStorageSync('userInfo').nickName,
				user: [],
				array2: [],
				index2: 0,
				location: '',
				locationDetail: [],
				hospital_location_id :'',
				
			}
		},
		onLoad() {
			let data = {account: this.account}
			selectUserByAccount(data).then((res) => {
				if(res.statusCode == "200")
				{
					this.user = res.data
					console.log("user="+this.user);
					uni.hideLoading();
				}
				else
				{
					console.log('获取失败')
					uni.hideLoading();
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					})
				}
				let id = {uid: this.user.uid}
				selectOrderById(id).then((res) => {
					if(res.statusCode == '200')
					{
						if(res.data!=[]){
							uni.showModal({
								title: '提示',
								content: '您已挂号',
								success: function (res) {
									if(res.confirm){
										
									}
									else if(res.cancel){
										
									}
									uni.navigateBack();
								},
								fail: function (res) {
									
								}
							});
						}
					}
					else{
						console.log('获取失败')
						uni.hideLoading();
						uni.showToast({
							title: '系统出错',
							duration: 2000,
							icon: 'error'
						})
					}
				})
			})
			var data2 = {};
			selectDepartment(data2).then((res) => {
				if(res.statusCode == "200")
				{
					this.array = res.data
					console.log(res.data);
					uni.hideLoading();
				}
				else
				{
					console.log('获取失败')
					uni.hideLoading();
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					})
				}
			})
		},
		methods: {
			//下拉框
			bindPickerChange: function(e) {		//改变的事件名
			
				this.index = e.target.value			//将数组改变索引赋给定义的index变量
				this.department=this.array[this.index]		//将array【改变索引】的值赋给定义的jg变量
				console.log(this.department)
				this.array2 = []
				this.location = ''
				this.locationDetail = []
				let data2 = {hospital_department: this.department}
				selectHospitalLocation(data2).then((res) => {
					if(res.statusCode == "200")
					{
						for(let i in res.data) {
							this.array2[i] = res.data[i].hospital_location_name
						}
						this.locationDetail = res.data
						console.log("位置信息："+res.data);
						uni.hideLoading();
					}
					else
					{
						console.log('获取失败')
						uni.hideLoading();
						uni.showToast({
							title: '获取失败',
							duration: 2000,
							icon: 'error'
						})
					}
				})
			},
			
			//下拉框
			bindPickerChange2: function(e) {		//改变的事件名
				this.index2 = e.target.value			//将数组改变索引赋给定义的index变量
				this.location = this.array2[this.index2]		//将array【改变索引】的值赋给定义的jg变量
				this.humen = this.locationDetail[this.index2].wait_number
				this.hospital_location_id = this.locationDetail[this.index2].hospital_location_id
				console.log(this.department)
			},
			saveOrder(){
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否提交挂号申请？',
					
					success: function (res) {
						if(res.confirm){
							let data = {
								hospital_location_id: _this.hospital_location_id,
								uid: _this.user.uid
							}
							saveOrder(data).then((res) => {
								if(res.statusCode == "200")
								{
									console.log(res.data);
									uni.hideLoading();
								}
								else
								{
									console.log('获取失败')
									uni.hideLoading();
									uni.showToast({
										title: '获取失败',
										duration: 2000,
										icon: 'error'
									})
								}
							})
							uni.navigateBack();
						}
						else if(res.cancel){
							
						}
						
					},
					fail: function (res) {
						
					}
				});
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-left__icon {
		padding-right: 24rpx;
	}
	.blueBtn {
		width: 500rpx;
		margin: 50rpx auto;
		display: block;
		line-height: 80rpx;
	}
</style>
