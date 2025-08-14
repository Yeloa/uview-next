import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('indexList', {
    // 右边锚点非激活的颜色
    inactiveColor: {
        type: String,
        default: theme.contentColor
    },
    // 右边锚点激活的颜色
    activeColor: {
        type: String,
        default: theme.primary
    },
    // 索引字符列表，数组形式
    indexList: {
        type: Array,
       default: () => []
    },
    // 是否开启锚点自动吸顶
    sticky: {
        type: Boolean,
        default: true
    },
    // 自定义导航栏的高度
    customNavHeight: {
        type: [String, Number],
        default: 0
    }
})
