<template>

	<view>
		<view class="header w100 flexw" :style="{height:customBar}">
			<view class="placeholder" :style="{height:statusBar}"></view>
			<view class="flex w100 mt-20">
				<input class="input" @confirm="doneInput" type="text" confirm-type="search" :adjust-position="false" @input="onInput"
				 placeholder="搜索城市 中文/首字母" v-model="searchValue" />
				<view class="back_div fsmall bold blue" @tap="confirm_city">
					确定
				</view>
			</view>
		</view>

		<scroll-view class="w100" scroll-y="true" :scroll-into-view="scrollIntoId" :style="{height:scrollHeight}"
		 @touchmove.stop.prevent>
			<view v-if="disdingwei" id="hot">
				<!-- 定位模块 -->
				<view class="dingwei">
					<view class="grey flexa fsmall">
						当前定位
					</view>
					<view class="blue" @click="back_city({city_name:city})">
						{{city?city:'定位失败'}}
					</view>
					<!-- <view class="dingwei_city">
						
						<view class="bold blue fmiddle" @click="getWarpweft">
							<text>{{po_tips}}</text>
						</view>
					</view> -->
				</view>

				<!-- 最近模块 -->
				<!-- <view class="dingwei" v-if="cacheLocation">
					<view class="grey flexa fsmall">
						最近访问
					</view>
					<view class="dingwei_city dingwei_city_zuijin">
						<view class="dingwei_city_one" v-for="(item,index) in cacheLocation" :key="index"   @tap="back_city(item)">
							{{item.city_name}}
						</view>
					</view>
				</view> -->
				<!-- 热门 -->
				<!-- <view class="dingwei" v-if="hotCity">
					<view class="grey flexa fsmall">
						热门城市
					</view>
					<view class="dingwei_city dingwei_city_zuijin">
						<view class="dingwei_city_one" v-for="(item,index) in hotCity" :key="index"   @tap="back_city(item)">
							{{item.city_name}}
						</view>
					</view>
				</view> -->

			</view>


			<!-- 城市列表 -->
			<view v-if="searchValue == ''" v-for="(item, index) in list" :id="item.idx" :key="item.idx">
				<view class="letter-header bold">{{ item.idx }}</view>
				<view class="city-div" v-for="(city, i) in item['cities']" :key="i" @tap="back_city(city)">
					<text class="city">{{ city.city_name }}</text>
				</view>
			</view>
			<!-- 搜索结果 -->
			<view class="city-div" v-for="(item, index) in searchList" :key="index" @tap="back_city(item)">
				<text class="city">{{ item.city_name }}</text>
			</view>

			<view class="placeholder footer"></view>
		</scroll-view>

		<!-- 右侧字母 -->
		<view class="letters" id="list" v-if="searchValue == ''" @touchstart="touchStart" @touchmove.stop.prevent="touchMove"
		 @touchend="touchEnd">
			<!-- <view class="fmin" @click="scrollTo('hot')">最近</view> -->
			<view class="fmin" v-for="item in letter" :key="item.idx">{{ item.idx }}</view>
		</view>

		<!-- 选中之后字母 -->
		<view class="mask" v-if="touchmove">
			<view class="mask-r bold">{{scrollIntoId}}</view>
		</view>
	</view>
</template>

