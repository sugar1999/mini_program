<script>
	// import fuiButton from "@/components/firstui/fui-button/fui-button"
	import Vue from 'vue'
		export default {
			onLaunch: function() {
				uni.getSystemInfo({
					success: function(e) {
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight + 4;
						// #endif		
					}
				})
			},
			onShow: function() {
				console.log('App Show')
			},
			onHide: function() {
				console.log('App Hide')
			}
		}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/theme.scss";
	@import "uview-ui/index.scss";
	@import './common/common.scss';
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
	@import './common/fui-app.css';
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss';
	@import "styles/index.scss";
	/* #ifndef APP-NVUE */
	// @import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
