<template>
	<view class="fui-wrap">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">预约上门</block>
		</cu-custom>

		<view class="fui-page__bd">
		</view>

		<view class="fui-page__bd">
			<view class="fui-section__title">基本信息</view>
			<fui-input v-model="data.deliveryRecipientAddress" label="配送地址" :bottomLeft="0" placeholder="请输入配送地址">
			</fui-input>

			<view class="fui-section__title">预约配送时间</view>
			<view class="" style="display: flex;">
				<button style="flex: 1" block @click="dateVisible = true">{{ date }}</button>
				<button style="flex: 1" block @click="timeStartVisible = true">{{ timeStart }}</button>
			</view>
		</view>

		<view class="fui-page__bd">
			<view class="fui-section__title">您的性别</view>
			<view class="" style="margin-left: 30rpx; margin-bottom: 30rpx;">
				<fui-radio-group name="radio" v-model="val" @change="changeSex">
					<view class="">
						<view class="fui-align__center">

							<fui-label>
								<fui-radio value="0" checked></fui-radio>
								<text class="fui-text">男</text>
							</fui-label>
							<fui-label :margin="['0','0','0','40rpx']">
								<fui-radio value="1"></fui-radio>
								<text class="fui-text">女</text>
							</fui-label>
						</view>
					</view>
				</fui-radio-group>
			</view>

		</view>

		<view class="fui-page__bd">
			<view class="fui-section__title">付款方式</view>
			<view class="" style="margin-left: 30rpx; margin-bottom: 30rpx;">
				<fui-radio-group name="radio" v-model="val" @change="change">
					<view class="">
						<view class="fui-align__center">

							<fui-label>
								<fui-radio  value="微信支付" checked></fui-radio>
								<text class="fui-text">微信支付</text>
							</fui-label>
							<fui-label :margin="['0','0','0','40rpx']">
								<fui-radio value="银行卡"></fui-radio>
								<text class="fui-text">银行卡</text>
							</fui-label>
						</view>
					</view>

				</fui-radio-group>
			</view>
			<fui-input v-if="data.deliveryPaymentMethod == '银行卡'" label="卡号" :bottomLeft="0" borderTop placeholder="请输入银行卡账号" clearable
				v-model="text"></fui-input>
		</view>


		<view class="fui-page__bd">
			<view class="fui-section__title">包裹信息</view>
			<view class="page-box">
				<view class="order">

					<view class="item">
						<view class="left">
							<image src="http://p1362.bvimg.com/10465/1b763af7e4a3d120.png" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="top">
								<view class="right">
									<view class="border2">
										{{dataList1.packageLogisticsCompany}}
									</view>
								</view>
								<view class="left">
									<uni-text class="cuIcon-titles text-blue"></uni-text>
									<view class="store">{{ dataList1.packageDetails }}</view>
								</view>
							</view>

							<view class="type">始发地：{{ dataList1.packageSenderAddress }}</view>
							<view class="type">寄件人：{{ dataList1.packageSenderName }}</view>
							<view class="" style="display: flex;">
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<view class="fui-page__bd">
			<view class="fui-section__title">特别需求</view>
			<fui-input label="无接触配送" :bottomLeft="0" borderTop placeholder=" " disabled @click="sendf">
				<view class="">
					<view class="fui-align__center">
						<fui-label>
							<fui-radio value="1" :checked="data.deliveryContactlessDistribution"></fui-radio>
							<text class="fui-text"></text>
						</fui-label>
					</view>
				</view>

			</fui-input>

			<view style="margin-top: 20rpx;">
			</view>

			<fui-input label="号码保护" :bottomLeft="0" borderTop placeholder=" " disabled @click="protectedf">
				<view class="">
					<view class="fui-align__center">
						<fui-label>
							<fui-radio value="1" :checked="data.deliveryPhonesProtected"></fui-radio>
							<text class="fui-text"></text>
						</fui-label>
					</view>
				</view>

			</fui-input>
		</view>



		<view class="fui-page__bd"></view>
		<view class="fui-page__bd"></view>

		<view class="" style=" z-index: 1; 
						position: fixed; 
						bottom: -0rpx; 
						width: 100%; 
						background-color: #fff;
						padding: 20rpx 30rpx;
						box-shadow: 0px 0px 20px #888888;">

			<fui-row>
				<fui-col :span="14">
					<view class="fui-col__item fui-color__black">
						<fui-input label="总金额" :bottomLeft="0" borderTop :placeholder="data.deliveryFreight+'元'"
							disabled />
					</view>
				</fui-col>

				<fui-col :span="10">
					<view class=" fui-col__item fui-color__black">
						<fui-button @click="submit()">提交</fui-button>
					</view>
				</fui-col>
			</fui-row>
		</view>
		<s-date-time-picker v-model="date" :visible.sync="dateVisible" @confirm="onConfirmDate" />
		<s-date-time-picker v-model="timeStart" type="time" :visible.sync="timeStartVisible"
			@confirm="onConfirmTimeStart" />
	</view>
