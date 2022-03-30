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
		<view v-if="currentPageId===1" class="wrap">
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
		<!-- 花圃 -->
		<view v-if="currentPageId===2" class="wrap">
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
		<!-- 文化 -->
		<view v-if="currentPageId===3" class="wrap">
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
		<!-- 风俗 -->
		<view v-if="currentPageId===4" class="wrap">
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
		<!-- 打卡 -->
		<view v-if="currentPageId===5" class="wrap">
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
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
			let result = await request('/getScenetyData')
			this.dataList = result.data.scenery
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
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;

		.wrapItem {
			width: 100%;
			display: flex;
			flex-direction: row;
			margin-top: 30rpx;
			box-shadow: 0rpx 0rpx 90rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 12rpx;

			.leftImg {
				.imgCss {
					width: 250rpx;
					height: 250rpx;
					border-radius: 5%;
					// margin-left: 20rpx;
				}
			}

			.content {
				padding: 0 20rpx;

				&>p:nth-child(1) {
					color: #e45656;
					font-size: 32rpx;
					font-weight: bold;
					margin-top: 10rpx;
				}

				>p:nth-child(2) {
					text-indent: 2em;
					width: 100%;
					font-size: 28rpx;
					height: 182rpx;
					white-space:normal;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
					-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
					-webkit-line-clamp: 5; /** 显示的行数 **/
					overflow: hidden;  /** 隐藏超出的内容 **/
				}
			}
		}
	}
</style>
