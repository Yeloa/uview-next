<template>
	<view class="uqrcode"
		:style="{ width: $u.addUnit(templateOptions.width), height: $u.addUnit(templateOptions.height) }">
		<view class="uqrcode-canvas-wrapper">
			<!-- 画布 -->
			<!-- #ifndef APP-NVUE -->
			<canvas class="uqrcode-canvas" :id="canvasId" :canvas-id="canvasId" :type="canvasType" :style="{
				width: $u.addUnit(templateOptions.canvasWidth),
				height: $u.addUnit(templateOptions.canvasHeight),
				transform: templateOptions.canvasTransform
			}" v-if="templateOptions.canvasDisplay" @click="onClick"></canvas>
			<!-- #endif -->

			<!-- nvue用gcanvas -->
			<!-- #ifdef APP-NVUE -->
			<gcanvas class="uqrcode-canvas" ref="gcanvas" :style="{
				width: $u.addUnit(templateOptions.canvasWidth),
				height: $u.addUnit(templateOptions.canvasHeight)
			}" v-if="templateOptions.canvasDisplay" @click="onClick"></gcanvas>
			<!-- #endif -->
		</view>

		<!-- 加载效果 -->
		<view class="uqrcode-makeing" v-if="loading === undefined ? makeing : loading">
			<slot name="loading">
				<u-loading-icon></u-loading-icon>
			</slot>
		</view>

		<!-- 错误处理 -->
		<view class="uqrcode-error" v-if="isError" @click="onClick">
			<slot name="error" :error="error">
				<text class="uqrcode-error-message">{{ error.errMsg }}</text>
			</slot>
		</view>

		<!-- H5保存提示 -->
		<!-- #ifdef H5 -->
		<view class="uqrcode-h5-save" v-if="isH5Save">
			<slot name="h5save" :tempFilePath="tempFilePath">
				<image class="uqrcode-h5-save-image" :src="tempFilePath"></image>
				<text class="uqrcode-h5-save-text">{{ h5SaveIsDownload ? '若保存失败，' : '' }}请长按二维码进行保存</text>
			</slot>
			<view class="uqrcode-h5-save-close" @click.stop="isH5Save = false">
				<view class="uqrcode-h5-save-close-before"></view>
				<view class="uqrcode-h5-save-close-after"></view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
// #ifdef VUE3
import { toRaw } from 'vue';
// #endif

/* 引入nvue所需模块 */
// #ifdef APP-NVUE
import { enable, WeexBridge } from '../../libs/gcanvas/index.js';
const modal = weex.requireModule('modal');
// #endif

import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';
import UQRCode from './qrcode.js';
import { queueDraw, queueLoadImage} from './queue.js';
import { cacheImageList } from './cache.js';

let instance = null;

/**
 * qrcode 二维码
 * @description 二维码生成插件，可扩展性高，它支持自定义渲染二维码，可通过uQRCode API得到二维码绘制关键信息后，使用canvas、svg或js操作dom的方式绘制二维码图案。还可自定义二维码样式，如随机颜色、圆点、方块、块与块之间的间距等。
 * @tutorial https://uveiw.bdxmz.cn/components/qrcode.html（https://uqrcode.cn/doc）
 * 
 * @property {String}	 value	二维码内容 (start为true时必填 )
 * @property {Object}	 options  二维码配置选项 (data|size|errorCorrectLevel...)
 * @property {String}	 fileType  导出的文件类型  (jpg | png)  
 * @property {String | Number}	 size   二维码尺寸
 * @property {String}	 start  是否初始化组件后就开始生成 (默认 true)
 * @property {String}	 auto  是否数据发生改变自动重绘 (默认 false)
 * @property {String}	 hide  隐藏组件。如果只需要导出二维码作为图片使用，可设置为true，不能在组件或组件父级元素设置v-if="false"、v-show="false"、style="display:none;"等实现隐藏效果，这样会导致导出二维码空白  (默认 false)
 * @property {String}	 queue  队列绘制 (默认 false)
 * @property {String}	 isQueueLoadImage  是否队列加载图片，选择true将通过队列缓存所需要加载的图片。优点是加载重复资源可减少资源请求次数，节省网络资源，缺点是会转化为同步请求，资源不重复且多的情况下，等待时间会更久。总之，请求重复资源较多则选择true，请求不重复资源较多则选择false (默认 false)
 * @property {String}	 loading  loading态 (默认 false)
 * @property {String}	 h5SaveIsDownload  H5保存即自动下载（在支持的环境下），默认false为仅弹层提示用户需要长按图片保存，不会自动下载 (默认 false)
 * @property {String}	 h5DownloadName  H5下载名称 
 * @property {String}	 h5SaveTip  H5保存二维码时候是否显示提示
 * @example <u-qrcode ref="qrcode" size="200px" value="https://uveiw.bdxmz.cn"></u-qrcode>
 */
