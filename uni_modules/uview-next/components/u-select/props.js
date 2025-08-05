export default {
    props: {
        // 默认值
        value: {
            type: [String, Number],
            default: () => uni.$u.props.select.value
        },
        // 本地数据，格式 [{text:'',value:''}]
        list: {
            type: Array,
            default: () => uni.$u.props.select.list
        },
        // 选项对象中，需要展示的属性键名
        keyName: {
            type: String,
            default: ()=> uni.$u.props.select.keyName
        },
        // 选项对象中，需要展示的属性键名
        valueName: {
            type: String,
            default: ()=> uni.$u.props.select.valueName
        },
        // 是否显示清除控件
        clearable: {
            type: Boolean,
            default: () => uni.$u.props.select.clearable
        },
        // 没有数据时显示的文字，本地数据无效
        emptyText: {
            type: String,
            default: () => uni.$u.props.select.emptyText
        },
        // 左侧标题
        label: {
            type: String,
            default: () => uni.$u.props.select.label
        },
        // 输入框的提示文字
        placeholder: {
            type: String,
            default: () => uni.$u.props.select.placeholder
        },
        // placeholder的样式
        placeholderStyle: {
            type: [String, Object],
            default: () => uni.$u.props.select.placeholderStyle
        },
        // 背景颜色
        backgroundColor: {
            type: String,
            default: () => uni.$u.props.select.backgroundColor
        },
        // 圆角值
        round: {
            type: [String, Number],
            default: () => uni.$u.props.select.round
        },
        // 边框颜色
        borderColor: {
            type: String,
            default: () => uni.$u.props.select.borderColor
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: () => uni.$u.props.select.disabled
        },
        // 禁用状态时的背景色
        disabledColor: {
            type: String,
            default: () => uni.$u.props.select.disabledColor
        },
        // 是否允许选中文本换行显示
        wrap: {
            type: Boolean,
            default: () => uni.$u.props.select.wrap
        },
        // 弹出位置
        placement: {
            type: String,
            default: () => uni.$u.props.select.placement
        },
        // 选择文字的位置
        align: {
            type: String,
            default: () => uni.$u.props.select.align
        },
        // 是否显示箭头
        showArrow: {
            type: Boolean,
            default: () => uni.$u.props.select.showArrow
        },
        // 边框样式
        border: {
            type: String,
            default: () => uni.$u.props.select.border
        },
        // 自定义样式
        customStyle: {
            type: [Object, String],
            default: () => uni.$u.props.select.customStyle
        }
    }
}
