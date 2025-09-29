<template>
	<view >
		<u-navbar
			title="遮罩层"
			@leftClick="navigateBack"
			safeAreaInsetTop
			fixed
			placeholder
		></u-navbar>
		<u-cell
			:titleStyle="{fontWeight: 500}"
			@click="openMask(index)"
			:title="item.title"
			v-for="(item, index) in list"
			:key="index"
			isLink
		>
			<template #icon>
				<image
					class="u-cell-icon"
					:src="item.iconUrl"
					mode="widthFix"
				></image>
			</template>
		</u-cell>
		<u-overlay
			:show="show"
			@click="show = !show"
		></u-overlay>

		<u-overlay
			:show="showSlot"
			@click="showSlot = !showSlot"
		>
			<view class="overlay-wrap">
				<view class="overlay-wrap__box"></view>
			</view>
		</u-overlay>
		<u-overlay
			opacity=".85"
			:show="showOpcatiy"
			@click="showOpcatiy = !showOpcatiy"
		>
		</u-overlay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				showSlot: false,
				showOpcatiy: false,
				list: [{
						title: '基本案列',
						iconUrl: 'http://uview.d3u.cn/web/static/uview/overlay/baseCases.png'
					},
					{
						title: '嵌入内容',
						iconUrl: 'http://uview.d3u.cn/web/static/uview/overlay/embeddedContent.png'
					},
					{
						title: '设置透明度',
						iconUrl: 'http://uview.d3u.cn/web/static/uview/overlay/setTransparency.png'
					},
				]
			}
		},
		methods: {
			openMask(indexNum) {
				if (indexNum == 0) {
					this.show = !this.show;
				} else if (indexNum == 1) {
					this.showSlot = !this.showSlot
				} else if (indexNum == 2) {
					this.showOpcatiy = !this.showOpcatiy
				}
			},
			navigateBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.u-page {
		padding: 0;
	}

	.overlay-wrap {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex: 1;

		&__box {
			width: 200rpx;
			height: 200rpx;
			background-color: #70e1f5;
		}
	}
</style>
