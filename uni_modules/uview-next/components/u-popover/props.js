export default {
    props: {
        // 是否显示弹出层
        show: {
            type: Boolean,
            default: ()=> uni.$u.props.popover.show
        },
        // 弹出层内容
        content: {
            type: String,
            default: ()=> uni.$u.props.popover.content
        },
        // 弹出方向：top, bottom, left, right, auto
        position: {
            type: String,
            default: ()=> uni.$u.props.popover.position
        },
        // 是否显示箭头
        showArrow: {
            type: Boolean,
            default: ()=> uni.$u.props.popover.showArrow
        },
        // 箭头大小
        arrowSize: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.arrowSize
        },
        // 箭头颜色
        arrowColor: {
            type: String,
            default: ()=> uni.$u.props.popover.arrowColor
        },
        // 弹出层背景色
        bgColor: {
            type: String,
            default: ()=> uni.$u.props.popover.bgColor
        },
        // 文字颜色
        color: {
            type: String,
            default: ()=> uni.$u.props.popover.color
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.fontSize
        },
        // 内边距
        padding: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.padding
        },
        // 圆角
        round: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.round
        },
        // 弹出层宽度
        width: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.width
        },
        // 弹出层最大宽度
        maxWidth: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.maxWidth
        },
        // 弹出层最小宽度
        minWidth: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.minWidth
        },
        // 层级
        zIndex: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.zIndex
        },
        // 动画时长
        duration: {
            type: [String, Number],
            default: ()=> uni.$u.props.popover.duration
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: ()=> uni.$u.props.popover.disabled
        },
        // 自定义弹出层样式
        popoverStyle: {
            type: Object,
            default: ()=> uni.$u.props.popover.popoverStyle
        }
    }
}
