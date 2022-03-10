<template>
	<view class="page">
		<view class="float-back" v-show="showFloatWindow">
			<view class="float-window">
				<view class="iconfont close" @click="toVote()">
					
				</view>
				<view class="success">
					提交成功!
				</view>
				<view class="submit" @click="submit()">
					确定
				</view>
			</view>
		</view>
		
		<form>
			<view style="height: 30rpx;">
				
			</view>
			<view class="repair-border">
				<view class="repair-item r1">
					<view class="repair-text r-name iconfont">
						<text>联系人姓名</text>
					</view>
					<view class="repair-input">
						<input class="uni-input" name="name" placeholder="姓名" v-model="fixUserName"/>
					</view>
				</view>
			</view>
			<view class="repair-border">
				<view class="repair-item r2">
					<view class="repair-text r-phone iconfont">
						联系电话
					</view>
					<view class="repair-input">
						<input class="uni-input" name="phone" placeholder="电话" v-model="fixUserPhone"/>
					</view>
				</view>
			</view>
			<view class="repair-border ">
				<view class="repair-item r3 ">
					<view class="repair-text r-address iconfont repair_after iconfont">
						报修地点
					</view>
					<view class="repair-input" style="position: relative;" @click="chooseLocation">
						<view class="uni-input  "  id="repair-address-main" style="position: relative; left: 0; right: 0; margin-right: 0;">
							<text>{{repair_address_main}}</text> 
							<text class=""></text>
						</view>
					</view>
				</view>
			</view>
			<view class="repair-border">
				<view class="repair-item r4">
					<view class="repair-text r-roomNum iconfont">
						门牌号
					</view>
					<view class="repair-input ">
						<input class="uni-input" name="roomNum" placeholder="详细地址,如:1号楼1单元101" v-model="fixUserDoor"/>					
					</view>
				</view>
			</view>
			<view class="repair-border">
				<view class="repair-item r3">
					<view class="repair-text r-date iconfont repair_after iconfont">
						上门日期
					</view>
					<view class="repair-input">
						<picker class="uni-input" mode="date" :value="date" :start="startDate()" :end="endDate()" @change="bindDateChange" style="position: relative;">
							<view class="">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="repair-border">
				<view class="repair-item r4">
					<view class="repair-text r-time iconfont repair_after iconfont">
						上门时间
					</view>
					<view class="repair-input">
						<picker mode="time" class="uni-input" @change="bindTimeChange" :start="startTime()" :end="endTime()" :value="time" style="position: relative;">
							<view class="">{{time}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="repair-border">
				<view class="repair-item r5">
					<view class="repair-text r-type iconfont repair_after iconfont">
						问题类型
					</view>
					<view class="repair-input">
						<picker mode="multiSelector" class="uni-input" @change="bindPickerChange" @columnchange="bindIndexChange" :range="problemType" style="position: relative;" v-model="fixType">
							<label class="">{{problemType[0][typeIndex]}}-{{problemItems[typeIndex][typeItems]}}</label>
						</picker>
					</view>
				</view>
			</view>
			<view class="repair-border">
				<view class="repair-item r6">
					<view class="repair-text r-discribe iconfont">
						问题描述
					</view>
				</view>
				<view class="repair-item r7" >
					<view class="repair-input" style="margin-left: 100rpx">
						<textarea class="uni-input"  placeholder="详细描述遇到的问题" style="float: right; width: 100%;" v-model="fixDetails"/>
					</view>
				</view>
			</view>
			<view class="repair-border">
				<view class="repair-item r8">
					<view class="repair-text r-photo iconfont">
						照片/视频
					</view>
				</view>
<!-- 				<view class="repair-item r9">
					<view class="repair-input repair-input-image" style="margin-left: 90rpx;">

						<view v-for="(item , index) in imgArr" :key="index" style="position: relative;">
							<image src="http://p1362.bvimg.com/10465/811d84ee9403038c.png" mode="aspectFit" @click="deleteImg(index)"  style="position: absolute; top:-10rpx; right: -10rpx; z-index: 100; width: 35rpx; height: 35rpx;"></image>
							<image :src="item" mode="aspectFill" class="uni-input repair-image" style="padding: 0;" ></image>
						</view>
						<view v-if="get_imgArrLength()" class="repair-image add-image" @click="chooseImg">
							
						</view>
					</view>
				</view> -->
				<view style="display: block; margin-left: 20rpx;">
					<view v-for="(item , index) in imgArr" :key="index"
						style="position: relative; display: inline-block; margin-right: 20rpx; width: 120rpx; height: 120rpx;">
						<image src="http://p1362.bvimg.com/10465/811d84ee9403038c.png" mode="aspectFit"
							@click="deleteImg(index)"
							style=" position: absolute; top:-10rpx; left: -10rpx; z-index: 100; width: 35rpx; height: 35rpx;">
						</image>
						<image :src="item" mode="aspectFill" class="uni-input repair-image"
							style="padding: 0; display: inline-block;"></image>
					</view>
					<view v-if="get_imgArrLength()" class="repair-image add-image" @click="chooseImg"
						style="position: relative; display: inline-block;">
					</view>
				</view>
			</view>

			<view class="bottom-bar">
				<view style="height: 0rpx;">
					
				</view>
				<view class="release-button">
					<button class="r-button1" @click="goBack">取 消</button>
					<button class="r-button2" @click="submit">提 交</button>
				</view>	
				<!-- <view style="height: 30rpx;">
					
				</view> -->
			</view>
		</form>
	</view>
</template>

<script>
	import {
		addFixRequest,selectUserByAccount
	} from '@/apis/repair_apis.js'
	export default {
		data() {
			
			const currentDate = this.getDate({
			            format: true
			        })
			const currentTime = this.getTime('load')
			return {
				account: 'user1',
				// account: uni.getStorageSync('userInfo').nickName,
				repair_address_main:"请选择",
				problemType:[
					['请选择种类','水电','泥木','通讯','园林绿化'],
					['请选择分项']
				],
				problemItems:[
					['请选择分项'],
					['请选择分项','水龙头','洁具','照明'],
					['请选择分项','瓷砖','床柜','门窗'],
					['请选择分项','固定电话','摄像头','网线'],
					['请选择分项','绿化养护','花卉布置','园林工程']
				],
				typeIndex:0,
				typeItems:0,
				imgArr: [],
				showFloatWindow:false,
				time: currentTime,
				date: currentDate,
				fixUserDoor: '',
				fixUserName: '',
				fixUserPhone: '' ,
				fixDetails: '',
				fixType: '',
				userId: ''
			}
		},
		mounted() {
			var data = {account: this.account};
			selectUserByAccount(data).then((res) => {
				if(res.statusCode == "200")
				{
					this.userId = res.data
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
		methods: {
			startDate: function() {
			    return this.getDate('start');
			},
			endDate: function() {
			    return this.getDate('end');
			},
			startTime: function() {
			    return this.getTime('start');
			},
			endTime: function() {
			    return this.getTime('end');
			},
			bindTimeChange: function(e) {
			    this.time = e.target.value;
			},
			bindDateChange: function(e) {
			    this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
		
				if(date.getHours() >= '17')
				{
					date.setTime(date.getTime()+24*60*60*1000);
				}
				
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 0;
				} else if (type === 'end') {
					year = year + 1;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getTime(type) {
				const date = new Date();
				
				const currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
				
				let hour;
				let minute;
				
				if (type === 'end')
				{
					hour = '17';
					minute = '00';
				}
				else {
					if(type == 'load' && date.getHours() >= 9 && date.getHours() < '17')
					{
						hour = date.getHours();
						// let min = new Date().getMinutes();
						// minute = 15-(min%15) + min;
						minute = date.getMinutes();
						console.log("123"+hour);
						console.log("123"+minute);
						hour = hour > 9 ? hour : '0' + hour;
						minute = minute > 9 ? minute : '0' + minute;
					}
					else if(currentDate === this.date && date.getHours() >= 9 && date.getHours() < '17')
					{
						hour = date.getHours(); 
						// let min = new Date().getMinutes();
						// minute = 15-(min%15) + min;
						minute = date.getMinutes();
						console.log(hour);
						console.log(minute);
						hour = hour > 9 ? hour : '0' + hour;
						minute = minute > 9 ? minute : '0' + minute;
					}
					else
					{
						hour = '09';
						minute = '00';
					}
					
				}
				return `${hour}:${minute}`;
			},
			chooseLocation(e) {
				let thisObj = this;
				uni.chooseLocation({
					success: function(res) {
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
						thisObj.repair_address_main = res.address+"("+res.name+")";
					}
				})
			},
			
			get_imgArrLength() {
				console.log(this.imgArr.length);
				if(this.imgArr.length >= 4) 
				{
					return false;
				}
				else 
				{
					return true;
				}
			},
			
			bindIndexChange(e) {
				if(e.detail.column == 0)
				{
					let index = e.detail.value;
					// console.log(index);
					this.problemType[1].splice(0,this.problemType[1].length);
					this.problemType[1] = this.problemType[1].concat(this.problemItems[index]);
					// console.log(this.problemType[1]);
					this.$forceUpdate();
				}
			},
			
			bindPickerChange(e) {
				this.typeIndex = e.target.value[0];
				this.typeItems = e.target.value[1];
				const indexValue = this.problemType[0][this.typeIndex];
				const itemsValue = this.problemType[1][this.typeItems];
				// console.log(value);
			},
			
			chooseImg () {
				uni.chooseImage({
					count: 4-this.imgArr.length,
					success:res=>{
						this.imgArr = this.imgArr.concat(res.tempFilePaths);
					}
				})
			},
			
			deleteImg(index){
				this.imgArr.splice(index,1);
			}
			,
			
			toVote() {
				this.showFloatWindow = !this.showFloatWindow;
			}
			,
			submit() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否报修？',
					success: function (res) {
						if(res.confirm){
							var fixPicture = "";
							console.log("abababababab",that.imgArr);
							var i = 0;
							var flag = that.imgArr.length;
							for(; i<that.imgArr.length; ++i)
							{
								console.log("1353",that.imgArr[i])
								uni.uploadFile({
									url: 'http://112.124.35.32:8081/xiangliban/api/imgUpload',
									filePath: that.imgArr[i],
									name: 'file',
									formData: {  // 其他的formdata参数
										
									},
									success: function(uploadFileRes) {
										console.log("upload",uploadFileRes)
										fixPicture += uploadFileRes.data + '#';
										console.log(fixPicture); 
										flag--;
										if( flag == 0)
										{
											console.log("last"); 
											console.log(that.data);
											var data = {
												fixDetails: that.fixDetails,
												fixExpectTime: that.date+" "+that.time,
												fixPicture: fixPicture,
												fixType: that.problemType[0][that.typeIndex]+" "+that.problemType[1][that.typeItems],
												fixUserAddress: that.repair_address_main,
												fixUserDoor: that.fixUserDoor,
												fixUserId: that.userId,
												fixUserName: that.fixUserName,
												fixUserPhone: that.fixUserPhone
											};
											console.log("test",data)
											addFixRequest(data).then((res) => {
												if(res.statusCode == "200")
												{
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
										}
									}
								})
							}
							uni.navigateBack();
						}
						else if(res.cancel){
							
						}
						
					},
					fail: function (res) {
						
					}
				});
			},
			goBack() {
				uni.navigateBack();
			}
		}
	}

</script>

<style>
	@import url("../../font_support/iconfont.css");
	/*  */
	button::after { border: none }
	
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
		background-color: rgba(110,110,110,0.6);
		
	}
	
	.float-window {
		position: relative;
		height: 200rpx;
		width: 300rpx;
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 26rpx;
		margin:0 auto;
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
		width: 100rpx;
		height: 56rpx;
		border-radius: 14rpx;
		font-size: 12px;
		background-color: #a4adb3;
		color: white;
	}
	
	
	/*  */
	.repair_after:after {
		content:'\e609';
		position: absolute;
		right: 0;
		margin-right: 30rpx;
		color: #A6A7A6;
	}
	
	.page {
		
		/* margin: 30rpx; */
		font-size: 32rpx !important;
		background-color: #f3f2f2;
		/* margin-top:0; */
	}
	
	.repair-border {
		background-color: white;
	}
	
	.repair-item {
		
		display: flex;
		padding: 20rpx 0rpx;
		margin: 0 30rpx;
		background-color: white;
		
	}
	
	.repair-text {
		flex: 2;
		font-size: 32rpx !important;
		line-height: 60rpx;
		padding-left: 90rpx;
		display: flex;
		align-items: center;
	}
	
	.repair-input {
		flex: 4;
	}
	
/* 	.repair-input .uni-input {

		border-radius: 12rpx;
		padding: 10rpx;
		font-size: 32rpx;
		color: #A6A7A6;
		line-height: 40rpx;

	} */
	
	
	.repair-input-image view {
		display: inline-block;
		margin-right: 30rpx;
		/* margin-bottom: 30rpx; */
	}
	
	.repair-image {
		height: 120rpx;
		width: 120rpx;
		border-radius: 30rpx !important;
	}
	
	.add-image {
		background-color: #c4c5c4;
		background-image: url(http://p1362.bvimg.com/10465/b00e7542e59400d2.png);
		background-repeat: no-repeat;
		background-size: 60rpx;
		background-position: center;
		/* border: 1px solid #A6A7A6; */
	}
	
	.r-button {
		display: block;
		background-color: rgba(78,207,104,1);
		color: white;
		margin: 0 30rpx;
		border-radius: 40rpx;
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
		box-shadow: 10rpx 10rpx 30rpx #A6A7A6;
		border: 0;
	}
	
	.r-button:active {
		background-color: rgba(78,207,104,0.8);
	}
	
	
	.r-name {
		/* content: '\ea10'; */
		background-image: url(http://p1362.bvimg.com/10465/af3203382499a6be.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
		
	}
	.r-phone {
		/* content: '\efe5'; */
		background-image: url(http://p1362.bvimg.com/10465/ab867bab013a07e6.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	.r-address {
		/* content: '\ec8b'; */
		background-image: url(http://p1362.bvimg.com/10465/6998bab980ed4b8a.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	.r-roomNum {
		/* content: '\e627'; */
		background-image: url(http://p1362.bvimg.com/10465/c9b337ad416bb8d2.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	.r-date {
		background-image: url(http://p1362.bvimg.com/10465/62571e539987b761.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	.r-time {
		background-image: url(http://p1362.bvimg.com/10465/d58222efee6f72d3.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	.r-type {
		/* content: '\e610'; */
		background-image: url(http://p1362.bvimg.com/10465/efdc50502a431203.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	.r-discribe {
		/* content: '\e613'; */
		background-image: url(http://p1362.bvimg.com/10465/a88d8388cc9b6b24.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	.r-photo {
		/* content: '\e616'; */
		background-image: url(http://p1362.bvimg.com/10465/90715e2cf30dc31a.png);
		background-repeat: no-repeat;
		background-size: 50rpx;
		background-position: 0 center;
	}
	
	.r1 {
		border-bottom: 0.24rpx solid #eae9e9;
		/* box-shadow: 10rpx 10rpx 20rpx #A6A7A6; */
	}	
	.r2 {
		
	}
	.r3 {
		margin-top: 30rpx;
		border-bottom: 0.24rpx solid #eae9e9;
		/* box-shadow: 10rpx 10rpx 20rpx #A6A7A6; */
	}
	.r4 {
		
	}
	.r4-2 {
		
	}
	.r5 {
		margin-top: 30rpx;
		border-bottom: 0.24rpx solid #eae9e9;
		/* box-shadow: 10rpx 10rpx 20rpx #A6A7A6; */
	}
	.r6 {
		
	}
	.r7 {
		
	}
	.r8 {
		margin-top: 30rpx;
		/* box-shadow: 10rpx 10rpx 20rpx #A6A7A6; */
	}
	.r9 {
		
	}
	
	.release-button {
		display: flex;
	}
	
	.release-button button {
		width: 100%;
		border-radius: 50rpx;
		margin:0 30rpx;
		font-size: 32rpx;
	}
	
	.release-button .r-button1 {
		background-color: #e3e3e3;
		color: white;
	}
	
	.release-button .r-button2 {
		background-color: rgba(6, 142, 238,1);
		color: white;
	}
	
	.release-button .r-button1:active {
		background-color: rgba(227,227,227,0.8);
	}
	
	.release-button .r-button2:active {
		background-color: rgba(6, 142, 238,0.8);
	}  
	
	.bottom-bar {
		/* position: fixed; */
		bottom: 0;
		right: 0;
		left: 0;
		padding: 20rpx 30rpx;
		box-shadow: 0rpx 10rpx 30rpx #dcdddc;
		z-index: 100;
		background-color: white;
	}
</style>