import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('tree', {
	// 数据
	data: {
		type: Array,
		default: () => []
	},
	// 选项名称映射的字段名
	keyField: {
		type: String,
		default: 'key'
	},
	// 展示值映射的字段名
	labelField: {
		type: String,
		default: 'label'
	},
	// 子级值映射的字段名
	childrenField: {
		type: String,
		default: 'children'
	},
	// 是否是叶子节点的字段名
	isLeafField: {
		type: String,
		default: 'isLeaf'
	},
	// 是否禁用的字段名
	disabledField: {
		type: String,
		default: 'disabled'
	},
	// 默认选中多选项
	defaultCheckedKeys: {
		type: Array,
		default: () => []
	},
	// 默认展开项
	defaultExpandedKeys: {
		type: Array,
		default: () => []
	},
	// 受控的选中多选项
	checkedKeys: {
		type: Array,
		default: undefined
	},
	// 受控的展开项
	expandedKeys: {
		type: Array,
		default: undefined
	},

	// 是否可选择
	checkable: {
		type: Boolean,
		default: false
	},
	// 是否可选择
	selectable: {
		type: Boolean,
		default: false
	},
	// 是否级联
	cascade: {
		type: Boolean,
		default: false
	},
	// 是否允许点击节点展开/收缩
	expandOnClick: {
		type: Boolean,
		default: false
	},
	// 是否允许点击节点勾选/取消勾选
	checkOnClick: {
		type: Boolean,
		default: false
	},	
	// 异步加载节点数据
	loadNode: {
		type: Function,
		default: null
	},
	// 是否允许勾选未加载的节点
	allowCheckingNotLoaded: {
		type: Boolean,
		default: false
	},

	// 搜索过滤
	pattern: {
		type: String,
		default: ''
	},
	// 是否显示搜索无关的节点
	showIrrelevantNodes: {
		type: Boolean,
		default: true
	},

	// 外观
	indentWidth: {
		type: [Number, String],
		default: 24
	},

	// 是否显示展开/收缩按钮
	showSwitcher: {
		type: Boolean,
		default: true
	},
	// 展开图标
	expandIcon: {
		type: String,
		default: 'caret-right'
	},
	// 收缩图标
	collapseIcon: {
		type: String,
		default: 'caret-down'
	},
	// loading的颜色
	loadingColor: {
		type: String,
		default: ''
	},
	// checkebox选中颜色
	checkedColor: {
		type: String,
		default: ''
	},
	// 是否可旋转展开/收缩按钮
	rotatableSwitcher: {
		type: Boolean,
		default: false
	},
	// 高亮背景颜色
	highlightBgColor: {
		type: String,
		default: '#f9ae3d'
	},
	// 选中背景颜色
	selectedBgColor: {
		type: String,
		default: '#f3f4f6'
	},
	// 展开/收缩按钮大小
	switcherSize: {
		type: [Number, String],
		default: 14
	},
	// 展开/收缩按钮颜色
	switcherColor: {
		type: String,
		default: '#909399'
	}
})
