export default {
	props: {
		// 内容
		label: {
			type: String,
			default: () => uni.$u.props.sidebarItem.label
		},
		// 值，用于标识该项
		value: {
			type: [String, Number],
			default: ''
		},
		// 图标名称
		icon: {
			type: String,
			default: () => uni.$u.props.sidebarItem.icon
		},
		// 图标大小
		iconSize: {
			type: [String, Number],
			default: () => uni.$u.props.sidebarItem.iconSize
		},
		// 图标颜色
		iconColor: {
			type: String,
			default: () => uni.$u.props.sidebarItem.iconColor
		},
		// 图标位置，支持 left 和 top
		iconPosition: {
			type: String,
			default: () => uni.$u.props.sidebarItem.iconPosition,
			validator: (value) => ['left', 'top'].includes(value)
		},
		// 右上角的角标提示信息
		badge: {
			type: [String, Number, Object],
			default: () => uni.$u.props.sidebarItem.badge
		},
		// 是否显示圆点，将会覆盖badge参数
		dot: {
			type: Boolean,
			default: () => uni.$u.props.sidebarItem.dot
		},
		// 是否禁用该项
		disabled: {
			type: Boolean,
			default: () => uni.$u.props.sidebarItem.disabled
		}
	}
}