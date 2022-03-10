<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">老年大学</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">

				<view class="" v-for="(item, id) in orderList" :key="id">
					<swiper-item v-if="show[id]" class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
							<view class="page-box">
								<view class="order" v-for="(res, index) in item" :key="index"
									@click="goCourse(res.courseId)">
									<view class="top">
										<view class="left">
											<uni-text class="cuIcon-titles text-blue"></uni-text>
											<view class="store">{{ res.courseName }}</view>
											<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
										</view>
										<view class="right">
											<text class="text-blue">状态：</text>
											<view class="progressBox">
												{{ res.courseStatus }}
											</view>
										</view>
									</view>
									<view class="item">
										<view class="left">
											<image :src="res.courseCover" mode="aspectFill"></image>
										</view>
										<view class="content">
											<view class="title u-line-2 text-bold">{{ res.courseDetails }}</view>
											<view class="type">{{ res.courseCategoryName }}</view>
											<view class="delivery-time">费用：{{ res.courseFee }}</view>
										</view>
									</view>
									<u-line color="#f1f1f1" margin="24rpx 0 15rpx 0"></u-line>
									<view class="bottom">
										<view>
											<text class="text-blue text-shadow">总章节数：{{res.courseSections}}</text>
										</view>

										<view class="btnBox">
											<!-- <view class="exchange btn">分享课程</view> -->
											<view @click="goClass" class="evaluate btn">
												{{ res.courseStartTime }}至{{ res.courseEndTime }}
											</view>
										</view>
									</view>
								</view>
								<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
							</view>
						</scroll-view>
					</swiper-item>


					<swiper-item v-else class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;">
							<view class="page-box">
								<view>
									<view class="centre">
										<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
										<view class="explain">
											暂无课程信息
											<view class="tips">请稍后再试</view>
										</view>

									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>

				</view>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		selectAllCourseCategory,
		selectAllCourseByCategoryId
	} from '@/apis/education_apis.js'
	export default {
		data() {
			return {
				percent: 50,
				activeColor: '#0081ff',
				striped: false,
				stripedActive: false,

				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],

				orderList: [
					[{
						id: 1,
						store: '小班课 · 1班',
						progre: 60,
						goodsList: [{
							goodsUrl: 'http://cdn.zhoukaiwen.com/web2.jpg',
							title: '第一阶段·5课时',
							type: '课程名称：《vue-router全局导航守卫》，简介：导航首位就是变化的路由钩子...',
							teacher: '王老师',
							number: 2
						}]
					}],
					[],
					[]
				],
				show: [true, false, false],
				dataList: [{
						id: 1,
						store: '小班课 · 1班',
						progre: 60,
						goodsList: [{
							goodsUrl: 'http://cdn.zhoukaiwen.com/web2.jpg',
							title: '第一阶段·5课时',
							type: '课程名称：《vue-router全局导航守卫》，简介：导航首位就是变化的路由钩子...',
							teacher: '王老师',
							number: 2
						}]
					},
					{
						id: 2,
						store: '精品课 · 2班',
						progre: 39,
						goodsList: [{
							goodsUrl: 'http://cdn.zhoukaiwen.com/web1.jpg',
							title: 'Promise的链式调用',
							type: 'Promise 必须为以下三种状态之一：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。一旦Promise 被 resolve 或 reject，不能再迁移至其他任何状态（即状态 immutable）。',
							teacher: 'Lee老师',
							number: 1
						}]
					},
					{
						id: 3,
						store: '小班课 · 3班',
						progre: 55,
						goodsList: [{
							goodsUrl: 'http://cdn.zhoukaiwen.com/web2.jpg',
							title: '基于vue应用中实用的性能技巧',
							type: '1.封装项目的基础库；2.层级管理；3.缓存；4.延迟加载；5.工程化-webpack的改进；6.控制代码质量；7.自动化部署等优化方案',
							teacher: '王老师',
							number: 3
						}]
					},
					{
						id: 4,
						store: '小班课 · 4班',
						progre: 80,
						goodsList: [{
							goodsUrl: 'http://cdn.zhoukaiwen.com/web1.jpg',
							title: '变量提升及函数提升',
							type: '引擎在读取js代码的过程中,分为两步。第一个步骤是整个js代码的解析读取,第二个步骤是执行',
							teacher: '王老师',
							number: 9
						}]
					}
				],
				list: [],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			var that = this;

			var data = {}
			selectAllCourseCategory(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					that.list = new Array(res.data.length);
					that.orderList = new Array(res.data.length);
					for (var i = 0; i < res.data.length; ++i) {
						that.list[i] = {
							id: res.data[i].courseCategoryId,
							name: res.data[i].courseCategoryName
						}

						that.getItems(res.data[i].courseCategoryId, i);
					}
					// selectAllCourseByCategoryId
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
		computed: {
			// 价格小数
			priceDecimal() {
				// return val => {
				// 	if (val !== parseInt(val)) return val.slice(-2);
				// 	else return '00';
				// };
			},
			// 价格整数
			priceInt() {
				// return val => {
				// 	if (val !== parseInt(val)) return val.split('.')[0];
				// 	else return val;
				// };
			}
		},
		methods: {
			getItems(cid, i) {
				var that = this;
				var data = {
					courseCategoryId: cid
				}
				selectAllCourseByCategoryId(data).then((res) => {
					if (res.statusCode == "200") {
						console.log(res.data);
						// that.orderList[i] = new Array(res.data.length);
						that.orderList[i] = res.data;
						if (res.data.length == 0) {
							that.show[i] = false;

						} else {
							that.show[i] = true;
						}
						// selectAllCourseByCategoryId
						uni.hideLoading();
					} else {
						uni.hideLoading();
						uni.showToast({
							title: '获取失败',
							duration: 2000,
							icon: 'error'
						});
					}
					that.$forceUpdate();
				})
			},
			// 课班信息
			goCourse(courseId) {
				uni.navigateTo({
					url: '/pages/video?courseId=' + courseId
				})
			},
			goClass() {
				// uni.showToast({
				//     title: '没有权限～',
				//     duration: 2000,
				// 	icon: 'none'
				// });
			},
			reachBottom() {
				// 此tab为空数据
				// if(this.current != 2) {
				// 	this.loadStatus.splice(this.current,1,"loading")
				// 	setTimeout(() => {
				// 		this.getOrderList(this.current);
				// 	}, 1200);
				// }
			},
			// 页面数据
			getOrderList(idx) {
				// for(let i = 0; i < 5; i++) {
				// 	let index = this.$u.random(0, this.dataList.length - 1);
				// 	let data = JSON.parse(JSON.stringify(this.dataList[index]));
				// 	data.id = this.$u.guid();
				// 	this.orderList[idx].push(data);
				// }
				// this.loadStatus.splice(this.current,1,"loadmore")
			},
			// 总价
			totalPrice(item) {
				// let price = 0;
				// item.map(val => {
				// 	price += parseFloat(val.price);
				// });
				// return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				// let num = 0;
				// item.map(val => {
				// 	num += val.number;
				// });
				// return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				// this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
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
				color: $u-type-warning-dark;

				.progressBox {
					width: 150rpx;
					float: right;
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
				margin-left: 10rpx;
				padding-top: 20rpx;
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
				width: 350rpx;
				display: flex;
				justify-content: space-between;

				.btn {
					line-height: 52rpx;
					width: 440rpx;
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
