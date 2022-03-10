<template>
	<view id="page">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">被选人信息</block>
		</cu-custom>
		<view class="detail">
			<view>
				<image :src="person.img" mode="widthFix" class="personal-picture"></image>
			</view>
			<view class="main">
				<view class="personal-item">
					姓名：{{person.name}}
				</view>
				<view class="personal-item">
					性别：{{person==1?'男':'女'}}
				</view>
				<view class="personal-item">
					年龄：{{person.age}}
				</view>
				<view class="personal-item">
					政治面貌：{{person.political_face}}
				</view>
				<view class="personal-item">
					竞选职务：{{person.duty}}
				</view>
			</view>
			<view class="vote">
				{{person.votes}}票
			</view>
		</view>
		<view style="height: 20rpx; background-color: #f2f5f9;">

		</view>
		<view class="more">
			<view class="more-title" id="brief_introduction">
				个人简历
			</view>
			<view class="more-detail">
				{{person.brief_intro}}
			</view>
		</view>
		<view style="height: 20rpx; background-color: #f2f5f9;">

		</view>
		<view class="more">
			<view class="more-title" id="plan">
				工作规划
			</view>
			<view class="more-detail">
				{{person.outlook}}
			</view>
		</view>


		<view class="null">

		</view>
		<view v-if="canButtonClick" class="vote-border" @click="toVote()">
			<view class="I-Wanna-Vote">
				我要投票
			</view>
		</view>
		<view v-if="!canButtonClick" class="vote-border-false" @click="denyVote()">
			<view class="I-Wanna-Vote">
				我要投票
			</view>
		</view>
	</view>
</template>

