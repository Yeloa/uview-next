import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('lineProgress', {
    // 激活部分的颜色
    activeColor: {
        type: String,
        default: theme.primary
    },
    inactiveColor: {
        type: String,
        default: theme.bgColor
    },
    // 进度百分比，数值
    percentage: {
        type: [String, Number],
        default: 0
    },
    // 是否在进度条内部显示百分比的值
    showText: {
        type: Boolean,
        default: true
    },
    // 进度条的高度，单位px
    height: {
        type: [String, Number],
        default: 12
    }
});
