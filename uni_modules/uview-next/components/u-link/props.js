import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('link', {
    // 文字颜色
    color: {
        type: String,
        default: theme.primary
    },
    // 字体大小，单位px
    fontSize: {
        type: [String, Number],
        default: 15
    },
    // 是否显示下划线
    underLine: {
        type: Boolean,
        default: false
    },
    // 要跳转的链接
    href: {
        type: String,
        default: ''
    },
    // 小程序中复制到粘贴板的提示语
    mpTips: {
        type: String,
        default: () => uni.$u.$t('uLink.mpTips')
    },
    // 下划线颜色
    lineColor: {
        type: String,
        default: ''
    },
    // 超链接的问题，不使用slot形式传入
    text: {
        type: [String, null],
        default: ''
    }
})
