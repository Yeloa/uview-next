<template>
	<view class="" style="height: 100vh;">
		<u-signature
			landscape
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
					rotate: 60,
					spacing: 100,
					single: false
				}
			}
		},
		methods: {
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
