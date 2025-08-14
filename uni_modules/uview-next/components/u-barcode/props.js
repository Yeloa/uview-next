import { defineProps } from '../../libs/util/props';

export default defineProps('barcode', {
    // 条形码内容
    value: {
        type: String,
        default: ''
    },
    // 条形码类型
    format: {
        type: String,
        default: 'CODE128'
    },
    // 条形码宽度
    width: {
        type: [String, Number],
        default: 2
    },
    // 条形码高度
    height: {
        type: [String, Number],
        default: 80
    },
    // 条形码颜色
    color: {
        type: String,
        default: '#000000'
    },
    // 背景颜色
    backgroundColor: {
        type: String,
        default: 'transparent'
    },
    // 是否显示文本
    displayValue: {
        type: Boolean,
        default: true
    },
    // 文本位置
    textPosition: {
        type: String,
        default: 'bottom'
    },
    // 画布类型
    canvasType: {
        type: String,
        default: '2d'
    },
    // 字体选项
    fontOptions: {
        type: String,
        default: ''
    },
    // 字体
    font: {
        type: String,
        default: 'monospace'
    },
    // 文本对齐方式
    textAlign: {
        type: String,
        default: 'center'
    },
    // 文本边距
    textMargin: {
        type: Number,
        default: 2
    },
    // 字体大小
    fontSize: {
        type: Number,
        default: 20
    }
})
