import { defineProps } from '../../libs/util/props';

export default defineProps('sidebarItem', {
	// 内容
	label: {
		type: String,
		default: ''
	},
	// 值，用于标识该项
	value: {
		type: [String, Number],
		default: ''
	},
	// 图标名称
	icon: {
		type: String,
		default: ''
	},
	// 图标大小
	iconSize: {
		type: [String, Number],
		default: '20px'
	},
	// 图标颜色
	iconColor: {
		type: String,
		default: '#666'
	},
	// 图标位置，支持 left 和 top
	iconPosition: {
		type: String,
		default: 'left',
		validator: (value) => ['left', 'top'].includes(value)
	},
	// 右上角的角标提示信息
	badge: {
		type: [String, Number, Object],
		default: ''
	},
	// 是否显示圆点，将会覆盖badge参数
	dot: {
		type: Boolean,
		default: false
	},
	// 是否禁用该项
	disabled: {
		type: Boolean,
		default: false
	}
})