</template>

<script>
	import {
		packageByPackageId,
		postUserIndoorBooking
	} from '@/apis/express_apis.js'
	import {
		formatDate
	} from '@/uni_modules/s-ui/utils';
	export default {
		data() {
			return {
				date: formatDate(new Date(), 'YYYY-MM-DD'),
				timeStart: formatDate(new Date(), 'HH:mm'),
				dateVisible: false,
				timeStartVisible: false,
				text: '',
				value: '微信支付',
				send: false,
				protected: false,
				dataList1: {
					id: 1,
					imgUrl: 'http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg',
					type: '顺丰',
					title: '捷安特自行车',
					details: '浙江省杭州市新安江物流集团总公司，已收入',
					time: '2020年11月11日15：00：00'
				},
				data: {
					deliveryContactlessDistribution: 0,
					deliveryEta: "",
					deliveryFreight: 0,
					deliveryId: "",
					deliveryPaymentMethod: "微信支付",
					deliveryPhonesProtected: 0,
					deliveryRecipientAddress: "string",
					deliveryRecipientGender: 0,
					deliveryRecipientName: "string",
					deliveryRecipientPhone: "string",
					packageId: "string",
					uid: ""
				}
			}
		},
		onLoad(option) {
			var _this = this;
			console.log(option.packageId);
			console.log(option.uid);
			this.data.packageId = option.packageId;
			this.data.uid = option.uid;
			var pid = {
				packageId: option.packageId
			}
			packageByPackageId(pid).then((res) => {
				if (res.statusCode == "200") {

					_this.dataList1 = res.data;
					_this.data.deliveryFreight = Math.ceil(_this.dataList1.packageWeight) + 5;
					_this.data.deliveryRecipientAddress = _this.dataList1.packageRecipientAddress;
					_this.data.deliveryRecipientName = _this.dataList1.packageRecipientName;
					_this.data.deliveryRecipientPhone = _this.dataList1.packageRecipientPhone;
					console.log(res.data);
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
			change(event) {
				this.data.deliveryPaymentMethod = event.detail.value;
			},
			changeSex(event) {
				this.data.deliveryRecipientGender = event.detail.value;
			},
			sendf(event) {
				if (this.data.deliveryContactlessDistribution == 0) {
					this.data.deliveryContactlessDistribution = 1;
				} else {
					this.data.deliveryContactlessDistribution = 0;
				}
			},

			protectedf(event) {
				if (this.data.deliveryPhonesProtected == 0) {
					this.data.deliveryPhonesProtected = 1;
				} else {
					this.data.deliveryPhonesProtected = 0;
				}
				return this.protected;
			},
			onConfirmDate(e) {
				console.log(e.value);
				console.log(this.date);
			},
			onConfirmTimeStart(e) {
				console.log(e.value);
			},
			submit() {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否要提交预约上门信息？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.showLoading({
								title: '提交中..'
							})
							_this.data.deliveryEta = _this.date + " " + _this.timeStart;
							postUserIndoorBooking(_this.data).then((res) => {
								if (res.statusCode == "200") {
									console.log(res.data);
									uni.hideLoading();
									uni.navigateBack();
								} else {
									console.log(res);
									uni.hideLoading();
									uni.showToast({
										title: '失败',
										duration: 2000,
										icon: 'error'
									});
								}
							})

						} else if (res.cancel) {
							console.log('用户点击取消');
						}

					}
				});
			}
		}
	}
</script>


<style>
	page {
		font-weight: normal;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-left__icon {
		padding-right: 24rpx;
	}
</style>

<style lang="scss" scoped>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	button::after {
		border: none
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.right {

				.progressBox {
					width: 60rpx;
					float: right;

				}

				.border1 {
					border-radius: 10rpx;
					background-color: rgba(24, 181, 102, 0.1);
					color: #18b566;
					padding: 4rpx 6rpx;
				}

				.border2 {
					border-radius: 10rpx;
					background-color: rgba(242, 145, 0, 0.1);
					color: #f29100;
					padding: 4rpx 6rpx;
				}

				.border3 {
					border-radius: 10rpx;
					background-color: rgba(130, 132, 138, 0.1);
					color: #82848a;
					padding: 4rpx 6rpx;
				}
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 260rpx;
					height: 190rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 45rpx;
				}

				.type {
					margin: 6rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					line-clamp: 3;
					-webkit-box-orient: vertical;
				}

				.delivery-time {
					color: #0081ff;
					font-size: 24rpx;
				}
			}

			.right {

				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			line-height: 70rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.btnBox {
				width: 150rpx;
				display: flex;
				justify-content: space-between;

				.btn {
					line-height: 52rpx;
					width: 140rpx;
					border-radius: 12rpx;
					border: 2rpx solid $u-tips-color;
					font-size: 26rpx;
					text-align: center;
					color: $u-tips-color;
				}

				.evaluate {
					color: $u-type-primary;
					border-color: $u-type-primary;
				}
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 300rpx;
			border-radius: 50%;
			margin: 0 auto;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
