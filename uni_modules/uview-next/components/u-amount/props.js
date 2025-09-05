import { defineProps } from '../../libs/util/props';

export default defineProps('amount', {
    // 金额数值
	value: {
		type: Number,
        default: null
	},
    // 金融符号
    symbol: {
        type: String,
        default: '￥'
    },
    // 是否置后金额符号位置
    reverse: {
        type: Boolean,
        default: false
    },
    // 数字精度，小数点后保留几位
    precision: {
        type: Number,
        default: 2
    },
    // 数字精度取舍是否四舍五入
    roundUp: {
        type: Boolean,
        default: true
    },
    // 数字变化是否使用动画
    transition: {
        type: Boolean,
        default: false
    },
    // 数字变化动画时长
    duration: {
        type: Number,
        default: 1000
    },
    // 分隔符位置 (3为千分位，4为万分位)
    separatorDigits: {
        type: Number,
        default: 4
    },
    // 分隔符
    separator: {
        type: String,
        default: ','
    },
    // 是否显示金融符号
    showSymbol: {
        type: Boolean,
        default: true
    },
    // 是否显示小数
    showDecimal: {
        type: Boolean,  
        default: true
    },
    // 是否显示分隔符
    showSeparator: {
        type: Boolean,
        default: false
    },
    // 数字是否转换为大写中文
    capital: {
        type: Boolean,
        default: false
    },
    // 整数字体大小
    fontSize: {
        type: String,
        default: ''
    },
    // 金融符号小数与整数的比例或字体大小
    fontSizeRatio: {
        type: [String, Number],
        default: 0.7
    },
    // 颜色
    color: {
        type: String,
        default: ''
    },
    // 金融符号与小数字体颜色
    colorRatio: {
        type: String,
        default: ''
    },
    // 自定义样式
    customStyle: {
        type: Object,
        default: () => ({})
    }
}) 