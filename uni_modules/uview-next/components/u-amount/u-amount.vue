<template>
	<view class="u-amount" :style="[$u.addStyle(customStyle)]">
		<!-- 插槽模式 -->
		<slot v-if="$slots.default || $slots.$default" :integer="integerPart" :decimal="decimalPart" :capital="capitalText"></slot>
		<!-- 默认显示模式 -->
		<template v-else>
			<!-- 大写中文模式 -->
			<text v-if="capital" class="u-amount__capital" :style="[textStyle]">{{ capitalText }}</text>
			<!-- 普通数字模式 -->
			<template v-else>
				<!-- 前置符号 -->
				<text v-if="showSymbol && !reverse" class="u-amount__symbol" :style="[symbolStyle]">{{ symbol }}</text>
				<!-- 整数部分 -->
				<text class="u-amount__integer" :style="[integerStyle]">{{ formattedInteger }}</text>
				<!-- 小数部分 -->
				<text v-if="showDecimal && decimalPart" class="u-amount__decimal" :style="[decimalStyle]">.{{ decimalPart }}</text>
				<!-- 后置符号 -->
				<text v-if="showSymbol && reverse" class="u-amount__symbol" :style="[symbolStyle]">{{ symbol }}</text>
			</template>
		</template>
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	
	/**
	 * amount 金融数字
	 * @description 用于展示金额、价格等，可以转换为人民币大写，支持动画效果
	 * @tutorial https://uviewui.com/components/amount.html
	 * 
	 * @property {Number} 		v-model/modelValue 			金额数值 （默认 0 ）
	 * @property {String} 		symbol 			金融符号 （默认 '￥' ）
	 * @property {Boolean} 		reverse 		是否置后金额符号位置 （默认 false ）
	 * @property {Number} 		precision 		数字精度，小数点后保留几位 （默认 2 ）
	 * @property {Boolean} 		roundUp 		数字精度取舍是否四舍五入 （默认 true ）
	 * @property {Boolean} 		transition 		数字变化是否使用动画 （默认 false ）
	 * @property {Number} 		duration 		数字变化动画时长 （默认 1000 ）
	 * @property {Number} 		separatorDigits 分隔符位置 （默认 4 ）
	 * @property {String} 		separator 		分隔符 （默认 ',' ）
	 * @property {Boolean} 		showSymbol 		是否显示金融符号 （默认 true ）
	 * @property {Boolean} 		showDecimal 	是否显示小数 （默认 true ）
	 * @property {Boolean} 		showSeparator 	是否显示分隔符 （默认 false ）
	 * @property {Boolean} 		capital 		数字是否转换为大写中文 （默认 false ）
	 * @property {String} 		fontSize 		整数字体大小 （默认 '' ）
	 * @property {String|Number} fontSizeRatio 	金融符号小数字体大小 （默认 0.7 ）
	 * @property {String} 		color 			颜色 （默认 '' ）
	 * @property {String} 		colorRatio		金融符号与小数字体颜色
	 * @property {Object}		customStyle		定义需要用到的外部样式
	 * @example <u-amount v-model="123456.789" :show-separator="true" />
	 */
	export default {
		name: 'u-amount',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				displayValue: 0,
				animationTimer: null
			}
		},
		computed: {
			// 格式化后的数值
			formattedValue() {
				let num = this.displayValue;
				if (this.roundUp) {
					num = Math.round(num * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
				} else {
					num = Math.floor(num * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
				}
				return num.toFixed(this.precision);
			},
			
			// 整数部分
			integerPart() {
				const parts = this.formattedValue.split('.');
				return parts[0];
			},
			
			// 小数部分
			decimalPart() {
				const parts = this.formattedValue.split('.');
				return parts[1] || '';
			},
			
			// 格式化的整数（带分隔符）
			formattedInteger() {
				if (!this.showSeparator) return this.integerPart;
				return this.addSeparator(this.integerPart);
			},
			
			// 中文大写
			capitalText() {
				if (!this.capital) return '';
				return this.toChinese(this.displayValue);
			},
			
			// 文本通用样式
			textStyle() {
				const style = {};
				if (this.color){
					style.color = this.color;
				}
				if (this.fontSize){
					style.fontSize = this.fontSize;
				}
				return style;
			},
			
			// 符号样式
			symbolStyle() {
				const style = {};
				if (this.color){
					style.color = this.color;
				}
				if (this.colorRatio){
					style.color = this.colorRatio;
				}
				if (this.fontSize) {
					if (this.fontSizeRatio) {
						style.fontSize = this.fontSizeRatio;
					} else {
						const size = parseFloat(this.fontSize);
						const ratio = parseFloat(this.fontSizeRatio);
						style.fontSize = uni.$u.addUnit(size * ratio);
					}
				}
				return style;
			},
			
			// 整数样式
			integerStyle() {
				const style = {};
				if (this.color){
					style.color = this.color;
				}
				if (this.fontSize){
					style.fontSize = this.fontSize;
				}
				return style;
			},
			
			// 小数样式
			decimalStyle() {
				const style = {};
				if (this.color){
					style.color = this.color;
				}
				if (this.colorRatio){
					style.color = this.colorRatio;
				}
				if (this.fontSize) {
					if (this.fontSizeRatio) {
						style.fontSize = this.fontSizeRatio;
					} else {
						const size = parseFloat(this.fontSize);
						const ratio = parseFloat(this.fontSizeRatio);
						style.fontSize = uni.$u.addUnit((size * ratio));
					}
				}
				return style;
			}
		},
		watch: {
			value: {
				handler(newVal) {
					if(!newVal) return;
					if (this.transition) {
						this.startAnimation(newVal);
					} else {
						this.displayValue = newVal;
					}
				},
				immediate: true
			},
			// #ifdef VUE3
			modelValue: {
				handler(newVal) {
					if(!newVal) return;
					if (this.transition) {
						this.startAnimation(newVal);
					} else {
						this.displayValue = newVal;
					}
				},
				immediate: true
			}
			// #endif
		},
		methods: {
			// 添加分隔符
			addSeparator(num) {
				const str = num.toString();
				const len = str.length;
				let result = '';
				
				for (let i = 0; i < len; i++) {
					if (i > 0 && (len - i) % this.separatorDigits === 0) {
						result += this.separator;
					}
					result += str[i];
				}
				
				return result;
			},
			
			// 启动动画
			startAnimation(targetValue) {
				if (this.animationTimer) {
					clearInterval(this.animationTimer);
				}
				
				const startValue = this.displayValue;
				const diff = targetValue - startValue;
				const stepTime = 16; // 60fps
				const steps = this.duration / stepTime;
				const stepValue = diff / steps;
				let currentStep = 0;
				
				this.animationTimer = setInterval(() => {
					currentStep++;
					if (currentStep >= steps) {
						this.displayValue = targetValue;
						clearInterval(this.animationTimer);
						this.animationTimer = null;
					} else {
						this.displayValue = startValue + (stepValue * currentStep);
					}
				}, stepTime);
			},
			
			// 转换为中文大写
			toChinese(amount) {
				// 小数单位：角、分、毫、厘
				const fractionUnits = ['角', '分', '毫', '厘'];
				// 数字对应的中文大写
				const chineseDigits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
				// 整数单位
				const integerUnits = [
					['元', '万', '亿'],
					['', '拾', '佰', '仟']
				];
				
				// 处理负数
				const prefix = amount < 0 ? '欠' : '';
				amount = Math.abs(amount);

				let result = '';
				
				// 处理小数部分（角、分、毫、厘）
				for (let i = 0; i < fractionUnits.length; i++) {
					const decimalDigit = Math.floor(amount * Math.pow(10, i + 1)) % 10;
					if (decimalDigit > 0) {
						result += chineseDigits[decimalDigit] + fractionUnits[i];
					}
				}
				
				// 如果小数部分为空，则显示"整"
				result = result || '整';
				
				// 处理整数部分
				let integerPart = Math.floor(amount);

				for (let i = 0; i < integerUnits[0].length && integerPart > 0; i++) {
					let sectionResult = '';
					for (let j = 0; j < integerUnits[1].length && integerPart > 0; j++) {
						sectionResult = chineseDigits[integerPart % 10] + integerUnits[1][j] + sectionResult;
						integerPart = Math.floor(integerPart / 10);
					}
					result = sectionResult.replace(/(零.)*零$/, '').replace(/^$/, '零') + integerUnits[0][i] + result;
				}
				
				// 处理特殊情况和格式化
				return prefix + result.replace(/(零.)*零元/, '元')
							   .replace(/(零.)+/g, '零')
							   .replace(/^整$/, '零元整')
							   .replace(/零角零分零毫零厘/, '整')
							   .replace(/零角零分零毫/, '')
							   .replace(/零角零分/, '')
							   .replace(/零角/, '');
			}
			
		},
		// #ifdef VUE2
		beforeDestroy() {
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
		// #endif
			if (this.animationTimer) {
				clearInterval(this.animationTimer);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-amount {
		@include flex(row);
		align-items: baseline;
		
		&__symbol {
			font-weight: normal;
		}
		
		&__integer {
			font-weight: bold;
		}
		
		&__decimal {
			font-weight: normal;
		}
		
		&__capital {
			font-weight: normal;
		}
	}
</style> 