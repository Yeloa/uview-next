<template>
	<view
	    class="u-checkbox"
	    @tap.stop="wrapperClickHandler"
		:style="[checkboxStyle, parentData.shape == 'button' && iconWrapStyle]"
	    :class="[checkboxClasses, elShape == 'button' && iconClasses]"
	>
		<view
		    v-if="elIcon"
		    class="u-checkbox__icon-wrap"
		    @tap.stop="iconClickHandler"
			:class="elShape != 'button' && iconClasses"
		    :style="[elShape != 'button' && iconWrapStyle]"
		>
			<slot name="icon">
				<u-icon
				    class="u-checkbox__icon-wrap__icon"
					:name="elIcon"
				    :size="elIconSize"
				    :color="elIconColor"
				/>
			</slot>
		</view>
		<view @tap.stop="labelClickHandler">
			<slot>
				<text :style="{
						color: elActiveLabelColor,
						fontSize: elLabelSize,
						lineHeight: elLabelSize
					}"
				>{{label}}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	import mixin from '../../libs/mixin/mixin'
	import mpMixin from '../../libs/mixin/mpMixin';
	/**
	 * checkbox  复选框
	 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
	 * @tutorial https://uviewui.com/components/checkbox.html
	 * @property {String | Number | Boolean}	name			checkbox组件的标示符
	 * @property {String}						shape			形状，square为方形，circle为圆型
	 * @property {String | Number}				size			整体的大小
	 * @property {Boolean}						checked			是否默认选中
	 * @property {Boolean}						indeterminate	是否为不确定状态（半选状态）
	 * @property {String | Boolean}				disabled		是否禁用
	 * @property {String}						activeColor		选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
	 * @property {String}						inactiveColor	未选中的颜色
	 * @property {String}						icon			图标
	 * @property {String | Number}				iconSize		图标的大小，单位px
	 * @property {String}						iconColor		图标颜色
	 * @property {String | Number}				label			label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
	 * @property {String}						labelColor 		label的颜色
	 * @property {String}						activeLabelColor	选中状态下的label颜色
	 * @property {String | Number}				labelSize		label的字体大小，px单位
	 * @property {String | Boolean}				labelDisabled	是否禁止点击提示语选中复选框
	 * @property {Object}						customStyle		定义需要用到的外部样式
	 * 
	 * @event {Function}	change	任一个checkbox状态发生变化时触发，回调为一个对象
	 * @example <u-checkbox v-model="checked" :disabled="false">天涯</u-checkbox>
	 */
	export default {
		name: "u-checkbox",
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				isChecked: false,
				// 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
				// 故只能使用如此方法
				parentData: {
					iconSize: 12,
					labelDisabled: null,
					disabled: null,
					shape: 'square',
					activeColor: null,
					inactiveColor: null,
					size: 18,
					value: null,
					// #ifdef VUE3
					modelValue: null,
					// #endif
					iconColor: null,
					placement: 'row',
					borderBottom: false,
					iconPlacement: 'left',
					labelColor: null,
					activeLabelColor: null
				}
			}
		},
		computed: {
			// 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
			elDisabled() {
				return this.disabled !== '' ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
			},
			// 是否禁用label点击
			elLabelDisabled() {
				return this.labelDisabled !== '' ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled :
					false;
			},
			elIcon() {
				
				if(this.indeterminate){
					return 'minus'
				}

				if(this.icon){
					return this.icon
				}
				if(this.elShape != 'button'){
					return 'checkbox-mark'
				}
			},
			// 组件尺寸，对应size的值，默认值为21px
			elSize() {
				return this.size ? this.size : (this.parentData.size ? this.parentData.size : 21);
			},
			// 组件的勾选图标的尺寸，默认12px
			elIconSize() {
				return this.iconSize ? this.iconSize : (this.parentData.iconSize ? this.parentData.iconSize : 12);
			},
			// 组件选中激活时的颜色
			elActiveColor() {
				return this.activeColor ? this.activeColor : (this.parentData.activeColor ? this.parentData.activeColor : '#2979ff');
			},
			// 组件选未中激活时的颜色
			elInactiveColor() {
				return this.inactiveColor ? this.inactiveColor : (this.parentData.inactiveColor ? this.parentData.inactiveColor :
					'#c8c9cc');
			},
			
			// 组件未选中激活时的边框颜色
			elBorderColor() {
				return this.borderColor ? this.borderColor : (this.parentData.borderColor ? this.parentData.borderColor : this.elInactiveColor)
			},
			// label的颜色
			elLabelColor() {
				return this.labelColor ? this.labelColor : (this.parentData.labelColor ? this.parentData.labelColor : '#606266')
			},
			// label的颜色
			elActiveLabelColor() {
				if(this.elDisabled) {
					return this.elInactiveColor
				}

				let activeLabelColor = this.activeLabelColor || this.parentData.activeLabelColor
				if(this.isChecked) {

					if(activeLabelColor) {
						return activeLabelColor
					} else {
						return this.elShape == 'button' ? '#ffffff' : this.elLabelColor
					}

				} else {
					return this.elLabelColor
				}
			},
			// 组件的形状
			elShape() {
				return this.shape ? this.shape : (this.parentData.shape ? this.parentData.shape : 'circle');
			},
			// label大小
			elLabelSize() {
				return uni.$u.addUnit(this.labelSize ? this.labelSize : (this.parentData.labelSize ? this.parentData.labelSize :
					'15'))
			},
			elIconColor() {
				const iconColor = this.iconColor ? this.iconColor : (this.parentData.iconColor ? this.parentData.iconColor :
					'#ffffff');
				// 图标的颜色
				if (this.elDisabled) {
					// disabled状态下，已勾选的radio图标改为elInactiveColor
					if(this.isChecked || this.indeterminate){
						return this.elInactiveColor
					}else{
						return this.elShape == 'button' ?  this.elInactiveColor : 'transparent'
					}
				}

				if(this.isChecked || this.indeterminate){
					return iconColor
				}else{
					return this.elShape == 'button' ?  this.elLabelColor : 'transparent'
				}
			},

			iconClasses() {
				let classes = []
				// 组件的形状
				classes.push('u-checkbox__icon-wrap--' + this.elShape)
				if (this.elDisabled) {
					classes.push('u-checkbox__' + this.elShape + '--disabled')
				}
				if ((this.checked || this.indeterminate) && this.elDisabled) {
					classes.push('u-checkbox__' + this.elShape + '--disabled--checked')
				}
				// 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
				// #ifdef MP-ALIPAY || MP-TOUTIAO
				classes = classes.join(' ')
				// #endif
				return classes
			},
			iconWrapStyle() {
				// checkbox的整体样式
				const style = {}
				style.backgroundColor = (this.isChecked || this.indeterminate) && !this.elDisabled ? this.elActiveColor : '#ffffff'
				style.borderColor = (this.isChecked || this.indeterminate) && !this.elDisabled ? this.elActiveColor : this.elInactiveColor

				if(this.elShape != 'button') {
					style.width = uni.$u.addUnit(this.elSize)
					style.height = uni.$u.addUnit(this.elSize)
				}
				
				// 如果是图标在右边的话，移除它的右边距
				if (this.parentData.iconPlacement === 'right') {
					style.marginRight = 0
				}
				return style
			},
			checkboxClasses() {
				let classes = []

				if(this.parentData.iconPlacement){
					classes.push(`u-checkbox-label--${this.parentData.iconPlacement}`)
				}

				if(this.parentData.borderBottom && this.parentData.placement === 'column'){
					classes.push('u-border-bottom')
				}

				// #ifdef MP-ALIPAY || MP-TOUTIAO
				classes = classes.join(' ')
				// #endif
				return classes
			},
			checkboxStyle() {
				const style = {}
				if (this.parentData.borderBottom && this.parentData.placement === 'row') {
					uni.$u.error('检测到您将borderBottom设置为true，需要同时将u-checkbox-group的placement设置为column才有效')
				}
				// 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
				if (this.parentData.borderBottom && this.parentData.placement === 'column') {
					style.paddingBottom = '8px'
				}

				if(this.parentData.shape == 'button'){
					style.marginRight = '10px'
					style.marginBottom = '8px'
				}

				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			}
		},
		mounted() {
			this.init()
		},
		// #ifdef VUE3
		emits: ['update:checked', 'change'],
		// #endif
		methods: {
			init() {
				// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
				this.updateParentData()

				let value;
				// #ifdef VUE2
				value = this.parentData.value;
				// #endif
				// #ifdef VUE3
				value = this.parentData.modelValue === '' ? this.parentData.value : this.parentData.modelValue;
				// #endif

				// 设置初始化时，是否默认选中的状态，父组件u-checkbox-group的value可能是array，所以额外判断
				if (this.checked) {
					this.isChecked = true
				} else if (uni.$u.test.array(value)) {
					// 查找数组是是否存在this.name元素值
					this.isChecked = value.some(item => {
						return item === this.name
					})
				}
			},
			updateParentData() {
				this.getParentData('u-checkbox-group')
			},
			// 横向两端排列时，点击组件即可触发选中事件
			wrapperClickHandler(e) {
				this.parentData.iconPlacement === 'right' && this.iconClickHandler(e)
			},
			// 点击图标
			iconClickHandler(e) {
				this.preventEvent(e)
				// 如果整体被禁用，不允许被点击
				if (!this.elDisabled) {
					this.setCheckedStatus()
				}
			},
			// 点击label
			labelClickHandler(e) {
				this.preventEvent(e)
				// 如果按钮整体被禁用或者label被禁用，则不允许点击文字修改状态
				if (!this.elLabelDisabled && !this.elDisabled) {
					this.setCheckedStatus()
				}
			},
			emitEvent() {
				this.$emit('change', this.isChecked)
				this.$emit('update:checked', this.isChecked)
				// 尝试调用u-form的验证方法，进行一定延迟，否则微信小程序更新可能会不及时
				this.$nextTick(() => {
					uni.$u.formValidate(this, 'change')
				})
			},
			// 改变组件选中状态
			// 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有u-checkbox实例
			// 将本组件外的其他u-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
			setCheckedStatus() {
				// 如果当前是indeterminate状态，点击后应该变为选中状态
				if (this.indeterminate) {
					this.isChecked = true
				} else {
					// 将本组件标记为与原来相反的状态
					this.isChecked = !this.isChecked
				}
				this.emitEvent()
				typeof this.parent.unCheckedOther === 'function' && this.parent.unCheckedOther(this)
			}
		},
		watch:{
			checked(){
				this.isChecked = this.checked
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	$u-checkbox-icon-wrap-margin-right:6px !default;
	$u-checkbox-icon-wrap-font-size:6px !default;
	$u-checkbox-icon-wrap-border-width:1px !default;
	$u-checkbox-icon-wrap-border-color:#c8c9cc !default;
	$u-checkbox-icon-wrap-icon-line-height:0 !default;
	$u-checkbox-icon-wrap-circle-border-radius:100% !default;
	$u-checkbox-icon-wrap-square-border-radius:3px !default;
	$u-checkbox-checked-color:#fff !default;
	$u-checkbox-checked-background-color:#ebedf0 !default;
	$u-checkbox-checked-border-color:#2979ff !default;
	$u-checkbox-disabled-background-color:#ebedf0 !default;
	$u-checkbox-disabled-checked-color:#c8c9cc !default;
	$u-checkbox-label-margin-left:5px !default;
	$u-checkbox-label-margin-right:12px !default;
	$u-checkbox-label-color:$u-content-color !default;
	$u-checkbox-label-font-size:15px !default;
	$u-checkbox-label-disabled-color:#c8c9cc !default;
	$u-checkbox-wrap-border-width:1px !default;
	$u-checkbox-wrap-border-color:#c8c9cc !default;
	$u-checkbox-button-border-radius:100px !default;
	$u-checkbox-button-padding:8px 15px !default;

	.u-checkbox {
		/* #ifndef APP-NVUE */
		@include flex(row);
		/* #endif */
		overflow: hidden;
		flex-direction: row;
		align-items: center;

		&-label--left {
			flex-direction: row
		}

		&-label--right {
			flex-direction: row-reverse;
			justify-content: space-between
		}

		&__icon-wrap {
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			// nvue下，border-color过渡有问题
			transition-property: border-color, background-color, color;
			transition-duration: 0.2s;
			/* #endif */
			color: $u-content-color;
			@include flex;
			align-items: center;
			justify-content: center;
			color: transparent;
			text-align: center;
			margin-right: $u-checkbox-icon-wrap-margin-right;

			/* #ifdef MP-TOUTIAO */
			// 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
			&__icon {
				line-height: $u-checkbox-icon-wrap-icon-line-height;
			}
			/* #endif */

			&--circle {
				font-size: $u-checkbox-icon-wrap-font-size;
				border-width: $u-checkbox-icon-wrap-border-width;
				border-color: $u-checkbox-icon-wrap-border-color;
				border-style: solid;
				border-radius: $u-checkbox-icon-wrap-circle-border-radius;
			}

			&--square {
				font-size: $u-checkbox-icon-wrap-font-size;
				border-width: $u-checkbox-icon-wrap-border-width;
				border-color: $u-checkbox-icon-wrap-border-color;
				border-style: solid;
				border-radius: $u-checkbox-icon-wrap-square-border-radius;
			}

			&--button {
				padding: $u-checkbox-button-padding;
				border-width: $u-checkbox-wrap-border-width;
				border-color: $u-checkbox-wrap-border-color;
				border-style: solid;
				border-radius: $u-checkbox-button-border-radius;
			}
			
		}

		&__square--checked,
		&__circle--checked {
			color: $u-checkbox-checked-color;
			background-color: $u-checkbox-checked-background-color;
			border-color: $u-checkbox-checked-border-color;
		}

		&__button--checked,
		&__square--disabled,
		&__circle--disabled {
			background-color: $u-checkbox-disabled-background-color !important;
		}

		&__button--disabled--checked,
		&__square--disabled--checked,
		&__circle--disabled--checked {
			color: $u-checkbox-disabled-checked-color !important;
		}

		&__label {
			/* #ifndef APP-NVUE */
			word-wrap: break-word;
			/* #endif */
			margin-left: $u-checkbox-label-margin-left;
			margin-right: $u-checkbox-label-margin-right;
			color: $u-checkbox-label-color;
			font-size: $u-checkbox-label-font-size;

			&--disabled {
				color: $u-checkbox-label-disabled-color;
			}
		}
	}
</style>
