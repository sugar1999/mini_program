<!-- 查看视频 -->
<template>
	<view class="container">
		<view class="MainBox">
			<video :src="getData[0].courseLink" autoplay="false">
				
			</video>
			<view class="cssBox" style="position: relative;">

				<view class="leftBox">
					<view class="margin-bottom-sm">
						<text class="text-bold text-xl">{{getData[0].courseName}}</text>
					</view>
					<view>
						<view class="fl margin-right text-df text-gray">
							<u-icon name="play-circle" style="margin-right: 5rpx;"></u-icon>
							<text>费用：{{getData[0].courseFee}}</text>
						</view>

						<view class="fl margin-right text-df text-gray">
							<u-icon name="order" style="margin-right: 5rpx;"></u-icon>
							<text>类别：{{getData[0].courseCategoryName}}</text>
						</view>

						<view class="fl margin-right text-df text-gray">
							<u-icon name="order" style="margin-right: 5rpx;"></u-icon>
							<text>状态：{{getData[0].courseStatus}}</text>
						</view>

						<view class="fl margin-right text-df text-gray">
							<u-icon name="clock" style="margin-right: 6rpx;"></u-icon>
							<text>时间：{{getData[0].courseStartTime}}至{{getData[0].courseEndTime}}</text>
						</view>

						<view class="fl margin-right text-df text-gray">
							<u-icon name="clock" style="margin-right: 6rpx;"></u-icon>
							<text>教师：{{getData[0].courseTeacherName}}</text>
						</view>
						<view style="clear: both;"></view>

					</view>
				</view>
			</view>

			<view class="cssBox">
				<view class="margin-bottom-sm">
					<text class="text-bold text-lg">简介：</text>
				</view>
				<text class="text-df">{{getData[0].courseDetails}}</text>
			</view>

			<view class="cssBox">
				<view class="margin-bottom-sm">
					<text class="text-bold text-lg">相关推荐</text>
				</view>
				<view class="cu-card article no-card">

					<view class="cu-item shadow" v-for="(item,index) in projectList" :key="index">
						<view class="content" style="padding: 0;">
							<image :src="item.courseCover" mode="aspectFill"></image>
							<view class="desc">

								<view class="list_title">
									{{item.courseName}}
								</view>

								<view class="list_content">{{item.courseDetails}}</view>
								<view class="flex justify-between">
									<view class="cu-tag bg-grey light sm round">
										<u-icon name="play-circle" style="margin-right: 2rpx;"></u-icon>
										{{item.courseCategoryName}}
									</view>
									<view class="cu-tag bg-grey light sm round">
										<u-icon name="clock" style="margin-right: 5rpx;"></u-icon>
										{{item.courseStartTime}}至{{item.courseEndTime}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>


	</view>
</template>

<script>
	import {
		selectAllCourses,
		selectCourseById
	} from '@/apis/education_apis.js'
	export default {
		components: {

		},
		data() {
			return {
				videoUrl: 'x3032spkh1m',
				getData: [{

				}],
				projectList: []
			}
		},
		onLoad(option) {
			var that = this;
			console.log(option.courseId);
			var data = {
				courseId: option.courseId
			}
			selectCourseById(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					that.getData = res.data;
					uni.hideLoading();
				} else {
					uni.hideLoading();
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
				that.$forceUpdate();
			})
			console.log(this.projectList)
			var data = {}
			var that = this;
			selectAllCourses(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					for (var i = 0; i < 2; ++i) {
						var random = Math.floor(Math.random() * 5);
						that.projectList.push(res.data[random]);
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
		// 分享小程序
		onShareAppMessage(res) {
			return {
				title: '零基础学习IT知识，直指万元高薪！'
			};
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f5f9;
	}

	.MainBox {
		width: 750rpx;

		video {
			width: 750rpx;
		}
	}

	.cssBox {
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 15rpx;
	}

	.rightBox {
		width: 150rpx;
		height: 100%;
		position: absolute;
		right: 20rpx;
		top: 0;
		text-align: center;
		line-height: 120rpx;
		padding: 0;
		background: none;
	}

	.list_title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
	}

	.list_content {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-break: break-all;
		font-size: 28rpx;
		color: #888;
	}

	.courseBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-left: -10px;

		view {
			width: 240rpx;
			height: 58rpx;
			border: 2rpx solid #909399;
			text-align: center;
			line-height: 58rpx;
			-webkit-border-radius: 6px;
			border-radius: 12rpx;
			margin: 10rpx 0 20rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			word-break: break-all;
			font-size: 24rpx;
			color: #909399;
			padding: 0 6rpx;
		}

		.active {
			border: 2rpx solid #2979ff;
			background-color: #2979ff;
			color: #FFFFFF;
		}
	}

	.courseBox::after {
		content: "";
		flex: auto;
	}

	.courseBox>view {
		margin-left: 10px;
		margin-bottom: 10px;
		width: -webkit-calc((100% - 10px*3)/ 3);
		width: calc((100% - 10px*3)/ 3);
	}

	button::after {
		border: none;
		padding: 0;
	}
</style>
