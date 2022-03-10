<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">包裹物流详情</block>
		</cu-custom>

		<!-- 需求制定 -->
		<view class="wrap">
			<view class="page-box">
				<view class="order" v-for="(res, index) in dataList2" :key="res.id">

					<view class="item">
						<view class="left">
							<image :src="res.imgUrl" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="top">
								<view class="right">
									<view class="border2">
										{{res.type}}
									</view>
								</view>
								<view class="left">
									<uni-text class="cuIcon-titles text-blue"></uni-text>
									<view class="store">{{ res.title }}</view>
								</view>

							</view>

							<view class="type">{{ res.details }}</view>
							<view class="delivery-time">签收时间：</view>
							<view class="delivery-time">{{ res.time }}</view>
						</view>
					</view>

				</view>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">


				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<!-- UI设计 -->
						<view class="cu-timeline">
							<view class="cu-time">
								<text class='cuIcon-selection text-white text-lg bg-blue round padding-xs'></text>
								<text class='text-xl margin-left'>已签收</text>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">13：04</view>
									</view>
									<view class="margin-top">您已在xxcun完成签收</view>
								</view>
							</view>

							<view class="cu-time">
								<text class='cuIcon-selection text-white text-lg bg-blue round padding-xs'></text>
								<text class='text-xl margin-left'>待收取</text>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">12：00</view>
									</view>
									<view class="margin-top">您的包裹已经到达代收点</view>
								</view>
							</view>


							<view class="cu-time">
								<text class='cuIcon-selection text-white text-lg bg-blue round padding-xs'></text>
								<text class='text-xl margin-left'>派送中</text>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">12：00</view>
									</view>
									<view class="margin-top">业务员：188828837282 张晓东 正在派件 承包区xx街道</view>
								</view>
							</view>

							<view class="cu-time">
								<text class='cuIcon-selection text-white text-lg bg-blue round padding-xs'></text>
								<text class='text-xl margin-left'>运输中</text>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">12：00</view>
									</view>
									<view class="margin-top">快件从 xx市 发出</view>
								</view>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">12：00</view>
									</view>
									<view class="margin-top">快件从 xx市 发出</view>
								</view>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">12：00</view>
									</view>
									<view class="margin-top">快件从 xx市 发出</view>
								</view>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">12：00</view>
									</view>
									<view class="margin-top">快件从 xx市 发出</view>
								</view>
							</view>
							<view class="cu-time">
								<text class='cuIcon-selection text-white text-lg bg-blue round padding-xs'></text>
								<text class='text-xl margin-left'>已揽件</text>
							</view>
							<view class="cu-item text-blue">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-blue">10-22</view>
										<view class="cu-tag line-blue">12：00</view>
									</view>
									<view class="margin-top">业务员：283728292992 张大宝 正在揽件 市场部第一分公司</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList2: [{
					id: 1,
					imgUrl: 'http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg',
					type: '顺丰',
					title: '捷安特自行车',
					details: '浙江省杭州市新安江物流集团总公司，已收入',
					time: '2020年11月11日15：00：00'
				}],
				show: 1,
				current: 0,
				list: [{
						name: 'UI设计'
					},
					{
						name: '小程序/App'
					},
					{
						name: '网站开发'
					},
					{
						name: '行业解决方案'
					}
				],
				swiperCurrent: 0,
				dx: 0,
			};
		},
		onLoad(option) {
			console.log(option.mid)
			if (option.mid == 1) {
				this.show = 1;
			} else {
				this.show = 2;
			}
		},
		methods: {
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
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

	.cu-timeline .cu-time {
		width: 100%;
		text-align: left;
		padding: 20rpx 0 20rpx 37rpx;
		font-size: 26rpx;
		color: #888;
		display: block;
	}

	.text-red,
	.line-red,
	.lines-red {
		color: #FF3434;
	}

	.margin-avatar {
		margin-left: -15rpx;
	}

	.margin-avatar-bottom {
		margin-bottom: 150rpx;
	}

	.line-blue-tuniao::after {
		border-color: #0070ff !important;
		color: #0070ff;
	}

	.resume {
		/* background: #f1f1f1; */
		padding-top: 10rpx;
		border-radius: 6rpx;
		display: block;
		color: #666;
		line-height: 1.6;
	}

	.resume+.resume {
		margin-top: 20rpx;
	}

	.resume2 {
		padding-top: 10rpx;
		border-radius: 6rpx;
		display: block;
		color: #666;
		line-height: 1.6;
	}

	.edit {
		position: fixed;
		width: 100rpx;
		height: 100rpx;
		bottom: 250rpx;
		right: 30rpx;
		z-index: 1;
		opacity: 0.8;
		border: 1px solid #189eff;
		border-radius: 100rpx;
		box-shadow: 0rpx 0rpx 6rpx rgba(24, 158, 255, 1);
		padding: 20rpx;
	}

	.love {
		position: fixed;
		width: 100rpx;
		height: 100rpx;
		bottom: 550rpx;
		right: 30rpx;
		z-index: 1024;
		opacity: 0.8;
		border: 1px solid #189eff;
		border-radius: 100rpx;
		box-shadow: 0rpx 0rpx 6rpx rgba(24, 158, 255, 1);
		padding: 20rpx;
	}

	.bg-img-cont {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 350rpx;
	}

	.share-png {
		width: 100rpx;
		height: 100rpx;
		margin: 0 auto;
	}

	.share-wechat {
		width: 35rpx;
		height: 35rpx;
		margin: 0 10rpx -4rpx 0;
		opacity: 0.5;
	}

	.button-no::after {
		border: none;
	}

	.title-pyq {
		background-image: -webkit-linear-gradient(0deg, #1b6cff, #1ca5ff);
		/*1B6CFF 1B42FF*/
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		opacity: 0.5;
	}

	.edit-fixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.button-no {
		border: none;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
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
