<template>
	<canvas 
		:id="canvasId" 
		:canvas-id="canvasId" 
		:type="type"
		:disable-scroll="disableScroll"
		:hidpi="hidpi"
		@touchstart="e => $emit('onTouchstart', e)"
		@touchmove="e => $emit('onTouchmove', e)"
		@touchend="e => $emit('onTouchend', e)"
		@touchcancel="e => $emit('onTouchcancel', e)"
		@longtap="e => $emit('onLongtap', e)"
		@error="e => $emit('onError', e)"
		:style="[{
			width: $u.addUnit(width),
			height: $u.addUnit(height)
		},$u.addStyle(customStyle)]" 
	/>
</template>

<script>

	import WxCanvas from './wx-canvas.js';
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	
	/**
	 * Canvas  画布
	 * @description 画布，支持2d和webgl，统一用法
	 * @tutorial https://uview.d3u.cn/components/canvas.html
	 * 
	 * @property {String}			width         画布宽度
	 * @property {String}			height        画布高度
	 * @property {String}			type          画布类型
	 * @example  <u-canvas :type="type" width="100" height="100"></u-canvas>
	 */
	let canvasNode = {};
	export default {
		name: 'u-canvas',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				canvasId: 'canvas' + uni.$u.guid(),
			}
		},
		methods: {
			queryCanvas() {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select(`#${this.canvasId}`).fields({
						node: true,
						size: true
					}).exec((res) => {
						if (res[0]) {
							resolve(res[0])
						} else {
							reject(res)
						}
					});
				})
			},
			getCanvasContext() {
				return new Promise((resolve) => {
					let ctx;
					const query = uni.createSelectorQuery().in(this).select(`#${this.canvasId}`);
					if(this.type == '2d') {
						const { pixelRatio } = uni.$u.window();

						query.fields({node: true,size: true,}).exec((res) => {
							let width = parseInt(res[0].width);
							let height = parseInt(res[0].height);
							let canvas = res[0].node;
							canvasNode[this.canvasId] = canvas;
							ctx = canvas.getContext('2d');
							const wxCanvas = new WxCanvas(this.type, ctx, this.canvasId, true, canvas);
							wxCanvas.width = width * pixelRatio;
							wxCanvas.height = height * pixelRatio;
							wxCanvas.scale(pixelRatio, pixelRatio);
							resolve({ canvas: wxCanvas, width, height, canvasId: this.canvasId, use2D: true });
						});
					} else {
						canvasNode[this.canvasId] = null;
						// #ifdef MP-ALIPAY
						ctx = uni.createCanvasContext(this.canvasId);
						// #endif
						// #ifndef MP-ALIPAY
						ctx = uni.createCanvasContext(this.canvasId, this);
						// #endif

						const wxCanvas = new WxCanvas(this.type, ctx, this.canvasId, true);

						query.boundingClientRect((data) => {
							let width = parseInt(data.width);
							let height = parseInt(data.height);
							resolve({ canvas: wxCanvas, width, height, canvasId: this.canvasId, use2D: false });
						}).exec();
					}
				});
			},
			canvasToTempFilePath(options) {
				return new Promise((resolve, reject) => {
					let params = {
						canvas: canvasNode[this.canvasId],
						canvasId: this.canvasId,
						...options,
						success: (res) => {
							resolve(res.tempFilePath);
						},
						fail: (error) => {
							reject(error);
						}
					}

					// #ifdef MP-ALIPAY
                    uni.canvasToTempFilePath(params);
                    // #endif
                    // #ifndef MP-ALIPAY
                    uni.canvasToTempFilePath(params, this);
                    // #endif
				});
			}
		},
		// #ifdef VUE2
		beforeDestroy() {	
			delete canvasNode[this.canvasId];
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {	
			delete canvasNode[this.canvasId];
		}
		// #endif
	}
</script>
