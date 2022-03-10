<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">上门订单详情</block>
		</cu-custom>
		
		<fui-card src="http://p1362.bvimg.com/10465/e54a26087ddfd7d5.png" full :title="'预约单号:'+items.hroId" tag=" " v-for="(items, index) of house" :key="index">
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						预约日期
					</text>
					<text style="float: right;">
						{{items.hroOrderDate}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						开始时间
					</text>
					<text style="float: right;">
						{{items.hroOrderStartTime}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						结束时间
					</text>
					<text style="float: right;">
						{{items.hroOrderEndTime}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						预约人
					</text>
					<text style="float: right;">
						{{user[index].name}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						联系电话
					</text>
					<text style="float: right;">
						{{user[index].phone}}
					</text>
				</view>
			</view>
			<view class="" style="height: 15rpx;">
				
			</view>
		</fui-card>
		
	</view>
</template>

<script>
	import {
		selectRentAppointmentByHouseId
	} from '@/apis/rent_apis.js'
	import {
		selectUserByUid
	} from '@/apis/user_apis.js'
	export default {
		data() {
			return {
				house: [],
				user: []
			}
		},
		onLoad (option) {
			var _this = this;
			console.log(option.houseId);
			var data = {
				houseId: option.houseId
			}
			selectRentAppointmentByHouseId(data).then((res) => {
				if (res.statusCode == "200") {

					console.log(res.data);
					_this.house = res.data;
					
					for(var i=0; i<_this.house.length; ++i)
					{
						var data = {
							uid: _this.house[i].hroTenantId
						}
						
						this.selectUser(data,i);
					}
					
					
				} else {
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
		},
		methods: {
			selectUser(data,i) {
				selectUserByUid(data).then((res) => {
					if (res.statusCode == "200") {
				
						console.log(res.data);
						this.user.push(res.data[0]);
						
					} else {
						uni.showToast({
							title: '获取失败',
							duration: 2000,
							icon: 'error'
						});
					}
				})
			}
		}
	}
</script>

<style>

</style>
