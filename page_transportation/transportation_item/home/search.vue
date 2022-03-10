<template>
	<view>
		<view class="plr-36 mt-20">
			<u-search v-model="addr" placeholder="请输入地址" @change="bindInput"></u-search>
		</view>
		<view class="plr-46 ptb-20 bb" @click="search(item)" v-for="(item,i) in list" :key="i" v-if="item&&item.name">
			<view class="">
				{{item.name}}
			</view>
			<view class="size-26 gray-2" v-if="item&&item.address">
				{{item.id?item.district:''}}{{item.address.length==0?'':item.address}}
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import amapFile from '../../../libs/amap-wx.js'
	export default {
		data() {
			return {
				addr: '',
				list: [],
				items:[],//历史搜索记录
				value:0,//0=没有历史搜索，1=有历史搜索
				type:'' //1 起点  2终点 3货运终点
			}
		},
		computed:{
			...mapState(['address'])
		},
		onLoad(option) {
			this.type = option.type
			this.location = option.location
			this.list = this.address
		},
		methods: {
			bindInput: function(e) {
				var that = this;
				var keywords = e;
				var key = 'bb6f4ed802756f963b37c184ce4e9766';
				var myAmapFun = new amapFile.AMapWX({
					key: key
				});
				myAmapFun.getInputtips({
					keywords: keywords,
					location: that.location,
					success: function(data) {
						console.log(data);
						if (data && data.tips) {
							that.list = data.tips
						}
					}
				})
			},
			
			search(res) {
				console.log(11111111,res);
				// {
				// 	"id": "B01730K2X2",
				// 	"name": "郑州站",
				// 	"district": "河南省郑州市二七区",
				// 	"adcode": "410103",
				// 	"location": "113.658097,34.745795",
				// 	"address": "二马路82号",
				// 	"typecode": "150200",
				// 	"city": []
				// }
				if(res.id){
					let city;
					// 第一部:判断有没有市
					if(res.district.indexOf('市') != -1){
						// 第二部:获取第一个市的索引
						let num = res.district.indexOf('市')
						// 第三部:判断有没有第二个市
						if (res.district.indexOf('市', num + 1) == -1) {
							if (!res.district.includes('县')) {
								if (res.district.split('市')[0].includes('省')) {
									//搜索到区
									city = res.district.split('市')[0].split('省')[1] + '市'
								} else {
									city = res.district.split('市')[0] + '市'
								}
							} else {
								//搜索到县
								city = res.district.split('市')[1].split('县')[0] + '县'
							}
						} else {
							// 搜索到（县级市）
							city = res.district.split('市')[1] + '市'
						}
					}else{
						// 搜索到（直辖县）
						city = res.district.split('省')[1]
					}
					let address = {
						address: res.district + res.address,
						latitude:res.location.length>0 ? res.location.split(',')[1] : '',
						longitude: res.location.length>0 ? res.location.split(',')[0] : '',
						name: res.name,
						city:city,
						district: res.district,
						address1: res.address
					}
					if(this.type==1){
						this.$store.commit('getStart', address)
					}else if(this.type==2){
						this.$store.commit('getEnd', address)
					}else if(this.type==3){
						this.$store.commit('getHyEnd', address)
					}
				}else{
					if(this.type==1){
						this.$store.commit('getStart', res)
					}else if(this.type==2){
						this.$store.commit('getEnd', res)
					}else if(this.type==3){
						this.$store.commit('getHyEnd', res)
					}
				}
				uni.navigateBack({
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
