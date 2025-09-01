<template>
	<view class="u-barcode" :style="[{
		width: $u.addUnit(barcodeWidth),
		height: $u.addUnit(barcodeHeight)
	},$u.addStyle(customStyle)]">
		<u-canvas 
		ref="canvasRef" 
		:width="barcodeWidth" 
		:height="barcodeHeight" 
		:customStyle="mode === 'image' ? {
			position: 'absolute',
			left: '-9999px',
			top: '-9999px',
		} : {}"></u-canvas>
		<view class="u-barcode__image-wrapper" v-if="mode === 'image'">
            <image :src="imageUrl" class="u-barcode__image" mode="widthFix"/>
        </view>
	</view>
</template>

<script>
	import props from './props.js';
	import JsBarcode from './JsBarcode/JsBarcode.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';

	/**
	 * Barcode 条形码组件
	 * @description 支持生成条形码和二维码的组件，基于JsBarcode.js库
	 * @tutorial https://uviewui.com/components/barcode.html
	 * 
	 * @property {String}			value			条形码内容
	 * @property {String}			type			条形码类型，支持code128、code39、ean13、qr等
	 * @property {String|Number}	width			条形码宽度
	 * @property {String|Number}	height			条形码高度
	 * @property {String}			color			条形码颜色
	 * @property {String}			backgroundColor	背景颜色
	 * @property {Boolean}			displayValue		是否显示文本
	 * @property {String}			textPosition		文本位置，top/bottom
	 * @property {Object|String}	customStyle		自定义样式
	 * @property {String}			fontOptions		字体选项
	 * @property {String}			font			字体
	 * @property {String}			textAlign		文本对齐方式，left/center/right
	 * @property {Number}			textMargin		文本边距
	 * @property {Number}			fontSize			字体大小
	 * @example <u-barcode value="123456789" type="code128"></u-barcode>
	 */

	export default {
		name: "u-barcode",
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				ctx: null,
				barcodeWidth: null,
				barcodeHeight: null,
				textHeight: 30,
				imageUrl: '',
			}
		},
		watch: {
			value: {
				handler(newVal) {
					if (newVal) {
						this.generateBarcode()
					}
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.generateBarcode()
			})
		},
		methods: {

			// 生成条形码
			async generateBarcode() {
				
				const data = {};
				JsBarcode(data, this.value, {
					format: this.format,
					width: this.width,
					height: this.height,
					displayValue: false,
				});
				
				// 获取编码数据
				const encodings = data.encodings[0];
				if (!encodings) {
					return;
				}

				const { data: binaryData } = encodings;
				
				this.barcodeWidth = binaryData.length * this.width;
				this.barcodeHeight = this.height + (this.displayValue ? this.textHeight : 0);
				
				await this.initCanvas(binaryData);
			},
			
			// 初始化canvas
			async initCanvas(binaryData) {
				const { canvas } = await this.$refs.canvasRef.getCanvasContext();
				this.ctx = canvas;
			
				this.ctx.clearRect(0, 0, this.barcodeWidth, this.barcodeHeight);
				this.ctx.fillStyle = this.backgroundColor;
				this.ctx.fillRect(0, 0, this.barcodeWidth, this.barcodeHeight);
				this.drawBarcode(binaryData);
			},

			// 绘制条形码
			drawBarcode(binaryData) {
				
				const startX = 0;
				let startY = this.textPosition === 'top' ?	this.textHeight : 0;

				// 绘制条形码
				this.ctx.fillStyle = this.color;
				
				let drawnBars = 0;
				for (let i = 0; i < binaryData.length; i++) {
					if (binaryData[i] === '1') {
						const x = startX + i * this.width;
						this.ctx.fillRect(x, startY, this.width, this.height);
						drawnBars++;
					}
				}
				
				// 绘制文本
				if (this.displayValue) {
					this.drawText();
				}
			
				this.ctx.draw(true, ()=>{
					if(this.mode === 'image') {
						this.getTempFile((tempFilePath)=>{
							this.imageUrl = tempFilePath;
						})
					}
				});
			},

			// 绘制文本
			drawText() {
				const text = this.value;
				const textColor = this.color;
				
				// 构建字体字符串
				let fontString = `${this.fontSize}px ${this.font}`;
				if (this.fontOptions) {
					fontString = `${this.fontOptions} ${fontString}`;
				}
				
				// 设置文本样式
				this.ctx.font = fontString;
				this.ctx.fillStyle = textColor;
				this.ctx.textAlign = this.textAlign;
				this.ctx.textBaseline = 'middle';
				
				// 计算文本位置
				let textX;
				if (this.textAlign === 'left') {
					textX = this.textMargin;
				} else if (this.textAlign === 'right') {
					textX = this.barcodeWidth - this.textMargin;
				} else {
					// center
					textX = this.barcodeWidth / 2;
				}
				
				let textY;
				if (this.textPosition === 'top') {
					// 文本在上方
					textY = this.fontSize / 2 + this.textMargin;
				} else {
					// 文本在下方
					textY = this.barcodeHeight - this.fontSize / 2 - this.textMargin;
				}

				// 绘制文本
				this.ctx.fillText(text, textX, textY);
			},
			getTempFile(callback) {
				this.$refs.canvasRef.canvasToTempFilePath({
					width: this.barcodeWidth,
					height: this.barcodeHeight,
					fileType: 'png',
					quality: 1,
				}).then((tempFilePath) => {
					callback(tempFilePath);
				}).catch((error) => {
					this.$emit('error', error);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
	.u-barcode {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		&__image {
			width: 100%;
			height: 100%;
			&-wrapper{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>