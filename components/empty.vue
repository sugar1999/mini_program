<template>
	<view class='null text-center u-p-b-50' :style="{marginTop:top+'rpx'}">
		<image src="http://p1362.bvimg.com/10465/c797c294e350a5ca.png" :style="{width:width+'rpx',height:height+'rpx'}" mode=""></image>
		<view class="u-font-30 text-center u-m-t-30">{{text}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			top:{
				type:String,
				default: '370'
			},
			text:{
				type:String,
				default:'暂无数据'
			},
			width:{
				type:String,
				default:'412'
			},
			height:{
				type:String,
				default:'399'
			}
		},
		data() {
			return {
			
			}
		},
		onLoad() {

		},

		methods: {

		},

	}
</script>

<style scoped lang='scss'>
</style>
