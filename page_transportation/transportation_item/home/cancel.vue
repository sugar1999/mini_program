<template>
	<view>
		<view class="mlr-36 pt-30 size-32 bold">
			司机<text class="green">已到达，</text>建议您尽快前往出发地点。
		</view><d :class="[classNameA, classNameB]"></d>
		<view class="mlr-36 flex mtb-80">
			<view @click="call(tel)" class="ptb-25 bg-green white center radius-10" style="width: 48%;">
				<image  class="mr-20" src="../../../static/cancel-tel.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				联系司机
			</view>
			<view @click="call(kefu)" class="ptb-25 green center radius-10" style="width: 48%;border: 1rpx solid #00C28E;">
				<image class="mr-20" src="../../../static/cancel-kefu.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				联系客服
			</view>
		</view>
		<view class="ptb-20 green size-26 plr-36" style="background: #EFFFFB;">
			本次取消订单，需联系客服核实情况
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel:'', //司机电话
				kefu:'' //客服
			}
		},
		onLoad(option) {
			this.tel = option.tel
			this.$http('/addons/ddrive/user/consumer_hotline',{},"POST").then(data=>{
				this.kefu = data.tel
			})
		},
		methods: {
			call(tel){
				uni.makePhoneCall({
					phoneNumber: tel //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
