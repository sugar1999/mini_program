<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">出租发布</block>
		</cu-custom>

		<view style="height: 30rpx;">
		</view>

		<fui-card :src="src" title="房源基本信息" tag=" " color="#006FFF">
			<view class="fui-card__content">
				<view style="height: 30rpx;">
				</view>
				<s-row justify="left" style="display: flex;">
					<s-col style="flex:1">
						<view class="box">
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									房屋名称（标题）
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrDescribe" style="display: inline;" type="text"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									楼层
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrFloor" style="display: inline;" type="text"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									详细地址
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrLocation" style="display: inline;" type="text"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									出租类型
								</text>
								<view style="height: 15rpx;">

								</view>
								<s-radio-group v-model="data.hrType">
									<s-row :gutter="40">
										<s-col>
											<s-radio :name="1" label="整租" />
										</s-col>
										<s-col>
											<s-radio :name="2" label="合租" />
										</s-col>
									</s-row>
								</s-radio-group>
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									期望租金
								</text>
								<view style="height: 15rpx;">
								</view>
								<input v-model="data.hrPrice" style="display: inline;" type="number"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									面积
								</text>
								<view style="height: 15rpx;">
								</view>
								<input v-model="data.hrArea" style="display: inline;" type="number"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									朝向
								</text>
								<view style="height: 15rpx;">
								</view>
								<s-radio-group v-model="data.hrToward">
									<s-row :gutter="40">
										<s-col>
											<s-radio :name="1" label="东" />
											<text style="margin-left: 30rpx;"></text>
											<s-radio :name="2" label="西" />
											<text style="margin-left: 30rpx;"></text>
											<s-radio :name="3" label="南" />
										</s-col>
									</s-row>
									<view style="height: 10rpx;">
									</view>
									<s-row :gutter="40">
										<s-col>
											<s-radio :name="4" label="北" />
											<text style="margin-left: 30rpx;"></text>
											<s-radio :name="5" label="东西" />
											<text style="margin-left: 30rpx;"></text>
											<s-radio :name="6" label="南北" />
										</s-col>
									</s-row>
								</s-radio-group>
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									客厅数量
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrLivingRoomAmount" style="display: inline;" type="number"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">

							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									卧室数量
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrBedroomAmount" style="display: inline;" type="number"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									卫生间数
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrToiletAmount" style="display: inline;" type="number"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">

							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									床数量
								</text>
								<view style="height: 15rpx;">
								</view>
								<input v-model="data.hrBedAmount" style="display: inline;" type="number"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									总房屋数量
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrRoomAmount" style="display: inline;" type="number"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">

							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									房屋亮点
								</text>
								<view style="height: 15rpx;">

								</view>
								<input v-model="data.hrIntroduce" style="display: inline;" type="text"
									placeholder="请输入文本" />
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									房屋图片
								</text>
								<view style="height: 15rpx;">
								</view>
								<view style="display: block">
									<view v-for="(item , index) in imgArr" :key="index"
										style="position: relative; display: inline-block; margin-right: 20rpx;">
										<image src="http://p1362.bvimg.com/10465/811d84ee9403038c.png" mode="aspectFit"
											@click="deleteImg(index)"
											style=" position: absolute; top:-10rpx; left: -10rpx; z-index: 100; width: 35rpx; height: 35rpx;">
										</image>
										<image :src="item" mode="aspectFill" class="uni-input repair-image"
											style="padding: 0; display: inline-block;"></image>
									</view>
									<view v-if="get_imgArrLength()" class="repair-image add-image" @click="chooseImg"
										style="position: relative; display: inline-block;">
									</view>
								</view>
							</view>
						</view>
					</s-col style="flex:1">
				</s-row>
				<view style="height: 30rpx;">
				</view>
			</view>
		</fui-card>

		<view style="height: 30rpx;">
		</view>

		<fui-card :src="src" title="房源附加信息" tag=" " color="#006FFF">
			<view class="fui-card__content">
				<view style="height: 30rpx;">
				</view>
				<s-row justify="left" style="display: flex;">
					<s-col style="flex:1">
						<view class="box">
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									装修情况
								</text>
								<view style="height: 15rpx;">
								</view>
								<s-radio-group v-model="data.hrDecorate">
									<s-row :gutter="40">
										<s-col>
											<s-radio :name="1" label="有" />
										</s-col>
										<s-col>
											<s-radio :name="0" label="无" />
										</s-col>
									</s-row>
								</s-radio-group>
							</view>
							<view style="height: 60rpx;">
							</view>
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									洗衣机
								</text>
								<view style="height: 15rpx;">
								</view>
								<s-radio-group v-model="data.hrWashingMachine">
									<s-row :gutter="40">
										<s-col>
											<s-radio :name="1" label="有" />
										</s-col>
										<s-col>
											<s-radio :name="0" label="无" />
										</s-col>
									</s-row>
								</s-radio-group>
								<view style="height: 60rpx;">
								</view>
								<view class="">
									<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
										冰箱
									</text>
									<view style="height: 15rpx;">
									</view>
									<s-radio-group v-model="data.hrRefrigerator">
										<s-row :gutter="40">
											<s-col>
												<s-radio :name="1" label="有" />
											</s-col>
											<s-col>
												<s-radio :name="0" label="无" />
											</s-col>
										</s-row>
									</s-radio-group>
								</view>
								<view style="height: 60rpx;">
								</view>
								<view class="">
									<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
										彩电
									</text>
									<view style="height: 15rpx;">
									</view>
									<s-radio-group v-model="data.hrTv">
										<s-row :gutter="40">
											<s-col>
												<s-radio :name="1" label="有" />
											</s-col>
											<s-col>
												<s-radio :name="0" label="无" />
											</s-col>
										</s-row>
									</s-radio-group>
								</view>
								<view style="height: 60rpx;">
								</view>
								<view class="">
									<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
										热水器
									</text>
									<view style="height: 15rpx;">
									</view>
									<s-radio-group v-model="data.hrWaterHeater">
										<s-row :gutter="40">
											<s-col>
												<s-radio :name="1" label="有" />
											</s-col>
											<s-col>
												<s-radio :name="0" label="无" />
											</s-col>
										</s-row>
									</s-radio-group>
								</view>
								<view style="height: 60rpx;">
								</view>
								<view class="">
									<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
										空调
									</text>
									<view style="height: 15rpx;">
									</view>
									<s-radio-group v-model="data.hrAirConditioner">
										<s-row :gutter="40">
											<s-col>
												<s-radio :name="1" label="有" />
											</s-col>
											<s-col>
												<s-radio :name="0" label="无" />
											</s-col>
										</s-row>
									</s-radio-group>
								</view>
								<view style="height: 60rpx;">
								</view>
								<view class="">
									<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
										天然气
									</text>
									<view style="height: 15rpx;">
									</view>
									<s-radio-group v-model="data.hrNaturalGas">
										<s-row :gutter="40">
											<s-col>
												<s-radio :name="1" label="有" />
											</s-col>
											<s-col>
												<s-radio :name="0" label="无" />
											</s-col>
										</s-row>
									</s-radio-group>
								</view>
								<view style="height: 60rpx;">
								</view>
								<view class="">
									<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
										网络
									</text>
									<view style="height: 15rpx;">
									</view>
									<s-radio-group v-model="data.hrNetwork">
										<s-row :gutter="40">
											<s-col>
												<s-radio :name="1" label="有" />
											</s-col>
											<s-col>
												<s-radio :name="0" label="无" />
											</s-col>
										</s-row>
									</s-radio-group>
								</view>
								<view style="height: 60rpx;">
								</view>
								<view class="">
									<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
										衣柜
									</text>
									<view style="height: 15rpx;">
									</view>
									<s-radio-group v-model="data.hrCloset">
										<s-row :gutter="40">
											<s-col>
												<s-radio :name="1" label="有" />
											</s-col>
											<s-col>
												<s-radio :name="0" label="无" />
											</s-col>
										</s-row>
									</s-radio-group>
								</view>
							</view>
						</view>
					</s-col style="flex:1">
				</s-row>
				<view style="height: 30rpx;">
				</view>
			</view>
		</fui-card>

		<view style="height: 30rpx;">
		</view>

		<fui-card :src="src" title="房源交易信息" tag=" " color="#006FFF">
			<view class="fui-card__content">
				<view style="height: 30rpx;">
				</view>
				<s-row justify="left" style="display: flex;">
					<s-col style="flex:1">
						<view class="box">
							<view class="">
								<text style="color: #000; font-size: 38rpx; padding-bottom: 10rpx;">
									允许的支付手段
								</text>
								<view style="height: 15rpx;">
								</view>
								<s-radio-group v-model="data.hrpay">
									<s-row :gutter="40">
										<s-col>
											<s-radio name="微信" label="微信" />
										</s-col>
										<s-col>
											<s-radio name="支付宝" label="支付宝" />
										</s-col>
									</s-row>
								</s-radio-group>
							</view>
						</view>
					</s-col style="flex:1">
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
						<s-button type="primary" @click="submit" block>确认发布</s-button>
					</s-col>
				</s-row>
			</view>
		</s-fixed>

	</view>
