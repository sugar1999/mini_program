<!-- 新闻 详情 -->
<template>
	<view class="container">
		<view style="background-color: #FFFFFF;padding: 30rpx 30rpx 30rpx 30rpx;">
			<view class="titleBox text-xl text-black text-bold">{{title}}</view>
			<view class="timeBox text-df text-gray margin-top-sm margin-bottom-sm">{{time}}</view>
			<image mode="widthFix" :src="img"></image>

			<!-- 中间文章区域 -->
			<view class="contentBox text-lg text-black margin-top-sm">
				<view v-html="message"></view>
			</view>
		</view>
		
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// informationid: '',
				message: '',
				title: '',
				time: '',
				authorName: '',
				img: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
			}
		},
		onLoad(option) {
			// this.detailsId = option.detailsId;
			// this.informationid = option.informationid;
			this.message = option.message;
			this.title = option.title;
			this.time = option.time;
			// this.authorName = option.authorName;
			this.img = option.img;
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f2f2f2;
		width: 750rpx;
	}
	image {
		width: 750rpx;
	}
</style>
