<template>
	<view class="box">
		<view class="mlr-36 mt-20 plr-36 bg-white radius-10">
			<view class="pt-30 ml-4">
				乘车人
			</view>
			<u-field v-model="tel" label-width="0" placeholder="请输入手机号"></u-field>
			<u-field v-model="name" label-width="0" placeholder="请输入联系人姓名（选填）"></u-field>
		</view>
		<view class="fixed-bottom plr-36 ptb-50">
			<u-button type="primary" :disabled="!tel" @click="submit">确认呼叫</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '',
				name: ''
			}
		},
		onLoad() {
		},
		methods: {
			submit() {
				let data = {
					tel: this.tel,
					name: this.name
				}
				uni.navigateBack({
				})
				uni.$emit('other',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-field {
		padding: 26rpx 0 !important;
	}

	/deep/.u-primary-hover {
		background: linear-gradient(to right,#00b6b4,#00d496) !important;
	}

	/deep/.u-btn--primary--disabled {
		background-color: $bg-1 !important;
	}

	.box {
		width: 100%;
		height: 100vh;
		background: #F8F8F8;
		overflow: hidden;
	}
</style>
