<!-- 首页 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">首页</block>
		</cu-custom>

		<!-- banner图 -->
		<view class="uni-padding-wrap" style="height: 360rpx;">
			<view class="page-section swiper" style="height: 360rpx;">
				<view class="page-section-spacing" style="height: 360rpx;">
					<swiper class="swiper" style="height: 360rpx;" circular="true" indicator-dots="true" autoplay="true"
						interval="3500" duration="600">
						<swiper-item class="swiper-list" style="height: 360rpx;" v-for="(item, index) in bannerList"
							:key="index">
							<view class="swiper-item uni-bg-red" style="height: 360rpx;">
								<image class="swiper-img" :src="item.imageUrl" style="height: 360rpx;" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 导航栏 -->
		<view class="cu-list grid solids-bottom col-4 no-border">
			<view class="cu-item" v-for="(item,index) in categories" :key="index"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" @click="goCategorieslist"
				:data-mid="item.mid">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>

		<!-- 今日资讯 -->
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">今日资讯</text>
				<text class="text-ABC text-blue">TodayNews</text>
			</view>
			<!-- <view class="action" @click="goNews">
				<text class="text-lg text-grey text-shadow">更多</text>
			</view> -->
		</view>

		<view class="skill-sequence-panel-content-wrapper">
			<!--左边虚化-->
			<view class="hide-content-box hide-content-box-left"></view>
			<!--右边虚化-->
			<view class="hide-content-box hide-content-box-right"></view>
			<scroll-view scroll-x="true" class="kite-classify-scroll">
				<view class="kite-classify-cell shadow" v-for="(item, index) in curriculum" :key="index">
					<view :class="'nav-li bg-index' + (index+1)">
						<view class="nav-name">{{item.name}}</view>
					</view>
					<view class="nav-content">{{item.content}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">美丽乡村</text>
				<text class="text-ABC text-blue">BeautifulCountryside</text>
			</view>
			<view class="action" @click="goProjectList">
				<text class="text-lg text-grey text-shadow">更多</text>
			</view>
		</view>

		<uni-grid :column="2" :showBorder="true" :square="true" :highlight="true">
			<uni-grid-item v-for="(item,index) in scenery" :key="index">
				<image :src="item.imgUrl" class="gridImg" @click="goProjectList"></image>
			</uni-grid-item>
		</uni-grid>

	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				duration: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				bannerList: [],
				categories: [],
				curriculum: [],
				scenery: []
			}
		},
		async mounted() {
			//后台发请求获取数据
			let result = await request('/getIndexData')
			let result2 = await request('/getScenetyData')
			this.bannerList = result.data.banner
			this.categories = result.data.categories
			this.curriculum = result.data.curriculum
			this.scenery = result2.data.scenery
		},
		methods: {
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goCategorieslist: function(e) {
				// console.log(e.currentTarget.dataset.mid)
				if (e.currentTarget.dataset.mid == 1) {
					uni.navigateTo({
						url: '/page_hot/hot_index/hot_index'
					})
				} else if (e.currentTarget.dataset.mid == 2) {
					uni.navigateTo({
						url: '/page_express/express_door_to_door/express_door_to_door'
					})
				} else if (e.currentTarget.dataset.mid == 3) {
					uni.navigateTo({
						url: '/page_secure/secure_index/secure_index'
					})
				} else if (e.currentTarget.dataset.mid == 4) {
					uni.navigateTo({
						url: '/page_repair/repair_index/repair_index'
					})
				}
			},
			goProjectList() {
				uni.navigateTo({
					url: '../me/scenic'
				})
			},
			goNews() {
				uni.navigateTo({
					url: '/pages/index/news'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.swiper-box {
		flex: 1;
		height: 360rpx;
	}

	.swiper-item {
		height: 360rpx;
	}

	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	/*左右渐变遮罩*/
	.hide-content-box {
		position: absolute;
		top: 0;
		height: 100%;
		width: 10px;
		z-index: 2;
	}

	.hide-content-box-left {
		left: 0;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.hide-content-box-right {
		right: 0;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.kite-classify-scroll {
		width: 100%;
		height: 280rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.kite-classify-cell {
		display: inline-block;
		width: 266rpx;
		height: 270rpx;
		margin-right: 20rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(26, 26, 26, 0.2);
	}

	.nav-li {
		padding: 40rpx 30rpx;
		width: 100%;
		background-image: url(https://s1.ax1x.com/2020/06/27/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-content {
		width: 100%;
		padding: 15rpx;
		display: inline-block;
		overflow-wrap: break-word;
		white-space: normal;
	}

	.nav-btn {
		width: 200rpx;
		height: 60rpx;
		margin: 8rpx auto;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}

	.bg-index1 {
		background-color: #19CF8A;
		color: #fff;
	}

	.bg-index2 {
		background-color: #954FF6;
		color: #fff;
	}

	.bg-index3 {
		background-color: #5177EE;
		color: #fff;
	}

	.bg-index4 {
		background-color: #F49A02;
		color: #fff;
	}

	.bg-index5 {
		background-color: #FF4F94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #7FD02B;
		color: #fff;
	}

	.item-name {
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.gridImg {
		width: 340rpx;
		height: 300rpx;
		border-radius: 10%;
		margin: 15rpx;
	}
</style>
