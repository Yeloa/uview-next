import { defineProps } from '../../libs/util/props';

export default defineProps('gridItem', {
    // 宫格的name
    name: {
        type: [String, Number, null],
        default: null
    },
    // 背景颜色
    bgColor: {
        type: String,
        default: ''
    }
})
