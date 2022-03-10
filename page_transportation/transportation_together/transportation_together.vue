<template>
	<view>
		<index v-if="PageCur=='index'"></index>
		<bus_select v-if="PageCur=='bus_select'"></bus_select>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">交通出行</block>
		</cu-custom>
		

		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="index">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='index'" src="http://p1362.bvimg.com/10465/ce800c4769ef81a9.png"></image>
						<image v-if="PageCur != 'index'" src="http://p1362.bvimg.com/10465/ec2758af980bb0b5.png"></image>
					</view>
					<view :class="PageCur=='index'?'color_main':'text-gray'">网约车</view>
				</view>
				
				<view class="action" @click="NavChange" data-cur="bus_select">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='bus_select'" src="http://p1362.bvimg.com/10465/9adddd44c71242f1.png"></image>
						<image v-if="PageCur != 'bus_select'" src="http://p1362.bvimg.com/10465/09e4ddd38ecf9001.png"></image>
					</view>
					<view :class="PageCur=='bus_select'?'color_main':'text-gray'">公交查询</view>
				</view>
				
			</view>
		</view>

	</view>
</template>

<script>
	import index from "../../page_transportation/transportation_item/home/index.vue"; //首页
	import bus_select from "../../page_transportation/transportation_item/bus_select.vue";
	export default {
		components: {
			index,
			bus_select
		},
		data() {
			return {
				PageCur: 'index',

				message: '2',
				openId: '',
				access_token: '',

				tip: "我是提示",
				duration: 1

			};
		},
		created() {

		},
		onLoad() {
			//获取退出时的tabbar记录
			// uni.getStorage({
			// 	key: 'PageCur',
			// 	success: function(res) {
			// 		that.PageCur = res.data;
			// 	},
			// 	fail: function(res) {}
			// });
		},
		methods: {
			NavChange: function(e) {
				console.log(e.currentTarget.dataset.cur)

				this.PageCur = e.currentTarget.dataset.cur;

				// document.title = '首页'
				if (this.PageCur == 'index') {
					// document.title = '积分商城'
				} else if (this.PageCur == 'select') {
					
				}
					// uni.setStorage({
					// 	key: 'PageCur',
					// 	data: this.PageCur,
					// 	success: function() {
					// 		console.log('保存成功！');
					// 	}
					// });
			},
			NavChange_xd: function() {
				uni.navigateTo({
					url: 'publish',
					animationType: 'slide-in-bottom',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}

	.logo_btn {
		width: 38*2rpx;
		height: 38*2rpx;
		position: absolute;
		z-index: 2;
		border-radius: 50%;
		top: -40rpx;
		left: 0rpx;
		right: 0;
		margin: auto;
		padding: 0;
	}

	.cu-bar.tabbar .action.add-action {
		padding-top: 56rpx !important;
	}
</style>
