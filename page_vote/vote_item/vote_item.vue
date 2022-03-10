<!-- 薪资排行 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选举详情</block>
		</cu-custom>
		<view class="contaier" style="background-color: #FFFFFF;">
			<view class="top_bg">
				<view class="number_sy_box">
					<view class="order">
						<view class="top">
							<view class="left">
								<view class="store">{{ data.name }}</view>
								<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
							</view>
							<view class="right">
								<view v-if="data.state == 1" class="border2">
									进行中
								</view>
								<view v-if="data.state == 2" class="border1">
									即将开始
								</view>
								<view v-if="data.state == 3" class="border3">
									已结束
								</view>
							</view>
						</view>
						<view class="item">
							<view class="left">
								<image :src="data.img" mode="aspectFill"></image>
							</view>
							<view class="content">
								<view class="title u-line-2 text-bold">发布：{{ data.department }}</view>
								<view class="type">{{ data.intro }}</view>
								<view class="delivery-time">开始时间：{{ data.start }}</view>
								<view class="delivery-time">结束时间：{{ data.end }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="rankList_box">
				<navigator :url="'../vote_person/vote_person?uid='+item.uid+'&id='+id" class="rankItem"
					v-for="(item,index) in rankList" :key="index">
					<view class="rankIndex">
						<text>{{ index + 1 }}</text>
					</view>
					<view class="HeardBox">
						<image class="rankHeard" :src="item.img"></image>
					</view>

					<view class="NameBox">
						<!-- <view class="userName">{{item.name}}</view> -->
						<view class="userName text-bold">{{item.name}}</view>
						<view class="userPost text-gray">{{item.political_face}}</view>
						<view class="color_ccc">{{item.sex==1?'男':'女'}} ｜ <text class="text-blue">{{item.age}}</text>岁
						</view>
					</view>
					<view class="download_box">
						<image mode="widthFix" src="http://p1362.bvimg.com/10465/837b3aeadb811f31.png"></image>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		voteDetailById,
		votePersonDetailsByVoteInfoId
	} from '@/apis/vote_apis.js'
	export default {
		data() {
			return {
				id: -1,
				nowTime: '',
				data: {},
				rankList: [{
					headimgurl: 'http://cdn.zhoukaiwen.com/head4.jpg',
					name: '张 *',
					policy: '中共党员',
					sex: '男',
					age: '26'
				}, {
					headimgurl: 'http://cdn.zhoukaiwen.com/head5.jpg',
					name: '李 * 阳',
					policy: '中共党员',
					sex: '男',
					age: '34'
				}]
			}
		},
		onLoad(options) {
			var _this = this;
			console.log(options.id);
			this.id = options.id;
			var data = {
				id: options.id
			}
			voteDetailById(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					_this.data = (res.data);
					uni.hideLoading();
				} else {
					uni.hideLoading();
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
			var dataInfo = {
				voteinfoid: options.id
			}
			votePersonDetailsByVoteInfoId(dataInfo).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					_this.rankList = (res.data);
					uni.hideLoading();
				} else {
					uni.hideLoading();
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
		},
		methods: {

		},
		filters: {

		}
	}
</script>

<style lang="scss">
	.top_bg {
		width: 750rpx;
		height: 240rpx;
		background: url(http://cdn.zhoukaiwen.com/rank_bg.png) no-repeat;
		background-size: 750rpx;
		position: relative;
	}

	.order {
		width: 700rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		padding-top: 8rpx;
		padding-bottom: 0;
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


	.one_box {
		width: 750rpx;
		height: 260rpx;
		position: absolute;
		left: 0;
		bottom: 110rpx;
		display: flex;
		justify-content: space-around;
	}

	.one_box .top3 {
		width: 210rpx;
		height: 280rpx;
	}

	.top_name {
		width: 100%;
		height: 55rpx;
		line-height: 60rpx;
		color: #f2f2f2;
		font-size: 26rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top_sy {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: rgba(255, 255, 255, .7);
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top_sy span {
		font-size: 20rpx !important;
	}

	.num_one {
		position: relative;
	}

	.huangguan1 {
		width: 60px;
		height: 60px;
		position: absolute;
		right: -10rpx;
		top: -18*2rpx;
	}

	.num_one .top3_head {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;
		margin: 15rpx 0 0 30rpx;
		border: 4rpx solid #ffdd3c;
	}

	.num_two {
		position: relative;
	}

	.huangguan2 {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 15rpx;
	}

	.num_two .top3_head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		margin: 45rpx 0 0 45rpx;
		border: 4rpx solid #bcdcdf;
	}

	.num_three {
		position: relative;
	}

	.huangguan2 {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 15rpx;
	}

	.num_three .top3_head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		margin: 45rpx 0 0 45rpx;
		border: 4rpx solid #e29d85;
	}

	// 第二块
	.number_sy_box {
		margin-top: 40rpx;
		width: 700rpx;
		height: 310rpx;
		background-color: #FFFFFF;
		position: absolute;
		left: 25rpx;
		border-radius: 20rpx;
		// bottom: -115rpx;
		z-index: 999;
		// padding: 22rpx;
		box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.1)
	}

	.number_sy_box_title {
		color: #888888;
		// font-weight: 500;
		font-size: 28rpx;
		display: flex;
		z-index: 9999;
		justify-content: space-between;
	}

	.number_sy_main {
		width: 100%;
		height: 124rpx;
		padding-top: 20rpx;
		line-height: 52rpx;
		// background: red;
		display: flex;
		justify-content: space-around;
		position: relative;
	}

	.xiaoding_bg {
		position: absolute;
		right: -22rpx;
		bottom: -30rpx;
		width: 180rpx;
	}

	.number_num1 {
		font-size: 40rpx;
		font-weight: 500;
		color: #2fc04f;
	}

	.number_num2 {
		font-size: 40rpx;
		font-weight: 500;
		color: #4bac7f;
	}

	.danwei {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #c9c9c9;
	}

	// 列表
	.rankList_box {
		width: 750rpx;
		min-height: 200rpx;
		margin-top: 130rpx;
	}

	.rankItem:last-child {
		border: none;
	}

	.rankItem {
		width: 700rpx;
		height: 140rpx;
		margin: 0px auto;
		border-bottom: 1px solid #e9e9e9;
	}

	.rankIndex {
		width: 60rpx;
		height: 140rpx;
		line-height: 140rpx;
		text-align: center;
		color: #CCCCCC;
		font-size: 40rpx;
		float: left;
	}

	.HeardBox {
		width: 100rpx;
		height: 100rpx;
		margin: 20rpx;
		border-radius: 100%;
		overflow: hidden;
		float: left;
		margin-right: 25rpx;
		margin-left: 10rpx !important;
	}

	.HeardBox image {
		width: 100%;
		height: 100%;
	}

	.NameBox {
		width: 400rpx;
		height: 140rpx;
		float: left;
		padding-top: 10rpx;
		box-sizing: border-box;
	}

	.NameBox view {
		height: 50rpx;
		line-height: 70rpx;
	}

	.userName {
		min-width: 90rpx;
		font-size: 30rpx;
		float: left;
		margin-right: 20rpx;
	}

	.download_box {
		width: 80rpx;
		height: 140rpx;
		// background-color: red;
		float: right;

	}

	.download_box image {
		width: 45rpx;
		margin: 50rpx auto;
		display: block;
	}
</style>
