<!-- 文章资讯 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">文章资讯</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 第一页 村内消息 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList1" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>11</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第二页 疫情 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList2" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>11</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第三页 娱乐新闻 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList3" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>11</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第四页 建档百年 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList4" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>11</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		selectInformationByType
	} from '@/apis/news_apis.js'
	export default {
		mounted() {
			let data1 = {
				type: '村内消息'
			}
			selectInformationByType(data1).then((res) => {
				if (res.statusCode == "200")
				{
					this.dataList1= res.data
					console.log('newsList',res.data);
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
			
			let data2 = {
				type: '疫情'
			}
			selectInformationByType(data2).then((res) => {
				if (res.statusCode == "200")
				{
					this.dataList2= res.data
					console.log('newsList',res.data);
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
			
			let data3 = {
				type: '娱乐新闻'
			}
			selectInformationByType(data3).then((res) => {
				if (res.statusCode == "200")
				{
					this.dataList3= res.data
					console.log('newsList',res.data);
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
			
			let data4 = {
				type: '建档百年'
			}
			selectInformationByType(data4).then((res) => {
				if (res.statusCode == "200")
				{
					this.dataList4= res.data
					console.log('newsList',res.data);
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
		data() {
			return {
				dataList1: [
					{
					informationid: '1',
					message: '这里是资讯',
					title: '这里是标题',
					time: '这里是时间',
					authorName: '这里是作者名',
					img: 'http://p1362.bvimg.com/10465/a781899b01a1af31.png'
					}
				],
				dataList2: [],
				dataList3: [],
				dataList4: [],
				list: [
					{
						name: '村内消息'
					},
					{
						name: '疫情'
					},
					{
						name: '娱乐新闻'
					},
					{
						name: '建党百年'
					}
				],
				current: 0,
				swiperCurrent: 0,
			};
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
	}
</script>

<style lang="scss" scoped>
	.borderBottom{
		border-bottom: 1px solid #f2f2f2;
	}
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
