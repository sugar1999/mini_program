<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">热门景点</block>
		</cu-custom>
		<view class="warp">
			<u-notice-bar :text="text1" mode="closable"></u-notice-bar>
		</view>

		<u-collapse @change="change" @close="close" @open="open">
			<u-collapse-item title="旅游指南" name="Docs guide">
				<text
					class="u-collapse-content">风景指的是供观赏的自然风光、景物，包括自然景观和人文景观。风景是由光对物的反映所显露出来的一种景象。犹言风光或景物、景色等，含义广泛。在中国古书上，尤其纯文艺作品的诗文方面，更是延用已久，甚至写景多于言情，几乎和旅游打成一片。</text>
			</u-collapse-item>
		</u-collapse>
		
		<view class="u-page content" v-for="(item, index) in urls" :key="index">
			<view class="u-demo-block">
				<!-- <text class="u-demo-block__title">多图模式</text> -->
				<view class="u-demo-block__content">
					<view class="album">
						<view class="album__avatar">
							<image :src="item.avatar" mode="" style="width: 32px;height: 32px;">
							</image>
						</view>
						<view class="album__content">
							<u--text text="uView UI" type="primary" bold size="17"></u--text>
							<u--text margin="0 0 8px 0" :text="item.content"></u--text>
							<u-album :urls="item.urls"></u-album>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				text1: '乡村旅游拥有各种各样的旅游项目，请享受你的休闲时光',
				albumWidth: 0,
				urls: []
			}
		},
		async onLoad() {
			let result = await request('/getPageHotData')
			this.urls = result.data.hot
		},
		methods: {
			open(e) {},
			close(e) {},
			change(e) {}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
	.content {
		margin: auto;
		margin-top: 30rpx;
		width: 90%;
	}
</style>
