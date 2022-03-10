<template>
	<view>
		<view class="plr-36 mt-30">
			<view class="gray-1">
				当前位置
			</view>
			<view class="size-40 bold mt-10">
				{{address}}
			</view>
		</view>
		<view class="plr-36 mt-60 gray-1">
			紧急联系人
		</view>
		<u-cell-item icon="man-add" title="点击新增紧急联系人" @click="goAdd" v-if="userInfo.emergency_contact==''"></u-cell-item>
		<u-cell-item icon="man-add" :title="userInfo.emergency_contact" :arrow="false" v-if="userInfo.emergency_contact!=''"></u-cell-item>
		<u-cell-item icon="phone" :title="userInfo.contact_tel" :arrow="false" v-if="userInfo.contact_tel!=''"></u-cell-item>
		<view class="fixed-bottom plr-36 pb-50">
			<view class="size-32 red">
				遇到危险，请立即向警方求助
			</view>
			<view class="mtb-20">
				谎报警将可能被处以五日以上十日以下拘留
			</view>
			<u-button type="primary" @click="submit">呼叫110</u-button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import amapFile from '../../../libs/amap-wx.js'
	export default {
		data() {
			return {
				address: '',
				name:'',
				tel:'',
				key:'bb6f4ed802756f963b37c184ce4e9766'
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onShow() {
			var _this = this;
			this.amapPlugin = new amapFile.AMapWX({
				key: this.key
			});
			this.getRegeo()
			// uni.getLocation({
			// 	type: 'gcj02',
			// 	geocode: true,
			// 	success: function(res) {
			// 		console.log(res);
			// 		_this.address = res.address.province + res.address.city + res.address.district + res.address.street + res.address
			// 			.poiName
			// 	}
			// });
		},
		methods: {
			goAdd(){
				uni.navigateTo({
					url:'/page_transportation/transportation_item/home/person-add'
				})
			},
			//获取位置
			getRegeo() {
				let _this = this
				uni.showLoading({
					title: '获取定位信息中'
				});
				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log(9888888888888888888888888, data)
						this.address = data[0].name
						uni.hideLoading();
					}
				});
			},
			submit() {
				uni.makePhoneCall({
					phoneNumber: '110' //仅为示例
				});
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
</style>
