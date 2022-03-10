<template>
	<view class="mybg">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">请选择问诊医生</block>
		</cu-custom>
		
		<view class="fui-section__title"></view>
		
		<picker @change="bindPickerChange" :range="array" class="picker_border">
			<view class="fui-section__title">请选择科室: {{department}}</view>
		</picker> 
		<view class='nav-list margin-top'>
			<navigator open-type="navigate" hover-class='none' :url="'/page_cure/cure_item/cure_message?doctorid='+item.doctorid+'&department='+item.department"
			 v-for="(item, index) in doctorList" :key="index">
				 <text class="mytitle">医生个人信息</text>
				 <view class="item myicon">
					<view class="myfont2">{{item.doctor_name}}</view>
					<textarea class="myfont1" disabled="true">{{item.detail}}</textarea>
					<image :src="`${picture}`" class="myicon-location" mode="widthFix"></image>
				</view>
			</navigator>
		</view>
		<view style="height: 200rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
	import { 
		selectDoctorDetailByDepartment, selectDepartment
	} from '@/apis/cure_apis.js'
	export default {
		data() {
			return {
				doctorList:[],
				picture:'http://p1362.bvimg.com/10465/445be41bb19c7cc0.jpg',
				text: '',
				array: [],
				index: 0,
				department: '请选择'
			}
		},
		onLoad() {
			var data = {};
			selectDepartment(data).then((res) => {
				if(res.statusCode == "200")
				{
					this.array = res.data
					console.log(res.data);
					uni.hideLoading();
				}
				else
				{
					console.log('获取失败')
					uni.hideLoading();
					uni.showToast({
						title: '获取失败',
						duration: 2000,
						icon: 'error'
					})
				}
			})
		},
		methods:{
			//下拉框
			bindPickerChange: function(e) {		//改变的事件名
				this.index = e.target.value			//将数组改变索引赋给定义的index变量
				this.department=this.array[this.index]		//将array【改变索引】的值赋给定义的jg变量
				console.log(this.department)
				let data = {department: this.department}
				selectDoctorDetailByDepartment(data).then((res) => {
					if(res.statusCode == "200")
					{
						this.doctorList = res.data
						console.log(res.data);
						uni.hideLoading();
					}
					else
					{
						console.log('获取失败')
						uni.hideLoading();
						uni.showToast({
							title: '获取失败',
							duration: 2000,
							icon: 'error'
						})
					}
				})
			},
		}
	};
</script>

<style lang="scss">
	.nav-list {
		display:block;
		flex-wrap: wrap;
		padding: 0rpx 0rpx 0rpx 0upx;
		justify-content: space-between;
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
	.myicon{
		width: 300px;
		height: 130px;
		margin: 0 auto;
		margin-bottom: 5%;
		background-color: rgba(255,255,255,0.2);
	}
		
	.item {
		display: block;
		align-items: center;
		justify-content: center;
		background-color:#F4F4F4;
		border-radius: 10rpx;
		color: white;
	}
	.mybg{
		background-color: white;
		// background: rgb(2,0,36);
		// background: linear-gradient(143deg, rgba(2,0,36,1) 0%, rgba(92,233,247,1) 0%, rgba(78,92,218,1) 100%);
		// background-size:100% 100%;
	}
	.myfont1{
		width: 180px;
		height: 80px;
		position: relative;
		color: black;
		top: 20%;
		left: 37%;
		font-size: 30rpx;
		display: -webkit-box; /*弹性伸缩盒子模型显示*/
		-webkit-box-orient: vertical; /*排列方式*/ 
		-webkit-line-clamp: 5; /*显示文本行数(这里控制多少行隐藏)*/
		overflow: hidden; /*溢出隐藏*/
	}
	.myfont2{
		color: black;
		position: relative;
		left: 40%;
		top: 10%;
		font-size: 15px;
		// font-style: italic;
		// opacity: 0.7;
	}
	.fui-section__title {
		margin-left: 32rpx;
		font-size: 15px;
	}
	.mytitle{
		color: black;
		font-size: 50rpx;
		position: relative;
		left: 35%;
		font-weight: bold;
	}
	.myicon-location{
		width: 90px;
		height: 90px;
		bottom: 60%;
		left: 5%;
	}
</style>
