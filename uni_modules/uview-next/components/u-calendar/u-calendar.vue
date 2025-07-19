<template>
	<uView
		v-if="insert" 
		ref="calendarView" 
		:title="title"
		:showTitle="showTitle" 
		:showSubtitle="showSubtitle"
		:mode="mode" 
		:startText="startText"
		:endText="endText" 
		:customList="customList" 
		:color="color"
		:minDate="minDate" 
		:maxDate="maxDate" 
		:defaultDate="defaultDate" 
		:maxCount="maxCount"
		:rowHeight="rowHeight"
		:formatter="formatter"
		:showLunar="showLunar"
		:showMark="showMark" 
		:readonly="readonly"
		:maxRange="maxRange"
		:rangePrompt="rangePrompt"
		:showRangePrompt="showRangePrompt" 
		:allowSameDay="allowSameDay" 
		:monthNum="monthNum"
		:shape="shape" 
		:disabledDate="disabledDate"
		:disabledFun="disabledFun" 
		:weekdays="weekdays"
		@monthSelected="monthSelected"
	/>

	<u-popup v-else :show="show" mode="bottom" closeable @close="close" :round="round" :closeOnClickOverlay="closeOnClickOverlay">
		<uView 
			ref="calendarView"
			:title="title" 
			:showTitle="showTitle" 
			:showSubtitle="showSubtitle"
			:mode="mode" 
			:startText="startText"
			:endText="endText"
			:customList="customList"
			:color="color"
			:minDate="minDate"
			:maxDate="maxDate"
			:defaultDate="defaultDate"
			:maxCount="maxCount"
			:rowHeight="rowHeight"
			:formatter="formatter" 
			:showLunar="showLunar" 
			:showMark="showMark" 
			:readonly="readonly" 
			:maxRange="maxRange"
			:rangePrompt="rangePrompt" 
			:showRangePrompt="showRangePrompt" 
			:allowSameDay="allowSameDay"
			:monthNum="monthNum"
			:shape="shape" 
			:disabledDate="disabledDate"
			:disabledFun="disabledFun"
			:weekdays="weekdays"
			@monthSelected="monthSelected"
		/>
		<slot name="footer" v-if="showConfirm">
			<view class="u-calendar__confirm">
				<u-button shape="circle" :text="buttonDisabled ? confirmDisabledText : confirmText" :color="color" @click="confirm" :disabled="buttonDisabled"></u-button>
			</view>
		</slot>
	</u-popup>
</template>

<script>

import props from "./props.js"
import mixin from '../../libs/mixin/mixin'
import mpMixin from '../../libs/mixin/mpMixin'
import uView from './view.vue'

/**
 * Calendar 日历
 * @description  此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中.
 * @tutorial https://uveiw.bdxmz.cn/components/calendar.html
 *
 * @property {String}				title				标题内容 (默认 日期选择 )
 * @property {Boolean}				showTitle			是否显示标题  (默认 true )
 * @property {String}			    shape				选中的日期的形状，circle（圆形），square（带圆角） （默认 'square' ）
 * @property {Boolean}				showSubtitle		是否显示副标题	(默认 true )
 * @property {String}				mode				日期类型选择  single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围 （ 默认 'single' )
 * @property {String}				startText			mode=range时，第一个日期底部的提示文字  (默认 '开始' )
 * @property {String}				endText				mode=range时，最后一个日期底部的提示文字 (默认 '结束' )
 * @property {Array}				customList			自定义列表
 * @property {String}				color				主题色，对底部按钮和选中日期有效  (默认 ‘#3c9cff' )
 * @property {String | Number}		minDate				最小的可选日期	 (默认 0 )
 * @property {String | Number}		maxDate				最大可选日期  (默认 0 )
 * @property {Array | String| Date}	defaultDate			默认选中的日期，mode为multiple或range是必须为数组格式
 * @property {String | Number}		maxCount			mode=multiple时，最多可选多少个日期  (默认 	Number.MAX_SAFE_INTEGER  )
 * @property {String | Number}		rowHeight			日期行高 (默认 56 )
 * @property {Function}				formatter			日期格式化函数
 * @property {Boolean}				showLunar			是否显示农历  (默认 false )
 * @property {Boolean}				showMark			是否显示月份背景色 (默认 true )
 * @property {String}				confirmText			确定按钮的文字 (默认 '确定' )
 * @property {String}				confirmDisabledText	确认按钮处于禁用状态时的文字 (默认 '确定' )
 * @property {Boolean}				show				是否显示日历弹窗 (默认 false )
 * @property {Boolean}				closeOnClickOverlay	是否允许点击遮罩关闭日历 (默认 false )
 * @property {Boolean}				readonly	        是否为只读状态，只读状态下禁止选择日期 (默认 false )
 * @property {String | Number}		maxRange	        日期区间最多可选天数，默认无限制，mode = range时有效
 * @property {String}				rangePrompt	        范围选择超过最多可选天数时的提示文案，mode = range时有效
 * @property {Boolean}				showRangePrompt	    范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效 (默认 true )
 * @property {Boolean}				allowSameDay	    是否允许日期范围的起止时间为同一天，mode = range时有效 (默认 false )
 * @property {Number|String}	    round				圆角值，默认无圆角  (默认 0 )
 * @property {Number|String}	    monthNum			最多展示的月份数量  (默认 3 )
 * @property {Boolean}				insert			    是否插入模式  (默认 false )
 * @property {Array | String| Date} disabledDate		禁止选择的日期
 * @property {Function}				disabledFun			禁止选择的日期函数
 *
 * @event {Function()} confirm 		点击确定按钮时触发		选择日期相关的返回参数
 * @event {Function()} close 		日历关闭时触发			可定义页面关闭时的回调事件
 * @event {Function()} change 		插入模式下，选择日期时触发
 * @example <u-calendar  :defaultDate="defaultDateMultiple" :show="show" mode="multiple" @confirm="confirm">
	</u-calendar>
 * */
export default {
	name: 'u-calendar',
	mixins: [mpMixin, mixin, props],
	components: {
		uView
	},
	data() {
		return {
			// month组件中选择的日期数组
			selected: [],
		}
	},
	watch: {
		// 打开弹窗时，设置月份数据
		show: {
			immediate: true,
			handler(n) {
				this.$nextTick(() => {
					if (n) {
						this.$refs.calendarView.setMonth()
					}
				})
			}
		}
	},
	computed: {
		buttonDisabled() {
			// 如果为range类型，且选择的日期个数不足1个时，让底部的按钮出于disabled状态
			if (this.mode === 'range') {
				if (this.selected.length <= 1) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		}
	},
	// #ifdef VUE3
	emits: ["confirm", "close", "change"],
	// #endif
	methods: {
		close() {
			this.$emit('close')
		},
		// 点击确定按钮
		confirm() {
			if (!this.buttonDisabled) {
				this.$emit('confirm', this.selected)
			}
		},
		// month组件内部选择日期后，通过事件通知给父组件
		monthSelected(e) {
			this.selected = e
			if (this.insert) {
				this.$emit('change', e)
			} else {
				if (!this.showConfirm) {
					// 在不需要确认按钮的情况下，如果为单选，或者范围多选且已选长度大于2，则直接进行返还
					if (
						this.mode === 'multiple' ||
						this.mode === 'single' ||
						(this.mode === 'range' && this.selected.length >= 2)
					) {
						this.$emit('confirm', this.selected)
					}
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.u-calendar {
	&__confirm {
		padding: 7px 18px;
	}
}
</style>