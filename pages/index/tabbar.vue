<template>
	<view>
		<index v-if="PageCur=='index'"></index>
		<!-- <cases v-if="PageCur=='cases'"></cases> -->
		<news v-if="PageCur=='news'"></news>
		<buy v-if="PageCur=='buy'"></buy>
		<cart v-if="PageCur=='cart'"></cart>
		<me v-if="PageCur=='me'"></me>

		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="index">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='index'" src="https://s4.ax1x.com/2022/01/10/7EVIeA.png"></image>
						<image v-if="PageCur != 'index'" src="https://s4.ax1x.com/2022/01/10/7EV4Ld.png"></image>
					</view>
					<view :class="PageCur=='index'?'color_main':'text-gray'">首页</view>
				</view>

				<!-- <view class="action" @click="NavChange" data-cur="cases">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='cases'" src="https://s4.ax1x.com/2022/01/10/7EVbJf.png"></image>
						<image v-if="PageCur != 'cases'" src="https://s4.ax1x.com/2022/01/10/7EVHFP.png"></image>
					</view>
					<view :class="PageCur=='cases'?'color_main':'text-gray'">游玩指导</view>
				</view> -->

				<view class="action" @click="NavChange" data-cur="news">
					<view class='cuIcon-cu-image'>
						<!-- <view class="cu-tag badge">{{message}}</view> -->
						<image v-if="PageCur=='news'" src="https://s4.ax1x.com/2022/01/10/7EVTot.png"></image>
						<image v-if="PageCur != 'news'" src="https://s4.ax1x.com/2022/01/10/7EVfQe.png"></image>
					</view>
					<view :class="PageCur=='news'?'color_main':'text-gray'">景点资讯</view>
				</view>
				
				<view class="action" @click="NavChange" data-cur="buy">
					<view class='cuIcon-cu-image'>
						<!-- <view class="cu-tag badge">{{message}}</view> -->
						<image v-if="PageCur=='buy'" src="https://s1.ax1x.com/2022/03/17/q9lUX9.png"></image>
						<image v-if="PageCur != 'buy'" src="https://s1.ax1x.com/2022/03/17/q9QNZt.png"></image>
						
					</view>
					<view :class="PageCur=='buy'?'color_main':'text-gray'">旅游商城</view>
				</view>
				
				<view class="action" @click="NavChange" data-cur="cart">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='cart'" src="https://s1.ax1x.com/2022/03/17/q9lUX9.png"></image>
						<image v-if="PageCur != 'cart'" src="https://s1.ax1x.com/2022/03/17/q9QNZt.png"></image>
						
					</view>
					<view :class="PageCur=='cart'?'color_main':'text-gray'">购物车</view>
				</view>

				<view class="action" @click="NavChange" data-cur="me">
					<view class='cuIcon-cu-image'>
						<!-- <view class="cu-tag badge"></view> -->
						<!-- 红点 -->
						<image v-if="PageCur=='me'" src="https://s4.ax1x.com/2022/01/10/7EVhsH.png"></image>
						<image v-if="PageCur != 'me'" src="https://s4.ax1x.com/2022/01/10/7EVodI.png"></image>
					</view>
					<view :class="PageCur=='me'?'color_main':'text-gray'">个人中心</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import index from "./index.vue";
	// import cases from "./main.vue";
	import news from "./news.vue";
	import buy from './buy.vue'
	import cart from './cart.vue'
	import me from "./me.vue";
	export default {
		components: {
			index,
			// cases,
			news,
			buy,
			cart,
			me
		},
		data() {
			return {
				PageCur: 'index',
				message: '2',
				openId: '',
				access_token: '',
				tip: "我是提示",
				duration: 1
			};
		},
		// 分享小程序
		onShareAppMessage(res) {
			return {
				title: '分享乡村景点给你的好友吧！',
			};
		},
		onLoad() {
			let that = this;
			//判断缓存中是否有用户数据，没有则获取
			if (!uni.getStorageSync('encryptedData')) {
				that.login(that);
			} else {
				console.log("已有缓存，直接进入")
			}
		},
		methods: {
			login(that) {
				uni.showModal({
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					success(res) {
						if (res.confirm) {
							uni.getUserProfile({
								desc: '获取您的个人信息并创建账户',
								success: infoRes => {
									//调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户在当前小程序的唯一标识（openid）
									if (infoRes.errMsg === 'getUserProfile:ok') {
										// 获取到的当前数据存入缓存
										// console.log('uni.getUserProfile', infoRes)
										uni.setStorageSync('encryptedData', infoRes
											.encryptedData);
										uni.setStorageSync('iv', infoRes.iv);
										uni.setStorageSync('rawData', infoRes.rawData);
										uni.setStorageSync('signature', infoRes
											.signature);
										uni.setStorageSync('userInfo', infoRes
											.userInfo);
										//微信用户登录接口
										wx.login({
											success: function(res) {
												// console.log(res);
												if (res.code) {
													//换取openid & session_key
													let appid = 'wxb1469c5d9dd147d9'
													let secret =
														'f91f502cdf94ecf8ad64ff96222d63e6'
													let url =
														'https://api.weixin.qq.com/sns/jscode2session?appid=' +
														appid + '&secret=' +
														secret + '&js_code=JSCODE' +
														'&grant_type=authorization_code';
													wx.request({
														url: url,
														method: 'POST',
														data: {
															code: res.code
														}
													})
													var data = {
														account: infoRes.userInfo
															.nickName
													}
												} else {
													console.log('登录失败！' + res.errMsg)
												}
											},
											fail() {
												console.log('wxLogin失败');
											}
										})
									} else {
										uni.showToast({
											title: '用户取消授权',
											icon: 'error'
										});
									}
								},
								fail: err => {
									console.log('userInfo-err', JSON.stringify(err));
								}
							});
						} else if (res.cancel) {
							that.login(that);
						}
					}
				})
			},
			NavChange: function(e) {
				// console.log(e.currentTarget.dataset.cur)
				this.PageCur = e.currentTarget.dataset.cur;
			},
			NavChange_xd: function() {
				uni.navigateTo({
					url: 'publish',
					animationType: 'slide-in-bottom',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}

	.logo_btn {
		width: 38*2rpx;
		height: 38*2rpx;
		position: absolute;
		z-index: 2;
		border-radius: 50%;
		top: -40rpx;
		left: 0rpx;
		right: 0;
		margin: auto;
		padding: 0;
	}

	.cu-bar.tabbar .action.add-action {
		padding-top: 56rpx !important;
	}
</style>
