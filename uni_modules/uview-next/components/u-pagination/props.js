import { defineProps } from '../../libs/util/props';

export default defineProps('pagination', {
    // 当前页码
    // #ifdef VUE3
    modelValue: {
        type: Number,
        default: 1
    },
    // #endif
    // v-model 的别名
    value: {
        type: Number,
        default: 1
    },
    // 总记录数，用于计算总页数
    total: {
        type: Number,
        default: 0
    },
    // 每页显示的记录数
    pageSize: {
        type: Number,
        default: 3
    },
    // 显示的页码按钮数量
    pagerCount: {
        type: Number,
        default: 3
    },
    // 是否禁用分页
    disabled: {
        type: Boolean,
        default: false
    },
    // 是否显示省略号
    forceEllipses: {
        type: Boolean,
        default: false
    },
    // 是否为简单分页
    simple: {
        type: Boolean,
        default: false
    },
    // 是否展示上一页按钮
    showPrevButton: {
        type: Boolean,
        default: true
    },
    // 是否展示下一页按钮
    showNextButton: {
        type: Boolean,
        default: true
    },
    // 上一页按钮文字
    prevText: {
        type: String,
        default: () => uni.$u.$t('uPagination.prevText')
    },
    // 下一页按钮文字
    nextText: {
        type: String,
        default: () => uni.$u.$t('uPagination.nextText')
    },
    // 背景色
    bgColor: {
        type: [String, Boolean],
        default: '#f7f7f7'
    },
    // 文本色
    color: {
        type: String,
        default: '#606266'
    },
    // 激活背景色
    activeBgColor: {
        type: [String, Boolean],
        default: '#2979ff'
    },
    // 激活文本色
    activeColor: {
        type: [String, Boolean],
        default: '#ffffff'
    },
    // 字体尺寸
    fontSize: {
        type: String,
        default: '14px'
    },
    // 圆角
    round: {
        type: String,
        default: '4px'
    },
    // 描边色
    borderColor: {
        type: [String, Boolean],
        default: ''
    },
    // 每项宽度
    itemWidth: {
        type: String,
        default: '34px'
    },
    // 每项高度
    itemHeight: {
        type: String,
        default: '34px'
    }
})
