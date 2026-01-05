import { defineProps } from '../../libs/util/props';

export default defineProps('draggable', {
	// 数据列表
	list: {
		type: Array,
		default: []
	},
	// 列数
	column: {
		type: Number,
		default: 2
	},
	// 宽高比，填写这项时gridHeight失效
	aspectRatio: {
		type: Number,
		default: null
	},
	// 项目高度
	itemHeight: {
		type: [Number, String],
		default: 60
	},
	// 阻尼系数
	damping: {
		type: Number,
		default: 50
	},
	// 摩擦系数
	friction: {
		type: Number,
		default: 2
	},
	// 是否使用手柄拖拽
	handle: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 是否长按拖拽
	longpress: {
		type: Boolean,
		default: false
	},
	// 是否显示关闭按钮
	closeable: {
		type: Boolean,
		default: false
	},
	// 是否启用边缘滚动
	autoScroll: {
		type: Boolean,
		default: false
	}
})
