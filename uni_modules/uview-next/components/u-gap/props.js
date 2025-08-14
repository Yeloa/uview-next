import { defineProps } from '../../libs/util/props';

export default defineProps('gap', {
    // 背景颜色（默认transparent）
    bgColor: {
        type: String,
        default: 'transparent'
    },
    // 分割槽高度，单位px（默认30）
    height: {
        type: [String, Number],
        default: 20
    },
    // 与上一个组件的距离
    marginTop: {
        type: [String, Number],
        default: 0
    },
    // 与下一个组件的距离
    marginBottom: {
        type: [String, Number],
        default: 0
    }
})
