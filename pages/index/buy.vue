<template>
	<view class="categoryContainer">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">旅游购物</block>
		</cu-custom>
		<!-- 头部 -->
		<view class="searchHeader">
			<view class="search">搜索商品</view>
		</view>
		<!-- 左侧 -->
		<view class="contentContainer">
			<view class="leftContainer">
				<scroll-view  class="scrollContainer" scroll-y="true" show-scrollbar='false'>
					<ul class='navList'>
						<li 
						@click='changeNavIndex(item.id)'
						 v-for='(item, index) in categoryList'
							:key='index' 
							:class='navIndex === item.id?"active":""'
						>{{item.name}}</li>
					</ul>
				</scroll-view>
			</view>
			
			<!-- 右侧 -->
			<view class="rightContainer">
				<scroll-view scroll-y="true" class="scrollContainer">
					<view class="proList">
						<image class="cateImg" :src="subcatelistBanner" mode=""></image>
						<view  class='proItem' v-for='(item, index) in categoryObj' :key='index' @click="toDetail(item)">
							<view class="imgCss">
								<image :src="item.wapBannerUrl" mode="" class="imgimg"></image>
							</view>
							<p>{{item.name}}</p>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import { mapState} from 'vuex'
	export default {
		data() {
			return {
				categoryList: [],
				navIndex: 0,
				merchandise:[]
			}
		},
		async mounted() {
			let res = await request('/query')
			this.$store.commit('getCartList',res.data.shoppingcart)
			this.merchandise = res.data
			this.categoryList = this.merchandise.buysdata
			this.navIndex = this.categoryList[0].id
		},
		methods:{
			changeNavIndex(navIndex){
				this.navIndex = navIndex
			},
			toDetail(shopItem) {
				console.log(shopItem)
				uni.navigateTo({
					url:'../me/detail?shopItem='+JSON.stringify(shopItem)
				})
			}
		},
		computed: {
			categoryObj(){
				let subcatelist = []
				for (let i in this.merchandise.subcatelist) {
					if(this.merchandise.subcatelist[i].superCategoryId === this.navIndex){
						subcatelist.push(this.merchandise.subcatelist[i])
					}
				}
				return subcatelist
			},
			subcatelistBanner() {
				let bannerImgUrl = ''
				for (let i in this.categoryList) {
					if(this.categoryList[i].id===this.navIndex)
					bannerImgUrl = this.categoryList[i].imgUrl
				}
				return bannerImgUrl
			}
		}
	}
</script>

<style lang="stylus">
	.categoryContainer
		.searchHeader 
			width 100%
			height 56upx
			padding 10upx 0
			.search
				width 94%
				height 56upx
				line-height 56upx
				background #EDEDED
				margin 0 auto
				text-align center
				font-size 28upx
				border-radius 10upx
		.contentContainer
			display flex
			box-sizing border-box
			height calc(100vh - 76upx)
			border-top 1upx solid #EEEEEE
			.leftContainer
				width 20%
				height 100%
				font-size 26upx
				text-align center
				box-sizing border-box
				border-right 1upx solid #eee
				.scrollContainer
					height 100%
					.navList
						li 
							position relative
							height 80upx
							line-height 80upx
							color #666
							&.active
								&:after
									content ''
									height 70%
									width 2rpx 
									background #B4282D
									position absolute
									top 15%
									left 6upx
			.rightContainer
				width 80%
				height 100%
				margin-bottom 110upx
				.scrollContainer
					height 100%
				.proList
					width 100%
					display flex
					flex-wrap wrap
					.cateImg
						width 520upx
						height 190upx
						margin 20upx auto
					.proItem 
						width 33%
						padding 10upx
						box-sizing border-box
						display flex 
						align-items center
						flex-direction column
						.imgCss
							width 150upx
							height 150upx
							.imgimg 
								width 120upx 
								height 120upx
								margin-top 15upx
								margin-left 15upx
							p
								font-size 24upx
								text-align center
</style>
