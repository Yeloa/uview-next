export default {
    props: {
        // 当前导航项的索引
        value: {
            type: [Number, String],
            default: () => uni.$u.props.sidebar.value
        },
        // #ifdef VUE3
        // 当前导航项的索引
        modelValue: {
            type: [Number, String],
            default: () => uni.$u.props.sidebar.value
        },
        // #endif
        // 宽度
        width: {
            type: String,
            default: () => uni.$u.props.sidebar.width
        },
        // 字体大小
        fontSize: {
            type: String,
            default: () => uni.$u.props.sidebar.fontSize
        },
        // 行高
        lineHeight: {
            type: String,
            default: () => uni.$u.props.sidebar.lineHeight
        },
        // 文本颜色
        textColor: {
            type: String,
            default: () => uni.$u.props.sidebar.textColor
        },
        // 禁用文本颜色
        disabledColor: {
            type: String,
            default: () => uni.$u.props.sidebar.disabledColor
        },
        // 禁用背景颜色
        disabledBgColor: {
            type: String,
            default: () => uni.$u.props.sidebar.disabledBgColor
        },
        // 背景色
        bgColor: {
            type: String,
            default: () => uni.$u.props.sidebar.bgColor
        },
        // 激活时文本颜色
        activeColor: {
            type: String,
            default: () => uni.$u.props.sidebar.activeColor
        },
        // 激活时背景颜色
        activeBgColor: {
            type: String,
            default: () => uni.$u.props.sidebar.activeBgColor
        },
        // 激活时是否加粗
        activeBold: {
            type: Boolean,
            default: () => uni.$u.props.sidebar.activeBold
        },
        // 激活时的样式
        activeStyle: {
            type: [String, Object],
            default: () => uni.$u.props.sidebar.activeStyle
        },
        // 非激活时的样式
        inactiveStyle: {
            type: [String, Object],
            default: () => uni.$u.props.sidebar.inactiveStyle
        },
        // 滑块长度
        lineWidth: {
            type: [String, Number],
            default: () => uni.$u.props.sidebar.lineWidth
        },
        // 滑块高度
        lineHeight: {
            type: [String, Number],
            default: () => uni.$u.props.sidebar.lineHeight
        },
        // 滑块颜色
        lineColor: {
            type: String,
            default: () => uni.$u.props.sidebar.lineColor
        },
        // 滑块背景显示大小，当滑块背景设置为图片时使用
        lineBgSize: {
            type: String,
            default: () => uni.$u.props.sidebar.lineBgSize
        },
        showLine: {
            type: Boolean,
            default: () => uni.$u.props.sidebar.showLine
        }
    }
}