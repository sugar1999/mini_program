<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">留言</block>
		</cu-custom>
		<view class="content compose-editor">
			<view class="fui-section__title">所患疾病</view>
			<fui-input v-model="inquiry_name" borderTop placeholder="请输入所配患疾病" maxlength="20" @change="changeInquiryName(inquiry_name)"></fui-input>
			<view  class="fui-section__title">上次就诊医院</view>
			<fui-input v-model="lastLocation" :bottomLeft="0" placeholder="请输入上次就诊的医院" maxlength="20" @change="changeLastLocation(lastLocation)"></fui-input>
			<view class="mycheckOne">
				<view class="mycheck">
					<s-checkbox v-model="ask" shape="round" label="病情咨询"/>
				</view>
				<view class="mycheck">
					<s-checkbox v-model="interpretation" shape="round" label="报告解读"/>
				</view>
				<view class="mycheck">
					<s-checkbox v-model="medication" shape="round" label="用药建议"/>
				</view>
				<view class="mycheck">
					<s-checkbox v-model="guide" shape="round" label="诊后指导"/>
				</view>
			</view>
			<textarea class="form-control" v-model="inquiry_question" placeholder="请留言..."></textarea>
			<button class="blueBtn cu-btn bg-blue shadow lg" @click="saveQuestion">留言</button>
		</view>
	</view>
</template>

<script>
	import {
		saveQuestion, selectIdByAccount
	} from '@/apis/cure_apis.js'
	export default{
		data (){
			return {
				ask: false,
				interpretation: false,
				medication: false,
				guide: false,
				inquiry_name: '',
				lastLocation: '',
				inquiry_question: '',
				account: uni.getStorageSync('userInfo').nickName,
				doctorid: '',
				department: '',
				villagersid: ''
			}
		},
		onLoad: function (options) {
		    this.doctorid=options.doctorid
		    this.department=options.department 
		    console.log("doctorid:"+this.doctorid)
		    console.log("department:"+this.department)
			console.log("account: "+this.account)
			let Account = {account: this.account}
			selectIdByAccount(Account).then((res) => {
				if (res.statusCode == "200")
				{
					this.villagersid = res.data
					console.log(res.data);
					uni.hideLoading();
				}
				else
				{
					uni.hideLoading();
					uni.showToast({
					title: '获取失败',
					duration: 2000,
					icon: 'error'
					});
				}
			})
		},
		methods:{
			saveQuestion(){
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否提交问诊信息？',
					success: function (res) {
						if(res.confirm){
							let data = {
								doctorid: _this.doctorid,
								inquiry_department: _this.department,
								inquiry_name: _this.inquiry_name,
								inquiry_question: _this.inquiry_question,
								ask: _this.ask,
								guide: _this.guide,
								interpretation: _this.interpretation,
								medication: _this.medication,
								lastLocation: _this.lastLocation,
								villagersid: _this.villagersid,
							}
							console.log(data);
							saveQuestion(data).then((res) => {
								if (res.statusCode == "200")
								{
									console.log(res.data);
									uni.hideLoading();
								}
								else
								{
									uni.hideLoading();
									uni.showToast({
									title: '获取失败',
									duration: 2000,
									icon: 'error'
									});
								}
							})
							uni.navigateBack();
						}
						else if(res.cancel){
							
						}
						
					},
					fail: function (res) {
						
					}
				});
			},
			changeAskValue(e){
				console.log(e)
				if(e == 0){
					this.isAsk = 1
				}else{
					this.isAsk = 0
				}
			},
			changeInterpretationValue(e){
				if(e == 0){
					this.isInterpretation = 1
				}else{
					this.isInterpretation = 0
				}
			},
			changeMedicationValue(e){
				if(e == 0){
					this.isMedication = 1
				}else{
					this.isMedication = 0
				}
			},
			changeGuideValue(e){
				if(e == 0){
					this.isGuide = 1
				}else{
					this.isGuide = 0
				}
			},
			changeName(e){
				this.villagers_name = e.data
			},
			changeInquiryName(e){
				this.inquiry_name = e.data
			},
			changeLastLocation(e){
				this.lastLocation = e.data
			}
		}
	}
</script>

<style lang="scss">
	.fui-section__title {
		margin-top: 50rpx;
		margin-left: 32rpx;
	}
	.mycheckOne{
		display: flex;
		margin-top: 8%;
		font-size: 30rpx;
	}
	.mycheck{
		margin-left: 2%;
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
	.blueBtn {
		width: 500rpx;
		margin: 50rpx auto;
		display: block;
		line-height: 80rpx;
	}
</style>
