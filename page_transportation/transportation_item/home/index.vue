<template>
	<view  class="contaier">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">交通出行</block>
		</cu-custom>
		<view class="page-body">
			<map class="map" id="myMap" ref="myMap" style="width:100%;height:65vh" @markertap="markertap" :latitude="latitude" :longitude="longitude"
			 :markers="covers" :scale="scale" :show-location="show_location" :enable-traffic="isTraffic"></map>
		</view>
		<view class="gas-station">
			<view class="station-list" :style="{ height: `${showList ? 860 : initHeight}rpx` }" >
				<view class="gas-station-arrow" @click="upView" style="padding: 24rpx;" @touchmove="handletouchmove" @touchstart="handletouchstart"
				 @touchend="handletouchend">
					<u-icon v-if="showList" color="#999" name="arrow-down" size="40"></u-icon>
					<u-icon v-else name="arrow-up" color="#999" size="40"></u-icon>
				</view>
				<view class=""></view>
				<view class="example-body">
					<uni-datetime-picker type="datetime" v-model="datemtimessingle" @change="changeLog"/>
				</view>
				<picker @change="bindPickerChange" :range="array" class="picker_border">
					<view class="fui-section__title">{{type}}</view>
				</picker>
				<button class="blueBtn cu-btn bg-blue shadow lg">叫车</button>
			</view>
		</view>
	</view>
</template>

