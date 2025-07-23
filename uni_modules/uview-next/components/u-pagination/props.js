export default {
    props: {
        // 当前页码
        // #ifdef VUE3
        modelValue: {
            type: Number,
            default: ()=> uni.$u.props.pagination.modelValue
        },
        // #endif
        // v-model 的别名
        value: {
            type: Number,
            default: ()=> uni.$u.props.pagination.modelValue
        },
        // 总记录数，用于计算总页数
        total: {
            type: Number,
            default: ()=> uni.$u.props.pagination.total
        },
        // 每页显示的记录数
        pageSize: {
            type: Number,
            default: ()=> uni.$u.props.pagination.pageSize
        },
        // 显示的页码按钮数量
        pagerCount: {
            type: Number,
            default: ()=> uni.$u.props.pagination.pagerCount
        },
        // 是否禁用分页
        disabled: {
            type: Boolean,
            default: ()=> uni.$u.props.pagination.disabled
        },
        // 是否显示省略号
        forceEllipses: {
            type: Boolean,
            default: ()=> uni.$u.props.pagination.forceEllipses
        },
        // 是否为简单分页
        simple: {
            type: Boolean,
            default: ()=> uni.$u.props.pagination.simple
        },
        // 是否展示上一页按钮
        showPrevButton: {
            type: Boolean,
            default: ()=> uni.$u.props.pagination.showPrevButton
        },
        // 是否展示下一页按钮
        showNextButton: {
            type: Boolean,
            default: ()=> uni.$u.props.pagination.showNextButton
        },
        // 上一页按钮文字
        prevText: {
            type: String,
            default: ()=> uni.$u.$t('uPagination.prevText')
        },
        // 下一页按钮文字
        nextText: {
            type: String,
            default: ()=> uni.$u.$t('uPagination.nextText')
        },
        // 背景色
        bgColor: {
            type: [String, Boolean],
            default: ()=> uni.$u.props.pagination.bgColor
        },
        // 文本色
        color: {
            type: String,
            default: ()=> uni.$u.props.pagination.color
        },
        // 激活背景色
        activeBgColor: {
            type: [String, Boolean],
            default: ()=> uni.$u.props.pagination.activeBgColor
        },
        // 激活文本色
        activeColor: {
            type: [String, Boolean],
            default: ()=> uni.$u.props.pagination.activeColor
        },
        // 字体尺寸
        fontSize: {
            type: String,
            default: ()=> uni.$u.props.pagination.fontSize
        },
        // 圆角
        round: {
            type: String,
            default: ()=> uni.$u.props.pagination.round
        },
        // 描边色
        borderColor: {
            type: [String, Boolean],
            default: ()=> uni.$u.props.pagination.borderColor
        },
        // 每项宽度
        itemWidth: {
            type: String,
            default: ()=> uni.$u.props.pagination.itemWidth
        },
        // 每项高度
        itemHeight: {
            type: String,
            default: ()=> uni.$u.props.pagination.itemHeight
        }
    }
}
