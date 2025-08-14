import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('ellipsis', {
    // 文本内容
    content: {
        type: String,
        default: ''
    },
    // 省略位置：start, end, middle
    position: {
        type: String,
        default: 'end'
    },
    lineHeight: {
        type: [Number, String],
        default: 20
    },
    // 行数
    rows: {
        type: [Number, String],
        default: 1
    },
    // 展开文本
    expandText: {
        type: String,
        default: ''
    },
    // 收起文本
    collapseText: {
        type: String,
        default: ''
    },
    // 省略符号
    symbol: {
        type: String,
        default: '...'
    },
    // 文本颜色
    color: {
        type: String,
        default: theme.mainColor
    },
    // 文本大小
    fontSize: {
        type: [String, Number],
        default: 14
    },
    // 展开/收起按钮颜色
    actionColor: {
        type: String,
        default: theme.primary
    }
})
