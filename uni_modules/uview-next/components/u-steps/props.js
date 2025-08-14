import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js'

export default defineProps('steps', {
    // 排列方向
    direction: {
        type: String,
        default: 'row'
    },
    // 设置第几个步骤
    current: {
        type: [String, Number],
        default: 0
    },
    // 激活状态颜色
    activeColor: {
        type: String,
        default: theme.primary
    },
    // 未激活状态颜色
    inactiveColor: {
        type: String,
        default: theme.lightColor
    },
    // 激活状态的图标
    activeIcon: {
        type: String,
        default: ''
    },
    // 未激活状态图标
    inactiveIcon: {
        type: String,
        default: ''
    },
    // 是否显示点类型
    dot: {
        type: Boolean,
        default: false
    }
})