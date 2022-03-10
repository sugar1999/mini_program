<template>
	<view class="box">
		<view class="mlr-36 pb-50">
			<view class="size-34 bold ptb-30">
				平台相关
			</view>
			<view class="bg-white radius-10 pd-30">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<u-radio name="1" class="w100 mtb-10">
						平台派单太远
					</u-radio>
					<u-radio name="2" class="w100 mtb-10">
						上车位置错误/找不到上车位置
					</u-radio>
				</u-radio-group>
			</view>
			<view class="size-34 bold ptb-30">
				司机相关
			</view>
			<view class="bg-white radius-10 pd-30">
				<u-radio-group v-model="value" :wrap="true" @change="radioGroupChange">
					<u-radio name="3" class="w100 mtb-10">
						联系不上司机
					</u-radio>
					<u-radio name="4" class="w100 mtb-10">
						司机以各种理由不来接我
					</u-radio>
					<u-radio name="5" class="w100 mtb-20">
						司机要求取消订单
					</u-radio>
					<u-radio name="6" class="w100 mtb-10">
						司机原地不动或反方向行驶
					</u-radio>
					<view class="">
						<u-radio name="7" class="w100 mtb-10">
							司机要求加价或现金交易
						</u-radio>
					</view>
					<view class="">
						<u-radio name="8" class="w100 mtb-10">
							司机迟到
						</u-radio>
					</view>
					<view class="">
						<u-radio name="9" class="w100 mtb-10">
							不上订单显示车辆或司机
						</u-radio>
					</view>
				</u-radio-group>
			</view>
			<view class="size-34 bold ptb-30">
				自己相关
			</view>
			<view class="bg-white radius-10 pd-30">
				<u-radio-group v-model="value" :wrap="true" @change="radioGroupChange">
					<u-radio name="10" class="w100 mtb-10">
						行程有变
					</u-radio>
					<u-radio name="11" class="w100 mtb-10">
						目的地有误
					</u-radio>
					<u-radio name="12" class="w100 mtb-10">
						选择其他出行工具
					</u-radio>
				</u-radio-group>
			</view>
			<view class="mt-40">
				<u-button type="primary" shape="circle" @click="submit">确认提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				type:1,//1=代驾取消，2=顺风车取消
			}
		},
		onLoad(option) {
			this.id = option.id
			this.type = option.type
		},
		methods: {
			radioGroupChange(e) {
				console.log(e);
			},
			submit() {
				this.$http(this.type==1?'/addons/ddrive/order/cancel':'/addons/ddrive/sforder/cancel', {
					order_id: this.id,
					cancel_type: this.value
				}, "POST").then(data => {
					uni.showToast({
						title: '取消成功'
					})
					setTimeout(() => {
						if(this.type==2){
							uni.navigateBack({
								delta:2
							})
						}else{
							uni.navigateBack()
						}
					}, 1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
	}

	/deep/.u-radio-group {
		width: 100% !important;
	}
	/deep/.u-primary-hover {
		background: linear-gradient(to right,#00b6b4,#00d496) !important;
	}

	/* #ifndef MP-WEIXIN */
	/deep/.u-radio {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
	}

	/* #endif */
</style>
