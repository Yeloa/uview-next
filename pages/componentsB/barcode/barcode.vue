<template>
	<view class="u-page">
		<card title="基础用法">
			<u-barcode 
				value="123456789" 
				format="CODE128"
				text="123456789"
			></u-barcode>
		</card>

		<card title="不同条形码类型">
			<view class="barcode-item">
				<text class="barcode-label">CODE128</text>
				<u-barcode 
					value="123456789" 
					format="CODE128"
				></u-barcode>
			</view>
			
			<view class="barcode-item">
				<text class="barcode-label">CODE39</text>
				<u-barcode 
					value="123456789" 
					format="CODE39"
				></u-barcode>
			</view>
		</card>

		<card title="自定义样式">
			<view class="barcode-item">
				<text class="barcode-label">红色条形码</text>
				<u-barcode 
					value="123456789" 
					format="CODE128"
					color="#ff0000"
				></u-barcode>
			</view>
			
			<view class="barcode-item">
				<text class="barcode-label">蓝色背景</text>
				<u-barcode 
					value="123456789" 
					format="CODE128"
					backgroundColor="#e3f2fd"
				></u-barcode>
			</view>
			
			<view class="barcode-item">
				<text class="barcode-label">不显示文本</text>
				<u-barcode 
					value="123456789" 
					format="CODE128"
					:displayValue="false"
				></u-barcode>
			</view>
			
			<view class="barcode-item">
				<text class="barcode-label">文本在上方</text>
				<u-barcode 
					value="123456789" 
					format="CODE128"
					textPosition="top"
				></u-barcode>
			</view>
		</card>

		<card title="动态生成">
			<view class="dynamic-controls">
				<input 
					v-model="dynamicValue" 
					placeholder="输入条形码内容"
					class="input-field"
				/>
			</view>
			<u-barcode 
				:value="dynamicValue" 
				:height="100"
				@error="onError"
			></u-barcode>
		</card>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				dynamicValue: '123456789',
				typeIndex: 0,
			}
		},
		methods: {
			onTypeChange(e) {
				this.typeIndex = e.detail.value;
			},
			onError(error) {
				uni.showToast({
					title: '条形码生成失败',
					icon: 'none'
				});
				console.error('条形码错误:', error);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		background-color: #f5f5f5;
	}

	.barcode-item {
		text-align: center;
		padding: 10px;
	}

	.barcode-label {
		font-size: 12px;
		color: #666;
		margin-bottom: 8px;
	}

	.dynamic-controls {
		display: flex;
		gap: 10px;
		margin-bottom: 15px;
	}

	.input-field {
		flex: 1;
		padding: 8px 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
	}
</style> 