<!-- 个人中心 -->
<template>
	<view class="components-theme">
		<!-- 弹窗确认 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<!-- <view class="modal_bg"></view> -->
				<view class="modal_main">
					<view class='nav-list margin-top'>
						<view :class="'nav-li bg-zt' + (index+1)" v-for="(item, index) in inter" :key="index" @click="switchImage(index,item.name)">
							<view class="nav-name">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部背景 -->
		<view class='UCenter-bg' :style="'background-image: url(' + pic[topBackGroupImageIndex].link + ');margin-top:-' + CustomBar + 'px;'">
			<view class='space' v-show="spaceShow">
				<view class="stars ">
					<view class="star "></view>
					<view class="star pink "></view>
					<view class="star blue "></view>
					<view class="star yellow "></view>
				</view>
			</view>

			<block>
				<view class='text-center'>
					<view class="cu-avatar2 round xl margin-right-sm shadow-blur-lg bg-img open-data" style="overflow: hidden;">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<view class="padding text-blue text-xl text-bold">
						你好，<open-data type="userNickName"></open-data>
					</view>
				</view>
			</block>

			<image src='https://cdn.nlark.com/yuque/0/2019/gif/280373/1570670848649-assets/web-upload/3dbaa72a-062b-470f-9b9d-058ff8f85ab8.gif'
			 mode='scaleToFill' class='gif-wave'></image>
		</view>

		<block>
			<view class="cu-list menu card-menu margin-top-lg margin-bottom-sm shadow-shop bg-white text-black my-radius sm-border">
				<view class="cu-item" @tap="showModal" data-target="Modal">
					<view class='content'>
						<image src='https://s4.ax1x.com/2022/01/10/7EucvT.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>主题切换</text>
					</view>
					<view class='action'>
						<view class="cu-capsule radius">
							<view class='cu-tag bg-gradual-blue'>
								<view style="clear: both;"></view>
							</view>
							<view class="cu-tag line-blue">
								{{picName}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="cu-item">
					<button class='content cu-btn' open-type="share">
						<image src='https://s1.ax1x.com/2022/03/17/q988tP.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>分享小程序</text>
					</button>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-lg margin-bottom-sm shadow-shop bg-white text-black my-radius sm-border">
				<view class="buyContainer">
					<view class="buyItem" v-for="(item, index) in buyList" :key="index">
						<span :class="['iconfont','icon-' + item.icon]" :style="{'color': item.color}"></span>
						<view class="butText">{{item.name}}</view>
					</view>
				</view>
			</view>

			<view class="cu-list menu card-menu margin-top-lg margin-bottom-lg shadow-shop bg-white text-black my-radius sm-border">

				<view class="cu-item" @click="callPhoneNumber" data-number="18629591093">
					<view class='content'>
						<image src='https://s1.ax1x.com/2022/03/17/q9879K.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>技术支持</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-blue light">178 6028 5579</view>
					</view>
				</view>

				<view class="cu-item">
					<button class='content cu-btn' open-type="feedback">
						<image src='https://s1.ax1x.com/2022/03/17/q9NkR0.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>问题反馈</text>
					</button>
				</view>
				<view class="cu-item">
					<button class='content cu-btn' @click="goAboutMe">
						<image src='https://s1.ax1x.com/2022/03/17/q9NolV.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>关于乡村旅游</text>
					</button>
				</view>
			</view>
		</block>

		<view style="height: 110rpx;width: 1rpx;"></view>

	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				spaceShow:true,
				modalName: null,
				picName: '流星之夜',
				pic: [],
				topBackGroupImageIndex: 5,
				inter: [],
				buyList: [
					{
						name:'全部订单',
						icon: 'quanbudingdan',
						color: '#a35c8f'
					},
					{
						name:'待付款',
						icon: 'daifukuan',
						color: '#2f90b9'
					},
					{
						name:'待收货',
						icon: 'daishouhuo',
						color: '#add5a2'
					},
					{
						name:'售后',
						icon: 'shouhou',
						color: '#e7a23f'
					}
				]
			}
		},
		async mounted() {
			let result = await request('/getMeData')
			this.pic = result.data.pic
			this.inter = result.data.inter
		},
		// 分享小程序
		onShareAppMessage(res) {
			return {
				title: '将乡村旅游分享给你的好友吧！',
			};
		},
		watch:{
			topBackGroupImageIndex(val) {
				console.log(val)
				if (val == 4 || val == 5 ) {
					this.spaceShow = true;
				}else{
					this.spaceShow = false;
				}
			}
		},
		methods: {
			switchImage(index, name) {
				this.topBackGroupImageIndex = index;
				this.modalName = null;
				this.picName = name;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			//拨打电话
			callPhoneNumber() {
				uni.makePhoneCall({
					phoneNumber: "17860285579",
				});
			},
			// 关于
			goAboutMe() {
				uni.navigateTo({
					url: '../me/aboutMe'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.buyContainer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// width: 100%;
		height: 100upx;
		margin: 10upx 30upx;
		.buyItem{
			display: flex;
			flex-direction: row;
			align-items: center;
			span{
				font-size: 40upx !important;
			}
			.butText{
				padding-left: 10upx;
				font-size: 32upx;
			}
		}
	}
	.UCenter-bg {
		background: #fff;
		background-size: 100% 100%;
		height: 550rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	// 头像
	.cu-avatar2 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background: #ccc;
		color: #fff;
		white-space: nowrap;
		position: relative;
		width: 150rpx;
		height: 150rpx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		z-index: 99;
	}


	.my-radius {
		border-radius: 12rpx;
		overflow: hidden
	}

	.shadow-shop {
		box-shadow: 0rpx 0rpx 90rpx 0rpx rgba(0, 0, 0, 0.1);
	}


	/* 数字背景 */
	.shadow-warp-my {
		position: relative;
		box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.shadow-warp-my:before,
	.shadow-warp-my:after {
		position: absolute;
		content: "";
		top: 20rpx;
		bottom: 30rpx;
		left: 20rpx;
		width: 50%;
		box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.16);
		transform: rotate(-6deg);
		z-index: -1;
	}

	.shadow-warp-my:after {
		right: 20rpx;
		left: auto;
		transform: rotate(6deg);
	}

	.cu-dialog {
		background: #FFFFFF;
		overflow: visible;
		padding: 100rpx 0 70rpx;
	}

	// .modal_bg {
	// 	width: 100%;
	// 	height: 100rpx;
	// 	position: absolute;
	// 	top: -100rpx;
	// 	background-image: url(http://cdn.zhoukaiwen.com/modal_bg.png);
	// 	background-size: 100%;
	// 	background-repeat: no-repeat;
	// }

	/* 主题色 */
	.bg-zt1 {
		color: #fff;
		background: #81d949;
	}
	.bg-zt2 {
		color: #fff;
		background: #b2e6ff;
	}
	.bg-zt3 {
		color: #fff;
		background: #f3cd41;
	}
	.bg-zt4 {
		color: #fff;
		background: #ddecf7;
	}
	.bg-zt5 {
		color: #fff;
		background: #152e9d;
	}
	.bg-zt6 {
		color: #fff;
		background: #0f1358;
	}
	
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 22upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://s1.ax1x.com/2022/03/17/qCS70s.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.pupil--green {
		background: linear-gradient(135deg, rgba(188, 248, 177, 0.7), #2fa38c 75%);
	}

	.pupil--pink {
		background: linear-gradient(135deg, #f1a183, #8535cd);
	}

	// 顶部流星
	.space {
		position: absolute;
		top: 0;
		left: 0;
	}

	.star {
		display: block;
		width: 5rpx;
		height: 5rpx;
		border-radius: 50%;
		background: #FFF;
		top: 100rpx;
		left: 400rpx;
		position: relative;
		transform-origin: 100% 0;
		animation: star-ani 6s infinite ease-out;
		box-shadow: 0 0 5rpx 5rpx rgba(255, 255, 255, .3);
		opacity: 0;
		z-index: 2;
	}

	.star:after {
		content: '';
		display: block;
		top: 0rpx;
		left: 4rpx;
		border: 0rpx solid #fff;
		border-width: 0rpx 90rpx 2rpx 90rpx;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		transform: rotate(-45deg) translate3d(1rpx, 3rpx, 0);
		box-shadow: 0 0 1rpx 0 rgba(255, 255, 255, .1);
		transform-origin: 0% 100%;
		animation: shooting-ani 3s infinite ease-out;
	}

	.pink {
		top: 30rpx;
		left: 395rpx;
		background: #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.pink:after {
		border-color: transparent transparent transparent #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.blue {
		top: 35rpx;
		left: 432rpx;
		background: cyan;
		animation-delay: 7s;
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
	}

	.blue:after {
		/* border-color: transpareanimation-delay: 12s; */
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
		animation-delay: 7s;
	}

	.yellow {
		top: 50rpx;
		left: 600rpx;
		background: #ffcd5c;
		animation-delay: 5.8s;
	}

	.yellow:after {
		border-color: transparent transparent transparent #ffcd5c;
		animation-delay: 5.8s;
	}

	@keyframes star-ani {
		0% {
			opacity: 0;
			transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		}
		50% {
			opacity: 1;
			transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		}
		100% {
			opacity: 0;
			transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		}
	}
</style>
