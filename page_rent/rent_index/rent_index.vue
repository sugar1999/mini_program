<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我要租房</block>
		</cu-custom> 
		<s-search v-model="keyword" show-action @search="handleSearch" @action="handleSearch" />
		<s-row justify="center" style="display: flex;">
			<s-col style="flex:1"> 
				<view class="box">
					<s-button style="width: 100%;" @click="pricePickerVisible = true">
						{{ priceText }} 
						<text class="iconfont after">

						</text>
					</s-button>
				</view>

			</s-col style="flex:1">
			<s-col style="flex:1">
				<view class="box">
					<s-button style="width: 100%;" @click="roomTypePickerVisible = true">
						{{ roomTypeText }} 
						<text class="iconfont after">

						</text>
					</s-button>
				</view> 
			</s-col>
			<s-col style="flex:1">
				<view class="box">
					<s-button style="width: 100%;" @click="areaPickerVisible = true">
						{{ areaText }}
						<text class="iconfont after">

						</text>
					</s-button>
				</view>
			</s-col>
			<s-col style="flex:1">
				<view class="box">
					<s-button style="width: 100%;" @click="towardPickerVisible = true">
						{{ towardText }}
						<text class="iconfont after">

						</text>
					</s-button>
				</view>
			</s-col>
			<s-col style="flex:1">
				<view class="box">
					<s-button style="width: 100%;" @click="sortPickerVisible = true">
						{{ sortText }}
						<text class="iconfont after">
							 
						</text>
					</s-button>
				</view>
			</s-col>
		</s-row>

		<view class="container">
			<s-waterfall ref="waterfall" :column="2">
				<template #default="{ list }">
					<navigator v-for="(item, index) of list"
						:url="'../rent_room_details/rent_room_details?hrId=' + item.hrId" :key="index" class="item"
						:style="{ height: item.height + 'rpx' }">
						<image :class="item.id==1?'image0':'imageOther' " :src="item.src" mode="aspectFill" fade-show />

						<view style="margin: 12rpx 10rpx;">
							<view>
								<text class="price">{{item.price}}</text>
								<text style="color: #006FFF; font-size: 26rpx;"> 元 /月</text>
							</view>
							<text class="location">
								{{item.location}}
							</text> 
							<view class="roomDetails">
								{{item.roomType}} | {{item.area}} | {{item.toward}}
							</view>
							<view style="position: relative; margin-top: 10rpx;">
								<text class="subscribe">
									
								</text>
							</view>
						</view>
					</navigator>
				</template>
			</s-waterfall>
			<s-loadmore :status="loadStatus" />
		</view>


		<s-picker ref="singlePicker" v-model="priceValue" :visible.sync="pricePickerVisible" :columns="priceColumns"
			@confirm="onPricePickerConfirm" title="租金" />
		<s-picker v-model="roomTypeValue" :visible.sync="roomTypePickerVisible" title="房型" multiple
			:columns="roomTypeColumns" @confirm="onroomTypePickerConfirm" />
		<s-picker ref="singlePicker" v-model="areaValue" :visible.sync="areaPickerVisible" :columns="areaColumns"
			@confirm="onAreaPickerConfirm" title="面积" />
		<s-picker ref="singlePicker" v-model="towardValue" :visible.sync="towardPickerVisible" :columns="towardColumns"
			@confirm="onTowardPickerConfirm" title="朝向" />
		<s-picker ref="singlePicker" v-model="sortValue" :visible.sync="sortPickerVisible" :columns="sortColumns"
			@confirm="onSortPickerConfirm" title="排序" />

		<view style="position: fixed; bottom: 50rpx; right: 50rpx;">
			<s-button type="primary" shape="circle" icon="wap-home" icon-size="48" width="100" height="100"
				@click="moveToHousePublish" />
		</view>


	</view>
</template>

