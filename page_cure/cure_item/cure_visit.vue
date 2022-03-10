<template>
	<view class="fui-wrap">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">上门就诊</block>
		</cu-custom>
		<view class="fui-page__hd">
			<view class="fui-page__title">上门就诊预约</view>
			<view class="fui-page__desc">请填写自身的详细信息，完成上门就诊预约</view>
		</view>

		<view class="fui-page__bd">
			<picker @change="bindPickerChange" :range="array" class="picker_border">
				<view class="fui-section__title">请选择科室: {{department}}</view>
			</picker>
			<view class="fui-section__title">姓名</view>
			<fui-input borderTop placeholder="请输入姓名" :value="user.name" disabled="true"></fui-input>
			<view class="fui-section__title">身份证号</view>
			<fui-input borderTop placeholder="请输入身份证号" maxlength="18" :value="user.id" disabled="true"></fui-input>
			<view class="fui-section__title">手机号码</view>
			<fui-input :bottomLeft="0" placeholder="请输入手机号码" maxlength="11" :value="user.phone" disabled="true"></fui-input>
			<view class="fui-section__title">家庭地址</view>
			<fui-input borderTop placeholder="请输入家庭地址" v-model="location"></fui-input>
			<textarea class="form-control" v-model="inquiry_question" placeholder="请描述病情"></textarea>
		</view>
		<view>
			<button class="blueBtn cu-btn bg-blue shadow lg" @click="saveOut">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		selectDepartment,selectUserByAccount,insertOut
	} from '@/apis/cure_apis.js'
	export default {
		onLoad(){
			var data = {};
			selectDepartment(data).then((res) => {
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
			let Account = {account: this.account}
			selectUserByAccount(Account).then((res) => {
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
			})
		},
		data() {
			return {
				array: [],
				index: 0,
				department: '请选择',
				user: [],
				inquiry_question: '',
				location: '',
				account: uni.getStorageSync('userInfo').nickName,
			}
		},
		methods: {
			//下拉框
			bindPickerChange: function(e) {		//改变的事件名
				this.index = e.target.value			//将数组改变索引赋给定义的index变量
				this.department=this.array[this.index]		//将array【改变索引】的值赋给定义的jg变量
			},
			saveOut(){
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否提交挂号申请？',
					success: function (res) {
						if(res.confirm){
							let data = {
								department: _this.department,
								villagers_disease: _this.inquiry_question,
								villagers_location: _this.location,
								villagers_phone: _this.user.phone,
								villagersid: _this.user.uid
							}
							insertOut(data).then((res) => {
								if(res.statusCode == "200")
								{	
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
	.form-control{ 
		margin: 10% 2.5% 40upx;
		width:95%;
		padding:6px 12px;
		font-size:14px;
		color:#555;
		background-color:#fff;
		background-image: none;
		border:1px solid #ccc;
		border-radius:4px;
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
