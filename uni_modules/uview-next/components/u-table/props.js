export default {
    props: {
        // 显示的数据
        data: {
            type: Array,
            default: () => uni.$u.props.table.data
        },
        // 设置圆角值
        round: {
            type: [String, Number],
            default: () => uni.$u.props.table.round
        },
        // 是否带有边框
        border: {
            type: Boolean,
            default: () => uni.$u.props.table.border
        },
        // 是否允许横向滚动
        scrollX: {
            type: Boolean,
            default: () => uni.$u.props.table.scrollX
        },
        // 是否为斑马纹表格
        stripe: {
            type: Boolean,
            default: () => uni.$u.props.table.stripe
        },
        // Table 的高度，单位为px
        height: {
            type: [String, Number],
            default: () => uni.$u.props.table.height
        },
        // 行高，单位为px
        rowHeight: {
            type: [String, Number],
            default: () => uni.$u.props.table.rowHeight
        },
        // 是否显示表头
        showHeader: {
            type: Boolean,
            default: () => uni.$u.props.table.showHeader
        },
        // 是否超出隐藏
        ellipsis: {
            type: Boolean,
            default: () => uni.$u.props.table.ellipsis
        },
        // 空数据时显示的文本
        emptyText: {
            type: String,
            default: () => uni.$u.$t('uTable.emptyText')
        },
        // 空数据区域高度，单位为px
        emptyHeight: {
            type: [String, Number],
            default: () => uni.$u.props.table.emptyHeight
        },
        // 行数据的Key，用于优化Table的渲染
        rowKey: {
            type: String,
            default: () => uni.$u.props.table.rowKey
        },
        // 默认选中的行
        defaultSelection: {
            type: Array,
            default: () => uni.$u.props.table.defaultSelection
        },
        // 自定义类名
        customClass: {
            type: String,
            default: () => uni.$u.props.table.customClass
        },
        // 定义需要用到的外部样式
        customStyle: {
            type: [Object, String],
            default: () => uni.$u.props.table.customStyle
        },
        // 合并单元格配置
        spanMethod: {
            type: [Function, null],
            default: null
        },
        // 合并配置数组（简化版）
        mergeConfig: {
            type: Array,
            default: () => uni.$u.props.table.mergeConfig
        },
        // 是否显示表尾合计行
        showSummary: {
            type: Boolean,
            default: () => uni.$u.props.table.showSummary
        },
        // 表尾合计行第一列的文本
        sumText: {
            type: String,
            default: () => uni.$u.props.table.sumText
        },
        // 自定义的合计计算方法
        summaryMethod: {
            type: [Function, null],
            default: null
        },
        // 需要合计的列（prop数组）
        summaryColumns: {
            type: Array,
            default: () => uni.$u.props.table.summaryColumns
        }
    }
}