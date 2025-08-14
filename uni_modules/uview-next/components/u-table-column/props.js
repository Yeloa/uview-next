import { defineProps } from '../../libs/util/props';

export default defineProps('tableColumn', {
    // 字段名称，对应列内容的字段名，支持嵌套属性如 'user.name'
    prop: {
        type: String,
        default: ''
    },
    // 列类型：selection/index
    type: {
        type: String,
        default: 'default'
    },  
    // 显示的标题
    label: {
        type: String,
        default: ''
    },
    // 表头对齐方式：left/center/right
    headerAlign: {
        type: String,
        default: 'left'
    },
    // 表头超出1行隐藏
    headerEllipsis: {   
        type: Boolean,
        default: true
    },
    // 对应列的宽度，单位为px
    width: {
        type: [Number, String],
        default: null
    },
    // 对应列的最小宽度，单位为px
    minWidth: {
        type: [Number, String],
        default: null
    },
    // 是否开启列排序
    sortable: {
        type: Boolean,
        default: false
    },
    // 列的对齐方式：left/center/right
    align: {
        type: String,
        default: 'left'
    },
    // 格式化函数
    formatter: {
        type: [Function, null],
        default: null
    },
    // 是否显示该列
    show: {
        type: Boolean,
        default: true
    },
    // 自定义类名
    className: {
        type: String,
        default: ''
    },
    // 自定义样式
    customStyle: {
        type: Object,
        default: () => ({})
    }
})