<template>
	<view>
		<view class="mybg">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">医生回复详情</block>
			</cu-custom>

			<text class="mytitle">医生回复</text>
			<view>
				<textarea class="myfont1" disabled="true">{{detail}}</textarea>
				<view style="height: 500rpx;width: 1rpx;"></view>
			</view>
		</view>
	</view>
</template>

<script>

	import {
		selectAnswerById
	} from '@/apis/cure_apis.js'
	export default{
		onLoad: function (options) {
			this.inquiryid=options.inquiryid
			let data = {inquiryid: this.inquiryid}
			selectAnswerById(data).then((res) => {
				if (res.statusCode == "200")
				{
					this.detail = res.data
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
		data(){
			return {
				inquiryid: '',
				detail: ''
			}
		}
	}
</script>

<style>
	
	.nav-list {
		display:block;
		flex-wrap: wrap;
		padding: 0rpx 0rpx 0rpx 0upx;
		justify-content: space-between;
	}
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
	.button-style{
		margin: 2% 77% 40upx;
		width:20%;
	}
	.blueBtn {
		width: 500rpx;
		margin: 50rpx auto;
		display: block;
		line-height: 80rpx;
	}
	.myicon{
		width: 300px;
		height: 130px;
		margin: 3%;
		background-color: rgba(255,255,255,0.2);
	}
		
	.item {
		display: block;
		align-items: center;
		justify-content: center;
		background-color:#F4F4F4;
		border-radius: 10rpx;
		color: white;
	}
	  .mybg{
		  background: rgb(2,0,36);
		  background: linear-gradient(143deg, rgba(2,0,36,1) 0%, rgba(92,233,247,1) 0%, rgba(78,92,218,1) 100%);
		  background-size:100% 100%;
	  }
	.myfont1{
		padding: 3%;
		width: 270px;
		height: 500px;
		display: block;
		margin: 0 auto;
		color: #fffef9;;
		font-size: 50rpx;
		word-wrap: break-word;
		margin-top: 20%;
		border-radius: 10px;
		background-color: white;
		background-color: rgba(255,255,255,0.2);
		overflow-y:visible
	}
	.myfont2{
		color: #fffef9;
		position: relative;
		left: 40%;
		top: 10%;
		font-size: 15px;
		font-style: italic;
		opacity: 0.7;
	}
	.fui-section__title {
		margin-left: 32rpx;
		font-size: 15px;
	}
	.mytitle{
		color: #fffef9;;
		font-size: 50rpx;
		position: absolute;
		left: 35%;
		margin-top: 6%;
		font-weight: bold;
	}
	.myicon-location{
		width: 90px;
		height: 90px;
		bottom: 60%;
		left: 5%;
	}
</style>
