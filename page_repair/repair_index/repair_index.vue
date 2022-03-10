<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">报修服务</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../repair_details/repair_details?fixDepartmentId='+res.fixDepartmentId+'&fixDepartmentName='+res.fixDepartmentName+'&fixDetails='+res.fixDetails+'&fixExpectTime='+res.fixExpectTime+'&fixId='+res.fixId+'&fixLaborCost='+res.fixLaborCost+'&fixMaterial='+res.fixMaterial+'&fixMaterialCost='+res.fixMaterialCost+'&fixOrderId='+res.fixOrderId+'&fixPicture='+res.fixPicture+'&fixStatus='+res.fixStatus+'&fixSubmitTime='+res.fixSubmitTime+'&fixTimeline='+res.fixTimeline+'&fixType='+res.fixType+'&fixUserAddress='+res.fixUserAddress+'&fixUserDoor='+res.fixUserDoor+'&fixUserId='+res.fixUserId+'&fixUserName='+res.fixUserName+'&fixUserPhone='+res.fixUserPhone+'&fixWorkerId='+res.fixWorkerId+'&fixWorkerName='+res.name+'&fixWorkerPhone='+res.fixWorkerPhone" class="order" v-for="(res, index) in dataList1" :key="index">
								<view class="top">
									<view class="left">
										<uni-text class="cuIcon-titles text-blue"></uni-text>
										<view class="store">{{ res.fixType }}</view>
										<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
									</view>
									<view class="right">
										<view v-if="res.fixStatus == 1" class="border1">
											工单已创建
										</view>
										<view v-if="res.fixStatus == 2" class="border2">
											已派单
										</view>
										<view v-if="res.fixStatus == 3" class="border3">
											已派工
										</view>
										<view v-if="res.fixStatus == 4" class="border4">
											已完成
										</view>
									</view>
								</view>
								<view class="item">
									<view class="left">
										<image src="http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg" mode="aspectFill"></image>
										<!-- <image :src="res.fixPicture[0]" mode="aspectFill"></image> -->
									</view>
									<view class="content">
										<view class="" style="display: flex;">
											<view class="title u-line-2 text-bold" style="flex:3">{{ res.fixUserAddress }}</view>
											<view class="title u-line-2 text-bold" style="flex:1">{{ res.fixUserName }}</view>
										</view>
												
										<view class="type">{{ res.fixDetails }}</view>
										<view class="delivery-time">{{res.fixSubmitTime}}</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第二页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../repair_details/repair_details?fixDepartmentId='+res.fixDepartmentId+'&fixDepartmentName='+res.fixDepartmentName+'&fixDetails='+res.fixDetails+'&fixExpectTime='+res.fixExpectTime+'&fixId='+res.fixId+'&fixLaborCost='+res.fixLaborCost+'&fixMaterial='+res.fixMaterial+'&fixMaterialCost='+res.fixMaterialCost+'&fixOrderId='+res.fixOrderId+'&fixPicture='+res.fixPicture+'&fixStatus='+res.fixStatus+'&fixSubmitTime='+res.fixSubmitTime+'&fixTimeline='+res.fixTimeline+'&fixType='+res.fixType+'&fixUserAddress='+res.fixUserAddress+'&fixUserDoor='+res.fixUserDoor+'&fixUserId='+res.fixUserId+'&fixUserName='+res.fixUserName+'&fixUserPhone='+res.fixUserPhone+'&fixWorkerId='+res.fixWorkerId+'&fixWorkerName='+res.name+'&fixWorkerPhone='+res.fixWorkerPhone" class="order" v-for="(res, index) in dataList2" :key="index">
								<view class="top">
									<view class="left">
										<uni-text class="cuIcon-titles text-blue"></uni-text>
										<view class="store">{{ res.fixType }}</view>
										<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
									</view>
									<view class="right">
										<view v-if="res.fixStatus == 1" class="border1">
											工单已创建
										</view>
										<view v-if="res.fixStatus == 2" class="border2">
											已派单
										</view>
										<view v-if="res.fixStatus == 3" class="border3">
											已派工
										</view>
										<view v-if="res.fixStatus == 4" class="border4">
											已完成
										</view>
									</view>
								</view>
								<view class="item">
									<view class="left">
										<image src="http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg" ></image>
										<!-- <image :src="res.fixPicture[0]" mode="aspectFill"></image> -->
									</view>
									<view class="content">
										<view class="" style="display: flex;">
											<view class="title u-line-2 text-bold" style="flex:3">{{ res.fixUserAddress }}</view>
											<view class="title u-line-2 text-bold" style="flex:1">{{ res.fixUserName }}</view>
										</view>
				
										<view class="type">{{ res.fixDetails}}</view>
										<view class="delivery-time">{{res.fixSubmitTime}}</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第三页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<apply></apply>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import apply from '../repair_apply/repair_apply.vue'
	import {
		allFixDetailsByUserId,selectUserByAccount,allFixDetails
	} from '@/apis/repair_apis.js'
