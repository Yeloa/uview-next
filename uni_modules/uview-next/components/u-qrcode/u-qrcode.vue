<template>
	<view class="u-qrcode" :style="[{ 
		width: $u.addUnit(size), 
		height: $u.addUnit(size) 
	}]" @longpress="handleLongpress">
		<u-canvas
			ref="canvasRef" 
			:width="size" 
			:height="size" 
			:customStyle="mode === 'image' ? {
			position: 'absolute',
			left: '-9999px',
			top: '-9999px',
		} : {}"/>
		<view class="u-qrcode__image-wrapper" v-if="mode === 'image'">
            <image :src="imageUrl" class="u-qrcode__image" mode="widthFix"/>
        </view>
		<view class="u-qrcode__mask" v-if="status === 'loading'">
			<slot name="loading">
				<u-loading-icon mode="semicircle"></u-loading-icon>
			</slot>
		</view>
		<view class="u-qrcode__mask" v-if="status === 'expired'">
			<slot name="expired">
				<text class="u-qrcode__expired-message">{{ expiredText }}</text>
				<view class="u-qrcode__expired-btn" @click="handleRefresh">
					<u-icon name="reload" size="20" color="primary" :label="refreshText" labelColor="primary"></u-icon>
				</view>
			</slot>
		</view>
		<view class="u-qrcode__mask" v-if="status === 'scanned'">
			<slot name="scanned">
				<u-icon name="checkmark-circle-fill" size="20" color="primary" :label="scannedText" labelColor="primary"></u-icon>
			</slot>
		</view>
		
	</view>
</template>

<script>
import props from './props.js';
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin';
import QRCode from '../../libs/util/qrcode.js';

/**
 * qrcode 二维码
 * @description 二维码生成
 * @tutorial https://uview.d3u.cn/components/qrcode.html
 * @property {String}	 background 背景色
 * @property {String}	 foreground 前景色
 * @property {String}	 pdground 定位角点颜色
 * @property {String}	 level 容错级别
 * @property {String}	 value	二维码内容 (start为true时必填 )
 * @property {String}	 expiredText 过期文本
 * @property {String}	 scannedText 扫描文本
 * @property {String}	 refreshText 刷新文本
 * @property {String | Number}	 size   二维码尺寸
 * @property {String}	 icon 二维码图标
 * @property {Number}	 iconSize 二维码图标大小
 * @property {String}	 status 状态 expired,scanned,loading
 * 
 * @example <u-qrcode ref="qrcode" size="200px" value="https://uview.d3u.cn"></u-qrcode>
 */
export default {
	name: 'u-qrcode',
	mixins: [mpMixin, mixin, props],
	data() {
		return {
			imageUrl: '',
		};
	},
	watch: {
		value: {
			handler(newVal) {
				if(newVal){
					this.remake();
				}
			}
		},
		size: {
			handler(newVal) {
				if(newVal && newVal !== this.size){
					this.remake();
				}
			}
		}
	},
	mounted() {
		this.make();
	},
	// #ifdef VUE3
	emits: ["change", "refresh","onLongpress","error"],
		// #endif
	methods: {
		async make() {
			await this.$nextTick();
			const { canvas } = await this.$refs.canvasRef.getCanvasContext();
			new QRCode({
				canvas: canvas, 
				text: this.value,
				size: this.size,
				background: this.background,
				foreground: this.foreground,
				pdground: this.pdground,
				correctLevel: this.level,
				icon: this.icon,
				iconSize: this.iconSize,
				callback: () => {
					if(this.mode === 'image') {
						this.getTempFile((tempFilePath)=>{
							this.imageUrl = tempFilePath;
						})
					}
				}
			});
		},
		getTempFile(callback) {
			this.$refs.canvasRef.canvasToTempFilePath({
				width: this.size,
				height: this.size,
				fileType: 'png',
				quality: 1,
			}).then((tempFilePath) => {
				callback(tempFilePath);
			}).catch((error) => {
				this.$emit('error', error);
			});
		},
		remake() {
			this.make();
			this.$emit('change');
		},
		handleRefresh() {
			this.$emit('refresh');
		},
		handleLongpress() {
			this.getTempFile((tempFilePath)=>{
				this.$emit('onLongpress', tempFilePath);
			})
		}
	}
};

</script>

<style lang="scss" scoped>

@import "../../libs/css/components.scss";

.u-qrcode{
	position: relative;
	
	&__image {
		width: 100%;
		height: 100%;
		&-wrapper{
			width: 100%;
			height: 100%;
		}
	}

	&__mask{
		@include flex(row);
		flex-direction: column;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10;
		justify-content: center;
		align-items: center;
		background:  rgba(255, 255, 255, 0.9);
	}


	&__expired-message {
		font-size: 15px;
		font-weight: 800;
		color: #333;
	}

	&__expired-btn {
		@include flex(row);
		align-items: center;
		justify-content: center;
		margin-top: 5px;
	}
}
</style>