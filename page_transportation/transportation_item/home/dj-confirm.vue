<template>
	<view class="flex flex-column vh100 w100">
		<view class="u-flex-1 w100" style="height: 810rpx;">
			<map style="width: 100%; height: 100%;position: relative;" :scale="13" :latitude="latitude" :longitude="longitude" :markers="covers"
			 :polyline="polyline">
			</map>
		</view>
		<dtHujiao :price = "price" @hujiao = "hujiao" style="width: 100%;"></dtHujiao>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import amapFile from '../../../libs/amap-wx.js'
	import {changeTime} from "../../../common/common.js"
	export default {
		data() {
			return {
				query: {},
				time: '',
				other: {},
				price:'',
				distance:'',
				// 地图
				latitude: '',
				longitude: '',
				polyline: []
			}
		},
		computed: {
			...mapState(["start","end"]),
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
					latitude: this.start.latitude,
					longitude: this.start.longitude,
					iconPath: '../../../static/start.png',
					title: '起点位置',
					width:40,
					height:40
				}, {
					id: 3,
					latitude: this.end.latitude,
					longitude: this.end.longitude,
					iconPath: '../../../static/end.png',
					title: '终点位置',
					width:40,
					height:40
				}]
			}
		},
		onLoad(option) {
			this.query = JSON.parse(decodeURIComponent(option.query))
			console.log(888888, this.query);
		
			// 	"time": "2020-12-15 00:00",
			
			// 	"other": {
			// 		"tel": "16638143447",
			// 		"name": "小曲"
			// 	}
			// }
			if(this.query.time == '预约时间'){
				this.time = ''
			}else{
				this.time = changeTime(this.query.time)
			}
			this.other = this.query.other
			
			
			let _this = this
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					_this.longitude = res.longitude
					_this.latitude = res.latitude
					_this.polyline = []
					_this.getLine()
				}
			});
		},
		onShow() {
		},
		methods: {
			getLine() {
				var that = this;
				var key = 'bb6f4ed802756f963b37c184ce4e9766';
				var myAmapFun = new amapFile.AMapWX({
					key: key
				});
				this.lineData(myAmapFun, this.start.longitude + ',' + this.start.latitude, this.end.longitude + ',' +
					this.end.latitude,
					"#28d32e")
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
						if (data.paths[0] && data.paths[0].distance) {
							that.distance = data.paths[0].distance
							that.getPrice(data.paths[0].distance)
						}
					},
					fail(info) {
						console.log(444444, info);
					}
				});
			},
			getPrice(distance){
				this.$http('/addons/ddrive/order/amount', {
					distance,
				}, "POST").then((data) => {
					this.price = data
				})
			},
			//呼叫代驾
			hujiao(){
				this.$http('/addons/ddrive/order/create', {
					start:this.start.name,
					start_city:this.start.city,
					start_address:this.start.address,
					start_latitude:this.start.latitude,
					start_longitude:this.start.longitude,
					end:this.end.name,
					end_city:this.end.city,
					end_address:this.end.address,
					end_latitude:this.end.latitude,
					end_longitude:this.end.longitude,
					distance:this.distance,
					duration:0,
					mobile:this.other.tel?this.other.tel:'',
					appointment_time:this.time,
				}, "POST").then((data) => {
					uni.showToast({
						title:"呼叫成功"
					}) 
					setTimeout(()=>{
						uni.redirectTo({
							url:'/page_transportation/transportation_item/home/detail?id=' + data.order_id
						})
					},100)
				})
			}
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
</style>
