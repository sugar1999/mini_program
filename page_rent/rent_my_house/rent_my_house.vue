<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的出租房屋</block>
		</cu-custom>

		<view class="page">
			<view style="height: 60rpx;">

			</view>
			<view class="" style="font-size: 54rpx; font-weight: bold;">
				你好，业主
			</view>
			<view style="height: 60rpx;">

			</view>

			<view class="container">
				<view v-if="list.length == 0 " class="wrap">
					<view class="swiper-box">
						<!-- 第一页 -->
						<view class="swiper-item">
							<view scroll-y style="height: 100%;width: 100%;">
								<view class="page-box">
									<view>
										<view class="centre">
											<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
											<view class="explain">
												这里没有您的租房信息哦~
												<view class="tips">可点击“+”按钮发布租房信息</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<navigator :url="'../rent_appointment_view/rent_appointment_view?houseId='+item.hrId" v-else v-for="(item, index) of list" :key="index" class="item" style="height: 240rpx">
					<s-row :gutter="20">
						<s-col span="9">
							<image class="s-image" :src="item.hrPicture" mode="aspectFill" fade-show />

						</s-col>
						<s-col span="15" style="position: relative;">
							<view style="margin: 12rpx 10rpx; position: relative;">
								<view class="roomName">
									{{item.hrIntroduce}}
								</view>
								<text class="location">
									{{item.hrLocation}}
								</text>
								<view class="roomDetails">
									{{item.hrType==1?'整租':'合租'}} | {{item.hrArea}}m² | 朝向：{{item.hrToward}}
								</view>
								<view>
									<text class="price">{{item.hrPrice}}</text>
									<text style="color: #006FFF; font-size: 26rpx;"> 元 /月</text>
								</view>
							</view>
						</s-col>
					</s-row>
				</navigator>
			</view>
		</view>

		<view style="position: fixed; bottom: 50rpx; right: 50rpx;">
			<s-button type="primary" shape="circle" icon="plus" icon-size="48" width="100" height="100"
				@click="moveToHousePublish" />
		</view>

	</view>
</template>

<script>
	import {
		selectRentInformationByUserId
	} from '@/apis/rent_apis.js'
	export default {
		data() {
			return {
				tabs: [{
						label: '1列',
						value: 1
					},
					{
						label: '默认',
						value: 2
					},
					{
						label: '3列',
						value: 3
					},
				],
				column: 2,
				page: 1,
				pageSize: 20,
				loadStatus: 'loadmore',
				list: []
			}
		},
		onReady() {

		},
		onShow() {
			let _this = this
			uni.showLoading({
				title: '加载房屋信息...'
			})
			let data = {
				userId: uni.getStorageSync('userId')
			}
			selectRentInformationByUserId(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					_this.list = res.data;
					for (var i = 0; i < _this.list.length; ++i) {
						_this.list[i].hrPicture = _this.list[i].hrPicture.split("#")[0];
						switch (_this.list[i].hrToward) {
							case 1: {
								_this.list[i].hrToward = '东';
								break;
							}
							case 2: {
								_this.list[i].hrToward = '西';
								break;
							}
							case 3: {
								_this.list[i].hrToward = '南';
								break;
							}
							case 4: {
								_this.list[i].hrToward = '北';
								break;
							}
							case 5: {
								_this.list[i].hrToward = '东西';
								break;
							}
							case 6: {
								_this.list[i].hrToward = '南北';
								break;
							}
						}

					}
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
			moveToHousePublish() {
				uni.navigateTo({
					url: '../rent_publish_house/rent_publish_house'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		margin: 0 30rpx;
	}

	.item {
		background-color: white;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}

	.roomName {
		font-size: 38rpx;
		font-weight: bold;
		margin-bottom: 14rpx;
	}

	.s-image {
		border-top-left-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
		width: 240rpx;
		height: 240rpx;
	}

	.price {
		color: #006FFF;
		font-size: 36rpx;
	}

	.location {
		font-size: 28rpx;
		padding: 0rpx 8rpx;
		border-radius: 10rpx;
		display: inline-block;
		background-color: rgba(154, 154, 154, 0.1);
		color: rgba(154, 154, 154, 1);
		margin-bottom: 6rpx;
	}

	.roomDetails {
		font-size: 28rpx;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
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

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
