<template>
	<view class="u-barcode"  :style="[{
		width: uni.$u.addUnit(barcodeWidth),
		height: uni.$u.addUnit(barcodeHeight)
	},$u.addStyle(customStyle)]">
		<canvas
			class="u-barcode__canvas"
			:type="canvasType"
			:canvas-id="canvasId" 
			:id="canvasId"
		></canvas>
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
				canvasId: 'barcodeId_' + uni.$u.guid(),
				ctx: null,
				barcodeWidth: null,
				barcodeHeight: null,
				textHeight: 30
			}
		},
		computed: {
			is2d() {
				// #ifdef MP-WEIXIN
				return this.canvasType == '2d';
				// #endif
				// #ifndef MP-WEIXIN
				return false;
				// #endif
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
				
				await uni.$u.sleep(100);
				await this.initCanvas(binaryData);
			},
			
			// 初始化canvas
			async initCanvas(binaryData) {
				
				const query = uni
					.createSelectorQuery()
					.in(this)
					.select(`#${this.canvasId}`);

				if (this.is2d) {
					let canvas = await new Promise((resolve) => {
						query
							.fields({
								node: true,
								size: true,
							})
							.exec((res) => {
								resolve(res[0].node);
							});
					});
				
					canvas.width = this.barcodeWidth;
					canvas.height = this.barcodeHeight;
					this.ctx = canvas.getContext('2d', { willReadFrequently: true });
				} else {
					// #ifdef MP-ALIPAY
					this.ctx = uni.createCanvasContext(this.canvasId);
					// #endif
					// #ifndef MP-ALIPAY
					this.ctx = uni.createCanvasContext(this.canvasId, this);
					// #endif
				}

				// 清空画布并设置背景色
				if (this.is2d) {
					this.ctx.fillStyle = this.backgroundColor;
					this.ctx.fillRect(0, 0, this.barcodeWidth, this.barcodeHeight);
				} else {
					this.ctx.setFillStyle(this.backgroundColor);
					this.ctx.fillRect(0, 0, this.barcodeWidth, this.barcodeHeight);
				}
				
				this.drawBarcode(binaryData);
			},

			// 绘制条形码
			drawBarcode(binaryData) {
				
				const startX = 0;
				let startY = this.textPosition === 'top' ?	this.textHeight : 0;

				// 绘制条形码
				if (this.is2d) {
					this.ctx.fillStyle = this.color;
				} else {
					this.ctx.setFillStyle(this.color);
				}
				
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

				if (!this.is2d) {
					this.ctx.draw();
				}
				
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
				if (this.is2d) {
					this.ctx.font = fontString;
					this.ctx.fillStyle = textColor;
					this.ctx.textAlign = this.textAlign;
					this.ctx.textBaseline = 'middle';
				} else {
					this.ctx.setFontSize(this.fontSize);
					this.ctx.setFillStyle(textColor);
					this.ctx.setTextAlign(this.textAlign);
					this.ctx.setTextBaseline('middle');
				}

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
			}
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
		
		&__canvas {
			width: 100%;
			height: 100%;
		}
	}
</style>