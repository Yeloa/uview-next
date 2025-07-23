export default {
    props: {
        // 是否显示级联选择器
        show: {
            type: Boolean,
            default: ()=> uni.$u.props.cascader.show
        },
        // 选择器标题
        title: {
            type: String,
            default: ()=> uni.$u.$t('uCascader.title')
        },
        // 选项数据
        options: {
            type: Array,
            default: ()=> uni.$u.props.cascader.options
        },
        // #ifdef VUE3
        // 当前选中值
        modelValue: {
            type: [String, Number, Array],
            default: ()=> uni.$u.props.cascader.modelValue
        },
        // #endif
        // v-model 的别名
        value: {
            type: [String, Number, Array],
            default: ()=> uni.$u.props.cascader.value
        },
        // 占位符文本
        placeholder: {
            type: String,
            default: ()=> uni.$u.$t('uCascader.placeholder')
        },
        // 自定义字段名
        field: {
            type: Object,
            default: ()=> uni.$u.props.cascader.field
        },
        // 是否显示关闭按钮
        closeable: {
            type: Boolean,
            default: ()=> uni.$u.props.cascader.closeable
        },
        // 是否点击遮罩关闭
        closeOnClickOverlay: {
            type: Boolean,
            default: ()=> uni.$u.props.cascader.closeOnClickOverlay
        },
        // 背景色
        bgColor: {
            type: String,
            default: ()=> uni.$u.props.cascader.bgColor
        },
        // 主题色
        activeColor: {
            type: String,
            default: ()=> uni.$u.props.cascader.activeColor
        },
        // 选中背景色
        activeBgColor: {
            type: String,
            default: ()=> uni.$u.props.cascader.activeBgColor
        },
        // 选中文本加粗
        activeBold: {
            type: Boolean,
            default: ()=> uni.$u.props.cascader.activeBold
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: ()=> uni.$u.props.cascader.iconColor
        },
        // 文本色
        color: {
            type: String,
            default: ()=> uni.$u.props.cascader.color
        },
        // 字体大小
        fontSize: {
            type: String,
            default: ()=> uni.$u.props.cascader.fontSize
        },
        // 标题字体大小
        titleFontSize: {
            type: String,
            default: ()=> uni.$u.props.cascader.titleFontSize
        },
        // 标题颜色
        titleColor: {
            type: String,
            default: ()=> uni.$u.props.cascader.titleColor
        },
        // 圆角
        round: {
            type: [String, Number],
            default: ()=> uni.$u.props.cascader.round
        },
        // 层级
        zIndex: {
            type: [String, Number],
            default: ()=> uni.$u.props.cascader.zIndex
        },
        // 是否安全区域
        safeAreaInsetBottom: {
            type: Boolean,
            default: ()=> uni.$u.props.cascader.safeAreaInsetBottom
        },
        // 选项高度
        itemHeight: {
            type: String,
            default: ()=> uni.$u.props.cascader.itemHeight
        }
    }
}