export default {
	name: 'u-qrcode',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			canvas: undefined,
			canvasId:uni.$u.guid(),
			// #ifdef MP-WEIXIN
			canvasType:'2d',
			// #endif
			// #ifndef MP-WEIXIN
			canvasType: 'normal',
			// #endif
			canvasContext: undefined,
			makeDelegate: undefined,
			drawDelegate: undefined,
			toTempFilePathDelegate: undefined,
			makeExecuted: false,
			makeing: false,
			drawing: false,
			isError: false,
			error: undefined,
			isH5Save: false,
			tempFilePath: '',
			templateOptions: {
				size: 0,
				width: 0, // 组件宽度
				height: 0,
				canvasWidth: 0, // canvas宽度
				canvasHeight: 0,
				canvasTransform: '',
				canvasDisplay: false
			},
			uqrcodeOptions: {
				data: ''
			}
		};
	},
	watch: {
		value: {
			handler() {
				if (this.auto) {
					this.remake();
				}
			}
		},
		size: {
			handler() {
				if (this.auto) {
					this.remake();
				}
			}
		},
		options: {
			handler() {
				if (this.auto) {
					this.remake();
				}
			},
			deep: true
		}
	},
	mounted() {
		this.templateOptions.size = this.size;
		this.templateOptions.width = this.templateOptions.size;
		this.templateOptions.height = this.templateOptions.size;
		this.templateOptions.canvasWidth = this.templateOptions.size;
		this.templateOptions.canvasHeight = this.templateOptions.size;
		if (this.canvasType == '2d') {
			// #ifndef MP-WEIXIN
			this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size /
				this.templateOptions.canvasHeight})`;
			// #endif
		} else {
			this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size /
				this.templateOptions.canvasHeight})`;
		}
		if (this.start) {
			this.make();
		}
	},
	// #ifdef VUE3
	emits: ["click", "complete", "change"],
		// #endif
	methods: {
		/**
		 * 获取模板选项
		 */
		getTemplateOptions() {
			var size = this.size;
			return deepReplace(this.templateOptions, {
				size,
				width: size,
				height: size
			});
		},
		/**
		 * 获取插件选项
		 */
		getUqrcodeOptions() {
			return deepReplace(this.options, {
				data: String(this.value),
				margin: this.margin,
				errorCorrectLevel: this.errorCorrectLevel,
				areaColor: this.areaColor,
				backgroundColor: this.backgroundColor,
				foregroundColor: this.foregroundColor,
				size: Number(this.templateOptions.size)
			});
		},
		/**
		 * 重置画布
		 */
		resetCanvas(callback) {
			this.templateOptions.canvasDisplay = false;
			this.$nextTick(() => {
				this.templateOptions.canvasDisplay = true;
				this.$nextTick(() => {
					callback && callback();
				});
			});
		},
		/**
		 * 绘制二维码
		 */
		async draw(callback = {}, isDrawDelegate = false) {
			if (typeof callback.success != 'function') {
				callback.success = () => { };
			}
			if (typeof callback.fail != 'function') {
				callback.fail = () => { };
			}
			if (typeof callback.complete != 'function') {
				callback.complete = () => { };
			}

			if (this.drawing) {
				if (!isDrawDelegate) {
					this.drawDelegate = () => {
						this.draw(callback, true);
					};
					return;
				}
			} else {
				this.drawing = true;
			}

			
			if (!this.value) {
				console.error('[QRCode]: value must be set!');
				return;
			}

			/* 组件数据 */
			this.templateOptions = this.getTemplateOptions();
			/* uQRCode选项 */
			this.uqrcodeOptions = this.getUqrcodeOptions();
			/* 纠错等级兼容字母写法 */
			if (typeof this.uqrcodeOptions.errorCorrectLevel === 'string') {
				this.uqrcodeOptions.errorCorrectLevel = UQRCode.errorCorrectLevel[this.uqrcodeOptions.errorCorrectLevel];
			}
			/* nvue不支持动态修改gcanvas尺寸，除nvue外，默认使用useDynamicSize */
			// #ifndef APP-NVUE
			if (typeof this.options.useDynamicSize === 'undefined') {
				this.uqrcodeOptions.useDynamicSize = true;
			}
			// #endif
			// #ifdef APP-NVUE
			if (typeof this.options.useDynamicSize === 'undefined') {
				this.uqrcodeOptions.useDynamicSize = false;
			}

			// if (typeof this.options.drawReserve === 'undefined') {
			//   this.uqrcodeOptions.drawReserve = true;
			// }
			// #endif

			if (this.options.foregroundImageBackgroundColor == '' || this.options.foregroundImageBackgroundColor == 'none') {
				this.uqrcodeOptions.foregroundImageBackgroundColor = 'rgba(255,255,255,0)';
			}

			/* 获取uQRCode实例 */
			const qr = instance = new UQRCode();
			
			/* 设置uQRCode选项 */
			qr.setOptions(this.uqrcodeOptions);
			/* 调用制作二维码方法 */
			qr.make();

			/* 获取canvas上下文 */
			let canvasContext = null;
			// #ifndef APP-NVUE
			if (this.canvasType === '2d') {
				// #ifdef MP-WEIXIN
				/* 微信小程序获取canvas2d上下文方式 */
				const canvas = (this.canvas = await new Promise(resolve => {
					uni
						.createSelectorQuery()
						.in(this) // 在组件内使用需要
						.select(`#${this.canvasId}`)
						.fields({
							node: true,
							size: true
						})
						.exec(res => {
							resolve(res[0].node);
						});
				}));
				canvasContext = this.canvasContext = canvas.getContext('2d');
				/* 2d的组件设置宽高与实际canvas绘制宽高不是一个，打个比方，组件size=200，canvas.width设置为100，那么绘制出来就是100=200，组件size=400，canvas.width设置为800，绘制大小还是800=400，所以无需理会下方返回的dynamicSize是多少，按dpr重新赋值给canvas即可 */
				this.templateOptions.canvasWidth = qr.size;
				this.templateOptions.canvasHeight = qr.size;
				this.templateOptions.canvasTransform = '';
				/* 使用dynamicSize+scale，可以解决小块间出现白线问题，dpr可以解决模糊问题 */
				const dpr = uni.$u.window().pixelRatio;
				canvas.width = qr.dynamicSize * dpr;
				canvas.height = qr.dynamicSize * dpr;
				canvasContext.scale(dpr, dpr);
				/* 微信小程序获取图像方式 */
				qr.loadImage = this.getLoadImage(function (src) {
					/* 小程序下获取网络图片信息需先配置download域名白名单才能生效 */
					return new Promise((resolve, reject) => {
						const img = canvas.createImage();
						img.src = src;
						img.onload = () => {
							resolve(img);
						};
						img.onerror = err => {
							reject(err);
						};
					});
				});
				// #endif
				// #ifndef MP-WEIXIN
				/* 非微信小程序不支持2d，切换回uniapp获取canvas上下文方式 */
				canvasContext = this.canvasContext = uni.createCanvasContext(this.canvasId, this);
				/* 使用dynamicSize，可以解决小块间出现白线问题，再通过scale缩放至size，使其达到所设尺寸 */
				this.templateOptions.canvasWidth = qr.dynamicSize;
				this.templateOptions.canvasHeight = qr.dynamicSize;
				this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size /
					this.templateOptions.canvasHeight})`;
				/* uniapp获取图像方式 */
				qr.loadImage = this.getLoadImage(function (src) {
					return new Promise((resolve, reject) => {
						if (src.startsWith('http')) {
							uni.getImageInfo({
								src,
								success: res => {
									resolve(res.path);
								},
								fail: err => {
									reject(err);
								}
							});
						} else {
							if (src.startsWith('.')) {
								console.error('[uQRCode]: 本地图片路径仅支持绝对路径！');
								throw new Error('[uQRCode]: local image path only supports absolute path!');
							} else {
								resolve(src);
							}
						}
					});
				});
				// #endif
			} else {
				/* uniapp获取canvas上下文方式 */
				canvasContext = this.canvasContext = uni.createCanvasContext(this.canvasId, this);
				/* 使用dynamicSize，可以解决小块间出现白线问题，再通过scale缩放至size，使其达到所设尺寸 */
				this.templateOptions.canvasWidth = qr.dynamicSize;
				this.templateOptions.canvasHeight = qr.dynamicSize;
				this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size /
					this.templateOptions.canvasHeight})`;
				/* uniapp获取图像方式 */
				qr.loadImage = this.getLoadImage(function (src) {
					return new Promise((resolve, reject) => {
						/* getImageInfo在微信小程序的bug：本地路径返回路径会把开头的/或../移除，导致路径错误，解决方法：限制只能使用绝对路径 */
						if (src.startsWith('http')) {
							uni.getImageInfo({
								src,
								success: res => {
									resolve(res.path);
								},
								fail: err => {
									reject(err);
								}
							});
						} else {
							if (src.startsWith('.')) {
								console.error('[uQRCode]: 本地图片路径仅支持绝对路径！');
								throw new Error('[uQRCode]: local image path only supports absolute path!');
							} else {
								resolve(src);
							}
						}
					});
				});
			}
			// #endif
			// #ifdef APP-NVUE
			/* NVue获取canvas上下文方式 */
			const gcanvas = this.$refs['gcanvas'];
			const canvas = enable(gcanvas, {
				bridge: WeexBridge
			});
			canvasContext = this.canvasContext = canvas.getContext('2d');
			/* NVue获取图像方式 */
			qr.loadImage = this.getLoadImage(function (src) {
				return new Promise((resolve, reject) => {
					/* getImageInfo在nvue的bug：获取同一个路径的图片信息，同一时间第一次获取成功，后续失败，猜测是写入本地时产生文件写入冲突，所以没有返回，特别是对于网络资源 --- 已实现队列绘制，已解决此问题 */
					if (src.startsWith('.')) {
						console.error('[uQRCode]: 本地图片路径仅支持绝对路径！');
						throw new Error('[uQRCode]: local image path only supports absolute path!');
					} else {
						uni.getImageInfo({
							src,
							success: res => {
								resolve(res.path);
							},
							fail: err => {
								reject(err);
							}
						});
					}
				});
			});
			// #endif

			/* 设置uQRCode实例的canvas上下文 */
			qr.canvasContext = canvasContext;
			/* 延时等待页面重新绘制完毕 */
			setTimeout(() => {
				/* 从插件获取具体要调用哪一个扩展函数 */
				var drawCanvasName = 'drawCanvas';

				/* 虽然qr[drawCanvasName]是直接返回Promise的，但由于js内部this指向问题，故不能直接exec(qr[drawCanvasName])此方式执行，需要改成exec(() => qr[drawCanvasName]())才能正确获取this */
				var drawCanvas;
				if (this.queue) {
					drawCanvas = () => queueDraw.exec(() => qr[drawCanvasName]());
					// drawCanvas = () => queueDraw.exec(() => new Promise((resolve, reject) => {
					//   setTimeout(() => {
					//     qr[drawCanvasName]().then(resolve).catch(reject);
					//   }, 1000);
					// }));
				} else {
					drawCanvas = () => qr[drawCanvasName]();
				}
				/* 调用绘制方法将二维码图案绘制到canvas上 */
				drawCanvas()
					.then(() => {
						if (this.drawDelegate) {
							/* 高频重绘纠正 */
							let delegate = this.drawDelegate;
							this.drawDelegate = undefined;
							delegate();
						} else {
							this.drawing = false;
							callback.success();
						}
					})
					.catch(err => {
						console.log(err);
						if (this.drawDelegate) {
							/* 高频重绘纠正 */
							let delegate = this.drawDelegate;
							this.drawDelegate = undefined;
							delegate();
						} else {
							this.drawing = false;
							this.isError = true;
							callback.fail(err);
						}
					})
					.finally(() => {
						callback.complete();
					});
			}, 300);
		},
		/**
		 * 生成二维码
		 */
		make(callback = {}) {
			this.makeExecuted = true;
			this.makeing = true;
			this.isError = false;

			if (typeof callback.success != 'function') {
				callback.success = () => { };
			}
			if (typeof callback.fail != 'function') {
				callback.fail = () => { };
			}
			if (typeof callback.complete != 'function') {
				callback.complete = () => { };
			}

			this.resetCanvas(() => {
				clearTimeout(this.makeDelegate);
				this.makeDelegate = setTimeout(() => {
					this.draw({
						success: () => {
							setTimeout(() => {
								callback.success();
								this.complete(true);
							}, 300);
						},
						fail: err => {
							callback.fail(err);
							this.error = err;
							this.complete(false, err.errMsg);
						},
						complete: () => {
							callback.complete();
							this.makeing = false;
						}
					});
				}, 300);
			});
		},
		/**
		 * 重新生成
		 */
		remake(callback) {
			this.$emit('change');
			this.make(callback);
		},
		/**
		 * 生成完成
		 */
		complete(success = true, errMsg = '') {
			if (success) {
				this.$emit('complete', {
					success
				});
			} else {
				this.$emit('complete', {
					success,
					errMsg
				});
			}
		},
		/**
		 * 导出临时路径
		 */
		toTempFilePath(callback = {}) {
			if (typeof callback.success != 'function') {
				callback.success = () => { };
			}
			if (typeof callback.fail != 'function') {
				callback.fail = () => { };
			}
			if (typeof callback.complete != 'function') {
				callback.complete = () => { };
			}

			if (!this.makeExecuted) {
				console.error('[uQRCode]: make() 方法从未调用！请先成功调用 make() 后再进行操作。');
				var err = {
					errMsg: '[uQRCode]: make() method has never been executed! please execute make() successfully before operating.'
				};
				callback.fail(err);
				callback.complete(err);
				return;
			}

			if (this.isError) {
				callback.fail(this.error);
				callback.complete(this.error);
				return;
			}

			if (this.makeing) {
				/* 如果还在生成状态，那当前操作将托管到委托，监听生成完成后再通过委托复调当前方法 */
				this.toTempFilePathDelegate = () => {
					this.toTempFilePath(callback);
				};
				return;
			} else {
				this.toTempFilePathDelegate = null;
			}

			// #ifndef APP-NVUE
			if (this.canvasType === '2d') {
				// #ifdef MP-WEIXIN
				try {
					let dataURL = null;
					// #ifdef VUE3
					dataURL = toRaw(this.canvas)
						.toDataURL();
					// #endif
					// #ifndef VUE3
					dataURL = this.canvas.toDataURL();
					// #endif
					callback.success({
						tempFilePath: dataURL
					});
					callback.complete({
						tempFilePath: dataURL
					});
				} catch (e) {
					callback.fail(e);
					callback.complete(e);
				}
				// #endif
			} else {
				uni.canvasToTempFilePath({
					canvasId: this.canvasId,
					fileType: this.fileType,
					width: Number(this.templateOptions.canvasWidth),
					height: Number(this.templateOptions.canvasHeight),
					destWidth: Number(this.templateOptions.size),
					destHeight: Number(this.templateOptions.size),
					success: res => {
						callback.success(res);
					},
					fail: err => {
						callback.fail(err);
					},
					complete: () => {
						callback.complete();
					}
				},
					this
				);
			}
			// #endif
			// #ifdef APP-NVUE
			const dpr = uni.$u.window().pixelRatio;
			this.canvasContext.toTempFilePath(
				0,
				0,
				this.templateOptions.canvasWidth * dpr,
				this.templateOptions.canvasHeight * dpr,
				this.templateOptions.size * dpr,
				this.templateOptions.size * dpr,
				'',
				1,
				res => {
					callback.success(res);
					callback.complete(res);
				}
			);
			// #endif
		},
		/**
		 * 保存
		 */
		save(callback = {}) {
			if (typeof callback.success != 'function') {
				callback.success = () => { };
			}
			if (typeof callback.fail != 'function') {
				callback.fail = () => { };
			}
			if (typeof callback.complete != 'function') {
				callback.complete = () => { };
			}

			this.toTempFilePath({
				success: res => {
					// #ifndef H5
					if (this.canvasType === '2d') {
						// #ifdef MP-WEIXIN
						/* 需要将 data:image/png;base64, 这段去除 writeFile 才能正常打开文件，否则是损坏文件，无法打开 */
						const reg = new RegExp('^data:image/png;base64,', 'g');
						const dataURL = res.tempFilePath.replace(reg, '');
						const fs = wx.getFileSystemManager();
						const tempFilePath = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}${Math.random()
								.toString()
								.split('.')[1]
							}.png`;
						fs.writeFile({
							filePath: tempFilePath, // 要写入的文件路径 (本地路径)
							data: dataURL, // base64图片
							encoding: 'base64',
							success: res1 => {
								uni.saveImageToPhotosAlbum({
									filePath: tempFilePath,
									success: res2 => {
										callback.success(res2);
									},
									fail: err2 => {
										callback.fail(err2);
									},
									complete: () => {
										callback.complete();
									}
								});
							},
							fail: err => {
								callback.fail(err);
							},
							complete: () => {
								callback.complete();
							}
						});
						// #endif
					} else {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: res1 => {
								callback.success(res1);
							},
							fail: err1 => {
								callback.fail(err1);
							},
							complete: () => {
								callback.complete();
							}
						});
					}
					// #endif

					// #ifdef H5
					/* 可以在电脑浏览器下载，移动端iOS不行，安卓微信浏览器不行，安卓外部浏览器可以 */
					this.isH5Save = true;
					this.tempFilePath = res.tempFilePath;
					if (this.h5SaveIsDownload) {
						const aEle = document.createElement('a');
						aEle.download = this.h5DownloadName; // 设置下载的文件名，默认是'下载'
						aEle.href = res.tempFilePath;
						document.body.appendChild(aEle);
						aEle.click();
						aEle.remove(); // 下载之后把创建的元素删除
					}
					callback.success({
						errMsg: 'ok'
					});
					callback.complete({
						errMsg: 'ok'
					});
					// #endif
				},
				fail: err => {
					callback.fail(err);
					callback.complete(err);
				}
			});
		},
		/**
		 * 注册click事件
		 */
		onClick(e) {
			this.$emit('click', e);
		},
		/**
		 * 获取实例
		 */
		getInstance() {
			return instance;
		},
	
		getLoadImage(loadImage) {
			var that = this;
			if (typeof loadImage == 'function') {
				return function (src) {
					/* 判断是否是队列加载图片的 */
					if (that.isQueueLoadImage) {
						/* 解决iOS APP||NVUE同时绘制多个二维码导致图片丢失需使用队列 */
						return queueLoadImage.exec(() => {
							return new Promise((resolve, reject) => {
								setTimeout(() => {
									const cache = cacheImageList.find(x => x.src == src);
									if (cache) {
										resolve(cache.img);
									} else {
										loadImage(src)
											.then(img => {
												cacheImageList.push({
													src,
													img
												});
												resolve(img);
											})
											.catch(err => {
												reject(err);
											});
									}
								}, 10);
							});
						});
					} else {
						return loadImage(src);
					}
				};
			} else {
				return function (src) {
					return Promise.resolve(src);
				};
			}
		}
	}
};

/**
 * 对象属性深度替换
 * @param {Object} o 原始对象/默认对象/被替换的对象
 * @param {Object} r 从这个对象里取值替换到o对象里
 * @return {Object} 替换后的新对象
 */
function deepReplace(o = {}, r = {}, c = false) {
	let obj;
	if (c) {
		// 从源替换
		obj = o;
	} else {
		// 不替换源，copy一份备份来替换
		obj = {
			...o
		};
	}
	for (let k in r) {
		var vr = r[k];
		if (vr != undefined) {
			if (vr.constructor == Object) {
				obj[k] = this.deepReplace(obj[k], vr);
			} else if (vr.constructor == String && !vr) {
				obj[k] = obj[k];
			} else {
				obj[k] = vr;
			}
		}
	}
	return obj;
}
</script>

<style scoped>
.uqrcode {
	position: relative;
}

.uqrcode-canvas {
	transform-origin: top left;
}

.uqrcode-makeing {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
}

.uqrcode-error {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
}

.uqrcode-error-message {
	font-size: 12px;
	color: #939291;
}

/* #ifdef H5 */
.uqrcode-h5-save {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.68);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.uqrcode-h5-save-image {
	width: 512rpx;
	height: 512rpx;
	padding: 32rpx;
}

.uqrcode-h5-save-text {
	margin-top: 20rpx;
	font-size: 32rpx;
	font-weight: 700;
	color: #ffffff;
}

.uqrcode-h5-save-close {
	position: relative;
	margin-top: 72rpx;
	width: 60rpx;
	height: 60rpx;
	border: 2rpx solid #ffffff;
	border-radius: 60rpx;
	padding: 10rpx;
}

.uqrcode-h5-save-close-before {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(45deg);
	width: 40rpx;
	height: 4rpx;
	background: #ffffff;
}

.uqrcode-h5-save-close-after {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(-45deg);
	width: 40rpx;
	height: 4rpx;
	background: #ffffff;
}

/* #endif */
</style>