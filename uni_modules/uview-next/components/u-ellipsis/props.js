export default {
    props: {
        // 文本内容
        content: {
            type: String,
            default: ()=> uni.$u.props.ellipsis.content
        },
        // 省略位置：start, end, middle
        position: {
            type: String,
            default: ()=> uni.$u.props.ellipsis.position
        },
        lineHeight: {
            type: [Number, String],
            default: ()=> uni.$u.props.ellipsis.lineHeight
        },
        // 行数
        rows: {
            type: [Number, String],
            default: ()=> uni.$u.props.ellipsis.rows
        },
        // 展开文本
        expandText: {
            type: String,
            default: ()=> uni.$u.props.ellipsis.expandText
        },
        // 收起文本
        collapseText: {
            type: String,
            default: ()=> uni.$u.props.ellipsis.collapseText
        },
        // 省略符号
        symbol: {
            type: String,
            default: ()=> uni.$u.props.ellipsis.symbol
        },
        // 文本颜色
        color: {
            type: String,
            default: ()=> uni.$u.props.ellipsis.color
        },
        // 文本大小
        fontSize: {
            type: [String, Number],
            default: ()=> uni.$u.props.ellipsis.fontSize
        },
        // 展开/收起按钮颜色
        actionColor: {
            type: String,
            default: ()=> uni.$u.props.ellipsis.actionColor
        }
    }
}
