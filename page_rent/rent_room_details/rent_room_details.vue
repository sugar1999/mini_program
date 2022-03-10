<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">房屋详情</block>
		</cu-custom>

		<s-swiper :list="list" indicator indicator-type="round" height="400rpx" />

		<fui-card :src="src" title=" " tag=" ">
			<view class="fui-card__content">
				<view style="margin: 30rpx 0">
					<text class="price">{{houseResult.hrPrice}}</text>
					<text style="color: #006FFF; font-size: 26rpx;"> 元 /月</text>
				</view>
				<view class="roomDetails">
					{{houseResult.hrDescribe}}
				</view>
				<s-grid :border="false">
					<s-grid-item icon="" text="">
						<view style="color: #A6A6A6; font-size: 32rpx;">
							面积
						</view>
						<view style="font-size: 38rpx;">
							{{houseResult.hrArea}}
						</view>
					</s-grid-item>
					<s-grid-item icon="" text="">
						<view style="color: #A6A6A6; font-size: 32rpx;">
							楼层
						</view>
						<view style="font-size: 38rpx;">
							{{houseResult.hrFloor}}楼
						</view>
					</s-grid-item>
					<s-grid-item icon="" text="">
						<view style="color: #A6A6A6; font-size: 32rpx;">
							朝向
						</view>
						<view style="font-size: 38rpx;">
							{{houseResult.hrToward}}
						</view>
					</s-grid-item>
					<s-grid-item icon="" text="">
						<view style="color: #A6A6A6; font-size: 32rpx;">
							支付
						</view>
						<view style="font-size: 38rpx;">
							{{houseResult.hrpay}}
						</view>
					</s-grid-item>
				</s-grid>
			</view>
		</fui-card>

		<view style="height: 30rpx;">

		</view>

		<fui-card :src="src" title="房源信息" tag=" " color="#006FFF">
			<view class="fui-card__content">
				<view style="height: 30rpx;">

				</view>
				<s-row justify="left" style="display: flex;">
					<s-col style="flex:1">
						<view class="box">
							<view class="">
								<text style="color: #A6A6A6; font-size: 32rpx;">
									装修
								</text>
								<text style="display: inline-block; width: 50rpx;"></text>
								<text style="font-size: 32rpx;">
									{{houseResult.hrDecorate}}
								</text>
							</view>
							<view style="height: 15rpx;">

							</view>
							<view class="">
								<text style="color: #A6A6A6; font-size: 32rpx;">
									出租方式
								</text>
								<text style="display: inline-block; width: 50rpx;"></text>
								<text style="font-size: 32rpx;">
									{{houseResult.hrType}}
								</text>
							</view>
						</view>

					</s-col style="flex:1">

					<s-col style="flex:1">
						<view class="box">
							<view class="">
								<text style="color: #A6A6A6; font-size: 32rpx;">
									户型
								</text>
								<text style="display: inline-block; width: 50rpx;"></text>
								<text style="font-size: 32rpx; width: 80rpx;">
									{{houseResult.hrBedroomAmount}}室 {{houseResult.hrLivingRoomAmount}}厅 {{houseResult.hrToiletAmount}}卫
								</text>
							</view>
							<view style="height: 15rpx;">

							</view>
							<view class="">
								<text style="color: #A6A6A6; font-size: 32rpx;">

								</text>
								<text style="display: inline-block; width: 50rpx;"></text>
								<text style="font-size: 32rpx;">

								</text>
							</view>
						</view>
					</s-col>
				</s-row>
				<view style="height: 30rpx;">

				</view>
			</view>
		</fui-card>

		<view style="height: 30rpx;">

		</view>

		<fui-card :src="src" title="房源简介" tag=" " color="#006FFF">
			<view class="fui-card__content">
				<s-grid :border="false">
					<s-grid-item :icon="houseResult.hrWashingMachine" text="洗衣机" />
					<s-grid-item :icon="houseResult.hrRefrigerator" text="冰箱" />
					<s-grid-item :icon="houseResult.hrTv" text="电视" />
					<s-grid-item :icon="houseResult.hrAirConditioner" text="空调" />
					<s-grid-item :icon="houseResult.hrWaterHeater" text="热水器" />
					<s-grid-item :icon="houseResult.hrNaturalGas" text="天然气" />
					<s-grid-item :icon="houseResult.hrBed" text="床" />
					<s-grid-item :icon="houseResult.hrNetwork" text="网络" />
					<s-grid-item :icon="houseResult.hrCloset" text="衣柜" />
				</s-grid>
				<view class="intro_title">
					房源亮点
				</view>
				<view class="intro_details">
					{{houseResult.hrIntroduce}}
				</view>
				<view class="intro_title">
					地理位置
				</view>
				<view class="intro_details">
					{{houseResult.hrLocation}}
				</view>
			</view>
		</fui-card>

		<view style="height: 30rpx;">

		</view>

		<fui-card :src="src" title="房主信息" tag=" " color="#006FFF">
			<view class="fui-card__content">
				<s-row :gutter="20">
					<s-col span="5">
						<s-image class="landlord_image" :src="user.avatar" mode="aspectFill"
							show-loading fade-show round />
					</s-col>
					<s-col span="10">
						<view style="font-size: 32rpx;">
							{{user.name}}
						</view>
						<view style="color: #A6A6A6; font-size: 32rpx;">
							{{user.phone}}
						</view>
					</s-col>
					<s-col span="9">
						<s-button type="primary" plain icon="https://img01.yzcdn.cn/vant/user-active.png" @click="makeCall()">联系房主
						</s-button>
					</s-col>
				</s-row>
				<view style="height: 30rpx;">

				</view>
			</view>
		</fui-card>

		<view style="height: 30rpx;">

		</view>

		<s-fixed safe-area-inset>
			<view style="background-color: white; padding: 20rpx 30rpx;">
				<s-row :gutter="20">
					<s-col span="24">
						<s-button type="primary" @click="bottomVisible = true" block>预约看房</s-button>
					</s-col>
				</s-row>
			</view>
		</s-fixed>

		<s-popup v-model="bottomVisible" position="bottom" round background="#fff" height="800">
			<view class="" style="position: relative; padding: 0 30rpx;">
				<view style="height: 30rpx;">

				</view>
				<view style="color: #A6A6A6; font-size: 32rpx; margin: 10rpx 0">
					预约日期
				</view>
				<c-demo-block title="基础用法">
					<s-button block @click="dateVisible = true">{{ date }}</s-button>
				</c-demo-block>
				<view style="color: #A6A6A6; font-size: 32rpx; margin: 10rpx 0">
					开始时间
				</view>
				<c-demo-block title="选择时间">
					<s-button block @click="timeStartVisible = true">{{ timeStart }}</s-button>
				</c-demo-block>
				<view style="color: #A6A6A6; font-size: 32rpx; margin: 10rpx 0">
					结束时间
				</view>
				<c-demo-block title="选择时间">
					<s-button block @click="timeEndVisible = true">{{ timeEnd }}</s-button>
				</c-demo-block>
				<view style="height: 30rpx;">

				</view>
				<view style="color: #A6A6A6; font-size: 32rpx; margin: 10rpx 0">
					提示：开始时间 和 结束时间 仅代表您打算看房的时间，该时间将提供给房主进行参考，不代表您的实际看房时间
				</view>


				<view style="background-color: white; padding: 20rpx 10rpx;">
					<s-row :gutter="20">
						<s-col span="24">
							<s-button type="primary" @click="submitAppointment" block>提交预约信息</s-button>
						</s-col>
					</s-row>
				</view>

			</view>

		</s-popup>

		<s-date-time-picker v-model="date" :visible.sync="dateVisible" @confirm="onConfirmDate" />
		<s-date-time-picker v-model="timeStart" type="time" :visible.sync="timeStartVisible"
			@confirm="onConfirmTimeStart" />
		<s-date-time-picker v-model="timeEnd" type="time" :visible.sync="timeEndVisible" @confirm="onConfirmTimeEnd" />
	</view>
