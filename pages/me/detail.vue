<template>
	<view class="detailContainer">
		<!-- <cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">旅游购物</block>
		</cu-custom> -->
		<view class="header" @click="goBefore()">
			<icon class="iconfont icon-weibiaoti-- iconSize"></icon>
			<span>返回</span>
			<text> 乡游购 </text>
		</view>
		<!-- 内容区 -->
		<scroll-view class="content" scroll-y="true">
			<image class="detailImg" :src="shopDetail.wapBannerUrl" mode=""></image>
			<view class="tag">{{shopDetail.promTag}}</view>
			<text class="price">￥ {{shopDetail.retailPrice}}</text>
			<text>/{{ shopDetail.weight }}</text>
			<view class="info">{{shopDetail.frontDesc}}</view>
			
			
			<!-- 准备内容 -->
			<view class="list" style="margin-left: 5%;font-size: 28upx;line-height: 50upx;">
				<view>{{shopDetail.describe}}</view>
			</view>
		</scroll-view>
		<!-- 底部导航 -->
		<view class="detailFooter">
			<view class="shopCart" @click="toShopCart">
				<icon class="iconfont icon-gouwuche iconGouwuche"></icon>
				<view class="box" v-if="cartList.length!==0">
					<u-badge numberType="ellipsis" :type="type " max="99" :value="cartList.length" bgColor="red" color="white" showZero></u-badge>
				</view>
				<!-- <text class="count" v-if="cartList.length">{{cartList.length}}</text> -->
			</view>
			<view class="btn buyNow" @click="purchase()">立即购买</view>
			<view @click="addShopCart(shopDetail)" class="btn addShopCart">加入购物车</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations, mapState} from 'vuex'
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				shopDetail: {},
				type: 'warning',
				cartList: []
			}
		},
		async onLoad(option) {
			this.shopDetail = JSON.parse(option.shopItem)
			let res = await request('/query')
			this.cartList = res.data.shoppingcart
		},
		methods: {
			...mapMutations({
				changeCartList: 'changeCartList'
			}),
			// 添加商品至购物车
			async addShopCart(shopItem){
				// console.log(shopItem)
				this.changeCartList(shopItem)
				wx.showToast({
				     title: '成功',
				     icon: 'success',
				     duration: 2000//持续的时间
				   })
			},
			//购买
			purchase() {
				this.show = true
			},
			// 跳转至购物车
			toShopCart(){
				// console.log('跳转。。。');
				wx.navigateTo({
					url: '../index/tabbar?PageCur=cart'
				})
			},
			//返回上一级页面
			goBefore() {
				wx.navigateBack({
				  delta:1
				})
			}
		},
		
	}
</script>

<style lang="stylus">
	.detailContainer
		width 100%
		display flex
		flex-direction column
		.header
			height 150upx
			line-height 90upx
			background #FFFFFF
			display flex
			text-align center
			padding-top 40upx
			background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
			color: #ffffff;
			position relative
			// text
			// 	font-size 32upx
			.iconSize
				font-size 36upx !important
				position absolute
				bottom 5upx
			.iconfont
				width 90upx
				height 90upx
				font-size 50upx
			span
				position absolute
				left 65upx
				font-size 30upx
				bottom 5upx
			text
				position absolute
				flex 1
				left 330upx
				font-size 32upx
				bottom 5upx
		.content
			height calc(100vh - 190upx)
			.detailImg
				width 100%
				height 750upx
			.tag
				width 90%
				height 100upx
				line-height 100upx
				text-align center
				font-size 32upx
				color #FFFFFF
				margin 20upx auto
				background #BB2C08
				border-radius 10upx
			.price
				font-size 50upx
				color #DD1A21
				line-height 70upx
				margin-left 5%
			.info
				font-size 28upx
				color #333
				margin-left 5%
		.detailFooter
			position fixed
			bottom 0
			left 0
			height 100upx
			line-height 100upx
			border-top 1upx solid #EEEEEE
			display flex
			background #fff
			.shopCart
				width 140upx
				height 100upx
				position relative
				.box
					// width: 35upx; 
					height: 35upx;
					position absolute
					left 95upx
					top 5upx
				.iconGouwuche{
					font-size 50upx !important
					position absolute
					left 45upx
					top 0upx
				}
				.count
					color #FFFFFF
					position absolute
					top -28upx
					right 22upx
					font-size 26upx
			.service
				width 60upx
				height 60upx
				margin 20upx 40upx
			.btn
				width 305upx
				height 100%
				text-align center
				font-size 28upx
				&.buyNow
					color #333
					border-left 1upx solid #eee
				&.addShopCart
					background #DD1A21
					color #fff
				
</style>
