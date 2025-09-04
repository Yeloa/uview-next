<template>
	<view class="u-page">
		<card title="基础用法">
			<u-color-picker v-model="basicColor" :insert="true"></u-color-picker>
			<view class="color-info">
				<text>当前颜色: {{ basicColor }}</text>
			</view>
        </card>

		<card title="弹出层使用">
			<u-button type="primary" @click="showPicker = true">打开颜色选择器</u-button>
			<u-color-picker :show="showPicker" @confirm="handlerConfirm" @close="showPicker = false"></u-color-picker>
			<view class="color-info">
				<text>弹出层选择: {{ popupColor }}</text>
			</view>
        </card>
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
	.color-info {
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #f8f9fa;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.color-info {
		font-size: 24rpx;
		color: #666;
		font-family: monospace;
	}
</style>
