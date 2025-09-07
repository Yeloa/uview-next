import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('slider-button', {
    // 按钮文字
    text: {
        type: String,
        default: '滑动解锁'
    },
    // 按钮宽度
    width: {
        type: [String, Number],
        default: ''
    },
    // 圆角
    round: {
        type: [String, Number],
        default: 100
    },
    // 按钮高度
    height: {
        type: [String, Number],
        default: 45
    },
    
    // 背景颜色
    bgColor: {
        type: String,
        default: '#e0e0e0'
    },
    // 滑道背景颜色
    railColor: {
        type: String,
        default: theme.primary
    },
    // 滑道层级
    railIndex: {
        type: [String, Number],
        default: ''
    },
    // 轨道圆角
	railRadius: {
		type: [String, Number],
		default: 100
	},
    // 文字颜色
    textColor: {
        type: String,
        default: '#c2c2c2'
    },
    // 文字大小
    fontSize: {
        type: [String, Number],
        default: 16
    },
    textBold: {
        type: Boolean,
        default: false
    },
    // 激活文字颜色
    activeTextColor: {
        type: String,
        default: '#ffffff'
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    // 成功文字
    successText: {
        type: String,
        default: '验证成功'
    },
    // 是否自动重置
    autoReset: {
        type: Boolean,
        default: false
    },
    // 重置延迟时间（毫秒）
    resetDelay: {
        type: Number,
        default: 300
    },
    // 阈值
    threshold: {
        type: [String, Number],
        default: ''
    }
})
