export default {
    props: {
        // 输入的值
		value: {
			type: [Array, String, Number],
			default: ()=> uni.$u.props.picker.value
		},
		// #ifdef VUE3
		modelValue: {
			type: [Array, String, Number],
			default: ()=> uni.$u.props.picker.value
		},
		// #endif
        // 是否展示picker弹窗
        show: {
            type: Boolean,
            default: ()=> uni.$u.props.picker.show
        },
        // 是否展示顶部的操作栏
        showToolbar: {
            type: Boolean,
            default: ()=> uni.$u.props.picker.showToolbar
        },
        // 顶部标题
        title: {
            type: String,
            default: ()=> uni.$u.props.picker.title
        },
        // 对象数组，设置每一列的数据
        columns: {
            type: Array,
            default: ()=> uni.$u.props.picker.columns
        },
        // 是否显示加载中状态
        loading: {
            type: Boolean,
            default: ()=> uni.$u.props.picker.loading
        },
        // 各列中，单个选项的高度
        itemHeight: {
            type: [String, Number],
            default: ()=> uni.$u.props.picker.itemHeight
        },
        // 取消按钮的文字
        cancelText: {
            type: String,
            default: ()=> uni.$u.$t('uPicker.cancelText')
        },
        // 确认按钮的文字
        confirmText: {
            type: String,
            default: ()=> uni.$u.$t('uPicker.confirmText')
        },
        // 取消按钮的颜色
        cancelColor: {
            type: String,
            default: ()=> uni.$u.props.picker.cancelColor
        },
        // 确认按钮的颜色
        confirmColor: {
            type: String,
            default: ()=> uni.$u.props.picker.confirmColor
        },
        // 每列中可见选项的数量
        visibleItemCount: {
            type: [String, Number],
            default: ()=> uni.$u.props.picker.visibleItemCount
        },
        // 选项对象中，需要展示的属性键名
        keyName: {
            type: String,
            default: ()=> uni.$u.props.picker.keyName
        },
        // 选项对象中，需要展示的属性键名
        valueName: {
            type: String,
            default: ()=> uni.$u.props.picker.valueName
        },
        // 是否允许点击遮罩关闭选择器
        closeOnClickOverlay: {
            type: Boolean,
            default: ()=> uni.$u.props.picker.closeOnClickOverlay
        },
        // 各列的默认索引
        defaultIndex: {
            type: Array,
            default: ()=> uni.$u.props.picker.defaultIndex
        },
		// 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
		immediateChange: {
			type: Boolean,
			default: ()=> uni.$u.props.picker.immediateChange
		},
		// 设置圆角值
		round: {
			type: String,
			default: ()=> uni.$u.props.picker.round
		}
    }
}
