<!-- 课程班级 -->
<template>

	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">乡村旅游</block>
		</cu-custom>
		<!-- tabs -->
		<u-tabs :list="list1" @change="click" :current="currentPageId" itemStyle="width:20%;height:80rpx"></u-tabs>
		<!-- 推荐 -->
		<view v-if="currentPageId===0" class="wrap">
			<view class="wrapItem" v-for="(item,index) in dataList" :key="index">
				<view class="leftImg">
					<image class="imgCss" :src="item.imgUrl"></image>
				</view>
				<view class="content">
					<p>{{item.content}}</p>
					<p>{{item.text}}</p>
				</view>
				
			</view>
			<u-divider text="已经到底了"></u-divider>
			
			
		</view>
		<!-- 热门 -->
		<view v-if="currentPageId===1">
			<view v-for="(item,index) in dataList" class="oneContent" :key="index">
				<image :src="item.imgUrl"></image>
			</view>
		</view>
		<!-- 花圃 -->

		<!-- 文化 -->
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				dataList: [],
				currentPageId: 0,
				list1: [{
					name: '推荐',
				}, {
					name: '热门',
				}, {
					name: '花圃'
				}, {
					name: '文化'
				}, {
					name: '风俗'
				}, {
					name: '打卡'
				}]
			};
		},
		async onLoad() {
			let result = await request('/getIndexData')
			this.dataList = result.data.scenery
		},
		computed: {

		},
		methods: {
			click(item) {
				this.currentPageId = item.index
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.wrap {
		margin: auto;
		width: 90%;
		// background-color: #ecf5ff;
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 40rpx;
		.wrapItem {
			width: 100%;
			display: flex;
			flex-direction: row;
			margin-top: 30rpx;
			// border: 1rpx solid gray;
			// border-radius: 5%;
			.leftImg {
				.imgCss {
					width: 250rpx;
					height: 250rpx;
					border-radius: 5%;
					margin-left: 20rpx;
				}
			}
			.content {
				padding: 0 20rpx;
				&>p:nth-child(1){
					color: #e45656;
					font-size: 32rpx;
					font-weight: bold;
				}
				>p:nth-child(2){
					text-indent: 2em;
					width: 100%;
					font-size: 28rpx;
					height: 190rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:5;
				}
			}
		}
	}
</style>