<script>
	import Citys from '../../../common/index.list.js';
	import amapFile from '../../../libs/amap-wx.js'
	export default {

		data() {
			return {
				amapPlugin: null,
				key: 'bb6f4ed802756f963b37c184ce4e9766',
				city:'',
				statusBar: '0px',
				customBar: '45px',

				winHeight: 0,
				itemHeight: 0,
				winOffsetY: 0,
				touchmove: false,


				scrollHeight: this.statusBarHeight,
				ImgUrl: this.ImgUrl,
				letter: [],

				searchValue: '',
				scrollIntoId: '',
				list: [],
				tId: null,
				searchList: [],
				showMask: false,
				disdingwei: true,
				cacheLocation: '', //最近访问
				position: '', //定位获取的位置

				po_tips: '重新定位',
				hotCity: ''
			}
		},
		watch: {
			list() {
				setTimeout(() => {
					this.setList()
				}, 100)
			}
		},

		onLoad() {
			this.amapPlugin = new amapFile.AMapWX({
				key: this.key
			});
			this.getRegeo()
			this.scrollHeight = uni.getSystemInfoSync().windowHeight - parseInt(this.customBar) + 'px'
			//获取存储的最近访问
			var that = this
			uni.getStorage({
				key: 'location_key',
				success: function(res) {
					that.cacheLocation = res.data
				}
			});
			//获取定位 经度纬度
			// that.getWarpweft()

			// let cityLen = Citys.data.city_nav
			this.letter = Citys.index;
			this.list = Citys.list;
			// this.hotCity = Citys.data.hot_city; 
		},
		methods: {
			confirm_city() {
				console.log(this.searchValue);
				this.$store.commit('getCity', this.searchValue)
				uni.redirectTo({
					url: '/pages/home/index'
				})
			},
			setList() {
				uni.createSelectorQuery()
					.in(this)
					.select('#list')
					.boundingClientRect()
					.exec(ret => {
						this.winOffsetY = ret[0].top
						this.winHeight = ret[0].height
						this.itemHeight = this.winHeight / this.list.length
					})

			},
			touchStart(e) {
				this.touchmove = true
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				if (this.list[index]) {
					this.scrollIntoId = this.list[index].idx
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				if (this.list[index] && this.list[index].idx === this.scrollIntoId) {
					return false
				}
				if (this.list[index]) {
					this.scrollIntoId = this.list[index].idx
				}
			},
			touchEnd() {
				this.touchmove = false
				this.touchmoveIndex = -1
			},

			doneInput() {
				uni.hideKeyboard()
			},
			move(e) {
				console.log(111, e);
			},
			getId(index) {
				return this.letter[index];
			},
			query(source, text) {
				let res = [];
				var self = this;
				let len = source.length
				var text = text.toLowerCase()
				for (let i = 0; i < len; i++) {
					//单字母搜索
					if (text.length == 1 && /^[a-zA-Z]$/.test(text)) {
						let arr = []
						let idx = text.toUpperCase()
						if (idx == source[i].idx) {
							console.log(222, source[i]);
							return source[i].cities
						}
					}
					//其它搜索
					if (source[i].cities) {
						let _len = source[i].cities.length
						for (var n = 0; n < _len; n++) {
							let _item = source[i].cities[n]
							if (new RegExp('^' + text).test(_item.city_name)) {
								res.push(_item);
								continue;
							}
							if (new RegExp('^' + text).test(_item.city_pinyin)) {
								res.push(_item);
								continue;
							}
							if (new RegExp('^' + text).test(_item.py)) {
								res.push(_item);
								continue;
							}

						}
					}
				}

				return res;
			},

			isString(obj) {
				return typeof obj === 'string';
			},

			onInput(e) {
				const value = e.target.value;
				if (value !== '' && this.list) {
					const queryData = this.query(this.list, String(value).trim());
					this.searchList = queryData;
					this.disdingwei = false
				} else {
					this.searchList = [];
					this.disdingwei = true
				}
			},

			back_city(item, hasLocation = false) {
				console.log(333, item);
				this.$store.commit('getCity', item.city_name)
				uni.redirectTo({
					url: '/pages/home/index'
				})
				// if (item) {
				// 	//是否是定位 
				// 	if (hasLocation) {
				// 		item = {
				// 			city_name: item.city,
				// 			location: item
				// 		}
				// 	}
				// 	uni.$emit('selectCity', item);
				// 	//unshift 把数据插入到首位，与push相反
				// 	if (!this.cacheLocation) this.cacheLocation = []
				// 	this.cacheLocation.unshift(item)
				// 	this.searchValue = "";
				// 	this.disdingwei = true
				// 	var arr = this.cacheLocation
				// 	//数组去重
				// 	function distinct(arr) {
				// 		let newArr = []
				// 		for (let i = 0; i < arr.length; i++) {
				// 			if (newArr.indexOf(arr[i]) < 0) {
				// 				newArr.push(arr[i])
				// 			}
				// 		}
				// 		return newArr
				// 	}
				// 	this.cacheLocation = distinct(arr).slice(0, 5)
				// 	uni.setStorage({
				// 		key: 'location_key',
				// 		data: this.cacheLocation
				// 	});
				// }
				// this.back() 
			},
			// 获取定位
			getRegeo() {
				let _this = this
				// uni.showLoading({
				// 	title: '获取定位信息中'
				// });
				this.amapPlugin.getRegeo({
					success: (data) => {
						this.city = data[0].regeocodeData.addressComponent.city
						// uni.hideLoading();
					}
				});
			}
		}
	};
</script>

<style scoped>
	.fsmall {
		font-size: 26rpx;
	}

	.fmiddle {
		font-size: 28rpx;
	}

	.blue {
		color: #007AFF;
	}

	.bold {
		font-weight: 600;
	}

	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mask {
		position: fixed;
		z-index: 3;
		top: 40%;
		left: 40%;
	}

	.mask-r {
		height: 120rpx;
		width: 120rpx;
		border-radius: 60rpx;
		display: flex;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		color: #FFFFFF
	}

	.content {
		height: 100%;
		width: 100%;
		background-color: #ffffff;
	}

	.header {
		width: 100%;
		position: relative;
		z-index: 8;
		background-color: #FFFFFF;
	}


	.back_div {
		width: 100rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back_img {
		width: 35rpx;
		height: 35rpx;
	}

	.input {
		font-size: 26rpx;
		width: 600rpx;
		height: 60rpx;
		max-height: 60rpx;
		border-radius: 10rpx;
		background-color: #F5F5F5;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 30rpx;
		color: white;
	}

	.show {
		left: 0;
		width: 100%;
		transition: left 0.3s ease;
	}

	.hide {
		left: 100%;
		width: 100%;
		transition: left 0.3s ease;
	}


	.title {
		font-size: 30rpx;
		color: white;
	}

	.letters {
		position: absolute;
		right: 0;
		width: 80rpx;
		color: #333333;
		top: 25%;
		text-align: center;
		font-size: 24rpx;
		font-weight: 510;
	}

	.letters .fmin {}


	.letter-header {
		font-size: 28rpx;
		padding-left: 40rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

	}

	.city-div {
		width: 660rpx;
		margin: auto;
		padding: 20rpx 0;
		border-bottom-width: 0.5rpx;
		border-bottom-color: #ebedef;
		border-bottom-style: solid;
		display: flex;
		align-items: center;
	}

	.city {
		font-size: 28rpx;
		color: #000000;
		padding-left: 30rpx;
	}

	.dingwei {
		width: 90%;
		margin: auto;
		padding-top: 25rpx;
		box-sizing: border-box;
		margin-bottom: 26rpx;
	}

	.dingwei .grey {
		margin-bottom: 25rpx;
	}

	.dingwei_city {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.dingwei_city_one {
		height: 60rpx;
		background-color: #F5F5F5;
		border-radius: 30rpx;
		font-size: 26rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 20rpx 20rpx 0;
	}


	.dingweis {
		width: 32rpx;
		height: 32rpx;
	}

	.dingwei_city_zuijin {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
