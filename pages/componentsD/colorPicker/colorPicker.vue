<template>
	<view class="u-page">
		<view class="u-page__content">
			<view class="demo-title">基础用法</view>
			<view class="demo-block">
				<u-color-picker v-model="basicColor" :insert="true"></u-color-picker>
				<view class="color-info">
					<text>当前颜色: {{ basicColor }}</text>
				</view>
			</view>

			<view class="demo-title">弹出层使用</view>
			<view class="demo-block">
				<u-button type="primary" @click="showPicker = true">打开颜色选择器</u-button>
				<u-color-picker :show="showPicker" @confirm="handlerConfirm" @close="showPicker = false"></u-color-picker>
				<view class="color-info">
					<text>弹出层选择: {{ popupColor }}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 基础用法
				basicColor: '',
				// 弹出层
				showPicker: false,
				popupColor: '',
			}
		},
		methods: {
			handlerConfirm(value){
				this.popupColor = value
				this.showPicker = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		background-color: #f5f5f5;
		min-height: 100vh;
		
		&__content {
			padding: 20rpx;
		}
	}

	.demo-title {
		font-size: 26rpx;
		margin-bottom: 20rpx;
		color: #666;
		font-weight: bold;
	}

	.demo-block {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.color-info {
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #f8f9fa;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.color-info text {
		font-size: 24rpx;
		color: #666;
		font-family: monospace;
	}
</style>
