import { defineProps } from '../../libs/util/props';

export default defineProps('popover', {
    // 是否显示弹出层
    show: {
        type: Boolean,
        default: false
    },
    // 弹出层内容
    content: {
        type: String,
        default: ''
    },
    // 弹出方向：top, bottom, left, right, auto
    position: {
        type: String,
        default: 'auto'
    },
    // 是否显示箭头
    showArrow: {
        type: Boolean,
        default: true
    },
    // 箭头大小
    arrowSize: {
        type: [String, Number],
        default: '12px'
    },
    // 箭头颜色
    arrowColor: {
        type: String,
        default: ''
    },
    // 弹出层背景色
    bgColor: {
        type: String,
        default: '#060607'
    },
    // 文字颜色
    color: {
        type: String,
        default: '#fff'
    },
    // 字体大小
    fontSize: {
        type: [String, Number],
        default: 14
    },
    // 内边距
    padding: {
        type: [String, Number],
        default: '8px 12px'
    },
    // 圆角
    round: {
        type: [String, Number],
        default: 4
    },
    // 弹出层宽度
    width: {
        type: [String, Number],
        default: ''
    },
    // 弹出层最大宽度
    maxWidth: {
        type: [String, Number],
        default: 200
    },
    // 弹出层最小宽度
    minWidth: {
        type: [String, Number],
        default: 50
    },
    // 层级
    zIndex: {
        type: [String, Number],
        default: 999
    },
    // 动画时长
    duration: {
        type: [String, Number],
        default: 300
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    // 自定义弹出层样式
    popoverStyle: {
        type: Object,
        default: () => ({})
    }
})
