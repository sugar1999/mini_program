<template>
	<view class="mybg">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">注意事项</block>
		</cu-custom>
		<u-notice-bar :text="text1" mode="closable"></u-notice-bar>
		<view>
			<button block @click="bottomVisible1 = true" class="mybutton">防骗</button>
		</view>
		<s-popup v-model="bottomVisible1" position="bottom" round
			background="rgb(2,0,36) linear-gradient(143deg, rgba(2,0,36,1) 0%, rgba(92,233,247,1) 0%, rgba(78,92,218,1) 100%)"
			height="500">
			<text class="mypop">
				1、了解天气，准备合适的衣服
					去旅行要看好要去的地方的天气，需要什么衣服，避免带的衣服不合适，也不要带太多衣服，还要注意地域风俗差异，避免人文冲突。
				2、准备证件
					外出旅行，一定要带好证件，不然乘坐火车、飞机、甚至住洒店等都会很麻烦。出行之前，一定要仔细检查几遍自己的证件。
				3、贵重物品要放好，少带现金
					自己贵重物品要放好，不要携带大额现金，尽量多用银行卡，如丢失应及时挂失。
				4、提前买好往返车票
					外出旅行一定要规划好路线，提前准备好往返路线的车票。
				5、保证手机电量充足
					外出手机是唯一可以联系家人的工具，一定要保证随时联系，避免特殊情况联系不到造成麻烦。
			</text>
		</s-popup>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				text1: '请各位游客注意各个景点的安全注意事项！保护自己的身心安全。',
				bottomVisible1: false,
			}
		}
	}
</script>

<style lang="scss">
	.mybg{
		background: rgb(2,0,36);
		background: linear-gradient(143deg, rgba(2,0,36,1) 0%, rgba(92,233,247,1) 0%, rgba(78,92,218,1) 100%);
		background-size:100% 100%;
		}
	.mybutton {
		background-color: transparent;
		color: #f1f0ed;
		font-size: 50rpx;
		font-weight: 550;
	}
	.mypop {
		color: black;
		background: rgb(2, 0, 36);
		background: linear-gradient(143deg, rgba(2, 0, 36, 1) 0%, rgba(92, 233, 247, 1) 0%, rgba(78, 92, 218, 1) 100%);
		user-select: "true";
		font-family: "微软雅黑";
		display: block;
		margin: 20rpx;
		font-size: 45rpx;
		width: 95%;
		height: 95%;
		overflow-y: scroll;
	}
</style>
