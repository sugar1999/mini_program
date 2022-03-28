<template>
	<view class="cartContainer">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">购物车</block>
		</cu-custom>
		<view class="title">购物车</view>
		<block v-if="cartList.length">
			<!-- 购物车列表 -->
			<view class="cartList">
				<view class="cartItem" v-for='(item, index) in cartList' :key='index'>
					<text
					 class='iconfont icon-xuanzhong'
					 :class="{selected: item.selected}"
					 @click="handleSelected"
					 :data-selected='!item.selected'
					 :data-index='index'
					 ></text>
					<view class="shopItem">
						<image class="shopImg" :src="item.wapBannerUrl" mode=""></image>
						<view class="shopInfo">
							<text>{{item.name}}</text>
							<text class="price">￥{{item.retailPrice}}</text>
						</view>
					</view>
					<!-- 控制数量 -->
					<view class="countCtrl">
						<text class="add" @click=changeCount :data-type='true' :data-index='index'> + </text>
						<text class="count"> {{item.count}} </text>
						<text class="del" @click=changeCount :data-type='false' :data-index='index'> - </text>
					</view>
				</view>
				
				
				<!-- 底部下单 -->
				<view class="cartFooter">
					<text class='iconfont icon-xuanzhong' :class="{selected: isAllSelected}" @click="changeAllSelected(!isAllSelected)"></text>
					<text class="allSelected">已选 {{totalCount}}</text>
					<view class="right">
						<text class="totalPrice">合计: ￥{{totalPrice.toFixed(2)}}</text>
						<text class="preOrder">下单</text>
					</view>
				</view>
			</view>
			
			
		</block>	
		<block v-else>
			<image class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" mode=""></image>
			<view class="hint">购物车还是空的，赶紧去购物吧</view>
		</block>
		
	</view>
</template>

<script>
	// import request from '../../utils/request.js'
	import {mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		props:['cartList'],
		data() {
			return {
			};
		},
		computed: {
			// ...mapState({
			// 	cartList: state => state.cart.cartList
			// }),
			...mapGetters(['isAllSelected', 'totalPrice', 'totalCount'])
		},
		methods: {
			...mapMutations({
				changeCountMutation: 'changeCount',
				changeSelected: 'changeSelected',
				changeAll: 'changeAll',
				getCartListData: 'getCartListData'
			}),
			toLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			// 修改数量
			changeCount(event){
				let {type, index} = event.currentTarget.dataset;
				this.changeCountMutation({type, index})
			},
			// 是否选中
			handleSelected(event){
				let {selected, index} = event.currentTarget.dataset;
				this.changeSelected({selected, index})
				
			},
			
			// 全选/全不选
			changeAllSelected(isSelected){
				// console.log(isSelected)
				this.changeAll(isSelected,true)
			},
			login(that=this) {
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
		}
	}
</script>

<style lang="stylus">
	/* iconfont 公共样式 */
	.cartImg
		display block
		width 248upx
		height 248upx
		margin 300upx auto 50upx
		
		
	.cartContainer
		position relative
		background #f4f4f4
		height 100%
		.title
			font-size 32upx
			line-height 80upx
			margin-left 30upx
		.header
			display flex
			background #eee
			text
				width 33.333%
				height 80upx
				line-height 80upx
				text-align center
				font-size 26upx
		.contentContainer
			
			button
				width 480upx
				height 92upx
				background #DD1A21
				color #fff
				font-size 32upx
				line-height 92upx
			.addMore
				text-align center
				font-size 26upx
				color #7f7f7f
				line-height 60rpx
		.cartList
			height calc(100vh)
			.cartItem
				position relative
				display flex
				height 210upx
				background #fff
				margin-top 20upx
				padding 20upx
				.iconfont
					font-size 40upx
					line-height 172upx
					margin 0 40upx
					color #999
					&.selected
						color: #BB2C08
				.shopItem
					display flex 
					.shopImg
						width 172upx
						height 172upx
						background #eee
					.shopInfo
						font-size 28upx
						display flex
						flex-direction column
						margin-left 20upx
						text
							line-height 60upx
						.price
							color: #BB2C08
				.countCtrl
					position absolute
					right 20upx
					bottom 30upx
					text
						display inline-block
						width 60upx
						height 50upx
						text-align center
						line-height 50upx
						border 1upx solid #EEEEEE
						&:nth-child(2)
							border none
							border-top 1upx solid #EEEEEE
							border-bottom 1upx solid #EEEEEE
			.cartFooter
				position fixed
				display flex
				bottom 130upx
				height 96upx
				line-height 96upx
				width 100%
				background #fff
				font-size 30upx
				.iconfont
					font-size 40upx
					margin 0 20upx
					color: #999
					&.selected
						color: #BB2C08
				.right 
					height 96upx
					position absolute
					right 0
					.totalPrice
						display inline-block
						height 96upx
						line-height 96upx
					.preOrder
						display inline-block
						background #DD1A21
						width 225upx
						height 96upx
						line-height 96upx
						text-align center
						font-size 28upx
						color #fff
						margin-left 30upx
		.hint
			text-align center
			font-size 28upx
		
</style>
