import { defineProps } from '../../libs/util/props';

export default defineProps('table', {
    // 显示的数据
    data: {
        type: Array,
       default: () => []
    },
    // 设置圆角值
    round: {
        type: [String, Number],
        default: 0
    },
    // 是否带有边框
    border: {
        type: Boolean,
        default: true
    },
    // 是否允许横向滚动
    scrollX: {
        type: Boolean,
        default: true
    },
    // 是否为斑马纹表格
    stripe: {
        type: Boolean,
        default: false
    },
    // Table 的高度，单位为px
    height: {
        type: [String, Number],
        default: null
    },
    // 行高，单位为px
    rowHeight: {
        type: [String, Number],
        default: 40
    },
    // 是否显示表头
    showHeader: {
        type: Boolean,
        default: true
    },
    // 表头对齐方式
    headerCellStyle: {
        type: Object,
        default: () => ({})
    },
    cellStyle: {
        type: Object,
        default: () => ({})
    },
    // 是否超出隐藏
    ellipsis: {
        type: Boolean,
        default: true
    },
    // 空数据时显示的文本
    emptyText: {
        type: String,
        default: () => uni.$u.$t('uTable.emptyText')
    },
    // 空数据区域高度，单位为px
    emptyHeight: {
        type: [String, Number],
        default: 200
    },
    // 行数据的Key，用于优化Table的渲染
    rowKey: {
        type: String,
        default: 'id'
    },
    // 默认选中的行
    defaultSelection: {
        type: Array,
       default: () => []
    },
    // 自定义类名
    customClass: {
        type: String,
        default: ''
    },
    // 定义需要用到的外部样式
    customStyle: {
        type: [Object, String],
        default: () => ({})
    },
    // 合并单元格配置
    spanMethod: {
        type: [Function, null],
        default: null
    },
    // 合并配置数组（简化版）
    mergeConfig: {
        type: Array,
       default: () => []
    },
    // 是否显示表尾合计行
    showSummary: {
        type: Boolean,
        default: false
    },
    // 表尾合计行第一列的文本
    sumText: {
        type: String,
        default: '合计'
    },
    // 自定义的合计计算方法
    summaryMethod: {
        type: [Function, null],
        default: null
    },
    // 需要合计的列（prop数组）
    summaryColumns: {
        type: Array,
       default: () => []
    }
});