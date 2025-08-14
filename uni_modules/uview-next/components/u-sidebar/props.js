import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('sidebar', {
    // 当前导航项的索引
    value: {
        type: [Number, String],
        default: 0,
    },
    // #ifdef VUE3
    // 当前导航项的索引
    modelValue: {
        type: [Number, String],
        default: 0,
    },
    // #endif
    // 宽度
    width: {
        type: String,
        default: '100px',
    },
    // 字体大小
    fontSize: {
        type: String,
        default: '14px',
    },
    // 行高
    lineHeight: {
        type: String,
        default: '22px',
    },
    // 文本颜色
    textColor: {
        type: String,
        default: theme.mainColor,
    },
    // 禁用文本颜色
    disabledColor: {
        type: String,
        default: theme.disabledColor,
    },
    // 禁用背景颜色
    disabledBgColor: {
        type: String,
        default: '',
    },
    // 背景色
    bgColor: {
        type: String,
        default: theme.bgColor,
    },
    // 激活时文本颜色
    activeColor: {
        type: String,
        default: theme.mainColor,
    },
    // 激活时背景颜色
    activeBgColor: {
        type: String,
        default: 'white',
    },
    // 激活时是否加粗
    activeBold: {
        type: Boolean,
        default: true,
    },
    // 激活时的样式
    activeStyle: {
        type: [String, Object],
        default: () => ({}),
    },
    // 非激活时的样式
    inactiveStyle: {
        type: [String, Object],
        default: () => ({}),
    },
    // 滑块长度
    lineWidth: {
        type: [String, Number],
        default: '4px',
    },
    // 滑块高度
    lineHeight: {
        type: [String, Number],
        default: '16px',
    },
    // 滑块颜色
    lineColor: {
        type: String,
        default: theme.primary,
    },
    // 滑块背景显示大小，当滑块背景设置为图片时使用
    lineBgSize: {
        type: String,
        default: 'cover',
    },
    showLine: {
        type: Boolean,
        default: true,
    },
});
