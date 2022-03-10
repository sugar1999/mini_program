<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">送货上门</block>
		</cu-custom>
		<view class="wrap">
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view v-if="!show" scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
									<view class="explain">
										暂无可选的送货上门信息
										<view class="tips">请稍后再试</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<scroll-view v-if="show" scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in dataList1" :key="res.id">
								<navigator
									:url="'../door_appoint/door_appoint?packageId='+res.packageId+'&uid='+res.uid">

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

												<view class="" style="flex: 1; margin:4rpx">
													<button class="" style="font-size: 26rpx;"
														@click="nav(res.packageId,res.uid)">申请送货上门</button>
												</view>
											</view>
										</view>
									</view>

								</navigator>

							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
				</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		selectNotAppointmentPackageByUserId
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
				dataList1: [{
					id: 1,
					imgUrl: 'http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg',
					type: '顺丰',
					title: '捷安特自行车',
					details: '浙江省杭州市新安江物流集团总公司，已收入'
				}],
				list: [{
						name: '在途中'
					},
					{
						name: '已签收'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				show: false,
			};
		},
		onShow() {
			let _this = this;
			let data = {
				uid: uni.getStorageSync('userId')
			}
			selectNotAppointmentPackageByUserId(data).then((res) => {
				if (res.statusCode == "200") {
					_this.dataList1 = res.data;
					if (_this.dataList1.length == 0) {
						_this.show = false;
					} else {
						_this.show = true;
					}
					console.log(res.data);
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
			nav(packageId, uid) {
				uni.navigateTo({
					url: '../door_appoint/door_appoint' + packageId + '&uid=' + uid
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

			},
			change(index) {

			},
			transition({
				detail: {
					dx
				}
			}) {
				
			},
			animationfinish({
				detail: {
					current
				}
			}) {

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