<script>
	import {
		selectRentInformationByAllSearchItems,
		selectRentInformationByDescribe
	} from '@/apis/rent_apis.js'
	export default {
		data() {
			return {
				keyword: "",
				priceColumns: {
					price0: '1000元以下',
					price1: '1000-1500元',
					price2: '1500-2000元',
					price3: '2000-3000元',
					price4: '3000-4500元',
					price5: '4500元以上'
				},
				priceValue: '123s',
				priceText: '租金',
				pricePickerVisible: false,


				roomTypeColumns: [
					['整租', '合租'],
					['一室', '二室', '三室', '四室及以上'],
				],
				roomTypeValue: [],
				roomTypeText: '房型',
				roomTypePickerVisible: false,


				areaColumns: {
					area0: '50m²以下',
					area1: '50-70m²',
					area2: '70-90m²',
					area3: '90-110m²',
					area4: '110-130m²',
					area5: '130-150m²',
					area6: '150-200m²',
					area7: '200m²以上',
				},
				areaValue: '123s',
				areaText: '面积',
				areaPickerVisible: false,

				towardColumns: {
					toward0: '东',
					toward1: '西',
					toward2: '南',
					toward3: '北',
					toward4: '东西',
					toward5: '南北',
				},
				towardValue: '123s',
				towardText: '朝向',
				towardPickerVisible: false,


				sortColumns: {
					sort0: '默认排序',
					sort1: '租金由低到高',
					sort2: '租金由高到低',
					sort3: '面积从小到大',
					sort4: '面积从大到小',
				},
				sortValue: '123s',
				sortText: '排序', 
				sortPickerVisible: false,


				tabs: [{
						label: '1列',
						value: 1
					},
					{
						label: '默认',
						value: 2
					},
					{
						label: '3列',
						value: 3
					},
				],
				column: 2,
				page: 1,
				pageSize: 20,
				loadStatus: 'loadmore',


				list: [],
				searchData: {
					amount: -2,
					area: -2,
					high: -2,
					large: -2,
					low: -2,
					order: -2,
					tiny: -2,
					toward: -2,
					type: -2, 
					userId: uni.getStorageSync('userId'),
				}
			}


		},
		// 下拉刷新
		// onPullDownRefresh() {
		//   this.refreshList();
		// },
		// // 上拉加载
		// onReachBottom() {
		//   this.loadList();
		// },
		onReady() {
			// this.refreshList();
			this.loadList();
		},
		onLoad() {
			let _this = this
			uni.showLoading({
				title: '加载房屋信息...'
			})
			let data = {
				amount: -2,
				area: -2,
				high: -2,
				large: -2,
				low: -2,
				order: -2,
				tiny: -2,
				toward: -2,
				type: -2,
				userId: uni.getStorageSync('userId'),
			}
			selectRentInformationByAllSearchItems(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					_this.list = res.data;
					for (var i = 0; i < _this.list.length; ++i) {
						switch (_this.list[i].hrToward) {
							case 1: {
								_this.list[i].hrToward = '东';
								break;
							}
							case 2: {
								_this.list[i].hrToward = '西';
								break;
							}
							case 3: {
								_this.list[i].hrToward = '南';
								break;
							}
							case 4: {
								_this.list[i].hrToward = '北';
								break;
							}
							case 5: {
								_this.list[i].hrToward = '东西';
								break;
							}
							case 6: {
								_this.list[i].hrToward = '南北';
								break;
							}
						} 

					}
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
			update() {
				selectRentInformationByAllSearchItems(this.searchData).then((res) => {
					if (res.statusCode == "200") {
						console.log(res.data);
						this.list = res.data;
						console.log(this.list.length);
						for (var i = 0; i < this.list.length; ++i) {
							switch (this.list[i].hrToward) {
								case 1: {
									this.list[i].hrToward = '东';
									break;
								}
								case 2: {
									this.list[i].hrToward = '西';
									break;
								}
								case 3: {
									this.list[i].hrToward = '南';
									break;
								}
								case 4: {
									this.list[i].hrToward = '北';
									break;
								}
								case 5: {
									this.list[i].hrToward = '东西';
									break;
								}
								case 6: {
									this.list[i].hrToward = '南北';
									break;
								}
							}

						}
						uni.hideLoading();
					} else {
						uni.hideLoading();
						uni.showToast({
							title: '获取失败',
							duration: 2000,
							icon: 'error'
						});
					}
					this.loadList();
				})
			},
			moveToHousePublish() {
				uni.navigateTo({
					url: '../rent_my_house/rent_my_house'
				})
			},
			handleSearch(value) {
				if (this.keyword == "") {
					console.log("这里什么都没有");
					let _this = this;
					let data = {
						amount: -2,
						area: -2,
						high: -2,
						large: -2,
						low: -2,
						order: -2,
						tiny: -2,
						toward: -2,
						type: -2,
						userId: uni.getStorageSync('userId'),
					}
					selectRentInformationByAllSearchItems(data).then((res) => {
						if (res.statusCode == "200") {
							console.log(res.data);
							_this.list = res.data;

							for (var i = 0; i < _this.list.length; ++i) {
								switch (_this.list[i].hrToward) {
									case 1: {
										_this.list[i].hrToward = '东';
										break;
									}
									case 2: {
										_this.list[i].hrToward = '西';
										break;
									}
									case 3: {
										_this.list[i].hrToward = '南';
										break;
									}
									case 4: {
										_this.list[i].hrToward = '北';
										break;
									}
									case 5: {
										_this.list[i].hrToward = '东西';
										break;
									}
									case 6: {
										_this.list[i].hrToward = '南北';
										break;
									}
								}

							}
							console.log(_this.list);
							uni.hideLoading();
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '获取失败',
								duration: 2000,
								icon: 'error'
							});
						}
						this.loadList();
					})

				} else {
					var data = {
						hrDescribe: this.keyword
					}
					selectRentInformationByDescribe(data).then((res) => {
						if (res.statusCode == "200") {
							console.log(res.data);
							this.list = res.data;
							console.log(this.list.length);
							for (var i = 0; i < this.list.length; ++i) {
								switch (this.list[i].hrToward) {
									case 1: {
										this.list[i].hrToward = '东';
										break;
									}
									case 2: {
										this.list[i].hrToward = '西';
										break;
									}
									case 3: {
										this.list[i].hrToward = '南';
										break;
									}
									case 4: {
										this.list[i].hrToward = '北';
										break;
									}
									case 5: {
										this.list[i].hrToward = '东西';
										break;
									}
									case 6: {
										this.list[i].hrToward = '南北';
										break;
									}
								}

							}

							uni.hideLoading();
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '获取失败',
								duration: 2000,
								icon: 'error'
							});
						}
						this.loadList();
					})
				}
			},
			refreshList() {
				this.page = 1;
				this.loadStatus = 'loadmore';
				this.$refs.waterfall.reset();
				this.loadList();
			},
			loadList() {
				// if (this.loadStatus == 'loadmore') {
				this.loadStatus = 'loading';
				setTimeout(() => {
					uni.stopPullDownRefresh();
					const total = 80;
					let len = this.$refs.waterfall.list.length;
					console.log("长度" + this.list.length);
					const newList = new Array(this.list.length).fill(1).map((item, index) => ({
						id: index + 1,
						height: (index == 0) ? 800 : 680,
						src: this.list[index].hrPicture,
						price: this.list[index].hrPrice,
						location: this.list[index].hrDescribe,
						roomType: this.list[index].hrBedroomAmount + '室' + this.list[index]
							.hrLivingRoomAmount + '厅' + this.list[index].hrToiletAmount + '卫',
						area: this.list[index].hrArea + 'm²',
						toward: this.list[index].hrToward,
						hrId: this.list[index].hrId,
					}));
					this.$refs.waterfall.reset();
					this.$refs.waterfall.push(newList);
					len = this.$refs.waterfall.list.length;
					this.loadStatus = 'loadmore';
				}, 200);
			},
			onPricePickerConfirm(obj) {
				console.log(obj.data.label);
				switch (obj.data.label) {
					case '1000元以下': {
						this.searchData.low = 0;
						this.searchData.high = 1000;
						break;
					}
					case '1000-1500元': {
						this.searchData.low = 1000;
						this.searchData.high = 1500;
						break;
					}
					case '1500-2000元': {
						this.searchData.low = 1500;
						this.searchData.high = 2000;
						break;
					}
					case '2000-3000元': {
						this.searchData.low = 2000;
						this.searchData.high = 3000;
						break;
					}
					case '3000-4500元': {
						this.searchData.low = 3000;
						this.searchData.high = 4500;
						break;
					}
					case '4500元以上': {
						this.searchData.low = 4500;
						this.searchData.high = -1;
						break;
					}
				}
				this.update();
			},
			onroomTypePickerConfirm(obj) {
				console.log(obj.dataList[0].label);
				switch (obj.dataList[0].label) {
					case '整租': {
						this.searchData.type = 1;
						break;
					}
					case '合租': {
						this.searchData.type = 2;
						break;
					}
				}
				switch (obj.dataList[1].label) {
					case '一室': {
						this.searchData.amount = 1;
						break;
					}
					case '二室': {
						this.searchData.amount = 2;
						break;
					}
					case '三室': {
						this.searchData.amount = 3;
						break;
					}
					case '四室及以上': {
						this.searchData.amount = 4;
						break;
					}
				}
				this.update();
			},
			onAreaPickerConfirm(obj) {
				console.log(obj.data.label);
				switch (obj.data.label) {
					case '50m²以下': {
						this.searchData.tiny = 0;
						this.searchData.large = 50;
						break;
					}
					case '50-70m²': {
						this.searchData.tiny = 50;
						this.searchData.large = 70;
						break;
					}
					case '70-90m²': {
						this.searchData.tiny = 70;
						this.searchData.large = 90;
						break;
					}
					case '90-110m²': {
						this.searchData.tiny = 90;
						this.searchData.large = 110;
						break;
					}
					case '110-130m²': {
						this.searchData.tiny = 110;
						this.searchData.large = 130;
						break;
					}
					case '130-150m²': {
						this.searchData.tiny = 130;
						this.searchData.large = 150;
						break;
					}
					case '150-200m²': {
						this.searchData.tiny = 150;
						this.searchData.large = 200;
						break;
					}
					case '200m²以上': {
						this.searchData.tiny = 200;
						this.searchData.large = -1;
						break;
					}
				}
				this.update();
			},
			onTowardPickerConfirm(obj) {
				console.log(obj.data.label);
				switch (obj.data.label) {
					case '东': {
						this.searchData.toward = 1;
						break;
					}
					case '西': {
						this.searchData.toward = 2;
						break;
					}
					case '南': {
						this.searchData.toward = 3;
						break;
					}
					case '北': {
						this.searchData.toward = 4;
						break;
					}
					case '东西': {
						this.searchData.toward = 5;
						break;
					}
					case '南北': {
						this.searchData.toward = 6;
						break;
					}
				}
				this.update();
			},
			onSortPickerConfirm(obj) {
				console.log(obj.data.label);
				switch (obj.data.label) {
					case '租金由低到高': {
						this.searchData.order = 1;
						break;
					}
					case '租金由高到低': {
						this.searchData.order = 2;
						break;
					}
					case '面积从小到大': {
						this.searchData.order = 3;
						break;
					}
					case '面积从大到小': {
						this.searchData.order = 4;
						break;
					}
				}
				this.update();
			}
		}
	};
</script>

<style>
	@import url("../../font_support/iconfont.css");

	.item {
		background-color: white;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}

	.image0 {
		width: 100% !important;
		height: 71% !important;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}

	.imageOther {
		width: 100%;
		height: 450rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}

	.price {
		color: #006FFF;
		font-size: 36rpx;
	}

	.location {
		font-size: 28rpx;
		padding: 0rpx 8rpx;
		border-radius: 10rpx;
		display: inline-block;
		background-color: rgba(154, 154, 154, 0.1);
		color: rgba(154, 154, 154, 1);
	}

	.roomDetails {
		font-size: 24rpx;
	}

	.subscribe {
		position: absolute;
		right: 0;
		font-size: 32rpx;
		padding: 0rpx 8rpx;
		border-radius: 12rpx;
		display: inline-block;
		background-color: rgba(0, 111, 255, 0.1);
		color: #006FFF;
	}

	.container {
		margin: 20rpx 30rpx;
	}

	.after:before {
		content: "\e600";
	}
</style>
