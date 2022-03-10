<template>
	<view class="mybg">
		<view class="components-home">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">乡村医疗</block>
			</cu-custom>
			<view class='nav-list margin-top'>
				<navigator open-type="navigate" hover-class='none' :url="item.url" :class=""
				 v-for="(item, index) in cure_indexList" :key="index">
					<text class="mytitle">{{item.title}}</text>
					<view class="item myicon">
						<text class="myfont1">{{item.name}}\n</text>
						<text class="myfont2">{{item.detail}}\n</text>
						<image :src="`${item.icon}`" class="myicon-location" mode="widthFix"></image>
					</view>
				</navigator>
			</view>
			<view style="height: 200rpx;width: 1rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Components',
		data() {
			return {
				cure_indexList:[
					{
						title: '网上就诊',
						name: '网上就诊',
						color: '',
						url: '/page_cure/cure_item/cure_inquiry',
						detail:'村民便捷的网上看病预约平台',
						icon:'http://p1362.bvimg.com/10465/ffe19a08db41c6ee.png'
					},
					{
						title: '医生回复',
						name: '医生回复',
						color: '',
						url: '/page_cure/cure_item/cure_inquiry_check',
						detail:'查看在线问诊的医生回复',
						icon:'http://p1362.bvimg.com/10465/ffe19a08db41c6ee.png'
					},
					{
						title: '预约挂号',
						name: '预约挂号',
						color: '',
						url: '/page_cure/cure_item/cure_take_number',
						detail:'村民便捷的网上挂号',
						icon:'http://p1362.bvimg.com/10465/a092f718ea92bfcf.png'
					},
					{
						title: '查看挂号',
						name: '查看挂号',
						color: '',
						url: '/page_cure/cure_item/cure_take_number_check',
						detail:'村民查看网上预约挂号情况',
						icon:'http://p1362.bvimg.com/10465/a092f718ea92bfcf.png'
					},
					{
						title: '上门就诊',
						name: '上门就诊',
						color: '',
						url: '/page_cure/cure_item/cure_visit',
						detail:'村民预约上门就诊服务',
						icon:'http://p1362.bvimg.com/10465/e7bfdcc7011ea9fb.png'
					},
					{
						title: '上门进度',
						name: '上门进度',
						color: '',
						url: '/page_cure/cure_item/cure_visit_check',
						detail:'村民查看预约上门就诊服务的进度',
						icon:'http://p1362.bvimg.com/10465/e7bfdcc7011ea9fb.png'
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.font_transparency{
		color:transparent;
	}

	.bg-top-blue {
		background-image: linear-gradient(135deg, #52B5FC, #746BFE);
		color: #fff;
	}

	.nav-list {
		display:block;
		flex-wrap: wrap;
		padding: 0rpx 0rpx 0rpx 0upx;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://s1.ax1x.com/2020/06/27/NyU04x.png);
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

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 20upx;
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

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
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
	.banner-index {
		width: 100%;
		padding: 0 0rpx;
		height: 220rpx;
	}

	.title-header {
		display: flex;
		height: 120rpx;
		font-size: 40rpx;
		align-items: center;
		justify-content: center;
		/* padding: 40rpx 0 0 0; */
		font-weight: bold;
		background-image: url();
		background-size: cover;
	}
	.title-header_other {
		display: flex;
		height: 250rpx;
		font-size: 50rpx;
		align-items: center;
		justify-content: center;
		/* padding: 40rpx 0 0 0; */
		font-weight: bold;
		background-image: url();
		background-size: cover;
	}
	.radius-index {
		overflow: hidden;
		border-radius: 10rpx;
	}

	.bg-top {
		background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
		color: #fff;
	}

	.tn-btn {
		height: 100%;
		width: 110%;
		line-height: 30rpx;
		background: transparent;
	}

	.tn-btn::after {
		border-color: transparent;
	}

	.tn-bg {
		position: fixed;
		width: 100%;
		z-index: -1
	}

	.tn-bg-cart {
		/* position: fixed; */
		width: 100%;
		z-index: -1
	}

	.bg-gradual-index {
		/* background-image: linear-gradient(45deg, #ff9700, #ed1c24); */
		background-image: linear-gradient(45deg, #1CA5FF, #1B6CFF);
		color: #fff;
	}

	.tn-align {
		text-align: justify;
	}

	.opacity-a {
		opacity: 0.4
	}

	.strip-bottom {
		/* background: #F2F3F9; */
		width: 100%;
		border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	.name-title-a {
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.name-title-b {
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.35);
	}

	.tn-border {
		border-top: solid #F3F3F3 20rpx;
	}

	.tn-bg-color {
		background-color: #F3F3F3;
	}

	.text-shop-active {
		/* color: #ff8b00 */
		/* background-image: -webkit-linear-gradient(45deg, #ff7612, #ff571c); */
		background-image: -webkit-linear-gradient(180deg, #ff3434, #ff8a34);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.title-text {
		background-image: -webkit-linear-gradient(0deg, #ff8a34, #FBBD12);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		/* border:10px solid #ddd;
      border-image: -webkit-linear-gradient(red,yellow);
     	border-image: -moz-linear-gradient(red,yellow);
      border-image: linear-gradient(red,yellow);  */
	}

	.title-index {
		background-image: -webkit-linear-gradient(0deg, #000, #FBBD12);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.text-shop-no {
		color: #aaaaaa
	}

	.search-round {
		border-radius: 5000rpx;
		/* border-top-right-radius: 20rpx; */
		border-bottom-left-radius: 20rpx
	}

	.shadowimport {
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1) !important;
	}

	/* 标签 */

	.bg-label1.light {
		color: #ff3434;
		background: #fadbd9;
	}

	.bg-label2.light {
		color: #7fd02b;
		background: #eaf8f5;
	}

	.bg-label3.light {
		color: #0070ff;
		background: #e5f1ff;
	}

	.bg-label4.light {
		color: #9ddb47;
		background: #e8f4d9;
	}

	.bg-label5.light {
		color: #f39902;
		background: #fde6d2;
	}

	.bg-label6.light {
		color: #7f2d00;
		background: #ede1d9;
	}

	.bg-label7.light {
		color: #ff4f94;
		background: #f9d7ea;
	}

	.bg-label8.light {
		color: #6f68df;
		background: #e1d7f0;
	}

	.bg-label9.light {
		color: #9c26b0;
		background: #ebd4ef;
	}

	.bg-label10.light {
		color: #19cf8a;
		background: #d2f1f0;
	}

	.bg-label11.light {
		color: #8799a3;
		background: #e7ebed;
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

	/*  */
	.bg-exper1 {
		background-color: #FF4F94;
		color: #fff;
	}
	.bg-exper2 {
		background-color: #006FFF;
		color: #fff;
	}
	.bg-exper3 {
		background-color: #19D08B;
		color: #fff;
	}

	.bg-exper4 {
		background-color: #F49A02;
		color: #fff;
	}

	.bg-exper5 {
		background-color: #1cbbb4;
		color: #fff;
	}

	.bg-exper6 {
		background-color: #9c26b0;
		color: #fff;
	}

	/*  */
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
	.myicon{
		width: 300px;
		height: 130px;
		margin: 0 auto;
		background-color: rgba(255,255,255,0.2);
	}
	
	  .item {
	    display: block;
	    align-items: center;
	    justify-content: center;
	    border-radius: 10rpx;
		color: white;
	  }
	  .mybg{
		background: rgb(2,0,36);
		background: linear-gradient(143deg, rgba(2,0,36,1) 0%, rgba(92,233,247,1) 0%, rgba(78,92,218,1) 100%);
	  	background-size:100% 100%;
	  }
	 .myfont1{
		position: relative;
		color: #fffef9;
		top: 50%;
		left: 37%;
		font-size: 40rpx;
	 }
	 .myfont2{
		margin-top: 100px;
		font-size: small;
		color: #fffef9;
		position: relative;
		top: 60%;
		left: 5%;
		font-style: italic;
		opacity: 0.7;
	 }
	 .mytitle{
		 color: #fffef9;
		 font-size: 50rpx;
		 position: relative;
		 left: 35%;
		 font-weight: bold;
	 }
	 .myicon-location{
		width: 50px;
		height: 50px;
		bottom: 27%;
		left: 40%;
	 }
</style>
