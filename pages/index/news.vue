<!-- 文章资讯 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">景点资讯</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 第一页 景点消息 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList1" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>{{res.CommentCount}}</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第二页 疫情 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList2" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>{{res.CommentCount}}</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第三页 待定 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList3" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>{{res.CommentCount}}</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第四页 待定 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<navigator :url="'../news/news?informationid='+res.informationid+'&message='+res.message+'&title='+res.title+'&time='+res.time+'&authorName='+res.authorName+'&img='+res.img" v-for="(res, index) in dataList4" :key="index">
								<view class="cu-card article no-card">
									<view class="cu-item shadow borderBottom">
										<view class="title">
											<view class="text-cut">{{res.title}}</view>
										</view>
										<view class="content">
											<image :src="res.img"
											 mode="aspectFill"></image>
											<view class="desc">
												<view class="text-content">{{res.message}}</view>
												<view class="margin-top-xs">
													<view class="text-gray light sm round fl">{{res.time}}</view>
													<view class="text-gray light sm round fr">
														<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
														<text>{{res.CommentCount}}</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				dataList1: [],
				dataList2: [],
				dataList3: [],
				dataList4: [],
				list: [],
				current: 0,
				swiperCurrent: 0,
			};
		},
		async mounted() {
			let result = await request('/getNewsData')
			const data = result.data
			this.dataList1 = data.dataList1
			this.dataList2 = data.dataList2
			this.dataList3 = data.dataList3
			this.dataList4 = data.dataList4
			this.list = data.list
		},
		methods: {
			reachBottom() {
				// 此tab为空数据
				if(this.current != 2) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						// this.getOrderList(this.current);
					}, 1200);
				}
			},
			change(index) {
				this.swiperCurrent = index;
				// this.getOrderList(index);
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.text-content{
		text-indent: 2em;
		white-space:normal;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 3; /** 显示的行数 **/
		overflow: hidden;  /** 隐藏超出的内容 **/
	}
	.borderBottom{
		border-bottom: 1px solid #f2f2f2;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
</style>
