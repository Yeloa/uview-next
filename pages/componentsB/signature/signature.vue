<template>
	<view class="u-page">
		<card title="基础功能">
			<view class="u-demo-block__content">
				<view class="signature-container">
					<u-signature
						ref="signatureRef"
						:showWatermark="showWatermark"
						:watermark="watermark"
						:penSize="penSize"
						:openSmooth="openSmooth"
						:disableScroll="true"
						:backgroundColor="backgroundColor"
						@confirm="onConfirm"
					></u-signature>
				</view>
			</view>
		</card>
		
		<view class="button-container">
			<u-button size="small" type="primary" @click="clear">清空</u-button>
			<u-button size="small" type="primary" @click="undo">撤销</u-button>
			<u-button size="small" type="primary" @click="confirm">完成</u-button>
		</view>
		
		<view class="button-container">
			<u-button size="small" type="error" @click="goLandscape">横屏模式</u-button>
		</view>
		<card title="预览">
			<image :src="basicResult" class="result-image" mode="widthFix"></image>
		</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				penSize: 5,
				basicResult:'',
				watermarkResult:'',
				backgroundColor: '#fff',
				openSmooth: false,
				showWatermark: true,
				watermark: {
					showOnSave: true,
					text: '水印演示',
					color: 'rgba(0, 0, 0, 0.1)',
					fontSize: 15,
					fontFamily: 'Arial',
					rotate: -30,
					spacing: 100,
					single: false
				}
			}
		},
		methods: {
			goLandscape(){
				uni.navigateTo({
					url: '/pages/componentsB/signature/landscape'
				})
			},
			clear(){
				this.$refs.signatureRef.clear()
			},
			undo(){
				this.$refs.signatureRef.undo()
			},
			confirm(){	
				this.$refs.signatureRef.getImage().then(res => {
					this.basicResult = res
				})
			},
			onConfirm(res){
				this.basicResult = res
				this.showImageModal = true
			},
			// 水印相关方法
			onFontSizeChange(e) {
				this.watermark.fontSize = e.detail.value;
			},
			onRotateChange(e) {
				this.watermark.rotate = e.detail.value;
			},
			onSpacingChange(e) {
				this.watermark.spacing = e.detail.value;
			},
			onShowWatermarkChange(e) {
				this.showWatermark = e.detail.value;
			},
			onSingleWatermarkChange(e) {
				this.watermark.single = e.detail.value;
			},
			onWatermarkConfirm(res){
				this.watermarkResult = res
			}
		}
	}
</script>

<style lang="scss">
	.signature-container {
		width: 100%;
		height: 300px;
		border: 1px solid #d6d7d8;
		border-radius: 8px;
	}
	.preview-container {
		width: 100%;
		height: 300px;
		border: 1px solid #d6d7d8;
		border-radius: 8px;
	}

	.preview-title {
		font-size: 14px;
		text-align: center;
		padding: 10px;
	}
	.button-container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-bottom: 10px;
		gap: 10px;
	}
	
	// 水印控制样式
	.watermark-controls {
		background-color: #f8f9fa;
		border-radius: 8px;
		padding: 15px;
		margin-bottom: 15px;
	}
	
	.control-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 12px;
		padding: 8px 0;
		border-bottom: 1px solid #eee;
	}
	
	.control-item:last-child {
		border-bottom: none;
		margin-bottom: 0;
	}
	
	.control-label {
		width: 80px;
		font-size: 14px;
		color: #666;
		flex-shrink: 0;
	}
	
	.control-input {
		flex: 1;
		height: 32px;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 0 8px;
		font-size: 14px;
		background-color: #fff;
	}
	
	.control-slider {
		flex: 1;
		margin: 0 10px;
	}
	
	.control-value {
		width: 50px;
		text-align: right;
		font-size: 12px;
		color: #999;
	}
	
	.control-switch {
		margin-left: auto;
	}
</style>
