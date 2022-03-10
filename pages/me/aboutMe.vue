<!-- 关于作者 -->
<template>
	<view class="about">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于</block>
		</cu-custom>
		<canvas canvas-id="bubble" :style="'width:' + width + 'px;height:' + height + 'px'" class="like-fx"></canvas>
		<like-fx ref="likeFx" :width="width" :height="height"></like-fx>

		<view class="titleZ text-center align-center">
			<text class="text-bold">乡里办用户协议</text>
			<view class="contentZ">
				<text
					class="text-xl">重要须知：乡里办微信小程序端（以下统称“乡里办平台”或“本平台”）所有权人及其关联方（下称“乡里办”）在此特别提醒您仔细阅读（未成年人应在其法定监护人的陪同下阅读）本《用户协议》（下称“本协议”）中的各个条款，尤其是以粗体并下划线标示的条款，包括但不限于免除或者限制乡里办责任的条款、对用户权利进行限制的条款以及约定争议解决方式、司法管辖的条款。您有权选择同意或者不同意本协议。</text>
			</view>
		</view>

		<view class="titleZ text-center align-center margin-top-xl">
			<text class="text-bold">开发人员名单</text>
			<view class="contentZ margin-top-lg">
				<text class="text-xl text-bold">前端界面开发</text>
				<text class="text-xl">：杨捷宁 赵泷</text>
			</view>
			<view class="contentZ" style="margin-top: 40rpx;">
				<text class="text-xl text-bold">界面设计</text>
				<text class="text-xl">：刘元驰 赵泷 杨捷宁 陈培枫 施志豪</text>
			</view>
		</view>

		<!-- <button class='' open-type="contact">
      <image src='http://p1362.bvimg.com/10465/2fb7d96656bcc797.png' class='share-img png round shadow-lg bg-white' mode='aspectFit'>
      </image>
    </button> -->
	</view>
</template>

<script>
	import LikeFx from '@/components/likeFx/likeFx.vue'
	export default {
		components: {
			LikeFx
		},
		data() {
			return {
				animation_timer: null, // 动画定时器
				width: 375,
				height: 1920
			}
		},
		onLoad() {
			this._startLikeAnimation();
		},
		onShareAppMessage() {
			return {
				title: '快来和我们玩转软件开发吧～',
				path: '/pages/about/about?from=share'
			}
		},
		methods: {
			_startLikeAnimation() {
				this.animation_timer = setInterval(() => {
					this.$refs.likeFx.likeClick()
				}, 300)
			}
		}
	}
</script>

<style scoped>
	.titleZ {
		width: 750rpx;
		font-size: 52rpx;
		margin-top: 60rpx;
	}

	.contentZ {
		width: 650rpx;
		margin: 10rpx auto 0;
		text-align: left;
	}

	.about-bg {
		background-size: cover;
		width: 100vw;
		height: 100vh;
		justify-content: center;
		flex-direction: column;
		color: #fff;
	}

	.edit-fixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.detail-imgs image {
		width: 100%;
		float: left;
		/* height:400rpx; 不定高了*/
		border: 0;
		padding: 0;
		margin: 0
	}

	.share-img {
		position: fixed;
		padding: 10rpx;
		width: 100rpx;
		height: 100rpx;
		/* top: 680rpx; */
		bottom: 200rpx;
		right: 20rpx;
		z-index: 1024;
		opacity: 0.8;
		box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.3);
		border: none;
	}

	.about {
		margin: 0;
		width: 100%;
		height: 100vh;
		padding-top: 20%;
		color: #fff;
		background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
		/* background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a); */
		background-size: 500% 500%;
		animation: gradientBG 15s ease infinite;
	}

	@keyframes gradientBG {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}

	.container {
		width: 100%;
		position: absolute;
		text-align: center;
	}

	.like-fx {
		position: fixed;
		right: 0;
		z-index: 1024;
		pointer-events: none;
		/* background-color: red; */
	}
</style>