</template>

<script>
	import {
		selectRentInformationByHouseId,
		insertIntoRentAppointment
	} from '@/apis/rent_apis.js'
	import {
		formatDate
	} from '@/uni_modules/s-ui/utils';
	import {
		selectUserByUid
	} from '@/apis/user_apis.js'
	export default {
		data() {
			return {
				bottomVisible: false,
				list: [
					'/static/imgs/banner-1.jpg',
					'/static/imgs/banner-2.jpg',
					'/static/imgs/banner-3.jpg',
				],
				room: {
					price: 2500,
					roomType: '3室1厅1卫',
					area: 59.38,
					toward: '南',
				},
				date: formatDate(new Date(), 'YYYY-MM-DD'),
				dateVisible: false,
				timeStart: formatDate(new Date(), 'HH:mm'),
				timeEnd: formatDate(new Date(), 'HH:mm'),
				timeStartVisible: false,
				timeEndVisible: false,
				houseResult: [],
				user: []
			}
		},
		onLoad(option) {
			console.log(option);
			console.log(option.hrId);
			var _this = this;
			var data = {
				houseId: option.hrId
			}
			selectRentInformationByHouseId(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					_this.houseResult = res.data;
					_this.houseResult.hrBed = 1;

					switch (_this.houseResult.hrToward) {
						case 1: {
							_this.houseResult.hrToward = '东';
							break;
						}
						case 2: {
							_this.houseResult.hrToward = '西';
							break;
						}
						case 3: {
							_this.houseResult.hrToward = '南';
							break;
						}
						case 4: {
							_this.houseResult.hrToward = '北';
							break;
						}
						case 5: {
							_this.houseResult.hrToward = '东西';
							break;
						}
						case 6: {
							_this.houseResult.hrToward = '南北';
							break;
						}
					}

					switch (_this.houseResult.hrType) {
						case 1: {
							_this.houseResult.hrType = '整租';
							break;
						}
						case 2: {
							_this.houseResult.hrType = '合租';
							break;
						}
					}

					_this.houseResult.hrDecorate = _this.houseResult.hrDecorate == 1 ? '整租' : '合租';
					_this.houseResult.hrWashingMachine = _this.houseResult.hrWashingMachine == 1 ? 'passed' :
						'close';
					_this.houseResult.hrRefrigerator = _this.houseResult.hrRefrigerator == 1 ? 'passed' : 'close';
					_this.houseResult.hrTv = _this.houseResult.hrTv == 1 ? 'passed' : 'close';
					_this.houseResult.hrAirConditioner = _this.houseResult.hrAirConditioner == 1 ? 'passed' :
						'close';
					_this.houseResult.hrWaterHeater = _this.houseResult.hrWaterHeater == 1 ? 'passed' : 'close';
					_this.houseResult.hrNaturalGas = _this.houseResult.hrNaturalGas == 1 ? 'passed' : 'close';
					_this.houseResult.hrNetwork = _this.houseResult.hrNetwork == 1 ? 'passed' : 'close';
					_this.houseResult.hrCloset = _this.houseResult.hrCloset == 1 ? 'passed' : 'close';

					_this.houseResult.hrBed = _this.houseResult.hrBedAmount > 0 ? 'passed' : 'close';

					_this.list = _this.houseResult.hrPicture.split('#');
					console.log(123);
					console.log(_this.list);
					var data = {
						uid: _this.houseResult.hrUserId
					}
					selectUserByUid(data).then((res) => {
						if (res.statusCode == "200") {
					
							console.log(res.data);
							_this.user = res.data[0];
							
						} else {
							uni.showToast({
								title: '获取失败',
								duration: 2000,
								icon: 'error'
							});
						}
					})
					uni.hideLoading();
				} else {
					uni.hideLoading();
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
			
		},
		methods: {
			submitAppointment() {
				var data = {
					hroId: 'test',
					hroOrderDate: this.date,
					hroOrderEndTime: this.timeStart,
					hroOrderStartTime: this.timeEnd,
					hroRentId: this.houseResult.hrId,
					hroTenantId: '2'
				}
				console.log(data);
				insertIntoRentAppointment(data).then((res) => {
					if (res.statusCode == "200") {
						console.log("预约成功");
						uni.showToast({
							title: '提交成功',
							duration: 2000,
							icon: 'success'
						});
					} else {
						uni.showToast({
							title: '获取失败',
							duration: 2000,
							icon: 'error'
						});
					}
				})
			},
			onConfirmDate(e) {
				console.log(e.value);
				console.log(this.date);
			},
			onConfirmTimeStart(e) {
				console.log(e.value);
			},
			onConfirmTimeEnd(e) {
				console.log(e.value);
			},
			makeCall() {
				uni.makePhoneCall({
				    phoneNumber: this.user.phone //仅为示例
				});
			}
		}
	}
</script>

<style>
	.fui-card__content {
		margin: 0 20rpx;
	}

	.price {
		color: #006FFF;
		font-size: 46rpx;
	}

	.roomDetails {
		font-size: 32rpx;
		font-weight: bold;
	}

	.intro_title {
		font-size: 30rpx;
		color: #006FFF;
		margin-bottom: 20rpx;
	}

	.intro_details {
		font-size: 26rpx;
		margin-bottom: 10rpx;
	}

	.landlord_image {
		width: 100rpx;
		height: 100rpx;
	}
</style>
