<template>
	<view class="u-select" :class="[`u-select--${border}`]" :style="[$u.addStyle(customStyle)]">
		<!-- 标签 -->
		<view v-if="label" class="u-select__label" :class="[`u-select__label--${align}`]">
			<text class="u-select__label-text">{{ label }}</text>
		</view>
		
		<!-- 选择框容器 -->
		<view class="u-select__container">
			<!-- 选择框 -->
			<view 
				class="u-select__input" 
				:class="[
					`u-select__input--${border}`,
					`u-select__input--${align}`,
					{
						'u-select__input--disabled': disabled,
						'u-select__input--active': showDropdown
					}
				]"
				:style="[inputStyle]"
				@click="onInputClick"
			>
				<!-- 选择内容 -->
				<view class="u-select__content">
					<text 
						v-if="displayText" 
						class="u-select__text"
						:class="{ 'u-select__text--wrap': wrap }"
					>
						{{ displayText }}
					</text>
					<text v-else class="u-select__placeholder" :style="[$u.addStyle(placeholderStyle)]">{{ placeholder }}</text>
				</view>
				
				<!-- 右侧图标 -->
				<view v-if="!showArrow" class="u-select__right">
					<!-- 清空按钮 -->
					<view 
						v-if="clearable && !disabled && (innerValue !== '' && innerValue !== null && innerValue !== undefined)" 
						class="u-select__clear"
						@click.stop="onClear"
					>
					<u-icon
						name="close"
						size="11"
						color="#ffffff"
						customStyle="line-height: 12px"
					></u-icon>
					</view>
					
					<!-- 箭头图标 -->
					<view v-else class="u-select__arrow">
						<u-icon 
							name="arrow-down" 
							size="12" 
							color="#c0c4cc"
							:class="{ 'u-select__arrow--active': showDropdown }"
						></u-icon>
					</view>
				</view>
			</view>
			
			<!-- 下拉列表 -->
			<view 
				v-if="showDropdown"
				class="u-select__dropdown" 
				:class="[
					`u-select__dropdown--${placement}`,
					{ 'u-select__dropdown--show': showDropdown }
				]"
			>
				<scroll-view 
					class="u-select__dropdown-scroll"
					scroll-y="true"
					:style="{ maxHeight: '200px' }"
				>
					<!-- 空数据提示 -->
					<view v-if="list.length === 0" class="u-select__empty">
						<text class="u-select__empty-text">{{ emptyText }}</text>
					</view>
					
					<!-- 选项列表 -->
					<view v-else class="u-select__options">
						<view 
							v-for="(item, index) in list" 
							:key="index"
							class="u-select__option"
							:class="[
								{
									'u-select__option--selected': isSelected(item[valueName]),
									'u-select__option--disabled': item.disabled
								}
							]"
							@click="onOptionClick(item)"
						>
							<!-- 选项文本 -->
							<text class="u-select__option-text">{{ item[keyName] }}</text>
							
							<!-- 选中图标 -->
							<view v-if="isSelected(item[valueName])" class="u-select__selected-icon">
								<u-icon name="checkmark" size="16" color="#409eff"></u-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<u-overlay :show="showDropdown" :zIndex="1070"  opacity="0" @click="onOverlayClick"></u-overlay>
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';

	/**
	 * Select 选择器组件
	 * @description 基于本地数据的选择器组件，支持单选模式，使用下拉列表形式
	 * @tutorial https://uview.d3u.cn/components/select.html
	 * 
	 * @property {String|Number}		value			默认值
	 * @property {Array}				list			本地数据，格式 [{text:'',value:''}]
	 * @property {Boolean}			clearable		是否显示清除控件
	 * @property {String}			emptyText		没有数据时显示的文字，本地数据无效
	 * @property {String}			label			左侧标题
	 * @property {String}			placeholder		输入框的提示文字
	 * @property {String|Object}	placeholderStyle	指定placeholder的样式
	 * @property {String}			backgroundColor	背景颜色
	 * @property {String|Number}	round			设置圆角值
	 * @property {String}			borderColor		边框颜色
	 * @property {Boolean}			disabled		是否禁用
	 * @property {String}			disabledColor	禁用状态时的背景色
	 * @property {Boolean}			wrap			是否允许选中文本换行显示
	 * @property {String}			placement		弹出位置
	 * @property {String}			align			选择文字的位置
	 * @property {Boolean}			showArrow		是否隐藏右侧按钮
	 * @property {String}			border			边框类型，surround-四周边框，bottom-底部边框，none-无边框 （ 默认 'surround' ）
	 * @property {Object}			customStyle		自定义样式
	 * @event {Function}			change			选中发生变化触发
	 * @event {Function}			open			选择框开启时触发
	 * @event {Function}			close			选择框关闭时触发
	 * @event {Function}			clear			点击清除按钮之后触发
	 * @example <u-select v-model="value" :list="options" @change="onChange"></u-select>
	 */
	export default {
		name: "u-select",
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				innerValue: '',
				showDropdown: false
			}
		},
		computed: {
			// 显示文本
			displayText() {
				if (!this.innerValue) return ''
				const item = this.list.find(item => item[this.valueName] === this.innerValue)
				return item ? item[this.keyName] : ''
			},
			inputStyle() {
				let style = {
					borderColor: this.borderColor,
					backgroundColor: this.backgroundColor,
					borderRadius: uni.$u.addUnit(this.round)
				}
				
				// 设置背景颜色
				if (this.disabled) {
					style.backgroundColor = this.disabledColor
					style.borderColor = uni.$u.darkenColor(this.disabledColor, 0.1)
				}
				
				return style
			}
		},
		watch: {
			// #ifdef VUE2
			value: {
				immediate: true,
				handler(newVal) {
					this.innerValue = newVal
				}
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				immediate: true,
				handler(newVal) {
					this.innerValue = newVal
				}
			}
			// #endif
		},
		// #ifdef VUE3
		emits: ["change", "open", "close", "clear", "update:modelValue"],
		// #endif
		methods: {
			// 判断选项是否被选中
			isSelected(value) {
				return this.innerValue === value
			},
			
			// 点击输入框
			onInputClick() {
				if (this.disabled) return
				
				if (this.list.length === 0) {
					uni.showToast({
						title: this.emptyText,
						icon: 'none'
					})
					return
				}
				
				this.showDropdown = true
				this.$emit('open')
			},
			
			// 点击选项
			onOptionClick(item) {
				if (item.disabled) return
				
				const newValue = item[this.valueName]
				this.innerValue = newValue
				this.showDropdown = false
				this.$emit('close')
				
				this.$emit('change', this.innerValue)

				// #ifdef VUE2
				this.$emit('input', this.innerValue)
				// #endif

				// #ifdef VUE3
				this.$emit('update:modelValue', this.innerValue)
				// #endif
			},
			
			// 点击遮罩层
			onOverlayClick() {
				this.showDropdown = false
				this.$emit('close')
			},
			
			// 清空选择
			onClear() {
				if (this.disabled) return
				
				const oldValue = this.innerValue
				this.innerValue = ''
				
				this.$emit('change', this.innerValue)
				// #ifdef VUE2
				this.$emit('input', this.innerValue)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', this.innerValue)
				// #endif
				this.$emit('clear', oldValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-select {
		display: flex;
		flex-direction: column;
		position: relative;
		
		&__label {
			margin-bottom: 8px;
			
			&--left {
				text-align: left;
			}
			
			&--center {
				text-align: center;
			}
			
			&--right {
				text-align: right;
			}
			
			&-text {
				font-size: 14px;
				color: $u-main-color;
				line-height: 1.4;
			}
		}
		
		&__container {
			position: relative;
		}
		
		&__input {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0px 9px;
			height: 37px;
			z-index: 10;
			
			&--surround {
				border: 1px solid $u-border-color;
			}
			
			&--bottom {
				border: none;
				border-bottom: 1px solid $u-border-color;
				border-radius: 0;
			}
			
			&--none {
				border: none;
				padding: 0;
			}
			
			&--left {
				text-align: left;
			}
			
			&--center {
				text-align: center;
			}
			
			&--right {
				text-align: right;
			}
		}
		
		&__content {
			flex: 1;
			min-width: 0;
		}
		
		&__text {
			font-size: 14px;
			color: $u-main-color;
			line-height: 1.4;
			
			&--wrap {
				word-break: break-all;
				white-space: normal;
			}
		}
		
		&__placeholder {
			font-size: 14px;
			color: #c0c4cc;
			line-height: 1.4;
		}
		
		&__right {
			display: flex;
			align-items: center;
			margin-left: 8px;
		}
		
		&__clear {
			width: 20px;
			height: 20px;
			border-radius: 100px;
			background-color: #c6c7cb;
			@include flex(row);
			align-items: center;
			justify-content: center;
			transform: scale(0.82);
		}
		
		&__arrow {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 16px;
			height: 16px;
			transition: transform 0.3s;
			
			&--active {
				transform: rotate(180deg);
			}
		}
		
		&__dropdown {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background-color: #ffffff;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			z-index: 1080;
			margin-top: 4px;
			opacity: 0;
			pointer-events: none;
			
			&--show {
				opacity: 1;
				pointer-events: auto;
			}
			
			&--top {
				top: auto;
				bottom: 100%;
				margin-top: 0;
				margin-bottom: 4px;
			}
		}
		
		&__dropdown-scroll {
			max-height: 200px;
		}
		
		&__empty {
			padding: 20px;
			text-align: center;
			
			&-text {
				font-size: 14px;
				color: #909399;
			}
		}
		
		&__options {
			padding: 4px 0;
		}
		
		&__option {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 8px 12px;
			position: relative;
			
			&:hover {
				background-color: #f5f7fa;
			}
			
			&--selected {
				background-color: #f0f9ff;
				color: $u-primary;
				font-weight: 500;
				
				&:hover {
					background-color: #e6f7ff;
				}
			}
			
			&--disabled {
				color: #c0c4cc;
				cursor: not-allowed;
				
				&:hover {
					background-color: transparent;
					transform: none;
				}
				
				&:active {
					transform: none;
				}
			}
		}
		
		&__option-text {
			flex: 1;
			font-size: 14px;
			line-height: 1.4;
		}
		
		&__selected-icon {
			margin-left: 8px;
		}
	}
</style>
