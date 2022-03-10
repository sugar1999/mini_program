<template>
	<view class="fui-wrap">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">上门订单详情</block>
		</cu-custom>

		<view class="fui-page__bd">
		</view>

		<fui-card src="http://p1362.bvimg.com/10465/e54a26087ddfd7d5.png" full title="配送员位置" tag="地图">
			<view class="page-body">
				<map class="map" id="myMap" ref="myMap" style="width:100%;height:400rpx" @markertap="markertap"
					:latitude="latitude" :longitude="longitude" :markers="covers" :scale="scale"
					:show-location="show_location" :enable-traffic="isTraffic"></map>
			</view>
			<!-- 操作 -->
			<view class="operation">
				<view class="operation-item" @click="refresh">
					<image :src="e_zhongxin" mode=""></image>
					<view>刷新</view>
				</view>
				<!-- <view class="operation-item" @click="getLocation">
					<image :src="e_zhongxin" mode=""></image>
					<view>中心</view>
				</view> -->
				<view class="operation-item" @click="traffic">
					<image :src="e_lukuang" mode=""></image>
					<view>路况</view>
				</view>
			</view>
		</fui-card>

		<view class="fui-page__bd">
		</view>

		<fui-card src="http://p1362.bvimg.com/10465/e54a26087ddfd7d5.png" full title="订单状态" tag=" ">
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						订单编号
					</text>
					<text style="float: right;">
						{{items.deliveryId}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						下单时间
					</text>
					<text style="float: right;">
						{{items.packageEta}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						支付方式
					</text>
					<text style="float: right;">
						{{items.packagePaymentMethod}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						无接触配送
					</text>
					<text style="float: right;">
						{{items.deliveryContactlessDistribution==1?'是':'否'}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						号码保护
					</text>
					<text style="float: right;">
						{{items.deliveryPhonesProtected==1?'是':'否'}}
					</text>
				</view>
			</view>
		</fui-card>

		<view class="fui-page__bd">
		</view>

		<fui-card src="http://p1362.bvimg.com/10465/e54a26087ddfd7d5.png" full title="预计送达时间" tag=" ">
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						日期
					</text>
					<text style="float: right;">
						{{date}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						时间
					</text>
					<text style="float: right;">
						{{time}}
					</text>
				</view>
			</view>
		</fui-card>

		<view class="fui-page__bd">
		</view>

		<fui-card src="http://p1362.bvimg.com/10465/e54a26087ddfd7d5.png" full title="配送员信息" tag=" ">
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						配送员姓名
					</text>
					<text style="float: right;">
						{{name}}
					</text>
				</view>
			</view>
			<view class="fui-card__content" style="padding: 16rpx 40rpx;">
				<view class="">
					<text>
						配送员电话
					</text>
					<text style="float: right;">
						{{phone}}
					</text>
				</view>
			</view>
		</fui-card>

		<view class="fui-page__bd">
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
										{{items.packageLogisticsCompany}}
									</view>
								</view>
								<view class="left">
									<uni-text class="cuIcon-titles text-blue"></uni-text>
									<view class="store">{{ items.packageDetails }}</view>
								</view>

							</view>
							<view class="type">始发地：{{ items.packageSenderAddress }}</view>
							<view class="type">寄件人：{{ items.packageSenderName }}</view>

						</view>

					</view>
					<view class="fui-card__content" style="padding: 16rpx 00rpx;">
						<view class="">
							<text>
								配送费
							</text>
							<text style="float: right;">
								{{items.deliveryFreight}}元
							</text>
						</view>
					</view>
					<view class="fui-card__content" style="padding: 16rpx 0rpx;">
						<view class="">
							<text>
								用户期望送达时间
							</text>
							<text style="float: right;">
								{{items.deliveryEta}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="fui-page__bd"></view>
		<view class="fui-page__bd"></view>

		<!-- <view class="" style=" z-index: 100; 
						position: fixed; 
						bottom: -0rpx; 
						width: 100%; 
						background-color: #fff;
						padding: 20rpx 30rpx;
						box-shadow: 0px 0px 20px #888888;">

			<fui-row>
				<fui-col :span="24">
					<view class=" fui-col__item fui-color__black">
						<fui-button>联系配送员</fui-button>
					</view>
				</fui-col>
			</fui-row>
		</view> -->

	</view>
</template>

<script>
	import {
		bookedDeliveryRequestByPackageId
	} from '@/apis/express_apis.js'
	import {
		selectUserByUid
	} from '@/apis/user_apis.js'
	import GeocodeUtils from '../../common/geocode-utils.js'
	export default {
		data() {
			return {
				name: '',
				phone: '',
				date: '',
				time: '',
				text: '',
				value: 0,
				send: false,
				protected: false,
				items: {
					id: 1,
					imgUrl: 'http://p1362.bvimg.com/10465/b7a23d05f09c09ae.jpg',
					type: '顺丰',
					title: '捷安特自行车',
					details: '浙江省杭州市新安江物流集团总公司，已收入',
					time: '2020年11月11日15：00：00'
				},
				markerImg: [
					'http://p1362.bvimg.com/10465/2fb7d96656bcc797.png',
					'http://p1362.bvimg.com/10465/2fb7d96656bcc797.png',
					'http://p1362.bvimg.com/10465/2fb7d96656bcc797.png',
					'http://p1362.bvimg.com/10465/2fb7d96656bcc797.png'
				],
				initHeight: 340,
				navIndex: 0,
				map: '',
				latitude: 34.34127,
				longitude: 108.93984,
				scale: 12,
				covers: [],
				isTraffic: false,
				show_location: false,
				keywords: '',
				stationList: [],
				showList: false,
				actionShow: false,
				flag: 0,
				e_zhongxin: '',
				e_lukuang: '',
				placeholder: 'http://p1362.bvimg.com/10465/1207c3f2118dcf1f.png',

			}
		},
		onReady() {
			this.map = uni.createMapContext('myMap');
		},
		onLoad(option) {
			console.log(option.packageId);
			var _this = this;
			this.e_zhongxin = 'http://p1362.bvimg.com/10465/c8f0852d6a46c59c.png';
			this.e_lukuang = 'http://p1362.bvimg.com/10465/5637d3c21b095b80.png';
			// this.keywords = this.navList[this.navIndex];
			var data = {
				packageId: option.packageId
			}

			bookedDeliveryRequestByPackageId(data).then((res) => {
				if (res.statusCode == "200") {
					_this.items = res.data;
					_this.items.packageEta = _this.items.packageEta.replace("T", " ").substr(0, 19);
					_this.items.deliveryEta = _this.items.deliveryEta.replace("T", " ").substr(0, 19);
					_this.date = _this.items.deliveryEta.split(' ')[0];
					_this.time = _this.items.deliveryEta.split(' ')[1];
					console.log(res.data);

					var user = {
						uid: res.data.puid
					}
					selectUserByUid(user).then((res) => {
						if (res.statusCode == "200") {
							_this.name = res.data[0].name;
							_this.phone = res.data[0].phone;
						} else {
							uni.showToast({
								title: '获取失败',
								duration: 2000,
								icon: 'error'
							});
						}
					})
				} else {
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					});
				}
			})
		},
		mounted() {
			this.getLocation();
		},
		filters: {
			formatLatlon(val) {
				if (typeof(val) === "number") {
					return parseFloat(val).toFixed(2)
				}
				return 0.00;
			}
		},
		methods: {
			markertap(e) {
				let {
					markerId
				} = e.detail;
				let item = this.covers.find(v => v.id === markerId);
				if (item && item.vehicleNo) {
					uni.navigateTo({
						url: `./realTimeMonitoringDetail?vehicleNo=${item.vehicleNo}`
					});
				}
			},
			tabClick(index) {
				this.navIndex = index;
				this.keywords = this.navList[index]
				this.covers = [];
				this.getPoiAround()
			},
			navClick(location, address) {
				console.log(location)
				uni.openLocation({
					latitude: parseFloat(location.split(',')[1]),
					longitude: parseFloat(location.split(',')[0]),
					address: address,
					success: function() {
						console.log('success');
					},
					fail(err) {
						console.log("错误", err);
					}
				});
			},
			getPoiAround() {
				GeocodeUtils.getPoiAround(this.latitude, this.longitude, this.keywords, data => {
					console.log(data.markers)
					console.log(data.poisData)
					this.stationList = [];
					this.covers = [];
					// data.poisData.forEach(data => {
					// 	this.stationList.push(data);
					// 	this.covers.push({
					// 		latitude: data.location.split(',')[1],
					// 		longitude: data.location.split(',')[0],
					// 		// iconPath: this.markerImg[this.navIndex],
					// 		width: 30,
					// 		height: 30,
					// 		// callout: {
					// 		// 	content: this.huanhang(data.name),
					// 		// 	color: '#0707f7',
					// 		// 	fontSize: 12,
					// 		// 	textAlign: 'center',
					// 		// 	display: 'ALWAYS',
					// 		// 	boxShadow: '5px 5px 10px #aaa',
					// 		// 	borderRadius: 2,
					// 		// 	padding: 8,
					// 		// },
					// 		label: {
					// 			content: this.huanhang(data.name),
					// 			color: '#000000',
					// 			fontSize: 12,
					// 			textAlign: 'center',
					// 			x:-40
					// 		}
					// 	});
					// })
					this.map.includePoints({
						points: this.covers,
						padding: [50, 50, 50, 50]
					});
				})
			},
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						let {
							latitude,
							longitude
						} = res;
						// 设置中心
						this.latitude = latitude;
						this.longitude = longitude;
						this.getPoiAround()
						// 地图聚焦
						let offset = 0.005;
						let points = [{
								latitude: latitude + offset,
								longitude: longitude + offset
							},
							{
								latitude: latitude - offset,
								longitude: longitude - offset
							}
						];
						this.map.includePoints({
							points
						});
					}
				});
				this.show_location = true;
			},
			refresh() {
				this.getLocation()
			},
			//路况
			traffic() {
				this.isTraffic = !this.isTraffic;
			},
			upView() {
				this.showList = !this.showList;
			},
			search() {
				this.actionShow = true;
				let value = this.keywords;
				if (!value) {
					uni.showToast({
						title: '查询内容不能为空！',
						icon: 'none'
					});
					return false;
				}
				this.getPoiAround()
			},
			seachCancel() {
				this.actionShow = false;
			},
			handletouchmove(event) {
				// console.log(event)
				if (this.flag !== 0) {
					return;
				}
				let currentX = event.touches[0].pageX;
				let currentY = event.touches[0].pageY;
				let tx = currentX - this.lastX;
				let ty = currentY - this.lastY;
				let text = '';
				this.mindex = -1;
				//左右方向滑动
				if (Math.abs(tx) > Math.abs(ty)) {
					if (tx < 0) {
						text = '向左滑动';
						console.log('向左滑动');
						this.flag = 1;
						//	this.getList();  //调用列表的方法
					} else if (tx > 0) {
						text = '向右滑动';
						console.log('向右滑动');
						this.flag = 2;
					}
				} else {
					//上下方向滑动
					if (ty < 0) {
						text = '向上滑动';
						console.log('向上滑动');
						this.flag = 3;
						// 调整盒子高低
						uni.getSystemInfo({
							success: res => {
								this.showList = true;
							}
						});
						//	this.getList();  //调用列表的方法
					} else if (ty > 0) {
						text = '向下滑动';
						console.log('向下滑动');
						this.flag = 4;
						// 调整盒子高低
						uni.getSystemInfo({
							success: res => {
								this.showList = false;
							}
						});
					}
				}
				//将当前坐标进行保存以进行下一次计算
				this.lastX = currentX;
				this.lastY = currentY;
				this.text = text;
			},
			handletouchstart(event) {
				// console.log(event)
				this.lastX = event.touches[0].pageX;
				this.lastY = event.touches[0].pageY;
			},
			handletouchend(event) {
				this.flag = 0;
				this.text = '没有滑动';
			},
			huanhang(s) {
				var re = '';
				var length = s.length;
				for (var i = 0, j = 1; i < length; i++, j++) {
					re += s[i];
					if (j && j % 6 == 0) {
						re += '\n';
					}
				}
				return re;
			},
			change(event) {
				this.value = event.detail.value;
			},
			sendf(event) {
				if (this.send == false) {
					this.send = true;
				} else {
					this.send = false;
				}
			},

			protectedf(event) {
				if (this.protected == false) {
					this.protected = true;
				} else {
					this.protected = false;
				}
				return this.protected;
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

	.nav-box {
		display: flex;
		text-align: center;
		height: 80rpx;
		align-items: center;
		border-bottom: 1px solid #gray;
		box-shadow: -1rpx 4rpx 10rpx rgba(2, 90, 221, 0.17);

		view {
			flex: 1;
			font-size: 28rpx;
		}

		.active {
			color: #334BE7;
			font-weight: bold;
		}
	}

	.operation {
		width: 85rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: -1rpx 4rpx 16rpx rgba(2, 90, 221, 0.17);
		border-radius: 10rpx;
		position: absolute;
		top: 300rpx;
		right: 21rpx;
		padding-top: 10rpx;
		z-index: 10;

		&-item {
			text-align: center;
			margin-bottom: 10rpx;

			view {
				font-size: 30rpx;
				font-family: SourceHanSansCN-Medium;
				line-height: 32rpx;
				color: rgba(102, 102, 102, 1);
			}
		}

		&-item:nth-child(1) {
			margin-bottom: 24rpx;

			image {
				width: 40rpx;
				height: 32rpx;
			}
		}

		// &-item:nth-child(2) {
		// 	margin-bottom: 10rpx;

		// 	image {
		// 		width: 39rpx;
		// 		height: 39rpx;
		// 	}
		// }

		&-item:nth-child(2) {
			margin-bottom: 15rpx;

			image {
				width: 42rpx;
				height: 22rpx;
			}
		}
	}

	.gas-station {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 8rpx 0 24rpx rgba(57, 111, 250, 0.23);
		opacity: 1;
		border-radius: 20rpx 20rpx 0 0;
		position: absolute;
		bottom: 0;
		z-index: 100;

		&-arrow {
			display: flex;
			justify-content: center;
		}

		.station-list {
			padding: 0rpx 22rpx;
			transition: all 0.3s;
			overflow: hidden;

			.item {
				display: flex;
				margin-top: 10rpx;

				.item-img {
					flex-shrink: 0;

					image {
						width: 150rpx;
						height: 150rpx;
						border-radius: 10rpx;
						border: 1px solid #f2f2f2;
					}
				}

				.item-info {
					width: 100%;
					padding: 5rpx 15rpx;

					text {
						color: #334BE7;
					}

					.item-title {
						font-size: 28rpx;
						font-weight: bold;
					}

					view:nth-child(2) {
						margin-top: 5rpx;
						font-size: 24rpx;
					}

					view:nth-child(3) {
						margin-top: 10rpx;
						font-size: 24rpx;
					}

					.item-nav {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.btn-nav {
							width: 100rpx;
							height: 45rpx;
							line-height: 45rpx;
							text-align: center;
							border: 1px solid #334BE7;
							border-radius: 10rpx;
							color: #334BE7;
							font-size: 24rpx;
						}
					}
				}
			}

		}
	}
</style>
