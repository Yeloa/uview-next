<template>
	<view
		class="u-slider"
		:class="[{ 'u-slider--vertical': vertical, 'u-slider--disabled': disabled }]"
		:id="sliderId"
		:style="[sliderStyle]"
		@tap="onRailTap"
	>
		<!-- 轨道 -->
		<view class="u-slider__rail" :style="[railStyle]">
			<view class="u-slider__track" :style="[trackStyle]"></view>
		</view>
		<!-- 单个滑块或起始滑块 -->
		<view
			v-if="!range || (Array.isArray(currentValue))"
			class="u-slider__thumb"
			:style="[startThumbStyle]"
			@touchstart.stop.prevent="onThumbStart($event,'start')"
			@touchmove.stop.prevent="onThumbMove"
			@touchend.stop.prevent="onThumbEnd"
		>
			<slot name="startThumb">
				<view class="u-slider__thumb-inner" :style="[thumbStyle]"></view>
			</slot>
			<view v-if="showValue" class="u-slider__value">{{ displayStartValue }}</view>
		</view>

		<!-- 范围滑块结束滑块 -->
		<view
			v-if="range && (Array.isArray(currentValue))"
			class="u-slider__thumb u-slider__thumb--end"
			:style="[endThumbStyle]"
			@touchstart.stop.prevent="onThumbStart($event,'end')"
			@touchmove.stop.prevent="onThumbMove"
			@touchend.stop.prevent="onThumbEnd"
		>
			<slot name="endThumb">
				<view class="u-slider__thumb-inner" :style="[thumbStyle]"></view>
			</slot>
			<view v-if="showValue" class="u-slider__value">{{ displayEndValue }}</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin'
	
	export default {
		name: 'u-slider',
		mixins: [mpMixin, mixin, props],
		
		data() {
			return {
				sliderId: 'slider' + uni.$u.guid(),
				containerRect: null,
				activeThumb: null,
				isDragging: false,
			}
		},
		computed: {
			currentValue() {
				let value = 0;
				// #ifdef VUE2
				value = this.value;
				// #endif
				// #ifdef VUE3
				value = this.modelValue;
				// #endif
				if (this.range) {
					const val = Array.isArray(value) ? value : [this.min, this.max];
					return [this.safeNumber(val[0], this.min), this.safeNumber(val[1], this.max)];
				}
				return this.safeNumber(value, this.min);
			},
			displayStartValue() {
				return Array.isArray(this.currentValue) ? this.currentValue[0] : this.currentValue;
			},
			displayEndValue() {
				return Array.isArray(this.currentValue) ? this.currentValue[1] : '';
			},
			// 数值范围计算
			numericRange() {
				const min = this.safeNumber(this.min, 0);
				const max = this.safeNumber(this.max, 100);
				return { min, max, range: max - min };
			},
			thumbStyle() {
				let style = {
					width: uni.$u.addUnit(this.thumbSize),
					height: uni.$u.addUnit(this.thumbSize),
					borderRadius: uni.$u.addUnit(this.thumbRadius),
					backgroundColor: this.thumbColor,
					border: this.thumbBorder,
				};
				return style;
			},
			sliderStyle(){
				let style = {};
				if(this.vertical) {
					style.width = uni.$u.addUnit(this.size);
				} else {
					style.height = uni.$u.addUnit(this.size);
				}
				return style;
			},
			railStyle() {
				let style = {
					backgroundColor: this.railColor,
					borderRadius: uni.$u.addUnit(this.railRadius)
				};
				if(this.vertical) {
					style.width = uni.$u.addUnit(this.railSize);
				} else {
					style.height = uni.$u.addUnit(this.railSize);
				}
				return style;
			},
			// 计算轨道样式
			trackStyle() {
				const { min, max } = this.numericRange;
				const rect = this.containerRect;
				if (!rect) return {};
				let startFraction = 0;
				let endFraction = 0;
				
				let style = {
					backgroundColor: this.trackColor,
					borderRadius: uni.$u.addUnit(this.railRadius)
				};

				if (this.range && Array.isArray(this.currentValue)) {
					const firstThumbFraction = this.positionPercent(this.currentValue[0], min, max, this.vertical, this.reverse);
					const secondThumbFraction = this.positionPercent(this.currentValue[1], min, max, this.vertical, this.reverse);
					startFraction = firstThumbFraction < secondThumbFraction ? firstThumbFraction : secondThumbFraction;
					endFraction = firstThumbFraction < secondThumbFraction ? secondThumbFraction : firstThumbFraction;
				} else {
					const currentFraction = this.positionPercent(this.currentValue, min, max, this.vertical, this.reverse);
					if (this.reverse) {
						startFraction = currentFraction;
						endFraction = 1;
					} else {
						startFraction = 0;
						endFraction = currentFraction;
					}
					
					if (!this.reverse){
						style.opacity = currentFraction <= 0.05 ? 0 : 1;
					}
				}
				
				if(this.vertical) {
					const start = parseInt(startFraction * rect.height);
					const size = parseInt((endFraction - startFraction) * rect.height);
					style.bottom = uni.$u.addUnit(start);
					style.height = uni.$u.addUnit(size);
					style.width = uni.$u.addUnit(this.railSize);
				} else {
					const start = parseInt(startFraction * rect.width);
					const size = parseInt((endFraction - startFraction) * rect.width);
					style.left = uni.$u.addUnit(start);
					style.width = uni.$u.addUnit(size);
					style.height = uni.$u.addUnit(this.railSize);
				}
				return style;
			},
			// 计算起始滑块样式
			startThumbStyle() {
				const value = this.range && Array.isArray(this.currentValue) ? this.currentValue[0] : this.currentValue;
				return this.calculateThumbStyle(value);
			},
			// 计算结束滑块样式
			endThumbStyle() {
				return this.calculateThumbStyle(this.currentValue[1]);
			}
		},
		mounted() {
			this.$nextTick(() => this.measure());
		},
	
		// #ifdef VUE3
		emits: ['update:modelValue', 'change', 'dragStart', 'dragEnd'],
		// #endif
		methods: {
			measure() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + this.sliderId).boundingClientRect(rect => {
					if (rect && rect.width > 0 && rect.height > 0) {
						this.containerRect = rect;
					}
				}).exec();
			},
			safeNumber(value, defaultValue = 0) {
				const num = Number(value);
				return isNaN(num) || !isFinite(num) ? defaultValue : num;
			},
			// 计算百分比位置
			percentFromValue(value, min, max) {
				const val = this.safeNumber(value, min);
				const minVal = this.safeNumber(min, 0);
				const maxVal = this.safeNumber(max, 100);
				const range = maxVal - minVal;
				
				if (range <= 0) return 0;
				return Math.max(0, Math.min(1, (val - minVal) / range));
			},
			
			// 计算位置百分比
			positionPercent(value, min, max, vertical, reverse) {
				const p = this.percentFromValue(value, min, max);
				return reverse ? (1 - p) : p;
			},
			
			// 计算滑块样式
			calculateThumbStyle(value) {
				const { min, max } = this.numericRange;
				const rect = this.containerRect;
				if (!rect) return {};
				const fraction = this.positionPercent(value, min, max, this.vertical, this.reverse);
				const clampedFraction = Math.max(0, Math.min(1, fraction));
				const thumbSize = uni.$u.getPx(this.thumbSize) / 2;

				let style = {}
				if(this.vertical){
					let raw = clampedFraction * rect.height;
					if (!this.reverse){
						raw -= thumbSize;
					}
					const position = Math.max(thumbSize, raw);
					style.bottom = uni.$u.addUnit(parseInt(position));
				} else {
					let raw = clampedFraction * rect.width;
					if (!this.reverse){
						raw -= thumbSize;
					}
					const position = Math.max(thumbSize,  raw);
					style.left = uni.$u.addUnit(parseInt(position));
				}
				return style;
			},
			coerceToStep(value) {
				const { min, max } = this.numericRange;
				const step = this.safeNumber(this.step, 1);
				const stepValue = step > 0 ? step : 1;
				
				let v = this.safeNumber(value, min);
				v = min + Math.round((v - min) / stepValue) * stepValue;
				return Math.max(min, Math.min(max, v));
			},
			pointToValue(event) {
				const point = event.touches[0];
				
				const { min, max, range } = this.numericRange;
				const rect = this.containerRect;
				
				let position = 0;
				if (this.vertical) {
					if (rect.height <= 0) return null;
					position = 1 - ((point.clientY - rect.top) / rect.height);
				} else {
					if (rect.width <= 0) return null;
					position = (point.clientX - rect.left) / rect.width;
				}
				
				position = Math.max(0, Math.min(1, position));
				if (this.reverse) position = 1 - position;
				
				return this.coerceToStep(min + position * range);
			},
			updateValue(proposedValue, movedThumb) {
				if (this.disabled || this.readonly) return;
				
				let nextValue = '';
				const { min, max } = this.numericRange;
				const steppedValue = this.coerceToStep(proposedValue);
				
				if (this.range && Array.isArray(this.currentValue)) {
					let [startValue, endValue] = this.currentValue;
					
					if (movedThumb === 'end') {
						endValue = steppedValue;
						if (this.noCross && endValue < startValue) endValue = startValue;
					} else {
						startValue = steppedValue;
						if (this.noCross && startValue > endValue) startValue = endValue;
					}
					
					// 确保范围有效
					startValue = Math.max(min, Math.min(max, startValue));
					endValue = Math.max(min, Math.min(max, endValue));
					
					nextValue = [startValue, endValue];
				} else {
					const clampedValue = Math.max(min, Math.min(max, steppedValue));
					nextValue = clampedValue;
				}

				// #ifdef VUE2
				this.$emit('input', nextValue);
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', nextValue);
				// #endif
			},
			onRailTap(e) {
				if (this.disabled || this.readonly) return;
				uni.$u.throttle(() => {
					const v = this.pointToValue(e);
					if (v == null) return;
					
					if (this.range && Array.isArray(this.currentValue)) {
						// 点击移动更近的滑块
						const distStart = Math.abs(v - this.currentValue[0]);
						const distEnd = Math.abs(v - this.currentValue[1]);
						const thumb = distStart <= distEnd ? 'start' : 'end';
						this.updateValue(v, thumb);
					} else {
						this.updateValue(v, 'start');
					}
					
					this.$emit('change', this.currentValue);
                }, 50);
			},
			
			onThumbStart(e, thumb) {
				if (this.disabled || this.readonly) return;
				this.isDragging = true;
				this.activeThumb = thumb;
				this.measure();
				this.$emit('dragStart', this.currentValue);
			},
			
			onThumbMove(e) {
				if (!this.isDragging) return;
				const v = this.pointToValue(e);
				if (v) {
					this.updateValue(v, this.activeThumb);
				}
			},
			
			onThumbEnd(e) {
				if (!this.isDragging) return;
				this.isDragging = false;
				this.$emit('dragEnd', this.currentValue);
				this.$emit('change', this.currentValue);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";
.u-slider {
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	&--disabled {
		opacity: 0.5;
	}

	&--vertical {
		height: 100%;
		justify-content: center;
	}
	
	&--vertical .u-slider__rail {
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		height: 100%;
		width: 100%;
	}

	&--vertical .u-slider__thumb {
		transform: translate(0%, 50%);
	}

	&__rail {
		width: 100%;
	}

	&__thumb {
		position: absolute;
		z-index: 2;
		left: 0;
		transform: translate(-50%, 0%);
	}

	&__track {
		position: absolute;
		transition-duration: .1s;
		transition-property: opacity;
	}

	&__thumb-inner {
		box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
	}
	
	&__value {
		position: absolute;
		top: -24px;
		left: 50%;
		transform: translateX(-50%);
		padding: 2px 6px;
		background: rgba(0,0,0,0.6);
		color: #fff;
		font-size: 10px;
		border-radius: 4px;
	}
}
</style>
