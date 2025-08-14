import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('toolbar', {
    // 是否展示工具条
    show: {
        type: Boolean,
        default: true
    },
    // 取消按钮的文字
    cancelText: {
        type: String,
        default: () => uni.$u.$t('uToolbar.cancelText')
    },
    // 确认按钮的文字
    confirmText: {
        type: String,
        default: () => uni.$u.$t('uToolbar.confirmText')
    },
    // 取消按钮的颜色
    cancelColor: {
        type: String,
        default: theme.lightColor
    },
    // 确认按钮的颜色
    confirmColor: {
        type: String,
        default: theme.primary
    },
    // 标题文字
    title: {
        type: String,
        default: ''
    }
})