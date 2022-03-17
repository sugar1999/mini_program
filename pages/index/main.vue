<template>
	<view class="components-home">
		<view style="margin-top:-250rpx;height: 486rpx;">
			<image src='https://s1.ax1x.com/2022/03/17/qCpgu4.png' mode='widthFix' class='png'
				style='width:100%;height:100rpx'></image>
		</view>

		<view class="title-header">
			<view class="title-text">
				游 玩 服 务
			</view>
		</view>

		<view class='nav-list margin-top'>
			<navigator open-type="navigate" hover-class='none' :url="item.url" :class="'nav-li bg-index' + (index+1)"
				v-for="(item, index) in live_services" :key="index">
				<view class="nav-name">{{item.name}}</view>
			</navigator>
		</view>

		<view class="title-header">
			<view class="title-text">
				游 玩 景 点
			</view>
		</view>

		<view class='nav-list margin-top'>
			<navigator open-type="navigate" hover-class='none' :url="item.url" :class="'nav-li bg-kuxuan' + (index+1)"
				v-for="(item, index) in travel_scenic_spot" :key="index">
				<view class="nav-name">{{item.name}}</view>
			</navigator>
		</view>
		<view style="height: 120rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		name: 'Components',
		data() {
			return {
				live_services: [],
				travel_scenic_spot: []
			}
		},
		async mounted() {
			let result = await request('/getMainData')
			// console.log(result)
			this.live_services = result.data.live_services
			this.travel_scenic_spot = result.data.travel_scenic_spot
		}
	}
</script>

<style>
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}
	.nav-li {
		padding: 30upx;
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
		margin-top: 20upx;
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

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	@keyframes show {
		0% {transform: translateY(-50px);}
		60% {transform: translateY(40upx);}
		100% {transform: translateY(0px);}
	}
	@-webkit-keyframes show {
		0% {	transform: translateY(-50px);}
		60% {transform: translateY(40upx);}
		100% {transform: translateY(0px);}
	}

	/* 
  2f9bfe 主色蓝
  189eff 配色蓝
  0081ff--0070FF 蓝
  CCE6FF--E5F1FF 淡蓝
  39B54A--7FD02B 绿
  D7F0DB--EAF8F5 淡绿
  FBBD08--FFD627 黄
  f37b1d--F39902 橙
  FEF2CE--FEF6E9 淡橙
  1CBBB4--19CF8A 青
  E03997--FF4F94 粉
  8dc63f--9ddb47 橄榄绿
  e54d42--ff3434 红
  a5673f--7F2D00 棕
  6739b6--6F68DF 蓝紫
  */

	.title-header {
		display: flex;
		height: 120rpx;
		font-size: 40rpx;
		align-items: center;
		justify-content: center;
		/* padding: 40rpx 0 0 0; */
		font-weight: bold;
		background-image: url(https://s1.ax1x.com/2022/03/17/qCpYjg.png);
		background-size: cover;
	}

	.bg-index1 {
		background-color: #F33F5A;
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
		background-color: #FFC32E;
		color: #fff;
	}

	.bg-index5 {
		background-color: #FF4F94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #0acffe;
		color: #fff;
	}


	.bg-kuxuan1 {
		background-color: #FF5656;
		color: #fff;
	}

	.bg-kuxuan2 {
		background-color: #6F68DF;
		color: #fff;
	}

	.bg-kuxuan3 {
		background-color: #9c26b0;
		color: #fff;
	}

	.bg-kuxuan4 {
		background-color: #0070FF;
		color: #fff;
	}

	.bg-kuxuan5 {
		background-color: #1cbbb4;
		color: #fff;
	}

	.bg-kuxuan6 {
		background-color: #BC78EC;
		color: #fff;
	}

	.bg-kuxuan7 {
		background-color: #f39902;
		color: #fff;
	}

	.bg-kuxuan8 {
		color: #fff;
		background: #19CF8A;
	}

	.bg-kuxuan9 {
		color: #fff;
		background: #8799a3;
	}

	.bg-kuxuan10 {
		color: #fff;
		background: #0396FF;
	}
</style>