export default {
	components: {
		apply
	},
	data() {
		return {
			imgUrl: "http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg",
			percent: 50,
			activeColor: '#0081ff',
			striped: false,
			stripedActive: false,
			
			avatar: [
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
			],
			dataList1: [],
			dataList2: [],
			list: [
				{
					name: '报修广场'
				},
				{
					name: '我的报修'
				},
				{
					name: '我要报修'
				}
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
			account: 'user1',
			// account: uni.getStorageSync('userInfo').nickName,
			userId: ''
		};
	},
	mounted() {
		var data = {account: this.account};
		selectUserByAccount(data).then((res) => {
			console.log("onLoad: "+data)
			if(res.statusCode == "200")
			{
				this.userId = res.data
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
			var UserId = {fixUserId: this.userId};
			allFixDetailsByUserId(UserId).then((res) => {
				console.log(data)
				if(res.statusCode == "200")
				{
					this.dataList2 = res.data
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
			
			allFixDetails().then((res) => {
				console.log(data)
				if(res.statusCode == "200")
				{
					this.dataList1 = res.data
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
		})
	},
	methods: {
		goClass(){
			uni.showToast({
			    title: '没有权限～',
			    duration: 2000,
				icon: 'none'
			});
		},
		reachBottom() {
			// 此tab为空数据
			if(this.current != 2) {
				this.loadStatus.splice(this.current,1,"loading")
				setTimeout(() => {
					// this.getOrderList(this.current);
				}, 1200);
			}
		},
		change(index) {
			this.swiperCurrent = index;
			// this.getOrderList(index);
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style lang="scss" scoped>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
	
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 34rpx;
				font-weight: bold;
			}
		}
		.right {
			margin-right: 20rpx;
			.progressBox{
				width: 60rpx;
				float: right;
				
			}
			
			.border1{
				border-radius: 10rpx;
				background-color: rgba(24, 181, 102, 0.1);
				color: #18b566;
				padding: 4rpx 6rpx;
			}
			
			.border2{
				border-radius: 10rpx;
				background-color: rgba(242, 145, 0, 0.1);
				color: #f29100;
				padding: 4rpx 6rpx;
			}
			
			.border3{
				border-radius: 10rpx;
				background-color: rgba(235, 80, 126, 0.1);
				color: #eb507e;
				padding: 4rpx 6rpx;
			}
			.border4{
				border-radius: 10rpx;
				background-color: rgba(130, 132, 138, 0.1);
				color: #82848a;
				padding: 4rpx 6rpx;
			}
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 260rpx;
				height: 190rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 45rpx;
			}
			.type {
				margin: 6rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				line-clamp: 3;
				-webkit-box-orient: vertical;
			}
			.delivery-time {
				color: #0081ff;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		line-height: 70rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.btnBox{
			width: 150rpx;
			display: flex;
			justify-content: space-between;
			.btn {
				line-height: 52rpx;
				width: 140rpx;
				border-radius: 12rpx;
				border: 2rpx solid $u-tips-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-tips-color;
			}
			.evaluate {
				color: $u-type-primary;
				border-color: $u-type-primary;
			}
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 300rpx;
		border-radius: 50%;
		margin: 0 auto;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>

