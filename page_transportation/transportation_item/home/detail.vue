<template>
	<view class="flex flex-column vh100 w100" v-if="info.status">
		<view class="u-flex-1 w100" style="height: 810rpx;">
			<map style="width: 100%; height: 100%;" :scale="12" :latitude="latitude" :longitude="longitude"
			 :markers="covers" :polyline="polyline">
				<!-- <cover-image v-if="arr1.includes(info.status*1)&&info.status!=3" class="navigation" @click="toNav(info.status)" src="../../static/nav.png"></cover-image> -->
			</map>
		</view>
		<view :class="[info.status==3&&ispay?'datpay':'','w100']">
			<paidui class="w100" @update="update" @init="init" v-if="info.status==0||info.status==-2" :info="info"></paidui>
			<dtQuxiao class="w100" v-if="info.status==-1" :info="info"></dtQuxiao>
			<dtSiji class="w100" @pay="ispay=true" v-if="arr3.includes(info.status*1)&&!ispay" :info="info"></dtSiji>
			<dtPay class="w100" @update="update" @close="ispay=false" v-if="info.status==3&&ispay" :info="info"></dtPay>
		</view>
	</view>
</template>

<script>
	import amapFile from '../../../libs/amap-wx.js'
	export default {
		data() {
			return {
				id: '', //订单id
				info: {}, //-2超时，-1=已取消,0=呼叫中,1=已接单,2=进行中,3=待支付,4=司机已到达,5=预约单司机待出发,99=已完成'
				timer1: null, //排队超时
				arr1: [0, 1, 2, 4, 5, 3], //需要定时器
				arr2: [-2, -1, 99], //清除定时
				arr3: [1, 2, 3, 4, 5, 99], //显示司机组件
				ispay: false, //支付弹窗
				// 地图
				latitude: '',
				longitude: '',
				polyline: []
			}
		},
		computed: {
			covers() {
				return [{
					id: 1,
					latitude: this.latitude,
					longitude: this.longitude,
					iconPath: '../../../static/now.png',
					title: '当前位置',
					width:25,
					height:25
				}, {
					id: 2,
					latitude: this.info.start_latitude,
					longitude: this.info.start_longitude,
					iconPath: '../../../static/start.png',
					title: '起点位置',
					width:40,
					height:40
				}, {
					id: 3,
					latitude: this.info.end_latitude,
					longitude: this.info.end_longitude,
					iconPath: '../../../static/end.png',
					title: '终点位置',
					width:40,
					height:40
				}]
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.init()
		},
		onUnload() {
			clearInterval(this.timer1)
		},
		onHide() {
			clearInterval(this.timer1)
		},
		methods: {
			init() {
				let _this = this
				this.$http('/addons/ddrive/order/info', {
					order_id: this.id
				}, "POST").then(data => {
					this.info = data
					uni.setNavigationBarTitle({
						title: data.status_text
					})
					if (this.arr1.includes(this.info.status * 1)) {
						this.timer1 = setInterval(() => {
							this.update()
						}, 5000)
					}
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							console.log('当前位置的经度1：' + res.longitude);
							console.log('当前位置的纬度1：' + res.latitude);
							_this.longitude = res.longitude
							_this.latitude = res.latitude
							_this.polyline = []
							_this.getLine()
						}
					});
				})
			},
			update() {
				this.$http('/addons/ddrive/order/info', {
					order_id: this.id
				}, "POST").then(data => {
					this.info = data
					if (this.arr2.includes(this.info.status * 1)) {
						clearInterval(this.timer1)
					}
				})
			},
			getLine() {
				var that = this;
				var key = '4212e2ed80856520bc1a2e44153333fc';
				var myAmapFun = new amapFile.AMapWX({
					key: key
				});
				// 1 还没接到人  所在地到起点，起点到终点
				let arr = ['0', '1', '5', '4']
				if (arr.includes(this.info.status)) {
					this.lineData(myAmapFun, this.longitude + ',' + this.latitude, this.info.start_longitude + ',' + this.info.start_latitude,
						"#ff4b4e")
					this.lineData(myAmapFun, this.info.start_longitude + ',' + this.info.start_latitude, this.info.end_longitude + ',' +
						this.info.end_latitude,
						"#28d32e")
				}
				// 2 途中  所在地到终点
				if (this.info.status == 2) {
					this.lineData(myAmapFun, this.info.start_longitude + ',' + this.info.start_latitude, this.longitude + ',' + this.latitude,
						"#c6c6c5")
					this.lineData(myAmapFun, this.longitude + ',' + this.latitude, this.info.end_longitude + ',' + this.info.end_latitude,
						"#28d32e")
				}
				// 3 完成、取消、待支付：起点到终点
				let arr1 = ['-2', '-1', '3', '99']
				if (arr1.includes(this.info.status)) {
					this.lineData(myAmapFun, this.info.start_longitude + ',' + this.info.start_latitude, this.info.end_longitude + ',' +
						this.info.end_latitude,
						"#28d32e")
				}
			},
			lineData(myAmapFun, origin, destination, color) {
				let that = this
				myAmapFun.getDrivingRoute({
					origin,
					destination,
					success(data) {
						if (data.paths && data.paths[0] && data.paths[0].steps) {
							var steps = data.paths[0].steps;
							var points = [];
							for (var i = 0; i < steps.length; i++) {
								var poLen = steps[i].polyline.split(';');
								for (var j = 0; j < poLen.length; j++) {
									points.push({
										longitude: parseFloat(poLen[j].split(',')[0]),
										latitude: parseFloat(poLen[j].split(',')[1])
									})
								}
							}
						}
						that.polyline.push({
							points: points,
							color,
							width: 10,
							arrowLine: true,
						})
					},
					fail(info) {
						console.log(444444, info);
					}
				});
			},
			toNav(status) {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						console.log(res.platform);
						if(res.platform=='android'){
							if (status == 2) {
								plus.runtime.openURL("androidamap://navi?sourceApplication=ddcar&lat=" + _this.info.end_latitude + "&lon=" + _this.info
									.end_longitude + "&dev=0&style=2")
							} else {
								plus.runtime.openURL("androidamap://navi?sourceApplication=appname&lat=" + _this.info.start_latitude + "&lon=" +
									_this.info.start_longitude + "&dev=0&style=2")
							}
						}else if(res.platform=='ios'){
							if (status == 2) {
								plus.runtime.openURL("iosamap://navi?sourceApplication=ddcar&lat=" + _this.info.end_latitude + "&lon=" + _this.info
									.end_longitude + "&dev=0&style=2")
							} else {
								plus.runtime.openURL("iosamap://navi?sourceApplication=appname&lat=" + _this.info.start_latitude + "&lon=" +
									_this.info.start_longitude + "&dev=0&style=2")
							}
						}
					}
				})
				
			},
			toAnquan() {
				uni.navigateTo({
					url: '/page_transportation/transportation_item/home/security'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.navigation {
		position: fixed;
		right: 10rpx;
		top: 100rpx;
		width: 100rpx;
		height: 100rpx;
	}
	.datpay{
		height: 300rpx;
	}
</style>
