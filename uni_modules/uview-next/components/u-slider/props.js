import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('slider', {
	// #ifdef VUE2
	value: {
		type: [Number, Array],
		default: 0
	},
	// #endif
	// #ifdef VUE3
	modelValue: {
		type: [Number, Array],
		default: 0
	},
	// #endif
	// 最小值
	min: {
		type: Number,
		default: 0
	},
	// 最大值
	max: {
		type: Number,
		default: 100
	},
	// 步长
	step: {
		type: Number,
		default: 1
	},
	// 是否开启双滑块模式
	range: {
		type: Boolean,
		default: false
	},
	// 是否禁用滑块
	disabled: {
		type: Boolean,
		default: false
	},
	// 是否反向移动
	reverse: {
		type: Boolean,
		default: false
	},
	// 是否为只读状态
	readonly: {
		type: Boolean,
		default: false
	},
	// 是否禁止双滑块交叉
	noCross: {
		type: Boolean,
		default: false
	},
	// 是否垂直展示
	vertical: {
		type: Boolean,
		default: false
	},
	// 滑块的尺寸
	size: {
		type: [String, Number],
		default: 24
	},
	// 滑块大小
	thumbSize: {
		type: [String, Number],
		default: 15
	},
	// 滑块颜色
	thumbColor: {
		type: String,
		default: '#ffffff'
	},
	// 滑块边框颜色
	thumbBorder: {
		type: String,
		default: '3px solid ' + theme.primary
	},
	// 滑块圆角
	thumbRadius: {
		type: [String, Number],
		default: 50
	},
	// 轨道颜色
	railColor: {
		type: String,
		default: 'rgba(0, 0, 0, 0.1)'
	},
	// 轨道圆角
	railRadius: {
		type: [String, Number],
		default: 10
	},
	// 轨道大小
	railSize: {
		type: [String, Number],
		default: 4
	},
	// 已选择部分的轨道颜色
	trackColor: {
		type: String,
		default: theme.primary
	},
	// 是否显示数值
	showValue: {
		type: Boolean,
		default: false
	}
})