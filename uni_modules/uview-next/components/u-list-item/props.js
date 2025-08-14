import { defineProps } from '../../libs/util/props';

export default defineProps('listItem', {
    // 用于滚动到指定item
    anchor: {
        type: [String, Number],
        default: ''
    }
})
