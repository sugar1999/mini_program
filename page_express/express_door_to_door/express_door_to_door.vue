<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">快递送货上门状态</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view v-if="!show0" scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
									<view class="explain">
										暂无已预约送货上门信息
										<view class="tips">请稍后再试</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<scroll-view v-if="show0" scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="order" v-for="(res, index) in dataList0" :key="res.id">
							<navigator
								:url="'../door_appointment_no_order/door_appointment_no_order?packageId='+res.packageId+'&uid='+res.uid">

								<view class="item">
									<view class="left">
										<image src="http://p1362.bvimg.com/10465/1b763af7e4a3d120.png"
											mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="top">
											<view class="right">
												<view class="border2">
													{{res.packageLogisticsCompany}}
												</view>
											</view>
											<view class="left">
												<uni-text class="cuIcon-titles text-blue"></uni-text>
												<view class="store">{{ res.packageDetails }}</view>
											</view>

										</view>

										<view class="type">始发地：{{ res.packageSenderAddress }}</view>
										<view class="type">寄件人：{{ res.packageSenderName }}</view>
										<view class="" style="display: flex;">

										</view>
									</view>
								</view>

							</navigator>

						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view v-if="!show1" scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
									<view class="explain">
										暂无派送中送货上门信息
										<view class="tips">请稍后再试</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<scroll-view v-if="show1" scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="order" v-for="(res, index) in dataList1" :key="res.id">
							<navigator
								:url="'../door_order_lookup_user/door_order_lookup_user?packageId='+res.packageId+'&uid='+res.uid">

								<view class="item">
									<view class="left">
										<image src="http://p1362.bvimg.com/10465/1b763af7e4a3d120.png"
											mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="top">
											<view class="right">
												<view class="border2">
													{{res.packageLogisticsCompany}}
												</view>
											</view>
											<view class="left">
												<uni-text class="cuIcon-titles text-blue"></uni-text>
												<view class="store">{{ res.packageDetails }}</view>
											</view>

										</view>

										<view class="type">始发地：{{ res.packageSenderAddress }}</view>
										<view class="type">寄件人：{{ res.packageSenderName }}</view>
										<view class="" style="display: flex;">

										</view>
									</view>
								</view>

							</navigator>

						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第二页 -->
				<swiper-item class="swiper-item">
					<scroll-view v-if="!show2" scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
									<view class="explain">
										暂无已完成送货上门信息
										<view class="tips">请稍后再试</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<scroll-view v-if="show2" scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="order" v-for="(res, index) in dataList2" :key="res.id">
							<navigator :url="'../door_finished/door_finished?packageId='+res.packageId+'&uid='+res.uid">

								<view class="item">
									<view class="left">
										<image src="http://p1362.bvimg.com/10465/1b763af7e4a3d120.png"
											mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="top">
											<view class="right">
												<view class="border2">
													{{res.packageLogisticsCompany}}
												</view>
											</view>
											<view class="left">
												<uni-text class="cuIcon-titles text-blue"></uni-text>
												<view class="store">{{ res.packageDetails }}</view>
											</view>

										</view>

										<view class="type">始发地：{{ res.packageSenderAddress }}</view>
										<view class="type">寄件人：{{ res.packageSenderName }}</view>
										<view class="" style="display: flex;">

										</view>
									</view>
								</view>

							</navigator>

						</view>

					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view style="position: fixed; bottom: 50rpx; right: 50rpx;">
			<s-button type="primary" shape="circle" icon="logistics" icon-size="48" width="100" height="100"
				@click="moveToAppointment" />
			<view class="" style="text-align: center; font-size: 26rpx;">
				送货上门
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectNoOrderBookedPackageByUserId,
		indoorBookedPackageByUserIdAndOrderTime,
		indoorFinishedPackageByUserIdAndOrderTime
	} from '@/apis/express_apis.js'
	export default {
		data() {
			return {
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
				dataList0: [],
				dataList1: [{
					id: 1,
					imgUrl: 'http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg',
					type: '乡村快递',
					title: '捷安特自行车',
					details: '乡村快递承运组，已收入',
					people: '张柏川',
					phone: '13829382738'
				}],
				dataList2: [{
					id: 1,
					imgUrl: 'http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg',
					type: '乡村快递',
					title: '捷安特自行车',
					details: '订单已由本人签收，物流信息结束',
					time: '2020年11月11日15：00：00'
				}],
				list: [{
						name: '已预约'
					},
					{
						name: '派送中'
					},
					{
						name: '已完成'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				show0: false,
				show1: false,
				show2: false,
			};
		},
		onLoad() {
			var _this = this;
			var data = {
				uid: uni.getStorageSync('userId')
			}
			selectNoOrderBookedPackageByUserId(data).then((res) => {
				if (res.statusCode == "200") {
					_this.dataList0 = res.data;
					console.log(res.data);
					if (_this.dataList0.length == 0) {
						_this.show0 = false;
					} else {
						_this.show0 = true;
					}
				} else {
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
			indoorBookedPackageByUserIdAndOrderTime(data).then((res) => {
				if (res.statusCode == "200") {
					_this.dataList1 = res.data;
					console.log(res.data);
					if (_this.dataList1.length == 0) {
						_this.show1 = false;
					} else {
						_this.show1 = true;
					}
				} else {
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
			indoorFinishedPackageByUserIdAndOrderTime(data).then((res) => {
				if (res.statusCode == "200") {

					_this.dataList2 = res.data;
					console.log(res.data);
					if (_this.dataList2.length == 0) {
						_this.show2 = false;
					} else {
						_this.show2 = true;
					}
				} else {
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
		},
		methods: {
			moveToAppointment() {
				uni.navigateTo({
					url: '../express_i_want_to_appoint/express_i_want_to_appoint'
				})
			},
			goClass() {
				uni.showToast({
					title: '没有权限～',
					duration: 2000,
					icon: 'none'
				});
			},
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			change(index) {
				this.swiperCurrent = index;
				// this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
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
	button::after {
		border: none
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

				.progressBox {
					width: 60rpx;
					float: right;

				}

				.border1 {
					border-radius: 10rpx;
					background-color: rgba(24, 181, 102, 0.1);
					color: #18b566;
					padding: 4rpx 6rpx;
				}

				.border2 {
					border-radius: 10rpx;
					background-color: rgba(242, 145, 0, 0.1);
					color: #f29100;
					padding: 4rpx 6rpx;
				}

				.border3 {
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

			.btnBox {
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
