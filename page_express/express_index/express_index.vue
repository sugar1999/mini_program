<template>
	<view style="background-color: rgb(243, 243, 243);">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">乡村快递</block>
		</cu-custom>
		<view class="back-image">
			<view class="top">
				<view style="padding: 20rpx 0;"></view>
				<view class="nav" style="display: flex;">
					<navigator url="../express_mypackage/express_mypackage" class="icon">
						<image class="sh-image" src="http://p1362.bvimg.com/10465/b84af5bceaf0ce0a.png"
							style="background-color: rgba(182,101,237,0.1)" mode="aspectFill"></image>
						<view class="title">
							我的包裹
						</view>
					</navigator>
					<navigator url="../express_door_to_door/express_door_to_door" class="icon">
						<image class="sh-image" src="http://p1362.bvimg.com/10465/b0f7fc3234f17f85.png"
							style="background-color: rgba(115,37,255,0.1)" mode="aspectFill"></image>
						<view class="title">
							送货上门状态
						</view>
					</navigator>
					<navigator url="../express_i_want_to_appoint/express_i_want_to_appoint" class="icon">
						<image class="sh-image" src="http://p1362.bvimg.com/10465/d681147ad272afcd.png"
							style="background-color: rgba(249,91,123,0.1)" mode="aspectFill"></image>
						<view class="title">
							我要预约
						</view>
					</navigator>
					<!-- <navigator url="../managePage/managePage" class="icon">
						<image class="sh-image" src="http://p1362.bvimg.com/10465/bdd1706b7e82c4b4.png"  mode=""></image>
						<view class="title">
							二手管理
						</view>
					</navigator> -->
				</view>
				<view style="padding: 20rpx 0;"></view>
				<view class="nav2" style="padding-bottom: 0;">
					<view class="new-info">
						<text>最新</text>
						<text style="color: #5f7bf9;">快递</text>
					</view>
					<view class="info-list" style="padding: 0;">
						<navigator url="../mypackage_details/mypackage_details" class="order"
							v-for="(res, index) in dataList1" :key="index">

							<view class="item">
								<view class="left">
									<image src="http://p1362.bvimg.com/10465/1b763af7e4a3d120.png" mode="aspectFill">
									</image>
								</view>
								<view class="content">
									<view class="top">
										<view class="right">
											<view class="border2">
												{{res.packageType}}
											</view>
											<!-- <view v-if="res.status == 2" class="border1">
											即将开始
										</view>
										<view v-if="res.status == 3" class="border3">
											已结束
										</view> -->
										</view>
										<view class="left">
											<!-- <uni-text class="cuIcon-titles text-blue"></uni-text> -->
											<view class="store">{{ res.packageDetails }}</view>
											<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
										</view>

									</view>

									<view class="type">乡村快递集散点已收入</view>
									<view class="delivery-time">签收时间：</view>
									<view class="delivery-time">{{ res.packageEta }}</view>
								</view>
							</view>

						</navigator>

					</view>

				</view>

				<view style="padding: 20rpx 0;"></view>
				<view class="nav2" style="padding-bottom: 0;">
					<view class="new-info">
						<text>历史</text>
						<text style="color: #5f7bf9;">签收</text>
					</view>
					<view class="info-list" style="padding: 0;">
						<navigator url="../mypackage_details/mypackage_details" class="order"
							v-for="(res, index) in dataList2" :key="res.id">

							<view class="item">
								<view class="left">
									<image src="http://p1362.bvimg.com/10465/1b763af7e4a3d120.png" mode="aspectFill">
									</image>
								</view>
								<view class="content">
									<view class="top">
										<view class="right">
											<view class="border2">
												{{res.packageLogisticsCompany}}
											</view>
											<!-- <view v-if="res.status == 2" class="border1">
												即将开始
											</view>
											<view v-if="res.status == 3" class="border3">
												已结束
											</view> -->
										</view>
										<view class="left">
											<!-- <uni-text class="cuIcon-titles text-blue"></uni-text> -->
											<view class="store">{{ res.packageDetails }}</view>
											<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
										</view>

									</view>

									<view class="type">乡村快递集散点已收入</view>
									<view class="delivery-time">签收时间：</view>
									<view class="delivery-time">{{ res.packageEta }}</view>
								</view>
							</view>

						</navigator>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		unsignedPackageByUserIdAndOrderTime
	} from '@/apis/express_apis.js'
	export default {
		data() {
			return {
				dataList1: [

				],
				dataList2: [

				],
			}
		},
		onLoad() {
			let _this = this;
			let data = {
				uid: 'User#1'
			}
			unsignedPackageByUserIdAndOrderTime(data).then((res) => {
				if (res.statusCode == "200") {
					console.log("预约成功");
					_this.dataList1 = res.data;
					uni.showToast({
						title: '提交成功',
						duration: 2000,
						icon: 'success'
					});
				} else {
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})

			signedPackageByUserIdAndOrderTime(data).then((res) => {
				if (res.statusCode == "200") {
					console.log("预约成功");
					_this.dataList2 = res.data;
					uni.showToast({
						title: '提交成功',
						duration: 2000,
						icon: 'success'
					});
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

		}
	}
</script>

<style>
	@import url("../../font_support/iconfont.css");

	page {
		background-color: rgb(243, 243, 243);
	}

	/*  */

	/*  */
	.back-image {
		background-image: url(http://p1362.bvimg.com/10465/bb05365f0f6427ec.png);
		background-size: 800rpx;
		background-repeat: no-repeat;
		background-position: center top;
		height: 100%;
	}

	.topImage {
		border-radius: 40rpx;
		margin: 30rpx;
		margin-top: 0;
		margin-bottom: 0;
		display: block;
		width: 690rpx;
		box-shadow: 0rpx 4rpx 30rpx #4e504e;
	}

	.top {
		/* margin-top: 30rpx; */
		/* box-shadow: 0rpx 10rpx 30rpx #dcdddc; */
		/* background-color: white; */
		z-index: 100;
		/* float: left; */
		width: 100%;
		/* position: fixed; */
	}

	.search {
		padding: 14rpx 20rpx;
		margin: 0rpx 30rpx;
		background-color: rgb(255, 255, 255);
		border-radius: 20rpx;
		font-size: 28rpx;
		/* width: 100%; */
	}

	.title {
		margin-top: 16rpx;
		font-size: 30rpx;
		text-align: center;
	}

	.discribe {
		font-size: 28rpx;
		color: #A6A6A6;
		text-align: center;
	}

	.nav {
		margin: 0 30rpx;
		padding: 30rpx 0;
		width: 690rpx;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 30rpx;
	}

	.nav2 {
		margin: 0 30rpx;
		padding: 30rpx 0;
		width: 690rpx;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 30rpx;
	}

	.nav navigator {
		flex: 1;
	}

	.nav navigator .sh-image {
		width: 100rpx;
		height: 100rpx;
		display: block;
		margin: 0 auto;
		padding: 20rpx;
		border-radius: 20rpx;
	}

	.nav2 .new-info {
		background-image: url(http://p1362.bvimg.com/10465/d8a0cc03abaf5a4d.png);
		background-size: 40rpx;
		background-repeat: no-repeat;
		background-position: left center;
		padding-left: 60rpx;
		margin-left: 30rpx;
		font-weight: bolder;
		margin-bottom: 30rpx;

	}

	.info-list {
		font-size: 30rpx;
		padding: 30rpx 30rpx;
		/* border-bottom: 1px solid #dfdfdf; */
		/* border-top: 1px solid #dfdfdf; */
	}

	.info-list text {
		float: right;
		font-size: 38rpx;
	}

	.info-list text:after {
		content: "\e608";
	}
</style>

<style lang="scss" scoped>
	.order {
		width: 690rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;

			// justify-content: space-between;
			.left {
				display: flex;

				// align-items: center;
				.store {
					margin-left: 70rpx;
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.right {

				.progressBox {
					// width: 60rpx;
					// float: right;

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
			// margin: 20rpx 0 0;

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
					// text-overflow: -o-ellipsis-lastline;
					// overflow: hidden;
					// text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					// line-clamp: 3;
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
			// justify-content: space-between;
			align-items: center;

			.btnBox {
				width: 150rpx;
				display: flex;

				// justify-content: space-between;
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
</style>
