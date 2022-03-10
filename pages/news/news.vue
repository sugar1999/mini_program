<!-- 新闻 详情 -->
<template>
	<view class="container">
		<view style="background-color: #FFFFFF;padding: 30rpx 30rpx 30rpx 30rpx;">
			<view class="titleBox text-xl text-black text-bold">{{title}}</view>
			<view class="timeBox text-df text-gray margin-top-sm margin-bottom-sm">{{time}}</view>
			<image mode="widthFix" :src="img"></image>

			<!-- 中间文章区域 -->
			<view class="contentBox text-lg text-black margin-top-sm">
				<view v-html="message"></view>
			</view>
		</view>
		
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				informationid: '',
				message: '',
				title: '',
				time: '',
				authorName: '',
				img: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				getData: [],

				detailsId: '',
				
				comment_input:'',	//评论内容
				praiseType: 0, //1点赞  2取消点赞
			}
		},
		onLoad(option) {
			this.detailsId = option.detailsId;
			this.informationid = option.informationid;
			this.message = option.message;
			this.title = option.title;
			this.time = option.time;
			this.authorName = option.authorName;
			this.img = option.img;
			this.getDataFun();
		},
		methods: {
			onShareAppMessage(res) {
				return {
					title: '轻松一课，来看看吧～',
				}
			},
			getDataFun() {
				this.getData = {
					title: '来，一起手撕32个大厂高频面试编程题',
					createTime: '2020年11月03日',
					url: 'http://cdn.zhoukaiwen.com/5a97516eada18453046c61a263f41ef9.jpg',
					content: "来，一起手撕32个大厂高频面试编程题，来，一起手撕32个大厂高频面试编程题，来，一起手撕32个大厂高频面试编程题。",
				};
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 评论
			send_btn(){
				// console.log(this.comment_input);
				let optsList = {
					url: 'south/southEasyLessonEvaluate/xcx/evaluate',
					method: 'post'
				};
				let paramsList = {
					articleId: this.detailsId,
					describ: this.comment_input, 
				};
				request.httpTokenRequest(optsList, paramsList).then(res => {
					if (res.data.code === 200) {
						console.log(res.data);
						this.comment_input = '';
						this.getDataFun();
					}
				});
			},
			// 点赞
			praiseClick() {
				uni.showToast({
					title: '感谢参与',
					duration: 2000
				});
				if (this.praiseType == 1) {
					this.praiseType = 2;
				} else if (this.praiseType == 2) {
					this.praiseType = 1;
				} else {
					this.praiseType = 1;
				}

				// 提交点赞数据
				let opts = {
					url: `south/southEasyLesson/xcx/${this.detailsId}/type/${this.praiseType}`,
					method: 'post'
				};
				request.httpTokenRequest(opts).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.getDataFun();
					}
				});

				console.log(this.detailsId);
				console.log(this.praiseType);
			}
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: none;
		background: transparent;
	}

	uni-button {
		background: transparent;
	}

	.container {
		background-color: #f2f2f2;
		width: 750rpx;

	}

	.solid {
		border-radius: 50rpx;
		text-indent: 12rpx;
	}

	image {
		width: 750rpx;
	}

	.bottomBox {
		width: 750rpx;
		position: fixed;
		left: 0;
		bottom: 0rpx;
	}
</style>
