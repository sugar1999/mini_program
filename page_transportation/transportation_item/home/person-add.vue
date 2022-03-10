<template>
	<view>
		<u-field icon="man-add" v-model="name" label-width="0" placeholder="紧急联系人姓名"></u-field>
		<u-field icon="phone" type="number"  v-model="tel" label-width="0" placeholder="紧急联系人手机号码"></u-field>
		<view class="plr-36 mt-80">
			<u-button type="primary" :disabled="!tel || !name" @click="submit">保存</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				tel:''
			}
		},
		methods: {
			submit(){
				this.$http('/addons/ddrive/user/add_contact',{
					emergency_contact: this.name,
					contact_tel: this.tel
				},"POST").then(data=>{
					console.log(data);
					this.$store.dispatch('updateUserInfo')
					uni.showToast({
						title: '添加成功'
					})
					setTimeout(() => {
						uni.navigateBack({})
					}, 500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-btn {
		height: 96rpx !important;
	}
	
	/deep/.u-primary-hover {
		background: linear-gradient(to right,#00b6b4,#00d496) !important;
	}
	
	/deep/.u-btn--primary--disabled {
		background-color: $bg-1 !important;
	}
</style>