<script>
	import {
		votePersonDetailsById,
		updatePersonVote,
		selectVoteRecord,
		addVoteRecord
	} from '@/apis/vote_apis.js'
	export default {
		data() {
			return {
				person: {
					pic_url: 'http://p1362.bvimg.com/10465/1f4eaa48047cfed7.jpg',
					name: '赵芳舟',
					sex: '女',
					age: '33',
					political: '中共党员',
					duties: '村支书',
					vote: '18',
					brief_introduction: "1963年我出生在炉新村，二十多年前，曾经在本村务过农，当过村队会计，并成功地落实了农业生产承包责任制。1986年间协助炉新村委会兴建了红砖厂，负责并建立了财务账目。改革开放的良好机遇使我走上了从医的职业，我现在是一名国家执业医师，自己开设了医疗机构，我有自己的事业。今天我站在这里参加竞选，不为别的，目的是想和全体村民一起尽我的能力实实在在地把我们炉新村的发展建设共同搞好，把我们炉新村村民家家户户的生活水平共同提高，并达到共同富裕的目的。",
					plan: "在村党支部的领导监督下，在全体村民的支持和监督下，进一步地规范和完善村民自治组织的各项规章制度，推行并真正落实好以财务公开为主要内容的村务公开制度。一是要搞好财务管理和资金管理，建立四人签字报销制度，即经手人、群众代表、党员代表、主管负责人。二是要严格资金使用程序，杜绝先斩后奏、盲目乱花钱现象的发生，同时要定期公布村务帐目，给大家一个明白，用干部自身的清白，给村民一个明白。三是村委要定期或不定期召开全体村民大会，让更多的人参与到村务管理工作中来，有好的想法和建议须经村民大会多数表决通过，从而避免少数人说了算的不良现象，真正让村民当家做主，依法维护村民的各种合法权益。"
				},
				showFloatWindow: false,
				canButtonClick: false,
				id: "",
				uid: ""
			}
		},
		methods: {
			// toVote() {
			// 	this.showFloatWindow = !this.showFloatWindow;
			// }
			// ,
			denyVote() {
				uni.showToast({
					title: '您已经投过票了！',
					duration: 2000,
					icon: 'error'
				});
			},
			toVote() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否进行投票？',
					success: function(res) {
						if (res.confirm) {
							console.log('confirm');
							// uni.navigateBack();
							console.log(that.person.voteid);
							var data1 = {
								voteid: that.person.voteid
							}
							console.log(data1);
							updatePersonVote(data1).then((res) => {
								if (res.statusCode == "200") {
									console.log("success");
									uni.hideLoading();
									var data2 = {
										votePersonUid: that.uid,
										voteInfoId: that.id,
										uid: 'User#1'
									}
									addVoteRecord(data2).then((res) => {
										if (res.statusCode == "200") {
											console.log("success");
											uni.hideLoading();
											selectVoteRecord(data2).then((res) => {
												if (res.statusCode == "200") {
													console.log("aaa" + res.data);
													that.canButtonClick = res.data >
														0 ? false : true;
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
										} else {
											uni.hideLoading();
											uni.showToast({
												title: '获取失败',
												duration: 2000,
												icon: 'error'
											});
										}
									})
								} else {
									uni.hideLoading();
									uni.showToast({
										title: '获取失败',
										duration: 2000,
										icon: 'error'
									});
								}
							})


						} else {
							console.log('deny');
						}
					},
					fail: function(res) {
						console.log('fail');
					}
				});
			},
			submit() {
				// 上传数据（待写）

				// 退回上一页
				// uni.navigateBack();
			}
		},
		onLoad(option) {

			var _this = this;
			this.id = option.id;
			this.uid = option.uid;
			console.log(option.id);
			console.log(option.uid);
			var data = {
				uid: option.uid,
				voteinfoid: option.id
			}
			votePersonDetailsById(data).then((res) => {
				if (res.statusCode == "200") {
					console.log(res.data);
					_this.person = (res.data);
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
			var data1 = {
				votePersonUid: option.uid,
				voteInfoId: option.id,
				uid: 'User#1'
			}
			selectVoteRecord(data1).then((res) => {
				if (res.statusCode == "200") {
					console.log("aaa" + res.data);
					_this.canButtonClick = res.data > 0 ? false : true;
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
		}
	}
</script>

<style>
	/*  */
	.float-back {
		float: left;
		z-index: 100;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(110, 110, 110, 0.6);

	}

	.float-window {
		position: relative;
		height: 200rpx;
		width: 300rpx;
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 26rpx;
		margin: 0 auto;
		top: 30%;
	}

	.float-window .close {
		position: absolute;
		right: 20rpx;
	}

	.float-window .close:before {
		content: "\e628";
	}

	.success {
		text-align: center;
		margin-top: 60rpx;
		font-size: 14px;
		margin-bottom: 40rpx;
	}

	.submit {
		margin: 0 auto;
		text-align: center;
		line-height: 56rpx;
		width: 120rpx;
		height: 56rpx;
		border-radius: 14rpx;
		font-size: 12px;
		background-color: #a4adb3;
		color: white;
	}

	/*  */
	#page {
		padding: 50rpx 0;
		background-color: #fff;
	}

	.detail {
		display: flex;
		font-size: 28rpx;
		margin: 0 40rpx;
		margin-bottom: 40rpx;
	}

	.personal-picture {
		flex: 2;
		width: 200rpx;
		box-shadow: 0 0 20rpx #A6A7A6;
		height: 300rpx;
	}

	.main {
		flex: 3;
		margin-left: 40rpx;
	}

	.main .personal-item {
		margin: 6px 0;
	}

	.vote {
		flex: 1;
		color: #00a3ff;
		font-weight: bold;
		font-size: 18px;
	}



	/*  */
	.more {
		margin-top: 30rpx;
		margin: 30rpx 40rpx;
	}

	.more .more-title {

		background-size: contain;
		background-repeat: no-repeat;
		font-size: 28rpx;
		height: 50rpx;
		/* padding-left: 60rpx; */
		font-weight: bold;
		line-height: 50rpx;
	}

	/* 	.more #brief_introduction {
		background-image: url(http://p1362.bvimg.com/10465/dd5c3c28123b0e8f.png);
	}
	
	.more #plan {
		background-image: url(http://p1362.bvimg.com/10465/a50fb8b2ab7e07e1.png);
	} */

	.more .more-detail {
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #A6A7A6;
	}


	/*  */
	.null {
		height: 30rpx;
	}

	.vote-border {
		display: block;
		margin: 0 auto;
		width: 230rpx;

		padding: 10rpx;

		border-radius: 20rpx;
		background-color: #00a3ff;
	}

	.vote-border-false {
		display: block;
		margin: 0 auto;
		width: 230rpx;

		padding: 10rpx;

		border-radius: 20rpx;
		background-color: #c5c5c5;
	}

	.I-Wanna-Vote {

		background-image: url(http://p1362.bvimg.com/10465/9b6db29fbdd30740.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 10rpx center;

		/* font-size: 14px; */
		height: 60rpx;
		padding-left: 76rpx;
		line-height: 70rpx;
		color: white;

	}
</style>
