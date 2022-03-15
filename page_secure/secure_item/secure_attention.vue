<template>
	<view class="mybg">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">注意事项</block>
		</cu-custom>
		<u-notice-bar :text="text1" mode="closable"></u-notice-bar>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				text1: '请各位游客注意各个景点的安全注意事项！保护自己的身心安全。'
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
</style>
