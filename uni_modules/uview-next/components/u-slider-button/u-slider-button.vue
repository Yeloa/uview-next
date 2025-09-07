<template>
	<view
		class="u-slider-button"
		:id="sliderButtonId"
		:style="[{
			width: $u.addUnit(width),
			height: $u.addUnit(height),
			borderRadius: $u.addUnit(round),
			backgroundColor: bgColor
		}]"
	>
		<!-- 进度层 -->
		<view class="u-slider-rail" :style="[railStyle]">
			<view
				class="u-slider-thumb"
				:style="[{
					width: $u.addUnit(height),
					height: $u.addUnit(height),
				}]"
				@touchstart.stop.prevent="onThumbStart"
				@touchmove.stop.prevent="onThumbMove"
				@touchend.stop.prevent="onThumbEnd"
				@touchcancel.stop.prevent="onThumbEnd"
			>
				<slot name="thumb">
					<view class="u-slider-thumb__inner" :style="[{
						width: $u.addUnit(height - 8),
						height: $u.addUnit(height - 8),
					}]">
						<u-icon name="arrow-right-double" :color="railColor" size="22" bold></u-icon>
					</view>
				</slot>
			</view>
		</view>
		<slot>
			<text class="u-slider-text" :style="[{
				fontWeight: textBold ? 'bold' : 'normal',
				fontSize: $u.addUnit(fontSize),
				color: success ? activeTextColor : textColor
			}]">{{ displayText }}</text>
		</slot>
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';

	/**
	 * slider-button  滑动按钮
	 * @description 滑动验证按钮组件，常用于验证用户操作。
	 * @tutorial https://uview.d3u.cn/components/sliderButton.html
	 * 
	 * @property {String}			text       按钮文字
	 * @property {String|Number}	width      按钮宽度
	 * @property {String|Number}	round      圆角
	 * @property {String|Number}	height     按钮高度
	 * @property {String|Number}	zIndex     层级
	 * @property {String}			bgColor    背景颜色
	 * @property {String}			activeBgColor 激活背景颜色
	 * @property {String}			textColor  文字颜色
	 * @property {String|Number}	fontSize   文字大小
	 * @property {Boolean}		    textBold   文字是否加粗
	 * @property {String}			activeTextColor 激活文字颜色
	 * @property {Boolean}		    disabled   是否禁用
	 * @property {String}			successText 成功文字
	 * @property {Boolean}		    autoReset  是否自动重置
	 * @property {Number}			resetDelay 重置延迟时间（毫秒）
	 * @property {String|Number}	threshold  阈值
	 * 
	 * @slot {String} thumb 滑块插槽
	 * @slot {String} default 文字插槽
	 * 
	 * @event {Function} success 成功回调
	 * @event {Function} reset 重置回调
	 * @event {Function} change 滑动回调
	 * 
	 * @method {Function} reset 重置
	 * 
	 * @example  <u-slider-button :text="text" @success="onSuccess"></u-slider-button>
	 */
	export default {
		name: 'u-slider-button',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				sliderButtonId: 'sliderButton' + uni.$u.guid(),
				success: false,
				useTransition: false,
				thumbX: 0,
				areaWidth: 0,
				areaLeft: 0,
				isDragging: false,
				dragOffsetX: 0
			}
		},
		computed: {
			railStyle() {
				const thumbW = uni.$u.getPx(this.height);
				const rawWidth = this.thumbX + thumbW;
				const width = Math.max(thumbW, Math.min(this.areaWidth, rawWidth));
				return {
					zIndex: this.railIndex,
					width: uni.$u.addUnit(width),
					backgroundColor: this.railColor,
					borderRadius: uni.$u.addUnit(this.railRadius),
					transition: this.useTransition ? 'none' : 'width 0.3s ease-out'
				}
			},
			displayText() {
				return this.success ? this.successText : this.text;
			},
			thresholdX() {
				if (this.threshold) {
					const thresholdValue = uni.$u.getPx(this.threshold);
					return thresholdValue > 0 ? thresholdValue : 0;
				}
				const thumbW = uni.$u.getPx(this.height);
				const max = this.areaWidth - thumbW;
				return max > 0 ? max : 0;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.init();
			});
		},
		// #ifdef VUE3
		emits: ['change', 'success', 'reset'],
		// #endif
		methods: {
			init() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + this.sliderButtonId).boundingClientRect(rect => {
					if (rect && rect.width > 0) {
						this.areaWidth = rect.width;
						this.areaLeft = rect.left;
					}
				}).exec();
				if (this.thumbX > this.thresholdX) this.thumbX = this.thresholdX;
			},
			onThumbStart(e) {
				if (this.disabled || this.success) return;
				this.useTransition = true;
				this.isDragging = true;
				// 记录按下时的指尖相对当前滑块左侧的偏移，避免跳动
				const offset = e.touches[0].clientX - (this.areaLeft + this.thumbX);
				const thumbW = uni.$u.getPx(this.height);
				this.dragOffsetX = Math.min(thumbW, offset);
			},
			onThumbMove(e) {
				if (!this.isDragging || this.disabled || this.success) return;
				let nextX = e.touches[0].clientX - this.areaLeft - this.dragOffsetX;
				const thumbW = uni.$u.getPx(this.height);
				const maxX = Math.max(0, this.areaWidth - thumbW);
				nextX = Math.min(maxX, nextX);
				this.thumbX = nextX;
				const percent = this.thresholdX === 0 ? 0 : Math.min(1, this.thumbX / this.thresholdX);
				this.$emit('change', percent);
			},
			onThumbEnd() {
				if (!this.isDragging) return;
				this.isDragging = false;
				this.useTransition = false;
				if (this.success) return;
				if (this.thumbX < this.thresholdX) {
					this.reset();
				} else {
					this.handleSuccess();
				}
			},
			handleSuccess() {
				if (this.success) return;
				this.success = true;
				this.thumbX = this.areaWidth;
				this.$emit('success');
				if (this.autoReset) {
					uni.$u.sleep(this.resetDelay).then(() => {
						this.useTransition = true;
						this.reset();
					});
				}
			},
			reset() {
				this.success = false;
				this.thumbX = 0;
				this.$emit('reset');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-slider{

		&-button {
			position: relative;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&-rail {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		&-text {
			position: relative;
			z-index: 5;
			user-select: none;
			pointer-events: none;
		}

		&-thumb {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			z-index: 1000;
			&__inner {
				background-color: #ffffff;
				border-radius: 100px;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

</style>
