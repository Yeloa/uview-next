import { defineProps } from '../../libs/util/props';
import theme from '../../libs/config/theme.js';

export default defineProps('switch', {
    // 是否为加载中状态
    loading: {
        type: Boolean,
        default: false
    },
    // 是否为禁用状态
    disabled: {
        type: Boolean,
        default: false
    },
    // 开关尺寸，单位px
    size: {
        type: [String, Number],
        default: 25
    },
    // 打开时的背景颜色
    activeColor: {
        type: String,
        default: theme.primary
    },
    // 关闭时的背景颜色
    inactiveColor: {
        type: String,
        default: theme.bgColor
    },
    // 通过v-model双向绑定的值
    // #ifdef VUE2
    value: {
        type: [Boolean, String, Number],
        default: false
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
        type: [Boolean, String, Number],
        default: false
    },
    // #endif
    // switch打开时的值
    activeValue: {
        type: [String, Number, Boolean],
        default: true
    },
    // switch关闭时的值
    inactiveValue: {
        type: [String, Number, Boolean],
        default: false
    },
    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: {
        type: Boolean,
        default: false
    },
    // 圆点与外边框的距离
    space: {
        type: [String, Number],
        default: 0
    }
})