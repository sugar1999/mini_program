<!-- 关于作者 -->
<template>
	<view class="about">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于乡村旅游</block>
		</cu-custom>

		<view class="titleZ text-center align-center">
			<text class="text-bold">用户协议</text>
			<view class="contentZ">
				<text
					class="text-xl">尊敬的游客：
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了认真贯彻落实旅游法相关法律法规精神，更好的维护旅游者及旅游经营者的合法权利，引导旅游产业往健康方向发展，提高旅游者旅游满意度，规范市场行为，制定以下旅游附件合同供甲乙双方共同遵守，请游客提前认真阅读本《游客旅游安全须知》
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了“安全第一”的旅游服务宗旨，建议游客在签订旅游合同时务必购买旅游意外伤害保险，做到安全第一，安心旅游！</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animation_timer: null, // 动画定时器
				width: 375,
				height: 1920
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
		background-size: 500% 500%;
		animation: gradientBG 15s ease infinite;
	}

	@keyframes gradientBG {
		0% {background-position: 0% 50%;}
		50% {background-position: 100% 50%;}
		100% {background-position: 0% 50%;}
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
	}
</style>