</template>

<script>
	import {
		insertIntoRentInformation
	} from '@/apis/rent_apis.js'
	export default {
		data() {
			return {
				imgArr: [],
				data: {
					hrAirConditioner: 0,
					hrArea: null,
					hrBedAmount: null,
					hrBedroomAmount: null,
					hrCheck: 0,
					hrCloset: 0,
					hrDecorate: 0,
					hrDescribe: "",
					hrFloor: "",
					hrId: "string",
					hrIntroduce: "",
					hrLivingRoomAmount: null,
					hrLocation: "",
					hrNaturalGas: 0,
					hrNetwork: 0,
					hrPicture: "",
					hrPrice: null,
					hrRefrigerator: 0,
					hrRoomAmount: null,
					hrToiletAmount: null,
					hrToward: 1,
					hrTv: 0,
					hrType: 1,
					hrUserId: uni.getStorageSync('userId'),
					hrWashingMachine: 0,
					hrWaterHeater: 0,
					hrpay: "微信"
				}
			}
		},
		methods: {
			get_imgArrLength() {
				console.log(this.imgArr.length);
				if (this.imgArr.length >= 4) {
					return false;
				} else {
					return true;
				}
			},
			chooseImg() {
				uni.chooseImage({
					count: 4 - this.imgArr.length,
					success: res => {
						this.imgArr = this.imgArr.concat(res.tempFilePaths);
					}
				})
			},

			deleteImg(index) {
				this.imgArr.splice(index, 1);
			},
			submit() {
				console.log(this.imgArr);
				var _this = this;
				var i = 0;
				var flag = this.imgArr.length;
				for (; i < this.imgArr.length; ++i) {
					uni.uploadFile({
						url: 'http://112.124.35.32:8081/xiangliban/api/imgUpload',
						filePath: this.imgArr[i],
						name: 'file',
						formData: { // 其他的formdata参数

						},
						success: function(uploadFileRes) {
							_this.data.hrPicture += uploadFileRes.data + '#';
							console.log(_this.data.hrPicture);
							flag--;
							if (flag == 0) {
								console.log("last");
								console.log(_this.data);
								insertIntoRentInformation(_this.data).then((res) => {
									if (res.statusCode == "200") {
										console.log("预约成功");
										uni.showToast({
											title: '提交成功',
											duration: 2000,
											icon: 'success'
										});
										uni.navigateBack({
											delta: 1
										});
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
					})
				}
			}
		}
	}
</script>

<style>
	.fui-card__content {
		margin: 0 20rpx;
	}

	.repair-image {
		height: 120rpx;
		width: 120rpx;
		border-radius: 30rpx !important;
	}

	.add-image {
		background-color: #c4c5c4;
		background-image: url(http://p1362.bvimg.com/10465/b00e7542e59400d2.png);
		background-repeat: no-repeat;
		background-size: 60rpx;
		background-position: center;
		/* border: 1px solid #A6A7A6; */
	}
</style>
