<template>
	<view class="u-color-picker" :class="{ 'u-color-picker--disabled': disabled }">
		
		<view class="u-color-picker__palette" @click="onPaletteClick">
			<view class="u-color-picker__palette-bg" :style="[paletteStyle]"></view>
			<view class="u-color-picker__handle" :style="[handleStyle]"></view>
		</view>

		<view class="u-color-picker__slider-wrapper" @click="onHueClick">
			<view class="u-color-picker__slider-bg" :style="[hueSliderStyle]"></view>
			<slider
				class="u-color-picker__slider" 
				backgroundColor="transparent" 
				activeColor="transparent"
				:blockSize="24" 
				:height="28"
				:min="0" :max="360" 
				:step="1" 
				:value="hue" 
				@change="onHueChange" 
			/>
		</view>

		<view class="u-color-picker__slider-wrapper u-color-picker__slider--alpha">
			<view class="u-color-picker__slider-bg" :style="[alphaSliderStyle]"></view>
			<slider 
				class="u-color-picker__slider"
				backgroundColor="transparent" 
				activeColor="transparent"
				:blockSize="24" 
				:min="0"
				:max="1" 
				:step="0.01" 
				:value="alpha" 
				@change="onAlphaChange"
			/>
		</view>
		

		<view class="u-color-picker__input-area">
			<view 
				class="u-color-picker__format-selector" 
				:style="[{borderRadius: showFormatList ? '0 0 6px 6px' : '6px'}]" 
				@tap="showFormatList = !showFormatList"
			>
				<view class="u-color-picker__format-current">{{ currentFormat }}</view>
				<view class="u-color-picker__format-arrow"></view>
				<view v-if="showFormatList" class="u-color-picker__format-list">
					<view class="u-color-picker__format-item" v-for="item in formats" :key="item" @tap="switchFormat(item)">{{ item }}</view>
				</view>
			</view>
			<view class="u-color-picker__input-group">
				<view class="u-color-picker__input-wrapper" v-if="currentFormat === 'HEX'">
					<view class="u-color-picker__input-prefix">#</view>
					<view class="u-color-picker__input">{{ currentColor }}</view>
				</view>

				<view class="u-color-picker__input-wrapper" v-if="currentFormat === 'RGB'">
					<view class="u-color-picker__input-prefix">R</view>
					<view class="u-color-picker__input">{{ currentColor.r }}</view>
					<view class="u-color-picker__input-prefix">G</view>
					<view class="u-color-picker__input">{{ currentColor.g }}</view>
					<view class="u-color-picker__input-prefix">B</view>
					<view class="u-color-picker__input">{{ currentColor.b }}</view>
					<view class="u-color-picker__input-prefix">A</view>
					<view class="u-color-picker__input">{{ currentColor.a }}</view>
				</view>

				<view class="u-color-picker__input-wrapper" v-if="currentFormat === 'HSL'">
					<view class="u-color-picker__input-prefix">H</view>
					<view class="u-color-picker__input">{{ currentColor.h }}</view>
					<view class="u-color-picker__input-prefix">S</view>
					<view class="u-color-picker__input">{{ currentColor.s }}</view>
					<view class="u-color-picker__input-prefix">L</view>
					<view class="u-color-picker__input">{{ currentColor.l }}</view>
					<view class="u-color-picker__input-prefix">A</view>
					<view class="u-color-picker__input">{{ currentColor.a }}</view>
				</view>
				<view class="u-color-picker__color-preview" :style="[{ backgroundColor: currentColorFormat }]"></view>
			</view>
		</view>
	
		<view v-if="showPresets && presets.length > 0" class="u-color-picker__presets">
			<view 
				v-for="(preset, index) in presets" 
				:key="index"
				class="u-color-picker__preset-group"
			>
				<view class="u-color-picker__preset-label">{{ preset.label }}</view>
				<view class="u-color-picker__preset-colors">
					<view 
						v-for="(color, colorIndex) in preset.colors" 
						:key="colorIndex"
						class="u-color-picker__preset-color"
						:style="[{ backgroundColor: color }]"
						:class="{ 'u-color-picker__preset-color--active': currentColor.hex === color }"
						@tap="selectPresetColor(color)"
					></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
     * color-picker 颜色选择器
     * @property {String}			value			颜色的值，支持HEX、RGB、HSB格式
     * @property {Array}			presets			预设的颜色分组
     * @property {Boolean}			showPresets		是否显示预设颜色
     * @property {Boolean}			disabled		是否禁用颜色选择器
     *
     * @event {Function}	change			颜色值变化时触发
     * @event {Function}	formatChange	颜色格式变化时触发
     *
     * @example <u-color-picker v-model="color" />
     */
	import mixin from '../../libs/mixin/mixin';
	export default {
		name: 'u-color-picker-view',
		mixins: [mixin],
		props: {
			value: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			showPresets: {
				type: Boolean,
				default: true
			},
			presets: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				currentColor: '',
				currentColorFormat: '',
				currentFormat: 'HEX',
				hue: 0,
				saturation: 100,
				lightness: 50,
				alpha: 1,
				x:0,
				y:0,
				formats: ['HEX', 'RGB', 'HSL'],
				showFormatList: false,
				handleWidth: 24 // 滑块手柄宽度
			}
		},
		computed: {
			paletteStyle() {
				return {
					background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${this.hue}, 100%, 50%))`
				}
			},
			hueSliderStyle() {
				return {
					background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
				}
			},
			alphaSliderStyle() {
				const baseColor = this.hslToHex(this.hue, this.saturation, this.lightness, false)
				return {
					background: `linear-gradient(to right, transparent, #${baseColor})`
				}
			},
			handleStyle() {
				const x = (this.saturation / 100) * 100
				const y = (1 - this.lightness / 100) * 100
				return {
					left: `${x}%`,
					top: `${y}%`
				}
			},
			hueHandleStyle() {
				return {
					left: `${(this.hue / 360) * 100}%`
				}
			},
			alphaHandleStyle() {
				return {
					left: `${this.alpha * 100}%`
				}
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(newVal) {
					if(newVal && newVal !== this.currentColorFormat){
						this.setColor(newVal)
					}
				}
			}
		},
		// #ifdef VUE3
		emits: ["change", "formatChange"],
		// #endif
		methods: {

			// 设置颜色
			setColor(color) {
				let result,resultObj,format = this.detectColorFormat(color)
				switch (format) {
					case 'HEX':
						result = this.hexToHsl(color)
						resultObj = this.hslToHex(result.h, result.s, result.l).replace('#', '')
						break
					case 'RGB':
						result = this.rgbToHsl(color)
						resultObj = this.hslToRgb(result.h, result.s, result.l)
						break
					case 'HSL':
						result = this.parseHsl(color)
						resultObj = this.hslToHsl(result.h, result.s, result.l)
						break
					default:
						console.warn('未知的颜色格式:', color)
						return
				}
				
				this.hue = result.h
				this.saturation = result.s
				this.lightness = result.l
				this.alpha = result.a
				this.currentFormat = format
				this.currentColorFormat = color
				this.currentColor = resultObj
			},
			
			// 调色板点击事件
			onPaletteClick(event) {
				if (this.disabled) return
				this.$uGetRect('.u-color-picker__palette').then(async (rect) => {
                    const x = event.changedTouches[0].clientX - rect.left
					const y = event.changedTouches[0].clientY - rect.top
					this.saturation = Math.max(0, Math.min(100, (x / rect.width) * 100))
					this.lightness = Math.max(0, Math.min(100, (1 - y / rect.height) * 100))
					this.switchColor()
                });
			},

			// 色相滑块改变
			onHueChange({ detail }) {
				this.hue = detail.value
				this.switchColor()
			},

			// 透明度滑块改变
			onAlphaChange({ detail }) {
				this.alpha = detail.value
				this.switchColor()
			},

			// 更新颜色
			switchColor() {
				if(this.currentFormat === 'HEX'){
					this.currentColor = this.hslToHex(this.hue, this.saturation, this.lightness)
					this.currentColorFormat = '#' + this.currentColor
				}else if(this.currentFormat === 'RGB'){
					this.currentColor = this.hslToRgb(this.hue, this.saturation, this.lightness)
					this.currentColorFormat = 'rgba(' + this.currentColor.r + ',' + this.currentColor.g + ',' + this.currentColor.b + ',' + this.alpha + ')'
				}else if(this.currentFormat === 'HSL'){
					this.currentColor = this.hslToHsl(this.hue, this.saturation, this.lightness)
					this.currentColorFormat = 'hsla(' + this.currentColor.h + ',' + this.currentColor.s + '%,' + this.currentColor.l + '%, ' + this.alpha + ')'
				}
				
				this.$emit('change', {
					color: this.currentColor,
					colorFormat: this.currentColorFormat,
					format: this.currentFormat,
				})
			},

			// 切换格式
			switchFormat(item) {
				this.currentFormat = item
				this.$emit('formatChange', item)
				this.switchColor();
			},

			// 选择预设颜色
			selectPresetColor(color) {
				if (this.disabled) return
				this.setColor(color)
			},
			// 检测颜色格式类型
			detectColorFormat(color) {
				if (!color || typeof color !== 'string') return ''
				const trimmedColor = color.trim().toLowerCase()
				// 检测HEX格式 (#fff, #ffffff, #ffffffff)
				if (/^#[0-9a-f]{3,8}$/i.test(trimmedColor)) {
					return 'HEX'
				}
				// 检测RGB格式 (rgb(255,255,255), rgba(255,255,255,1))
				if (/^rgba?\([^)]+\)$/.test(trimmedColor)) {
					return 'RGB'
				}
				// 检测HSL格式 (hsl(360,100%,50%), hsla(360,100%,50%,1))
				if (/^hsla?\([^)]+\)$/.test(trimmedColor)) {
					return 'HSL'
				}
				return ''
			},
			// HEX转HSL
			hexToHsl(hex) {
				
				hex = hex.replace('#', '')
				
				// 处理3位和6位hex
				if (hex.length === 3) {
					hex = hex.split('').map(char => char + char).join('')
				}
				
				const r = parseInt(hex.substr(0, 2), 16) / 255
				const g = parseInt(hex.substr(2, 2), 16) / 255
				const b = parseInt(hex.substr(4, 2), 16) / 255
				const a = parseInt(hex.substr(6, 2), 16) / 255 || 1
			
				const max = Math.max(r, g, b)
				const min = Math.min(r, g, b)
				let h, s, l = (max + min) / 2
				
				if (max === min) {
					h = s = 0 // 无彩色
				} else {
					const d = max - min
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
					
					switch (max) {
						case r: h = (g - b) / d + (g < b ? 6 : 0); break
						case g: h = (b - r) / d + 2; break
						case b: h = (r - g) / d + 4; break
					}
					h /= 6
				}
				
				return {
					h: Math.round(h * 360),
					s: Math.round(s * 100),
					l: Math.round(l * 100),
					a: a
				}
			},

			// HSL转HEX
			hslToHex(h, s, l, a = true) {
				h = h / 360
				s = s / 100
				l = l / 100
				
				const hue2rgb = (p, q, t) => {
					if (t < 0) t += 1
					if (t > 1) t -= 1
					if (t < 1/6) return p + (q - p) * 6 * t
					if (t < 1/2) return q
					if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
					return p
				}
				
				let r, g, b
				
				if (s === 0) {
					r = g = b = l // 无彩色
				} else {
					const q = l < 0.5 ? l * (1 + s) : l + s - l * s
					const p = 2 * l - q
					r = hue2rgb(p, q, h + 1/3)
					g = hue2rgb(p, q, h)
					b = hue2rgb(p, q, h - 1/3)
				}
				
				const toHex = (n) => {
					const hex = Math.round(n * 255).toString(16)
					return hex.length === 1 ? '0' + hex : hex
				}
				
				let alphaHexPadded = ''
				// 如果有透明度且小于1，转换为8位HEX格式
				if (this.alpha < 1 && a) {
					const alphaHex = Math.round(this.alpha * 255).toString(16)
					alphaHexPadded = alphaHex.length === 1 ? '0' + alphaHex : alphaHex
				}
				
				return `${toHex(r)}${toHex(g)}${toHex(b)}${alphaHexPadded}`
			},

			// HSL转RGB
			hslToRgb(h, s, l) {
				h = h / 360
				s = s / 100
				l = l / 100
				
				const hue2rgb = (p, q, t) => {
					if (t < 0) t += 1
					if (t > 1) t -= 1
					if (t < 1/6) return p + (q - p) * 6 * t
					if (t < 1/2) return q
					if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
					return p
				}
				
				let r, g, b
				
				if (s === 0) {
					r = g = b = l // 无彩色
				} else {
					const q = l < 0.5 ? l * (1 + s) : l + s - l * s
					const p = 2 * l - q
					r = hue2rgb(p, q, h + 1/3)
					g = hue2rgb(p, q, h)
					b = hue2rgb(p, q, h - 1/3)
				}
				
				// 返回对象格式，始终包含alpha通道
				return {
					r: Math.round(r * 255),
					g: Math.round(g * 255),
					b: Math.round(b * 255),
					a: this.alpha
				}
			},

			// HSL转HSL对象
			hslToHsl(h, s, l) {
				return {
					h: Math.round(h),
					s: Math.round(s),
					l: Math.round(l),
					a: this.alpha
				}
			},


			// RGB转HSL
			rgbToHsl(rgbString) {
				// 解析RGB字符串
				const match = rgbString.match(/rgba?\(([^)]+)\)/)
				if (!match) return { h: 0, s: 0, l: 0, a: 1 }
				
				const values = match[1].split(',').map(v => parseFloat(v.trim()))
				let r, g, b, a = 1
				
				if (values.length >= 3) {
					r = values[0] / 255
					g = values[1] / 255
					b = values[2] / 255
					if (values.length === 4) {
						a = values[3]
					}
				} else {
					return { h: 0, s: 0, l: 0, a: 1 }
				}
				
				const max = Math.max(r, g, b)
				const min = Math.min(r, g, b)
				let h, s, l = (max + min) / 2
				
				if (max === min) {
					h = s = 0 // 无彩色
				} else {
					const d = max - min
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
					
					switch (max) {
						case r: h = (g - b) / d + (g < b ? 6 : 0); break
						case g: h = (b - r) / d + 2; break
						case b: h = (r - g) / d + 4; break
					}
					h /= 6
				}
				
				return {
					h: Math.round(h * 360),
					s: Math.round(s * 100),
					l: Math.round(l * 100),
					a: a
				}
			},

			// 解析HSL字符串
			parseHsl(hslString) {
				// 解析HSL字符串
				const match = hslString.match(/hsla?\(([^)]+)\)/)
				if (!match) return { h: 0, s: 0, l: 0, a: 1 }
				
				const values = match[1].split(',').map(v => parseFloat(v.trim()))
				let h = 0, s = 0, l = 0, a = 1
				
				if (values.length >= 3) {
					h = values[0]
					s = values[1]
					l = values[2]
					if (values.length === 4) {
						a = values[3]
					}
				}
				
				return {
					h: Math.round(h),
					s: Math.round(s),
					l: Math.round(l),
					a: a
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-color-picker {
		@include flex(column);

		&--disabled {
			opacity: 0.6;
			pointer-events: none;
		}

		&__palette {
			position: relative;
			width: 100%;
			height: 230px;
			border-radius: 8px;
			overflow: hidden;
			//#ifdef H5
			cursor: crosshair;
			//#endif
			&-bg {
				width: 100%;
				height: 100%;
			}
		}

		&__handle {
			position: absolute;
			width: 26px;
			height: 26px;
			border: 2px solid #fff;
			border-radius: 100px;
			box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06);
			transform: translate(-50%, -50%);
			pointer-events: none;
		}

		&__slider-wrapper {
			position: relative;
			width: 100%;
			height: 28px;
			border-radius: 100px;
			overflow: hidden;
			margin-top: 15px;
		}

		&__slider {
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			transform: translateY(-50%);
			margin: 0 14px;

			&-bg {
				width: 100%;
				height: 100%;
			}

			&--alpha {
				background: repeating-conic-gradient(from 0deg, #ccc 0deg 90deg, transparent 90deg 180deg);
				background-size: 8px 8px;
			}
		}

		&__input-area {
			@include flex(row);
			align-items: center;
			margin-top: 15px;
		}

		&__format-selector {
			position: relative;
			@include flex(row);
			align-items: center;
			justify-content: space-between;
			flex-shrink: 0;
			margin-right: 8px;
			height: 34px;
			padding: 0 12px;
			font-size: 13px;
			font-weight: 500;
			background: #f5f7fa;
			border-radius: 100px;
			text-align: center;
			-webkit-tap-highlight-color: transparent;
			user-select: none;
			//#ifdef H5
			cursor: pointer;
			//#endif
			&:active {
				background: #f5f7fa;
			}
			
			&:focus {
				outline: none;
				background: #f5f7fa;
			}
		}

		&__format-arrow {
			width: 0;
			height: 0;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
			border-top: 6px solid #606266;
			margin-left: 3px;
		}

		&__format-list {
			position: absolute;
			bottom: 30px;
			left: 0;
			right: 0;
			width: 100%;
			background: #f5f7fa;
			border-radius: 6px 6px 0 0;
			z-index: 2000;
			padding-top: 5px;
		}

		&__format-item {
			padding: 6px 0;
			font-size: 14px;
			color: #303133;
			text-align: center;
			//#ifdef H5
			cursor: pointer;
			//#endif
		}

		&__input-group {
			@include flex(row);
			align-items: center;
			flex: 1;
		}

		&__input-wrapper {
			flex: 1;
			@include flex(row);
			align-items: center;

			height: 34px;
			padding: 0 12px;
			border-radius: 6px;
			font-size: 14px;
			color: #303133;
			background: #f5f7fa;
		}

		&__input-prefix {
			width: 20px;
			text-align: center;
			color: #909399;
		}

		&__input {
			flex: 1;
			font-weight: 600;
		}

		&__color-preview {
			width: 34px;
			height: 34px;
			border-radius: 6px;
			margin-left: 10px;
		}

		&__presets {
			display: flex;
			flex-direction: column;
			margin-top: 5px;
		}

		&__preset-label {
			font-size: 13px;
			color: #606266;
			margin: 10px 0;
		}

		&__preset-colors {
			@include flex(row);
			flex-wrap: wrap;
			margin: -4px;
		}

		&__preset-color {
			width: 28px;
			height: 28px;
			border-radius: 4px;
			margin: 2px;
			//#ifdef H5
			cursor: pointer;
			//#endif
		}
	}
</style>