<script>
	import GeocodeUtils from '../../../common/geocode-utils.js'
	// import amapFile from '../../../libs/amap-wx.js'
	// import Voice from '@/components/baidu.js';
	// import {
	// 	mapState
	// } from 'vuex'
	export default {
		data() {
			return {
				text: '',
				array: ['请选择地点','浙江工业村'],
				index: 0,
				type: '请选择地点',
				// index: 0,
				current: '',
				// timer3: null,
				// other: {}, //代人叫车
				// list: [],
				hylist: [],
				// timer: null,
				// showTime: false,
				// // 地图
				// amapPlugin: null,
				// key: 'bb6f4ed802756f963b37c184ce4e9766',
				// latitude: '',
				// longitude: '',
				// latitude1: '', //打开地图时的中心点
				// longitude1: '', //打开地图时的中心点
				// polyline: [],
				// mapContext: null,
				// appMap: null
				single: '2021-5-3',
				datetimesingle: '2021-07-3',
				range: ['2021-02-1', '2021-3-28'],
				datetimerange: [],
				start: '2021-7-2',
				end: '2021-7-29',
				navList: ['公交站点', '历史路线', '厕所', '超市'],
				markerImg: [
					'http://p1362.bvimg.com/10465/a0e7ec274065246f.png',
					'http://p1362.bvimg.com/10465/2fb7d96656bcc797.png',
					'http://p1362.bvimg.com/10465/2fb7d96656bcc797.png',
					'http://p1362.bvimg.com/10465/2fb7d96656bcc797.png'
				],
				initHeight:340,
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
			this.map = ('myMap');
		},
		onLoad() {
			this.e_zhongxin = 'http://p1362.bvimg.com/10465/c8f0852d6a46c59c.png';
			this.e_lukuang = 'http://p1362.bvimg.com/10465/5637d3c21b095b80.png';
			this.keywords = this.navList[this.navIndex]
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
		// computed: {
		// 	...mapState(['city', 'height', "start", "tabList", 'token']),
		// 	covers() {
		// 		return [{
		// 			id: 1,
		// 			latitude: this.latitude,
		// 			longitude: this.longitude,
		// 			// #ifdef MP-WEIXIN
		// 			iconPath: '../../../static/now.png',
		// 			// #endif
		// 			// #ifndef MP-WEIXIN
		// 			iconPath: '../../../static/now2.png',
		// 			// #endif
		// 			title: '当前位置',
		// 			width: 30,
		// 			height: 45
		// 		}]
		// 	}
		// },
		//分享
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {

			}
		},
		onShareTimeline(res) {
			console.log(111111111);
			return {

			}
		},
		onReady() {
			this.mapContext = uni.createMapContext('map')
			// #ifdef APP-PLUS
			this.appMap = this.mapContext.$getAppMap()
			let _this = this

			this.appMap.onstatuschanged = function(e) {
				_this.latitude = e.center.latitude
				_this.longitude = e.center.longitude
				console.log(11111111);
				_this.amapPlugin.getRegeo({
					location: e.center.longitude + ',' + e.center.latitude,
					success(data) {
						console.log(data);
						let city;
						if (!_this.city) {
							if (typeof data[0].regeocodeData.addressComponent.city == 'object') {
								city = data[0].regeocodeData.addressComponent.province
							} else {
								city = data[0].regeocodeData.addressComponent.city
							}
							// _this.$store.commit('getCity', city)
						}
						let start = {
							city: city,
							latitude: data[0].latitude,
							longitude: data[0].longitude,
							address: data[0].name,
							name: data[0].desc,
							flag: true
						}
						_this.$store.commit('getStart', start)
						console.log(_this.start);
					}
				})
			}
			// #endif
		},
		onLoad(option) {
			this.getpush()
			this.timer3 = setInterval(() => {
				if (this.tabList && this.tabList[0]) {
					this.current = this.tabList[0].id
					clearInterval(this.timer3)
					this.timer3 = null
				}
			}, 200)
			// 定位
			this.amapPlugin = new amapFile.AMapWX({
				key: this.key
			});
			uni.$on('other', (data) => {
				this.other = data
			})
		},
		onHide() {
			clearInterval(this.timer)
			this.timer = null
		},
		onUnload() {
			uni.$off('other')
			clearInterval(this.timer)
			this.timer = null
		},
		onShow() {
			this.getRegeo()
			this.timer = setInterval(() => {
				this.getList()
			}, 3000)
		},
		watch: {
			datetimesingle(newval) {
				console.log('单选:', this.datetimesingle);
			},
			range(newval) {
				console.log('范围选:', this.range);
			},
			datetimerange(newval) {
				console.log('范围选:', this.datetimerange);
			}
		},
		mounted() {
			setTimeout(() => {
				// this.datetimesingle = '2021-7-10'
				// this.single = '2021-2-12'
				// this.range = ['2021-03-1', '2021-4-28']
				// this.datetimerange = ["2021-07-08 0:00:00", "2021-08-08 23:59:59"]
				// this.start = '2021-07-10'
				// this.end = '2021-07-20'
			},3000)
		},
		methods: {
			change(e) {
				this.single = e
				console.log('----change事件:', this.single = e);
			},
			changeLog(e) {
				console.log('----change事件:', e);
			},
			maskClick(e){
				console.log('----maskClick事件:', e);
			},
			//下拉框
			bindPickerChange: function(e) {		//改变的事件名
				this.index = e.target.value			//将数组改变索引赋给定义的index变量
				this.type=this.array[this.index]		//将array【改变索引】的值赋给定义的jg变量
			},
			getpush: function() {
				// #ifdef APP-PLUS  
				// plus.push.addEventListener('receive', function(msg) {
				// 	// console.log(msg)
				// 	// _this.msg = JSON.stringify(msg)
				// 	plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				// 		if (plus.os.name.toLowerCase() === 'android') {
				// 			Voice(msg.content);
				// 		} else {
				// 			Voice(msg.payload.content);
				// 		}
				// 	})
				// }, true)
				// #endif
			},
			getCenterMap() {
				let _this = this
				// #ifdef MP-WEIXIN
				this.mapContext.getCenterLocation({
					success: (res) => {
						console.log(res);
						if (res.longitude != 0) {
							_this.longitude = res.longitude
							_this.latitude = res.latitude
							_this.mapContext.translateMarker({
								markerId: 1,
								destination: {
									longitude: res.longitude,
									latitude: res.latitude
								},
								duration: 2000,
								animationEnd() {
									console.log(111111);
								}
							})
							_this.amapPlugin.getRegeo({
								location: res.longitude + ',' + res.latitude,
								success(data) {
									console.log(data);
									let city;
									if (!_this.city) {
										if (typeof data[0].regeocodeData.addressComponent.city ==
											'object') {
											city = data[0].regeocodeData.addressComponent.province
										} else {
											city = data[0].regeocodeData.addressComponent.city
										}
									}
									let start = {
										city: city,
										latitude: data[0].latitude,
										longitude: data[0].longitude,
										address: data[0].name,
										name: data[0].desc,
										flag: true
									}
									_this.$store.commit('getStart', start)
								}
							})
						}
					}
				})
				// #endif
			},
			goCenter() {
				this.mapContext.moveToLocation({
					longitude: this.longitude1,
					latitude: this.latitude1,
					success() {
						console.log(11111111);
					}
				})
			},
			getList() {
				this.$http('/addons/ddrive/order/order_taking', {}, "POST").then(data => {
					this.list = data.data
					this.hylist = data.hy
				})
			},
			change(index) {
				this.index = index;
				this.current = this.tabList[index].id;
				if (this.current == 2) {
					uni.$emit('price')
				}
			},
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
						data.poisData.forEach(data => {
							this.stationList.push(data);
							this.covers.push({
								latitude: data.location.split(',')[1],
								longitude: data.location.split(',')[0],
								iconPath: this.markerImg[this.navIndex],
								width: 30,
								height: 30,
								// callout: {
								// 	content: this.huanhang(data.name),
								// 	color: '#0707f7',
								// 	fontSize: 12,
								// 	textAlign: 'center',
								// 	display: 'ALWAYS',
								// 	boxShadow: '5px 5px 10px #aaa',
								// 	borderRadius: 2,
								// 	padding: 8,
								// },
								label: {
									content: this.huanhang(data.name),
									color: '#000000',
									fontSize: 12,
									textAlign: 'center',
									x:-40
								}
							});
						})
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
				refresh(){
					this.getPoiAround();
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
				bindTextAreaBlur: function (e) {
				    console.log(e.detail.value)
				},
				bindPickerChange: function(e) {		//改变的事件名
					this.index = e.target.value			//将数组改变索引赋给定义的index变量
					this.type=this.array[this.index]		//将array【改变索引】的值赋给定义的jg变量
				}
		}
	}
</script>

<style lang="scss" scoped>
	.img-pic {
		image {
			width: 76rpx;
			height: 76rpx;
		}
	}

	.img-logo {
		image {
			width: 168rpx;
			height: 42rpx;
		}
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
		bottom: 580rpx;
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
	
		&-item:nth-child(2) {
			margin-bottom: 10rpx;
	
			image {
				width: 39rpx;
				height: 39rpx;
			}
		}
	
		&-item:nth-child(3) {
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
	.form-control{
		margin: 10% 2.5% 40upx;
		width:95%;
		padding:6px 12px;
		font-size:14px;
		color:#555;
		background-color:#fff;
		background-image: none;
		border:1px solid #ccc;
		border-radius:4px;
	}
	.button-style{
		margin: 2% 77% 40upx;
		width:20%;
	}
	.search-view image{
		width: 35upx;
		height: 35upx;
	}
	.search-view{
		font-size: 30upx;
		font-weight: bold;
		display: flex;
		align-items: center;
		height: 80upx;
	}
	.search-text{
		padding:0 10px;
	}
	.search-img{
		margin: auto 0 auto 20upx;
		width: 40upx;
		height: 40upx;
	}
	.search{
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: flex;
		background: #e3e2e8;
		border-radius: 10rpx;
	}
	.search input{
		height: 70upx;
		line-height: 70upx;
		width: 80%;
		font-size: 25upx;
		color: #666666;
	}
	.search-cont{
		display: flex;
		justify-content: space-between;
		height: 70upx;
		align-items: center;
	}
	.contenting{
		margin: 0 15upx;
	}
	.page {
		font-weight: normal;
	}
	
	.fui-section__title {
		margin-left: 32rpx;
	}
	
	.fui-left__icon {
		padding-right: 24rpx;
	}
	.blueBtn {
		width: 500rpx;
		margin: 50rpx auto;
		display: block;
		line-height: 80rpx;
	}
</style>
