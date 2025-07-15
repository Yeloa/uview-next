export default {
    props: {
        // 标签的名称，作为与u-tabs的current参数匹配的标识符
        name: {
            type: [String, Number, null],
            default: null
        },
        // 标签显示的文本
        label: {
            type: String,
            default: ''
        },
        // 是否禁用此标签
        disabled: {
            type: Boolean,
            default: false
        },
        // 右上角的角标提示信息
        badge: {
            type: [String, Number, null],
            default: null
        },
        // 是否显示圆点，将会覆盖badge参数
        dot: {
            type: Boolean,
            default: false
        }
    }
}
