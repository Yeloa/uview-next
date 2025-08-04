export default {
    props: {
        // 条形码内容
        value: {
            type: String,
            default: () => uni.$u.props.barcode.value
        },
        // 条形码类型
        format: {
            type: String,
            default: () => uni.$u.props.barcode.format
        },
        // 条形码宽度
        width: {
            type: [String, Number],
            default: () => uni.$u.props.barcode.width
        },
        // 条形码高度
        height: {
            type: [String, Number],
            default: () => uni.$u.props.barcode.height
        },
        // 条形码颜色
        color: {
            type: String,
            default: () => uni.$u.props.barcode.color
        },
        // 背景颜色
        backgroundColor: {
            type: String,
            default: () => uni.$u.props.barcode.backgroundColor
        },
        // 是否显示文本
        displayValue: {
            type: Boolean,
            default: () => uni.$u.props.barcode.displayValue
        },
        // 文本位置
        textPosition: {
            type: String,
            default: () => uni.$u.props.barcode.textPosition
        },
        // 画布类型
        canvasType: {
            type: String,
            default: () => uni.$u.props.barcode.canvasType
        },
        // 字体选项
        fontOptions: {
            type: String,
            default: () => uni.$u.props.barcode.fontOptions
        },
        // 字体
        font: {
            type: String,
            default: () => uni.$u.props.barcode.font
        },
        // 文本对齐方式
        textAlign: {
            type: String,
            default: () => uni.$u.props.barcode.textAlign
        },
        // 文本边距
        textMargin: {
            type: Number,
            default: () => uni.$u.props.barcode.textMargin
        },
        // 字体大小
        fontSize: {
            type: Number,
            default: () => uni.$u.props.barcode.fontSize
        }
    }
}
