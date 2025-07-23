export default {
    props: {
        // 字段名称，对应列内容的字段名，支持嵌套属性如 'user.name'
        prop: {
            type: String,
            default: () => uni.$u.props.tableColumn.prop
        },
        // 列类型：selection/index
        type: {
            type: String,
            default: () => uni.$u.props.tableColumn.type
        },  
        // 显示的标题
        label: {
            type: String,
            default: () => uni.$u.props.tableColumn.label
        },
        // 对应列的宽度，单位为px
        width: {
            type: [Number, String],
            default: () => uni.$u.props.tableColumn.width
        },
        // 对应列的最小宽度，单位为px
        minWidth: {
            type: [Number, String],
            default: () => uni.$u.props.tableColumn.minWidth
        },
        // 是否开启列排序
        sortable: {
            type: Boolean,
            default: () => uni.$u.props.tableColumn.sortable
        },
        // 列的对齐方式：left/center/right
        align: {
            type: String,
            default: () => uni.$u.props.tableColumn.align
        },
        // 格式化函数
        formatter: {
            type: [Function, null],
            default: null
        },
        // 是否显示该列
        show: {
            type: Boolean,
            default: () => uni.$u.props.tableColumn.show
        },
        // 自定义类名
        className: {
            type: String,
            default: () => uni.$u.props.tableColumn.className
        },
        // 自定义样式
        customStyle: {
            type: Object,
            default: () => uni.$u.props.tableColumn.customStyle
        }
    }
}