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
    },
    // 标签栏的形状 可选项：normal， circle
    shape: {
        type: String,
        default: 'normal' 
    },
    // 标签栏的高度
    height: {
        type: [String, Number],
        default: 50
    },
    // 是否自适应宽度
    fit: {
        type: Boolean,
        default: false
    },
    // 胶囊标签栏底部边距
    bottom: {
        type: [String, Number],
        default: 20
    },
    // 模式 可选项：normal，tag
    mode: {
        type: String,
        default: 'normal'
    }
})