export default {
    props: {
		// 数据列表
		list: {
			type: Array,
			default() {
                return uni.$u.props.draggable.list
            }
		},
		// 列数
		column: {
			type: Number,
			default() {
                return uni.$u.props.draggable.column
            }
		},
		// 宽高比，填写这项时gridHeight失效
		aspectRatio: {
			type: Number,
			default() {
                return uni.$u.props.draggable.aspectRatio
            }
		},
		// 项目高度
		itemHeight: {
			type: [Number, String],
			default() {
                return uni.$u.props.draggable.itemHeight
            }
		},
		// 阻尼系数
		damping: {
			type: Number,
			default() {
                return uni.$u.props.draggable.damping
            }
		},
		// 摩擦系数
		friction: {
			type: Number,
			default() {
                return uni.$u.props.draggable.friction
            }
		},
		// 是否使用手柄拖拽
		handle: {
			type: Boolean,
			default() {
                return uni.$u.props.draggable.handle
            }
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default() {
                return uni.$u.props.draggable.disabled
            }
		},
		// 是否长按拖拽
		longpress: {
			type: Boolean,
			default() {
                return uni.$u.props.draggable.longpress
            }
		},
		// 是否显示关闭按钮
		closeable: {
			type: Boolean,
			default() {
                return uni.$u.props.draggable.closeable
            }
		}
	},
}
