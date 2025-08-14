import { defineProps } from '../../libs/util/props';

export default defineProps('collapse', {
    // 当前展开面板的name，非手风琴模式：[<string | number>]，手风琴模式：string | number
    value: {
        type: [String, Number, Array, null],
        default: null
    },
    // 是否手风琴模式
    accordion: {
        type: Boolean,
        default: false
    },
    // 是否显示外边框
    border: {
        type: Boolean,
        default: true
    }
})
