<script>
	// import fuiButton from "@/components/firstui/fui-button/fui-button"
	import Vue from 'vue'
		export default {
			onLaunch: function() {
				uni.getSystemInfo({
					success: function(e) {
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif
	
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight + 4;
						// #endif		
	
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
				console.log('App Launch')
				this.$store.commit('getCity', '')
				const res = wx.getSystemInfoSync()
				var statusbarH = res.statusBarHeight
				this.$store.commit('getHeight',statusbarH)
				// let tabList =[]
				// this.$http('/addons/ddrive/banner/market_setting').then(data=>{
				// 	if(data.dj_status==1){
				// 		tabList.push({
				// 			name: '代驾',
				// 			id:0
				// 		})
				// 	}
				// 	if(data.sf_status==1){
				// 		tabList.push({
				// 			name: '顺风车',
				// 			id:1
				// 		})
				// 	}
				// 	if(data.dc_status==1){
				// 		tabList.push({
				// 			name: '货运',
				// 			id:2
				// 		})
				// 	}
				// 	this.$store.commit('getTab',tabList)
				// })
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
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/theme.scss";
	@import "uview-ui/index.scss";
	@import './common/common.scss';
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
	@import './common/fui-app.css';
	// @import './components/firstui/fui-theme/fui-theme.css';
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
