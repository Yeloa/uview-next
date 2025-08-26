import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('tabbar', {
    // 当前匹配项的name
    value: {
        type: [String, Number, null],
        default: null
    },
    // 是否为iPhoneX留出底部安全距离
    safeAreaInsetBottom: {
        type: Boolean,
        default: true
    },
    // 是否显示上方边框
    border: {
        type: Boolean,
        default: true
    },
    borderColor:{
        type: String,
        default: theme.borderColor
    },
    bgColor: {
        type: String,
        default: '#ffffff'
    },
    // 元素层级z-index
    zIndex: {
        type: [String, Number],
        default: 1
    },
    // 选中标签的颜色
    activeColor: {
        type: String,
        default: theme.primary
    },
    // 未选中标签的颜色
    inactiveColor: {
        type: String,
        default: theme.lightColor
    },
    // 是否固定在底部
    fixed: {
        type: Boolean,
        default: true
    },
    // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
    placeholder: {
        type: Boolean,
        default: true
    }
})